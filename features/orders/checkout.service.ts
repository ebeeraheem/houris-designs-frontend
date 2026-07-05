import { checkoutRepository } from "./checkout.repository"
import type {
  CheckoutResult,
  CheckoutVerificationResult,
} from "./checkout.types"
import type { CheckoutPayload } from "./checkout.schema"
import type { GuestCheckoutPayload } from "./guestCheckout.schema"
import type { GuestCheckoutItemPayload } from "./checkout.adapter"

export const checkoutService = {
  initiate: (payload: CheckoutPayload): Promise<CheckoutResult> => {
    return checkoutRepository.create(payload)
  },

  initiateGuest: (
    payload: GuestCheckoutPayload,
    items: GuestCheckoutItemPayload[]
  ): Promise<CheckoutResult> => {
    return checkoutRepository.createGuest(payload, items)
  },

  verify: (reference: string): Promise<CheckoutVerificationResult> => {
    return checkoutRepository.verify(reference)
  },
}
