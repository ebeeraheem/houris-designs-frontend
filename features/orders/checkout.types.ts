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

export interface ApiCheckoutResponse {
  success?: boolean
  message?: string
  data?: ApiCheckoutResultData
  orderReference?: string
  reference?: string
  paymentUrl?: string
  authorizationUrl?: string
}

export interface CheckoutResult {
  orderReference: string
  paymentUrl: string
}
