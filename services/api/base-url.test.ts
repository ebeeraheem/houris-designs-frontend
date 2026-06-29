import { afterEach, describe, expect, it, vi } from "vitest"

import { getApiBaseUrl, resolveApiAssetUrl } from "./base-url"

afterEach(() => {
  vi.unstubAllEnvs()
})

describe("getApiBaseUrl", () => {
  it("returns the configured base URL without a trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com/")
    expect(getApiBaseUrl()).toBe("https://api.example.com")
  })

  it("throws when the env var is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "")
    expect(() => getApiBaseUrl()).toThrow(/NEXT_PUBLIC_API_BASE_URL/)
  })
})

describe("resolveApiAssetUrl", () => {
  it("returns null for null input", () => {
    expect(resolveApiAssetUrl(null)).toBeNull()
  })

  it("passes through absolute and data URLs unchanged", () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com")
    expect(resolveApiAssetUrl("https://cdn.example.com/a.jpg")).toBe(
      "https://cdn.example.com/a.jpg"
    )
    expect(resolveApiAssetUrl("data:image/png;base64,xyz")).toBe(
      "data:image/png;base64,xyz"
    )
  })

  it("prefixes relative paths with the API base URL", () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com")
    expect(resolveApiAssetUrl("/images/a.jpg")).toBe(
      "https://api.example.com/images/a.jpg"
    )
  })
})
