"use client"

import { RiMapPin2Line, RiTimeLine } from "@remixicon/react"

import { EmptyOrdersIcon } from "@/components/icons"
import { BackIconLink } from "@/components/ui/back-icon-link"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { useGetOrderById } from "../usecases/useGetOrderById"
import {
  formatOrderDate,
  formatOrderDateTime,
  getOrderStatusClasses,
  getOrderStatusLabel,
} from "../order.utils"
import { formatCurrency } from "@/utils/format-currency"
import { formatSizeCode } from "@/utils/size-codes"

interface OrderDetailViewProps {
  orderId: string
}

function OrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="surface-card p-6 sm:p-8">
        <div className="mb-6 h-8 w-28 animate-pulse rounded-full bg-secondary/60" />
        <div className="h-4 w-32 animate-pulse rounded-full bg-secondary/60" />
        <div className="mt-4 h-10 w-3/5 animate-pulse rounded-full bg-secondary/60" />
        <div className="mt-6 flex flex-wrap gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`order-detail-pill-skeleton-${index}`}
              className="h-9 w-28 animate-pulse rounded-full bg-secondary/60"
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <div className="surface-card p-6 sm:p-8">
          <div className="h-4 w-24 animate-pulse rounded-full bg-secondary/60" />
          <div className="mt-6 space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`order-item-skeleton-${index}`} className="space-y-3">
                <div className="h-5 w-2/3 animate-pulse rounded-full bg-secondary/60" />
                <div className="h-4 w-1/2 animate-pulse rounded-full bg-secondary/60" />
                <div className="h-4 w-24 animate-pulse rounded-full bg-secondary/60" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="h-4 w-28 animate-pulse rounded-full bg-secondary/60" />
            <div className="mt-6 space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`order-history-skeleton-${index}`}
                  className="h-14 animate-pulse rounded-[var(--radius)] bg-secondary/60"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function OrderDetailView({ orderId }: OrderDetailViewProps) {
  const { data: order, isLoading, isError, refetch } = useGetOrderById(orderId)

  if (isLoading) {
    return <OrderDetailSkeleton />
  }

  if (isError || !order) {
    return (
      <div className="surface-card p-6 sm:p-8">
        <BackIconLink
          href="/account/orders"
          label="Back to orders"
          className="mb-6"
        />
        <p className="text-muted-foreground">
          We couldn&apos;t load this order right now.
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

  return (
    <div className="space-y-6">
      <section data-page-intro className="surface-card p-6 sm:p-8">
        <BackIconLink
          href="/account/orders"
          label="Back to orders"
          className="mb-6"
        />

        <p className="eyebrow-label text-brand">Order Detail</p>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem]">
              {order.orderReference}
            </h1>
            <p className="mt-3 max-w-[40rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
              Placed on {formatOrderDate(order.datePlaced)} with{" "}
              {order.items.length} piece{order.items.length === 1 ? "" : "s"} in
              this order.
            </p>
          </div>

          <span
            className={`inline-flex w-fit items-center rounded-[var(--radius)] border px-3 py-1 text-[0.62rem] font-medium tracking-[0.14em] uppercase ${getOrderStatusClasses(order.status)}`}
          >
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="status-pill gap-2 border-brand/20 bg-brand/10 text-brand">
            <span>Total</span>
            <span className="font-heading text-[1.02rem] tracking-[-0.05em] normal-case sm:text-[1.1rem]">
              {formatCurrency(order.total, order.currency)}
            </span>
          </div>
          <div className="status-pill border-border bg-background/80 text-foreground/78">
            {order.items.length} line item{order.items.length === 1 ? "" : "s"}
          </div>
          <div className="status-pill border-border bg-background/80 text-foreground/78">
            Updated {formatOrderDate(order.updatedAt ?? order.datePlaced)}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:gap-8">
        <section data-page-section className="surface-card p-6 sm:p-8">
          <p className="eyebrow-label text-brand">Items</p>
          {order.items.length === 0 ? (
            <div className="mt-6 rounded-[var(--radius)] border border-border/70 bg-background/70 p-6 sm:p-8">
              <EmptyState
                icon={<EmptyOrdersIcon className="size-7" aria-hidden="true" />}
                title="No line items returned"
                description="This order was returned without any pieces attached to it."
              />
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {order.items.map((item, index) => (
                <article
                  key={`${item.productTitle}-${index}`}
                  className="rounded-[var(--radius)] border border-border/70 bg-background/70 p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-heading text-[1.2rem] leading-none tracking-[-0.04em]">
                        {item.productTitle}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.colourLabel} /{" "}
                        {formatSizeCode(
                          item.sizeLengthCode,
                          item.sizeWidthCode
                        )}{" "}
                        / Qty {item.quantity}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-heading text-[1.18rem] font-medium tracking-[-0.05em] sm:text-[1.28rem]">
                        {formatCurrency(item.lineSubtotal, order.currency)}
                      </p>
                      <p className="mt-1 text-[0.9rem] text-muted-foreground">
                        {formatCurrency(item.unitPrice, order.currency)} each
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section data-page-section className="surface-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-[var(--radius)] bg-brand/12 p-2 text-brand">
                <RiTimeLine className="size-4" />
              </div>
              <div>
                <p className="eyebrow-label text-brand">Timeline</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Recent order status changes.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {order.statusHistory.map((entry, index) => (
                <div
                  key={`${entry.status}-${entry.changedAt ?? index}`}
                  className="rounded-[var(--radius)] border border-border/70 bg-background/70 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center rounded-[var(--radius)] border px-3 py-1 text-[0.62rem] font-medium tracking-[0.14em] uppercase ${getOrderStatusClasses(entry.status)}`}
                    >
                      {getOrderStatusLabel(entry.status)}
                    </span>
                    <span className="text-[0.78rem] text-muted-foreground">
                      {formatOrderDateTime(entry.changedAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {order.shippingAddress ? (
            <section data-page-section className="surface-card p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-[var(--radius)] bg-brand/12 p-2 text-brand">
                  <RiMapPin2Line className="size-4" />
                </div>
                <div>
                  <p className="eyebrow-label text-brand">Delivery Address</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Saved shipping details for this order.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[var(--radius)] border border-border/70 bg-background/70 p-4">
                <p className="font-heading text-[1rem] font-medium tracking-[-0.03em]">
                  {order.shippingAddress.recipientName}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2
                    ? `, ${order.shippingAddress.addressLine2}`
                    : ""}
                  <br />
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.stateRegion}
                  <br />
                  {order.shippingAddress.country}{" "}
                  {order.shippingAddress.postalCode}
                </p>
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
