"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import {
  RiScissorsLine,
  RiRulerLine,
  RiLeafLine,
  RiTimeLine,
} from "@remixicon/react"

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: RiScissorsLine,
    title: "Made to Order",
    description:
      "Every garment is crafted specifically for you after your order is placed. No mass production, no excess inventory.",
  },
  {
    icon: RiRulerLine,
    title: "Precision Fit",
    description:
      "Our two-dimensional sizing system combines length and width codes to find your exact proportions.",
  },
  {
    icon: RiLeafLine,
    title: "Sustainable",
    description:
      "By producing only what is ordered, we eliminate waste and reduce our environmental footprint.",
  },
  {
    icon: RiTimeLine,
    title: "Timeless Design",
    description:
      "Architectural silhouettes that transcend seasonal trends and remain relevant for years to come.",
  },
]

export function ValuesSection() {
  const valuesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".value-card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    )
  })

  return (
    <section
      ref={valuesRef}
      className="px-3 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="eyebrow-label mb-4 text-brand">What We Stand For</p>
          <h2 className="font-heading text-[1.6rem] leading-[0.95] font-medium tracking-[-0.04em] uppercase sm:text-[2rem] lg:text-[2.4rem]">
            Our Values
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card group surface-card p-8 transition-all duration-500 hover:border-brand/30"
            >
              <div className="mb-5 inline-flex rounded-full border border-brand/20 bg-brand/5 p-3 transition-colors group-hover:bg-brand/10">
                <value.icon className="size-5 text-brand" />
              </div>
              <h3 className="font-heading text-[1.1rem] font-medium tracking-[-0.02em]">
                {value.title}
              </h3>
              <p className="mt-2 text-[0.82rem] leading-6 text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
