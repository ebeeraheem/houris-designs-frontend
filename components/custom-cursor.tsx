"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import gsap from "gsap"

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], summary, label, .magnetic, [data-cursor='interactive']"
const SUPPRESSED_SELECTOR =
  "input, textarea, select, option, [contenteditable='true']"

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
  const isHoveringRef = useRef(false)
  const isVisibleRef = useRef(false)
  const isPointerDevice = useSyncExternalStore(
    subscribeToPointerChanges,
    getPointerSnapshot,
    getServerPointerSnapshot
  )

  useEffect(() => {
    const root = document.documentElement

    if (!isPointerDevice) {
      root.classList.remove("has-custom-cursor")
      return
    }

    root.classList.add("has-custom-cursor")

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const setCursorVisible = (nextVisible: boolean) => {
      if (isVisibleRef.current === nextVisible) return
      isVisibleRef.current = nextVisible
      setIsVisible(nextVisible)
    }

    const setCursorHovering = (nextHovering: boolean) => {
      if (isHoveringRef.current === nextHovering) return
      isHoveringRef.current = nextHovering
      setIsHovering(nextHovering)
    }

    const getCursorState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        return {
          isSuppressed: false,
          isInteractive: false,
        }
      }

      if (target.closest(SUPPRESSED_SELECTOR)) {
        return {
          isSuppressed: true,
          isInteractive: false,
        }
      }

      return {
        isSuppressed: false,
        isInteractive: Boolean(target.closest(INTERACTIVE_SELECTOR)),
      }
    }

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" })
    const dotXTo = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "none" })
    const dotYTo = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "none" })

    const handleMouseMove = (event: MouseEvent) => {
      const { isSuppressed, isInteractive } = getCursorState(event.target)

      if (isSuppressed) {
        setCursorVisible(false)
        setCursorHovering(false)
        return
      }

      xTo(event.clientX)
      yTo(event.clientY)
      dotXTo(event.clientX)
      dotYTo(event.clientY)

      setCursorVisible(true)
      setCursorHovering(isInteractive)
    }

    const handleMouseLeave = () => {
      setCursorVisible(false)
      setCursorHovering(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      root.classList.remove("has-custom-cursor")
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isPointerDevice])

  if (!isPointerDevice) return null

  return (
    <>
      <div
        aria-hidden="true"
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-200 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative flex items-center justify-center">
          <div
            className="absolute rounded-full bg-brand/10 blur-[10px] transition-all duration-300 ease-out"
            style={{
              width: isHovering ? "52px" : "28px",
              height: isHovering ? "52px" : "28px",
              opacity: isHovering ? 0.9 : 0.45,
            }}
          />
          <div
            className="relative rounded-full border border-foreground/14 bg-background/45 shadow-[0_10px_30px_rgba(31,23,18,0.12)] backdrop-blur-[3px] transition-all duration-300 ease-out"
            style={{
              width: isHovering ? "40px" : "22px",
              height: isHovering ? "40px" : "22px",
            }}
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-150 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="rounded-full bg-brand shadow-[0_0_18px_rgba(160,86,67,0.35)] transition-all duration-200 ease-out"
          style={{
            width: isHovering ? "6px" : "5px",
            height: isHovering ? "6px" : "5px",
            transform: isHovering ? "scale(0.9)" : "scale(1)",
          }}
        />
      </div>
    </>
  )
}
