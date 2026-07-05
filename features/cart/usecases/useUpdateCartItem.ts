import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CART_QUERY_KEY } from "../cart.constants"
import { useCartMode } from "../guest/useCartMode"
import type { UpdateCartItemPayload } from "../cart.schema"

export function useUpdateCartItem() {
  const queryClient = useQueryClient()
  const { service } = useCartMode()

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: string
      payload: UpdateCartItemPayload
    }) => service.updateCartItem(itemId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] })
    },
  })
}
