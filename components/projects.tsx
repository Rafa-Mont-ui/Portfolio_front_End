import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Plataforma completa de e-commerce com carrinho, pagamento e dashboard administrativo. Construida com Next.js e Stripe.",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Dashboard Analytics",
    description:
      "Dashboard interativo para visualizacao de dados em tempo real com graficos dinamicos e filtros avancados.",
    techs: ["React", "D3.js", "Node.js", "WebSocket"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Social App",
    description:
      "Aplicativo social com feed em tempo real, sistema de mensagens e notificacoes push. Interface responsiva e acessivel.",
    techs: ["Vue.js", "Firebase", "Tailwind CSS", "PWA"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Design System",
    description:
      "Biblioteca de componentes reutilizaveis com documentacao completa no Storybook. Usado em mais de 10 projetos internos.",
    techs: ["React", "Storybook", "TypeScript", "CSS Modules"],
    github: "https://github.com",
    live: "https://example.com",
  },
]

export function Projects() {
  return (
    <section id="projetos" className="relative px-6 py-24 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-neon/3 blur-[128px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="font-kode text-lg font-semibold uppercase tracking-widest text-primary md:text-xl">
            Projetos
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.06)]"
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
        </div>
      </div>
    </section>
  )
}
