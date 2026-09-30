"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LocalTime } from "@/components/ui/local-time"
import { navLinks, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 400 && y > lastY)
      lastY = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
  }, [isOpen])

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,transform] duration-500",
          scrolled
            ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent",
          hidden && !isOpen && "-translate-y-full"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="px-gutter flex h-16 items-center justify-between gap-6">
          <a href="#hero" className="group flex items-baseline gap-1.5 text-sm font-medium">
            <span>{site.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-lime">
              ©{new Date().getFullYear().toString().slice(2)}
            </span>
          </a>

          <div className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground lg:flex">
            <LocalTime />
            <span aria-hidden="true">/</span>
            <span>{site.location}</span>
          </div>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative flex items-baseline gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="font-mono text-[10px] text-lime/70">0{i + 1}</span>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-lime transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsOpen((v) => !v)}
            className="relative z-[60] font-mono text-xs uppercase tracking-widest md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? "Fechar" : "Menu"}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="px-gutter fixed inset-0 z-40 flex flex-col justify-between bg-background pb-10 pt-24 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline gap-3 border-b border-border py-3 text-5xl font-medium tracking-tight"
                  >
                    <span className="font-mono text-xs text-lime">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <LocalTime />
              <a href={`mailto:${site.email}`} className="text-lime">
                E-mail
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
