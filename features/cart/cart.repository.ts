import type { Cart } from "./cart.types"
import type { AddCartItemPayload, UpdateCartItemPayload } from "./cart.schema"
import {
  fetchCart,
  postCartItem,
  patchCartItem,
  destroyCartItem,
  destroyCart,
} from "./cart.adapter"
import { toCart } from "./cart.transformer"

export interface ICartRepository {
  get(): Promise<Cart>
  addItem(payload: AddCartItemPayload): Promise<Cart>
  updateItem(itemId: string, payload: UpdateCartItemPayload): Promise<Cart>
  removeItem(itemId: string): Promise<Cart>
  clear(): Promise<void>
}

export const cartRepository: ICartRepository = {
  get: async () => {
    const raw = await fetchCart()
    return toCart(raw)
  },

  addItem: async (payload) => {
    const raw = await postCartItem(payload)
    return toCart(raw)
  },

  updateItem: async (itemId, payload) => {
    const raw = await patchCartItem(itemId, payload)
    return toCart(raw)
  },

  removeItem: async (itemId) => {
    const raw = await destroyCartItem(itemId)
    return toCart(raw)
  },

  clear: async () => {
    await destroyCart()
  },
}
