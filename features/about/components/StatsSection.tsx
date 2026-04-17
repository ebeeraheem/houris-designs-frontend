"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "100%", label: "Made to Order" },
  { value: "36", label: "Size Combinations" },
  { value: "0%", label: "Excess Inventory" },
  { value: "3", label: "Countries of Origin" },
]

export function StatsSection() {
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".stat-item",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )
  })

  return (
    <section
      ref={statsRef}
      className="border-y border-border bg-secondary/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <p className="font-heading text-[2.5rem] font-medium tracking-[-0.03em] text-brand sm:text-[3rem]">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.75rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
