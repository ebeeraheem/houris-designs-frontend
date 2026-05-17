import { checkoutRepository } from "./checkout.repository"
import type {
  CheckoutResult,
  CheckoutVerificationResult,
} from "./checkout.types"
import type { CheckoutPayload } from "./checkout.schema"

export const checkoutService = {
  initiate: (payload: CheckoutPayload): Promise<CheckoutResult> => {
    return checkoutRepository.create(payload)
  },

  verify: (reference: string): Promise<CheckoutVerificationResult> => {
    return checkoutRepository.verify(reference)
  },
}
