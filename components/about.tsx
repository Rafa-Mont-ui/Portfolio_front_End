"use client"

import { useGlitchText } from "@/hooks/use-glitch-text"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function About() {
  const titleText = useGlitchText("Sobre mim", { initialDelay: 800, pauseDuration: 2500 })

  return (
    <section id="sobre" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
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

        <div className="grid gap-12 md:grid-cols-2">
          <ScrollReveal delay={0.1}>
          <div>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Me chamo Rafael Monteiro, tenho 23 anos, e estou trabalhando na
              área de Web Design. Tenho conhecimento em criação de produto e
              tudo o que engloba o Design. Atualmente tenho mais experiência em
              Web Designer/Front-End.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
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
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
          <div className="flex items-center justify-center">
            <div className="relative">
              <motion.div
                className="h-72 w-72 rounded-2xl border border-border bg-secondary/50 md:h-80 md:w-80"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div
                      className="mb-4 font-mono text-6xl font-bold text-primary"
                      style={{ textShadow: "0 0 30px rgba(0, 212, 255, 0.4)" }}
                    >
                      5+
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Anos de experiencia
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl bg-neon/5 blur-2xl" />
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
