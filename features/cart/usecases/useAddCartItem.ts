import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cartService } from "../cart.service"
import { CART_QUERY_KEY } from "../cart.constants"
import type { AddCartItemPayload } from "../cart.schema"

export function useAddCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AddCartItemPayload) => cartService.addToCart(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] })
    },
  })
}
