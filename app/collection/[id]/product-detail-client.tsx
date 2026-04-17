"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  RiArrowLeftLine,
  RiTruckLine,
  RiRefreshLine,
  RiShieldCheckLine,
  RiCloseLine,
  RiRulerLine,
} from "@remixicon/react"
import { PageReveal } from "@/components/page-reveal"
import { Button } from "@/components/ui/button"
import {
  type DemoProduct,
  getRelatedDemoProducts,
} from "@/features/products/demo-products"
import { formatSizeCode } from "@/utils/size-codes"

interface ProductDetailClientProps {
  product: DemoProduct
}

const lengthCodes = [
  { code: "A", fullLength: 52, fullSleeve: 20 },
  { code: "B", fullLength: 54, fullSleeve: 21 },
  { code: "C", fullLength: 56, fullSleeve: 22 },
  { code: "D", fullLength: 58, fullSleeve: 23 },
  { code: "E", fullLength: 60, fullSleeve: 24 },
  { code: "F", fullLength: 62, fullSleeve: 24 },
  { code: "G", fullLength: 64, fullSleeve: 25 },
  { code: "H", fullLength: 66, fullSleeve: 26 },
]

const widthCodes = [
  {
    code: 6,
    bustMin: 31,
    bustMax: 32,
    waistMin: 24,
    waistMax: 25,
    hipsMin: 35,
    hipsMax: 36,
  },
  {
    code: 8,
    bustMin: 32,
    bustMax: 33,
    waistMin: 26,
    waistMax: 27,
    hipsMin: 37,
    hipsMax: 38,
  },
  {
    code: 10,
    bustMin: 34,
    bustMax: 35,
    waistMin: 28,
    waistMax: 29,
    hipsMin: 39,
    hipsMax: 40,
  },
  {
    code: 12,
    bustMin: 35,
    bustMax: 36,
    waistMin: 30,
    waistMax: 31,
    hipsMin: 41,
    hipsMax: 42,
  },
  {
    code: 14,
    bustMin: 36,
    bustMax: 37,
    waistMin: 32,
    waistMax: 33,
    hipsMin: 43,
    hipsMax: 44,
  },
  {
    code: 16,
    bustMin: 37,
    bustMax: 38,
    waistMin: 34,
    waistMax: 35,
    hipsMin: 45,
    hipsMax: 46,
  },
  {
    code: 18,
    bustMin: 39,
    bustMax: 40,
    waistMin: 36,
    waistMax: 37,
    hipsMin: 47,
    hipsMax: 48,
  },
  {
    code: 20,
    bustMin: 40,
    bustMax: 41,
    waistMin: 38,
    waistMax: 39,
    hipsMin: 49,
    hipsMax: 50,
  },
  {
    code: 22,
    bustMin: 42,
    bustMax: 43,
    waistMin: 40,
    waistMax: 41,
    hipsMin: 51,
    hipsMax: 52,
  },
  {
    code: 24,
    bustMin: 44,
    bustMax: 45,
    waistMin: 42,
    waistMax: 43,
    hipsMin: 53,
    hipsMax: 54,
  },
]

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const initialSwatch =
    product.availableColours.find(
      (colour) => colour.label === product.colour
    ) ?? product.availableColours[0]
  const [selectedSwatchId, setSelectedSwatchId] = useState(
    initialSwatch?.id ?? ""
  )
  const [selectedColourLabel, setSelectedColourLabel] = useState(
    initialSwatch?.label ?? product.colour
  )
  const [selectedLengthCode, setSelectedLengthCode] = useState<string | null>(
    null
  )
  const [selectedWidthCode, setSelectedWidthCode] = useState<number | null>(
    null
  )
  const [mainImage, setMainImage] = useState(0)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  const selectedSize = formatSizeCode(selectedLengthCode, selectedWidthCode)
  const isSelectionComplete = Boolean(
    selectedSwatchId && selectedLengthCode && selectedWidthCode
  )

  useEffect(() => {
    if (isSizeGuideOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isSizeGuideOpen])

  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-background">
      <PageReveal className="page-shell">
        <div data-page-intro className="border-b border-border/50 py-4">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <RiArrowLeftLine className="size-4" />
            Back to Collection
          </Link>
        </div>

        <div data-page-section className="py-8 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
            <div data-page-media className="lg:col-span-7">
              <div className="grid gap-4 lg:grid-cols-[5rem_1fr]">
                <div className="order-2 flex gap-2 lg:order-1 lg:flex-col">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(index)}
                      className={`image-shell h-16 w-16 shrink-0 overflow-hidden transition-all lg:h-14 lg:w-14 ${
                        mainImage === index
                          ? "ring-1 ring-brand"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
                <div className="order-1 lg:order-2">
                  <div className="image-shell relative aspect-[4/5] overflow-hidden">
                    <Image
                      key={product.images[mainImage].src}
                      src={product.images[mainImage].src}
                      alt={product.images[mainImage].alt}
                      fill
                      sizes="(min-width: 1024px) 48vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/14 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="eyebrow-label bg-background/80 px-2 py-1 backdrop-blur-sm">
                        {selectedColourLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="eyebrow-label bg-background/80 px-2 py-1 backdrop-blur-sm">
                        {mainImage + 1} / {product.images.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:py-4">
              <div className="sticky top-24">
                <p className="eyebrow-label text-brand">{product.category}</p>
                <h1 className="mt-2 font-heading text-[1.8rem] leading-[0.95] font-medium tracking-[-0.05em] uppercase sm:text-[2.2rem]">
                  {product.title}
                </h1>
                <p className="mt-3 text-[1.1rem] font-medium tracking-[0.04em] text-foreground">
                  ${product.price}
                </p>

                <div className="mt-6 space-y-4 border-t border-border/50 pt-6">
                  <p className="text-sm leading-7 text-muted-foreground">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="field-label">Colour</p>
                      <span className="text-[0.72rem] font-medium text-foreground">
                        {selectedColourLabel}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.availableColours.map((colour) => (
                        <button
                          key={colour.id}
                          onClick={() => {
                            setSelectedSwatchId(colour.id)
                            setSelectedColourLabel(colour.label)
                          }}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.68rem] font-medium tracking-[0.14em] uppercase transition-all ${
                            selectedSwatchId === colour.id
                              ? "border-brand bg-brand/10 text-brand"
                              : "border-border bg-background hover:border-brand/50"
                          }`}
                        >
                          <span
                            className={`size-3 rounded-full border border-foreground/10 ${colour.swatchClass}`}
                          />
                          {colour.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="field-label">Length Code</p>
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="inline-flex items-center gap-1 text-[0.72rem] font-medium text-brand hover:underline"
                      >
                        <RiRulerLine className="size-3.5" />
                        Size Guide
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {lengthCodes.map((length) => (
                        <button
                          key={length.code}
                          onClick={() => setSelectedLengthCode(length.code)}
                          className={`h-11 rounded-[calc(var(--radius))] border text-[0.72rem] font-semibold tracking-[0.08em] transition-all ${
                            selectedLengthCode === length.code
                              ? "border-brand bg-brand/10 text-brand"
                              : "border-border bg-background text-foreground/70 hover:border-foreground/35"
                          }`}
                        >
                          {length.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="field-label">Width Code</p>
                        <span className="text-[0.72rem] font-medium text-foreground">
                          {selectedWidthCode ?? "Select"}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                        {widthCodes.map((width) => (
                          <button
                            key={width.code}
                            onClick={() => setSelectedWidthCode(width.code)}
                            className={`h-11 rounded-[calc(var(--radius))] border text-[0.72rem] font-semibold tracking-[0.08em] transition-all ${
                              selectedWidthCode === width.code
                                ? "border-brand bg-brand/10 text-brand"
                                : "border-border bg-background text-foreground/70 hover:border-foreground/35"
                            }`}
                          >
                            {width.code}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 rounded-[calc(var(--radius)+2px)] border border-border/70 bg-secondary/55 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="field-label">Selected Size</p>
                          <p className="mt-2 font-heading text-[1rem] font-medium tracking-[-0.02em]">
                            {selectedSize}
                          </p>
                        </div>
                        <p className="max-w-[14rem] text-right text-[0.72rem] leading-5 text-muted-foreground">
                          The API now expects separate length and width codes
                          plus a swatch selection.
                        </p>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="mt-4 w-full"
                      disabled={!isSelectionComplete}
                    >
                      {isSelectionComplete
                        ? "Add to Cart"
                        : "Select Length and Width"}
                    </Button>
                    {!isSelectionComplete && (
                      <p className="mt-2 text-center text-[0.68rem] text-muted-foreground">
                        Choose a swatch, one length code, and one width code to
                        continue
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 grid gap-3 border-t border-border/50 pt-6">
                  <div className="flex items-start gap-3 text-[0.78rem]">
                    <RiTruckLine className="mt-0.5 size-4 shrink-0 text-brand" />
                    <div>
                      <p className="font-medium">Made to Order</p>
                      <p className="text-muted-foreground">
                        Ships in 2-3 weeks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-[0.78rem]">
                    <RiRefreshLine className="mt-0.5 size-4 shrink-0 text-brand" />
                    <div>
                      <p className="font-medium">Free Returns</p>
                      <p className="text-muted-foreground">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-[0.78rem]">
                    <RiShieldCheckLine className="mt-0.5 size-4 shrink-0 text-brand" />
                    <div>
                      <p className="font-medium">Secure Payment</p>
                      <p className="text-muted-foreground">
                        Encrypted transactions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-border/50 pt-6">
                  <p className="eyebrow-label mb-3 text-brand">Details</p>
                  <dl className="grid grid-cols-2 gap-3 text-[0.78rem]">
                    <div>
                      <dt className="text-muted-foreground">Material</dt>
                      <dd className="mt-0.5 font-medium">{product.material}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Fit</dt>
                      <dd className="mt-0.5 font-medium">{product.fit}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Care</dt>
                      <dd className="mt-0.5 font-medium">{product.care}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Origin</dt>
                      <dd className="mt-0.5 font-medium">{product.origin}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-page-section
          className="border-t border-border/50 py-12 sm:py-16"
        >
          <p className="eyebrow-label mb-6 text-brand">You May Also Like</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {getRelatedDemoProducts(String(product.id)).map((item) => (
              <Link
                key={item.id}
                href={`/collection/${item.id}`}
                className="group"
              >
                <div className="image-shell aspect-[3/4] overflow-hidden">
                  <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/14 via-transparent to-transparent" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="eyebrow-label text-brand">{item.colour}</p>
                  <h3 className="mt-1 font-heading text-[0.95rem] font-medium tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[0.78rem] font-medium text-muted-foreground">
                    ${item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Size Guide Modal */}
        {isSizeGuideOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsSizeGuideOpen(false)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <div
              className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border bg-background shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <p className="eyebrow-label text-brand">Precision Fit</p>
                  <h2 className="font-heading text-[1.2rem] font-medium tracking-[-0.02em] uppercase sm:text-[1.4rem]">
                    Size Guide
                  </h2>
                </div>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="inline-flex items-center justify-center rounded-[calc(var(--radius))] p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Close size guide"
                >
                  <RiCloseLine className="size-5" />
                </button>
              </div>

              <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
                <p className="mb-6 text-[0.85rem] leading-6 text-muted-foreground">
                  Our two-dimensional sizing system combines length and width
                  codes for a precise fit. Choose one from each dimension — the
                  result is your size (e.g., E16 = Length E + Width 16).
                </p>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="surface-card p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="eyebrow-label text-brand">Length</span>
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="pr-3 pb-2 text-[0.65rem] font-medium tracking-[0.16em] text-foreground/60 uppercase">
                              Code
                            </th>
                            <th className="pr-3 pb-2 text-[0.65rem] font-medium tracking-[0.16em] text-foreground/60 uppercase">
                              Full Length
                            </th>
                            <th className="pb-2 text-[0.65rem] font-medium tracking-[0.16em] text-foreground/60 uppercase">
                              Full Sleeve
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {lengthCodes.map((row) => (
                            <tr
                              key={row.code}
                              className="border-b border-border/50"
                            >
                              <td className="py-2.5 pr-3 text-[0.75rem] font-semibold tracking-[0.06em]">
                                {row.code}
                              </td>
                              <td className="py-2.5 pr-3 text-[0.75rem] text-muted-foreground">
                                {row.fullLength}&quot;
                              </td>
                              <td className="py-2.5 text-[0.75rem] text-muted-foreground">
                                {row.fullSleeve}&quot;
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="surface-card p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="eyebrow-label text-brand">Width</span>
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="pr-2 pb-2 text-[0.65rem] font-medium tracking-[0.16em] text-foreground/60 uppercase">
                              Code
                            </th>
                            <th className="pr-2 pb-2 text-[0.65rem] font-medium tracking-[0.16em] text-foreground/60 uppercase">
                              Bust
                            </th>
                            <th className="pr-2 pb-2 text-[0.65rem] font-medium tracking-[0.16em] text-foreground/60 uppercase">
                              Waist
                            </th>
                            <th className="pb-2 text-[0.65rem] font-medium tracking-[0.16em] text-foreground/60 uppercase">
                              Hips
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {widthCodes.map((row) => (
                            <tr
                              key={row.code}
                              className="border-b border-border/50"
                            >
                              <td className="py-2 pr-2 text-[0.75rem] font-semibold tracking-[0.06em]">
                                {row.code}
                              </td>
                              <td className="py-2 pr-2 text-[0.75rem] text-muted-foreground">
                                {row.bustMin}-{row.bustMax}&quot;
                              </td>
                              <td className="py-2 pr-2 text-[0.75rem] text-muted-foreground">
                                {row.waistMin}-{row.waistMax}&quot;
                              </td>
                              <td className="py-2 text-[0.75rem] text-muted-foreground">
                                {row.hipsMin}-{row.hipsMax}&quot;
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="surface-card mt-6 p-5">
                  <p className="eyebrow-label mb-4 text-brand">
                    How to Measure
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="font-heading text-[0.9rem] font-medium tracking-[-0.02em]">
                        Full Length
                      </p>
                      <p className="mt-1 text-[0.75rem] leading-5 text-muted-foreground">
                        Measure from the highest point of the shoulder to the
                        desired hem length.
                      </p>
                    </div>
                    <div>
                      <p className="font-heading text-[0.9rem] font-medium tracking-[-0.02em]">
                        Full Sleeve
                      </p>
                      <p className="mt-1 text-[0.75rem] leading-5 text-muted-foreground">
                        Measure from the shoulder seam to the wrist bone with
                        arm slightly bent.
                      </p>
                    </div>
                    <div>
                      <p className="font-heading text-[0.9rem] font-medium tracking-[-0.02em]">
                        Bust
                      </p>
                      <p className="mt-1 text-[0.75rem] leading-5 text-muted-foreground">
                        Measure around the fullest part of the bust, keeping the
                        tape level.
                      </p>
                    </div>
                    <div>
                      <p className="font-heading text-[0.9rem] font-medium tracking-[-0.02em]">
                        Waist / Hips
                      </p>
                      <p className="mt-1 text-[0.75rem] leading-5 text-muted-foreground">
                        Measure at the natural waist and fullest part of the
                        hips.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageReveal>
    </main>
  )
}
