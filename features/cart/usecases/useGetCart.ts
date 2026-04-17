import { useQuery } from "@tanstack/react-query"
import { cartService } from "../cart.service"
import { CART_QUERY_KEY } from "../cart.constants"

export function useGetCart() {
  return useQuery({
    queryKey: [CART_QUERY_KEY],
    queryFn: () => cartService.getCart(),
  })
}
