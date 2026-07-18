# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.ts >> contact form >> submitting empty leaves the success message hidden
- Location: src/test/contact.spec.ts:15:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#submit-btn')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for locator('#submit-btn')

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
  - paragraph: Contact
  - heading "Contact Us" [level=1]
  - paragraph: We'd love to hear from you.
  - heading "Send us a message" [level=2]
  - paragraph: Have a question or want to work together? Email us directly and we'll get back to you within one business day.
  - link "Email milzamsz@gmail.com":
    - /url: mailto:milzamsz@gmail.com
  - list:
    - listitem: Email hello@example.com
    - listitem: Office Jakarta, Indonesia
    - listitem: Social @astrocloudflare
  - complementary:
    - button "Load interactive map": View map
    - link "View on Google Maps":
      - /url: https://www.google.com/maps/search/?api=1&query=-7.4941954%2C110.8065028
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
  3  | test.describe("contact form", () => {
  4  |   test("contact page renders the form", async ({ page }) => {
  5  |     test.setTimeout(60_000);
  6  |     await page.goto("/contact", { waitUntil: "domcontentloaded" });
  7  |     await expect(page.locator("#contact-form")).toBeVisible({
  8  |       timeout: 30_000,
  9  |     });
  10 |     await expect(page.locator("#name")).toBeVisible({ timeout: 30_000 });
  11 |     await expect(page.locator("#email")).toBeVisible({ timeout: 30_000 });
  12 |     await expect(page.locator("#message")).toBeVisible({ timeout: 30_000 });
  13 |   });
  14 | 
  15 |   test("submitting empty leaves the success message hidden", async ({
  16 |     page,
  17 |   }) => {
  18 |     test.setTimeout(60_000);
  19 |     await page.goto("/contact", { waitUntil: "domcontentloaded" });
> 20 |     await expect(page.locator("#submit-btn")).toBeVisible({ timeout: 30_000 });
     |                                               ^ Error: expect(locator).toBeVisible() failed
  21 |     await page.locator("#submit-btn").click();
  22 |     await expect(page.locator("#form-success")).toBeHidden({ timeout: 30_000 });
  23 |   });
  24 | 
  25 |   test("filling the form keeps the submit button enabled", async ({ page }) => {
  26 |     test.setTimeout(60_000);
  27 |     await page.goto("/contact", { waitUntil: "domcontentloaded" });
  28 |     await expect(page.locator("#name")).toBeVisible({ timeout: 30_000 });
  29 |     await page.locator("#name").fill("Test User");
  30 |     await page.locator("#email").fill("test@example.com");
  31 |     await page
  32 |       .locator("#message")
  33 |       .fill("This is a test message long enough to pass validation.");
  34 |     await expect(page.locator("#submit-btn")).toBeEnabled({ timeout: 30_000 });
  35 |   });
  36 | });
  37 | 
```