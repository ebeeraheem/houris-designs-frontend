"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false)
  const curtainRef = useRef<HTMLDivElement>(null)
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

    gsap.set(curtainRef.current, {
      scaleY: 1,
      transformOrigin: "top center",
    })
    gsap.set(progressRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    })
    gsap.set("[data-loading-copy]", {
      autoAlpha: 0,
      y: 24,
    })

    const tl = gsap.timeline({
      onComplete: () => {
        setHasPlayedIntro(true)
      },
    })

    tl.to("[data-loading-copy]", {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
    })
      .to(
        progressRef.current,
        {
          scaleX: 1,
          duration: 0.58,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        curtainRef.current,
        {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 0.82,
          ease: "power4.inOut",
        },
        "+=0.18"
      )

    return () => {
      tl.kill()
    }
  }, [shouldShowIntro])

  return (
    <>
      {shouldShowIntro && (
        <div
          ref={curtainRef}
          className="pointer-events-none fixed inset-0 z-[100] origin-top overflow-hidden bg-[#16110f] text-[#f6eee7]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(165,90,70,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%)]"
          />
          <div className="relative flex h-full flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
            <div className="flex items-start justify-between gap-4">
              <div data-loading-copy>
                <p className="eyebrow-label text-[#e6d5ca]/72">
                  Houris Designs
                </p>
              </div>
              <div
                data-loading-copy
                className="text-[0.64rem] font-medium tracking-[0.22em] text-[#e6d5ca]/44 uppercase"
              >
                Editorial Entrance
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end">
              <div
                data-loading-copy
                className="hidden lg:flex lg:flex-col lg:items-center lg:gap-4"
              >
                <span
                  style={{ writingMode: "vertical-rl" }}
                  className="text-[0.64rem] font-medium tracking-[0.22em] text-[#e6d5ca]/44 uppercase"
                >
                  Made to Measure / Lagos
                </span>
                <span className="h-24 w-px bg-white/12" />
              </div>

              <div>
                <p
                  data-loading-copy
                  className="text-[0.68rem] font-medium tracking-[0.22em] text-[#d9a996] uppercase"
                >
                  Curated Loading Sequence
                </p>
                <h2
                  data-loading-copy
                  className="mt-4 max-w-[12ch] font-heading text-[2.6rem] leading-[0.88] font-medium tracking-[-0.08em] uppercase sm:text-[3.6rem] lg:text-[4.6rem]"
                >
                  Entering the atelier.
                </h2>
                <p
                  data-loading-copy
                  className="mt-4 max-w-[34rem] text-[0.84rem] leading-7 text-[#efe3db]/66"
                >
                  Loading a more editorial storefront with precision fit,
                  collection storytelling, and a calmer client flow.
                </p>

                <div
                  data-loading-copy
                  className="mt-6 flex items-center gap-4 sm:gap-5"
                >
                  <span className="text-[0.68rem] font-medium tracking-[0.2em] text-[#efe3db]/58 uppercase">
                    Loading
                  </span>
                  <div className="relative h-px flex-1 overflow-hidden bg-white/12">
                    <div
                      ref={progressRef}
                      className="absolute inset-y-0 left-0 w-full origin-left bg-[#c07d68]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              data-loading-copy
              className="flex items-center justify-between gap-4 text-[0.64rem] font-medium tracking-[0.22em] text-[#e6d5ca]/42 uppercase"
            >
              <span>Collection / Craft / Tailoring</span>
              <span>01</span>
            </div>
          </div>
        </div>
      )}

      {children}
    </>
  )
}
