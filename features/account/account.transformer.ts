import type {
  ApiProfile,
  ApiShippingAddress,
  Profile,
  ShippingAddress,
} from "./account.types"

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
  addressLine1: api.addressLine1,
  addressLine2: api.addressLine2,
  city: api.city,
  stateRegion: api.stateRegion,
  country: api.country,
  postalCode: api.postalCode,
})
