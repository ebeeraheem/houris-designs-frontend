import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { CheckoutVerificationView } from "@/features/orders/components/CheckoutVerificationView"

interface CheckoutSuccessPageProps {
  searchParams: Promise<{
    reference?: string
    trxref?: string
  }>
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const params = await searchParams
  const reference = params.reference ?? params.trxref

  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden py-6 sm:py-10 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 right-[6%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />

        <div className="page-shell">
          <PageReveal>
            <div className="mx-auto max-w-[56rem]">
              <section data-page-intro className="surface-card p-6 sm:p-8">
                <p className="eyebrow-label text-brand">Checkout Return</p>
                <h1 className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem]">
                  Finalizing your payment status.
                </h1>
                <p className="mt-4 max-w-[42rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                  Paystack has redirected you back. We&apos;re using the
                  returned reference to confirm the latest order outcome before
                  you move on.
                </p>
              </section>

              <div className="mt-6">
                <CheckoutVerificationView defaultReference={reference} />
              </div>
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
