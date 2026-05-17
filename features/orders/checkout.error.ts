import { isAxiosError } from "axios"

export function getCheckoutErrorMessage(error: unknown, fallback: string) {
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
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
