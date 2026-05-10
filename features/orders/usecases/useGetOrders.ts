import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { ORDERS_QUERY_KEY } from "../order.constants"
import { orderService } from "../order.service"
import type { GetOrdersParams } from "../order.adapter"

export function useGetOrders(params: GetOrdersParams = {}) {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, params],
    queryFn: () => orderService.getOrders(params),
    placeholderData: keepPreviousData,
  })
}
