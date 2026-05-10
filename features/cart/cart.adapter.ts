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
): Promise<void> => {
  await apiClient.post(ENDPOINTS.ADD_ITEM, payload)
}

export const putCartItem = async (
  itemId: string,
  payload: UpdateCartItemPayload
): Promise<void> => {
  await apiClient.put(ENDPOINTS.UPDATE_ITEM(itemId), payload)
}

export const destroyCartItem = async (itemId: string): Promise<void> => {
  await apiClient.delete(ENDPOINTS.REMOVE_ITEM(itemId))
}

export const destroyCart = async (): Promise<void> => {
  await apiClient.delete(ENDPOINTS.CLEAR)
}
