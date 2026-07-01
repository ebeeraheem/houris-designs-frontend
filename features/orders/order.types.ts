export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_FAILED"
  | "NEW"
  | "IN_PROGRESS"
  | "READY_FOR_DELIVERY"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "UNKNOWN"

export interface ApiOrderHistoryItem {
  id: string
  orderReference?: string | null
  productTitles?: string[] | null
  total: number | string
  currency?: string | null
  status?: string | null
  datePlaced?: string | null
  createdAt?: string | null
}

export interface ApiOrdersListResponse {
  items: ApiOrderHistoryItem[]
  searchTerm: string | null
  totalCount: number
  currentPage: number
  pageSize: number
  startRecord: number
  endRecord: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface ApiOrderItem {
  productId?: string | null
  productTitle: string
  swatchId?: string | null
  colourLabel?: string | null
  colour?: string | null
  sizeLengthCode?: string | null
  sizeWidthCode?: number | string | null
  baseSize?: string | null
  quantity?: number | string | null
  unitPrice?: number | string | null
  lineSubtotal?: number | string | null
}

export interface ApiOrderStatusHistoryEntry {
  status?: string | null
  changedAt?: string | null
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

export interface ApiOrderDetail {
  id: string
  orderReference?: string | null
  reference?: string | null
  productTitles?: string[] | null
  items?: ApiOrderItem[] | null
  shippingAddress?: ApiShippingAddress | null
  address?: ApiShippingAddress | null
  status?: string | null
  total: number | string
  currency?: string | null
  datePlaced?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  statusHistory?: ApiOrderStatusHistoryEntry[] | null
}

export interface OrderHistoryItem {
  id: string
  orderReference: string
  productTitles: string[]
  total: number
  currency: string
  status: OrderStatus
  datePlaced: string | null
}

export interface OrderHistoryResponse {
  data: OrderHistoryItem[]
  total: number
  page: number
  pageSize: number
  startRecord: number
  endRecord: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface OrderStatusHistoryEntry {
  status: OrderStatus
  changedAt: string | null
}

export interface OrderItem {
  productId: string | null
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

export interface Order {
  id: string
  orderReference: string
  productTitles: string[]
  items: OrderItem[]
  shippingAddress: ShippingAddress | null
  status: OrderStatus
  total: number
  currency: string
  datePlaced: string | null
  updatedAt: string | null
  statusHistory: OrderStatusHistoryEntry[]
}
