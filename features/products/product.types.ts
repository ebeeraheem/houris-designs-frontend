export interface ApiProductColour {
  id?: string | null
  swatchId?: string | null
  label: string
  swatchImageUrl: string | null
}

export interface ApiProduct {
  id: string
  title: string
  price: number
  description: string | null
  availableColours?: ApiProductColour[]
  colours?: ApiProductColour[]
  primaryImageUrl: string | null
  galleryImageUrls: string[]
  isEnabled?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ApiProductListItem {
  id: string
  title: string
  price: number
  primaryImageUrl: string
}

export interface ApiProductListResponse {
  items: ApiProductListItem[]
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

export interface ProductColour {
  id: string | null
  label: string
  swatchImageUrl: string | null
}

export interface Product {
  id: string
  title: string
  price: number
  description: string | null
  availableColours: ProductColour[]
  primaryImageUrl: string
  galleryImageUrls: string[]
  isEnabled: boolean | null
  createdAt: string | null
  updatedAt: string | null
}

export interface ProductListItem {
  id: string
  title: string
  price: number
  primaryImageUrl: string
}

export interface ProductListResponse {
  data: ProductListItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
