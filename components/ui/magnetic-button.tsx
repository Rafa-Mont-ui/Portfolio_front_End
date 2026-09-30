"use client"

import { useMagnetic } from "@/hooks/use-magnetic"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  strength?: number
  radius?: number
}

export function MagneticButton({
  className,
  children,
  strength,
  radius,
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>({ strength, radius })

  return (
    <a
      ref={ref}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </a>
  )
}
