import type {
  CheckoutResult,
  CheckoutVerificationResult,
} from "./checkout.types"
import type { CheckoutPayload } from "./checkout.schema"
import type { GuestCheckoutPayload } from "./guestCheckout.schema"
import {
  getCheckoutVerification,
  postCheckout,
  postGuestCheckout,
  type GuestCheckoutItemPayload,
} from "./checkout.adapter"
import {
  toCheckoutResult,
  toCheckoutVerificationResult,
} from "./checkout.transformer"

export interface ICheckoutRepository {
  create(payload: CheckoutPayload): Promise<CheckoutResult>
  createGuest(
    payload: GuestCheckoutPayload,
    items: GuestCheckoutItemPayload[]
  ): Promise<CheckoutResult>
  verify(reference: string): Promise<CheckoutVerificationResult>
}

export const checkoutRepository: ICheckoutRepository = {
  create: async (payload) => {
    const raw = await postCheckout({
      useSavedAddress: payload.useSavedAddress,
      shippingAddress: payload.shippingAddress
        ? {
            recipientName: payload.shippingAddress.recipientName,
            line1: payload.shippingAddress.line1,
            line2: payload.shippingAddress.line2 ?? null,
            city: payload.shippingAddress.city,
            stateOrRegion: payload.shippingAddress.stateOrRegion,
            country: payload.shippingAddress.country,
            postalCode: payload.shippingAddress.postalCode,
          }
        : null,
    })
    return toCheckoutResult(raw)
  },

  createGuest: async (payload, items) => {
    const raw = await postGuestCheckout({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      shippingAddress: {
        recipientName: payload.shippingAddress.recipientName,
        line1: payload.shippingAddress.line1,
        line2: payload.shippingAddress.line2 ?? null,
        city: payload.shippingAddress.city,
        stateOrRegion: payload.shippingAddress.stateOrRegion,
        country: payload.shippingAddress.country,
        postalCode: payload.shippingAddress.postalCode,
      },
      items,
    })
    return toCheckoutResult(raw)
  },

  verify: async (reference) => {
    const raw = await getCheckoutVerification(reference)
    return toCheckoutVerificationResult(raw)
  },
}
