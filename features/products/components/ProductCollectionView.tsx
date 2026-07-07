"use client"

import { useState, useSyncExternalStore } from "react"
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiFilter3Line,
} from "@remixicon/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/utils/cn"
import { PRODUCTS_PER_PAGE } from "../product.constants"
import {
  DEFAULT_PRODUCT_SORT,
  PRODUCT_SORT_OPTIONS,
  parseProductSort,
  toApiSortBy,
  type ProductSortValue,
} from "../product.sort"
import { useGetProducts } from "../usecases/useGetProducts"
import {
  ProductCollectionFilters,
  type ProductCollectionFiltersState,
} from "./ProductCollectionFilters"
import { ProductGrid } from "./ProductGrid"

const layoutClassName =
  "grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] xl:grid-cols-[22rem_minmax(0,1fr)]"

// Hydration-safe mounted flag: false on the server and the first client render,
// true afterwards — without a setState-in-effect.
const subscribeNoop = () => () => {}

function Skeleton({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-[var(--radius)] bg-secondary/60",
        className
      )}
    />
  )
}

function ProductCollectionSidebarSkeleton() {
  return (
    <aside className="relative overflow-hidden rounded-[var(--radius)] border border-border/45 bg-surface shadow-panel lg:sticky lg:top-6 lg:self-start">
      <div className="relative p-4 sm:p-5">
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          <div className="flex flex-col gap-4">
            <section className="rounded-[var(--radius)] border border-border/75 bg-background/72 p-4 backdrop-blur-sm">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-3 h-4 w-40" />
              <Skeleton className="mt-4 h-11 w-full" />
            </section>

            <section className="rounded-[var(--radius)] border border-border/75 bg-background/72 p-4 backdrop-blur-sm">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-3 h-4 w-56" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-full" />
              </div>
            </section>

            <section className="rounded-[var(--radius)] border border-border/75 bg-background/72 p-4 backdrop-blur-sm">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-3 h-4 w-52" />
              <Skeleton className="mt-4 h-11 w-full" />
            </section>
          </div>

          <div className="grid gap-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </aside>
  )
}

function ProductCollectionGridSkeleton() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="surface-panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-4 w-full max-w-[22rem]" />
            <Skeleton className="mt-2 h-4 w-full max-w-[18rem]" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="lg:col-span-4">
            <div className="image-shell">
              <Skeleton className="h-[22rem] w-full sm:h-[26rem] lg:h-[30rem]" />
            </div>
            <div className="space-y-2 pt-4">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function toOptionalNumber(value: string | null) {
  if (!value?.trim()) {
    return undefined
  }

  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue)) {
    return undefined
  }

  return parsedValue
}

function getPageFromSearchParams(searchParams: {
  get: (key: string) => string | null
}) {
  const pageValue = Number(searchParams.get("page"))

  if (!Number.isFinite(pageValue) || pageValue < 1) {
    return 1
  }

  return Math.floor(pageValue)
}

function getFiltersFromSearchParams(searchParams: {
  get: (key: string) => string | null
}): ProductCollectionFiltersState {
  const pageSizeValue = Number(searchParams.get("pageSize"))

  return {
    search: searchParams.get("search")?.trim() || undefined,
    minPrice: toOptionalNumber(searchParams.get("minPrice")),
    maxPrice: toOptionalNumber(searchParams.get("maxPrice")),
    pageSize:
      Number.isFinite(pageSizeValue) && pageSizeValue > 0
        ? Math.floor(pageSizeValue)
        : PRODUCTS_PER_PAGE,
  }
}

function getAppliedFilterCount(filters: ProductCollectionFiltersState) {
  let total = 0

  if (filters.search?.trim()) {
    total += 1
  }

  if (filters.minPrice !== undefined) {
    total += 1
  }

  if (filters.maxPrice !== undefined) {
    total += 1
  }

  if (filters.pageSize !== PRODUCTS_PER_PAGE) {
    total += 1
  }

  return total
}

function buildCollectionHref(
  pathname: string,
  page: number,
  filters: ProductCollectionFiltersState,
  sort: ProductSortValue
) {
  const params = new URLSearchParams()

  if (page > 1) {
    params.set("page", String(page))
  }

  if (sort !== DEFAULT_PRODUCT_SORT) {
    params.set("sort", sort)
  }

  if (filters.pageSize !== PRODUCTS_PER_PAGE) {
    params.set("pageSize", String(filters.pageSize))
  }

  if (filters.search?.trim()) {
    params.set("search", filters.search.trim())
  }

  if (filters.minPrice !== undefined) {
    params.set("minPrice", String(filters.minPrice))
  }

  if (filters.maxPrice !== undefined) {
    params.set("maxPrice", String(filters.maxPrice))
  }

  const queryString = params.toString()

  return queryString ? `${pathname}?${queryString}` : pathname
}

export function ProductCollectionView() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  // Render the loading state until mounted so the server and the first client
  // render match — react-query's isLoading differs between SSR and the client,
  // which would otherwise cause a hydration mismatch on the disabled controls.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )

  const page = getPageFromSearchParams(searchParams)
  const filters = getFiltersFromSearchParams(searchParams)
  const sort = parseProductSort(searchParams.get("sort"))
  const filtersKey = `${filters.search ?? ""}:${filters.minPrice ?? ""}:${filters.maxPrice ?? ""}:${filters.pageSize}:${sort}`
  const activeFilterCount = getAppliedFilterCount(filters)
  const activeFilterLabel =
    activeFilterCount === 0 ? "All pieces" : `${activeFilterCount} active`

  const { data, isLoading, isError, isFetching, refetch } = useGetProducts({
    page,
    pageSize: filters.pageSize,
    search: filters.search,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sortBy: toApiSortBy(sort),
  })

  const controlsDisabled = !mounted || isLoading

  const updateCollectionRoute = (
    nextFilters: ProductCollectionFiltersState,
    nextPage = 1,
    nextSort: ProductSortValue = sort,
    scrollToTop = false
  ) => {
    router.replace(
      buildCollectionHref(pathname, nextPage, nextFilters, nextSort),
      {
        scroll: false,
      }
    )

    if (scrollToTop && typeof window !== "undefined") {
      window.scrollTo({ top: 0 })
    }
  }

  const handleSortChange = (nextSort: ProductSortValue) => {
    updateCollectionRoute(filters, 1, nextSort)
  }

  const sortControl = (
    <div className="flex items-center justify-end gap-2">
      <label
        htmlFor="product-sort"
        className="text-[0.72rem] font-medium tracking-[0.14em] text-muted-foreground uppercase"
      >
        Sort
      </label>
      <Select
        items={PRODUCT_SORT_OPTIONS}
        value={sort}
        onValueChange={(nextValue) =>
          handleSortChange(
            (nextValue as ProductSortValue | null) ?? DEFAULT_PRODUCT_SORT
          )
        }
        disabled={isFetching}
      >
        <SelectTrigger id="product-sort" className="h-9 w-[12rem] bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PRODUCT_SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  const renderFilters = (
    keySuffix: string,
    {
      closeOnComplete = false,
    }: {
      closeOnComplete?: boolean
    } = {}
  ) => (
    <ProductCollectionFilters
      key={`${filtersKey}:${keySuffix}`}
      value={filters}
      disabled={isLoading}
      onApply={(nextFilters) => {
        updateCollectionRoute(nextFilters)

        if (closeOnComplete) {
          setIsMobileFiltersOpen(false)
        }
      }}
      onReset={() => {
        updateCollectionRoute({ pageSize: PRODUCTS_PER_PAGE })

        if (closeOnComplete) {
          setIsMobileFiltersOpen(false)
        }
      }}
    />
  )

  const desktopSidebar = (
    <aside className="relative hidden overflow-hidden rounded-[var(--radius)] border border-border/45 bg-surface shadow-panel lg:sticky lg:top-6 lg:block lg:self-start">
      <div className="relative p-4 sm:p-5">{renderFilters("desktop")}</div>
    </aside>
  )

  const mobileFiltersBar = (
    <div className="flex items-center justify-between gap-3 lg:hidden">
      <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
        <SheetTrigger
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "gap-2"
          )}
          disabled={controlsDisabled}
        >
          <RiFilter3Line className="size-4" />
          Filters
        </SheetTrigger>

        <SheetPortal>
          <SheetOverlay className="lg:hidden" />
          <SheetContent
            side="right"
            className="top-[8dvh] bottom-auto h-[84dvh] w-[min(calc(100vw-0.75rem),24rem)] max-w-none rounded-l-[var(--radius)] border border-r-0 border-border/45 bg-surface p-0 lg:hidden"
          >
            <div className="relative flex h-full flex-col overflow-hidden">
              <SheetHeader className="relative">
                <div className="pr-12">
                  <SheetTitle>Filters</SheetTitle>
                </div>

                <SheetClose
                  aria-label="Close filters"
                  className="absolute top-4 right-4"
                >
                  <RiCloseLine className="size-4" />
                </SheetClose>
              </SheetHeader>

              <SheetBody className="relative">
                {renderFilters("mobile", { closeOnComplete: true })}
              </SheetBody>
            </div>
          </SheetContent>
        </SheetPortal>
      </Sheet>

      <span className="status-pill border-brand/20 bg-brand/10 text-brand">
        {activeFilterLabel}
      </span>
    </div>
  )

  if (!mounted || isLoading) {
    return (
      <div className={layoutClassName}>
        <div className="hidden lg:block">
          <ProductCollectionSidebarSkeleton />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          {mobileFiltersBar}
          <ProductCollectionGridSkeleton />
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className={layoutClassName}>
        {desktopSidebar}
        <div className="flex min-w-0 flex-col gap-6">
          {mobileFiltersBar}
          <div className="surface-panel p-6 sm:p-8">
            <h2 className="section-heading">We couldn&apos;t load Couture</h2>
            <p className="mt-3 max-w-[34rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
              Please try again.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-5"
              onClick={() => {
                void refetch()
              }}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const startRecord = data.total === 0 ? 0 : (data.page - 1) * data.pageSize + 1
  const endRecord = data.total === 0 ? 0 : startRecord + data.data.length - 1
  const totalPages = Math.max(data.totalPages, 1)

  return (
    <div className={layoutClassName}>
      {desktopSidebar}

      <div className="flex min-w-0 flex-col gap-6">
        {mobileFiltersBar}

        {sortControl}

        <ProductGrid products={data.data} />

        <div className="surface-panel p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="status-pill border-brand/20 bg-brand/10 text-brand">
                  Page {data.page} / {totalPages}
                </span>
                <span className="status-pill border-border bg-background/80 text-foreground/78">
                  {data.total === 0 ? "0 pieces" : `${data.total} pieces`}
                </span>
                {isFetching && (
                  <span className="status-pill border-border bg-background/80 text-muted-foreground">
                    Refreshing
                  </span>
                )}
              </div>
              <p className="mt-4 max-w-[36rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                {data.total === 0
                  ? "No pieces match these filters."
                  : `Showing ${startRecord}-${endRecord} of ${data.total} pieces.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!data.hasPrev || isFetching}
                onClick={() => {
                  updateCollectionRoute(
                    filters,
                    Math.max(1, page - 1),
                    sort,
                    true
                  )
                }}
              >
                <RiArrowLeftSLine className="size-4" />
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!data.hasNext || isFetching}
                onClick={() => {
                  updateCollectionRoute(filters, page + 1, sort, true)
                }}
              >
                Next
                <RiArrowRightSLine className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
