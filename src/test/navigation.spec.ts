import { test, expect } from "@playwright/test";

test.describe("navigation chrome", () => {
  test("homepage loads with nav links", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
    await expect(page.locator(".header__list a").first()).toBeVisible({
      timeout: 30_000,
    });
  });

  test("switches locale back and forth", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    const switcher = page.locator(".language-switcher").first();
    await expect(switcher).toBeVisible({ timeout: 30_000 });
    await expect(switcher).toHaveText("IT");
    await expect(switcher).toHaveAttribute("hreflang", "it");
    await expect(switcher).toHaveAttribute("href", "/ml-move/it/");

    await switcher.click();
    await page.waitForURL("/ml-move/it/", { timeout: 30_000 });
    await expect(page.locator("h1").first()).toHaveText("Ciao ML Move!", {
      timeout: 30_000,
    });

    const back = page.locator(".language-switcher").first();
    await expect(back).toBeVisible({ timeout: 30_000 });
    await expect(back).toHaveText("EN");
    await expect(back).toHaveAttribute("hreflang", "en");
    await expect(back).toHaveAttribute("href", "/ml-move/");

    await back.click();
    await page.waitForURL("/ml-move/", { timeout: 30_000 });
    await expect(page.locator("h1").first()).toHaveText("Hello ML Move!", {
      timeout: 30_000,
    });
  });

  test("dark mode toggle flips the html dark class", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    const toggle = page.locator("[data-theme-toggle]").first();
    await expect(toggle).toBeVisible({ timeout: 30_000 });
    const before = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    await toggle.click();
    const after = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    expect(after).toBe(!before);
  });

  test("Ctrl+K opens the search modal", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
    await page.keyboard.press("Control+k");
    const dialog = page.locator("#search-modal").first();
    await expect(dialog).toBeVisible({ timeout: 30_000 });
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible({ timeout: 30_000 });
  });

  test("mobile menu toggle opens the panel", async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    const toggle = page.locator("[data-menu-toggle]").first();
    await expect(toggle).toBeVisible({ timeout: 30_000 });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true", {
      timeout: 30_000,
    });
  });
});
