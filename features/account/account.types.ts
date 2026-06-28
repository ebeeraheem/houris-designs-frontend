export interface ApiProfile {
  id: string
  fullName: string
  email: string
}

export interface ApiShippingAddress {
  recipientName: string
  line1: string
  line2: string | null
  city: string
  stateOrRegion: string
  country: string
  postalCode: string
}

export interface ApiUpdateAddressRequest {
  recipientName: string
  line1: string
  line2: string | null
  city: string
  stateOrRegion: string
  country: string
  postalCode: string
}

export interface Profile {
  id: string
  fullName: string
  email: string
}

export interface ShippingAddress {
  recipientName: string
  addressLine1: string
  addressLine2: string | null
  city: string
  stateRegion: string
  country: string
  postalCode: string
}
