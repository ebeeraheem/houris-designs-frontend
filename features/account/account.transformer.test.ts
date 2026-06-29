import { describe, expect, it } from "vitest"

import {
  toProfile,
  toShippingAddress,
  toUpdateAddressRequest,
} from "./account.transformer"

describe("toProfile", () => {
  it("coalesces missing name/email to empty strings", () => {
    expect(
      toProfile({ id: "u1", fullName: null, email: null } as never)
    ).toEqual({ id: "u1", fullName: "", email: "" })
  })
})

describe("toShippingAddress", () => {
  it("maps backend field names to the app domain names", () => {
    expect(
      toShippingAddress({
        recipientName: "Jane Doe",
        line1: "1 Fashion Ave",
        line2: "Apt 2",
        city: "Lagos",
        stateOrRegion: "Lagos",
        country: "Nigeria",
        postalCode: "100001",
      })
    ).toEqual({
      recipientName: "Jane Doe",
      addressLine1: "1 Fashion Ave",
      addressLine2: "Apt 2",
      city: "Lagos",
      stateRegion: "Lagos",
      country: "Nigeria",
      postalCode: "100001",
    })
  })
})

describe("toUpdateAddressRequest", () => {
  it("maps the form payload to the backend request shape", () => {
    expect(
      toUpdateAddressRequest({
        recipientName: "Jane Doe",
        addressLine1: "1 Fashion Ave",
        addressLine2: undefined,
        city: "Lagos",
        stateRegion: "Lagos",
        country: "Nigeria",
        postalCode: "100001",
      })
    ).toEqual({
      recipientName: "Jane Doe",
      line1: "1 Fashion Ave",
      line2: null,
      city: "Lagos",
      stateOrRegion: "Lagos",
      country: "Nigeria",
      postalCode: "100001",
    })
  })
})
