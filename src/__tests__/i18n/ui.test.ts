import { describe, it, expect } from "vitest";
import { t, translations } from "../../i18n/ui";

describe("t()", () => {
  it("returns the English string for a known key", () => {
    expect(t("en", "nav.home")).toBe("Home");
  });

  it("returns the Italian string for a known key", () => {
    expect(t("it", "hero.title")).toBe("Noleggia un furgone. Sposta tutto.");
  });

  it("returns the key as fallback when missing", () => {
    expect(t("en", "nonexistent.key")).toBe("nonexistent.key");
  });

  it("exposes all locale dictionaries", () => {
    expect(translations.en).toBeDefined();
    expect(translations.it).toBeDefined();
    expect(Object.keys(translations.en ?? {}).length).toBeGreaterThan(0);
    expect(Object.keys(translations.it ?? {}).length).toBeGreaterThan(0);
  });
});
