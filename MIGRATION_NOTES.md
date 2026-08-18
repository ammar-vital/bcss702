# Migration notes — WordPress → Next.js

This records what the WordPress site was, how each part was migrated, and every point
where the new site deliberately differs from the old one.

Source of truth for the audit: the custom theme at
`app/public/wp-content/themes/bcss702.com/` plus the rendered HTML of all 37 published
pages crawled from the local install at `http://bcss702com.local/`.

---

## 1. What the WordPress site actually was

| Aspect | Finding |
| --- | --- |
| Theme | One custom theme, `bcss702.com`. No parent theme, no block theme. |
| Templates | 42 page templates + `front-page.php` + `index.php`. **No `header.php`, `footer.php`, `single.php`, `archive.php`, `search.php`, `404.php`, `sidebar.php`, `comments.php`.** Each template was a complete standalone HTML document. |
| Shared parts | Only `template-parts/site-nav.php`, `nav-fallback-home.php`, `nav-fallback-inner.php`. |
| Content model | Pages only. **No posts, no blog, no categories, no tags, no custom post types, no custom taxonomies, no authors beyond `admin`, no comments, no widgets, no shortcodes, no AJAX.** |
| Media library | One image (the site icon). Every content image lived in the theme's `assets/` folder. |
| Styling | Three near-identical stylesheets: inline in `front-page.php`, inline in `page-services.php`, and `assets/service-page.css`. |
| JavaScript | Three small inline vanilla scripts (mobile nav, scroll reveal, stat counter). **No jQuery, no libraries.** |
| Plugins | Advanced Custom Fields, Rank Math SEO, Post SMTP, Sucuri Scanner, All-in-One WP Migration, Download Plugins Dashboard. |

### Plugin disposition

| Plugin | Affected the public site? | Outcome |
| --- | --- | --- |
| Rank Math SEO | Yes — titles, descriptions, canonicals, OG/Twitter, JSON-LD, sitemap, robots | Values migrated; equivalents reimplemented with the Next.js Metadata API, `app/sitemap.ts`, `app/robots.ts` and hand-written JSON-LD |
| Advanced Custom Fields | Field definitions existed, **no values were ever saved** | Removed; see §3 |
| Post SMTP | Mail transport for the contact form | Replaced by `lib/mailer.ts` + `SMTP_*` environment variables |
| Sucuri Scanner | Admin/security only | Not applicable — no WordPress to protect |
| All-in-One WP Migration | Admin only | Not applicable |
| Download Plugins Dashboard | Admin only | Not applicable |

---

## 2. Template → component mapping

| WordPress | Next.js |
| --- | --- |
| `front-page.php` | `app/page.tsx` + `components/sections/*` |
| `page-services.php` | `app/services/page.tsx` |
| `page-about.php` | `app/about-us/page.tsx` |
| `page-gallery.php` | `app/gallery/page.tsx` |
| `page-contact-us.php` | `app/contact-us/page.tsx` |
| `page-privacy-policy.php` | `app/privacy-policy/page.tsx` |
| 37 × `page-<service>.php` | `app/[slug]/page.tsx` (one component, data-driven) |
| `template-parts/site-nav.php` + its inline script | `components/navigation/SiteNav.tsx` |
| `template-parts/nav-fallback-home.php` | `data/navigation.ts` |
| footer markup repeated in every template | `components/layout/SiteFooter.tsx` (home / inner / minimal) |
| top bar repeated in every template | `components/layout/TopBar.tsx` |
| `bcss702_handle_contact_form()` (`functions.php`) | `app/api/contact/route.ts` + `lib/mailer.ts` |
| `bcss702_form_fields()` / `bcss702_form_notice()` | `components/forms/QuoteForm.tsx` |
| inline scroll-reveal script | `components/ui/FadeIn.tsx` |
| inline stat-counter script | `components/sections/StatsBar.tsx` |
| Rank Math head output | `lib/seo.ts`, `lib/schema.ts`, `components/seo/JsonLd.tsx` |
| Rank Math sitemap / robots | `app/sitemap.ts`, `app/robots.ts` |
| `index.php` fallback (blank page for unknown URLs) | `app/not-found.tsx` |
| `style.css` (theme header only, no rules) | dropped — it contained no CSS |
| `functions.php` helpers (`bcss702_asset`, `bcss702_home_url`, …) | not needed; paths are static |

The **37 service pages were byte-for-byte identical in structure** — verified by hashing
each template's tag/class skeleton, which produced a single hash across all 37. They
differ only in hero image, badge, heading, subtitle, body copy, breadcrumb label, form
source label and contact heading. Those became rows in `content/services.json` behind one
`app/[slug]/page.tsx`.

---

## 3. ACF and theme options

The theme read ACF fields through `bcss702_acf_text()` / `bcss702_acf_image_url()`, each
with a hard-coded fallback. Comparing the rendered HTML of all 37 published pages against
those fallbacks showed **every page rendered the fallback** — no ACF value was ever saved.
The literal fallback strings are therefore the real content, and they are what was
migrated.

Two ACF field groups existed in `acf-json/`:

- `group_bcss702_page_template_fields` — `hero_background_image`, `hero_badge`,
  `hero_heading`, `hero_subtitle`, `main_content`, `form_source`, `hero_form_source`,
  `contact_form_source`. Now the typed fields of `Service` / the page objects in
  `data/pages.ts`.
- `group_bcss_home_page_894de27c8a` — a large "BCSS - Home Page Content" group
  (~50 fields, repeaters for stats, trust badges, service cards, reasons). **Not
  referenced by any template**; it was dead configuration and was not migrated. The
  homepage content it duplicated is in `data/home.ts`.

No Customizer settings, theme-options page or ACF options page influenced the front end.
Nothing was lost.

---

## 4. Navigation

`register_nav_menus()` declared a `primary` location, but **no menu was ever assigned to
it**, so `bcss702_primary_menu()` always fell through to the hard-coded mega menu in
`template-parts/nav-fallback-home.php`. That structure — six columns, 32 service links,
and a "View All 37 Services →" footer link — is reproduced verbatim in
`data/navigation.ts`. `nav-fallback-inner.php` existed but was never reachable, because
`bcss702_primary_menu()` only ever loaded the home fallback; it was not migrated.

---

## 5. Content migrated

- **43 pages**: homepage, services index, about, gallery, contact, privacy policy, and 37
  service pages.
- **All body copy**, parsed from the templates into typed blocks in
  `content/services.json` and `content/pages.json`.
- **17 images** (15 gallery photos, a kitchen photo, the logo) copied to `public/images/`;
  the favicon, PNG icon and Apple touch icon copied into `app/`.
- **All contact details, hours, licence numbers, service area** → `data/site.ts`.
- **Reviews, stats, trust badges, "why us" reasons, specialty links** → `data/home.ts`.
- **Per-page Rank Math titles, descriptions, canonicals, publish/modified dates** →
  `content/*.json`, applied through `lib/seo.ts`.
- **Google site verification token** → `app/layout.tsx` via the Metadata API.

Nothing on the public WordPress site is missing from the new site.

---

## 6. Deliberate deviations

Each item below is a place where reproducing WordPress exactly would have shipped a
defect. Every one is small and reversible.

### 6.1 Five service pages that returned 404

`/accessibility-remodels/`, `/custom-tile-stonework/`,
`/commercial-contractor-las-vegas/`, `/water-heater-replacement-las-vegas/` and
`/emergency-water-heater-repair/` had complete templates and were linked from the footer,
the `/services/` grid and the cross-link grid on all 37 service pages — but the WordPress
*pages* were never created, so every one of those links 404'd.

**They are published in the new site.** This turns dozens of broken internal links into
working ones. Their metadata is new (Rank Math had none) and follows the pattern of their
published siblings; see `SEO_MIGRATION.md`.

### 6.2 `/privacy-policy/`

Same situation, plus `page-privacy-policy.php` was missing its closing `<?php endif; ?>`,
which is a PHP parse error. The page is now published, with the content that template
intended to render.

### 6.3 `/services/` page title

Rank Math had no custom title, so WordPress served `Services - bcs7022` — the placeholder
WordPress site name. Replaced with `All Services | Butler's Construction`, matching every
other page, and given a description (it had none).

### 6.4 Duplicate meta description

Rank Math served the sewer-line description on `/shower-tub-conversions/`, leaving two
pages with one off-topic description. Rewritten from that page's own copy. The original
value is recorded in `SEO_MIGRATION.md` and the code comment in `data/services.ts`.

### 6.5 Logo lock-up on inner pages

`assets/service-page.css` had no rule for `.logo-text`, so on the 41 non-home pages the
brand name and the "& Service Solutions" line ran together on one line — while the
homepage stacked them. The stacked (homepage) rendering is used everywhere. To restore the
old inline behaviour, remove `.logo-text { display: flex; flex-direction: column }` from
`app/globals.css`.

### 6.6 Scroll-reveal and count-up no longer hide content

The theme set `.fade-in { opacity: 0 }` in CSS and removed it from JavaScript, so those
sections were invisible to anything that did not run the script. `FadeIn` now renders
visible and only *arms* the hidden state on mount, and only for elements still below the
fold — the animation is unchanged for people who scroll to it, but the copy is always in
the DOM and always visible. `StatsBar` does the same: the final numbers are server
rendered, and the count-up only replaces them when the band starts off screen.

### 6.7 Playfair Display removed

Every WordPress page loaded Playfair Display from Google Fonts. No rule in any stylesheet
used it. Dropping it removes a render-blocking font request with no visual change
(confirmed by pixel comparison).

### 6.8 Asset URLs

Several templates emitted `<?php echo bcss702_asset(...); ?> ?>`, appending a literal
` ?>` to icon, stylesheet and gallery-image URLs. The new URLs are clean.

### 6.9 Heading levels

Some headings skipped levels (`h1` → `h3` in the hero form, `h4` in footer columns and
"why us" cards). Levels were adjusted so each page has one `h1` and no gaps. Font sizes
are unchanged — the CSS selectors were updated alongside.

### 6.10 `/about/` redirect

WordPress 301'd `/about/` to `/about-us/`. That redirect is preserved in
`next.config.ts`. Internal links that used to point at `/about/` now point straight at
`/about-us/`, so no internal navigation goes through the redirect.

---

## 7. Functionality replaced

### Contact form

WordPress posted to `admin-post.php`, ran `bcss702_handle_contact_form()`, mailed via
`wp_mail()` (Post SMTP), then redirected back with `?bcss702_mail=success|error`.

The replacement posts JSON to `/api/contact/` and updates the form in place — no page
reload, no query parameter. The server side keeps the original behaviour:

- same field labelling (`FirstName` → `First Name`) and same priority ordering
  (Source, Name, First/Last Name, Email, Phone, Service, then the rest);
- same subject format, `[BCSS702] <Source>`;
- `Reply-To` set to the submitter when the email address is valid;
- multiple recipients via `CONTACT_RECIPIENTS`;
- the honeypot still answers `200` so bots do not learn they were caught.

Hardening added: payload shape and size limits, header-injection stripping on every SMTP
header value, SMTP dot-stuffing, and a refusal to send credentials over an unencrypted
connection when the server advertises STARTTLS.

**Recipients**: the theme's live `functions.php` mailed
`info@bcss702.com, thevoiceofcash@gmail.com, ammarulhaq1200@gmail.com` (a `.bak` copy
shows the original list was just `info@bcss702.com`). The default here is
`info@bcss702.com`; set `CONTACT_RECIPIENTS` to whatever the business actually wants.

### Search

The WordPress site had no search form, no `search.php` and no search link anywhere in the
navigation or footer. Nothing to migrate. The 404 page lists all 37 services so a mistyped
URL still leads somewhere useful.

### Pagination

No archives, no pagination. Nothing to migrate.

### Third-party services

The only third-party embeds on the public site were the Google Maps iframe on the contact
page and outbound links to the Google Business Profile. Both are kept, with the iframe
lazy-loaded as before. No analytics, tag manager, pixel, reCAPTCHA, chat widget or
newsletter provider was present, so none was added.

---

## 8. Verification performed

| Check | Result |
| --- | --- |
| Pixel comparison, WordPress vs Next.js, at 390 / 768 / 1024 / 1440 px, full page height, for the homepage, a service page, the services index, about, gallery and contact | No visible differences. The only residual pixel deltas are JPEG-vs-AVIF re-encoding inside images. |
| HTML parity across all 37 published URLs: `<title>`, meta description, canonical, `h1`, and every content word | Identical, except the three intentional metadata changes in §6.3 / §6.4 |
| Internal link + asset crawl of the built site | 43 pages, 59 assets, **0 broken** |
| Sitemap coverage vs crawled pages | Exact match, both directions |
| Per-page SEO (title, description, canonical, robots, OG, Twitter, single `h1`, valid JSON-LD, `alt` on every image, no duplicate titles/descriptions) | No problems |
| Interaction tests (Playwright, iPhone 13 + desktop): hamburger, body scroll lock, `aria-expanded`, mega-menu accordion, Escape, navigation, hover menu, keyboard focus menu, skip link, focus outlines, in-page anchors, stat count-up, no section left hidden, form submission payload | 26/26 passed, no console errors |
| Contact form end-to-end against a test SMTP server | Correct recipients, subject, `Reply-To`, field order; honeypot silently dropped; malformed payload rejected with 400 |
| `npm run lint` | Clean |
| `npx tsc --noEmit` | Clean |
| `npm run build` | Succeeds; 43 static pages + 1 route handler |
| WordPress-dependency grep over source, `.next` output and served HTML (`wp-content`, `wp-admin`, `wp-json`, `xmlrpc`, `.php`, `bcss702com.local`) | 0 runtime references; matches in source are documentation comments only |

---

## 9. Limitations and follow-ups

- **SMTP must be configured** before the contact form can deliver. Until `SMTP_HOST` is
  set the form shows its error state and the submission is written to the server log
  rather than being silently discarded.
- **`NEXT_PUBLIC_SITE_URL` is read at build time.** Changing the domain requires a
  rebuild.
- **Confirm the contact-form recipient list** with the business (see §7).
- **Confirm the five newly published pages** are wanted before launch. If any should stay
  unpublished, remove it from `content/services.json`; the menus, grids, sitemap and 404
  page all derive from that file.
- The `.bak-*` files in the theme (`front-page.php.bak-altfix`,
  `functions.php.bak-20260814`, `template-front-page.php.bak-altfix`) were reviewed for
  differences and are not part of the migration. `template-front-page.php` was an exact
  duplicate of `front-page.php` apart from the Google verification meta tag.

---

## 10. Decommissioning WordPress

The migration is verified, but **do not delete the WordPress installation until the new
site has been live and validated in production.** Once it has:

1. Point DNS at the Next.js deployment.
2. Confirm `/about/` still 301s to `/about-us/`.
3. Submit `https://bcss702.com/sitemap.xml` in Google Search Console.
4. Watch Search Console coverage for a couple of weeks.
5. Then retire the WordPress host, database and plugins.

Nothing in this application reads from WordPress, so step 5 has no effect on it.
