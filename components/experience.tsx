"use client"

import { useGlitchText } from "@/hooks/use-glitch-text"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const experiences = [
  {
    period: "2026 — Presente",
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

export function Experience() {
  const titleText = useGlitchText("Experiência", { initialDelay: 900, pauseDuration: 2500 })

  return (
    <section id="experiencia" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 flex items-center gap-4">
            <h2
              className="font-kode text-lg font-semibold uppercase tracking-widest text-primary md:text-xl"
              style={{
                textShadow: "0 0 40px rgba(0, 212, 255, 0.3)",
                fontFamily: "var(--font-kode-mono), 'Kode Mono', monospace",
              }}
            >
              {titleText}
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </ScrollReveal>

        <motion.div
          className="relative flex flex-col gap-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-[calc(200px+7px)]" />

          {experiences.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              variants={item}
              className="group relative flex flex-col gap-4 md:flex-row"
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
