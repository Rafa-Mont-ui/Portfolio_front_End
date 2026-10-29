"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { SectionHeading } from "@/components/ui/section-heading"
import type { Localized, Translatable } from "@/lib/i18n"

interface Job {
  period: Localized
  role: Localized
  company: string
  description: Localized
  techs: Translatable[]
}

const experiences: Job[] = [
  {
    period: { pt: "Fev 2026 — Presente", en: "Feb 2026 — Present" },
    role: { pt: "Desenvolvedor Front-End", en: "Front-End Developer" },
    company: "Freelancer",
    description: {
      pt: "Criação de sites e interfaces web para empresas e profissionais, do layout no Figma ao deploy, com foco em performance, acessibilidade e conversão.",
      en: "Building websites and web interfaces for companies and professionals, from the Figma layout to deployment, with a focus on performance, accessibility and conversion.",
    },
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    period: { pt: "Fev 2026 — Out 2026", en: "Feb 2026 — Oct 2026" },
    role: { pt: "Desenvolvedor Web", en: "Web Developer" },
    company: "Larafy",
    description: {
      pt: "Desenvolvimento de interfaces e aplicações web. Atuação em projetos de front-end com foco em experiência do usuário e qualidade de código.",
      en: "Development of web interfaces and applications, working on front-end projects focused on user experience and code quality.",
    },
    techs: ["React", "TypeScript", "Front-End"],
  },
  {
    period: { pt: "Dez 2025 — Jan 2026", en: "Dec 2025 — Jan 2026" },
    role: { pt: "Estagiário de Desenvolvimento Web", en: "Web Development Intern" },
    company: "JVM Webmarketing",
    description: {
      pt: "Desenvolvimento de páginas web utilizando React, TypeScript e Styled Components. Atuação na área de engenharia e suporte técnico.",
      en: "Built web pages with React, TypeScript and Styled Components, working across engineering and technical support.",
    },
    techs: ["React", "TypeScript", "Styled Components"],
  },
  {
    period: { pt: "Jun 2025 — Ago 2025", en: "Jun 2025 — Aug 2025" },
    role: { pt: "Analista Web Design Junior", en: "Junior Web Design Analyst" },
    company: "Groner",
    description: {
      pt: "Desenvolvimento de propostas comerciais através do GrapesJS usando HTML, CSS e JavaScript. Criação visual das propostas através do Figma.",
      en: "Built sales proposals in GrapesJS using HTML, CSS and JavaScript, with the visual design of each proposal created in Figma.",
    },
    techs: ["HTML", "CSS", "JavaScript", "GrapesJS", "Figma"],
  },
  {
    period: { pt: "Jul 2024 — Out 2024", en: "Jul 2024 — Oct 2024" },
    role: { pt: "Analista de Suporte N1", en: "Tier 1 Support Analyst" },
    company: "Connect Trust Tecnologia",
    description: {
      pt: "Atendimento remoto a clientes, configuração de certificados digitais, integração de máquinas ao domínio, instalação de softwares e VPN, mapeamento de rede e manutenção de computadores.",
      en: "Remote customer support, digital certificate setup, joining machines to the domain, software and VPN installation, network mapping and computer maintenance.",
    },
    techs: [{ pt: "Suporte Técnico", en: "Technical Support" }, { pt: "Redes", en: "Networking" }, "VPN"],
  },
  {
    period: { pt: "Abr 2024 — Mai 2024", en: "Apr 2024 — May 2024" },
    role: { pt: "Arte Finalista", en: "Production Artist" },
    company: "DPM Digital",
    description: {
      pt: "Criação de artes, refile de materiais impressos e atendimento ao cliente. Experiência em comunicação visual e gráfica.",
      en: "Artwork creation, trimming of printed materials and customer service, with hands-on experience in visual communication and print.",
    },
    techs: [{ pt: "Design Gráfico", en: "Graphic Design" }, "InDesign", "Photoshop"],
  },
  {
    period: { pt: "Ago 2022 — Dez 2022", en: "Aug 2022 — Dec 2022" },
    role: { pt: "Estagiário de Design", en: "Design Intern" },
    company: "Inspira Rede de Educadores",
    description: {
      pt: "Diagramação de provas no InDesign, tratamento de imagens no Photoshop e organização de documentos digitais.",
      en: "Exam layout in InDesign, image editing in Photoshop and organization of digital documents.",
    },
    techs: ["InDesign", "Photoshop", "Design"],
  },
]

export function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experiencia" className="px-gutter py-24 md:py-40">
      <SectionHeading
        index="03"
        title={t({ pt: "Experiência", en: "Experience" })}
        aside={t({ pt: "2022 — Hoje", en: "2022 — Present" })}
      />

      <ol className="border-b border-border">
        {experiences.map((exp, i) => (
          <motion.li
            key={`${exp.company}-${exp.period.pt}`}
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
                {t(exp.period)}
              </span>

              <div className="md:col-span-6">
                <h3 className="text-2xl font-medium tracking-[-0.02em] md:text-4xl">
                  {t(exp.role)}
                </h3>
                <p className="mt-1 font-serif text-xl italic text-lime transition-colors group-hover:text-primary-foreground md:text-2xl">
                  {exp.company}
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/80">
                  {t(exp.description)}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                  {exp.techs.map(t).join(" · ")}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
