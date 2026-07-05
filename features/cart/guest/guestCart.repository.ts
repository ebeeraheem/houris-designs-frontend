import type { ICartRepository } from "../cart.repository"
import type { Cart, CartItem } from "../cart.types"
import type { AddCartItemPayload, UpdateCartItemPayload } from "../cart.schema"
import {
  guestCartItemKey,
  readGuestCartItems,
  writeGuestCartItems,
  clearGuestCartStorage,
  type GuestCartItem,
} from "./guestCart.storage"

function toCartItem(item: GuestCartItem): CartItem {
  return {
    id: guestCartItemKey(item),
    productId: item.productId,
    productTitle: item.productTitle,
    primaryImageUrl: item.primaryImageUrl,
    unitPrice: item.unitPrice,
    swatchId: item.swatchId,
    colourLabel: item.colourLabel,
    sizeLengthCode: item.sizeLengthCode,
    sizeWidthCode: item.sizeWidthCode,
    quantity: item.quantity,
    lineSubtotal: item.unitPrice * item.quantity,
  }
}

/**
 * localStorage-backed cart for unauthenticated visitors. Same duplicate-merge
 * semantics as the server cart (product + swatch + size identifies a line), so
 * syncing to the server after sign-in produces identical line items.
 */
export const guestCartRepository: ICartRepository = {
  get: () => {
    const items = readGuestCartItems().map(toCartItem)
    const total = items.reduce((sum, item) => sum + item.lineSubtotal, 0)
    return Promise.resolve<Cart>({ items, total })
  },

  addItem: (payload: AddCartItemPayload) => {
    const items = readGuestCartItems()
    const key = guestCartItemKey(payload)
    const existing = items.find((item) => guestCartItemKey(item) === key)

    if (existing) {
      existing.quantity += payload.quantity ?? 1
    } else {
      items.push({
        productId: payload.productId,
        swatchId: payload.swatchId,
        sizeLengthCode: payload.sizeLengthCode,
        sizeWidthCode: payload.sizeWidthCode,
        quantity: payload.quantity ?? 1,
        productTitle: payload.productTitle ?? "",
        primaryImageUrl: payload.primaryImageUrl ?? "",
        unitPrice: payload.unitPrice ?? 0,
        colourLabel: payload.colourLabel ?? "",
      })
    }

    writeGuestCartItems(items)
    return Promise.resolve()
  },

  updateItem: (itemId: string, payload: UpdateCartItemPayload) => {
    const items = readGuestCartItems()
    const index = items.findIndex((item) => guestCartItemKey(item) === itemId)
    if (index === -1) {
      return Promise.resolve()
    }

    const updated: GuestCartItem = {
      ...items[index],
      swatchId: payload.swatchId ?? items[index].swatchId,
      sizeLengthCode: payload.sizeLengthCode ?? items[index].sizeLengthCode,
      sizeWidthCode: payload.sizeWidthCode ?? items[index].sizeWidthCode,
      quantity: payload.quantity ?? items[index].quantity,
    }

    // If the identity changed (swatch/size), merge into any line that already
    // has the new combination — mirrors the server's behaviour.
    const newKey = guestCartItemKey(updated)
    const duplicateIndex = items.findIndex(
      (item, i) => i !== index && guestCartItemKey(item) === newKey
    )

    if (duplicateIndex !== -1) {
      items[duplicateIndex].quantity += updated.quantity
      items.splice(index, 1)
    } else {
      items[index] = updated
    }

    writeGuestCartItems(items)
    return Promise.resolve()
  },

  removeItem: (itemId: string) => {
    const items = readGuestCartItems().filter(
      (item) => guestCartItemKey(item) !== itemId
    )
    writeGuestCartItems(items)
    return Promise.resolve()
  },

  clear: () => {
    clearGuestCartStorage()
    return Promise.resolve()
  },
}
