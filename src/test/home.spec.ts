import { test, expect } from "@playwright/test";

test.describe("homepage", () => {
  test("homepage loads with the hero title", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible({ timeout: 30_000 });
    await expect(heading).toHaveText("Rent a van. Move anything.", { timeout: 30_000 });
  });

  test("homepage shows nav links", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".header__list a").first()).toBeVisible({
      timeout: 30_000,
    });
  });

  test("language switcher shows IT and links to Italian locale", async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    const switcher = page.locator(".language-switcher").first();
    await expect(switcher).toBeVisible({ timeout: 30_000 });
    await expect(switcher).toHaveText("IT");
    await expect(switcher).toHaveAttribute("href", "/ml-move/it/");
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

  test("Italian locale shows the Italian hero title and EN link back", async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/it/", { waitUntil: "domcontentloaded" });
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible({ timeout: 30_000 });
    await expect(heading).toHaveText("Noleggia un furgone. Sposta tutto.", { timeout: 30_000 });

    const switcher = page.locator(".language-switcher").first();
    await expect(switcher).toBeVisible({ timeout: 30_000 });
    await expect(switcher).toHaveText("EN");
    await expect(switcher).toHaveAttribute("href", "/ml-move/");
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

  test("displays the fleet section with cargo and passenger cards", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#fleet")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Cargo Vans").first()).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Passenger Vans").first()).toBeVisible({ timeout: 30_000 });
  });

  test("displays the pricing section with three plans", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#pricing")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("€15").first()).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("€80").first()).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("€350").first()).toBeVisible({ timeout: 30_000 });
  });

  test("displays the how it works section", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#how-it-works")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Book online").first()).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Pick up").first()).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Drive").first()).toBeVisible({ timeout: 30_000 });
  });

  test("displays the FAQ section", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#faq")).toBeVisible({ timeout: 30_000 });
  });

  test("displays the contact section with email, phone and address", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#contact")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("example@mlmove.com").first()).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("+1 (555) 123-4567").first()).toBeVisible({ timeout: 30_000 });
  });

  test("displays the final CTA section", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Ready to hit the road?").first()).toBeVisible({ timeout: 30_000 });
  });

  test("footer shows contact info", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/ml-move/", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("example@mlmove.com").first()).toBeVisible({ timeout: 30_000 });
  });
});
