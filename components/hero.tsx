"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowDownRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { MagneticButton } from "@/components/ui/magnetic-button"
import type { Localized } from "@/lib/i18n"

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

const intro: Localized<React.ReactNode> = {
  pt: (
    <>
      Desenvolvedor front-end que transforma design em interfaces{" "}
      <em className="font-serif text-[1.15em] text-lime">rápidas</em>, acessíveis e com
      personalidade.
    </>
  ),
  en: (
    <>
      Front-end developer who turns design into{" "}
      <em className="font-serif text-[1.15em] text-lime">fast</em>, accessible interfaces
      with personality.
    </>
  ),
}

// Three.js só é baixado no navegador, depois do HTML do hero
const HeroObject = dynamic(
  () => import("@/components/ui/hero-object").then((mod) => mod.HeroObject),
  { ssr: false }
)

export function Hero() {
  const { locale, t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line")
      const fades = gsap.utils.toArray<HTMLElement>(".hero-fade")

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([...lines, ...fades], { autoAlpha: 1 })
        return
      }

      const split = SplitText.create(lines, { type: "chars" })
      gsap.set(lines, { autoAlpha: 1 })

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(split.chars, { yPercent: 115, duration: 1.5, stagger: 0.045, delay: 0.15 })
        .fromTo(
          fades,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07 },
          "-=1.1"
        )

      gsap.to(".hero-title", {
        yPercent: -22,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      return () => split.revert()
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="hero"
      className="px-gutter relative flex min-h-[100svh] flex-col pb-8 pt-24"
    >
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="hero-fade invisible inline-flex items-center gap-2.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground">
          <span className="pulse-dot h-2 w-2 rounded-full bg-lime" />
          {t({ pt: "Disponível para novos projetos", en: "Available for new projects" })}
        </div>
        <span className="hero-fade invisible hidden font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground lg:block">
          <span className="text-lime">↳</span> WebGL · Three.js · GLSL
        </span>
        <span className="hero-fade invisible hidden font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:block">
          {t({ pt: "Portfólio", en: "Portfolio" })} — {new Date().getFullYear()}
        </span>
      </div>

      <HeroObject className="pointer-events-none absolute right-[2vw] top-[15%] z-0 aspect-square w-[62vw] max-w-[620px] sm:w-[48vw] md:right-[4vw] md:top-[8%] md:w-[38vw]" />

      <h1
        className="hero-title relative z-10 my-auto py-10 font-medium leading-[0.82] tracking-[-0.045em]"
        aria-label={t({
          pt: "Rafael Monteiro, desenvolvedor front-end",
          en: "Rafael Monteiro, front-end developer",
        })}
      >
        <span className="block overflow-hidden pb-[0.06em]">
          <span className="hero-line invisible block text-[21vw] md:text-[19vw]">Rafael</span>
        </span>
        <span className="block overflow-hidden pb-[0.1em] pr-[0.08em] text-right">
          <span className="hero-line invisible block font-serif text-[21vw] font-normal italic tracking-[-0.02em] text-lime md:text-[19vw]">
            Monteiro
          </span>
        </span>
      </h1>

      <div className="grid gap-8 border-t border-border pt-6 md:grid-cols-12 md:gap-6">
        <p className="hero-fade invisible text-balance text-xl leading-snug md:col-span-5 md:text-2xl">
          {intro[locale]}
        </p>

        <dl className="hero-fade invisible grid grid-cols-2 gap-6 text-sm md:col-span-5 md:col-start-7">
          <div>
            <dt className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {t({ pt: "Especialidade", en: "Specialty" })}
            </dt>
            <dd>React, Next.js &amp; TypeScript</dd>
          </div>
          <div>
            <dt className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {t({ pt: "Atualmente", en: "Currently" })}
            </dt>
            <dd>{t({ pt: "Desenvolvedor freelancer", en: "Freelance developer" })}</dd>
          </div>
        </dl>

        <div className="hero-fade invisible flex items-start md:col-span-1 md:justify-end">
          <MagneticButton
            href="#projetos"
            strength={0.5}
            aria-label={t({ pt: "Ver trabalhos", en: "See work" })}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-primary-foreground transition-transform hover:scale-110"
          >
            <ArrowDownRight className="h-5 w-5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
