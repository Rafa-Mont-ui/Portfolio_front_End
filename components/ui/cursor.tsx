"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

/**
 * Cursor seguidor (apenas desktop). Elementos com `data-cursor="Texto"`
 * expandem o cursor e mostram o texto; links e botões só o aumentam.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState("")
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnabled(fine && !reduce)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 })
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" })
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" })
    let visible = false

    const onMove = (e: MouseEvent) => {
      x(e.clientX)
      y(e.clientY)
      if (!visible) {
        visible = true
        gsap.to(el, { scale: 1, duration: 0.3 })
      }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const labelled = target.closest<HTMLElement>("[data-cursor]")
      const interactive = target.closest("a, button, [role='button']")

      if (labelled) {
        setLabel(labelled.dataset.cursor ?? "")
        gsap.to(el, { scale: 1, width: 96, height: 96, duration: 0.35, ease: "power3.out" })
      } else {
        setLabel("")
        const size = interactive ? 44 : 12
        gsap.to(el, { scale: 1, width: size, height: size, duration: 0.35, ease: "power3.out" })
      }
    }

    const onLeave = () => {
      visible = false
      gsap.to(el, { scale: 0, duration: 0.3 })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver)
    document.documentElement.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.documentElement.removeEventListener("mouseleave", onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[80] flex h-3 w-3 items-center justify-center rounded-full bg-lime ${
        label ? "" : "mix-blend-difference"
      }`}
    >
      {label && (
        <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-primary-foreground">
          {label}
        </span>
      )}
    </div>
  )
}
