"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

interface UseTilt3dOptions {
  max?: number
  perspective?: number
  scale?: number
  speed?: number
  glare?: boolean
}

export function useTilt3d<T extends HTMLElement = HTMLElement>(
  options: UseTilt3dOptions = {}
) {
  const { max = 8, perspective = 1000, scale = 1.02, speed = 0.4, glare = true } = options
  const ref = useRef<T>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) return

      gsap.set(el, { transformPerspective: perspective, transformStyle: "preserve-3d" })

      const quickX = gsap.quickTo(el, "rotationY", { duration: speed, ease: "power3.out" })
      const quickY = gsap.quickTo(el, "rotationX", { duration: speed, ease: "power3.out" })
      const quickScale = gsap.quickTo(el, "scale", { duration: speed, ease: "power3.out" })

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (rect.width / 2)
        const dy = (e.clientY - cy) / (rect.height / 2)

        quickX(dx * max)
        quickY(-dy * max)

        if (glare && glareRef.current) {
          const px = ((e.clientX - rect.left) / rect.width) * 100
          const py = ((e.clientY - rect.top) / rect.height) * 100
          gsap.to(glareRef.current, {
            background: `radial-gradient(circle at ${px}% ${py}%, rgba(0,212,255,0.18), transparent 55%)`,
            opacity: 1,
            duration: speed,
            ease: "power3.out",
          })
        }
      }

      const handleEnter = () => {
        quickScale(scale)
      }

      const handleLeave = () => {
        quickX(0)
        quickY(0)
        quickScale(1)
        if (glare && glareRef.current) {
          gsap.to(glareRef.current, { opacity: 0, duration: speed, ease: "power3.out" })
        }
      }

      el.addEventListener("mousemove", handleMove)
      el.addEventListener("mouseenter", handleEnter)
      el.addEventListener("mouseleave", handleLeave)

      return () => {
        el.removeEventListener("mousemove", handleMove)
        el.removeEventListener("mouseenter", handleEnter)
        el.removeEventListener("mouseleave", handleLeave)
      }
    },
    { scope: ref }
  )

  return { ref, glareRef }
}
