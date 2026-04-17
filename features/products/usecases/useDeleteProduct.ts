import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productService } from "../product.service"
import { PRODUCTS_QUERY_KEY } from "../product.constants"

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
    },
  })
}
