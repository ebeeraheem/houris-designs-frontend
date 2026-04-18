"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import gsap from "gsap"

const subscribeToPointerChanges = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(pointer: fine)")

  mediaQuery.addEventListener("change", callback)

  return () => {
    mediaQuery.removeEventListener("change", callback)
  }
}

const getPointerSnapshot = () => window.matchMedia("(pointer: fine)").matches
const getServerPointerSnapshot = () => false

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isPointerDevice = useSyncExternalStore(
    subscribeToPointerChanges,
    getPointerSnapshot,
    getServerPointerSnapshot
  )

  useEffect(() => {
    if (!isPointerDevice) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" })
    const dotXTo = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "none" })
    const dotYTo = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "none" })

    const handleMouseMove = (event: MouseEvent) => {
      xTo(event.clientX)
      yTo(event.clientY)
      dotXTo(event.clientX)
      dotYTo(event.clientY)

      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleInteractiveEnter = () => setIsHovering(true)
    const handleInteractiveLeave = () => setIsHovering(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, .magnetic"
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleInteractiveEnter)
      el.addEventListener("mouseleave", handleInteractiveLeave)
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleInteractiveEnter)
        el.removeEventListener("mouseleave", handleInteractiveLeave)
      })
    }
  }, [isPointerDevice, isVisible])

  if (!isPointerDevice) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="rounded-full bg-brand-foreground transition-all duration-300"
          style={{
            width: isHovering ? "80px" : "40px",
            height: isHovering ? "80px" : "40px",
            opacity: 0.5,
          }}
        />
      </div>
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="rounded-full bg-brand-foreground"
          style={{
            width: isHovering ? "0px" : "8px",
            height: isHovering ? "0px" : "8px",
            transition: "all 0.2s ease",
          }}
        />
      </div>
    </>
  )
}
