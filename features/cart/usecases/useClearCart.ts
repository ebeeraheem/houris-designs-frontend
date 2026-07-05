import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CART_QUERY_KEY } from "../cart.constants"
import { useCartMode } from "../guest/useCartMode"

export function useClearCart() {
  const queryClient = useQueryClient()
  const { service } = useCartMode()

  return useMutation({
    mutationFn: () => service.clearCart(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] })
    },
  })
}
