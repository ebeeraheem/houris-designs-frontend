import Image from "next/image"
import { colourSwatches } from "../demo-products"

interface Product {
  id: number
  title: string
  price: number
  colour: string
  image: string
  alt: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
      {products.map((product) => (
        <a
          key={product.id}
          href={`/collection/${product.id}`}
          className="group lg:col-span-4"
        >
          <div className="image-shell">
            <div className="relative h-[22rem] sm:h-[26rem] lg:h-[30rem]">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-foreground/18 via-transparent to-transparent" /> */}
              <div className="absolute right-4 bottom-4 left-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span
                  className={`size-3 rounded-full border border-foreground/10 ${colourSwatches[product.colour] ?? "bg-muted"}`}
                />
                <span className="text-[0.68rem] font-medium tracking-[0.18em] text-foreground/80 uppercase">
                  {product.colour}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-1.5 pt-4">
            <p className="eyebrow-label text-brand">{product.colour}</p>
            <h3 className="font-heading text-[1.1rem] font-medium tracking-[-0.03em] uppercase">
              {product.title}
            </h3>
            <p className="text-[0.82rem] font-medium tracking-[0.04em] text-muted-foreground">
              ${product.price}
            </p>
          </div>
        </a>
      ))}
    </div>
  )
}
