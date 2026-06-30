"use client"

import { useState } from "react"
import { RiMapPinLine } from "@remixicon/react"
import toast from "react-hot-toast"

import { EmptyAddressIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { useAuthSession } from "@/features/authentication/usecases/useAuthProfile"
import { updateAddressSchema } from "../account.schema"
import { useGetAddress } from "../usecases/useGetAddress"
import { useUpdateAddress } from "../usecases/useUpdateAddress"
import type { ShippingAddress } from "../account.types"

interface AddressFormState {
  recipientName: string
  addressLine1: string
  addressLine2: string
  city: string
  stateRegion: string
  postalCode: string
  country: string
}

type AddressErrors = Partial<Record<keyof AddressFormState, string>>

function createAddressFormState(
  address: ShippingAddress | null
): AddressFormState {
  return {
    recipientName: address?.recipientName ?? "",
    addressLine1: address?.addressLine1 ?? "",
    addressLine2: address?.addressLine2 ?? "",
    city: address?.city ?? "",
    stateRegion: address?.stateRegion ?? "",
    postalCode: address?.postalCode ?? "",
    country: address?.country ?? "",
  }
}

export function DeliveryDetails() {
  const { data: session } = useAuthSession()
  const isAuthenticated = session?.isAuthenticated ?? false

  const {
    data: address,
    isLoading,
    isError,
    refetch,
  } = useGetAddress({ enabled: isAuthenticated })

  const updateAddress = useUpdateAddress()

  const storedAddress = address ?? null
  const isSubmitting = updateAddress.isPending

  const [isEditing, setIsEditing] = useState(false)
  const [formState, setFormState] = useState<AddressFormState>(() =>
    createAddressFormState(null)
  )
  const [errors, setErrors] = useState<AddressErrors>({})

  // The form is only shown while editing, and startEditing() seeds it from the
  // freshly-loaded address, so no effect-based syncing is needed here.
  const resetForm = () => {
    setFormState(createAddressFormState(storedAddress))
    setErrors({})
  }

  const startEditing = () => {
    resetForm()
    setIsEditing(true)
  }

  const stopEditing = () => {
    resetForm()
    setIsEditing(false)
  }

  const handleChange = (field: keyof AddressFormState, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }))
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))
  }

  const handleSave = async () => {
    const payload = {
      recipientName: formState.recipientName.trim(),
      addressLine1: formState.addressLine1.trim(),
      addressLine2: formState.addressLine2.trim() || undefined,
      city: formState.city.trim(),
      stateRegion: formState.stateRegion.trim(),
      postalCode: formState.postalCode.trim(),
      country: formState.country.trim(),
    }

    const parsed = updateAddressSchema.safeParse(payload)

    if (!parsed.success) {
      const nextErrors: AddressErrors = {}

      for (const issue of parsed.error.issues) {
        const field = issue.path[0]

        if (typeof field === "string" && !(field in nextErrors)) {
          nextErrors[field as keyof AddressFormState] = issue.message
        }
      }

      setErrors(nextErrors)
      return
    }

    try {
      await updateAddress.mutateAsync(parsed.data)
      setErrors({})
      setIsEditing(false)
    } catch {
      toast.error("We couldn't save your address. Please try again.")
    }
  }

  return (
    <section className="surface-card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow-label text-brand">Delivery Details</p>
          <h2 className="mt-3 font-heading text-[1.55rem] leading-none tracking-[-0.05em]">
            Shipping address
          </h2>
        </div>
        {!isLoading && !isError ? (
          <button
            type="button"
            className="text-[0.72rem] font-medium tracking-[0.14em] text-brand uppercase hover:underline disabled:opacity-50"
            onClick={isEditing ? stopEditing : startEditing}
            disabled={isSubmitting}
          >
            {isEditing ? "Cancel" : storedAddress ? "Edit" : "Add"}
          </button>
        ) : null}
      </div>

      {isEditing ? (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="recipientName" className="field-label">
                Recipient Name
              </label>
              <input
                id="recipientName"
                type="text"
                value={formState.recipientName}
                onChange={(event) =>
                  handleChange("recipientName", event.target.value)
                }
                className="field-input mt-2"
                placeholder="Jane Doe"
              />
              {errors.recipientName ? (
                <p className="mt-2 text-[0.76rem] text-destructive">
                  {errors.recipientName}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="country" className="field-label">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={formState.country}
                onChange={(event) =>
                  handleChange("country", event.target.value)
                }
                className="field-input mt-2"
                placeholder="Nigeria"
              />
              {errors.country ? (
                <p className="mt-2 text-[0.76rem] text-destructive">
                  {errors.country}
                </p>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="addressLine1" className="field-label">
                Address Line 1
              </label>
              <input
                id="addressLine1"
                type="text"
                value={formState.addressLine1}
                onChange={(event) =>
                  handleChange("addressLine1", event.target.value)
                }
                className="field-input mt-2"
                placeholder="123 Fashion Avenue"
              />
              {errors.addressLine1 ? (
                <p className="mt-2 text-[0.76rem] text-destructive">
                  {errors.addressLine1}
                </p>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="addressLine2" className="field-label">
                Address Line 2
              </label>
              <input
                id="addressLine2"
                type="text"
                value={formState.addressLine2}
                onChange={(event) =>
                  handleChange("addressLine2", event.target.value)
                }
                className="field-input mt-2"
                placeholder="Apartment, suite, or landmark"
              />
            </div>

            <div>
              <label htmlFor="city" className="field-label">
                City
              </label>
              <input
                id="city"
                type="text"
                value={formState.city}
                onChange={(event) => handleChange("city", event.target.value)}
                className="field-input mt-2"
                placeholder="Lagos"
              />
              {errors.city ? (
                <p className="mt-2 text-[0.76rem] text-destructive">
                  {errors.city}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="stateRegion" className="field-label">
                State / Region
              </label>
              <input
                id="stateRegion"
                type="text"
                value={formState.stateRegion}
                onChange={(event) =>
                  handleChange("stateRegion", event.target.value)
                }
                className="field-input mt-2"
                placeholder="Lagos"
              />
              {errors.stateRegion ? (
                <p className="mt-2 text-[0.76rem] text-destructive">
                  {errors.stateRegion}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="postalCode" className="field-label">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                value={formState.postalCode}
                onChange={(event) =>
                  handleChange("postalCode", event.target.value)
                }
                className="field-input mt-2"
                placeholder="100001"
              />
              {errors.postalCode ? (
                <p className="mt-2 text-[0.76rem] text-destructive">
                  {errors.postalCode}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => void handleSave()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Address"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={stopEditing}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : isLoading ? (
        <AddressSkeleton />
      ) : isError ? (
        <div className="mt-6 rounded-[var(--radius)] border border-border/70 bg-secondary/40 p-6">
          <p className="text-sm leading-7 text-muted-foreground">
            We couldn&apos;t load your shipping address right now.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => {
              void refetch()
            }}
          >
            Try Again
          </Button>
        </div>
      ) : storedAddress ? (
        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="rounded-[var(--radius)] border border-border/70 bg-secondary/55 p-5">
            <div className="flex items-center gap-2 text-brand">
              <RiMapPinLine className="size-4" />
              <p className="text-[0.72rem] font-medium tracking-[0.16em] uppercase">
                Primary Address
              </p>
            </div>
            <p className="mt-4 font-heading text-[1.05rem] font-medium tracking-[-0.03em]">
              {storedAddress.recipientName}
            </p>
            <p className="mt-3 text-[0.82rem] leading-7 text-muted-foreground">
              {storedAddress.addressLine1}
              {storedAddress.addressLine2 ? (
                <>
                  <br />
                  {storedAddress.addressLine2}
                </>
              ) : null}
              <br />
              {storedAddress.city}, {storedAddress.stateRegion}{" "}
              {storedAddress.postalCode}
              <br />
              {storedAddress.country}
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border/70 bg-background px-5 py-4 text-[0.78rem] leading-6 text-muted-foreground md:max-w-[14rem]">
            Delivery windows and order updates will follow the address saved
            here.
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-[var(--radius)] border border-dashed border-border/55 bg-secondary/35 p-6 sm:p-8">
          <EmptyState
            icon={<EmptyAddressIcon className="size-7" aria-hidden="true" />}
            title="No saved address yet"
            description="Add one here so checkout feels quicker and more seamless next time."
          />
        </div>
      )}
    </section>
  )
}

function AddressSkeleton() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
      <div className="rounded-[var(--radius)] border border-border/70 bg-secondary/55 p-5">
        <div className="h-3 w-28 animate-pulse rounded-full bg-secondary/70" />
        <div className="mt-4 h-5 w-40 animate-pulse rounded-full bg-secondary/70" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full max-w-[18rem] animate-pulse rounded-full bg-secondary/70" />
          <div className="h-3 w-2/3 animate-pulse rounded-full bg-secondary/70" />
          <div className="h-3 w-1/2 animate-pulse rounded-full bg-secondary/70" />
        </div>
      </div>
      <div className="hidden h-24 w-full animate-pulse rounded-[var(--radius)] bg-secondary/50 md:block md:max-w-[14rem]" />
    </div>
  )
}
