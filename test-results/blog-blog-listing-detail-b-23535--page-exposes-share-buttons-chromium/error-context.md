# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog.spec.ts >> blog listing + detail >> blog detail page exposes share buttons
- Location: src/test/blog.spec.ts:21:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('.share-buttons button').first()
Expected: visible
Received: hidden
Timeout:  30000ms

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for locator('.share-buttons button').first()
    63 × locator resolved to <button hidden="" type="button" data-share-native="" data-title="Welcome to the Blog" class="share-buttons__btn astro-rz3edfgk" data-url="https://astro-cloudflare-starter.pages.dev/blog/welcome">…</button>
       - unexpected value "hidden"

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
  - article:
    - heading "Welcome to the Blog" [level=1]
    - paragraph: First post about the Astro + Cloudflare starter.
    - text: Admin
    - time: June 24, 2026
    - text: 1 min read
    - link "astro":
      - /url: /blog?tag=astro
    - link "cloudflare":
      - /url: /blog?tag=cloudflare
    - figure:
      - img "Welcome to the Blog"
    - complementary
    - heading "Welcome to the Blog" [level=1]
    - paragraph:
      - text: This is the first blog post using
      - strong: Astro + Cloudflare
      - text: .
    - paragraph: "Key features:"
    - list:
      - listitem: English-first, multilanguage-ready
      - listitem: Git-based content management
      - listitem: Pagefind search
      - listitem: Cloudflare Pages deployment
    - group "Share":
      - text: Share
      - link "Share on X":
        - /url: https://twitter.com/intent/tweet?url=https%3A%2F%2Fastro-cloudflare-starter.pages.dev%2Fblog%2Fwelcome&text=Welcome%20to%20the%20Blog
        - img
        - text: X
      - link "Share on LinkedIn":
        - /url: https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fastro-cloudflare-starter.pages.dev%2Fblog%2Fwelcome
        - img
        - text: LinkedIn
      - button "Copy link":
        - img
        - text: Copy link
    - heading "Related posts" [level=2]
    - article:
      - paragraph:
        - time: Jun 25, 2026
        - text: 2 min read
      - heading "Getting Started with Astro + Cloudflare" [level=3]:
        - link "Getting Started with Astro + Cloudflare":
          - /url: /blog/getting-started
      - paragraph: A step-by-step guide to building a fast site with Astro and Cloudflare Pages.
      - link "astro":
        - /url: /blog?tag=astro
      - link "tutorial":
        - /url: /blog?tag=tutorial
      - link "cloudflare":
        - /url: /blog?tag=cloudflare
    - article:
      - paragraph:
        - time: Jun 22, 2026
        - text: 1 min read
      - heading "Optimizing SEO for Multilingual Websites" [level=3]:
        - link "Optimizing SEO for Multilingual Websites":
          - /url: /blog/seo-multilingual
      - paragraph: Technical SEO best practices for sites with multiple languages.
      - link "seo":
        - /url: /blog?tag=seo
      - link "i18n":
        - /url: /blog?tag=i18n
      - link "performance":
        - /url: /blog?tag=performance
    - navigation:
      - link "Back to blog":
        - /url: /blog
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
  3  | test.describe("blog listing + detail", () => {
  4  |   test("blog listing shows at least one post card", async ({ page }) => {
  5  |     test.setTimeout(60_000);
  6  |     await page.goto("/blog", { waitUntil: "domcontentloaded" });
  7  |     await expect(page.locator(".blog-card").first()).toBeVisible({
  8  |       timeout: 30_000,
  9  |     });
  10 |   });
  11 | 
  12 |   test("clicking a blog card navigates to the post", async ({ page }) => {
  13 |     test.setTimeout(60_000);
  14 |     await page.goto("/blog", { waitUntil: "domcontentloaded" });
  15 |     const firstCardLink = page.locator(".blog-card__title a").first();
  16 |     await expect(firstCardLink).toBeVisible({ timeout: 30_000 });
  17 |     await firstCardLink.click();
  18 |     await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
  19 |   });
  20 | 
  21 |   test("blog detail page exposes share buttons", async ({ page }) => {
  22 |     test.setTimeout(60_000);
  23 |     await page.goto("/blog/welcome", { waitUntil: "domcontentloaded" });
  24 |     await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
> 25 |     await expect(page.locator(".share-buttons button").first()).toBeVisible({
     |                                                                 ^ Error: expect(locator).toBeVisible() failed
  26 |       timeout: 30_000,
  27 |     });
  28 |   });
  29 | });
  30 | 
```