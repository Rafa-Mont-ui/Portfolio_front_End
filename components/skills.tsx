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
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Skills() {
  const titleText = useGlitchText("Habilidades", { initialDelay: 1100, pauseDuration: 2500 })

  return (
    <section id="habilidades" className="relative px-6 py-24 md:py-32">
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

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((group) => (
            <motion.div
              key={group.category}
              variants={item}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-[0_0_24px_rgba(0,212,255,0.06)]"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                {group.category}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
