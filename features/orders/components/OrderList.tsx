import { formatSizeCode } from "@/utils/size-codes"

interface OrderItem {
  productTitle: string
  colourLabel: string
  sizeLengthCode: string
  sizeWidthCode: number
  quantity: number
}

interface Order {
  id: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
}

interface OrderListProps {
  orders: Order[]
}

const statusStyles: Record<string, string> = {
  NEW: "border-brand/30 bg-brand/10 text-brand",
  IN_PROGRESS: "border-warning/30 bg-warning/10 text-warning",
  READY_FOR_DELIVERY: "border-info/30 bg-info/10 text-info",
  SHIPPED: "border-info/30 bg-info/10 text-info",
  DELIVERED: "border-success/30 bg-success/10 text-success",
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="surface-card p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <p className="font-heading text-[1rem] font-medium tracking-[-0.02em]">
                  Order #{order.id}
                </p>
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.62rem] font-medium tracking-[0.14em] uppercase ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="mt-1 text-[0.72rem] text-muted-foreground">
                Placed on {order.createdAt}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-heading text-[1rem] font-medium tracking-[-0.02em]">
                ${order.total}
              </p>
              <p className="text-[0.72rem] text-muted-foreground">
                {order.items.length} items
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-border/50 pt-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-[0.72rem]"
                >
                  <div className="image-shell h-10 w-10 shrink-0">
                    <div className="h-full w-full bg-muted/60" />
                  </div>
                  <div>
                    <p className="font-medium">{item.productTitle}</p>
                    <p className="text-muted-foreground">
                      {item.colourLabel} /{" "}
                      {formatSizeCode(item.sizeLengthCode, item.sizeWidthCode)}{" "}
                      / Qty:
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
