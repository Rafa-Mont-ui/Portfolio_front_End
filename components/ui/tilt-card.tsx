"use client"

import { forwardRef } from "react"
import { useTilt3d } from "@/hooks/use-tilt-3d"
import { cn } from "@/lib/utils"

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  scale?: number
  glare?: boolean
}

export const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  ({ className, children, max, scale, glare = true, ...props }, _ref) => {
    const { ref, glareRef } = useTilt3d<HTMLDivElement>({ max, scale, glare })

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ willChange: "transform" }}
        {...props}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-screen"
          />
        )}
      </div>
    )
  }
)
TiltCard.displayName = "TiltCard"
