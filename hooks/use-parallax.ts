"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseParallaxOptions {
  speed?: number
  scale?: number
  trigger?: string | HTMLElement
  start?: string
  end?: string
}

export function useParallax<T extends HTMLElement = HTMLElement>(
  options: UseParallaxOptions = {}
) {
  const { speed = -120, scale, trigger, start = "top bottom", end = "bottom top" } = options
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) return

      const tween = gsap.to(el, {
        y: speed,
        ...(scale ? { scale } : {}),
        ease: "none",
        scrollTrigger: {
          trigger: trigger ?? el,
          start,
          end,
          scrub: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: ref }
  )

  return ref
}
