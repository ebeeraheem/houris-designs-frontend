import type { CheckoutResult } from "./checkout.types"
import type { CheckoutPayload } from "./checkout.schema"
import { postCheckout } from "./checkout.adapter"
import { toCheckoutResult } from "./checkout.transformer"

export interface ICheckoutRepository {
  create(payload: CheckoutPayload): Promise<CheckoutResult>
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
}
