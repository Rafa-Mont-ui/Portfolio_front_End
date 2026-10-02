import { Accessibility, Blocks, Gauge, MonitorSmartphone, Ruler, type LucideIcon } from "lucide-react"
import { brandPaths } from "@/lib/brand-icons"
import { cn } from "@/lib/utils"

type BrandKey = keyof typeof brandPaths

// Ícones da Adobe saíram do Simple Icons; usamos o selo clássico dos apps
const adobeBadges = {
  photoshop: { letters: "Ps", hex: "#31A8FF" },
  illustrator: { letters: "Ai", hex: "#FF9A00" },
  indesign: { letters: "Id", hex: "#FF3366" },
} as const

const lucideIcons = {
  grapesjs: Blocks,
  accessibility: Accessibility,
  performance: Gauge,
  responsive: MonitorSmartphone,
  pixel: Ruler,
} satisfies Record<string, LucideIcon>

export type TechIconName = BrandKey | keyof typeof adobeBadges | keyof typeof lucideIcons

/** Cor da marca usada no hover (marcas pretas viram creme no fundo escuro). */
export function brandColor(name: TechIconName) {
  if (name in brandPaths) {
    const hex = brandPaths[name as BrandKey].hex
    return hex === "#000000" ? "var(--foreground)" : hex
  }
  if (name in adobeBadges) return adobeBadges[name as keyof typeof adobeBadges].hex
  return "var(--lime)"
}

export function TechIcon({ name, className }: { name: TechIconName; className?: string }) {
  const classes = cn("shrink-0", className)

  if (name in brandPaths) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={classes}>
        <path d={brandPaths[name as BrandKey].path} />
      </svg>
    )
  }

  if (name in adobeBadges) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={classes}>
        <rect x="1" y="1" width="22" height="22" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <text
          x="12"
          y="16.6"
          textAnchor="middle"
          fill="currentColor"
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="-0.4"
          fontFamily="var(--font-sans), system-ui, sans-serif"
        >
          {adobeBadges[name as keyof typeof adobeBadges].letters}
        </text>
      </svg>
    )
  }

  const Icon = lucideIcons[name as keyof typeof lucideIcons]
  return <Icon aria-hidden="true" strokeWidth={1.75} className={classes} />
}
