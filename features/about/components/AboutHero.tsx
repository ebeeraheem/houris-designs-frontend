"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-frame",
        { scale: 1.03, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.05, ease: "power3.out" }
      )
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
    },
    { scope: heroRef }
  )

  return (
    <section className="px-3 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-16 lg:px-8 lg:pt-10 lg:pb-20">
      <div ref={heroRef} className="mx-auto max-w-[96rem]">
        <div className="hero-frame relative min-h-[72svh] overflow-hidden rounded-[var(--radius)] border border-border/50 sm:min-h-[78svh] sm:rounded-[var(--radius)]">
          <Image
            src="/images/HeroImages/IMG_8283.jpeg"
            alt="Houris Designs statement dress in an architectural courtyard"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120d0a]/78 via-[#120d0a]/24 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-12">
            <div className="max-w-[36rem]">
              <p className="hero-eyebrow eyebrow-label text-[#f3d6c9]">
                Est. 2018
              </p>
              <h1 className="hero-title mt-4 font-heading text-[2.6rem] leading-[0.88] font-medium tracking-[-0.07em] text-white uppercase sm:text-[3.8rem] lg:text-[5.2rem]">
                Houris
                <br />
                Designs
              </h1>
              <p className="hero-subtitle mt-5 max-w-[30rem] text-[0.95rem] leading-7 text-white/78 sm:text-[1.02rem]">
                Rooted in the historic city of Kano, Nigeria, Houris Designs
                creates made-to-order fashion for women who dress with
                confidence, self-love, and individuality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
