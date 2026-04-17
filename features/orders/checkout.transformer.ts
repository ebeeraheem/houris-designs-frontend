import type { ApiCheckoutResponse, CheckoutResult } from "./checkout.types"

export const toCheckoutResult = (api: ApiCheckoutResponse): CheckoutResult => {
  const payload = api.data ?? api

  return {
    orderReference: payload.orderReference ?? payload.reference ?? "",
    paymentUrl: payload.paymentUrl ?? payload.authorizationUrl ?? "",
  }
}
