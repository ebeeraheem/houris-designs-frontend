import type {
  ApiOrderDetail,
  ApiOrderHistoryItem,
  ApiOrderItem,
  ApiOrdersListResponse,
  ApiShippingAddress,
  Order,
  OrderHistoryItem,
  OrderHistoryResponse,
  OrderItem,
  OrderStatus,
  OrderStatusHistoryEntry,
  ShippingAddress,
} from "./order.types"
import { parseLegacyBaseSize } from "@/utils/size-codes"

function toNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return 0
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function normalizeOrderStatus(value?: string | null): OrderStatus {
  const normalized = value?.replace(/[\s-]/g, "").toLowerCase() ?? ""

  switch (normalized) {
    case "pendingpayment":
      return "PENDING_PAYMENT"
    case "paymentfailed":
      return "PAYMENT_FAILED"
    case "new":
      return "NEW"
    case "inprogress":
      return "IN_PROGRESS"
    case "readyfordelivery":
      return "READY_FOR_DELIVERY"
    case "shipped":
      return "SHIPPED"
    case "delivered":
      return "DELIVERED"
    case "cancelled":
    case "canceled":
      return "CANCELLED"
    default:
      return "UNKNOWN"
  }
}

function toShippingAddress(
  api: ApiShippingAddress | null | undefined
): ShippingAddress | null {
  if (!api) {
    return null
  }

  return {
    recipientName: api.recipientName,
    addressLine1: api.addressLine1,
    addressLine2: api.addressLine2,
    city: api.city,
    stateRegion: api.stateRegion,
    country: api.country,
    postalCode: api.postalCode,
  }
}

function toOrderHistoryItem(api: ApiOrderHistoryItem): OrderHistoryItem {
  return {
    id: api.id,
    orderReference: api.orderReference ?? api.id,
    productTitles: api.productTitles ?? [],
    total: toNumber(api.total),
    status: normalizeOrderStatus(api.status),
    datePlaced: api.datePlaced ?? api.createdAt ?? null,
  }
}

function toOrderItem(api: ApiOrderItem): OrderItem {
  const legacySize = parseLegacyBaseSize(api.baseSize)
  const parsedWidth = Number(api.sizeWidthCode)
  const sizeWidthCode = Number.isFinite(parsedWidth)
    ? parsedWidth
    : legacySize.sizeWidthCode
  const quantity = toNumber(api.quantity)
  const unitPrice = toNumber(api.unitPrice)
  const lineSubtotal = toNumber(api.lineSubtotal)

  return {
    productId: api.productId ?? null,
    productTitle: api.productTitle,
    swatchId: api.swatchId ?? null,
    colourLabel: api.colourLabel ?? api.colour ?? "Selected swatch",
    sizeLengthCode: api.sizeLengthCode ?? legacySize.sizeLengthCode,
    sizeWidthCode,
    quantity,
    unitPrice,
    lineSubtotal: lineSubtotal > 0 ? lineSubtotal : unitPrice * quantity,
  }
}

function toOrderStatusHistoryEntry(api: {
  status?: string | null
  changedAt?: string | null
}): OrderStatusHistoryEntry {
  return {
    status: normalizeOrderStatus(api.status),
    changedAt: api.changedAt ?? null,
  }
}

export const toOrdersList = (
  api: ApiOrdersListResponse
): OrderHistoryResponse => ({
  data: api.items.map(toOrderHistoryItem),
  total: api.totalCount,
  page: api.currentPage,
  pageSize: api.pageSize,
  startRecord: api.startRecord,
  endRecord: api.endRecord,
  totalPages: api.totalPages,
  hasNext: api.hasNextPage,
  hasPrev: api.hasPreviousPage,
})

export const toOrder = (api: ApiOrderDetail): Order => {
  const items = (api.items ?? []).map(toOrderItem)
  const productTitles =
    api.productTitles?.length && api.productTitles.length > 0
      ? api.productTitles
      : items.map((item) => item.productTitle)
  const currentStatus = normalizeOrderStatus(api.status)
  const placedAt = api.datePlaced ?? api.createdAt ?? null
  const statusHistory = (api.statusHistory ?? []).map(toOrderStatusHistoryEntry)

  return {
    id: api.id,
    orderReference: api.orderReference ?? api.reference ?? api.id,
    productTitles,
    items,
    shippingAddress: toShippingAddress(api.shippingAddress ?? api.address),
    status: currentStatus,
    total: toNumber(api.total),
    datePlaced: placedAt,
    updatedAt: api.updatedAt ?? null,
    statusHistory:
      statusHistory.length > 0
        ? statusHistory
        : [{ status: currentStatus, changedAt: placedAt }],
  }
}
