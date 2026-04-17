import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productService } from "../product.service"
import { PRODUCTS_QUERY_KEY } from "../product.constants"
import type { UpdateProductPayload } from "../product.schema"

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdateProductPayload
    }) => productService.updateProduct(id, payload),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
      await queryClient.invalidateQueries({
        queryKey: [PRODUCTS_QUERY_KEY, "detail", id],
      })
    },
  })
}
