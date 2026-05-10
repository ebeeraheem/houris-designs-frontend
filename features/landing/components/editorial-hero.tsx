"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const slides = [
  {
    image: "/images/HeroImages/IMG_8270.jpeg",
    eyebrow: "Series 01 — Archival Material",
    title: "The linear\ncollection",
    description:
      "Custom-fitted silhouettes engineered for the modern architectural wardrobe. Refined, precise, effortless.",
  },
  {
    image: "/images/HeroImages/IMG_8283.jpeg",
    eyebrow: "Crafted Excellence",
    title: "Precision\nin every stitch",
    description:
      "Meticulously crafted garments that blend timeless design with contemporary sensibility.",
  },
  {
    image: "/images/HeroImages/IMG_8310.jpeg",
    eyebrow: "Modern Minimalism",
    title: "Elevated\nessentials",
    description:
      "Thoughtfully designed pieces that transcend trends and define your personal style.",
  },
  {
    image: "/images/HeroImages/IMG_8322.jpeg",
    eyebrow: "Sustainable Luxury",
    title: "Conscious\ncraftsmanship",
    description:
      "Premium materials sourced responsibly, created to last beyond seasons.",
  },
  {
    image: "/images/HeroImages/IMG_8333.jpeg",
    eyebrow: "Timeless Design",
    title: "Refined\naesthetics",
    description:
      "Where architectural precision meets effortless sophistication.",
  },
]

export function EditorialHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <main className="min-h-svh">
      <section className="relative h-[calc(100svh-4rem)] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex items-end">
              <div className="w-full px-6 pb-16 sm:px-12 sm:pb-20 lg:px-16 lg:pb-24">
                <div className="mx-auto max-w-7xl">
                  <div className="max-w-3xl space-y-4 sm:space-y-5 lg:space-y-6">
                    <p className="eyebrow-label text-white/90">
                      {slide.eyebrow}
                    </p>
                    <h1 className="font-heading text-[2.8rem] leading-[0.88] font-medium tracking-[-0.07em] text-white uppercase sm:text-[4rem] lg:text-[clamp(4rem,6vw,5.5rem)]">
                      {slide.title.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < slide.title.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </h1>
                    <p className="max-w-[32rem] text-[0.95rem] leading-7 text-white/90 sm:text-base">
                      {slide.description}
                    </p>
                    <Link
                      href="/collection"
                      className="group/link inline-flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.22em] text-white uppercase transition-colors duration-200 hover:text-brand"
                    >
                      Explore collection
                      <span className="inline-flex size-8 items-center justify-center rounded-[var(--radius)] border border-white/30 transition-all duration-200 group-hover/link:border-brand group-hover/link:bg-brand group-hover/link:text-brand-foreground">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="translate-x-px transition-transform duration-200 group-hover/link:translate-x-0.5"
                        >
                          <path
                            d="M4 2L8 6L4 10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="border-t border-foreground/8 px-6 py-4 sm:px-12 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 text-[0.68rem] font-medium tracking-[0.26em] text-foreground/40 uppercase">
          <span>Complimentary shipping worldwide</span>
          <span className="hidden sm:inline">
            Sustainably made in limited runs
          </span>
        </div>
      </div>
    </main>
  )
}
