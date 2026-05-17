"use client"

import { useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import {
  RiCloseLine,
  RiRulerLine,
  RiShieldCheckLine,
  RiTruckLine,
} from "@remixicon/react"
import toast from "react-hot-toast"

import { EmptyOptionsIcon } from "@/components/icons"
import { PageReveal } from "@/components/page-reveal"
import { BackIconLink } from "@/components/ui/back-icon-link"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { useAddCartItem } from "@/features/cart"
import { PRODUCT_ROUTES, useGetProductById } from "@/features/products"
import { SizeGuideContent, useGetSizeGuide } from "@/features/sizes"
import { formatCurrency } from "@/utils/format-currency"
import { formatSizeCode } from "@/utils/size-codes"

interface ProductDetailClientProps {
  productId: string
}

gsap.registerPlugin(useGSAP)

const DETAIL_TILT_MAX_X = 10
const DETAIL_TILT_MAX_Y = 12
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function ProductDetailSkeleton() {
  return (
    <div data-page-section className="py-8 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <div className="grid gap-4 lg:grid-cols-[5rem_1fr]">
            <div className="order-2 flex gap-2 lg:order-1 lg:flex-col">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`detail-thumb-skeleton-${index}`}
                  className="image-shell h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius)] bg-secondary/60 lg:h-14 lg:w-14"
                />
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <div className="image-shell relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-secondary/60" />
            </div>
          </div>
        </div>

        <section className="lg:col-span-5 lg:py-4">
          <div className="space-y-6">
            <div>
              <div className="h-3 w-32 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
              <div className="mt-3 h-9 w-4/5 animate-pulse rounded-[var(--radius)] bg-secondary/60 sm:h-10" />
              <div className="mt-2 h-9 w-3/5 animate-pulse rounded-[var(--radius)] bg-secondary/60 sm:h-10" />
              <div className="mt-4 h-6 w-28 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
            </div>

            <div className="border-t border-border/50 pt-6">
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                <div className="h-4 w-[92%] animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                <div className="h-4 w-[78%] animate-pulse rounded-[var(--radius)] bg-secondary/60" />
              </div>
            </div>

            <div className="border-t border-border/50 pt-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-3 w-16 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                <div className="h-4 w-24 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`colour-skeleton-${index}`}
                    className="h-10 w-28 animate-pulse rounded-full bg-secondary/60"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6 border-t border-border/50 pt-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="h-3 w-24 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                  <div className="h-4 w-20 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                </div>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={`length-grid-skeleton-${index}`}
                      className="h-11 animate-pulse rounded-[var(--radius)] border border-border bg-secondary/50"
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="h-3 w-24 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                  <div className="h-4 w-16 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                </div>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={`width-grid-skeleton-${index}`}
                      className="h-11 animate-pulse rounded-[var(--radius)] border border-border bg-secondary/50"
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-[var(--radius)] border border-border/70 bg-secondary/55 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="h-3 w-24 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                    <div className="mt-3 h-5 w-20 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                  </div>
                  <div className="w-32 space-y-2">
                    <div className="h-3 w-full animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                    <div className="h-3 w-5/6 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                  </div>
                </div>
              </div>

              <div className="h-12 w-full animate-pulse rounded-[var(--radius)] bg-secondary/60" />
            </div>

            <div className="grid gap-3 border-t border-border/50 pt-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={`service-note-skeleton-${index}`}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 h-4 w-4 animate-pulse rounded-full bg-secondary/60" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-28 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                    <div className="h-4 w-36 animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductById(productId)
  const {
    data: sizeGuide,
    isLoading: isSizeGuideLoading,
    isError: hasSizeGuideError,
    refetch: refetchSizeGuide,
  } = useGetSizeGuide()
  const addCartItem = useAddCartItem()
  const [mainImage, setMainImage] = useState(0)
  const [selectedColourLabel, setSelectedColourLabel] = useState<string | null>(
    null
  )
  const [selectedLengthCode, setSelectedLengthCode] = useState<string | null>(
    null
  )
  const [selectedWidthCode, setSelectedWidthCode] = useState<number | null>(
    null
  )
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const mediaTiltShellRef = useRef<HTMLDivElement>(null)
  const mediaTiltCardRef = useRef<HTMLDivElement>(null)
  const mediaImageLayerRef = useRef<HTMLDivElement>(null)
  const mediaGlowRef = useRef<HTMLDivElement>(null)
  const mediaTopBadgeRef = useRef<HTMLDivElement>(null)
  const mediaBottomBadgeRef = useRef<HTMLDivElement>(null)

  const images = useMemo(() => {
    if (!product) {
      return []
    }

    return [product.primaryImageUrl, ...product.galleryImageUrls]
      .filter(Boolean)
      .map((src, index) => ({
        src,
        alt:
          index === 0
            ? product.title
            : `${product.title} gallery image ${index + 1}`,
      }))
  }, [product])

  const selectedColour =
    product?.availableColours.find(
      (colour) => colour.label === selectedColourLabel
    ) ??
    product?.availableColours[0] ??
    null
  const hasValidSelectedSwatchId = Boolean(
    selectedColour?.id && UUID_PATTERN.test(selectedColour.id)
  )
  const lengthCodes = sizeGuide?.lengths ?? []
  const widthCodes = sizeGuide?.widths ?? []
  const hasSizeOptions = lengthCodes.length > 0 && widthCodes.length > 0
  const selectedSize = formatSizeCode(selectedLengthCode, selectedWidthCode)
  const isSelectionComplete = Boolean(
    product &&
    selectedColour &&
    hasValidSelectedSwatchId &&
    selectedLengthCode &&
    selectedWidthCode &&
    hasSizeOptions
  )

  useGSAP(
    () => {
      const shell = mediaTiltShellRef.current
      const card = mediaTiltCardRef.current
      const imageLayer = mediaImageLayerRef.current
      const glow = mediaGlowRef.current
      const topBadge = mediaTopBadgeRef.current
      const bottomBadge = mediaBottomBadgeRef.current

      if (!shell || !card || !imageLayer || !glow || !topBadge || !bottomBadge) {
        return
      }

      const canTilt =
        window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches

      gsap.set(card, {
        clearProps: "transform",
        transformPerspective: 1800,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      })
      gsap.set(imageLayer, {
        clearProps: "transform",
        z: 24,
        transformOrigin: "center center",
      })
      gsap.set(glow, {
        clearProps: "transform",
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        z: 44,
      })
      gsap.set([topBadge, bottomBadge], {
        clearProps: "transform",
        z: 54,
      })

      if (!canTilt) {
        return
      }

      const rotateXTo = gsap.quickTo(card, "rotationX", {
        duration: 0.45,
        ease: "power3.out",
      })
      const rotateYTo = gsap.quickTo(card, "rotationY", {
        duration: 0.45,
        ease: "power3.out",
      })
      const scaleTo = gsap.quickTo(card, "scale", {
        duration: 0.45,
        ease: "power3.out",
      })
      const imageScaleTo = gsap.quickTo(imageLayer, "scale", {
        duration: 0.55,
        ease: "power3.out",
      })
      const glowXTo = gsap.quickTo(glow, "x", {
        duration: 0.45,
        ease: "power3.out",
      })
      const glowYTo = gsap.quickTo(glow, "y", {
        duration: 0.45,
        ease: "power3.out",
      })
      const glowOpacityTo = gsap.quickTo(glow, "opacity", {
        duration: 0.35,
        ease: "power2.out",
      })

      const centerGlow = () => {
        glowXTo(shell.clientWidth / 2)
        glowYTo(shell.clientHeight / 2)
      }

      const handleEnter = () => {
        scaleTo(1.015)
        imageScaleTo(1.04)
        glowOpacityTo(1)
        centerGlow()
      }

      const handleMove = (event: MouseEvent) => {
        const bounds = shell.getBoundingClientRect()
        const progressX = (event.clientX - bounds.left) / bounds.width
        const progressY = (event.clientY - bounds.top) / bounds.height

        rotateYTo((progressX - 0.5) * DETAIL_TILT_MAX_Y)
        rotateXTo((0.5 - progressY) * DETAIL_TILT_MAX_X)
        glowXTo(event.clientX - bounds.left)
        glowYTo(event.clientY - bounds.top)
      }

      const handleLeave = () => {
        rotateXTo(0)
        rotateYTo(0)
        scaleTo(1)
        imageScaleTo(1)
        glowOpacityTo(0)
        centerGlow()
      }

      centerGlow()
      shell.addEventListener("mouseenter", handleEnter)
      shell.addEventListener("mousemove", handleMove)
      shell.addEventListener("mouseleave", handleLeave)

      return () => {
        shell.removeEventListener("mouseenter", handleEnter)
        shell.removeEventListener("mousemove", handleMove)
        shell.removeEventListener("mouseleave", handleLeave)
      }
    },
    {
      dependencies: [product?.id, mainImage],
      revertOnUpdate: true,
    }
  )

  const handleAddToCart = async () => {
    const swatchId = selectedColour?.id

    if (
      !product ||
      !selectedColour ||
      !swatchId ||
      !hasValidSelectedSwatchId ||
      !selectedLengthCode ||
      !selectedWidthCode
    ) {
      toast.error(
        hasValidSelectedSwatchId
          ? "Choose a colour, length, and width before adding to cart."
          : "This colour is missing a valid swatch ID from the API."
      )
      return
    }

    try {
      await addCartItem.mutateAsync({
        productId: product.id,
        swatchId,
        sizeLengthCode: selectedLengthCode,
        sizeWidthCode: selectedWidthCode,
        quantity: 1,
      })
      toast.success("Added to cart.")
    } catch {
      toast.error("We couldn't add this piece to cart. Please try again.")
    }
  }

  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-background">
      <PageReveal className="page-shell">
        <div data-page-intro className="border-b border-border/50 py-4">
          <BackIconLink
            href={PRODUCT_ROUTES.LIST}
            label="Back to collection"
          />
        </div>

        {isLoading && <ProductDetailSkeleton />}

        {(isError || (!isLoading && !product)) && (
          <div data-page-section className="py-8 sm:py-12">
            <div className="surface-card p-6 sm:p-8">
              <p className="eyebrow-label text-brand">Product Detail</p>
              <h1 className="mt-3 font-heading text-[1.6rem] leading-none tracking-[-0.04em] uppercase">
                Product not found.
              </h1>
              <p className="mt-3 max-w-[34rem] text-sm leading-7 text-muted-foreground">
                We couldn&apos;t load this published product from the API.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-5"
                onClick={() => {
                  void refetch()
                }}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {product && (
          <div data-page-section className="py-8 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
              <div data-page-media className="lg:col-span-7">
                <div className="grid gap-4 lg:grid-cols-[5rem_1fr]">
                  <div className="order-2 flex gap-2 lg:order-1 lg:flex-col">
                    {images.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setMainImage(index)}
                        className={`image-shell h-16 w-16 shrink-0 overflow-hidden transition-all lg:h-14 lg:w-14 ${
                          mainImage === index
                            ? "ring-1 ring-brand"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <div className="relative h-full w-full">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="64px"
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="order-1 lg:order-2" style={{ perspective: "1800px" }}>
                    <div ref={mediaTiltShellRef}>
                      <div
                        ref={mediaTiltCardRef}
                        className="image-shell relative aspect-[4/5] overflow-hidden shadow-panel"
                      >
                        <div ref={mediaImageLayerRef} className="absolute inset-0">
                          {images[mainImage] ? (
                            <Image
                              key={images[mainImage].src}
                              src={images[mainImage].src}
                              alt={images[mainImage].alt}
                              fill
                              sizes="(min-width: 1024px) 48vw, 100vw"
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <Image
                              src="/images/editorial/boutique-rack.jpg"
                              alt={product.title}
                              fill
                              sizes="(min-width: 1024px) 48vw, 100vw"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div
                          ref={mediaGlowRef}
                          aria-hidden="true"
                          className="pointer-events-none absolute top-0 left-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.16)_28%,transparent_72%)] blur-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/14 via-transparent to-transparent" />
                        <div ref={mediaTopBadgeRef} className="absolute top-4 left-4">
                          <span className="eyebrow-label bg-background/80 px-2 py-1 backdrop-blur-sm">
                            {selectedColour?.label ?? "Houris Collection"}
                          </span>
                        </div>
                        <div
                          ref={mediaBottomBadgeRef}
                          className="absolute bottom-4 left-4"
                        >
                          <span className="eyebrow-label bg-background/80 px-2 py-1 backdrop-blur-sm">
                            {images.length > 0
                              ? `${mainImage + 1} / ${images.length}`
                              : "1 / 1"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section className="lg:col-span-5 lg:py-4">
                <div className="sticky top-24">
                  <p className="eyebrow-label text-brand">Houris Collection</p>
                  <h1 className="mt-2 font-heading text-[1.8rem] leading-[0.95] font-medium tracking-[-0.05em] uppercase sm:text-[2.2rem]">
                    {product.title}
                  </h1>
                  <p className="mt-4 font-heading text-[1.45rem] font-medium tracking-[-0.05em] text-foreground sm:text-[1.6rem]">
                    {formatCurrency(product.price)}
                  </p>

                  {product.description && (
                    <div className="mt-6 border-t border-border/50 pt-6">
                      <p className="text-sm leading-7 text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 border-t border-border/50 pt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="field-label">Colour</p>
                      <span className="text-[0.72rem] font-medium text-foreground">
                        {selectedColour?.label ?? "Unavailable"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.availableColours.length === 0 && (
                        <div className="w-full rounded-[var(--radius)] border border-dashed border-border/55 bg-secondary/30 p-6">
                          <EmptyState
                            icon={<EmptyOptionsIcon className="size-7" aria-hidden="true" />}
                            title="No colours available"
                            description="This product was returned without any colour options yet."
                          />
                        </div>
                      )}
                      {product.availableColours.map((colour) => (
                        <button
                          key={colour.id ?? colour.label}
                          type="button"
                          onClick={() => setSelectedColourLabel(colour.label)}
                          className={`inline-flex items-center gap-2 rounded-[var(--radius)] border px-4 py-2 text-[0.68rem] font-medium tracking-[0.14em] uppercase transition-all ${
                            selectedColour?.label === colour.label
                              ? "border-brand bg-brand/10 text-brand"
                              : "border-border bg-background hover:border-brand/50"
                          }`}
                        >
                          <span className="relative size-4 overflow-hidden rounded-full border border-foreground/10 bg-secondary">
                            {colour.swatchImageUrl && (
                              <Image
                                src={colour.swatchImageUrl}
                                alt=""
                                fill
                                sizes="16px"
                                unoptimized
                                className="object-cover"
                              />
                            )}
                          </span>
                          {colour.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-6 border-t border-border/50 pt-6">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="field-label">Length Code</p>
                        <button
                          type="button"
                          onClick={() => setIsSizeGuideOpen(true)}
                          className="inline-flex items-center gap-1 text-[0.72rem] font-medium text-brand hover:underline"
                        >
                          <RiRulerLine className="size-3.5" />
                          Size Guide
                        </button>
                      </div>
                      {hasSizeGuideError && (
                        <div className="mb-3 rounded-[var(--radius)] border border-destructive/20 bg-destructive/8 p-3">
                          <p className="text-[0.74rem] leading-6 text-destructive">
                            We couldn&apos;t load the live size codes.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              void refetchSizeGuide()
                            }}
                            className="mt-2 text-[0.72rem] font-medium text-destructive hover:underline"
                          >
                            Try again
                          </button>
                        </div>
                      )}
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                        {isSizeGuideLoading &&
                          Array.from({ length: 8 }).map((_, index) => (
                            <div
                              key={`length-skeleton-${index}`}
                              className="h-11 animate-pulse rounded-[var(--radius)] border border-border bg-secondary/50"
                            />
                          ))}
                        {!isSizeGuideLoading &&
                          lengthCodes.map((length) => (
                            <button
                              key={length.code}
                              type="button"
                              onClick={() => setSelectedLengthCode(length.code)}
                              className={`h-11 rounded-[var(--radius)] border text-[0.72rem] font-semibold tracking-[0.08em] transition-all ${
                                selectedLengthCode === length.code
                                  ? "border-brand bg-brand/10 text-brand"
                                  : "border-border bg-background text-foreground/70 hover:border-foreground/35"
                              }`}
                              disabled={!hasSizeOptions}
                            >
                              {length.code}
                            </button>
                          ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="field-label">Width Code</p>
                        <span className="text-[0.72rem] font-medium text-foreground">
                          {selectedWidthCode ?? "Select"}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                        {isSizeGuideLoading &&
                          Array.from({ length: 10 }).map((_, index) => (
                            <div
                              key={`width-skeleton-${index}`}
                              className="h-11 animate-pulse rounded-[var(--radius)] border border-border bg-secondary/50"
                            />
                          ))}
                        {!isSizeGuideLoading &&
                          widthCodes.map((width) => (
                            <button
                              key={width.code}
                              type="button"
                              onClick={() => setSelectedWidthCode(width.code)}
                              className={`h-11 rounded-[var(--radius)] border text-[0.72rem] font-semibold tracking-[0.08em] transition-all ${
                                selectedWidthCode === width.code
                                  ? "border-brand bg-brand/10 text-brand"
                                  : "border-border bg-background text-foreground/70 hover:border-foreground/35"
                              }`}
                              disabled={!hasSizeOptions}
                            >
                              {width.code}
                            </button>
                          ))}
                      </div>
                    </div>

                    <div className="rounded-[var(--radius)] border border-border/70 bg-secondary/55 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="field-label">Selected Size</p>
                          <p className="mt-2 font-heading text-[1rem] font-medium tracking-[-0.02em]">
                            {selectedSize}
                          </p>
                        </div>
                        <p className="max-w-[14rem] text-right text-[0.72rem] leading-5 text-muted-foreground">
                          Choose one length and one width code for this piece.
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      className="w-full"
                      disabled={!isSelectionComplete || addCartItem.isPending}
                      onClick={() => {
                        void handleAddToCart()
                      }}
                    >
                      {addCartItem.isPending
                        ? "Adding..."
                        : isSizeGuideLoading
                          ? "Loading Size Codes..."
                          : isSelectionComplete
                            ? "Add to Cart"
                            : selectedColour && !hasValidSelectedSwatchId
                              ? "Unavailable Swatch"
                            : "Select Length and Width"}
                    </Button>
                    {!isSelectionComplete && (
                      <p className="text-center text-[0.68rem] text-muted-foreground">
                        {selectedColour && !hasValidSelectedSwatchId
                          ? "This selected colour cannot be added yet because the API did not return a valid swatch ID."
                          : hasSizeGuideError
                          ? "Reconnect to the size guide to choose length and width codes."
                          : "Choose a colour, one length code, and one width code to continue."}
                      </p>
                    )}
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
                      <RiShieldCheckLine className="mt-0.5 size-4 shrink-0 text-brand" />
                      <div>
                        <p className="font-medium">Secure Payment</p>
                        <p className="text-muted-foreground">
                          Encrypted transactions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {isSizeGuideOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsSizeGuideOpen(false)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <div
              className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[var(--radius)] border border-border bg-background shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <p className="eyebrow-label text-brand">Precision Fit</p>
                  <h2 className="font-heading text-[1.2rem] font-medium tracking-[-0.02em] uppercase sm:text-[1.4rem]">
                    Size Guide
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="inline-flex items-center justify-center rounded-[var(--radius)] p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Close size guide"
                >
                  <RiCloseLine className="size-5" />
                </button>
              </div>

              <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
                <p className="mb-6 text-[0.85rem] leading-6 text-muted-foreground">
                  Our two-dimensional sizing system combines length and width
                  codes for a precise fit. Choose one from each dimension: the
                  result is your size.
                </p>
                {isSizeGuideLoading && (
                  <div className="surface-card p-5">
                    <p className="eyebrow-label text-brand">Precision Fit</p>
                    <p className="mt-3 text-[0.82rem] leading-6 text-muted-foreground">
                      Loading the live size guide...
                    </p>
                  </div>
                )}

                {hasSizeGuideError && (
                  <div className="surface-card p-5">
                    <p className="eyebrow-label text-brand">Precision Fit</p>
                    <p className="mt-3 text-[0.82rem] leading-6 text-muted-foreground">
                      We couldn&apos;t load the live size guide. Try again to
                      fetch the latest measurement codes.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        void refetchSizeGuide()
                      }}
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {sizeGuide && <SizeGuideContent guide={sizeGuide} dense />}
              </div>
            </div>
          </div>
        )}
      </PageReveal>
    </main>
  )
}
