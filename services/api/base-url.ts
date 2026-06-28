function normalizeBaseUrl(value: string | undefined) {
  return value?.trim().replace(/\/+$/, "") ?? ""
}

export function getApiBaseUrl() {
  const configured = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL)

  if (!configured) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. The app no longer falls back to the " +
        "staging API. For local development, copy .env.example to .env.local; " +
        "for builds and deploys, set NEXT_PUBLIC_API_BASE_URL in the environment."
    )
  }

  return configured
}

export function resolveApiAssetUrl(url: string | null): string | null {
  if (!url) {
    return null
  }

  if (/^(?:https?:)?\/\//.test(url) || url.startsWith("data:")) {
    return url
  }

  const normalizedUrl = url.replace(/^\/+/, "")

  return `${getApiBaseUrl()}/${normalizedUrl}`
}
