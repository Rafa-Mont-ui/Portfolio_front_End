"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useLanguage } from "@/components/language-provider"
import { SectionHeading } from "@/components/ui/section-heading"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import type { Localized } from "@/lib/i18n"

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

const statement: Localized = {
  pt: "Venho do design gráfico e hoje escrevo o código das interfaces que desenho: produtos rápidos, acessíveis e com cuidado de pixel.",
  en: "I come from graphic design and now I write the code for the interfaces I design: fast, accessible products crafted down to the pixel.",
}

const bio: Localized<React.ReactNode> = {
  pt: (
    <>
      <p>
        Me chamo Rafael Monteiro, tenho 24 anos. Comecei como estagiário de design na
        Inspira Rede de Educadores e arte-finalista na DPM Digital, migrei para web
        design na Groner, com GrapesJS e Figma, passei pela JVM Webmarketing
        desenvolvendo com React e TypeScript e fui Desenvolvedor Web na Larafy, onde
        construí os sites dos produtos de inteligência tributária do grupo.
      </p>
      <p>
        Hoje atuo como{" "}
        <span className="text-foreground">desenvolvedor front-end freelancer</span>,
        criando sites e interfaces para empresas e profissionais. Essa trajetória me deixa
        confortável nos dois lados: falo Figma e TypeScript com a mesma fluência.
      </p>
    </>
  ),
  en: (
    <>
      <p>
        I&apos;m Rafael Monteiro, 24 years old. I started as a design intern at Inspira
        Rede de Educadores and a production artist at DPM Digital, moved into web design
        at Groner with GrapesJS and Figma, went through JVM Webmarketing building with
        React and TypeScript, and was a Web Developer at Larafy, where I built the
        websites for the group&apos;s tax intelligence products.
      </p>
      <p>
        Today I work as a{" "}
        <span className="text-foreground">freelance front-end developer</span>, building
        websites and interfaces for companies and professionals. This path makes me
        comfortable on both sides: I speak Figma and TypeScript with the same fluency.
      </p>
    </>
  ),
}

const facts = [
  { label: { pt: "Base", en: "Based in" }, value: { pt: "Brasil", en: "Brazil" } },
  { label: { pt: "Foco", en: "Focus" }, value: "React, Next.js, TypeScript" },
  {
    label: { pt: "Agora", en: "Now" },
    value: { pt: "Desenvolvedor front-end freelancer", en: "Freelance front-end developer" },
  },
  {
    label: { pt: "Origem", en: "Background" },
    value: {
      pt: "Design gráfico → Web design → Front-end",
      en: "Graphic design → Web design → Front-end",
    },
  },
]

export function About() {
  const { locale, t } = useLanguage()
  const root = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const el = statementRef.current
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      const split = SplitText.create(el, { type: "words" })
      gsap.fromTo(
        split.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      )

      return () => split.revert()
    },
    // O SplitText reescreve o DOM do parágrafo: a cada idioma ele é recriado (key) e dividido de novo
    { scope: root, dependencies: [locale], revertOnUpdate: true }
  )

  return (
    <section ref={root} id="sobre" className="px-gutter py-24 md:py-40">
      <SectionHeading index="01" title={t({ pt: "Sobre", en: "About" })} />

      <p
        key={locale}
        ref={statementRef}
        className="max-w-[22ch] text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] md:text-6xl lg:max-w-[24ch] lg:text-7xl"
      >
        {t(statement)}
      </p>

      <div className="mt-20 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-6">
        <ScrollReveal className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-5">
          {bio[locale]}
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <dl className="divide-y divide-border border-y border-border">
            {facts.map((fact) => (
              <div key={fact.label.pt} className="grid grid-cols-3 gap-4 py-5">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t(fact.label)}
                </dt>
                <dd className="col-span-2">{t(fact.value)}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  )
}
