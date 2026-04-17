"use client"

import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const lengthCodes = ["A", "B", "C", "D", "E", "F", "G", "H"]
const widthCodes = ["6", "8", "10", "12", "14", "16", "18", "20", "22", "24"]

export function SizingApproach() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const shell = root.current
      if (!shell) return

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (reduceMotion) {
        gsap.set("[data-size-copy]", { autoAlpha: 1, y: 0 })
        gsap.set("[data-size-grid]", { autoAlpha: 1 })
        return
      }

      gsap.set("[data-size-copy]", { autoAlpha: 0, y: 20 })
      gsap.set("[data-size-grid]", { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: shell,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      })

      tl.to("[data-size-copy]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
      }).to(
        "[data-size-grid]",
        {
          autoAlpha: 1,
          duration: 0.9,
        },
        "-=0.3"
      )
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      className="border-t border-border/50 bg-surface/50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="mx-auto max-w-[42rem] text-center">
          <p data-size-copy className="eyebrow-label text-brand">
            Precision Fit
          </p>
          <h2
            data-size-copy
            className="mt-4 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]"
          >
            Two dimensions,
            <br />
            one perfect fit
          </h2>
          <p
            data-size-copy
            className="mt-6 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]"
          >
            Our sizing system uses two independent dimensions — length and
            width — so you find the combination that matches your body. Choose
            a length code (A–H) for your height, and a width code (6–24) for
            your proportions. No guessing, no compromising.
          </p>
        </div>

        <div
          data-size-grid
          className="mx-auto mt-12 max-w-[32rem] sm:mt-16"
        >
          <div className="surface-card p-5 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="eyebrow-label text-brand">Length</span>
              <span className="h-px flex-1 bg-border" />
              <span className="eyebrow-label text-foreground/50">
                A – H
              </span>
            </div>
            <div className="mb-6 grid grid-cols-8 gap-1.5">
              {lengthCodes.map((code) => (
                <div
                  key={code}
                  className="flex h-10 items-center justify-center rounded-[calc(var(--radius))] border border-border bg-background text-[0.72rem] font-semibold tracking-[0.08em] text-foreground/70"
                >
                  {code}
                </div>
              ))}
            </div>

            <div className="mb-4 flex items-center gap-3">
              <span className="eyebrow-label text-brand">Width</span>
              <span className="h-px flex-1 bg-border" />
              <span className="eyebrow-label text-foreground/50">
                6 – 24
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
              {widthCodes.map((code) => (
                <div
                  key={code}
                  className="flex h-10 items-center justify-center rounded-[calc(var(--radius))] border border-border bg-background text-[0.72rem] font-semibold tracking-[0.08em] text-foreground/70"
                >
                  {code}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-border/50 pt-5">
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                e.g.
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.08em] text-brand">
                E16
              </span>
              <span className="text-[0.68rem] text-muted-foreground">
                = Length E + Width 16
              </span>
            </div>
          </div>
        </div>

        <div data-size-copy className="mt-10 flex justify-center sm:mt-14">
          <Link
            href="/size-guide"
            className="nav-link"
          >
            Full Size Guide
          </Link>
        </div>
      </div>
    </section>
  )
}
