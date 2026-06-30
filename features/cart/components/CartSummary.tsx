import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CHECKOUT_ROUTES } from "@/features/orders/checkout.constants"
import { formatCurrency } from "@/utils/format-currency"

interface CartSummaryProps {
  total: number
  itemsCount?: number
  isClearing?: boolean
  onClearCart?: () => void
}

export function CartSummary({
  total,
  itemsCount = 0,
  isClearing = false,
  onClearCart,
}: CartSummaryProps) {
  return (
    <div className="surface-card p-6">
      <p className="eyebrow-label mb-4 text-brand">Order Summary</p>
      <div className="space-y-2 border-b border-border/50 pb-4">
        <div className="flex justify-between text-[0.78rem]">
          <span className="text-muted-foreground">Pieces</span>
          <span>{itemsCount}</span>
        </div>
        <div className="flex justify-between text-[0.78rem]">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-heading text-[0.96rem] tracking-[-0.04em] text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
        <div className="flex justify-between text-[0.78rem]">
          <span className="text-muted-foreground">Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <span className="font-heading text-[1.05rem] font-medium tracking-[-0.03em]">
          Total
        </span>
        <span className="font-heading text-[1.35rem] font-medium tracking-[-0.05em] sm:text-[1.5rem]">
          {formatCurrency(total)}
        </span>
      </div>
      <div className="mt-6 space-y-3">
        <Button
          render={<Link href={CHECKOUT_ROUTES.PAGE} className="w-full" />}
        >
          Proceed to Checkout
        </Button>
        {onClearCart ? (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onClearCart}
            disabled={isClearing}
          >
            {isClearing ? "Clearing Cart..." : "Clear Cart"}
          </Button>
        ) : null}
        <Link
          href="/couture"
          className="block text-center text-[0.72rem] font-medium tracking-[0.14em] text-muted-foreground uppercase hover:text-foreground"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
