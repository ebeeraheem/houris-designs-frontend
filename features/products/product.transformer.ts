import type {
  ApiProduct,
  ApiProductListItem,
  ApiProductListResponse,
  Product,
  ProductListItem,
  ProductListResponse,
} from "./product.types"

export const toProduct = (api: ApiProduct): Product => ({
  id: api.id,
  title: api.title,
  price: api.price,
  description: api.description,
  availableColours: api.availableColours,
  primaryImageUrl: api.primaryImageUrl,
  galleryImageUrls: api.galleryImageUrls,
  isEnabled: api.isEnabled,
  createdAt: api.createdAt,
  updatedAt: api.updatedAt,
})

export const toProductListItem = (
  api: ApiProductListItem
): ProductListItem => ({
  id: api.id,
  title: api.title,
  price: api.price,
  primaryImageUrl: api.primaryImageUrl,
})

export const toProductList = (
  api: ApiProductListResponse
): ProductListResponse => ({
  data: api.items.map(toProductListItem),
  total: api.totalCount,
  page: api.currentPage,
  pageSize: api.pageSize,
  totalPages: api.totalPages,
  hasNext: api.hasNextPage,
  hasPrev: api.hasPreviousPage,
})
