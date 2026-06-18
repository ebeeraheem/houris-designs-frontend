import axios from "axios"

export function getContactErrorMessage(
  error: unknown,
  fallback = "We could not send your message. Please try again."
) {
  if (!axios.isAxiosError(error)) {
    return fallback
  }

  const data = error.response?.data

  if (data && typeof data === "object") {
    if ("message" in data && typeof data.message === "string") {
      return data.message
    }

    if ("title" in data && typeof data.title === "string") {
      return data.title
    }
  }

  if (error.message) {
    return error.message
  }

  return fallback
}
