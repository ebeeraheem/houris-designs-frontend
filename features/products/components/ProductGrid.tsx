import Image from "next/image"
import Link from "next/link"

import { EmptyCollectionIcon } from "@/components/icons"
import { EmptyState } from "@/components/ui/empty-state"
import { formatCurrency } from "@/utils/format-currency"
import { PRODUCT_ROUTES } from "../product.constants"
import type { ProductListItem } from "../product.types"

interface ProductGridProps {
  products: ProductListItem[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="surface-panel p-6 text-center sm:p-8 sm:px-10">
        <EmptyState
          icon={<EmptyCollectionIcon className="size-7" aria-hidden="true" />}
          title="No pieces found"
          description="Try widening or resetting the filters."
        />
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
      {products.map((product) => (
        <Link
          key={product.id}
          href={PRODUCT_ROUTES.DETAIL(product.id)}
          className="group block lg:col-span-4"
        >
          <div className="image-shell">
            <div className="relative h-[22rem] sm:h-[26rem] lg:h-[30rem]">
              <Image
                src={
                  product.primaryImageUrl ||
                  "/images/editorial/boutique-rack.jpg"
                }
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              <div className="absolute right-4 bottom-4 left-4 flex items-center gap-3">
                <span className="status-pill border-background/30 bg-background/78 text-foreground backdrop-blur-sm">
                  View Product
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-1.5 pt-4">
            <p className="eyebrow-label text-brand">Houris Couture</p>
            <h3 className="font-heading text-[1.1rem] font-medium tracking-[-0.03em] uppercase">
              {product.title}
            </h3>
            <p className="font-heading text-[1rem] font-medium tracking-[-0.04em] text-foreground/82 sm:text-[1.08rem]">
              {formatCurrency(product.price)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
