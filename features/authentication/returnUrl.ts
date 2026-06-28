/**
 * Validates a `returnUrl` query value so it can only point back to a same-origin
 * path. Rejects absolute URLs, protocol-relative (`//`) and backslash variants
 * that browsers may normalize, preventing open-redirect abuse.
 */
export function getSafeReturnUrl(
  raw: string | string[] | undefined
): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw

  if (!value?.startsWith("/")) {
    return null
  }

  if (value.startsWith("//") || value.startsWith("/\\")) {
    return null
  }

  return value
}
