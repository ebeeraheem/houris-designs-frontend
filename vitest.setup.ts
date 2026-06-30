import "@testing-library/jest-dom/vitest"

// Fallbacks so env-dependent modules (e.g. services/api/base-url) are import-safe
// in tests even if the runner's env config doesn't populate process.env.
process.env.NEXT_PUBLIC_API_BASE_URL ||= "https://api-staging.hourisdesigns.com"
process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||=
  "https://pub-71f11e4e8896405ca640ab656f0b6eb0.r2.dev"
