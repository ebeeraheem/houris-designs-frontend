import Link from "next/link"

import { PageReveal } from "@/components/page-reveal"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { OrderList } from "@/features/orders/components/OrderList"

export default function OrdersPage() {
  const orders = getOrders()

  return (
    <>
      <SiteHeader />
      <main className="min-h-svh px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <PageReveal className="page-shell">
          <div
            data-page-intro
            className="mb-10 flex items-end justify-between gap-4 sm:mb-14"
          >
            <div>
              <p className="eyebrow-label text-brand">Your History</p>
              <h1 className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
                Order History
              </h1>
            </div>
            <Link href="/account" className="nav-link hidden sm:inline">
              Back to Account
            </Link>
          </div>

          {orders.length === 0 ? (
            <div data-page-section className="surface-card p-8 text-center">
              <p className="text-muted-foreground">No orders yet</p>
              <Link
                href="/collection"
                className="mt-4 inline-block text-[0.78rem] font-medium tracking-[0.14em] text-brand uppercase hover:underline"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <OrderList orders={orders} />
          )}

          <div className="mt-8 sm:hidden">
            <Link data-page-section href="/account" className="nav-link">
              Back to Account
            </Link>
          </div>
        </PageReveal>
      </main>
      <SiteFooter />
    </>
  )
}

function getOrders() {
  return [
    {
      id: "HD-2024-001",
      status: "DELIVERED",
      total: 480,
      createdAt: "Jan 15, 2024",
      items: [
        {
          productTitle: "The Structured Blazer",
          colourLabel: "Charcoal",
          sizeLengthCode: "B",
          sizeWidthCode: 12,
          quantity: 1,
        },
        {
          productTitle: "Tailored Wide Trousers",
          colourLabel: "Sand",
          sizeLengthCode: "B",
          sizeWidthCode: 12,
          quantity: 1,
        },
      ],
    },
    {
      id: "HD-2024-002",
      status: "IN_PROGRESS",
      total: 320,
      createdAt: "Feb 3, 2024",
      items: [
        {
          productTitle: "Draped Midi Dress",
          colourLabel: "Oxblood",
          sizeLengthCode: "A",
          sizeWidthCode: 10,
          quantity: 1,
        },
      ],
    },
  ]
}
