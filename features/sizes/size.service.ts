import { sizeRepository } from "./size.repository"
import type { SizeGuide } from "./size.types"

export const sizeService = {
  getSizeGuide: (): Promise<SizeGuide> => {
    return sizeRepository.getGuide()
  },
}
