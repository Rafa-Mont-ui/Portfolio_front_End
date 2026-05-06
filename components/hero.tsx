"use client"

import { useGlitchText } from "@/hooks/use-glitch-text"
import { useTextReveal } from "@/hooks/use-text-reveal"
import { useParallax } from "@/hooks/use-parallax"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  const badgeText = useGlitchText("Disponivel para novos projetos")
  const frontEndText = useGlitchText("Front-End", { initialDelay: 800, pauseDuration: 2500 })

  const paragraphRef = useTextReveal<HTMLParagraphElement>({
    delay: 0.6,
    stagger: 0.04,
    duration: 0.8,
    y: 24,
    blur: 8,
  })
  const blob1Ref = useParallax<HTMLDivElement>({ speed: -160, scale: 1.15 })
  const blob2Ref = useParallax<HTMLDivElement>({ speed: -90, scale: 1.1 })

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Neon glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={blob1Ref}
          className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-neon/5 blur-[128px]"
        />
        <div
          ref={blob2Ref}
          className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-neon-dim/5 blur-[96px]"
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <motion.div
          className="mb-6 inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span
            className="text-xs text-primary"
            style={{ fontFamily: "var(--font-kode-mono), 'Kode Mono', monospace" }}
          >
            {badgeText}
          </span>
        </motion.div>

        <motion.h1
          className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
        </motion.h1>

        <p
          ref={paragraphRef}
          className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Construo interfaces modernas, acessíveis e de alta performance.
          Especializado em transformar ideias em experiências digitais que
          encantam usuários e entregam resultados.
        </p>

        <motion.div
          className="mb-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
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
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
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
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </div>
      </motion.div>
    </section>
  )
}
