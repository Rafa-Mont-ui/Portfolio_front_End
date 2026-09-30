"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"

const experiences = [
  {
    period: "2026 — Presente",
    role: "Desenvolvedor Front-End",
    company: "Freelancer",
    description:
      "Criação de sites e interfaces web para empresas e profissionais, do layout no Figma ao deploy, com foco em performance, acessibilidade e conversão.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    period: "2026",
    role: "Desenvolvedor Web",
    company: "Larafy",
    description:
      "Desenvolvimento de interfaces e aplicações web. Atuação em projetos de front-end com foco em experiência do usuário e qualidade de código.",
    techs: ["React", "TypeScript", "Front-End"],
  },
  {
    period: "Dez 2025 — Jan 2026",
    role: "Estagiário de Desenvolvimento Web",
    company: "JVM Webmarketing",
    description:
      "Desenvolvimento de páginas web utilizando React, TypeScript e Styled Components. Atuação na área de engenharia e suporte técnico.",
    techs: ["React", "TypeScript", "Styled Components"],
  },
  {
    period: "Jun 2025 — Ago 2025",
    role: "Analista Web Design Junior",
    company: "Groner",
    description:
      "Desenvolvimento de propostas comerciais através do GrapesJS usando HTML, CSS e JavaScript. Criação visual das propostas através do Figma.",
    techs: ["HTML", "CSS", "JavaScript", "GrapesJS", "Figma"],
  },
  {
    period: "Jul 2024 — Out 2024",
    role: "Analista de Suporte N1",
    company: "Connect Trust Tecnologia",
    description:
      "Atendimento remoto a clientes, configuração de certificados digitais, integração de máquinas ao domínio, instalação de softwares e VPN, mapeamento de rede e manutenção de computadores.",
    techs: ["Suporte Técnico", "Redes", "VPN"],
  },
  {
    period: "Abr 2024 — Mai 2024",
    role: "Arte Finalista",
    company: "DPM Digital",
    description:
      "Criação de artes, refile de materiais impressos e atendimento ao cliente. Experiência em comunicação visual e gráfica.",
    techs: ["Design Gráfico", "InDesign", "Photoshop"],
  },
  {
    period: "Ago 2022 — Dez 2022",
    role: "Estagiário de Design",
    company: "Inspira Rede de Educadores",
    description:
      "Diagramação de provas no InDesign, tratamento de imagens no Photoshop e organização de documentos digitais.",
    techs: ["InDesign", "Photoshop", "Design"],
  },
]

export function Experience() {
  return (
    <section id="experiencia" className="px-gutter py-24 md:py-40">
      <SectionHeading index="03" title="Experiência" aside="2022 — Hoje" />

      <ol className="border-b border-border">
        {experiences.map((exp, i) => (
          <motion.li
            key={`${exp.company}-${exp.period}`}
            className="group relative isolate border-t border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Preenchimento que sobe no hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
            />

            <div className="grid gap-3 py-8 transition-[padding,color] duration-500 group-hover:text-primary-foreground md:grid-cols-12 md:gap-6 md:group-hover:px-6">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-primary-foreground/70 md:col-span-2 md:pt-2">
                {exp.period}
              </span>

              <div className="md:col-span-6">
                <h3 className="text-2xl font-medium tracking-[-0.02em] md:text-4xl">
                  {exp.role}
                </h3>
                <p className="mt-1 font-serif text-xl italic text-lime transition-colors group-hover:text-primary-foreground md:text-2xl">
                  {exp.company}
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/80">
                  {exp.description}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                  {exp.techs.join(" · ")}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
