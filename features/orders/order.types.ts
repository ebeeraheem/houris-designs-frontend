export type OrderStatus =
  | "NEW"
  | "IN_PROGRESS"
  | "READY_FOR_DELIVERY"
  | "SHIPPED"
  | "DELIVERED"

export interface ApiOrder {
  id: string
  customerId: string
  customerName: string
  items: ApiOrderItem[]
  shippingAddress: ApiShippingAddress
  status: OrderStatus
  assignedTailor: string | null
  total: number
  createdAt: string
  updatedAt: string
}

export interface ApiOrderItem {
  productId: string
  productTitle: string
  swatchId?: string | null
  colourLabel?: string | null
  colour?: string | null
  sizeLengthCode?: string | null
  sizeWidthCode?: number | null
  baseSize?: string | null
  quantity: number
  unitPrice: number
  lineSubtotal: number
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

export interface Order {
  id: string
  customerId: string
  customerName: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  status: OrderStatus
  assignedTailor: string | null
  total: number
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  productTitle: string
  swatchId: string | null
  colourLabel: string
  sizeLengthCode: string | null
  sizeWidthCode: number | null
  quantity: number
  unitPrice: number
  lineSubtotal: number
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
