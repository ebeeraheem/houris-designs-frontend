import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CHECKOUT_ROUTES } from "@/features/orders/checkout.constants"

interface CartSummaryProps {
  total: number
}

export function CartSummary({ total }: CartSummaryProps) {
  return (
    <div className="surface-card p-6">
      <p className="eyebrow-label mb-4 text-brand">Order Summary</p>
      <div className="space-y-2 border-b border-border/50 pb-4">
        <div className="flex justify-between text-[0.78rem]">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${total}</span>
        </div>
        <div className="flex justify-between text-[0.78rem]">
          <span className="text-muted-foreground">Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <span className="font-heading text-[1rem] font-medium tracking-[-0.02em]">
          Total
        </span>
        <span className="font-heading text-[1rem] font-medium tracking-[-0.02em]">
          ${total}
        </span>
      </div>
      <div className="mt-6 space-y-3">
        <Button
          render={<Link href={CHECKOUT_ROUTES.PAGE} className="w-full" />}
        >
          Proceed to Checkout
        </Button>
        <Link
          href="/collection"
          className="block text-center text-[0.72rem] font-medium tracking-[0.14em] text-muted-foreground uppercase hover:text-foreground"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
