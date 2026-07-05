"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

export function CraftsmanshipSection() {
  const craftRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".craft-image-1",
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: craftRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".craft-image-2",
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: craftRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".craft-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: craftRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    )
  })

  return (
    <section
      ref={craftRef}
      className="px-3 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="craft-image-1 relative aspect-[3/4] overflow-hidden lg:col-span-5 lg:aspect-auto lg:h-[550px]">
            <Image
              src="/images/HeroImages/IMG_8270.jpeg"
              alt="Houris Designs pink statement dress in an architectural courtyard"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="craft-content flex flex-col justify-center lg:col-span-4 lg:px-6">
            <p className="eyebrow-label mb-4 text-brand">
              Craftsmanship & Innovation
            </p>
            <h2 className="font-heading text-[1.5rem] leading-[0.95] font-medium tracking-[-0.04em] uppercase sm:text-[1.8rem]">
              Designed for Fit, Made With Purpose
            </h2>
            <div className="mt-6 space-y-4 text-[0.9rem] leading-7 text-muted-foreground">
              <p>
                Every Houris Designs piece begins with a choice: the woman, the
                style, the colour, and the size combination that feels true to
                her. We produce strictly on demand, so each order is treated
                with focus from payment through completion.
              </p>
              <p>
                Our signature two-dimensional sizing system combines length and
                width codes to help customers find a fit without unnecessary
                compromise. It is a practical innovation built around real
                bodies and real confidence.
              </p>
              <p>
                The result is fashion that balances cultural elegance with
                modern expression: bold when it wants to be, modest when it
                needs to be, and always made to help the wearer feel at home in
                herself.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[0.72rem] tracking-[0.12em] text-muted-foreground uppercase">
                <span className="size-2 rounded-full bg-brand/60" />
                Sustainable
              </div>
              <div className="flex items-center gap-2 text-[0.72rem] tracking-[0.12em] text-muted-foreground uppercase">
                <span className="size-2 rounded-full bg-brand/60" />
                Inclusive
              </div>
              <div className="flex items-center gap-2 text-[0.72rem] tracking-[0.12em] text-muted-foreground uppercase">
                <span className="size-2 rounded-full bg-brand/60" />
                Powerful
              </div>
            </div>
          </div>
          <div className="craft-image-2 relative aspect-[3/4] overflow-hidden lg:col-span-3 lg:aspect-auto lg:h-[550px]">
            <Image
              src="/images/HeroImages/IMG_8322.jpeg"
              alt="Houris Designs dress captured in motion"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
