const GUEST_CART_STORAGE_KEY = "houris.guest-cart.v1"

/**
 * A guest cart line item persisted in localStorage. Payload fields mirror
 * AddCartItemPayload; the display fields are captured from the product page at
 * add time because there is no server cart to hydrate them from.
 */
export interface GuestCartItem {
  productId: string
  swatchId: string
  sizeLengthCode: string
  sizeWidthCode: number
  quantity: number
  productTitle: string
  primaryImageUrl: string
  unitPrice: number
  colourLabel: string
}

/**
 * Identity of a guest cart line. Mirrors the server's duplicate-merge semantics:
 * the same product + swatch + size is one line whose quantity accumulates.
 */
export function guestCartItemKey(item: {
  productId: string
  swatchId: string
  sizeLengthCode: string
  sizeWidthCode: number
}): string {
  return `${item.productId}:${item.swatchId}:${item.sizeLengthCode}:${item.sizeWidthCode}`
}

function isGuestCartItem(value: unknown): value is GuestCartItem {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const item = value as Record<string, unknown>
  return (
    typeof item.productId === "string" &&
    typeof item.swatchId === "string" &&
    typeof item.sizeLengthCode === "string" &&
    typeof item.sizeWidthCode === "number" &&
    typeof item.quantity === "number"
  )
}

export function readGuestCartItems(): GuestCartItem[] {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const raw = window.localStorage.getItem(GUEST_CART_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isGuestCartItem)
  } catch {
    return []
  }
}

export function writeGuestCartItems(items: GuestCartItem[]): void {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(items))
}

export function clearGuestCartStorage(): void {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.removeItem(GUEST_CART_STORAGE_KEY)
}
