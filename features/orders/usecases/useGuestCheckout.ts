import { useMutation } from "@tanstack/react-query"
import { checkoutService } from "../checkout.service"
import type { GuestCheckoutPayload } from "../guestCheckout.schema"
import type { GuestCheckoutItemPayload } from "../checkout.adapter"

export function useGuestCheckout() {
  return useMutation({
    mutationFn: ({
      payload,
      items,
    }: {
      payload: GuestCheckoutPayload
      items: GuestCheckoutItemPayload[]
    }) => checkoutService.initiateGuest(payload, items),
  })
}
