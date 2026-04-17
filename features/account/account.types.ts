export interface ApiProfile {
  id: string
  fullName: string
  email: string
}

export interface ApiShippingAddress {
  recipientName: string
  addressLine1: string
  addressLine2: string | null
  city: string
  stateRegion: string
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
