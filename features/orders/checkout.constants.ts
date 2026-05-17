export const CHECKOUT_QUERY_KEY = "checkout"

export const CHECKOUT_ROUTES = {
  PAGE: "/checkout",
  SUCCESS: "/checkout/success",
} as const

export const CHECKOUT_STORAGE_KEYS = {
  PENDING_REFERENCE: "houris.pendingCheckoutReference",
  SAVED_SHIPPING_ADDRESS: "houris.savedShippingAddress",
} as const
