"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
  amount?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  const from = directions[direction]

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) {
        gsap.set(el, { opacity: 1, x: 0, y: 0 })
        return
      }

      gsap.set(el, { opacity: 0, ...from })

      const tween = gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - amount * 100}%`,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: ref, dependencies: [delay, direction, once, amount] }
  )

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
