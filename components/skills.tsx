"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

const frontEnd = ["React", "Next.js", "TypeScript", "Three.js", "Vue.js", "Tailwind CSS", "HTML/CSS"]

const groups = [
  { title: "Design", items: ["Figma", "Photoshop", "Adobe Illustrator", "InDesign"] },
  { title: "Ferramentas", items: ["Git", "Vite", "GrapesJS", "WordPress + Elementor"] },
  {
    title: "Princípios",
    items: ["Acessibilidade", "Performance", "Responsividade", "Pixel-perfect"],
  },
]

function Cell({
  children,
  className,
  index,
}: {
  children: React.ReactNode
  className?: string
  index: number
}) {
  return (
    <motion.div
      className={cn("rounded-2xl border border-border p-6 md:p-8", className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="stack" className="px-gutter py-24 md:py-40">
      <SectionHeading index="04" title="Stack" />

      <div className="grid gap-4 md:grid-cols-6">
        <Cell index={0} className="bg-card md:col-span-4">
          <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Front-End
          </h3>
          <ul className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-4xl font-medium tracking-[-0.03em] md:text-6xl">
            {frontEnd.map((item, i) => (
              <li key={item} className="flex items-baseline gap-4">
                <span className="transition-colors hover:text-lime">{item}</span>
                {i < frontEnd.length - 1 && (
                  <span aria-hidden="true" className="font-serif font-normal italic text-muted-foreground">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Cell>

        <Cell
          index={1}
          className="flex flex-col justify-between gap-10 border-lime bg-lime text-primary-foreground md:col-span-2"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">Diferencial</p>
          <p className="text-3xl font-medium leading-tight tracking-[-0.03em]">
            Design <span className="font-serif italic">→</span> código.
            <span className="mt-3 block text-base font-normal leading-relaxed tracking-normal opacity-80">
              Anos de design gráfico antes do front-end: leio um layout no Figma e entrego a
              interface fiel, responsiva e acessível.
            </span>
          </p>
        </Cell>

        {groups.map((group, i) => (
          <Cell key={group.title} index={i + 2} className="bg-card md:col-span-2">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {group.title}
            </h3>
            <ul className="divide-y divide-border">
              {group.items.map((item) => (
                <li key={item} className="flex items-center justify-between py-3 text-lg">
                  {item}
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lime/70" />
                </li>
              ))}
            </ul>
          </Cell>
        ))}
      </div>
    </section>
  )
}
