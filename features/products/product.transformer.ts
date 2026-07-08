import type {
  ApiProduct,
  ApiProductListItem,
  ApiProductListResponse,
  Product,
  ProductListItem,
  ProductListResponse,
} from "./product.types"
import { resolveApiAssetUrl } from "@/services/api/base-url"

const getProductColours = (api: ApiProduct) =>
  api.availableColours ?? api.colours ?? []

export const toProduct = (api: ApiProduct): Product => ({
  id: api.id,
  slug: api.slug,
  title: api.title,
  price: api.price,
  description: api.description,
  availableColours: getProductColours(api).map((colour) => ({
    id: colour.swatchId ?? colour.id ?? null,
    label: colour.label,
    swatchImageUrl: resolveApiAssetUrl(colour.swatchImageUrl),
  })),
  primaryImageUrl: resolveApiAssetUrl(api.primaryImageUrl) ?? "",
  galleryImageUrls: api.galleryImageUrls.map(
    (imageUrl) => resolveApiAssetUrl(imageUrl) ?? imageUrl
  ),
  isEnabled: api.isEnabled ?? null,
  createdAt: api.createdAt ?? null,
  updatedAt: api.updatedAt ?? null,
})

export const toProductListItem = (
  api: ApiProductListItem
): ProductListItem => ({
  id: api.id,
  slug: api.slug,
  title: api.title,
  price: api.price,
  primaryImageUrl: resolveApiAssetUrl(api.primaryImageUrl) ?? "",
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
