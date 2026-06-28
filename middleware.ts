import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// The 7-day refresh-token cookie is the durable "possibly authenticated" signal;
// the access_token cookie expires after 15 minutes, so its absence != logged out.
const REFRESH_TOKEN_COOKIE = "refresh_token"

export function middleware(request: NextRequest) {
  // Only enforce in production. In local dev the auth cookies live on the API
  // origin (a different host), so the frontend never receives them and gating
  // here would falsely redirect every protected route.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next()
  }

  if (request.cookies.has(REFRESH_TOKEN_COOKIE)) {
    return NextResponse.next()
  }

  const signInUrl = new URL("/signin", request.url)
  signInUrl.searchParams.set(
    "returnUrl",
    request.nextUrl.pathname + request.nextUrl.search
  )

  return NextResponse.redirect(signInUrl)
}

export const config = {
  matcher: ["/account/:path*", "/cart", "/checkout/:path*"],
}
