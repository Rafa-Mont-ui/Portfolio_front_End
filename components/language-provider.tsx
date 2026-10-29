"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { translate, type Locale, type Translatable } from "@/lib/i18n"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const STORAGE_KEY = "locale"

const titles: Record<Locale, string> = {
  pt: "Rafael Monteiro — Desenvolvedor Front-End",
  en: "Rafael Monteiro — Front-End Developer",
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (text: Translatable) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

// Escolha salva no botão da navbar; sem ela, segue o idioma do navegador
function preferredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "pt" || stored === "en") return stored
  } catch {}
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // O HTML estático sai em português; na hidratação já troca para o idioma preferido
  const [locale, setLocaleState] = useState<Locale>("pt")

  useLayoutEffect(() => {
    setLocaleState(preferredLocale())
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en"
    // Os textos mudam de altura entre idiomas: recalcula as posições dos ScrollTriggers
    ScrollTrigger.refresh()

    // O Next reescreve o <title> do metadata depois da hidratação; mantém o do idioma atual
    const applyTitle = () => {
      if (document.title !== titles[locale]) document.title = titles[locale]
    }
    applyTitle()
    const observer = new MutationObserver(applyTitle)
    observer.observe(document.head, { subtree: true, childList: true, characterData: true })
    return () => observer.disconnect()
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }, [])

  const value = useMemo(
    () => ({ locale, setLocale, t: (text: Translatable) => translate(text, locale) }),
    [locale, setLocale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage precisa estar dentro de <LanguageProvider>")
  return context
}
