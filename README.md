# Butler's Construction & Service Solutions — bcss702.com

A standalone Next.js website for Butler's Construction & Service Solutions, a licensed
Las Vegas general contractor. It replaces the previous custom WordPress theme entirely.

**There is no WordPress, PHP, MySQL, REST API or plugin dependency at build time or at
runtime.** The WordPress installation can be deleted and this application keeps working.

---

## Tech stack

| Concern         | Choice                                              |
| --------------- | --------------------------------------------------- |
| Framework       | Next.js 15 (App Router)                              |
| Language        | TypeScript (strict, `noUncheckedIndexedAccess`)      |
| UI              | React 19 Server Components; Client Components only where the page needs browser behaviour |
| Styling         | One global stylesheet migrated from the theme's CSS  |
| Content         | Typed local data in `data/` + generated JSON in `content/` |
| Fonts           | `next/font/google` (Inter, self-hosted at build time) |
| Images          | `next/image` with local files in `public/images/`    |
| Forms           | Route handler at `/api/contact/` + a dependency-free SMTP client |
| Rendering       | Fully static: 43 prerendered pages, 1 dynamic route handler |

Runtime dependencies: `next`, `react`, `react-dom`. Nothing else.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Other scripts:

```bash
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck    # tsc --noEmit
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. Nothing is required for the
site to build and render; only the contact form needs configuration.

| Variable               | Required           | Purpose                                                                 |
| ---------------------- | ------------------ | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended        | Origin used for canonicals, Open Graph URLs, `robots.txt` and the sitemap. Defaults to `https://bcss702.com`. **Read at build time** — set it before `npm run build`. |
| `CONTACT_RECIPIENTS`   | For the form       | Comma-separated addresses that receive submissions. Defaults to `info@bcss702.com`. |
| `SMTP_HOST`            | For the form       | SMTP server. Without it the form returns an error and the submission is written to the server log instead of being lost silently. |
| `SMTP_PORT`            | No                 | Defaults to `587`; use `465` for implicit TLS.                           |
| `SMTP_SECURE`          | No                 | `true` for implicit TLS. Inferred as `true` when the port is 465.        |
| `SMTP_USER` / `SMTP_PASSWORD` | If the server authenticates | AUTH LOGIN credentials.                              |
| `MAIL_FROM`            | No                 | Envelope/From address. Defaults to `SMTP_USER`.                          |

Only `NEXT_PUBLIC_SITE_URL` is exposed to the browser. Credentials are read server-side in
the route handler and never reach the client bundle. Do not commit `.env` or `.env.local`.

---

## Project structure

```
app/
├── layout.tsx                 root layout, fonts, Organization + WebSite JSON-LD
├── page.tsx                   homepage
├── globals.css                all styles, migrated from the theme
├── not-found.tsx              404 (WordPress had none)
├── error.tsx                  error boundary
├── sitemap.ts                 43 indexable URLs
├── robots.ts
├── icon.png / apple-icon.png / favicon.ico
├── [slug]/page.tsx            the 37 service pages (generateStaticParams)
├── about-us/page.tsx
├── contact-us/page.tsx
├── gallery/page.tsx
├── privacy-policy/page.tsx
├── services/page.tsx          the /services/ index
└── api/contact/route.ts       form handler

components/
├── layout/     TopBar, SiteFooter (home / inner / minimal), InnerPage shell
├── navigation/ SiteNav (client — mega menu + mobile panel)
├── sections/   homepage and service-page sections
├── forms/      QuoteForm (client)
├── seo/        JsonLd
└── ui/         RichText, Breadcrumbs, SmartLink, FadeIn, Icons

content/        services.json, pages.json — body copy generated from the theme
data/           site.ts, navigation.ts, services.ts, home.ts, gallery.ts, pages.ts
lib/            seo.ts (metadata), schema.ts (JSON-LD), mailer.ts (SMTP)
types/          content.ts, seo.ts, service.ts, navigation.ts
public/images/  logo + 16 project photos
```

### Content architecture

```
content/*.json          body copy, parsed into typed blocks at migration time
        ↓
data/*.ts               loaders that validate and type the JSON, plus hand-written
                        structured data (navigation, site details, homepage sections)
        ↓
app/**/page.tsx         Server Components that compose sections and build metadata
        ↓
components/             presentational components
```

Business details — phone, email, address, hours, licence numbers, service area — live in
one place, [`data/site.ts`](data/site.ts), and feed the header, footers, contact blocks,
schema and the sitemap. Change them there and every surface updates.

Service body copy is stored as **typed content blocks** (`heading`, `paragraph`, `list`
with `text` / `strong` / `em` / `link` inline nodes), not raw HTML, so
[`RichText`](components/ui/RichText.tsx) renders real React elements and the project uses
no `dangerouslySetInnerHTML` for content.

### Adding or editing a service

1. Edit the entry in [`content/services.json`](content/services.json) (or add a new one).
2. Nothing else: the slug feeds `generateStaticParams`, the `/services/` index, the mega
   menu's "view all" target, the cross-link grid, the sitemap and the 404 page.

To add it to the header mega menu or a footer column, add the link to
[`data/navigation.ts`](data/navigation.ts).

---

## Deployment

The site is 43 prerendered pages plus one Node.js route handler (`/api/contact/`), so it
runs anywhere Node 20.9+ runs.

### Vercel (recommended)

The repository root **is** the Next.js app, so everything is auto-detected — no Root
Directory setting, no `vercel.json`, no adapter.

1. **Import the repo** at [vercel.com/new](https://vercel.com/new). Framework preset:
   Next.js. Build command, output directory and install command: leave as detected.
2. **Add environment variables** (Project → Settings → Environment Variables) for
   Production *and* Preview:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://bcss702.com` |
   | `CONTACT_RECIPIENTS` | the address(es) that should receive form submissions |
   | `SMTP_HOST` · `SMTP_PORT` · `SMTP_SECURE` · `SMTP_USER` · `SMTP_PASSWORD` · `MAIL_FROM` | your mail provider's details |

   `NEXT_PUBLIC_SITE_URL` is **read at build time**, so add it before the first deploy —
   changing it later requires a redeploy, not just a restart. The `SMTP_*` values are read
   at request time inside the route handler and never reach the browser bundle.
3. **Add the domain** (Project → Settings → Domains): add `bcss702.com`, and add
   `www.bcss702.com` set to redirect to the apex so one origin stays canonical and matches
   `NEXT_PUBLIC_SITE_URL`.
4. **Deploy**, then send a test submission through `/contact-us/`.

Notes specific to Vercel:

- `/api/contact/` is pinned to the Node.js runtime (`runtime = 'nodejs'`) because the SMTP
  client opens a raw TCP socket — the edge runtime cannot do that. Do not change it.
- The route sets `maxDuration = 30`; the mailer aborts after 20 s so a slow or unreachable
  SMTP server produces a logged error instead of a killed function.
- Some managed SMTP providers block connections from cloud IP ranges. If mail fails from
  Vercel but works locally, that is usually why — use the provider's documented relay host
  or an HTTP email API instead.
- Everything else is static and served from the CDN; only the form hits a function.

### Any other Node host

```bash
NEXT_PUBLIC_SITE_URL=https://bcss702.com npm ci
NEXT_PUBLIC_SITE_URL=https://bcss702.com npm run build
npm run start                     # listens on $PORT, default 3000
```

Put it behind your reverse proxy or process manager of choice.

**Static export** is possible if you drop the contact route handler and point the form at
a third-party endpoint; every page route is already static.

### Before going live

- Set `NEXT_PUBLIC_SITE_URL` to the production origin **before building** — canonicals,
  Open Graph URLs, `robots.txt` and `sitemap.xml` are baked in at build time.
- Configure SMTP and send a test submission.
- Keep serving `/about/` → `/about-us/` (handled in `next.config.ts`).
- Enforce one canonical host (https, and pick www or non-www), matching
  `NEXT_PUBLIC_SITE_URL`.

---

## Further reading

- [`MIGRATION_NOTES.md`](MIGRATION_NOTES.md) — what the WordPress site was, what was
  migrated, what was replaced, and every deliberate deviation.
- [`SEO_MIGRATION.md`](SEO_MIGRATION.md) — full URL inventory, per-page metadata,
  redirects, schema and the SEO verification that was run.
