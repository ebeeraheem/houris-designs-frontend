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

            <h1 className="font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
              Order History
            </h1>
          </div>

          <OrderHistoryView />
        </PageReveal>
      </main>
      <SiteFooter />
    </>
  )
}
