import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest.setup.ts"],
    env: {
      NEXT_PUBLIC_API_BASE_URL: "https://api-staging.hourisdesigns.com",
      NEXT_PUBLIC_IMAGE_BASE_URL:
        "https://pub-71f11e4e8896405ca640ab656f0b6eb0.r2.dev",
    },
  },
})
