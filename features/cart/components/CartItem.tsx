import Image from "next/image"
import { RiDeleteBinLine } from "@remixicon/react"

import { formatCurrency } from "@/utils/format-currency"
import { formatSizeCode } from "@/utils/size-codes"

interface CartItemProps {
  id: string | null
  productId: string
  productTitle: string
  colourLabel: string
  sizeLengthCode: string | null
  sizeWidthCode: number | null
  quantity: number
  lineSubtotal: number
  primaryImageUrl: string
  isUpdating?: boolean
  isRemoving?: boolean
  onDecreaseQuantity?: () => void
  onIncreaseQuantity?: () => void
  onRemove?: () => void
}

export function CartItem({
  id,
  productTitle,
  colourLabel,
  sizeLengthCode,
  sizeWidthCode,
  quantity,
  lineSubtotal,
  primaryImageUrl,
  isUpdating = false,
  isRemoving = false,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemove,
}: CartItemProps) {
  const isActionPending = isUpdating || isRemoving
  const hasItemId = Boolean(id)

  return (
    <div className="surface-card flex gap-4 p-4 sm:p-6">
      <div className="image-shell h-24 w-24 shrink-0 sm:h-28 sm:w-28">
        <div className="relative h-full w-full">
          <Image
            src={primaryImageUrl}
            alt={productTitle}
            fill
            sizes="112px"
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="eyebrow-label text-brand">{colourLabel}</p>
          <h3 className="mt-1 font-heading text-[1rem] font-medium tracking-[-0.02em]">
            {productTitle}
          </h3>
          <p className="mt-1 text-[0.72rem] text-muted-foreground">
            Size: {formatSizeCode(sizeLengthCode, sizeWidthCode)}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius)] border border-border bg-background text-[0.72rem] font-semibold text-foreground/70 disabled:cursor-not-allowed disabled:opacity-45"
              onClick={onDecreaseQuantity}
              disabled={quantity <= 1 || isActionPending || !hasItemId}
              aria-label={`Decrease quantity for ${productTitle}`}
            >
              -
            </button>
            <span className="w-8 text-center text-[0.78rem] font-medium">
              {isUpdating ? "..." : quantity}
            </span>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius)] border border-border bg-background text-[0.72rem] font-semibold text-foreground/70 disabled:cursor-not-allowed disabled:opacity-45"
              onClick={onIncreaseQuantity}
              disabled={isActionPending || !hasItemId}
              aria-label={`Increase quantity for ${productTitle}`}
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRemove}
              disabled={isActionPending || !hasItemId}
              className="inline-flex items-center gap-1 text-[0.72rem] font-medium tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-destructive disabled:cursor-not-allowed disabled:opacity-45"
            >
              <RiDeleteBinLine className="size-4" />
              Remove
            </button>
            <p className="font-heading text-[1rem] font-medium tracking-[-0.04em] sm:text-[1.08rem]">
              {formatCurrency(lineSubtotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
