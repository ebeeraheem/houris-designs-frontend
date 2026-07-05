import { guestCartRepository } from "./guestCart.repository"
import type { Cart } from "../cart.types"
import type { AddCartItemPayload, UpdateCartItemPayload } from "../cart.schema"

export const guestCartService = {
  getCart: (): Promise<Cart> => {
    return guestCartRepository.get()
  },

  addToCart: (payload: AddCartItemPayload): Promise<void> => {
    return guestCartRepository.addItem(payload)
  },

  updateCartItem: (
    itemId: string,
    payload: UpdateCartItemPayload
  ): Promise<void> => {
    return guestCartRepository.updateItem(itemId, payload)
  },

  removeFromCart: (itemId: string): Promise<void> => {
    return guestCartRepository.removeItem(itemId)
  },

  clearCart: (): Promise<void> => {
    return guestCartRepository.clear()
  },
}
