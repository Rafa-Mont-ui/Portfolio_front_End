"use client"

import { useEffect, useState } from "react"
import { site } from "@/lib/site"

const formatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
})

export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()))
    update()
    const id = window.setInterval(update, 15_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--"} BRT
    </span>
  )
}
