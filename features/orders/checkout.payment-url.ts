// Payment redirects must point at Paystack's hosted checkout. Validating the
// origin is defense-in-depth against a malformed or compromised API response
// before we hand the browser off with window.location.assign.
const ALLOWED_PAYMENT_HOST = "paystack.com"

export function isAllowedPaymentUrl(url: string): boolean {
  let parsed: URL

  try {
    parsed = new URL(url)
  } catch {
    return false
  }

  if (parsed.protocol !== "https:") {
    return false
  }

  const host = parsed.hostname.toLowerCase()

  return (
    host === ALLOWED_PAYMENT_HOST || host.endsWith(`.${ALLOWED_PAYMENT_HOST}`)
  )
}
