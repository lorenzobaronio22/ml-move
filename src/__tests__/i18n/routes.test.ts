import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { localePrefix, resolveRoute, stripLocale, detectLocale } from "../../i18n/routes";

// Store original env to restore after tests
const originalEnv = { ...import.meta.env };

describe("localePrefix", () => {
  it("returns empty string for the default locale (en)", () => {
    expect(localePrefix("en")).toBe("");
  });

  it("returns /it for the Italian locale", () => {
    expect(localePrefix("it")).toBe("/it");
  });
});

describe("resolveRoute", () => {
  beforeEach(() => {
    import.meta.env.BASE_URL = "/";
  });

  afterEach(() => {
    import.meta.env.BASE_URL = originalEnv.BASE_URL ?? "/";
  });

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

describe("resolveRoute with base path", () => {
  beforeEach(() => {
    import.meta.env.BASE_URL = "/ml-move/";
  });

  afterEach(() => {
    import.meta.env.BASE_URL = originalEnv.BASE_URL ?? "/";
  });

  it("includes base path for default locale", () => {
    expect(resolveRoute("en", "/services")).toBe("/ml-move/services");
  });

  it("includes base path for non-default locale", () => {
    expect(resolveRoute("it", "/services")).toBe("/ml-move/it/services");
  });

  it("includes base path for root default locale", () => {
    expect(resolveRoute("en", "/")).toBe("/ml-move/");
  });

  it("includes base path for root non-default locale", () => {
    expect(resolveRoute("it", "/")).toBe("/ml-move/it/");
  });
});

describe("stripLocale", () => {
  beforeEach(() => {
    import.meta.env.BASE_URL = "/";
  });

  afterEach(() => {
    import.meta.env.BASE_URL = originalEnv.BASE_URL ?? "/";
  });

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

describe("stripLocale with base path", () => {
  beforeEach(() => {
    import.meta.env.BASE_URL = "/ml-move/";
  });

  afterEach(() => {
    import.meta.env.BASE_URL = originalEnv.BASE_URL ?? "/";
  });

  it("strips base path and locale prefix", () => {
    expect(stripLocale("/ml-move/it/services")).toBe("/services");
  });

  it("strips base path and returns root for Italian root", () => {
    expect(stripLocale("/ml-move/it/")).toBe("/");
  });

  it("strips base path and returns root for default locale", () => {
    expect(stripLocale("/ml-move/")).toBe("/");
  });

  it("returns content path unchanged for non-localized paths", () => {
    expect(stripLocale("/ml-move/services")).toBe("/services");
  });
});

describe("detectLocale", () => {
  beforeEach(() => {
    import.meta.env.BASE_URL = "/";
  });

  afterEach(() => {
    import.meta.env.BASE_URL = originalEnv.BASE_URL ?? "/";
  });

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

describe("detectLocale with base path", () => {
  beforeEach(() => {
    import.meta.env.BASE_URL = "/ml-move/";
  });

  afterEach(() => {
    import.meta.env.BASE_URL = originalEnv.BASE_URL ?? "/";
  });

  it("detects Italian locale from base-prefixed path", () => {
    expect(detectLocale("/ml-move/it/services")).toBe("it");
  });

  it("returns default locale for base-prefixed non-localized path", () => {
    expect(detectLocale("/ml-move/services")).toBe("en");
  });

  it("detects Italian from base-prefixed root", () => {
    expect(detectLocale("/ml-move/it/")).toBe("it");
  });
});
