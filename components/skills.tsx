"use client"

import { useGlitchText } from "@/hooks/use-glitch-text"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const skills = [
  {
    category: "Front-End",
    items: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Ferramentas",
    items: ["Git", "Figma", "Vite"],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export function Skills() {
  const titleText = useGlitchText("Habilidades", { initialDelay: 1100, pauseDuration: 2500 })

  return (
    <section id="habilidades" className="relative overflow-hidden px-6 py-12 md:py-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-neon-dim/5 blur-[128px]" />

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

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((group) => (
            <motion.div
              key={group.category}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-[0_0_40px_-10px_rgba(0,212,255,0.15)]"
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              {/* Subtle gradient top accent */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <h3 className="mb-6 font-mono text-sm font-semibold uppercase tracking-widest text-primary">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-sm text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
