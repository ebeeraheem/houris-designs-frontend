import { useQuery } from "@tanstack/react-query"
import { cartService } from "../cart.service"
import { CART_QUERY_KEY } from "../cart.constants"

interface UseGetCartOptions {
  enabled?: boolean
}

export function useGetCart(options: UseGetCartOptions = {}) {
  return useQuery({
    queryKey: [CART_QUERY_KEY],
    queryFn: () => cartService.getCart(),
    enabled: options.enabled ?? true,
  })
}
