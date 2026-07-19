import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getEquivalentPath, hasEquivalent } from "../../i18n/switcher";

const originalEnv = { ...import.meta.env };

describe("getEquivalentPath", () => {
  beforeEach(() => {
    import.meta.env.BASE_URL = "/";
  });

  afterEach(() => {
    import.meta.env.BASE_URL = originalEnv.BASE_URL ?? "/";
  });

  it("switches from English root to Italian root", () => {
    expect(getEquivalentPath("/", "it")).toBe("/it/");
  });

  it("switches from Italian root back to English root", () => {
    expect(getEquivalentPath("/it/", "en")).toBe("/");
  });

  it("switches from Italian root (no trailing slash) to English root", () => {
    expect(getEquivalentPath("/it", "en")).toBe("/");
  });

  it("switches from English services page to Italian", () => {
    expect(getEquivalentPath("/services", "it")).toBe("/it/services");
  });

  it("switches from Italian services page to English", () => {
    expect(getEquivalentPath("/it/services", "en")).toBe("/services");
  });
});

describe("getEquivalentPath with base path", () => {
  beforeEach(() => {
    import.meta.env.BASE_URL = "/ml-move/";
  });

  afterEach(() => {
    import.meta.env.BASE_URL = originalEnv.BASE_URL ?? "/";
  });

  it("switches from English root to Italian root", () => {
    expect(getEquivalentPath("/ml-move/", "it")).toBe("/ml-move/it/");
  });

  it("switches from Italian root back to English root", () => {
    expect(getEquivalentPath("/ml-move/it/", "en")).toBe("/ml-move/");
  });

  it("switches from English services to Italian", () => {
    expect(getEquivalentPath("/ml-move/services", "it")).toBe("/ml-move/it/services");
  });

  it("switches from Italian services to English", () => {
    expect(getEquivalentPath("/ml-move/it/services", "en")).toBe("/ml-move/services");
  });
});

describe("hasEquivalent", () => {
  beforeEach(() => {
    import.meta.env.BASE_URL = "/";
  });

  afterEach(() => {
    import.meta.env.BASE_URL = originalEnv.BASE_URL ?? "/";
  });

  it("returns true for root path", () => {
    expect(hasEquivalent("/")).toBe(true);
  });

  it("returns true for Italian root path", () => {
    expect(hasEquivalent("/it/")).toBe(true);
  });

  it("returns false for non-equivalent paths", () => {
    expect(hasEquivalent("/services")).toBe(false);
  });

  it("returns false for Italian non-equivalent paths", () => {
    expect(hasEquivalent("/it/services")).toBe(false);
  });
});
