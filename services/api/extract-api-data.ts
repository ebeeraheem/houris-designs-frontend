type ApiEnvelope<T> = {
  data: T
}

export function extractApiData<T>(payload: T | ApiEnvelope<T>): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    payload.data !== undefined
  ) {
    return payload.data
  }

  return payload as T
}
