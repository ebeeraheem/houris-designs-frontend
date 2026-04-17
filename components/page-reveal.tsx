"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/utils/cn"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type PageRevealProps = {
  children: ReactNode
  className?: string
}

export function PageReveal({ children, className }: PageRevealProps) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const shell = root.current

      if (!shell) {
        return
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      const intro = gsap.utils.toArray<HTMLElement>("[data-page-intro]", shell)
      const sections = gsap.utils.toArray<HTMLElement>(
        "[data-page-section]",
        shell
      )
      const media = gsap.utils.toArray<HTMLElement>("[data-page-media]", shell)

      if (reduceMotion) {
        gsap.set([...intro, ...sections, ...media], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        })
        return
      }

      gsap.set(intro, { autoAlpha: 0, y: 26 })
      gsap.set(sections, { autoAlpha: 0, y: 34 })
      gsap.set(media, { autoAlpha: 0, y: 20, scale: 1.04 })

      if (intro.length) {
        gsap.to(intro, {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.1,
          ease: "power3.out",
        })
      }

      if (media.length) {
        ScrollTrigger.batch(media, {
          start: "top 88%",
          once: true,
          onEnter: (elements) => {
            gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.05,
              stagger: 0.12,
              ease: "power4.out",
            })
          },
        })
      }

      if (sections.length) {
        ScrollTrigger.batch(sections, {
          start: "top 86%",
          once: true,
          onEnter: (elements) => {
            gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              duration: 0.82,
              stagger: 0.12,
              ease: "power3.out",
            })
          },
        })
      }
    },
    { scope: root }
  )

  return (
    <div ref={root} className={cn(className)}>
      {children}
    </div>
  )
}
