import apiClient from "@/services/api/client"
import { extractApiData } from "@/services/api/extract-api-data"
import type {
  ApiOrderDetail,
  ApiOrdersListResponse,
} from "./order.types"

const ENDPOINTS = {
  LIST: "/api/orders",
  DETAIL: (id: string) => `/api/orders/${id}`,
} as const

export interface GetOrdersParams {
  pageNumber?: number
  pageSize?: number
}

export const fetchOrders = async (
  params: GetOrdersParams = {}
): Promise<ApiOrdersListResponse> => {
  const response = await apiClient.get<
    ApiOrdersListResponse | { data: ApiOrdersListResponse }
  >(ENDPOINTS.LIST, {
    params,
  })

  return extractApiData(response.data)
}

export const fetchOrderById = async (id: string): Promise<ApiOrderDetail> => {
  const response = await apiClient.get<ApiOrderDetail | { data: ApiOrderDetail }>(
    ENDPOINTS.DETAIL(id)
  )

  return extractApiData(response.data)
}
