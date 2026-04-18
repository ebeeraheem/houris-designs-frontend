"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { colourSwatches, demoProducts } from "@/features/products/demo-products"
import { TextReveal } from "@/components/text-reveal"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function FeaturedCollection() {
  const root = useRef<HTMLElement>(null)

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
    <section ref={root} className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
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

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          {demoProducts.map((product) => (
            <Link
              key={product.id}
              href={`/collection/${product.id}`}
              className={`${product.featuredClassName} group block cursor-pointer`}
            >
              <div data-reveal className="image-shell">
                <div className={`relative ${product.featuredImageClassName}`}>
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
                <p data-copy className="eyebrow-label text-brand">
                  {product.colour}
                </p>
                <h3
                  data-copy
                  className="font-heading text-[1.1rem] font-medium tracking-[-0.03em] uppercase"
                >
                  {product.title}
                </h3>
                <p
                  data-copy
                  className="text-[0.82rem] font-medium tracking-[0.04em] text-muted-foreground"
                >
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-14 sm:hidden">
          <Link href="/collection" data-copy className="nav-link">
            View All
          </Link>
        </div>
      </div>
    </section>
  )
}
