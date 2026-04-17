import apiClient from "@/services/api/client"
import { extractApiData } from "@/services/api/extract-api-data"
import type { ApiProductListResponse, ApiProduct } from "./product.types"
import type {
  CreateProductPayload,
  UpdateProductPayload,
} from "./product.schema"

const ENDPOINTS = {
  LIST: "/api/products",
  DETAIL: (id: string) => `/api/products/${id}`,
  CREATE: "/api/products",
  UPDATE: (id: string) => `/api/products/${id}`,
  DELETE: (id: string) => `/api/products/${id}`,
} as const

export interface GetProductsParams {
  page?: number
  pageSize?: number
  search?: string
  minPrice?: number
  maxPrice?: number
  colourSwatchId?: string
  sortBy?: number
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

export const postProduct = async (
  payload: CreateProductPayload
): Promise<ApiProduct> => {
  const response = await apiClient.post<ApiProduct | { data: ApiProduct }>(
    ENDPOINTS.CREATE,
    payload
  )
  return extractApiData(response.data)
}

export const patchProduct = async (
  id: string,
  payload: UpdateProductPayload
): Promise<ApiProduct> => {
  const response = await apiClient.patch<ApiProduct | { data: ApiProduct }>(
    ENDPOINTS.UPDATE(id),
    payload
  )
  return extractApiData(response.data)
}

export const destroyProduct = async (id: string): Promise<void> => {
  await apiClient.delete(ENDPOINTS.DELETE(id))
}
