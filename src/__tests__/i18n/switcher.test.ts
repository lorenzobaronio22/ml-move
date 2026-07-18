import { describe, it, expect } from "vitest";
import { getEquivalentPath, hasEquivalent } from "../../i18n/switcher";

describe("getEquivalentPath", () => {
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

describe("hasEquivalent", () => {
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
