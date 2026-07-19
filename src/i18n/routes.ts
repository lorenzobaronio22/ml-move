import type { Locale } from "../lib/site-config";
import { SITE_CONFIG } from "../lib/site-config";
import { baseUrl } from "./base";

/**
 * Get the locale-only URL prefix (no base path).
 * Example: localePrefix("en") → ""  |  localePrefix("it") → "/it"
 */
export function localePrefix(locale: Locale): string {
  if (locale === SITE_CONFIG.defaultLocale) return "";
  return `/${locale}`;
}

/**
 * Resolve a full localized route path including base path.
 * Example (base=/ml-move): resolveRoute("en", "/") → "/ml-move/"
 *          resolveRoute("it", "/services") → "/ml-move/it/services"
 */
export function resolveRoute(locale: Locale, path: string): string {
  const base = baseUrl();
  const prefix = localePrefix(locale);
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${prefix}${normalized}`;
}

/**
 * Strip base path and locale prefix from a path to get the content key.
 * Example (base=/ml-move): stripLocale("/ml-move/it/services") → "/services"
 */
export function stripLocale(path: string): string {
  const base = baseUrl();
  const withoutBase = base && path.startsWith(base)
    ? path.slice(base.length) || "/"
    : path;

  for (const loc of SITE_CONFIG.locales) {
    const prefix = localePrefix(loc);
    if (!prefix) continue;
    if (withoutBase === prefix || withoutBase === `${prefix}/`) return "/";
    if (withoutBase.startsWith(`${prefix}/`)) {
      return withoutBase.slice(prefix.length) || "/";
    }
  }
  return withoutBase;
}

/**
 * Detect locale from a path (accounts for base path). Falls back to defaultLocale.
 */
export function detectLocale(path: string): Locale {
  const base = baseUrl();
  const withoutBase = base && path.startsWith(base)
    ? path.slice(base.length) || "/"
    : path;

  for (const loc of SITE_CONFIG.locales) {
    const prefix = localePrefix(loc);
    if (!prefix) continue;
    if (withoutBase === prefix || withoutBase.startsWith(`${prefix}/`)) return loc;
  }
  return SITE_CONFIG.defaultLocale;
}
