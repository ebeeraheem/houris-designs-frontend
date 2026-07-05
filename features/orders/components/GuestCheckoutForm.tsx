"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { formatCurrency } from "@/utils/format-currency"
import {
  guestCheckoutSchema,
  type GuestCheckoutPayload,
} from "../guestCheckout.schema"
import { CheckoutSignIn } from "./CheckoutSignIn"

interface CheckoutLineItem {
  id: string
  productTitle: string
  quantity: number
  colourLabel?: string
  sizeLabel?: string
  unitPrice?: number
  lineSubtotal?: number
}

interface GuestCheckoutFormProps {
  cartTotal: number
  cartItemsCount: number
  cartItems?: CheckoutLineItem[]
  onSubmit: (data: GuestCheckoutPayload) => Promise<void>
  /** Set when the submitted email already belongs to an account (409). */
  conflictEmail: string | null
  onSignedIn: () => Promise<void> | void
  onUseDifferentEmail: () => void
}

/**
 * Checkout form for unauthenticated visitors: collects account details
 * (creating the account is part of checkout — no separate registration step)
 * alongside the shipping address. Kept separate from CheckoutForm so the
 * authenticated flow stays untouched.
 */
export function GuestCheckoutForm({
  cartTotal,
  cartItemsCount,
  cartItems = [],
  onSubmit,
  conflictEmail,
  onSignedIn,
  onUseDifferentEmail,
}: GuestCheckoutFormProps) {
  const totalPieces =
    cartItems.reduce((sum, item) => sum + item.quantity, 0) || cartItemsCount
  const fieldClass =
    "h-12 w-full min-w-0 rounded-[var(--radius)] border border-border/80 bg-background/92 px-4 text-[0.92rem] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.58)] outline-none transition focus:border-brand/45 focus:bg-background focus:shadow-[0_0_0_3px_rgba(160,86,67,0.08)]"

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestCheckoutPayload>({
    resolver: zodResolver(guestCheckoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      shippingAddress: {
        recipientName: "",
        line1: "",
        line2: null,
        city: "",
        stateOrRegion: "",
        country: "",
        postalCode: "",
      },
    },
  })

  const handleFormSubmit = async (data: GuestCheckoutPayload) => {
    await onSubmit(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid gap-6 lg:grid-cols-[minmax(0,56rem)_24rem] lg:justify-between xl:grid-cols-[minmax(0,58rem)_26rem] xl:gap-8"
    >
      <div className="min-w-0 space-y-6">
        <section
          data-page-intro
          className="surface-card min-w-0 p-5 sm:p-7 lg:p-8"
        >
          <p className="eyebrow-label text-brand">Checkout</p>
          <h1 className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3rem]">
            Review details and continue to payment.
          </h1>
          <p className="mt-4 max-w-[40rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
            Tell us who the order is for, add the delivery address, and move
            into the secure payment step. Your account is created along the way
            — no separate sign-up needed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="status-pill border-brand/20 bg-brand/10 text-brand">
              {totalPieces} piece{totalPieces === 1 ? "" : "s"} ready
            </div>
            <div className="status-pill gap-2 border-border bg-background/80 text-foreground/78">
              <span>Total</span>
              <span className="font-heading text-[1.02rem] tracking-[-0.05em] text-foreground normal-case sm:text-[1.1rem]">
                {formatCurrency(cartTotal)}
              </span>
            </div>
          </div>
        </section>

        <section data-page-section className="surface-card p-5 sm:p-6">
          <p className="eyebrow-label text-brand">Your Details</p>
          <h2 className="mt-3 font-heading text-[1.45rem] leading-none tracking-[-0.04em] sm:text-[1.7rem]">
            Account details
          </h2>
          <p className="mt-3 text-[0.84rem] leading-6 text-muted-foreground">
            We use these to create your account, track your made-to-measure
            order, and send updates.
          </p>

          {conflictEmail ? (
            <CheckoutSignIn
              email={conflictEmail}
              onSignedIn={onSignedIn}
              onUseDifferentEmail={onUseDifferentEmail}
            />
          ) : (
            <div className="mt-6 grid gap-5">
              <div>
                <label
                  htmlFor="guest-fullName"
                  className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
                >
                  Full Name
                </label>
                <input
                  id="guest-fullName"
                  {...register("fullName")}
                  type="text"
                  autoComplete="name"
                  className={fieldClass}
                  placeholder="Your full name"
                />
                {errors.fullName && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="guest-email"
                    className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="guest-email"
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="guest-password"
                    className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
                  >
                    Password
                  </label>
                  <PasswordInput
                    id="guest-password"
                    {...register("password")}
                    autoComplete="new-password"
                    className="bg-card"
                    placeholder="At least 8 characters"
                  />
                  {errors.password && (
                    <p className="mt-2 text-xs text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <section data-page-section className="surface-card p-5 sm:p-6">
          <p className="eyebrow-label text-brand">Shipping</p>
          <h2 className="mt-3 font-heading text-[1.45rem] leading-none tracking-[-0.04em] sm:text-[1.7rem]">
            Delivery details
          </h2>
          <p className="mt-3 text-[0.84rem] leading-6 text-muted-foreground">
            Enter the delivery address for this order.
          </p>

          <div className="mt-6 grid gap-5">
            <div>
              <label
                htmlFor="recipientName"
                className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
              >
                Recipient Name
              </label>
              <input
                id="recipientName"
                {...register("shippingAddress.recipientName")}
                className={fieldClass}
                placeholder="Full name"
              />
              {errors.shippingAddress?.recipientName && (
                <p className="mt-2 text-xs text-destructive">
                  {errors.shippingAddress.recipientName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="line1"
                className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
              >
                Address Line 1
              </label>
              <input
                id="line1"
                {...register("shippingAddress.line1")}
                className={fieldClass}
                placeholder="Street address"
              />
              {errors.shippingAddress?.line1 && (
                <p className="mt-2 text-xs text-destructive">
                  {errors.shippingAddress.line1.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="line2"
                className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
              >
                Address Line 2
              </label>
              <input
                id="line2"
                {...register("shippingAddress.line2")}
                className={fieldClass}
                placeholder="Apartment, suite, unit, etc. (optional)"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
                >
                  City
                </label>
                <input
                  id="city"
                  {...register("shippingAddress.city")}
                  className={fieldClass}
                  placeholder="City"
                />
                {errors.shippingAddress?.city && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.shippingAddress.city.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="stateOrRegion"
                  className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
                >
                  State / Region
                </label>
                <input
                  id="stateOrRegion"
                  {...register("shippingAddress.stateOrRegion")}
                  className={fieldClass}
                  placeholder="State or region"
                />
                {errors.shippingAddress?.stateOrRegion && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.shippingAddress.stateOrRegion.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="postalCode"
                  className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
                >
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  {...register("shippingAddress.postalCode")}
                  className={fieldClass}
                  placeholder="Postal code"
                />
                {errors.shippingAddress?.postalCode && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.shippingAddress.postalCode.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
                >
                  Country
                </label>
                <input
                  id="country"
                  {...register("shippingAddress.country")}
                  className={fieldClass}
                  placeholder="Country"
                />
                {errors.shippingAddress?.country && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.shippingAddress.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside
        data-page-section
        className="surface-card h-fit self-start p-5 sm:p-6 lg:sticky lg:top-24"
      >
        <p className="eyebrow-label text-brand">Order Summary</p>
        <p className="mt-3 text-[0.84rem] leading-6 text-muted-foreground">
          {totalPieces} piece{totalPieces === 1 ? "" : "s"} ready for payment.
        </p>

        <div className="mt-5 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="rounded-[var(--radius)] border border-border/70 bg-secondary/45 p-4"
            >
              <p className="font-heading text-[0.98rem] font-medium tracking-[-0.03em]">
                {item.productTitle}
              </p>
              <p className="mt-2 text-[0.76rem] leading-6 text-muted-foreground">
                Qty {item.quantity}
                {typeof item.unitPrice === "number"
                  ? ` × ${formatCurrency(item.unitPrice)}`
                  : ""}
                {item.colourLabel ? ` • ${item.colourLabel}` : ""}
                {item.sizeLabel ? ` • Size ${item.sizeLabel}` : ""}
              </p>
              {typeof item.lineSubtotal === "number" ? (
                <p className="mt-2 font-heading text-[1rem] font-medium tracking-[-0.04em]">
                  {formatCurrency(item.lineSubtotal)}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-3 border-t border-border/60 pt-5 text-[0.82rem]">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Items</span>
            <span>{cartItemsCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>Calculated at payment</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <span className="font-heading text-[1.05rem] font-medium tracking-[-0.03em]">
              Total
            </span>
            <span className="font-heading text-[1.3rem] font-medium tracking-[-0.05em] sm:text-[1.45rem]">
              {formatCurrency(cartTotal)}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-6 w-full"
          disabled={
            isSubmitting || cartItemsCount === 0 || Boolean(conflictEmail)
          }
        >
          {isSubmitting ? "Processing..." : "Create Account & Pay"}
        </Button>

        <p className="mt-3 text-center text-[0.74rem] leading-6 text-muted-foreground">
          {conflictEmail
            ? "Sign in above to continue with this order."
            : cartItemsCount === 0
              ? "Add pieces to your cart before continuing."
              : "You'll be redirected to the secure payment step next."}
        </p>
      </aside>
    </form>
  )
}
