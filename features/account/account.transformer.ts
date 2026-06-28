import type {
  ApiProfile,
  ApiShippingAddress,
  ApiUpdateAddressRequest,
  Profile,
  ShippingAddress,
} from "./account.types"
import type { UpdateAddressPayload } from "./account.schema"

const toSafeText = (value: string | null | undefined) =>
  typeof value === "string" ? value : ""

export const toProfile = (api: ApiProfile): Profile => ({
  id: api.id,
  fullName: toSafeText(api.fullName),
  email: toSafeText(api.email),
})

export const toShippingAddress = (
  api: ApiShippingAddress
): ShippingAddress => ({
  recipientName: api.recipientName,
  addressLine1: api.line1,
  addressLine2: api.line2,
  city: api.city,
  stateRegion: api.stateOrRegion,
  country: api.country,
  postalCode: api.postalCode,
})

export const toUpdateAddressRequest = (
  payload: UpdateAddressPayload
): ApiUpdateAddressRequest => ({
  recipientName: payload.recipientName,
  line1: payload.addressLine1,
  line2: payload.addressLine2 ?? null,
  city: payload.city,
  stateOrRegion: payload.stateRegion,
  country: payload.country,
  postalCode: payload.postalCode,
})
