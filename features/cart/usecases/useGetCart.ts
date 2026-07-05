import { useQuery } from "@tanstack/react-query"
import { CART_QUERY_KEY } from "../cart.constants"
import { useCartMode } from "../guest/useCartMode"

interface UseGetCartOptions {
  enabled?: boolean
}

export function useGetCart(options: UseGetCartOptions = {}) {
  const { mode, service, isLoading: isAuthLoading } = useCartMode()

  return useQuery({
    queryKey: [CART_QUERY_KEY, mode],
    queryFn: () => service.getCart(),
    enabled: !isAuthLoading && (options.enabled ?? true),
  })
}
