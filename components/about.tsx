"use client"

import { AnimeFadeIn } from "@/components/ui/anime-fade-in"

export function About() {
  return (
    <section id="sobre" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimeFadeIn className="mb-16 flex items-center gap-4">
          <h2 className="font-kode text-lg font-semibold uppercase tracking-widest text-primary md:text-xl">
            Sobre mim
          </h2>
          <div className="h-px flex-1 bg-border" />
        </AnimeFadeIn>

        <div className="grid gap-12 md:grid-cols-2">
          <AnimeFadeIn direction="left" amount={0.3}>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
              iure reprehenderit qui in ea voluptate velit esse quam nihil
              molestiae consequatur.
            </p>
          </AnimeFadeIn>

          <AnimeFadeIn direction="right" amount={0.3} className="flex items-center justify-center">
            <div className="relative">
              <div className="h-72 w-72 rounded-2xl border border-border bg-secondary/50 md:h-80 md:w-80">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div
                      className="mb-4 font-mono text-6xl font-bold text-primary"
                      style={{ textShadow: "0 0 30px rgba(0, 212, 255, 0.4)" }}
                    >
                      5+
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Anos de experiencia
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl bg-neon/5 blur-2xl" />
            </div>
          </AnimeFadeIn>
        </div>
      </div>
    </section>
  )
}
