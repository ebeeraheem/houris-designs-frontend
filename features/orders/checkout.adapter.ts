import apiClient from "@/services/api/client"
import type {
  ApiCheckoutResponse,
  ApiCheckoutShippingAddress,
  ApiCheckoutVerificationResponse,
} from "./checkout.types"

const ENDPOINTS = {
  CHECKOUT: "/api/checkout",
  VERIFY: (reference: string) =>
    `/api/checkout/verify/${encodeURIComponent(reference)}`,
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

export const getCheckoutVerification = async (
  reference: string
): Promise<ApiCheckoutVerificationResponse> => {
  const response = await apiClient.get<
    ApiCheckoutVerificationResponse | { data: ApiCheckoutVerificationResponse }
  >(ENDPOINTS.VERIFY(reference))

  return response.data as ApiCheckoutVerificationResponse
}
