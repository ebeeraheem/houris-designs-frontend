"use client"

import { useState } from "react"

import { EmptyOrdersIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { useGetOrders } from "../usecases/useGetOrders"
import { OrderList } from "./OrderList"

function OrderHistorySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`order-history-skeleton-${index}`}
          className="surface-card p-4 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="h-6 w-40 animate-pulse rounded-full bg-secondary/60" />
              <div className="mt-3 h-4 w-32 animate-pulse rounded-full bg-secondary/60" />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="ml-auto h-6 w-24 animate-pulse rounded-full bg-secondary/60 sm:w-28" />
                <div className="mt-3 ml-auto h-4 w-16 animate-pulse rounded-full bg-secondary/60" />
              </div>
              <div className="h-10 w-10 animate-pulse rounded-full bg-secondary/60" />
            </div>
          </div>
          <div className="mt-6 border-t border-border/50 pt-6">
            <div className="h-3 w-16 animate-pulse rounded-full bg-secondary/60" />
            <div className="mt-3 h-4 w-full max-w-[30rem] animate-pulse rounded-full bg-secondary/60" />
            <div className="mt-2 h-4 w-full max-w-[24rem] animate-pulse rounded-full bg-secondary/60" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function OrderHistoryView() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, isFetching, refetch } = useGetOrders({
    pageNumber: page,
  })

  if (isLoading && !data) {
    return <OrderHistorySkeleton />
  }

  if (isError && !data) {
    return (
      <div data-page-section className="surface-card p-8 text-center">
        <p className="text-muted-foreground">
          We couldn&apos;t load your order history.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => {
            void refetch()
          }}
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (!data || data.data.length === 0) {
    return (
      <div data-page-section className="surface-card p-8 text-center sm:p-10">
        <EmptyState
          icon={<EmptyOrdersIcon className="size-7" aria-hidden="true" />}
          title="No orders yet"
          description="Your orders will appear here."
          actionHref="/couture"
          actionLabel="Continue Shopping"
        />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div
        data-page-section
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-[0.78rem] tracking-[0.14em] text-muted-foreground uppercase">
          Showing {data.startRecord}-{data.endRecord} of {data.total}
        </p>
        <div className="flex items-center gap-3">
          {isFetching ? (
            <span className="status-pill border-brand/20 bg-brand/10 text-brand">
              Updating
            </span>
          ) : null}
          <span className="status-pill border-border bg-background/80 text-foreground/78">
            Page {data.page} of {data.totalPages}
          </span>
        </div>
      </div>

      <OrderList orders={data.data} />

      <div
        data-page-section
        className="flex flex-col gap-4 border-t border-border/50 pt-4 sm:flex-row sm:items-center sm:justify-end"
      >
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setPage((current) => current - 1)}
            disabled={!data.hasPrev || isFetching}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPage((current) => current + 1)}
            disabled={!data.hasNext || isFetching}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
