"use client"

import { Github, Linkedin, Mail, Send } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { motion } from "framer-motion"

export function Contact() {
  return (
    <section id="contato" className="relative px-6 py-24 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-neon-dim/5 blur-[128px]" />

      <div className="relative mx-auto max-w-6xl">
        <FadeIn className="mb-16 flex items-center gap-4">
          <h2 className="font-kode text-lg font-semibold uppercase tracking-widest text-primary md:text-xl">
            Contato
          </h2>
          <div className="h-px flex-1 bg-border" />
        </FadeIn>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h3 className="mb-4 text-3xl font-bold text-foreground">
              Vamos trabalhar juntos?
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Estou sempre aberto a novos projetos e oportunidades. Se voce tem
              uma ideia em mente ou quer bater um papo sobre tecnologia, entre
              em contato.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:dev@email.com"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">dev@email.com</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">github.com/seuuser</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm">linkedin.com/in/seuuser</span>
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                placeholder="Seu nome"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Conte sobre seu projeto..."
                className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_rgba(0,212,255,0.3)]"
            >
              <Send className="h-4 w-4" />
              Enviar Mensagem
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
