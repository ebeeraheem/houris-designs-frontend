import { describe, expect, it } from "vitest"

import { formatCurrency } from "./format-currency"

describe("formatCurrency", () => {
  it("formats whole NGN amounts without decimals", () => {
    const result = formatCurrency(149)
    expect(result).toContain("149")
    expect(result).not.toContain(".")
  })

  it("groups thousands", () => {
    expect(formatCurrency(165000)).toContain("165,000")
  })

  it("rounds to whole numbers", () => {
    expect(formatCurrency(149.6)).toContain("150")
  })
})
