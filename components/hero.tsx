"use client"

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { animate, stagger } from "animejs"

const GLITCH_CHARS = "0123456789@#$%&*"

function getRandomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

function useGlitchText(
  originalText: string,
  options?: { initialDelay?: number; glitchInterval?: number; pauseDuration?: number }
) {
  const [displayText, setDisplayText] = useState(originalText)
  const { initialDelay = 1500, glitchInterval = 50, pauseDuration = 3000 } = options ?? {}

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>
    let timeoutId: ReturnType<typeof setTimeout>

    const startGlitch = () => {
      let frame = 0
      const maxFrames = 30

      intervalId = setInterval(() => {
        frame++
        setDisplayText(
          originalText
            .split("")
            .map((char) => {
              if (char === " " || char === "-") return char
              return Math.random() > 0.4 ? getRandomChar() : char
            })
            .join("")
        )

        if (frame >= maxFrames) {
          clearInterval(intervalId)
          setDisplayText(originalText)
          timeoutId = setTimeout(startGlitch, pauseDuration)
        }
      }, glitchInterval)
    }

    timeoutId = setTimeout(startGlitch, initialDelay)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [originalText, initialDelay, glitchInterval, pauseDuration])

  return displayText
}

export function Hero() {
  const badgeText = useGlitchText("Disponivel para novos projetos")
  const frontEndText = useGlitchText("Front-End", { initialDelay: 800, pauseDuration: 2500 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll("[data-hero-animate]")
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = "0"
      htmlEl.style.transform = "translateY(20px)"
    })

    animate(elements, {
      opacity: { from: 0, to: 1 },
      translateY: { from: 20, to: 0 },
      duration: 500,
      delay: stagger(120, { start: 200 }),
      ease: "out(3)",
    })

    const scrollIndicator = container.querySelector("[data-hero-scroll]") as HTMLElement
    if (scrollIndicator) {
      scrollIndicator.style.opacity = "0"
      animate(scrollIndicator, {
        opacity: { from: 0, to: 1 },
        duration: 600,
        delay: 1200,
        ease: "out(3)",
      })
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Neon glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-neon/5 blur-[128px]" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-neon-dim/5 blur-[96px]" />
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-4xl text-center">
        <div
          data-hero-animate
          className="mb-6 inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5"
        >
          <span
            className="text-xs text-primary"
            style={{ fontFamily: "var(--font-kode-mono), 'Kode Mono', monospace" }}
          >
            {badgeText}
          </span>
        </div>

        <h1
          data-hero-animate
          className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl"
        >
          Desenvolvedor{" "}
          <span
            className="text-primary"
            style={{
              textShadow: "0 0 40px rgba(0, 212, 255, 0.3)",
              fontFamily: "var(--font-kode-mono), 'Kode Mono', monospace",
            }}
          >
            {frontEndText}
          </span>
        </h1>

        <p
          data-hero-animate
          className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Construo interfaces modernas, acessíveis e de alta performance.
          Especializado em transformar ideias em experiências digitais que
          encantam usuários e entregam resultados.
        </p>

        <div data-hero-animate className="mb-16 flex items-center justify-center gap-4">
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_rgba(0,212,255,0.3)]"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Fale Comigo
          </a>
        </div>

        {/* Social links */}
        <div data-hero-animate className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/Rafa-Mont-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/rafael-fernando-franco-monteiro-a2b252213/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:dev@email.com"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div data-hero-scroll className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ArrowDown className="h-5 w-5 animate-bounce text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
