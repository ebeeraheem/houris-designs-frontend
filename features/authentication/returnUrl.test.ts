import { describe, expect, it } from "vitest"

import { getSafeReturnUrl } from "./returnUrl"

describe("getSafeReturnUrl", () => {
  it("accepts same-origin paths", () => {
    expect(getSafeReturnUrl("/account")).toBe("/account")
    expect(getSafeReturnUrl("/account/orders?page=2")).toBe(
      "/account/orders?page=2"
    )
  })

  it("rejects protocol-relative and backslash variants", () => {
    expect(getSafeReturnUrl("//evil.com")).toBeNull()
    expect(getSafeReturnUrl("/\\evil.com")).toBeNull()
  })

  it("rejects absolute urls and non-path values", () => {
    expect(getSafeReturnUrl("https://evil.com")).toBeNull()
    expect(getSafeReturnUrl("account")).toBeNull()
    expect(getSafeReturnUrl(undefined)).toBeNull()
  })

  it("uses the first entry when given an array", () => {
    expect(getSafeReturnUrl(["/cart", "/account"])).toBe("/cart")
  })
})
