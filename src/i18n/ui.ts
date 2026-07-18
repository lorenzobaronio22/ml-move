import type { Locale } from "../lib/site-config";
import en from "./en.json";
import it from "./it.json";

export type TranslationDict = Record<string, string>;

// Add new locales here, e.g. `{ en, it }`, alongside their JSON file.
export const translations: Partial<Record<Locale, TranslationDict>> = {
  en,
  it,
};

/**
 * Get a translated string for the given locale and key.
 * Falls back to the key itself if not found (fail loud during dev).
 */
export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? key;
}
