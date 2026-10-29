export type Locale = "pt" | "en"

/** Um valor para cada idioma do site. */
export type Localized<T = string> = Record<Locale, T>

/** Texto traduzido, ou uma string que vale para os dois idiomas (nomes, tecnologias...). */
export type Translatable = string | Localized

export function translate(text: Translatable, locale: Locale) {
  return typeof text === "string" ? text : text[locale]
}
