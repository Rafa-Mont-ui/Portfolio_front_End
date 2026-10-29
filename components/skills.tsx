"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { SectionHeading } from "@/components/ui/section-heading"
import { TechIcon, brandColor, type TechIconName } from "@/components/ui/tech-icon"
import type { Localized, Translatable } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface StackItem {
  label: Translatable
  icons: TechIconName[]
}

const frontEnd: StackItem[] = [
  { label: "React", icons: ["react"] },
  { label: "Next.js", icons: ["nextjs"] },
  { label: "TypeScript", icons: ["typescript"] },
  { label: "Three.js", icons: ["threejs"] },
  { label: "Vue.js", icons: ["vue"] },
  { label: "Tailwind CSS", icons: ["tailwind"] },
  { label: "HTML/CSS", icons: ["html", "css"] },
]

const groups: { title: Localized; items: StackItem[] }[] = [
  {
    title: { pt: "Design", en: "Design" },
    items: [
      { label: "Figma", icons: ["figma"] },
      { label: "Photoshop", icons: ["photoshop"] },
      { label: "Adobe Illustrator", icons: ["illustrator"] },
      { label: "InDesign", icons: ["indesign"] },
    ],
  },
  {
    title: { pt: "Ferramentas", en: "Tools" },
    items: [
      { label: "Git", icons: ["git"] },
      { label: "Vite", icons: ["vite"] },
      { label: "GrapesJS", icons: ["grapesjs"] },
      { label: "WordPress + Elementor", icons: ["wordpress", "elementor"] },
    ],
  },
  {
    title: { pt: "Princípios", en: "Principles" },
    items: [
      { label: { pt: "Acessibilidade", en: "Accessibility" }, icons: ["accessibility"] },
      { label: "Performance", icons: ["performance"] },
      { label: { pt: "Responsividade", en: "Responsiveness" }, icons: ["responsive"] },
      { label: "Pixel-perfect", icons: ["pixel"] },
    ],
  },
]

/** Ícones do item: neutros por padrão, na cor da marca no hover do item (group). */
function ItemIcons({ icons, className }: { icons: TechIconName[]; className?: string }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      {icons.map((icon) => (
        <span
          key={icon}
          className="text-muted-foreground transition-colors duration-300 group-hover:text-[var(--brand)]"
          style={{ "--brand": brandColor(icon) } as React.CSSProperties}
        >
          <TechIcon name={icon} className={className} />
        </span>
      ))}
    </span>
  )
}

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
  const { t } = useLanguage()

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
              <li key={item.icons.join("-")} className="flex items-baseline gap-4">
                <span className="group inline-flex items-center gap-[0.28em] transition-colors hover:text-lime">
                  <ItemIcons icons={item.icons} className="h-[0.72em] w-[0.72em]" />
                  {t(item.label)}
                </span>
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
          <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
            {t({ pt: "Diferencial", en: "My edge" })}
          </p>
          <p className="text-3xl font-medium leading-tight tracking-[-0.03em]">
            Design <span className="font-serif italic">→</span> {t({ pt: "código.", en: "code." })}
            <span className="mt-3 block text-base font-normal leading-relaxed tracking-normal opacity-80">
              {t({
                pt: "Anos de design gráfico antes do front-end: leio um layout no Figma e entrego a interface fiel, responsiva e acessível.",
                en: "Years of graphic design before front-end: I read a Figma layout and deliver a faithful, responsive and accessible interface.",
              })}
            </span>
          </p>
        </Cell>

        {groups.map((group, i) => (
          <Cell key={group.title.pt} index={i + 2} className="bg-card md:col-span-2">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t(group.title)}
            </h3>
            <ul className="divide-y divide-border">
              {group.items.map((item) => (
                <li key={item.icons.join("-")} className="group flex items-center gap-3 py-3 text-lg">
                  <ItemIcons icons={item.icons} className="h-5 w-5" />
                  {t(item.label)}
                </li>
              ))}
            </ul>
          </Cell>
        ))}
      </div>
    </section>
  )
}
