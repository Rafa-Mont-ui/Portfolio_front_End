"use client"

import { animate } from "animejs"
import { useEffect, useRef } from "react"

interface AnimeFadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
  amount?: number
}

export function AnimeFadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.2,
}: AnimeFadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          if (once && hasAnimated.current) return

          hasAnimated.current = true

          const fromY = direction === "up" ? 40 : direction === "down" ? -40 : 0
          const fromX = direction === "left" ? 40 : direction === "right" ? -40 : 0

          animate(el, {
            opacity: { from: 0, to: 1 },
            translateX: { from: fromX, to: 0 },
            translateY: { from: fromY, to: 0 },
            duration: 600,
            delay,
            ease: "out(3)",
          })
        })
      },
      { threshold: amount, rootMargin: "0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, direction, once, amount])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: `translate(${direction === "left" ? 40 : direction === "right" ? -40 : 0}px, ${
          direction === "up" ? 40 : direction === "down" ? -40 : 0
        }px)`,
      }}
    >
      {children}
    </div>
  )
}
