import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cartService } from "../cart.service"
import { CART_QUERY_KEY } from "../cart.constants"
import type { UpdateCartItemPayload } from "../cart.schema"

export function useUpdateCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: string
      payload: UpdateCartItemPayload
    }) => cartService.updateCartItem(itemId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] })
    },
  })
}
