"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SectionHeading } from "@/components/ui/section-heading"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

const facts = [
  { label: "Base", value: "Brasil" },
  { label: "Foco", value: "React, Next.js, TypeScript" },
  { label: "Agora", value: "Desenvolvedor front-end freelancer" },
  { label: "Origem", value: "Design gráfico → Web design → Front-end" },
]

export function About() {
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
    { scope: root }
  )

  return (
    <section ref={root} id="sobre" className="px-gutter py-24 md:py-40">
      <SectionHeading index="01" title="Sobre" />

      <p
        ref={statementRef}
        className="max-w-[22ch] text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] md:text-6xl lg:max-w-[24ch] lg:text-7xl"
      >
        Venho do design gráfico e hoje escrevo o código das interfaces que desenho: produtos
        rápidos, acessíveis e com cuidado de pixel.
      </p>

      <div className="mt-20 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-6">
        <ScrollReveal className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-5">
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
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <dl className="divide-y divide-border border-y border-border">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-3 gap-4 py-5">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="col-span-2">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  )
}
