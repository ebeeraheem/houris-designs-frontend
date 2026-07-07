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
    <section
      ref={storyRef}
      className="px-3 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="story-image relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[700px]">
            <Image
              src="/images/about/emirs-palace-kano-city.jpg"
              alt="Gateway of the Emir's Palace in Kano, reflecting the heritage behind Houris Designs"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="story-content flex flex-col justify-center">
            <p className="eyebrow-label mb-4 text-brand">Our Story</p>
            <h2 className="font-heading text-[1.8rem] leading-[0.95] font-medium tracking-[-0.04em] uppercase sm:text-[2.2rem] lg:text-[2.6rem]">
              Rooted in Kano, Made for the Beautiful People
            </h2>
            <div className="mt-8 space-y-5 text-[0.95rem] leading-7 text-muted-foreground">
              <p>
                Founded in 2018 by Creative Director Salma Suleiman Mohammed,
                Houris Designs is a Kano fashion house guided by one slogan —
                &quot;The Beautiful People.&quot; Our couture moves between bold
                and modest design, so every woman can choose the style that
                honors her identity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
