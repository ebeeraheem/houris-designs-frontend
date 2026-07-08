import { useQuery } from "@tanstack/react-query"
import { productService } from "../product.service"
import { PRODUCTS_QUERY_KEY } from "../product.constants"

export function useGetProductBySlug(slug: string | null) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, "detail", slug],
    queryFn: () => productService.getProductBySlug(slug ?? ""),
    enabled: Boolean(slug),
  })
}
