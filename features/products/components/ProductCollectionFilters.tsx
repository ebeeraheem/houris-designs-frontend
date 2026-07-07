"use client"

import { startTransition, useState, type FormEvent } from "react"
import { RiFilter3Line, RiSearch2Line } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PRODUCTS_PER_PAGE } from "../product.constants"

export interface ProductCollectionFiltersState {
  search?: string
  minPrice?: number
  maxPrice?: number
  pageSize: number
}

interface ProductCollectionFiltersProps {
  value: ProductCollectionFiltersState
  disabled?: boolean
  onApply: (nextValue: ProductCollectionFiltersState) => void
  onReset: () => void
}

const PAGE_SIZE_OPTIONS = [9, 12, 24]

function toOptionalNumber(value: string) {
  if (!value.trim()) {
    return undefined
  }

  const parsedValue = Number(value)

  return Number.isFinite(parsedValue) ? parsedValue : undefined
}

function getActiveFilterCount(filters: {
  search: string
  minPrice: string
  maxPrice: string
  pageSize: string
}) {
  let total = 0

  if (filters.search.trim()) {
    total += 1
  }

  if (filters.minPrice.trim()) {
    total += 1
  }

  if (filters.maxPrice.trim()) {
    total += 1
  }

  if (Number(filters.pageSize) !== PRODUCTS_PER_PAGE) {
    total += 1
  }

  return total
}

export function ProductCollectionFilters({
  value,
  disabled = false,
  onApply,
  onReset,
}: ProductCollectionFiltersProps) {
  const [search, setSearch] = useState(value.search ?? "")
  const [minPrice, setMinPrice] = useState(
    value.minPrice !== undefined ? String(value.minPrice) : ""
  )
  const [maxPrice, setMaxPrice] = useState(
    value.maxPrice !== undefined ? String(value.maxPrice) : ""
  )
  const [pageSize, setPageSize] = useState(String(value.pageSize))

  const activeFilterCount = getActiveFilterCount({
    search,
    minPrice,
    maxPrice,
    pageSize,
  })
  const hasActiveFilters = activeFilterCount > 0

  const handleApply = () => {
    startTransition(() => {
      onApply({
        search: search.trim() || undefined,
        minPrice: toOptionalNumber(minPrice),
        maxPrice: toOptionalNumber(maxPrice),
        pageSize: Number(pageSize) || PRODUCTS_PER_PAGE,
      })
    })
  }

  const handleReset = () => {
    setSearch("")
    setMinPrice("")
    setMaxPrice("")
    setPageSize(String(PRODUCTS_PER_PAGE))

    startTransition(() => {
      onReset()
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleApply()
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end">
          <span className="status-pill border-brand/20 bg-brand/10 text-brand">
            {activeFilterCount === 0
              ? "All pieces"
              : `${activeFilterCount} active`}
          </span>
        </div>

        <section className="rounded-[var(--radius)] border border-border/55 bg-background/72 p-4 backdrop-blur-sm">
          <p className="field-label">Search</p>

          <div className="relative mt-4">
            <RiSearch2Line className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="collection-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="field-input bg-card pl-10"
              placeholder="Search products"
              disabled={disabled}
            />
          </div>
        </section>

        <section className="rounded-[var(--radius)] border border-border/55 bg-background/72 p-4 backdrop-blur-sm">
          <p className="field-label">Price</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="collection-min-price"
                className="mb-1.5 block text-[0.62rem] font-medium tracking-[0.14em] text-muted-foreground uppercase"
              >
                Min
              </label>
              <input
                id="collection-min-price"
                type="number"
                min="0"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                className="field-input bg-card"
                placeholder="0"
                disabled={disabled}
              />
            </div>
            <div>
              <label
                htmlFor="collection-max-price"
                className="mb-1.5 block text-[0.62rem] font-medium tracking-[0.14em] text-muted-foreground uppercase"
              >
                Max
              </label>
              <input
                id="collection-max-price"
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                className="field-input bg-card"
                placeholder="1000"
                disabled={disabled}
              />
            </div>
          </div>
        </section>

        <section className="rounded-[var(--radius)] border border-border/55 bg-background/72 p-4 backdrop-blur-sm">
          <p className="field-label">Per Page</p>

          <div className="mt-4">
            <Select
              value={pageSize}
              onValueChange={(nextValue) => {
                setPageSize(
                  nextValue ? String(nextValue) : String(PRODUCTS_PER_PAGE)
                )
              }}
              disabled={disabled}
            >
              <SelectTrigger className="bg-card">
                <SelectValue
                  placeholder="Choose a layout"
                  className="truncate data-[placeholder]:text-muted-foreground/75"
                />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size} products
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>
      </div>

      <div className="grid gap-3">
        <Button type="submit" size="lg" className="w-full" disabled={disabled}>
          <RiFilter3Line className="size-4" />
          Apply Filters
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="w-full"
          onClick={handleReset}
          disabled={disabled || !hasActiveFilters}
        >
          Reset Filters
        </Button>
      </div>
    </form>
  )
}
