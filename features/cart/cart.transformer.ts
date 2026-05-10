import type { ApiCartResponse, ApiCartItem, Cart, CartItem } from "./cart.types"
import { resolveApiAssetUrl } from "@/services/api/base-url"
import { parseLegacyBaseSize } from "@/utils/size-codes"

function toOptionalNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function toNumber(value: number | string | null | undefined) {
  return toOptionalNumber(value) ?? 0
}

function getCartItemId(api: ApiCartItem) {
  return api.itemId ?? api.cartItemId ?? api.id ?? null
}

function normalizeCartResponse(
  api: ApiCartResponse | null | undefined
): ApiCartResponse {
  if (!api || typeof api !== "object") {
    return {}
  }

  return api
}

export const toCartItem = (api: ApiCartItem): CartItem => {
  const legacySize = parseLegacyBaseSize(api.baseSize)

  return {
    id: getCartItemId(api),
    productId: api.productId,
    productTitle: api.productTitle,
    primaryImageUrl:
      resolveApiAssetUrl(api.primaryImageUrl) ??
      "/images/editorial/boutique-rack.jpg",
    unitPrice: toNumber(api.unitPrice),
    swatchId: api.swatchId ?? null,
    colourLabel: api.colourLabel ?? api.colour ?? "Selected swatch",
    sizeLengthCode: api.sizeLengthCode ?? legacySize.sizeLengthCode,
    sizeWidthCode:
      toOptionalNumber(api.sizeWidthCode) ?? legacySize.sizeWidthCode,
    quantity: toNumber(api.quantity),
    lineSubtotal: toNumber(api.lineSubtotal),
  }
}

export const toCart = (api: ApiCartResponse | null | undefined): Cart => {
  const normalized = normalizeCartResponse(api)

  return {
    items: (normalized.data?.items ?? normalized.items ?? []).map(toCartItem),
    total: normalized.data?.total ?? normalized.total ?? 0,
  }
}
