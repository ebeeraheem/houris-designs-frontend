export interface ApiCartItem {
  id: string
  productId: string
  productTitle: string
  primaryImageUrl: string
  unitPrice: number
  swatchId?: string | null
  colourLabel?: string | null
  colour?: string | null
  sizeLengthCode?: string | null
  sizeWidthCode?: number | null
  baseSize?: string | null
  quantity: number
  lineSubtotal: number
}

export interface ApiCartResponse {
  success?: boolean
  message?: string
  data?: {
    items: ApiCartItem[]
    total: number
  }
  items?: ApiCartItem[]
  total?: number
}

export interface CartItem {
  id: string
  productId: string
  productTitle: string
  primaryImageUrl: string
  unitPrice: number
  swatchId: string | null
  colourLabel: string
  sizeLengthCode: string | null
  sizeWidthCode: number | null
  quantity: number
  lineSubtotal: number
}

export interface Cart {
  items: CartItem[]
  total: number
}
