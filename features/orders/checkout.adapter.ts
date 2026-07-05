import apiClient from "@/services/api/client"
import type { ApiClientRequestConfig } from "@/services/api/client"
import type {
  ApiCheckoutResponse,
  ApiCheckoutShippingAddress,
  ApiCheckoutVerificationResponse,
} from "./checkout.types"

const ENDPOINTS = {
  CHECKOUT: "/api/checkout",
  GUEST_CHECKOUT: "/api/checkout/guest",
  VERIFY: (reference: string) =>
    `/api/checkout/verify/${encodeURIComponent(reference)}`,
} as const

export interface CheckoutRequestPayload {
  useSavedAddress: boolean
  shippingAddress: ApiCheckoutShippingAddress | null
}

export interface GuestCheckoutItemPayload {
  productId: string
  swatchId: string
  sizeLengthCode: string
  sizeWidthCode: number
  quantity: number
}

export interface GuestCheckoutRequestPayload {
  fullName: string
  email: string
  password: string
  shippingAddress: ApiCheckoutShippingAddress
  items: GuestCheckoutItemPayload[]
}

// The endpoint is anonymous; a failure must never bounce the guest to /signin.
const guestCheckoutRequestConfig: ApiClientRequestConfig = {
  skipAuthRedirect: true,
  skipAuthRefresh: true,
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

export const postGuestCheckout = async (
  payload: GuestCheckoutRequestPayload
): Promise<ApiCheckoutResponse> => {
  const response = await apiClient.post<ApiCheckoutResponse>(
    ENDPOINTS.GUEST_CHECKOUT,
    payload,
    guestCheckoutRequestConfig
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
