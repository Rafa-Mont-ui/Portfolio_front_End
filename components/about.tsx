export function About() {
  return (
    <section id="sobre" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="font-kode text-lg font-semibold uppercase tracking-widest text-primary md:text-xl">
            Sobre mim
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Sou um desenvolvedor front-end com paixao por criar interfaces
              bonitas e funcionais. Com anos de experiencia construindo
              aplicacoes web, domino as tecnologias mais modernas do ecossistema
              JavaScript.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Meu foco principal esta na intersecao entre design e engenharia,
              criando experiencias que nao apenas funcionam perfeitamente, mas
              que encantam os usuarios em cada interacao.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Quando nao estou codando, voce pode me encontrar explorando novas
              tecnologias, contribuindo para projetos open source ou
              compartilhando conhecimento com a comunidade dev.
            </p>
          </div>

          <div className="flex items-center justify-center">
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
          </div>
        </div>
      </div>
    </section>
  )
}
