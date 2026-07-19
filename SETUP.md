# Setup & Deployment

## Prerequisites

- Node.js 24+
- pnpm 8.15+ (`corepack enable && corepack prepare pnpm@8.15.0 --activate`)

## Local development

```bash
pnpm install
cp .env.example .env   # optional
pnpm dev
```

Visit http://localhost:4321/ml-move/. English is at `/ml-move/`, Italian at `/ml-move/it/`.

## Build

```bash
pnpm build     # outputs static site to dist/
pnpm preview   # serve the production build locally
```

## Deploy to GitHub Pages

### One-time setup

1. Go to your repo **Settings → Pages → Source** → set to **GitHub Actions**.
2. Ensure the `SITE_URL` is configured in `src/config/site.config.ts`.

### Automation

Every push to `main` triggers `.github/workflows/deploy.yml`:

1. Install dependencies
2. Run `pnpm build`
3. Upload `dist/` as a Pages artifact
4. Deploy to GitHub Pages

Preview builds run via CI on pull requests.

## CI

`.github/workflows/ci.yml` runs lint, type-check, i18n validation, build, and tests on every PR to `main`.
