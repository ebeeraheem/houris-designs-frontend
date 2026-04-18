"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/utils/cn"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  yOffset?: number
  once?: boolean
  start?: string
}

export function TextReveal({
  children,
  className,
  delay = 0,
  stagger = 0.02,
  duration = 0.8,
  yOffset = 100,
  once = true,
  start = "top 85%",
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const words = children.split(" ")

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      const chars = container.querySelectorAll(".char")

      if (prefersReducedMotion) {
        gsap.set(chars, { y: 0, opacity: 1, rotateX: 0 })
        return
      }

      gsap.set(chars, {
        y: yOffset,
        opacity: 0,
        rotateX: -90,
      })

      ScrollTrigger.create({
        trigger: container,
        start,
        once,
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true

          gsap.to(chars, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration,
            stagger,
            ease: "power3.out",
            delay,
          })
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <span
      ref={containerRef}
      className={cn("inline-block", className)}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="mr-[0.25em] inline-block overflow-hidden"
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className="char inline-block"
              style={{ transformOrigin: "center bottom" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}

interface TextRevealLineProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  yOffset?: number
  once?: boolean
  start?: string
}

export function TextRevealLine({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  duration = 1,
  yOffset = 60,
  once = true,
  start = "top 85%",
}: TextRevealLineProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const lines = children.split("\\n")

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      const lineElements = container.querySelectorAll(".reveal-line")

      if (prefersReducedMotion) {
        gsap.set(lineElements, { y: 0, opacity: 1 })
        return
      }

      gsap.set(lineElements, { y: yOffset, opacity: 0 })

      ScrollTrigger.create({
        trigger: container,
        start,
        once,
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true

          gsap.to(lineElements, {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            ease: "power3.out",
            delay,
          })
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <span ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
          <span className="reveal-line block">{line}</span>
        </span>
      ))}
    </span>
  )
}
