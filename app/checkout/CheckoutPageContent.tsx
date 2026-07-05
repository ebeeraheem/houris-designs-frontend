"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import toast from "react-hot-toast"

import { EmptyCartIcon } from "@/components/icons"
import { BackIconLink } from "@/components/ui/back-icon-link"
import { EmptyState } from "@/components/ui/empty-state"
import { PageReveal } from "@/components/page-reveal"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { useGetAddress } from "@/features/account/usecases/useGetAddress"
import {
  syncAuthProfile,
  useAuthSession,
} from "@/features/authentication/usecases/useAuthProfile"
import { useGetCart } from "@/features/cart"
import { CART_QUERY_KEY } from "@/features/cart/cart.constants"
import {
  clearGuestCartStorage,
  readGuestCartItems,
} from "@/features/cart/guest/guestCart.storage"
import { syncGuestCartToServer } from "@/features/cart/guest/syncGuestCart"
import {
  CHECKOUT_ROUTES,
  CHECKOUT_STORAGE_KEYS,
} from "@/features/orders/checkout.constants"
import { getCheckoutErrorMessage } from "@/features/orders/checkout.error"
import { isAllowedPaymentUrl } from "@/features/orders/checkout.payment-url"
import type { CheckoutResult } from "@/features/orders/checkout.types"
import { CheckoutForm } from "@/features/orders/components/CheckoutForm"
import { GuestCheckoutForm } from "@/features/orders/components/GuestCheckoutForm"
import type { GuestCheckoutPayload } from "@/features/orders/guestCheckout.schema"
import { useCheckout } from "@/features/orders/usecases/useCheckout"
import { useGuestCheckout } from "@/features/orders/usecases/useGuestCheckout"
import { formatSizeCode } from "@/utils/size-codes"

export function CheckoutPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnedReference =
    searchParams.get("reference") ?? searchParams.get("trxref")
  const {
    data: cart,
    isLoading: isCartLoading,
    isError: hasCartError,
    refetch: refetchCart,
  } = useGetCart({ enabled: !returnedReference })
  const { data: session, isLoading: isAuthLoading } = useAuthSession()
  const isAuthenticated = session?.isAuthenticated ?? false
  const addressQuery = useGetAddress({
    enabled: isAuthenticated && !returnedReference,
  })
  const savedAddress = addressQuery.data
  const checkout = useCheckout()
  const guestCheckout = useGuestCheckout()
  const queryClient = useQueryClient()
  const [conflictEmail, setConflictEmail] = useState<string | null>(null)

  const items = cart?.items ?? []
  const total = cart?.total ?? 0
  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0)
  const summaryItems = items.map((item) => ({
    id:
      item.id ??
      `${item.productId}-${item.colourLabel}-${item.sizeLengthCode ?? "none"}-${item.sizeWidthCode ?? "none"}`,
    productTitle: item.productTitle,
    colourLabel: item.colourLabel,
    sizeLabel: formatSizeCode(item.sizeLengthCode, item.sizeWidthCode),
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    lineSubtotal: item.lineSubtotal,
  }))

  // CheckoutForm seeds its "use saved address" toggle and form defaults from the
  // savedAddress prop at mount, so it must not mount until that value is known.
  // Wait through the auth-resolving window, then (if signed in) until the address
  // query settles to a result (success — including a 404→null — or error).
  const isResolvingSavedAddress =
    !returnedReference &&
    (isAuthLoading ||
      (isAuthenticated && !addressQuery.isSuccess && !addressQuery.isError))

  useEffect(() => {
    if (!returnedReference) {
      return
    }

    const queryString = searchParams.toString()
    const destination = queryString
      ? `${CHECKOUT_ROUTES.SUCCESS}?${queryString}`
      : CHECKOUT_ROUTES.SUCCESS

    router.replace(destination)
  }, [returnedReference, router, searchParams])

  const clearPendingReference = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(CHECKOUT_STORAGE_KEYS.PENDING_REFERENCE)
    }
  }

  // Shared guardrails for handing the customer off to the Paystack-hosted page.
  const beginPaymentRedirect = (result: CheckoutResult) => {
    const pendingReference = result.reference || result.orderReference

    if (!result.paymentUrl) {
      clearPendingReference()
      toast.error("Checkout started, but no payment link was returned.")
      return
    }

    if (!isAllowedPaymentUrl(result.paymentUrl)) {
      clearPendingReference()
      toast.error(
        "We couldn't start a secure payment session. Please try again."
      )
      return
    }

    if (typeof window !== "undefined" && pendingReference) {
      window.sessionStorage.setItem(
        CHECKOUT_STORAGE_KEYS.PENDING_REFERENCE,
        pendingReference
      )
    }

    window.location.assign(result.paymentUrl)
  }

  const handleCheckout = async (
    payload: Parameters<typeof checkout.mutateAsync>[0]
  ) => {
    try {
      const result = await checkout.mutateAsync(payload)
      beginPaymentRedirect(result)
    } catch (error) {
      clearPendingReference()
      toast.error(
        getCheckoutErrorMessage(
          error,
          "We couldn't start checkout. Please try again."
        )
      )
    }
  }

  const handleGuestCheckout = async (payload: GuestCheckoutPayload) => {
    const guestItems = readGuestCartItems().map((item) => ({
      productId: item.productId,
      swatchId: item.swatchId,
      sizeLengthCode: item.sizeLengthCode,
      sizeWidthCode: item.sizeWidthCode,
      quantity: item.quantity,
    }))

    try {
      const result = await guestCheckout.mutateAsync({
        payload,
        items: guestItems,
      })

      // Account created, session cookies set, items now live in the server
      // cart — the local guest copy is done.
      clearGuestCartStorage()
      await syncAuthProfile(queryClient)
      beginPaymentRedirect(result)
    } catch (error) {
      clearPendingReference()

      if (isAxiosError(error) && error.response?.status === 409) {
        // Email already registered — flip to the inline sign-in step.
        setConflictEmail(payload.email)
        return
      }

      // The account may exist even though checkout failed (cookies are set
      // before cart seeding). If so, the valid items are already in the server
      // cart: drop the local copy so quantities don't double, and let the page
      // re-render into the authenticated flow.
      const profile = await syncAuthProfile(queryClient)
      if (profile) {
        clearGuestCartStorage()
        await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] })
      }

      toast.error(
        getCheckoutErrorMessage(
          error,
          "We couldn't start checkout. Please try again."
        )
      )
    }
  }

  const handleConflictSignedIn = async () => {
    // useLogin already refreshed the auth profile; carry the guest cart into
    // the server cart, then let the page re-render as the authenticated flow.
    await syncGuestCartToServer(queryClient)
    setConflictEmail(null)
  }

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
            <div className="flex items-start gap-4 sm:gap-5">
              <BackIconLink
                data-page-intro
                href="/cart"
                label="Back to cart"
                className="mt-1 shrink-0"
              />

              <div className="min-w-0 flex-1">
                {returnedReference ? (
                  <div className="surface-card p-8 text-center sm:p-10">
                    <p className="eyebrow-label text-brand">Checkout Return</p>
                    <h2 className="mt-3 font-heading text-[1.7rem] leading-[0.94] font-medium tracking-[-0.05em] uppercase sm:text-[2rem]">
                      Redirecting to payment verification.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      We detected a payment reference in the return URL and are
                      moving you into the verification screen now.
                    </p>
                  </div>
                ) : isCartLoading || isResolvingSavedAddress ? (
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
                ) : hasCartError ? (
                  <div className="surface-card p-8 text-center">
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
                  <div className="surface-card p-8 text-center sm:p-10">
                    <EmptyState
                      icon={
                        <EmptyCartIcon className="size-7" aria-hidden="true" />
                      }
                      title="Your cart is empty"
                      description="Add a few considered pieces before moving into the payment flow."
                      actionHref="/couture"
                      actionLabel="Continue Shopping"
                    />
                  </div>
                ) : isAuthenticated ? (
                  <CheckoutForm
                    cartTotal={total}
                    cartItemsCount={totalPieces}
                    cartItems={summaryItems}
                    savedAddress={savedAddress ?? null}
                    onSubmit={handleCheckout}
                  />
                ) : (
                  <GuestCheckoutForm
                    cartTotal={total}
                    cartItemsCount={totalPieces}
                    cartItems={summaryItems}
                    onSubmit={handleGuestCheckout}
                    conflictEmail={conflictEmail}
                    onSignedIn={handleConflictSignedIn}
                    onUseDifferentEmail={() => setConflictEmail(null)}
                  />
                )}
              </div>
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
