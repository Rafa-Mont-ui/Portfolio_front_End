"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const items = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Three.js",
  "Vue.js",
  "Figma",
  "UI Design",
  "Acessibilidade",
  "Performance",
]

export function Marquee() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      const tracks = gsap.utils.toArray<HTMLElement>(".marquee-track")
      const loops = tracks.map((track, i) =>
        gsap.fromTo(
          track,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 40, ease: "none", repeat: -1 }
        )
      )

      // Acelera conforme a velocidade da rolagem e volta ao normal suavemente
      const settle = gsap
        .delayedCall(0.25, () =>
          loops.forEach((loop) => gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true }))
        )
        .pause()

      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6)
          loops.forEach((loop) =>
            gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true })
          )
          settle.restart(true)
        },
      })

      return () => trigger.kill()
    },
    { scope: root }
  )

  const row = (variant: "solid" | "outline") => (
    <div className="marquee-track flex w-max">
      {[0, 1].map((copy) => (
        <ul key={copy} className="flex shrink-0">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-8 pr-8">
              <span
                className={
                  variant === "solid"
                    ? "text-foreground"
                    : "text-transparent [-webkit-text-stroke:1px_var(--muted-foreground)]"
                }
              >
                {item}
              </span>
              <span className="text-lime" aria-hidden="true">
                ✦
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )

  return (
    <div
      ref={root}
      className="flex select-none flex-col gap-2 overflow-hidden border-y border-border py-6 text-5xl font-medium tracking-tight md:py-8 md:text-7xl"
    >
      <span className="sr-only">Tecnologias: {items.join(", ")}</span>
      <div aria-hidden="true">{row("solid")}</div>
      <div aria-hidden="true">{row("outline")}</div>
    </div>
  )
}
