import { describe, expect, it } from "vitest"

import { isAllowedPaymentUrl } from "./checkout.payment-url"

describe("isAllowedPaymentUrl", () => {
  it("allows https paystack hosts", () => {
    expect(isAllowedPaymentUrl("https://checkout.paystack.com/abc123")).toBe(
      true
    )
    expect(isAllowedPaymentUrl("https://paystack.com/pay")).toBe(true)
  })

  it("rejects non-https", () => {
    expect(isAllowedPaymentUrl("http://checkout.paystack.com/abc")).toBe(false)
  })

  it("rejects other and look-alike hosts", () => {
    expect(isAllowedPaymentUrl("https://evil.com/checkout")).toBe(false)
    expect(isAllowedPaymentUrl("https://paystack.com.evil.com")).toBe(false)
  })

  it("rejects unparseable values", () => {
    expect(isAllowedPaymentUrl("not a url")).toBe(false)
    expect(isAllowedPaymentUrl("")).toBe(false)
  })
})
