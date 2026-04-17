import { useQuery } from "@tanstack/react-query"
import { productService } from "../product.service"
import { PRODUCTS_QUERY_KEY } from "../product.constants"
import type { GetProductsParams } from "../product.adapter"

export function useGetProducts(params: GetProductsParams = {}) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, params],
    queryFn: () => productService.getProducts(params),
  })
}
