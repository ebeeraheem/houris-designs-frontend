import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CART_QUERY_KEY } from "../cart.constants"
import { useCartMode } from "../guest/useCartMode"
import type { AddCartItemPayload } from "../cart.schema"

export function useAddCartItem() {
  const queryClient = useQueryClient()
  const { service } = useCartMode()

  return useMutation({
    mutationFn: (payload: AddCartItemPayload) => service.addToCart(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] })
    },
  })
}
