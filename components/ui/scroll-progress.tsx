"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const bar = barRef.current
    if (!bar) return

    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" })

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  })

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-lime"
      />
    </div>
  )
}
