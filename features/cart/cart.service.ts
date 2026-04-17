import { cartRepository } from "./cart.repository"
import type { Cart } from "./cart.types"
import type { AddCartItemPayload, UpdateCartItemPayload } from "./cart.schema"

export const cartService = {
  getCart: (): Promise<Cart> => {
    return cartRepository.get()
  },

  addToCart: (payload: AddCartItemPayload): Promise<Cart> => {
    return cartRepository.addItem(payload)
  },

  updateCartItem: (
    itemId: string,
    payload: UpdateCartItemPayload
  ): Promise<Cart> => {
    return cartRepository.updateItem(itemId, payload)
  },

  removeFromCart: (itemId: string): Promise<Cart> => {
    return cartRepository.removeItem(itemId)
  },

  clearCart: (): Promise<void> => {
    return cartRepository.clear()
  },
}
