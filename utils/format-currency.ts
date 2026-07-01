const DEFAULT_CURRENCY = process.env.NEXT_PUBLIC_CURRENCY ?? "USD"
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_CURRENCY_LOCALE ?? "en-US"

export function formatCurrency(
  amount: number,
  currency: string = DEFAULT_CURRENCY
): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
