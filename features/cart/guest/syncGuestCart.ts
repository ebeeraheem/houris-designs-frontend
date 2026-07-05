import type { QueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { postCartItem } from "../cart.adapter"
import { CART_QUERY_KEY } from "../cart.constants"
import {
  guestCartItemKey,
  readGuestCartItems,
  writeGuestCartItems,
} from "./guestCart.storage"

export interface GuestCartSyncResult {
  synced: number
  failed: number
}

/**
 * Pushes the localStorage guest cart into the signed-in customer's server cart.
 * The server merges duplicate (product + swatch + size) lines by quantity, so
 * re-running after a partial failure never double-counts. Items the server
 * rejects (e.g. product unpublished since they were added) are dropped from
 * localStorage too — keeping them would re-fail on every sign-in forever.
 */
export async function syncGuestCartToServer(
  queryClient: QueryClient
): Promise<GuestCartSyncResult> {
  const items = readGuestCartItems()
  if (items.length === 0) {
    return { synced: 0, failed: 0 }
  }

  let synced = 0
  let failed = 0

  for (const item of items) {
    try {
      await postCartItem({
        productId: item.productId,
        swatchId: item.swatchId,
        sizeLengthCode: item.sizeLengthCode,
        sizeWidthCode: item.sizeWidthCode,
        quantity: item.quantity,
      })
      synced += 1
    } catch {
      failed += 1
    }

    const remaining = readGuestCartItems().filter(
      (stored) => guestCartItemKey(stored) !== guestCartItemKey(item)
    )
    writeGuestCartItems(remaining)
  }

  if (failed > 0) {
    toast.error(
      "Some items in your cart were no longer available and have been removed."
    )
  }

  await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] })

  return { synced, failed }
}
