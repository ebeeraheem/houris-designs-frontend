import apiClient from "@/services/api/client"
import type { ApiCartResponse } from "./cart.types"
import type { AddCartItemPayload, UpdateCartItemPayload } from "./cart.schema"

const ENDPOINTS = {
  GET: "/api/cart",
  ADD_ITEM: "/api/cart/items",
  UPDATE_ITEM: (itemId: string) => `/api/cart/items/${itemId}`,
  REMOVE_ITEM: (itemId: string) => `/api/cart/items/${itemId}`,
  CLEAR: "/api/cart",
} as const

export const fetchCart = async (): Promise<ApiCartResponse> => {
  const response = await apiClient.get<ApiCartResponse>(ENDPOINTS.GET)
  return response.data
}

export const postCartItem = async (
  payload: AddCartItemPayload
): Promise<ApiCartResponse> => {
  const response = await apiClient.post<ApiCartResponse>(
    ENDPOINTS.ADD_ITEM,
    payload
  )
  return response.data
}

export const patchCartItem = async (
  itemId: string,
  payload: UpdateCartItemPayload
): Promise<ApiCartResponse> => {
  const response = await apiClient.patch<ApiCartResponse>(
    ENDPOINTS.UPDATE_ITEM(itemId),
    payload
  )
  return response.data
}

export const destroyCartItem = async (
  itemId: string
): Promise<ApiCartResponse> => {
  const response = await apiClient.delete<ApiCartResponse>(
    ENDPOINTS.REMOVE_ITEM(itemId)
  )
  return response.data
}

export const destroyCart = async (): Promise<void> => {
  await apiClient.delete(ENDPOINTS.CLEAR)
}
