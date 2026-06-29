import { describe, expect, it } from "vitest"

import { formatSizeCode, parseLegacyBaseSize } from "./size-codes"

describe("formatSizeCode", () => {
  it("combines length and width codes", () => {
    expect(formatSizeCode("M", 10)).toBe("M10")
  })

  it("handles a single dimension", () => {
    expect(formatSizeCode("M", null)).toBe("M")
    expect(formatSizeCode(undefined, 10)).toBe("10")
  })

  it("returns 'Select' when both are missing", () => {
    expect(formatSizeCode(null, null)).toBe("Select")
    expect(formatSizeCode(undefined, undefined)).toBe("Select")
  })
})

describe("parseLegacyBaseSize", () => {
  it("splits a legacy base size into parts (uppercased)", () => {
    expect(parseLegacyBaseSize("m10")).toEqual({
      sizeLengthCode: "M",
      sizeWidthCode: 10,
    })
    expect(parseLegacyBaseSize("ML12")).toEqual({
      sizeLengthCode: "ML",
      sizeWidthCode: 12,
    })
  })

  it("returns nulls for empty or malformed input", () => {
    expect(parseLegacyBaseSize(null)).toEqual({
      sizeLengthCode: null,
      sizeWidthCode: null,
    })
    expect(parseLegacyBaseSize("bogus")).toEqual({
      sizeLengthCode: null,
      sizeWidthCode: null,
    })
  })
})
