# ml-move

A fast, modern site built with **Astro 7** and deployed to **GitHub Pages**. English-first and multilanguage-ready. Content is managed with Git and Markdown — no CMS, no database.

## Features

- English-first with a multilanguage-ready i18n engine (prefix-based routing)
- Marketing pages, blog, and docs with full-text search via Pagefind
- Light/dark theming with a monochrome OKLCH design system
- SEO defaults: canonical, hreflang, JSON-LD, Open Graph, sitemap, RSS, dynamic `llms.txt`
- Static output — fast on the GitHub Pages CDN

## Quick Start

```bash
git clone https://github.com/lorenzobaronio22/ml-move.git
cd ml-move
pnpm install
pnpm dev
```

Open **http://localhost:4321**.

## Make it yours

After clicking **Use this template**, update these:

- [ ] `src/config/site.config.ts` — `url`, `name`, `description`, `author`, `email`, social links, OG image. Single source of truth (canonical/OG/sitemap/`llms.txt`; `astro.config.ts` reads `url`).
- [ ] `src/config/nav.config.ts` — footer GitHub/social URLs.
- [ ] `public/favicon.svg`, logos, and the default OG image.
- [ ] `.env.example` → `.env`; set `SITE_URL`.
- [ ] Content in `src/content/` (blog, services, pages, docs, settings).
- [ ] `LICENSE` copyright holder and `CHANGELOG.md`.

> Tip: update `src/config/site.config.ts` (name, author, email, social links, URL) to make this template yours.

## Scripts

```bash
pnpm dev        # start dev server
pnpm build      # production build to dist/
pnpm preview    # preview the production build
pnpm lint       # eslint + stylelint + type-check + validations
pnpm test       # unit tests (vitest)
pnpm test:e2e   # end-to-end tests (playwright)
```

## Content model

All content lives in `src/content` as Markdown/JSON and is type-checked via content
collection schemas. Each entry uses `<slug>.md` with a `locale` frontmatter field
(English by default). To add a language, see `docs/guides/internationalization`.
Edit files and open a pull request — GitHub Pages deploys on merge.

## Deployment

Every push to `main` deploys to GitHub Pages automatically. See [SETUP.md](SETUP.md).

## License

[MIT](LICENSE)
