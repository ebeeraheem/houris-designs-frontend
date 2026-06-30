"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiMapPin2Line } from "@remixicon/react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { useUpdateAddress } from "@/features/account/usecases/useUpdateAddress"
import type { UpdateAddressPayload } from "@/features/account/account.schema"
import type { ShippingAddress } from "@/features/account/account.types"
import { formatCurrency } from "@/utils/format-currency"
import {
  checkoutSchema,
  type CheckoutPayload,
  type ShippingAddressPayload,
} from "../checkout.schema"

interface CheckoutLineItem {
  id: string
  productTitle: string
  quantity: number
  colourLabel?: string
  sizeLabel?: string
  lineSubtotal?: number
}

interface CheckoutFormProps {
  cartTotal: number
  cartItemsCount: number
  cartItems?: CheckoutLineItem[]
  savedAddress?: ShippingAddress | null
  onSubmit: (data: CheckoutPayload) => Promise<void>
}

function mapSavedAddressToCheckout(
  saved: ShippingAddress
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

function mapCheckoutToAddressPayload(
  address: ShippingAddressPayload
): UpdateAddressPayload {
  return {
    recipientName: address.recipientName,
    addressLine1: address.line1,
    addressLine2: address.line2 ?? undefined,
    city: address.city,
    stateRegion: address.stateOrRegion,
    country: address.country,
    postalCode: address.postalCode,
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
  const [saveAsDefault, setSaveAsDefault] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateAddress = useUpdateAddress()

  const hasSavedAddress = !!savedAddress
  const totalPieces =
    cartItems.reduce((sum, item) => sum + item.quantity, 0) || cartItemsCount
  const fieldClass =
    "h-12 w-full min-w-0 rounded-[var(--radius)] border border-border/80 bg-background/92 px-4 text-[0.92rem] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.58)] outline-none transition focus:border-brand/45 focus:bg-background focus:shadow-[0_0_0_3px_rgba(160,86,67,0.08)]"

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

    try {
      // If the customer entered a new address and opted in, persist it to their
      // account as the default. A failure here is non-fatal to the order.
      if (!useSaved && saveAsDefault && data.shippingAddress) {
        try {
          await updateAddress.mutateAsync(
            mapCheckoutToAddressPayload(data.shippingAddress)
          )
        } catch {
          toast.error(
            "We couldn't save this as your default address, but we'll still use it for this order."
          )
        }
      }

      await onSubmit(payload)
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayAddress = useSaved && savedAddress ? savedAddress : null

  return (
    <>
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
              Confirm your shipping address, review the pieces in your cart, and
              move into the secure payment step.
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow-label text-brand">Shipping</p>
                <h2 className="mt-3 font-heading text-[1.45rem] leading-none tracking-[-0.04em] sm:text-[1.7rem]">
                  Delivery details
                </h2>
                <p className="mt-3 text-[0.84rem] leading-6 text-muted-foreground">
                  {hasSavedAddress
                    ? "Use the saved address on your account or enter a new one for this order."
                    : "Enter the delivery address for this order."}
                </p>
              </div>

              {hasSavedAddress ? (
                <label
                  htmlFor="use-saved-address"
                  className="inline-flex cursor-pointer items-center gap-3 rounded-[var(--radius)] border border-border/70 bg-background px-4 py-2.5 text-[0.72rem] font-medium tracking-[0.14em] uppercase"
                >
                  <input
                    id="use-saved-address"
                    name="useSavedAddress"
                    type="checkbox"
                    checked={useSaved}
                    onChange={(event) =>
                      handleSavedAddressChange(event.target.checked)
                    }
                    className="size-4 accent-[var(--color-brand)]"
                  />
                  Use saved address
                </label>
              ) : null}
            </div>

            {displayAddress ? (
              <div className="mt-6 rounded-[var(--radius)] border border-border/70 bg-secondary/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-[var(--radius)] bg-brand/12 p-2 text-brand">
                    <RiMapPin2Line className="size-4" />
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-medium tracking-[0.16em] text-brand uppercase">
                      Saved Address
                    </p>
                    <p className="mt-2 font-heading text-[1rem] font-medium tracking-[-0.03em]">
                      {displayAddress.recipientName}
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-muted-foreground">
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
                </div>
              </div>
            ) : (
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

                <label
                  htmlFor="save-as-default-address"
                  className="flex cursor-pointer items-center gap-3 rounded-[var(--radius)] border border-border/70 bg-background px-4 py-3 text-[0.82rem] leading-6 text-muted-foreground"
                >
                  <input
                    id="save-as-default-address"
                    name="saveAsDefault"
                    type="checkbox"
                    checked={saveAsDefault}
                    onChange={(event) => setSaveAsDefault(event.target.checked)}
                    className="size-4 accent-[var(--color-brand)]"
                  />
                  Save this as my default delivery address
                </label>
              </div>
            )}
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
            disabled={isSubmitting || cartItemsCount === 0}
          >
            {isSubmitting ? "Processing..." : "Proceed to Payment"}
          </Button>

          <p className="mt-3 text-center text-[0.74rem] leading-6 text-muted-foreground">
            {cartItemsCount === 0
              ? "Add pieces to your cart before continuing."
              : "You’ll be redirected to the secure payment step next."}
          </p>
        </aside>
      </form>
    </>
  )
}
