"use client"

import { Button } from "@/components/ui/button"
import { useGetSizeGuide } from "../usecases/useGetSizeGuide"
import { SizeGuideContent } from "./SizeGuideContent"

function Skeleton({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-[var(--radius)] bg-secondary/60 ${className}`}
    />
  )
}

export function SizeGuideView() {
  const { data, isLoading, isError, refetch } = useGetSizeGuide()

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-12">
          <div data-page-section className="surface-card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-5 w-20 rounded-full" />
              <div className="h-px flex-1 bg-border/70" />
              <Skeleton className="h-4 w-32 rounded-full" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>

              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`size-guide-length-skeleton-${index}`}
                  className="grid grid-cols-3 gap-4 border-b border-border/40 pb-3"
                >
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>

          <div data-page-section className="surface-card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-5 w-20 rounded-full" />
              <div className="h-px flex-1 bg-border/70" />
              <Skeleton className="h-4 w-40 rounded-full" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 border-b border-border pb-3">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>

              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`size-guide-width-skeleton-${index}`}
                  className="grid grid-cols-4 gap-4 border-b border-border/40 pb-3"
                >
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div data-page-section className="surface-card p-6 sm:p-8">
          <Skeleton className="h-5 w-32 rounded-full" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={`size-guide-measure-skeleton-${index}`}>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="mt-3 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-5/6" />
                <Skeleton className="mt-2 h-3 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div data-page-section className="surface-card p-6 sm:p-8">
        <p className="eyebrow-label text-brand">Precision Fit</p>
        <h2 className="mt-3 font-heading text-[1.4rem] leading-none tracking-[-0.05em] sm:text-[1.7rem]">
          We couldn&apos;t load the live size guide.
        </h2>
        <p className="mt-3 max-w-[34rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
          Please try again to fetch the latest length and width codes from the
          API.
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
    )
  }

  return <SizeGuideContent guide={data} />
}
