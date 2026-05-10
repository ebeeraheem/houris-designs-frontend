"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const shouldShowIntro = pathname === "/" && !hasPlayedIntro

  useEffect(() => {
    if (!shouldShowIntro) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      const frame = window.requestAnimationFrame(() => {
        setHasPlayedIntro(true)
      })

      return () => {
        window.cancelAnimationFrame(frame)
      }
    }

    const root = rootRef.current
    if (!root) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      })
      gsap.set("[data-intro-item]", {
        autoAlpha: 0,
        y: 26,
      })
      gsap.set("[data-intro-mark]", {
        autoAlpha: 0,
        scale: 0.92,
      })
      gsap.set("[data-intro-line]", {
        scaleX: 0,
        transformOrigin: "left center",
      })

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setHasPlayedIntro(true)
        },
      })

      tl.to("[data-intro-mark]", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
      })
        .to(
          "[data-intro-item]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.35"
        )
        .to(
          "[data-intro-line]",
          {
            scaleX: 1,
            duration: 0.7,
            stagger: 0.06,
          },
          "-=0.45"
        )
        .to(
          progressRef.current,
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "-=0.45"
        )
        .to(
          contentRef.current,
          {
            autoAlpha: 0,
            y: -18,
            scale: 0.98,
            duration: 0.45,
          },
          "+=0.18"
        )
        .to(
          leftPanelRef.current,
          {
            xPercent: -102,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.1"
        )
        .to(
          rightPanelRef.current,
          {
            xPercent: 102,
            duration: 1,
            ease: "power4.inOut",
          },
          "<"
        )
    }, root)

    return () => {
      ctx.revert()
    }
  }, [shouldShowIntro])

  return (
    <>
      {shouldShowIntro && (
        <div
          ref={rootRef}
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden text-[#f7efe8]"
        >
          <div
            ref={leftPanelRef}
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden border-r border-white/6 bg-[#17110e]"
          />
          <div
            ref={rightPanelRef}
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden border-l border-white/6 bg-[#120e0c]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_12%_18%,rgba(201,130,104,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_44%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_88%_72%,rgba(201,130,104,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_22%),linear-gradient(315deg,rgba(255,255,255,0.03),transparent_46%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:clamp(4.5rem,8vw,7rem)_clamp(4.5rem,8vw,7rem)] opacity-40"
          />
          <div
            ref={contentRef}
            className="relative flex h-full flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div data-intro-item>
                <p className="eyebrow-label text-[#e8d9cd]/76">
                  Houris Designs
                </p>
              </div>
              <div
                data-intro-item
                className="text-[0.64rem] font-medium tracking-[0.22em] text-[#e6d5ca]/46 uppercase"
              >
                Home Collection
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:items-end lg:gap-12">
              <div className="hidden lg:flex lg:flex-col lg:items-start lg:gap-6">
                <div
                  data-intro-mark
                  className="relative h-28 w-[13.5rem]"
                >
                  <Image
                    src="/houris logos.png"
                    alt="Houris Designs logo"
                    fill
                    priority
                    sizes="216px"
                    className="object-contain object-center"
                  />
                </div>
              </div>

              <div className="max-w-[48rem]">
                <p
                  data-intro-item
                  className="text-[0.68rem] font-medium tracking-[0.24em] text-[#d8a490] uppercase"
                >
                  Readying The Storefront
                </p>
                <h2
                  data-intro-item
                  className="mt-4 max-w-[10ch] font-heading text-[2.8rem] leading-[0.86] font-medium tracking-[-0.085em] uppercase sm:text-[3.9rem] lg:text-[5rem]"
                >
                  A quieter entrance for Houris.
                </h2>
                <p
                  data-intro-item
                  className="mt-4 max-w-[34rem] text-[0.84rem] leading-7 text-[#efe3db]/64"
                >
                  Tailored lines, refined spacing, and a softer reveal before
                  the collection opens.
                </p>

                <div
                  data-intro-item
                  className="mt-8 flex items-center gap-4 sm:gap-5"
                >
                  <span className="text-[0.68rem] font-medium tracking-[0.2em] text-[#efe3db]/56 uppercase">
                    Opening Sequence
                  </span>
                  <div className="relative h-px flex-1 overflow-hidden bg-white/12">
                    <div
                      data-intro-line
                      className="absolute inset-y-0 left-0 w-full origin-left bg-white/12"
                    />
                    <div
                      ref={progressRef}
                      className="absolute inset-y-0 left-0 w-full origin-left bg-[#cb8770]"
                    />
                  </div>
                  <span className="text-[0.68rem] font-medium tracking-[0.2em] text-[#efe3db]/46 uppercase">
                    01 / 01
                  </span>
                </div>
              </div>
            </div>

            <div
              data-intro-item
              className="flex items-center justify-between gap-4 text-[0.64rem] font-medium tracking-[0.22em] text-[#e6d5ca]/42 uppercase"
            >
              <span>Cut / Fit / Finish</span>
              <span>Since 2024</span>
            </div>
          </div>
        </div>
      )}

      {children}
    </>
  )
}
