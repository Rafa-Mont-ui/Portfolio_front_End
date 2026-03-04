const experiences = [
  {
    period: "2023 — Presente",
    role: "Desenvolvedor Front-End Senior",
    company: "TechCorp",
    description:
      "Lideranca tecnica do time de front-end, definindo arquitetura e padroes de codigo. Migracao de aplicacao legada para Next.js com melhoria de 40% na performance.",
    techs: ["React", "Next.js", "TypeScript", "GraphQL"],
  },
  {
    period: "2021 — 2023",
    role: "Desenvolvedor Front-End Pleno",
    company: "StartupX",
    description:
      "Desenvolvimento de features criticas para o produto principal da startup. Implementacao de design system usado por toda a equipe de engenharia.",
    techs: ["Vue.js", "Nuxt", "Tailwind CSS", "Jest"],
  },
  {
    period: "2019 — 2021",
    role: "Desenvolvedor Front-End Junior",
    company: "AgenciaDev",
    description:
      "Criacao de landing pages e interfaces para diversos clientes. Primeiro contato com React e construcao de SPAs modernas.",
    techs: ["React", "JavaScript", "SASS", "WordPress"],
  },
]

export function Experience() {
  return (
    <section id="experiencia" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="font-kode text-lg font-semibold uppercase tracking-widest text-primary md:text-xl">
            Experiencia
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="relative flex flex-col gap-12">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-[calc(200px+7px)]" />

          {experiences.map((exp) => (
            <div key={exp.period} className="group relative flex flex-col gap-4 md:flex-row">
              {/* Period */}
              <div className="flex-shrink-0 md:w-[200px]">
                <span className="font-mono text-xs text-muted-foreground">
                  {exp.period}
                </span>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 md:left-[200px]">
                <div className="relative h-4 w-4 rounded-full border-2 border-primary bg-background transition-shadow group-hover:shadow-[0_0_12px_rgba(0,212,255,0.4)]">
                  <div className="absolute inset-1 rounded-full bg-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="pl-8 md:pl-8">
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.role}
                </h3>
                <p className="mb-3 font-mono text-sm text-primary">
                  {exp.company}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
