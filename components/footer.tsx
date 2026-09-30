import { LocalTime } from "@/components/ui/local-time"
import { site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="px-gutter mt-24 border-t border-border py-6 md:mt-40">
      <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
          Hora local <LocalTime className="text-foreground" />
        </p>
        <a href="#hero" className="transition-colors hover:text-lime">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}
