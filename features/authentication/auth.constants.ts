export const AUTH_QUERY_KEY = "auth"
export const AUTH_SUCCESS_STATUS = 200

// Auth endpoints return varying 2xx codes (e.g. register → 201), so treat any
// 2xx as success rather than comparing against a single status.
export const isSuccessfulAuthStatus = (status: number): boolean =>
  status >= 200 && status < 300

export const AUTH_ROUTES = {
  LOGIN: "/signin",
  REGISTER: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const
