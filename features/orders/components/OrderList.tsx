import Link from "next/link"
import { RiArrowRightUpLine } from "@remixicon/react"

import { ORDER_ROUTES } from "../order.constants"
import type { OrderHistoryItem } from "../order.types"
import {
  formatOrderDate,
  getOrderStatusClasses,
  getOrderStatusLabel,
} from "../order.utils"
import { formatCurrency } from "@/utils/format-currency"

interface OrderListProps {
  orders: OrderHistoryItem[]
}

function formatProductSummary(productTitles: string[]) {
  if (productTitles.length === 0) {
    return "Order details available inside."
  }

  if (productTitles.length === 1) {
    return productTitles[0]
  }

  if (productTitles.length === 2) {
    return `${productTitles[0]} and ${productTitles[1]}`
  }

  return `${productTitles[0]}, ${productTitles[1]}, and ${productTitles.length - 2} more`
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={ORDER_ROUTES.DETAIL(order.id)}
          className="group block"
        >
          <article className="surface-card p-4 transition-colors duration-200 group-hover:border-brand/35 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-heading text-[1rem] font-medium tracking-[-0.02em]">
                    {order.orderReference}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-[var(--radius)] border px-3 py-1 text-[0.62rem] font-medium tracking-[0.14em] uppercase ${getOrderStatusClasses(order.status)}`}
                  >
                    {getOrderStatusLabel(order.status)}
                  </span>
                </div>
                <p className="mt-1 text-[0.72rem] text-muted-foreground">
                  Placed on {formatOrderDate(order.datePlaced)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className="font-heading text-[1.22rem] font-medium tracking-[-0.05em] sm:text-[1.35rem]">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-[0.72rem] text-muted-foreground">
                    {order.productTitles.length} piece
                    {order.productTitles.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="rounded-[var(--radius)] border border-border/70 p-2 text-brand transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <RiArrowRightUpLine className="size-4" />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-border/50 pt-6">
              <p className="text-[0.72rem] font-medium tracking-[0.16em] text-brand uppercase">
                Pieces
              </p>
              <p className="mt-3 max-w-[44rem] text-sm leading-7 text-muted-foreground">
                {formatProductSummary(order.productTitles)}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
