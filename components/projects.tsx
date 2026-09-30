"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight, Github } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  title: string
  kind: string
  meta: string
  description: string
  techs: string[]
  live: string
  github?: string
  image: string
}

const projects: Project[] = [
  {
    title: "LaraTAX",
    kind: "Site de produto · SaaS",
    meta: "Larafy — 2026",
    description:
      "Site da plataforma que automatiza o diagnóstico tributário para contadores e tributaristas: download automático de SPED, e-CAC e e-Social, simulações da reforma tributária e painéis de oportunidades de recuperação de crédito.",
    techs: ["Vite", "GSAP", "UI de dashboard"],
    live: "https://novo-site-laratax.vercel.app/",
    image: "/projects/laratax.jpg",
  },
  {
    title: "LaraFy",
    kind: "Site institucional",
    meta: "Larafy — 2026",
    description:
      "Site institucional de planejamento tributário: hero com vídeo, prova social com mais de R$ 1,2 bilhão economizados por setor, carrossel de clientes, ecossistema de serviços e captação de diagnóstico estratégico.",
    techs: ["Next.js", "Tailwind CSS", "GSAP"],
    live: "https://larafy.com.br/",
    image: "/projects/larafy.jpg",
  },
  {
    title: "VitaSlim",
    kind: "Landing page VSL",
    meta: "Teste técnico",
    description:
      "Landing page de Video Sales Letter com produtos, depoimentos e planos. Projeto de teste front-end com foco em conversão e experiência do usuário.",
    techs: ["React", "TypeScript", "Tailwind CSS"],
    live: "https://site-vsl-teste-grupo-six.vercel.app/",
    github: "https://github.com/Rafa-Mont-ui/Site-VSL-Teste-Grupo-Six",
    image: "/projects/vitaslim.jpg",
  },
  {
    title: "Lista de Compras",
    kind: "Aplicação web",
    meta: "Projeto pessoal",
    description:
      "Checklist de mercado interativo para organizar as compras do dia a dia, com adição, marcação e remoção de itens.",
    techs: ["React", "TypeScript"],
    live: "https://lista-mercado-v1.vercel.app/",
    github: "https://github.com/Rafa-Mont-ui/Lista-Mercado-v1",
    image: "/projects/lista-mercado.jpg",
  },
]

export function Projects() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card")

        // Cada card encolhe e escurece enquanto o próximo sobe por cima
        cards.slice(0, -1).forEach((card, i) => {
          gsap.to(card.querySelector(".project-inner"), {
            scale: 0.94,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: `top ${96 + (i + 1) * 20}px`,
              scrub: true,
            },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section ref={root} id="projetos" className="px-gutter py-24 md:py-40">
      <SectionHeading
        index="02"
        title="Trabalhos selecionados"
        aside={`${String(projects.length).padStart(2, "0")} projetos`}
      />

      <div className="flex flex-col gap-6 md:gap-[12vh]">
        {projects.map((project, i) => (
          <article
            key={project.title}
            className="project-card md:sticky"
            style={{ top: `${96 + i * 20}px` }}
          >
            <div className="project-inner origin-top overflow-hidden rounded-2xl border border-border bg-card will-change-transform md:h-[calc(100svh-9rem)]">
              <div className="grid h-full gap-8 p-5 md:grid-cols-12 md:gap-6 md:p-8">
                <div className="flex flex-col md:col-span-4">
                  <div className="mb-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span className="text-lime">{String(i + 1).padStart(2, "0")}</span>
                    <span>{project.meta}</span>
                  </div>

                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {project.kind}
                  </p>
                  <h3 className="mb-6 text-5xl font-medium tracking-[-0.04em] lg:text-6xl">
                    {project.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">{project.description}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex items-center gap-5 md:mt-auto md:pt-8">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-primary-foreground"
                    >
                      Visitar site
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="h-4 w-4" />
                        Código
                      </a>
                    )}
                  </div>
                </div>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Visitar"
                  aria-label={`Abrir ${project.title} em nova aba`}
                  className="group flex min-h-[240px] flex-col overflow-hidden rounded-xl border border-border bg-background md:col-span-8"
                >
                  <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="ml-3 truncate font-mono text-[11px] text-muted-foreground">
                      {new URL(project.live).hostname}
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] flex-1 overflow-hidden md:aspect-auto">
                    <Image
                      src={project.image}
                      alt={`Página inicial do projeto ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
