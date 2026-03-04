"use client"

import { animate, stagger } from "animejs"
import { useEffect, useRef } from "react"

interface AnimeStaggerInProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function AnimeStaggerIn({
  children,
  className,
  staggerDelay = 80,
  once = true,
}: AnimeStaggerInProps) {
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
          const children = el.children

          if (children.length === 0) return

          for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement
            child.style.opacity = "0"
            child.style.transform = "translateY(30px)"
          }

          animate(children, {
            opacity: { from: 0, to: 1 },
            translateY: { from: 30, to: 0 },
            duration: 500,
            delay: stagger(staggerDelay),
            ease: "out(3)",
          })
        })
      },
      { threshold: 0.1, rootMargin: "0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [staggerDelay, once])

  return <div ref={ref} className={className}>{children}</div>
}
