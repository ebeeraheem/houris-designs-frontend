"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { EmptyCollectionIcon } from "@/components/icons"
import { EmptyState } from "@/components/ui/empty-state"
import { PRODUCT_ROUTES, useGetProducts } from "@/features/products"
import { TextReveal } from "@/components/text-reveal"
import { formatCurrency } from "@/utils/format-currency"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const HOMEPAGE_PRODUCT_COUNT = 6

export function FeaturedCollection() {
  const root = useRef<HTMLElement>(null)
  const { data, isLoading } = useGetProducts({
    page: 1,
    pageSize: HOMEPAGE_PRODUCT_COUNT,
  })
  const products = data?.data ?? []

  useGSAP(
    () => {
      const shell = root.current
      if (!shell) return

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (reduceMotion) {
        gsap.set("[data-reveal]", { clipPath: "inset(0% 0% 0% 0%)" })
        gsap.set("[data-copy]", { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set("[data-reveal]", { clipPath: "inset(0% 0% 100% 0%)" })
      gsap.set("[data-copy]", { autoAlpha: 0, y: 20 })

      ScrollTrigger.batch("[data-reveal]", {
        onEnter: (elements) => {
          gsap.to(elements, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
          })
        },
        start: "top 88%",
        once: true,
      })

      ScrollTrigger.batch("[data-copy]", {
        onEnter: (elements) => {
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
          })
        },
        start: "top 88%",
        once: true,
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      className="px-3 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="mb-10 flex items-end justify-between gap-4 sm:mb-14">
          <div>
            <p data-copy className="eyebrow-label text-brand">
              Current Series
            </p>
            <TextReveal
              className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]"
              delay={0.1}
              stagger={0.03}
              yOffset={80}
            >
              The Collection
            </TextReveal>
          </div>
          <Link
            href="/collection"
            data-copy
            className="nav-link hidden sm:inline"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {isLoading
            ? Array.from({ length: HOMEPAGE_PRODUCT_COUNT }).map((_, index) => (
                <div
                  key={`homepage-product-skeleton-${index}`}
                  className="animate-pulse"
                >
                  <div className="image-shell overflow-hidden">
                    <div className="h-[22rem] bg-muted/60 sm:h-[26rem] lg:h-[30rem]" />
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="h-3 w-24 rounded-full bg-muted/60" />
                    <div className="h-7 w-3/4 rounded-full bg-muted/60" />
                    <div className="h-4 w-20 rounded-full bg-muted/60" />
                  </div>
                </div>
              ))
            : products.map((product) => (
                <Link
                  key={product.id}
                  href={PRODUCT_ROUTES.DETAIL(product.id)}
                  className="group block cursor-pointer"
                >
                  <div data-reveal className="image-shell">
                    <div className="relative h-[22rem] sm:h-[26rem] lg:h-[30rem]">
                      <Image
                        src={
                          product.primaryImageUrl ||
                          "/images/editorial/boutique-rack.jpg"
                        }
                        alt={product.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/18 via-transparent to-transparent" />
                      <div className="absolute right-4 bottom-4 left-4 flex items-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="status-pill border-background/30 bg-background/78 text-foreground backdrop-blur-sm">
                          View Product
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-4">
                    <p data-copy className="eyebrow-label text-brand">
                      Houris Collection
                    </p>
                    <h3
                      data-copy
                      className="font-heading text-[1.1rem] font-medium tracking-[-0.03em] uppercase"
                    >
                      {product.title}
                    </h3>
                    <p
                      data-copy
                      className="font-heading text-[1rem] font-medium tracking-[-0.04em] text-foreground/82 sm:text-[1.08rem]"
                    >
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
        </div>

        {!isLoading && products.length === 0 ? (
          <div className="mt-8 rounded-[var(--radius)] border border-border/70 bg-background/78 px-5 py-8 sm:px-8">
            <EmptyState
              icon={<EmptyCollectionIcon className="size-7" aria-hidden="true" />}
              title="Collection unavailable"
              description="The live collection is unavailable right now. Please check back in a moment."
            />
          </div>
        ) : null}

        <div className="mt-10 flex justify-center sm:mt-14 sm:hidden">
          <Link href={PRODUCT_ROUTES.LIST} data-copy className="nav-link">
            View All
          </Link>
        </div>
      </div>
    </section>
  )
}
