"use client"

import { useGlitchText } from "@/hooks/use-glitch-text"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function About() {
  const titleText = useGlitchText("Sobre mim", { initialDelay: 800, pauseDuration: 2500 })

  return (
    <section id="sobre" className="relative overflow-hidden px-6 py-12 md:py-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/5 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 flex items-center gap-4">
            <h2
              className="font-kode text-lg font-semibold uppercase tracking-widest text-primary md:text-xl"
              style={{
                textShadow: "0 0 40px rgba(0, 212, 255, 0.3)",
                fontFamily: "var(--font-kode-mono), 'Kode Mono', monospace",
              }}
            >
              {titleText}
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-8">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Me chamo Rafael Monteiro, tenho 23 anos, e estou trabalhando na
                  área de Web Design. Tenho conhecimento em criação de produto e
                  tudo o que engloba o Design. Atualmente tenho mais experiência em
                  Web Designer/Front-End.
                </p>
                <div className="h-px w-12 bg-primary/30" />
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Minha trajetória começou no design gráfico, passando por estágios
                  na Inspira Rede de Educadores e na DPM Digital como Arte
                  Finalista. Depois migrei para Web Design na Groner, onde atuei
                  com GrapesJS e Figma. Passei pela JVM Webmarketing como
                  Estagiário de Desenvolvimento Web com React e TypeScript, e hoje
                  atuo como Desenvolvedor Web na Larafy, focando em interfaces e
                  experiência do usuário.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Essa jornada me permitiu unir visão de design com habilidades
                  técnicas de front-end, criando soluções que equilibram estética e
                  funcionalidade.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center lg:justify-end">
              <motion.div
                className="relative flex h-72 w-72 flex-col items-center justify-center rounded-2xl border border-primary/20 bg-card/80 p-8 shadow-[0_0_40px_-10px_rgba(0,212,255,0.15)] backdrop-blur-sm md:h-80 md:w-80"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 50px -10px rgba(0, 212, 255, 0.25)",
                  borderColor: "rgba(0, 212, 255, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Corner accent */}
                <div className="absolute right-4 top-4 h-8 w-8 rounded-tr-lg border-r-2 border-t-2 border-primary/40" />
                <div className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-primary/40" />
                <div className="text-center">
                  <span
                    className="font-mono text-7xl font-bold text-primary md:text-8xl"
                    style={{ textShadow: "0 0 40px rgba(0, 212, 255, 0.4)" }}
                  >
                    5+
                  </span>
                  <p className="mt-3 font-mono text-sm uppercase tracking-wider text-muted-foreground">
                    Anos de experiência
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
