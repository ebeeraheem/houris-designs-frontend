"use client"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current) return

    if (!xTo.current || !yTo.current) {
      xTo.current = gsap.quickTo(ref.current, "x", {
        duration: 0.5,
        ease: "power3",
      })
      yTo.current = gsap.quickTo(ref.current, "y", {
        duration: 0.5,
        ease: "power3",
      })
    }

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (event.clientX - centerX) * strength
    const distanceY = (event.clientY - centerY) * strength

    xTo.current(distanceX)
    yTo.current(distanceY)
  }

  const handleMouseLeave = () => {
    if (xTo.current) xTo.current(0)
    if (yTo.current) yTo.current(0)
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
