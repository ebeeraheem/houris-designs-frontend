import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productService } from "../product.service"
import { PRODUCTS_QUERY_KEY } from "../product.constants"
import type { CreateProductPayload } from "../product.schema"

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateProductPayload) =>
      productService.createProduct(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
    },
  })
}
