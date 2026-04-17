import { useQuery } from "@tanstack/react-query"
import { productService } from "../product.service"
import { PRODUCTS_QUERY_KEY } from "../product.constants"

export function useGetProductById(id: string | null) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, "detail", id],
    queryFn: () => productService.getProductById(id!),
    enabled: Boolean(id),
  })
}
