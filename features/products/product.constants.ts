export const PRODUCTS_QUERY_KEY = "products"

export const PRODUCT_ROUTES = {
  LIST: "/couture",
  DETAIL: (id: string) => `/couture/${id}`,
  CREATE: "/admin/products/create",
  EDIT: (id: string) => `/admin/products/${id}/edit`,
} as const

export const PRODUCTS_PER_PAGE = 12
