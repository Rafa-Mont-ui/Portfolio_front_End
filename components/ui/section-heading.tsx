import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  index: string
  title: string
  aside?: React.ReactNode
  className?: string
}

export function SectionHeading({ index, title, aside, className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex items-end justify-between gap-6 border-t border-border pt-5 md:mb-20",
        className
      )}
    >
      <h2 className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-lime">({index})</span>
        {title}
      </h2>
      {aside && (
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {aside}
        </div>
      )}
    </div>
  )
}
