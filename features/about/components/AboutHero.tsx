"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export function AboutHero() {
  const heroTextRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".hero-eyebrow",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
    )
    gsap.fromTo(
      ".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.4 }
    )
    gsap.fromTo(
      ".hero-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.6 }
    )
  })

  return (
    <section className="relative h-[85vh] min-h-[600px]">
      <div className="absolute inset-0">
        <Image
          src="/images/editorial/boutique-rack.jpg"
          alt="Houris Designs atelier"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>
      <div
        ref={heroTextRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <p className="hero-eyebrow eyebrow-label mb-6 text-brand">Est. 2024</p>
        <h1 className="hero-title font-heading text-[2.5rem] leading-[0.9] font-medium tracking-[-0.06em] uppercase sm:text-[3.5rem] lg:text-[5rem]">
          Houris
          <br />
          Designs
        </h1>
        <p className="hero-subtitle mt-6 max-w-md text-[0.95rem] leading-7 text-muted-foreground sm:text-[1.05rem]">
          Made-to-measure fashion for the individual. Precision fit, intentional
          design, lasting quality.
        </p>
      </div>
    </section>
  )
}
