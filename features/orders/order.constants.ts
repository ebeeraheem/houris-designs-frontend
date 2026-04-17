export const ORDERS_QUERY_KEY = "orders"
export const ORDER_DETAIL_QUERY_KEY = "order-detail"

export const ORDER_ROUTES = {
  LIST: "/account/orders",
  DETAIL: (id: string) => `/account/orders/${id}`,
  ADMIN_LIST: "/admin/orders",
  ADMIN_DETAIL: (id: string) => `/admin/orders/${id}`,
} as const
