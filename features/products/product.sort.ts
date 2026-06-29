// Maps the URL `?sort=` value to the backend's `sortBy` enum name. The API
// accepts the enum name (Newest/Oldest/PriceAsc/PriceDesc) and defaults to Newest.

export type ProductSortByApi = "Newest" | "Oldest" | "PriceAsc" | "PriceDesc"

export const PRODUCT_SORT_OPTIONS = [
  { value: "newest", label: "Newest", api: "Newest" },
  { value: "oldest", label: "Oldest", api: "Oldest" },
  { value: "price-asc", label: "Price: Low to High", api: "PriceAsc" },
  { value: "price-desc", label: "Price: High to Low", api: "PriceDesc" },
] as const

export type ProductSortValue = (typeof PRODUCT_SORT_OPTIONS)[number]["value"]

export const DEFAULT_PRODUCT_SORT: ProductSortValue = "newest"

export function parseProductSort(
  raw: string | null | undefined
): ProductSortValue {
  const match = PRODUCT_SORT_OPTIONS.find((option) => option.value === raw)
  return match?.value ?? DEFAULT_PRODUCT_SORT
}

export function toApiSortBy(value: ProductSortValue): ProductSortByApi {
  const match = PRODUCT_SORT_OPTIONS.find((option) => option.value === value)
  return match?.api ?? "Newest"
}
