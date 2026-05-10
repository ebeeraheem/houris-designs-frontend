import { isAxiosError } from "axios"

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (isAxiosError(error)) {
    const { data } = error.response ?? {}

    if (typeof data === "string" && data.trim()) {
      return data
    }

    if (data && typeof data === "object") {
      if ("message" in data && typeof data.message === "string") {
        return data.message
      }

      if ("title" in data && typeof data.title === "string") {
        return data.title
      }

      if ("errors" in data && data.errors && typeof data.errors === "object") {
        const firstFieldError = Object.values(data.errors).find(
          (value): value is string[] =>
            Array.isArray(value) &&
            value.length > 0 &&
            value.every((item) => typeof item === "string")
        )

        if (firstFieldError) {
          return firstFieldError[0]
        }
      }
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
