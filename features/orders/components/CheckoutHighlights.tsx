import {
  RiMapPin2Line,
  RiSecurePaymentLine,
  RiShoppingBag3Line,
} from "@remixicon/react"

interface CheckoutHighlightsProps {
  itemsCount: number
  city: string
  country: string
}

export function CheckoutHighlights({
  itemsCount,
  city,
  country,
}: CheckoutHighlightsProps) {
  const highlights = [
    {
      icon: RiShoppingBag3Line,
      label: "Pieces Ready",
      value: `${itemsCount} selected`,
    },
    {
      icon: RiMapPin2Line,
      label: "Saved Address",
      value: `${city}, ${country}`,
    },
    {
      icon: RiSecurePaymentLine,
      label: "Payment Step",
      value: "Secure handoff after review",
    },
  ]

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {highlights.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="rounded-[1.1rem] border border-border/70 bg-background/82 p-4"
        >
          <div className="flex items-center gap-2 text-brand">
            <Icon className="size-4" />
            <p className="text-[0.7rem] font-medium tracking-[0.16em] uppercase">
              {label}
            </p>
          </div>
          <p className="mt-3 text-[0.84rem] leading-6 text-muted-foreground">
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}
