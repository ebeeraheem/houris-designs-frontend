import apiClient from "@/services/api/client"
import { extractApiData } from "@/services/api/extract-api-data"
import type { ApiProductListResponse, ApiProduct } from "./product.types"
import type { ProductSortByApi } from "./product.sort"

const ENDPOINTS = {
  LIST: "/api/products",
  DETAIL: (id: string) => `/api/products/${id}`,
} as const

export interface GetProductsParams {
  page?: number
  pageSize?: number
  search?: string
  minPrice?: number
  maxPrice?: number
  colourSwatchId?: string
  sortBy?: ProductSortByApi
}

export const fetchProducts = async (
  params: GetProductsParams = {}
): Promise<ApiProductListResponse> => {
  const response = await apiClient.get<ApiProductListResponse>(ENDPOINTS.LIST, {
    params,
  })
  return response.data
}

export const fetchProductById = async (id: string): Promise<ApiProduct> => {
  const response = await apiClient.get<ApiProduct | { data: ApiProduct }>(
    ENDPOINTS.DETAIL(id)
  )
  return extractApiData(response.data)
}
