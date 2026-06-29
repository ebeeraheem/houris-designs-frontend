import { describe, expect, it } from "vitest"

import {
  DEFAULT_PRODUCT_SORT,
  parseProductSort,
  toApiSortBy,
} from "./product.sort"

describe("parseProductSort", () => {
  it("returns recognised sort values", () => {
    expect(parseProductSort("newest")).toBe("newest")
    expect(parseProductSort("price-asc")).toBe("price-asc")
    expect(parseProductSort("price-desc")).toBe("price-desc")
  })

  it("falls back to the default for unknown or missing values", () => {
    expect(parseProductSort("bogus")).toBe(DEFAULT_PRODUCT_SORT)
    expect(parseProductSort(null)).toBe(DEFAULT_PRODUCT_SORT)
    expect(parseProductSort(undefined)).toBe(DEFAULT_PRODUCT_SORT)
  })
})

describe("toApiSortBy", () => {
  it("maps UI sort values to backend enum names", () => {
    expect(toApiSortBy("newest")).toBe("Newest")
    expect(toApiSortBy("oldest")).toBe("Oldest")
    expect(toApiSortBy("price-asc")).toBe("PriceAsc")
    expect(toApiSortBy("price-desc")).toBe("PriceDesc")
  })
})
