import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cartService } from "../cart.service"
import { CART_QUERY_KEY } from "../cart.constants"

export function useClearCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] })
    },
  })
}
