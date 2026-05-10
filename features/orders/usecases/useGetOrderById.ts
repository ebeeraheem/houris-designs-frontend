import { useQuery } from "@tanstack/react-query"
import { ORDER_DETAIL_QUERY_KEY } from "../order.constants"
import { orderService } from "../order.service"

export function useGetOrderById(id: string) {
  return useQuery({
    queryKey: [ORDER_DETAIL_QUERY_KEY, id],
    queryFn: () => orderService.getOrderById(id),
    enabled: Boolean(id),
  })
}
