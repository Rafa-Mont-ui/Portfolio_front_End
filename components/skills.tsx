"use client"

import { FadeIn } from "@/components/ui/fade-in"
import { motion } from "framer-motion"

const skills = [
  {
    category: "Front-End",
    items: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Ferramentas",
    items: ["Git", "Figma", "Webpack", "Vite", "Docker", "Storybook"],
  },
  {
    category: "Testes",
    items: ["Jest", "Testing Library", "Cypress", "Playwright", "Vitest"],
  },
  {
    category: "Outros",
    items: ["Node.js", "REST APIs", "GraphQL", "CI/CD", "Agile"],
  },
]

export function Skills() {
  return (
    <section id="habilidades" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 flex items-center gap-4">
          <h2 className="font-kode text-lg font-semibold uppercase tracking-widest text-primary md:text-xl">
            Habilidades
          </h2>
          <div className="h-px flex-1 bg-border" />
        </FadeIn>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_0_24px_rgba(0,212,255,0.06)]"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
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
