import type { ApiCartResponse, ApiCartItem, Cart, CartItem } from "./cart.types"
import { parseLegacyBaseSize } from "@/utils/size-codes"

export const toCartItem = (api: ApiCartItem): CartItem => {
  const legacySize = parseLegacyBaseSize(api.baseSize)

  return {
    id: api.id,
    productId: api.productId,
    productTitle: api.productTitle,
    primaryImageUrl: api.primaryImageUrl,
    unitPrice: api.unitPrice,
    swatchId: api.swatchId ?? null,
    colourLabel: api.colourLabel ?? api.colour ?? "Selected swatch",
    sizeLengthCode: api.sizeLengthCode ?? legacySize.sizeLengthCode,
    sizeWidthCode: api.sizeWidthCode ?? legacySize.sizeWidthCode,
    quantity: api.quantity,
    lineSubtotal: api.lineSubtotal,
  }
}

export const toCart = (api: ApiCartResponse): Cart => ({
  items: (api.data?.items ?? api.items ?? []).map(toCartItem),
  total: api.data?.total ?? api.total ?? 0,
})
