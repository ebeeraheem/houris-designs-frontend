/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production"

// Derive an allowlistable origin from an env-configured base URL.
function getOrigin(rawUrl) {
  if (!rawUrl) {
    return ""
  }
  try {
    return new URL(rawUrl).origin
  } catch {
    return ""
  }
}

const apiOrigin = getOrigin(process.env.NEXT_PUBLIC_API_BASE_URL)
// Product/swatch/gallery images are served from an external bucket/CDN (e.g.
// Cloudflare R2), a different origin than the API, so it needs its own entry.
const imageOrigin = getOrigin(process.env.NEXT_PUBLIC_IMAGE_BASE_URL)

// next/image only optimizes remote images whose host is allowlisted here.
function toRemotePattern(rawUrl) {
  if (!rawUrl) {
    return null
  }
  try {
    const url = new URL(rawUrl)
    return { protocol: url.protocol.replace(":", ""), hostname: url.hostname }
  } catch {
    return null
  }
}

const remotePatterns = [
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
  process.env.NEXT_PUBLIC_API_BASE_URL,
]
  .map(toRemotePattern)
  .filter(Boolean)

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
  `img-src ${["'self'", "data:", "blob:", apiOrigin, imageOrigin].filter(Boolean).join(" ")}`,
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
  images: {
    remotePatterns,
  },
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
