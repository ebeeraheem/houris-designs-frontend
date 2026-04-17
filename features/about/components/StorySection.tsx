"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

export function StorySection() {
  const storyRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".story-image",
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".story-image",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".story-content",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".story-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )
  })

  return (
    <section ref={storyRef} className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="story-image relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[700px]">
            <Image
              src="/images/editorial/yellow-look.jpg"
              alt="Houris Designs craftsmanship"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="story-content flex flex-col justify-center">
            <p className="eyebrow-label mb-4 text-brand">Our Philosophy</p>
            <h2 className="font-heading text-[1.8rem] leading-[0.95] font-medium tracking-[-0.04em] uppercase sm:text-[2.2rem] lg:text-[2.6rem]">
              Clothing Should Be Made for the Individual
            </h2>
            <div className="mt-8 space-y-5 text-[0.95rem] leading-7 text-muted-foreground">
              <p>
                Houris Designs was founded on a simple belief: clothing should
                be made for the individual, not the masses. In an era of fast
                fashion and disposable garments, we chose a different path — one
                of intention, precision, and lasting quality.
              </p>
              <p>
                Every piece in our collection is crafted only after you order
                it. This made-to-measure approach eliminates waste and ensures a
                fit that feels uniquely yours. No excess inventory. No
                compromises.
              </p>
              <p>
                Our two-dimensional sizing system — combining length and width
                codes — represents our commitment to precision. We believe that
                when your clothes fit properly, you move through the world with
                greater confidence and ease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
