"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

interface UseTextRevealOptions {
  delay?: number
  duration?: number
  stagger?: number
  y?: number
  blur?: number
}

export function useTextReveal<T extends HTMLElement = HTMLElement>(
  options: UseTextRevealOptions = {}
) {
  const { delay = 0, duration = 0.9, stagger = 0.06, y = 32, blur = 12 } = options
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      const text = el.textContent ?? ""
      const words = text.trim().split(/\s+/)

      el.textContent = ""
      el.setAttribute("aria-label", text)

      const wordEls = words.map((word) => {
        const span = document.createElement("span")
        span.textContent = word
        span.setAttribute("aria-hidden", "true")
        span.style.display = "inline-block"
        span.style.willChange = "transform, opacity, filter"
        el.appendChild(span)
        el.appendChild(document.createTextNode(" "))
        return span
      })

      if (reduce) {
        gsap.set(wordEls, { opacity: 1, y: 0, filter: "blur(0px)" })
        return
      }

      gsap.fromTo(
        wordEls,
        { opacity: 0, y, filter: `blur(${blur}px)` },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          stagger,
          delay,
          ease: "expo.out",
        }
      )
    },
    { scope: ref }
  )

  return ref
}
