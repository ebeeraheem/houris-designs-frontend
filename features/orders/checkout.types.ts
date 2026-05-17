import type { OrderStatus } from "./order.types"

export interface ApiCheckoutShippingAddress {
  recipientName: string
  line1: string
  line2: string | null
  city: string
  stateOrRegion: string
  country: string
  postalCode: string
}

export interface ApiCheckoutResultData {
  orderReference?: string
  reference?: string
  paymentUrl?: string
  authorizationUrl?: string
}

export interface ApiCheckoutVerificationData {
  orderReference?: string | null
  reference?: string | null
  status?: string | null
  message?: string | null
}

export interface ApiCheckoutResponse {
  success?: boolean
  message?: string
  data?: ApiCheckoutResultData
  orderReference?: string
  reference?: string
  paymentUrl?: string
  authorizationUrl?: string
}

export interface ApiCheckoutVerificationResponse {
  success?: boolean
  message?: string
  data?: ApiCheckoutVerificationData
  orderReference?: string | null
  reference?: string | null
  status?: string | null
}

export interface CheckoutResult {
  orderReference: string
  reference: string
  paymentUrl: string
}

export interface CheckoutVerificationResult {
  orderReference: string
  reference: string
  status: OrderStatus
  message: string
}
