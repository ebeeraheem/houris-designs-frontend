"use client"

import toast from "react-hot-toast"

import { EmptyCartIcon } from "@/components/icons"
import { BackIconLink } from "@/components/ui/back-icon-link"
import { EmptyState } from "@/components/ui/empty-state"
import { PageReveal } from "@/components/page-reveal"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { useGetAddress } from "@/features/account/usecases/useGetAddress"
import { useGetCart } from "@/features/cart"
import { CheckoutForm } from "@/features/orders/components/CheckoutForm"
import { useCheckout } from "@/features/orders/usecases/useCheckout"
import { formatSizeCode } from "@/utils/size-codes"

export default function CheckoutPage() {
  const {
    data: cart,
    isLoading: isCartLoading,
    isError: hasCartError,
    refetch: refetchCart,
  } = useGetCart()
  const { data: savedAddress } = useGetAddress()
  const checkout = useCheckout()

  const items = cart?.items ?? []
  const total = cart?.total ?? 0
  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = async (
    payload: Parameters<typeof checkout.mutateAsync>[0]
  ) => {
    try {
      const result = await checkout.mutateAsync(payload)

      if (!result.paymentUrl) {
        toast.error("Checkout started, but no payment link was returned.")
        return
      }

      window.location.assign(result.paymentUrl)
    } catch {
      toast.error("We couldn't start checkout. Please try again.")
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden py-6 sm:py-10 lg:py-14">
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(133,81,66,0.2),transparent_58%)]"
        /> */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 right-[6%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />

        <div className="page-shell">
          <PageReveal>
            <div className="flex items-start gap-4 sm:gap-5">
              <BackIconLink
                data-page-intro
                href="/cart"
                label="Back to cart"
                className="mt-1 shrink-0"
              />

              <section
                data-page-intro
                className="surface-card min-w-0 flex-1 p-5 sm:p-7 lg:p-8"
              >
                <p className="eyebrow-label text-brand">Checkout</p>
                <h1 className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3rem]">
                  Review details and continue to payment.
                </h1>
                <p className="mt-4 max-w-[40rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                  Confirm your shipping address, review the pieces in your cart,
                  and move into the secure payment step.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="status-pill border-brand/20 bg-brand/10 text-brand">
                    {totalPieces} piece{totalPieces === 1 ? "" : "s"} ready
                  </div>
                  <div className="status-pill border-border bg-background/80 text-foreground/78">
                    Total {total > 0 ? total.toLocaleString() : 0}
                  </div>
                </div>
              </section>
            </div>

            {isCartLoading ? (
              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(20rem,0.96fr)] xl:gap-8">
                <div className="surface-card p-6 sm:p-8">
                  <div className="h-3 w-32 animate-pulse rounded-full bg-secondary/60" />
                  <div className="mt-4 h-8 w-2/3 animate-pulse rounded-full bg-secondary/60" />
                  <div className="mt-8 space-y-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={`checkout-field-skeleton-${index}`}
                        className="h-16 animate-pulse rounded-[var(--radius)] bg-secondary/60"
                      />
                    ))}
                  </div>
                </div>
                <div className="surface-card p-6">
                  <div className="h-3 w-28 animate-pulse rounded-full bg-secondary/60" />
                  <div className="mt-6 space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={`checkout-summary-skeleton-${index}`}
                        className="h-4 animate-pulse rounded-full bg-secondary/60"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : hasCartError ? (
              <div className="mt-6 surface-card p-8 text-center">
                <p className="text-muted-foreground">
                  We couldn&apos;t load your cart for checkout.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    void refetchCart()
                  }}
                >
                  Try Again
                </Button>
              </div>
            ) : items.length === 0 ? (
              <div className="mt-6 surface-card p-8 text-center sm:p-10">
                <EmptyState
                  icon={<EmptyCartIcon className="size-7" aria-hidden="true" />}
                  title="Your cart is empty"
                  description="Add a few considered pieces before moving into the payment flow."
                  actionHref="/collection"
                  actionLabel="Continue Shopping"
                />
              </div>
            ) : (
              <div className="mt-6">
                <CheckoutForm
                  cartTotal={total}
                  cartItemsCount={totalPieces}
                  cartItems={items.map((item) => ({
                    id:
                      item.id ??
                      `${item.productId}-${item.colourLabel}-${item.sizeLengthCode ?? "none"}-${item.sizeWidthCode ?? "none"}`,
                    productTitle: item.productTitle,
                    colourLabel: item.colourLabel,
                    sizeLabel: formatSizeCode(
                      item.sizeLengthCode,
                      item.sizeWidthCode
                    ),
                    quantity: item.quantity,
                    lineSubtotal: item.lineSubtotal,
                  }))}
                  savedAddress={savedAddress ?? null}
                  onSubmit={handleCheckout}
                />
              </div>
            )}
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
