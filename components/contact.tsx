"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { site } from "@/lib/site"

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section id="contato" className="px-gutter pt-24 md:pt-40">
      <SectionHeading index="05" title="Contato" />

      <ScrollReveal>
        <p className="text-[17vw] font-medium leading-[0.85] tracking-[-0.05em] md:text-[13vw]">
          Vamos
          <br />
          <span className="font-serif font-normal italic tracking-[-0.02em] text-lime">
            conversar?
          </span>
        </p>
      </ScrollReveal>

      <div className="mt-16 grid items-end gap-12 md:mt-24 md:grid-cols-12 md:gap-6">
        <ScrollReveal className="md:col-span-5">
          <p className="mb-8 text-xl leading-snug text-muted-foreground md:text-2xl">
            Tem um projeto, uma vaga ou só quer trocar uma ideia sobre front-end? Me manda
            uma mensagem.
          </p>
          <button
            type="button"
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 border-b border-border pb-2 text-lg transition-colors hover:border-lime md:text-2xl"
            aria-live="polite"
          >
            {site.email}
            {copied ? (
              <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-lime">
                <Check className="h-4 w-4" /> Copiado
              </span>
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-lime" />
            )}
          </button>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="flex justify-start md:col-span-3 md:col-start-7 md:justify-center">
          <MagneticButton
            href={`mailto:${site.email}`}
            strength={0.45}
            radius={180}
            className="flex h-40 w-40 flex-col items-center justify-center gap-1 rounded-full bg-lime text-center text-primary-foreground transition-transform hover:scale-105 md:h-48 md:w-48"
          >
            <ArrowUpRight className="h-6 w-6" />
            <span className="font-medium">Enviar e-mail</span>
          </MagneticButton>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="md:col-span-3 md:col-start-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Redes
          </p>
          <ul className="border-t border-border">
            {site.socials.map((social) => (
              <li key={social.label} className="border-b border-border">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 text-lg transition-colors hover:text-lime"
                >
                  {social.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  )
}
