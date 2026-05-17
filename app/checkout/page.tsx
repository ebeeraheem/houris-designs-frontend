import { Suspense } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { CheckoutPageContent } from "./CheckoutPageContent"

function CheckoutPageSkeleton() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden py-6 sm:py-10 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 right-[6%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />
        <div className="page-shell">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="mt-1 shrink-0">
              <div className="h-5 w-28 animate-pulse rounded-full bg-secondary/60" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-8">
                <div className="space-y-6">
                  <div className="surface-card p-6 sm:p-8">
                    <div className="h-3 w-32 animate-pulse rounded-full bg-secondary/60" />
                    <div className="mt-4 h-8 w-2/3 animate-pulse rounded-full bg-secondary/60" />
                    <div className="mt-4 h-4 w-full max-w-[34rem] animate-pulse rounded-full bg-secondary/60" />
                    <div className="mt-2 h-4 w-full max-w-[22rem] animate-pulse rounded-full bg-secondary/60" />
                    <div className="mt-6 flex gap-3">
                      <div className="h-8 w-28 animate-pulse rounded-full bg-secondary/60" />
                      <div className="h-8 w-24 animate-pulse rounded-full bg-secondary/60" />
                    </div>
                  </div>
                  <div className="surface-card p-6 sm:p-8">
                    <div className="h-3 w-24 animate-pulse rounded-full bg-secondary/60" />
                    <div className="mt-4 h-8 w-56 animate-pulse rounded-full bg-secondary/60" />
                    <div className="mt-8 space-y-4">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={`checkout-field-skeleton-${index}`}
                          className="h-16 animate-pulse rounded-[var(--radius)] bg-secondary/60"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="surface-card h-fit p-6">
                  <div className="h-3 w-28 animate-pulse rounded-full bg-secondary/60" />
                  <div className="mt-6 space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={`checkout-summary-skeleton-${index}`}
                        className="h-20 animate-pulse rounded-[var(--radius)] bg-secondary/60"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutPageSkeleton />}>
      <CheckoutPageContent />
    </Suspense>
  )
}
