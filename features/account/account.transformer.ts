import type {
  ApiProfile,
  ApiShippingAddress,
  Profile,
  ShippingAddress,
} from "./account.types"

export const toProfile = (api: ApiProfile): Profile => ({
  id: api.id,
  fullName: api.fullName,
  email: api.email,
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
