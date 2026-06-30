import type { ApiSizeGuideResponse, SizeGuide } from "./size.types"

export const toSizeGuide = (api: ApiSizeGuideResponse): SizeGuide => ({
  lengths: api.lengths,
  widths: api.widths,
})
