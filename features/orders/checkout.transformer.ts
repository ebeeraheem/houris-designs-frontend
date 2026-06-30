import { normalizeOrderStatus } from "./order.transformer"
import type {
  ApiCheckoutResponse,
  ApiCheckoutVerificationResponse,
  CheckoutResult,
  CheckoutVerificationResult,
} from "./checkout.types"

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {}
}

function resolveCheckoutPayload(value: unknown) {
  let current = toRecord(value)

  while (current.data && typeof current.data === "object") {
    const next = toRecord(current.data)

    if (
      "orderReference" in next ||
      "reference" in next ||
      "paymentUrl" in next ||
      "authorizationUrl" in next ||
      "status" in next
    ) {
      return next
    }

    current = next
  }

  return current
}

export const toCheckoutResult = (api: ApiCheckoutResponse): CheckoutResult => {
  const root = toRecord(api)
  const payload = resolveCheckoutPayload(root)

  return {
    orderReference:
      typeof payload.orderReference === "string"
        ? payload.orderReference
        : typeof payload.reference === "string"
          ? payload.reference
          : "",
    reference:
      typeof payload.reference === "string"
        ? payload.reference
        : typeof payload.orderReference === "string"
          ? payload.orderReference
          : "",
    paymentUrl:
      typeof payload.paymentUrl === "string"
        ? payload.paymentUrl
        : typeof payload.authorizationUrl === "string"
          ? payload.authorizationUrl
          : "",
  }
}

export const toCheckoutVerificationResult = (
  api: ApiCheckoutVerificationResponse
): CheckoutVerificationResult => {
  const root = toRecord(api)
  const payload = resolveCheckoutPayload(root)
  const reference =
    typeof payload.reference === "string"
      ? payload.reference
      : typeof payload.orderReference === "string"
        ? payload.orderReference
        : ""
  const orderReference =
    typeof payload.orderReference === "string"
      ? payload.orderReference
      : typeof payload.reference === "string"
        ? payload.reference
        : ""
  const status =
    typeof payload.status === "string"
      ? payload.status
      : typeof root.status === "string"
        ? root.status
        : undefined
  const message =
    typeof payload.message === "string"
      ? payload.message
      : typeof root.message === "string"
        ? root.message
        : ""

  return {
    orderReference,
    reference,
    status: normalizeOrderStatus(status),
    message,
  }
}
