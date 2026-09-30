"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

interface UseMagneticOptions {
  strength?: number
  radius?: number
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: UseMagneticOptions = {}
) {
  const { strength = 0.35, radius = 120 } = options
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) return

      const quickX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" })
      const quickY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" })

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)

        if (dist < radius) {
          quickX(dx * strength)
          quickY(dy * strength)
        } else {
          quickX(0)
          quickY(0)
        }
      }

      const handleLeave = () => {
        quickX(0)
        quickY(0)
      }

      el.addEventListener("mousemove", handleMove)
      el.addEventListener("mouseleave", handleLeave)

      return () => {
        el.removeEventListener("mousemove", handleMove)
        el.removeEventListener("mouseleave", handleLeave)
      }
    },
    { scope: ref }
  )

  return ref
}
