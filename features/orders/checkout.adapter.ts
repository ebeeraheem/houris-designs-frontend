import apiClient from "@/services/api/client"
import type {
  ApiCheckoutResponse,
  ApiCheckoutShippingAddress,
} from "./checkout.types"

const ENDPOINTS = {
  CHECKOUT: "/api/checkout",
} as const

export interface CheckoutRequestPayload {
  useSavedAddress: boolean
  shippingAddress: ApiCheckoutShippingAddress | null
}

export const postCheckout = async (
  payload: CheckoutRequestPayload
): Promise<ApiCheckoutResponse> => {
  const response = await apiClient.post<ApiCheckoutResponse>(
    ENDPOINTS.CHECKOUT,
    payload
  )
  return response.data
}
