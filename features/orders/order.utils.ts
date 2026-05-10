import type { OrderStatus } from "./order.types"

const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "Pending Payment",
  NEW: "New",
  IN_PROGRESS: "In Progress",
  READY_FOR_DELIVERY: "Ready for Delivery",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  UNKNOWN: "Unknown",
}

const orderStatusClasses: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "border-amber-500/25 bg-amber-500/10 text-amber-700",
  NEW: "border-brand/30 bg-brand/10 text-brand",
  IN_PROGRESS: "border-warning/30 bg-warning/10 text-warning",
  READY_FOR_DELIVERY: "border-info/30 bg-info/10 text-info",
  SHIPPED: "border-info/30 bg-info/10 text-info",
  DELIVERED: "border-success/30 bg-success/10 text-success",
  CANCELLED: "border-destructive/30 bg-destructive/10 text-destructive",
  UNKNOWN: "border-border bg-secondary/70 text-foreground/80",
}

export function getOrderStatusLabel(status: OrderStatus) {
  return orderStatusLabels[status]
}

export function getOrderStatusClasses(status: OrderStatus) {
  return orderStatusClasses[status]
}

export function formatOrderDate(value: string | null) {
  if (!value) {
    return "Date unavailable"
  }

  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed)
}

export function formatOrderDateTime(value: string | null) {
  if (!value) {
    return "Date unavailable"
  }

  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed)
}
