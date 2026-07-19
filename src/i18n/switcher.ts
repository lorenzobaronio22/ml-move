import type { Locale } from "../lib/site-config";
import { stripLocale, resolveRoute } from "./routes";

/**
 * Known route map for equivalent content across locales.
 * Key: content path (no locale prefix). Maps to content pair.
 * Add entries here as new pages are created.
 */
const EQUIVALENT_ROUTES: Record<string, boolean> = {
  "/": true,
};

/**
 * Resolve the equivalent localized path for a given current path
 * and target locale (includes base path).
 *
 * Example (base=/ml-move): getEquivalentPath("/ml-move/", "it") → "/ml-move/it/"
 */
export function getEquivalentPath(
  currentPath: string,
  targetLocale: Locale,
): string {
  const contentPath = stripLocale(currentPath);

  if (EQUIVALENT_ROUTES[contentPath]) {
    return resolveRoute(targetLocale, contentPath);
  }

  return resolveRoute(targetLocale, contentPath);
}

/**
 * Check if a route has equivalent content in both locales.
 */
export function hasEquivalent(path: string): boolean {
  const contentPath = stripLocale(path);
  return contentPath in EQUIVALENT_ROUTES;
}
