import type { Cart } from "./cart.types"
import type { AddCartItemPayload, UpdateCartItemPayload } from "./cart.schema"
import {
  fetchCart,
  postCartItem,
  putCartItem,
  destroyCartItem,
  destroyCart,
} from "./cart.adapter"
import { toCart } from "./cart.transformer"

export interface ICartRepository {
  get(): Promise<Cart>
  addItem(payload: AddCartItemPayload): Promise<void>
  updateItem(itemId: string, payload: UpdateCartItemPayload): Promise<void>
  removeItem(itemId: string): Promise<void>
  clear(): Promise<void>
}

export const cartRepository: ICartRepository = {
  get: async () => {
    const raw = await fetchCart()
    return toCart(raw)
  },

  addItem: async (payload) => {
    await postCartItem(payload)
  },

  updateItem: async (itemId, payload) => {
    await putCartItem(itemId, payload)
  },

  removeItem: async (itemId) => {
    await destroyCartItem(itemId)
  },

  clear: async () => {
    await destroyCart()
  },
}
