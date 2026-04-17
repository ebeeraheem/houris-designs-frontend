import Image from "next/image"
import { formatSizeCode } from "@/utils/size-codes"

interface CartItemProps {
  id: string
  productId: string
  productTitle: string
  colourLabel: string
  sizeLengthCode: string
  sizeWidthCode: number
  quantity: number
  lineSubtotal: number
  productImage: string
}

export function CartItem({
  productTitle,
  colourLabel,
  sizeLengthCode,
  sizeWidthCode,
  quantity,
  lineSubtotal,
  productImage,
}: CartItemProps) {
  return (
    <div className="surface-card flex gap-4 p-4 sm:p-6">
      <div className="image-shell h-24 w-24 shrink-0 sm:h-28 sm:w-28">
        <div className="relative h-full w-full">
          <Image
            src={productImage}
            alt={productTitle}
            fill
            sizes="112px"
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
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-[calc(var(--radius))] border border-border bg-background text-[0.72rem] font-semibold text-foreground/70">
              -
            </button>
            <span className="w-8 text-center text-[0.78rem] font-medium">
              {quantity}
            </span>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-[calc(var(--radius))] border border-border bg-background text-[0.72rem] font-semibold text-foreground/70">
              +
            </button>
          </div>
          <p className="text-[0.82rem] font-medium">${lineSubtotal}</p>
        </div>
      </div>
    </div>
  )
}
