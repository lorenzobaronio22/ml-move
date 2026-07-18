// To add a language: extend this union (e.g. "en" | "id"), add the code to
// SITE_CONFIG.locales, add label/prefix entries below, create a matching
// translations file in src/i18n, and add localized content + [locale] routes.
export type Locale = "en" | "it";

export const SITE_CONFIG = {
  url: "https://ml-move.pages.dev",
  /** Default locale for fallback. */
  defaultLocale: "en" as const,
  /** Supported locales. */
  locales: ["en", "it"] as const,
  /** Human-readable locale labels. */
  localeLabels: {
    en: "English",
    it: "Italiano",
  } as const,
  /** Short locale codes for URL prefixes. */
  localePrefixes: {
    en: "en",
    it: "it",
  } as const,
  /** Site name for metadata and JSON-LD. */
  name: "ml-move",
  /** Short description for metadata. */
  description: "A fast, modern site — multilanguage-ready.",
} as const;
