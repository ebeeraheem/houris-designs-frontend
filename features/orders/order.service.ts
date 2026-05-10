import { orderRepository } from "./order.repository"
import type { Order, OrderHistoryResponse } from "./order.types"
import type { GetOrdersParams } from "./order.adapter"

const ORDERS_PER_PAGE = 10

const buildOrderSearchParams = (params: GetOrdersParams): GetOrdersParams => ({
  ...params,
  pageNumber: params.pageNumber ?? 1,
  pageSize: params.pageSize ?? ORDERS_PER_PAGE,
})

export const orderService = {
  getOrders: (params: GetOrdersParams = {}): Promise<OrderHistoryResponse> => {
    return orderRepository.getAll(buildOrderSearchParams(params))
  },

  getOrderById: (id: string): Promise<Order> => {
    return orderRepository.getById(id)
  },
}
