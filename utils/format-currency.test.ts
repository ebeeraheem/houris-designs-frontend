import { describe, expect, it } from "vitest"

import { formatCurrency } from "./format-currency"

describe("formatCurrency", () => {
  it("formats USD amounts with two decimals and a $ symbol", () => {
    const result = formatCurrency(149)
    expect(result).toContain("149.00")
    expect(result).toContain("$")
  })

  it("groups thousands", () => {
    expect(formatCurrency(165000)).toContain("165,000.00")
  })

  it("keeps cents (does not round to whole dollars)", () => {
    expect(formatCurrency(149.6)).toContain("149.60")
  })

  it("honors an explicit currency argument", () => {
    expect(formatCurrency(10, "EUR")).toContain("10.00")
  })
})
