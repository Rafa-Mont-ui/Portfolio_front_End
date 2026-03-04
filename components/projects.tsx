"use client"

import { ExternalLink, Github } from "lucide-react"
import { AnimeFadeIn } from "@/components/ui/anime-fade-in"
import { AnimeStaggerIn } from "@/components/ui/anime-stagger-in"

const projects = [
  {
    title: "VitaSlim",
    description:
      "Landing page VSL (Video Sales Letter) com produtos, depoimentos e planos. Projeto de teste front-end com foco em conversão e experiência do usuário.",
    techs: ["TypeScript", "React", "Tailwind CSS"],
    github: "https://github.com/Rafa-Mont-ui/Site-VSL-Teste-Grupo-Six",
    live: "https://site-vsl-teste-grupo-six.vercel.app/",
  },
  {
    title: "Lista de Compras",
    description:
      "Checklist de mercado interativo para organizar suas compras. Aplicação prática para gerenciar itens do dia a dia.",
    techs: ["TypeScript", "React"],
    github: "https://github.com/Rafa-Mont-ui/Lista-Mercado-v1",
    live: "https://lista-mercado-v1.vercel.app/",
  },
]

export function Projects() {
  return (
    <section id="projetos" className="relative px-6 py-24 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-neon/3 blur-[128px]" />

      <div className="relative mx-auto max-w-6xl">
        <AnimeFadeIn className="mb-16 flex items-center gap-4">
          <h2 className="font-kode text-lg font-semibold uppercase tracking-widest text-primary md:text-xl">
            Projetos
          </h2>
          <div className="h-px flex-1 bg-border" />
        </AnimeFadeIn>

        <AnimeStaggerIn className="grid gap-6 md:grid-cols-2" staggerDelay={100}>
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.06)]"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label={`GitHub - ${project.title}`}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label={`Ver projeto - ${project.title}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </AnimeStaggerIn>
      </div>
    </section>
  )
}
