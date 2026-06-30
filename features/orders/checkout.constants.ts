export const CHECKOUT_ROUTES = {
  PAGE: "/checkout",
  SUCCESS: "/checkout/success",
} as const

export const CHECKOUT_STORAGE_KEYS = {
  PENDING_REFERENCE: "houris.pendingCheckoutReference",
} as const

// Legacy key from when shipping addresses were persisted in localStorage.
// Addresses now live in the account API; this is only referenced to evict
// stale data left in existing browsers (see useLogout).
export const LEGACY_SHIPPING_ADDRESS_STORAGE_KEY = "houris.savedShippingAddress"
