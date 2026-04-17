"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  RiCheckLine,
  RiCloseLine,
  RiMapPin2Line,
  RiSecurePaymentLine,
  RiTruckLine,
} from "@remixicon/react"
import { z } from "zod"

import { Button } from "@/components/ui/button"

const shippingAddressSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().nullable().optional(),
  city: z.string().min(1, "City is required"),
  stateOrRegion: z.string().min(1, "State/Region is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
})

const checkoutSchema = z
  .object({
    useSavedAddress: z.boolean(),
    shippingAddress: shippingAddressSchema.nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.useSavedAddress && !data.shippingAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Shipping address is required",
        path: ["shippingAddress"],
      })
    }
  })

type CheckoutPayload = z.infer<typeof checkoutSchema>

interface SavedAddress {
  recipientName: string
  addressLine1: string
  addressLine2: string | null
  city: string
  stateRegion: string
  country: string
  postalCode: string
}

interface CheckoutLineItem {
  id: string
  productTitle: string
  quantity: number
  colourLabel?: string
  sizeLabel?: string
  lineSubtotal?: number
}

interface CheckoutSuccessState {
  recipientName: string
  addressLine: string
  destinationLabel: string
}

interface CheckoutFormProps {
  cartTotal: number
  cartItemsCount: number
  cartItems?: CheckoutLineItem[]
  savedAddress?: SavedAddress | null
  onSubmit?: (data: CheckoutPayload) => void
}

const deliveryNotes = [
  "Saved account addresses can be reused or adjusted before the final payment step.",
  "Shipping details stay aligned with the live API payload: recipient, street, city, state, country, and postal code.",
  "Once payment succeeds, the order can move into the made-to-order tracking flow tied to your account.",
]

const paymentNotes = [
  {
    icon: RiSecurePaymentLine,
    title: "Secure Handoff",
    description:
      "The next step should redirect into payment only after this review is complete.",
  },
  {
    icon: RiTruckLine,
    title: "Delivery Ready",
    description:
      "Your shipping details stay close to the order summary so the final review feels clear and calm.",
  },
]

function mapSavedAddressToCheckout(
  saved: SavedAddress
): CheckoutPayload["shippingAddress"] {
  return {
    recipientName: saved.recipientName,
    line1: saved.addressLine1,
    line2: saved.addressLine2,
    city: saved.city,
    stateOrRegion: saved.stateRegion,
    country: saved.country,
    postalCode: saved.postalCode,
  }
}

function buildCheckoutSuccessState(
  payload: CheckoutPayload,
  savedAddress: SavedAddress | null
): CheckoutSuccessState {
  const source =
    payload.shippingAddress ??
    (savedAddress ? mapSavedAddressToCheckout(savedAddress) : null)

  return {
    recipientName: source?.recipientName ?? "Private client",
    addressLine:
      [source?.line1, source?.line2].filter(Boolean).join(", ") ||
      "Saved address on file",
    destinationLabel: source
      ? `${source.city}, ${source.country}`
      : "Address ready for payment",
  }
}

export function CheckoutForm({
  cartTotal,
  cartItemsCount,
  cartItems = [],
  savedAddress = null,
  onSubmit,
}: CheckoutFormProps) {
  const [useSaved, setUseSaved] = useState(!!savedAddress)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successState, setSuccessState] = useState<CheckoutSuccessState | null>(
    null
  )

  const hasSavedAddress = !!savedAddress
  const totalPieces =
    cartItems.reduce((sum, item) => sum + item.quantity, 0) || cartItemsCount
  const fieldCardClass =
    "rounded-[1.25rem] border border-border/70 bg-background/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-5"

  useEffect(() => {
    if (!successState) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSuccessState(null)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [successState])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutPayload>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      useSavedAddress: useSaved,
      shippingAddress: savedAddress
        ? mapSavedAddressToCheckout(savedAddress)
        : {
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

  const handleSavedAddressChange = (checked: boolean) => {
    setUseSaved(checked)
    setValue("useSavedAddress", checked, {
      shouldDirty: true,
      shouldValidate: true,
    })

    if (checked && savedAddress) {
      setValue("shippingAddress", mapSavedAddressToCheckout(savedAddress), {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  const handleFormSubmit = async (data: CheckoutPayload) => {
    const payload: CheckoutPayload = {
      useSavedAddress: useSaved,
      shippingAddress: useSaved && savedAddress ? null : data.shippingAddress,
    }

    setIsSubmitting(true)

    if (onSubmit) {
      await onSubmit(payload)
    } else {
      console.log("Checkout payload:", payload)
      setSuccessState(buildCheckoutSuccessState(payload, savedAddress))
    }

    setIsSubmitting(false)
  }

  const displayAddress = useSaved && savedAddress ? savedAddress : null

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(20rem,0.96fr)] xl:gap-8"
      >
        <div className="grid gap-6">
          <section
            data-page-section
            className="surface-card relative overflow-hidden p-6 sm:p-8"
          >
            {/* <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-brand/14 via-brand/4 to-transparent"
            /> */}

            <div className="relative">
              <p className="eyebrow-label text-brand">Shipping Details</p>
              <h2 className="mt-3 font-heading text-[1.65rem] leading-none tracking-[-0.05em] sm:text-[1.9rem]">
                Delivery address and final review.
              </h2>
              <p className="mt-3 max-w-[38rem] text-[0.85rem] leading-7 text-muted-foreground">
                Confirm where the order should arrive, then move forward with a
                cleaner payment handoff.
              </p>

              {hasSavedAddress && (
                <div className="mt-6 rounded-[1.3rem] border border-border/70 bg-secondary/70 p-4 sm:p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-brand/12 p-2 text-brand">
                        <RiMapPin2Line className="size-4" />
                      </div>
                      <div>
                        <p className="text-[0.72rem] font-medium tracking-[0.18em] text-brand uppercase">
                          Saved Address
                        </p>
                        <p className="mt-2 max-w-[28rem] text-[0.8rem] leading-6 text-muted-foreground">
                          Use the address already on your account, or switch to
                          a new delivery destination for this order.
                        </p>
                      </div>
                    </div>

                    <label
                      htmlFor="use-saved-address"
                      className="group inline-flex min-w-[16rem] cursor-pointer items-center justify-between gap-4 self-start rounded-[1.1rem] border border-border/70 bg-background/85 px-4 py-3 transition hover:border-brand/30 hover:bg-background"
                    >
                      <input
                        id="use-saved-address"
                        name="useSavedAddress"
                        type="checkbox"
                        checked={useSaved}
                        onChange={(event) =>
                          handleSavedAddressChange(event.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <span className="min-w-0">
                        <span className="block text-[0.68rem] font-medium tracking-[0.18em] text-foreground uppercase">
                          Use saved address
                        </span>
                        <span className="mt-1 block text-[0.74rem] leading-5 text-muted-foreground">
                          Toggle between your account profile and a new address.
                        </span>
                      </span>
                      <span className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40">
                        <span className="absolute left-1 flex size-5 items-center justify-center rounded-full bg-white text-brand shadow-sm transition-transform duration-200 peer-checked:translate-x-5">
                          <RiCheckLine className="size-3" />
                        </span>
                      </span>
                    </label>
                  </div>

                  {displayAddress && (
                    <div className="mt-4 rounded-[1rem] border border-border/70 bg-background/78 p-4">
                      <p className="font-heading text-[1rem] font-medium tracking-[-0.03em]">
                        {displayAddress.recipientName}
                      </p>
                      <p className="mt-3 text-[0.8rem] leading-6 text-muted-foreground">
                        {displayAddress.addressLine1}
                        {displayAddress.addressLine2
                          ? `, ${displayAddress.addressLine2}`
                          : ""}
                        <br />
                        {displayAddress.city}, {displayAddress.stateRegion}{" "}
                        {displayAddress.postalCode}
                        <br />
                        {displayAddress.country}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {(!useSaved || !hasSavedAddress) && (
                <div className="mt-6 grid gap-5">
                  <div className={fieldCardClass}>
                    <label
                      htmlFor="recipientName"
                      className="field-label mb-3 block"
                    >
                      Recipient Name
                    </label>
                    <input
                      id="recipientName"
                      {...register("shippingAddress.recipientName")}
                      className="field-input w-full bg-card"
                      placeholder="Full name"
                    />
                    {errors.shippingAddress?.recipientName && (
                      <p className="mt-2 text-xs text-destructive">
                        {errors.shippingAddress.recipientName.message}
                      </p>
                    )}
                  </div>

                  <div className={fieldCardClass}>
                    <label htmlFor="line1" className="field-label mb-3 block">
                      Address Line 1
                    </label>
                    <input
                      id="line1"
                      {...register("shippingAddress.line1")}
                      className="field-input w-full bg-card"
                      placeholder="Street address"
                    />
                    {errors.shippingAddress?.line1 && (
                      <p className="mt-2 text-xs text-destructive">
                        {errors.shippingAddress.line1.message}
                      </p>
                    )}
                  </div>

                  <div className={fieldCardClass}>
                    <label htmlFor="line2" className="field-label mb-3 block">
                      Address Line 2{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <input
                      id="line2"
                      {...register("shippingAddress.line2")}
                      className="field-input w-full bg-card"
                      placeholder="Apartment, suite, unit, etc."
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className={fieldCardClass}>
                      <label htmlFor="city" className="field-label mb-3 block">
                        City
                      </label>
                      <input
                        id="city"
                        {...register("shippingAddress.city")}
                        className="field-input w-full bg-card"
                        placeholder="City"
                      />
                      {errors.shippingAddress?.city && (
                        <p className="mt-2 text-xs text-destructive">
                          {errors.shippingAddress.city.message}
                        </p>
                      )}
                    </div>

                    <div className={fieldCardClass}>
                      <label
                        htmlFor="stateOrRegion"
                        className="field-label mb-3 block"
                      >
                        State / Region
                      </label>
                      <input
                        id="stateOrRegion"
                        {...register("shippingAddress.stateOrRegion")}
                        className="field-input w-full bg-card"
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
                    <div className={fieldCardClass}>
                      <label
                        htmlFor="postalCode"
                        className="field-label mb-3 block"
                      >
                        Postal Code
                      </label>
                      <input
                        id="postalCode"
                        {...register("shippingAddress.postalCode")}
                        className="field-input w-full bg-card"
                        placeholder="Postal code"
                      />
                      {errors.shippingAddress?.postalCode && (
                        <p className="mt-2 text-xs text-destructive">
                          {errors.shippingAddress.postalCode.message}
                        </p>
                      )}
                    </div>

                    <div className={fieldCardClass}>
                      <label
                        htmlFor="country"
                        className="field-label mb-3 block"
                      >
                        Country
                      </label>
                      <input
                        id="country"
                        {...register("shippingAddress.country")}
                        className="field-input w-full bg-card"
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
              )}
            </div>
          </section>

          <section data-page-section className="surface-panel p-6 sm:p-7">
            <p className="eyebrow-label text-brand">Delivery Notes</p>
            <div className="mt-4 space-y-4">
              {deliveryNotes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-brand/12 p-1.5 text-brand">
                    <RiCheckLine className="size-3.5" />
                  </div>
                  <p className="text-[0.82rem] leading-6 text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="grid content-start gap-6 self-start lg:sticky lg:top-24">
          <section
            data-page-section
            className="surface-card relative overflow-hidden p-6 sm:p-7"
          >
            {/* <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-brand/12 via-brand/4 to-transparent"
            /> */}

            <div className="relative">
              <p className="eyebrow-label text-brand">Order Review</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-heading text-[1.5rem] leading-none tracking-[-0.05em]">
                    Summary
                  </h2>
                  <p className="mt-2 text-[0.8rem] leading-6 text-muted-foreground">
                    {totalPieces} piece{totalPieces === 1 ? "" : "s"} ready for
                    payment.
                  </p>
                </div>
                <div className="rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-[0.68rem] font-medium tracking-[0.16em] text-brand uppercase">
                  ${cartTotal.toFixed(2)}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[1rem] border border-border/70 bg-secondary/55 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {item.colourLabel && (
                            <p className="eyebrow-label text-brand">
                              {item.colourLabel}
                            </p>
                          )}
                          <p className="mt-1 font-heading text-[1rem] font-medium tracking-[-0.03em]">
                            {item.productTitle}
                          </p>
                          <p className="mt-2 text-[0.76rem] leading-6 text-muted-foreground">
                            Qty {item.quantity}
                            {item.sizeLabel ? ` • Size ${item.sizeLabel}` : ""}
                          </p>
                        </div>
                        {typeof item.lineSubtotal === "number" && (
                          <p className="text-[0.82rem] font-medium">
                            ${item.lineSubtotal.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[1rem] border border-border/70 bg-secondary/55 p-4">
                    <p className="text-[0.8rem] leading-6 text-muted-foreground">
                      Your summary will appear here once items are present in
                      the cart.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-3 border-t border-border/70 pt-5">
                <div className="flex items-center justify-between text-[0.8rem]">
                  <span className="text-muted-foreground">Items</span>
                  <span>{cartItemsCount}</span>
                </div>
                <div className="flex items-center justify-between text-[0.8rem]">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated after handoff</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-heading text-[1rem] font-medium tracking-[-0.03em]">
                    Total
                  </span>
                  <span className="font-heading text-[1.2rem] font-medium tracking-[-0.04em]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section data-page-section className="surface-panel p-6 sm:p-7">
            <p className="eyebrow-label text-brand">Payment Handoff</p>
            <div className="mt-4 space-y-4">
              {paymentNotes.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="rounded-full bg-brand/12 p-2 text-brand">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-medium tracking-[0.16em] text-foreground uppercase">
                      {title}
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={isSubmitting || cartItemsCount === 0}
            >
              {isSubmitting ? "Processing..." : "Proceed to Payment"}
            </Button>

            <p className="mt-3 text-center text-[0.74rem] leading-6 text-muted-foreground">
              {cartItemsCount === 0
                ? "Add pieces to your cart before continuing."
                : "You’ll move into the payment step after this final review."}
            </p>
          </section>
        </aside>
      </form>

      {successState && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSuccessState(null)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

          <div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[1.6rem] border border-border/70 bg-background shadow-[0_32px_90px_rgba(25,18,14,0.22)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-success-title"
          >
            <div className="grid md:grid-cols-[minmax(0,1.06fr)_minmax(17rem,0.94fr)]">
              <div className="relative overflow-hidden p-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(133,81,66,0.18),transparent_70%)]"
                />

                <button
                  type="button"
                  onClick={() => setSuccessState(null)}
                  className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full border border-border/70 bg-background/85 p-2 text-muted-foreground transition hover:border-foreground/20 hover:text-foreground"
                  aria-label="Close checkout success modal"
                >
                  <RiCloseLine className="size-4" />
                </button>

                <div className="relative">
                  <div className="inline-flex rounded-full bg-brand/12 p-3 text-brand">
                    <RiCheckLine className="size-5" />
                  </div>

                  <p className="eyebrow-label mt-5 text-brand">
                    Checkout Preview
                  </p>
                  <h3
                    id="checkout-success-title"
                    className="mt-3 max-w-[14ch] font-heading text-[2rem] leading-[0.9] tracking-[-0.06em] uppercase sm:text-[2.4rem]"
                  >
                    Your checkout details were captured.
                  </h3>
                  <p className="mt-4 max-w-[32rem] text-[0.86rem] leading-7 text-muted-foreground">
                    This replaces the temporary browser alert with a proper
                    confirmation moment. Until the live checkout handoff is
                    wired, it confirms the flow visually instead of redirecting
                    into payment.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.1rem] border border-border/70 bg-secondary/55 p-4">
                      <p className="eyebrow-label text-brand">Recipient</p>
                      <p className="mt-3 font-heading text-[1.05rem] font-medium tracking-[-0.03em]">
                        {successState.recipientName}
                      </p>
                      <p className="mt-2 text-[0.78rem] leading-6 text-muted-foreground">
                        {successState.addressLine}
                      </p>
                    </div>

                    <div className="rounded-[1.1rem] border border-border/70 bg-secondary/55 p-4">
                      <p className="eyebrow-label text-brand">Order Total</p>
                      <p className="mt-3 font-heading text-[1.35rem] font-medium tracking-[-0.04em]">
                        ${cartTotal.toFixed(2)}
                      </p>
                      <p className="mt-2 text-[0.78rem] leading-6 text-muted-foreground">
                        {totalPieces} piece{totalPieces === 1 ? "" : "s"} ready
                        for the next step.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button
                      type="button"
                      size="lg"
                      className="flex-1"
                      onClick={() => setSuccessState(null)}
                    >
                      Close Preview
                    </Button>
                    <Link
                      href="/collection"
                      className="inline-flex h-12 flex-1 items-center justify-center rounded-[calc(var(--radius)+1px)] border border-border bg-background px-6 text-center text-[0.68rem] font-medium tracking-[0.22em] text-foreground uppercase transition-all duration-200 hover:border-foreground/35 hover:bg-secondary"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/70 bg-secondary/60 p-6 sm:p-8 md:border-t-0 md:border-l">
                <p className="eyebrow-label text-brand">What This Means</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-brand/12 p-1.5 text-brand">
                      <RiCheckLine className="size-3.5" />
                    </div>
                    <p className="text-[0.82rem] leading-6 text-muted-foreground">
                      The delivery details for this preview are set to{" "}
                      {successState.destinationLabel}.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-brand/12 p-1.5 text-brand">
                      <RiCheckLine className="size-3.5" />
                    </div>
                    <p className="text-[0.82rem] leading-6 text-muted-foreground">
                      Once the live API handoff is enabled, this moment can turn
                      into the redirect to payment or a proper success route.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-brand/12 p-1.5 text-brand">
                      <RiCheckLine className="size-3.5" />
                    </div>
                    <p className="text-[0.82rem] leading-6 text-muted-foreground">
                      You can dismiss this modal, stay on checkout, or keep
                      browsing the collection from here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
