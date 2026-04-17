import { checkoutRepository } from "./checkout.repository"
import type { CheckoutResult } from "./checkout.types"
import type { CheckoutPayload } from "./checkout.schema"

export const checkoutService = {
  initiate: (payload: CheckoutPayload): Promise<CheckoutResult> => {
    return checkoutRepository.create(payload)
  },
}
