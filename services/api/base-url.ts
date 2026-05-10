const DEFAULT_API_BASE_URL = "https://api-staging.hourisdesigns.com"

function normalizeBaseUrl(value: string | undefined) {
  return value?.trim().replace(/\/+$/, "") ?? ""
}

export function getApiBaseUrl() {
  return (
    normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL) ||
    DEFAULT_API_BASE_URL
  )
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
