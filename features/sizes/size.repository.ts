import type { SizeGuide } from "./size.types"
import { fetchSizeGuide } from "./size.adapter"
import { toSizeGuide } from "./size.transformer"

export interface ISizeRepository {
  getGuide(): Promise<SizeGuide>
}

export const sizeRepository: ISizeRepository = {
  getGuide: async () => {
    const raw = await fetchSizeGuide()
    return toSizeGuide(raw)
  },
}
