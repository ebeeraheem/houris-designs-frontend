/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production"

// Derive the API origin so it can be allowlisted in connect-src / img-src.
function getApiOrigin() {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!raw) {
    return ""
  }
  try {
    return new URL(raw).origin
  } catch {
    return ""
  }
}

const apiOrigin = getApiOrigin()

const scriptSrc = ["'self'", "'unsafe-inline'"]
const connectSrc = ["'self'", apiOrigin].filter(Boolean)

if (!isProduction) {
  // Next.js dev/HMR needs eval and a websocket connection.
  scriptSrc.push("'unsafe-eval'")
  connectSrc.push("ws:")
}

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${scriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src ${["'self'", "data:", "blob:", apiOrigin].filter(Boolean).join(" ")}`,
  "font-src 'self'",
  `connect-src ${connectSrc.join(" ")}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
]

if (isProduction) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  })
}

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
