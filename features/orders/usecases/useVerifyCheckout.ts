import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CART_QUERY_KEY } from "@/features/cart/cart.constants"
import {
  ORDER_DETAIL_QUERY_KEY,
  ORDERS_QUERY_KEY,
} from "../order.constants"
import { checkoutService } from "../checkout.service"

export function useVerifyCheckout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reference: string) => checkoutService.verify(reference),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] }),
        queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] }),
        queryClient.invalidateQueries({ queryKey: [ORDER_DETAIL_QUERY_KEY] }),
      ])
    },
  })
}
