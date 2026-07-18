import { describe, it, expect } from "vitest";
import { localePrefix, resolveRoute, stripLocale, detectLocale } from "../../i18n/routes";

describe("localePrefix", () => {
  it("returns empty string for the default locale (en)", () => {
    expect(localePrefix("en")).toBe("");
  });

  it("returns /it for the Italian locale", () => {
    expect(localePrefix("it")).toBe("/it");
  });
});

describe("resolveRoute", () => {
  it("resolves a path for the default locale without prefix", () => {
    expect(resolveRoute("en", "/services")).toBe("/services");
  });

  it("prefixes the path for a non-default locale", () => {
    expect(resolveRoute("it", "/services")).toBe("/it/services");
  });

  it("handles root path for default locale", () => {
    expect(resolveRoute("en", "/")).toBe("/");
  });

  it("handles root path for non-default locale", () => {
    expect(resolveRoute("it", "/")).toBe("/it/");
  });

  it("normalizes paths without leading slash", () => {
    expect(resolveRoute("en", "services")).toBe("/services");
  });
});

describe("stripLocale", () => {
  it("returns root for root path", () => {
    expect(stripLocale("/")).toBe("/");
  });

  it("strips /it/ prefix and returns root", () => {
    expect(stripLocale("/it/")).toBe("/");
  });

  it("strips /it prefix and returns root", () => {
    expect(stripLocale("/it")).toBe("/");
  });

  it("returns the path unchanged when no locale prefix is present", () => {
    expect(stripLocale("/services")).toBe("/services");
  });

  it("strips /it from /it/services", () => {
    expect(stripLocale("/it/services")).toBe("/services");
  });

  it("strips /it from /it/services/deep", () => {
    expect(stripLocale("/it/services/deep")).toBe("/services/deep");
  });

  it("leaves /services unchanged (en default, no prefix)", () => {
    expect(stripLocale("/services")).toBe("/services");
  });
});

describe("detectLocale", () => {
  it("returns default locale for root path", () => {
    expect(detectLocale("/")).toBe("en");
  });

  it("detects Italian locale from /it/ path", () => {
    expect(detectLocale("/it/")).toBe("it");
  });

  it("detects Italian locale from /it path", () => {
    expect(detectLocale("/it")).toBe("it");
  });

  it("returns default locale for non-prefixed paths", () => {
    expect(detectLocale("/services")).toBe("en");
  });

  it("detects Italian locale from /it/services path", () => {
    expect(detectLocale("/it/services")).toBe("it");
  });
});
