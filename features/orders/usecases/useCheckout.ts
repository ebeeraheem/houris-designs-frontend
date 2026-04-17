import { useMutation } from "@tanstack/react-query"
import { checkoutService } from "../checkout.service"
import type { CheckoutPayload } from "../checkout.schema"

export function useCheckout() {
  return useMutation({
    mutationFn: (payload: CheckoutPayload) => checkoutService.initiate(payload),
  })
}
