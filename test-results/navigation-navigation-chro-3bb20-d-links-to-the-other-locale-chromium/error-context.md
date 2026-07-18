# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> navigation chrome >> language switcher is present and links to the other locale
- Location: src/test/navigation.spec.ts:19:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.language-switcher').first()
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for locator('.language-switcher').first()

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- banner:
  - link "Astro Cloudflare":
    - /url: /
  - navigation "Home":
    - list:
      - listitem:
        - link "Home":
          - /url: /
      - listitem:
        - link "About":
          - /url: /about
      - listitem:
        - link "Services":
          - /url: /services
      - listitem:
        - link "Pricing":
          - /url: /pricing
      - listitem:
        - link "Blog":
          - /url: /blog
      - listitem:
        - link "Contact":
          - /url: /contact
  - link "View source on GitHub":
    - /url: https://github.com/milzamsz/astro-cloudflare-starter
  - button "Search site": ⌘K
  - button "Switch to dark mode":
    - img
    - text: Switch to dark mode
- main:
  - paragraph: Marketing Starter
  - heading "Ship a fast marketing site, not a maintenance project" [level=1]
  - paragraph: A production-ready Astro + Cloudflare starter with blog, docs, i18n, and SEO wired in — so you can launch in hours, not weeks.
  - link "Explore services":
    - /url: /services
  - link "Read the blog":
    - /url: /blog
  - paragraph: Why this stack
  - heading "Built for performance and scale" [level=2]
  - paragraph: Everything you need to ship a fast marketing site.
  - tablist "Feature tabs":
    - tab "Performance" [selected]
    - tab "Content"
    - tab "Growth"
  - tabpanel "Performance":
    - heading "Performance" [level=3]
    - paragraph: A lightweight, static-first stack that ships minimal JavaScript and renders from Cloudflare's edge network.
    - list:
      - listitem: Static-first rendering by default
      - listitem: Zero-JS islands architecture
      - listitem: Edge delivery with smart caching
  - heading "Powered by a modern stack" [level=2]
  - list:
    - listitem:
      - img
      - text: Astro 7.0.x
    - listitem:
      - img
      - text: Tailwind CSS 4.x
    - listitem:
      - img
      - text: Cloudflare Pages
  - definition: 55+
  - term: Pages
  - definition: 100%
  - term: Static-first
  - definition: A11y
  - term: WCAG AA
  - text: Astro Cloudflare Tailwind
  - heading "Perfect Lighthouse scores" [level=2]
  - paragraph: Target scores, verified with Lighthouse — optimized out of the box for performance, accessibility, and SEO.
  - list:
    - listitem:
      - strong: "100"
      - text: Performance
    - listitem:
      - strong: "100"
      - text: Accessibility
    - listitem:
      - strong: "100"
      - text: Best Practices
    - listitem:
      - strong: "100"
      - text: SEO
  - heading "Frequently asked questions" [level=2]
  - group: Is this multilanguage-ready?
  - group: Is SEO handled out of the box?
  - group: Where does it deploy?
  - group: How do I manage content?
  - paragraph: Get started
  - heading "Ready to build your site?" [level=2]
  - paragraph: Explore the services or dive into the docs — the whole stack is ready to go.
  - link "Explore services":
    - /url: /services
  - link "Read the docs":
    - /url: /docs
- contentinfo:
  - link "Astro Cloudflare":
    - /url: /
  - paragraph: Marketing, blog, and docs starter built with Astro and Cloudflare Pages — multilanguage-ready
  - heading "Services" [level=2]
  - list:
    - listitem:
      - link "Services":
        - /url: /services
    - listitem:
      - link "Pricing":
        - /url: /pricing
  - heading "Contact" [level=2]
  - list:
    - listitem:
      - link "Privacy Policy":
        - /url: /privacy
    - listitem:
      - link "Terms & Conditions":
        - /url: /terms
  - heading "Social" [level=2]
  - list:
    - listitem:
      - link "GitHub":
        - /url: https://github.com/milzamsz/astro-cloudflare-starter
        - img
        - text: GitHub
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/in/milzamsz/
        - img
        - text: LinkedIn
    - listitem:
      - link "Email":
        - /url: mailto:milzamsz@gmail.com
        - img
        - text: Email
  - paragraph: © 2026 Astro Cloudflare
  - link "Privacy Policy":
    - /url: /privacy
  - link "Terms & Conditions":
    - /url: /terms
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("navigation chrome", () => {
  4  |   test("homepage loads with nav links", async ({ page }) => {
  5  |     test.setTimeout(60_000);
  6  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  7  |     await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
  8  |     // Positive proof we're on this site, not a colliding dev server on 4321
  9  |     await expect(page.locator(".logo").first()).toHaveAttribute(
  10 |       "aria-label",
  11 |       "Astro Cloudflare",
  12 |       { timeout: 30_000 },
  13 |     );
  14 |     await expect(page.locator(".header__list a").first()).toBeVisible({
  15 |       timeout: 30_000,
  16 |     });
  17 |   });
  18 | 
  19 |   test("language switcher is present and links to the other locale", async ({
  20 |     page,
  21 |   }) => {
  22 |     test.setTimeout(60_000);
  23 |     await page.goto("/", { waitUntil: "domcontentloaded" });
  24 |     const switcher = page.locator(".language-switcher").first();
> 25 |     await expect(switcher).toBeVisible({ timeout: 30_000 });
     |                            ^ Error: expect(locator).toBeVisible() failed
  26 |     const href = await switcher.getAttribute("href");
  27 |     expect(href).toBeTruthy();
  28 |   });
  29 | 
  30 |   test("dark mode toggle flips the html dark class", async ({ page }) => {
  31 |     test.setTimeout(60_000);
  32 |     await page.goto("/", { waitUntil: "domcontentloaded" });
  33 |     const toggle = page.locator("[data-theme-toggle]").first();
  34 |     await expect(toggle).toBeVisible({ timeout: 30_000 });
  35 |     const before = await page.evaluate(() =>
  36 |       document.documentElement.classList.contains("dark"),
  37 |     );
  38 |     await toggle.click();
  39 |     const after = await page.evaluate(() =>
  40 |       document.documentElement.classList.contains("dark"),
  41 |     );
  42 |     expect(after).toBe(!before);
  43 |   });
  44 | 
  45 |   test("Ctrl+K opens the search modal", async ({ page }) => {
  46 |     test.setTimeout(60_000);
  47 |     await page.goto("/", { waitUntil: "domcontentloaded" });
  48 |     await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
  49 |     await page.keyboard.press("Control+k");
  50 |     const dialog = page.locator("#search-modal").first();
  51 |     await expect(dialog).toBeVisible({ timeout: 30_000 });
  52 |     await page.keyboard.press("Escape");
  53 |     await expect(dialog).not.toBeVisible({ timeout: 30_000 });
  54 |   });
  55 | 
  56 |   test("mobile menu toggle opens the panel", async ({ page }) => {
  57 |     test.setTimeout(60_000);
  58 |     await page.setViewportSize({ width: 375, height: 800 });
  59 |     await page.goto("/", { waitUntil: "domcontentloaded" });
  60 |     const toggle = page.locator("[data-menu-toggle]").first();
  61 |     await expect(toggle).toBeVisible({ timeout: 30_000 });
  62 |     await toggle.click();
  63 |     await expect(toggle).toHaveAttribute("aria-expanded", "true", {
  64 |       timeout: 30_000,
  65 |     });
  66 |   });
  67 | });
  68 | 
```