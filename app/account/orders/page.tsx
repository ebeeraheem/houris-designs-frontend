import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { BackIconLink } from "@/components/ui/back-icon-link"
import { OrderHistoryView } from "@/features/orders/components/OrderHistoryView"

export default function OrdersPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-svh py-8 sm:py-12 lg:py-16">
        <PageReveal className="page-shell">
          <div
            data-page-intro
            className="mb-10 flex items-start gap-4 sm:mb-14 sm:gap-5"
          >
            <BackIconLink
              data-page-intro
              href="/account"
              label="Back to account"
              className="mt-1 shrink-0"
            />

            <div className="max-w-[38rem]">
              <p className="eyebrow-label text-brand">Your History</p>
              <h1 className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
                Order History
              </h1>
              <p className="mt-4 max-w-[38rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                Review recent pieces, track current progress, and open any order
                for a fuller breakdown.
              </p>
            </div>
          </div>

          <OrderHistoryView />
        </PageReveal>
      </main>
      <SiteFooter />
    </>
  )
}
