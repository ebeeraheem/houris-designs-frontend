import { Suspense } from "react"
import { BackIconLink } from "@/components/ui/back-icon-link"
import { PageReveal } from "@/components/page-reveal"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCollectionView } from "@/features/products/components"

function CollectionSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] xl:grid-cols-[22rem_minmax(0,1fr)]">
      <aside className="relative hidden overflow-hidden rounded-[var(--radius)] border border-border/45 bg-surface shadow-panel lg:sticky lg:top-6 lg:block lg:self-start">
        <div className="relative p-4 sm:p-5">
          <div className="flex flex-col gap-6">
            <div className="flex justify-end">
              <div className="h-8 w-24 animate-pulse rounded-full bg-secondary/60" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <section key={i} className="rounded-[var(--radius)] border border-border/75 bg-background/72 p-4 backdrop-blur-sm">
                <div className="h-3 w-24 animate-pulse rounded-full bg-secondary/60" />
                <div className="mt-3 h-4 w-40 animate-pulse rounded-full bg-secondary/60" />
                <div className="mt-4 h-11 w-full animate-pulse rounded-full bg-secondary/60" />
              </section>
            ))}
            <div className="grid gap-3">
              <div className="h-12 w-full animate-pulse rounded-full bg-secondary/60" />
              <div className="h-12 w-full animate-pulse rounded-full bg-secondary/60" />
            </div>
          </div>
        </div>
      </aside>
      <div className="min-w-0 flex flex-col gap-6">
        <div className="h-9 w-28 animate-pulse rounded-full bg-secondary/60" />
        <div className="surface-panel p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-7 w-24 animate-pulse rounded-full bg-secondary/60" />
                <div className="h-7 w-24 animate-pulse rounded-full bg-secondary/60" />
              </div>
              <div className="mt-4 h-4 w-full max-w-[22rem] animate-pulse rounded-full bg-secondary/60" />
              <div className="mt-2 h-4 w-full max-w-[18rem] animate-pulse rounded-full bg-secondary/60" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-9 w-28 animate-pulse rounded-full bg-secondary/60" />
              <div className="h-9 w-24 animate-pulse rounded-full bg-secondary/60" />
            </div>
          </div>
        </div>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="lg:col-span-4">
              <div className="image-shell">
                <div className="h-[22rem] w-full animate-pulse rounded-[var(--radius)] bg-secondary/60 sm:h-[26rem] lg:h-[30rem]" />
              </div>
              <div className="space-y-2 pt-4">
                <div className="h-3 w-28 animate-pulse rounded-full bg-secondary/60" />
                <div className="h-5 w-3/4 animate-pulse rounded-full bg-secondary/60" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-secondary/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CollectionPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden py-6 sm:py-10 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-28 left-[8%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />
        <div className="page-shell">
          <PageReveal>
            <div
              data-page-intro
              className="mb-10 flex items-start gap-4 sm:mb-14 sm:gap-5"
            >
              <BackIconLink
                href="/"
                label="Back to home"
                className="mt-1 shrink-0"
              />

              <div className="max-w-[42rem]">
                <h1 className="font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
                  The Collection
                </h1>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                  Discover statement garments, occasion silhouettes, and
                  everyday essentials from the latest Houris edit.
                </p>
              </div>
            </div>

            <div data-page-section>
              <Suspense fallback={<CollectionSkeleton />}>
                <ProductCollectionView />
              </Suspense>
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
