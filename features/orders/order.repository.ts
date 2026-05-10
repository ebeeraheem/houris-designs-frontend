import {
  fetchOrderById,
  fetchOrders,
  type GetOrdersParams,
} from "./order.adapter"
import { toOrder, toOrdersList } from "./order.transformer"
import type { Order, OrderHistoryResponse } from "./order.types"

export interface IOrderRepository {
  getAll(params?: GetOrdersParams): Promise<OrderHistoryResponse>
  getById(id: string): Promise<Order>
}

export const orderRepository: IOrderRepository = {
  getAll: async (params) => {
    const raw = await fetchOrders(params)
    return toOrdersList(raw)
  },

  getById: async (id) => {
    const raw = await fetchOrderById(id)
    return toOrder(raw)
  },
}
