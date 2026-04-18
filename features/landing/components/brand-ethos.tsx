"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextRevealLine } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function BrandEthos() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const shell = root.current
      if (!shell) return

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (reduceMotion) {
        gsap.set("[data-ethos-reveal]", { clipPath: "inset(0% 0% 0% 0%)" })
        gsap.set("[data-ethos-copy]", { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set("[data-ethos-reveal]", { clipPath: "inset(0% 0% 100% 0%)" })
      gsap.set("[data-ethos-copy]", { autoAlpha: 0, y: 24 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: shell,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      })

      tl.to("[data-ethos-reveal]", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power4.out",
      }).to(
        "[data-ethos-copy]",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.7"
      )
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      className="border-t border-border/50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto grid max-w-[96rem] gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
        <div className="lg:col-span-5 lg:py-8">
          <p data-ethos-copy className="eyebrow-label text-brand">
            Our Ethos
          </p>
          <TextRevealLine
            className="mt-4 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]"
            delay={0.1}
            stagger={0.08}
            yOffset={30}
          >
            Made to your measure
          </TextRevealLine>
          <p
            data-ethos-copy
            className="mt-6 max-w-[26rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]"
          >
            Every garment is crafted specifically for you. We don&apos;t stock
            shelves — we craft silhouettes. From fabric selection to final
            stitch, each piece is created only after you order, ensuring a fit
            that&apos;s uniquely yours.
          </p>
          <p
            data-ethos-copy
            className="mt-4 max-w-[26rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]"
          >
            This is clothing as it should be: considered, precise, and personal.
            No compromise on fit, no waste on excess.
          </p>
          <div data-ethos-copy className="mt-8">
            <MagneticButton className="magnetic inline-block" strength={0.15}>
              <Link
                href="/about"
                className="inline-flex h-12 items-center gap-1.5 rounded-[calc(var(--radius)+1px)] border border-foreground/70 bg-background/75 px-6 text-[0.68rem] font-medium tracking-[0.22em] uppercase backdrop-blur-sm transition-all duration-200 hover:border-brand hover:bg-accent"
              >
                About Houris
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-ethos-reveal className="image-shell">
            <div className="relative h-[22rem] sm:h-[30rem] lg:h-[38rem]">
              <Image
                src="/images/editorial/boutique-rack.jpg"
                alt="Curated clothing rack inside the Houris studio."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" /> */}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 lg:col-span-1 lg:col-start-6 lg:row-start-1 lg:flex lg:justify-center lg:self-end">
          <span
            data-ethos-copy
            style={{ writingMode: "vertical-rl" }}
            className="eyebrow-label text-foreground/50"
          >
            Craftsmanship / Since 2024
          </span>
          <span data-ethos-copy className="mt-0.5 h-28 w-px bg-foreground/14" />
        </div>
      </div>
    </section>
  )
}
