# SEO migration

Everything below reflects the built site as verified against the WordPress original.

- **43 indexable URLs**, all with a trailing slash, all in the sitemap.
- **37 of them existed in WordPress** and keep their exact URL and their exact Rank Math
  title, description, canonical and dates.
- **6 are new** — they had complete templates and were linked site-wide, but the
  WordPress pages were never published, so they returned 404.
- **1 redirect** carried over: `/about/` → `/about-us/` (301).
- Titles, descriptions, canonicals, Open Graph, Twitter cards, JSON-LD, the sitemap and
  `robots.txt` are all reimplemented natively — no plugin, no Rank Math at runtime.

---

## 1. URL inventory

Every WordPress URL is preserved. Nothing was renamed, and no page redirects to the
homepage.

| Old URL | New URL | Action |
| --- | --- | --- |
| `/` | `/` | Preserve |
| `/services/` | `/services/` | URL preserved, metadata updated |
| `/about-us/` | `/about-us/` | Preserve |
| `/contact-us/` | `/contact-us/` | Preserve |
| `/gallery/` | `/gallery/` | Preserve |
| `/kitchen-remodeling/` | `/kitchen-remodeling/` | Preserve |
| `/bathroom-remodeling/` | `/bathroom-remodeling/` | Preserve |
| `/home-remodeling/` | `/home-remodeling/` | Preserve |
| `/commercial-remodeling/` | `/commercial-remodeling/` | Preserve |
| `/room-additions-las-vegas/` | `/room-additions-las-vegas/` | Preserve |
| `/outdoor-living-spaces/` | `/outdoor-living-spaces/` | Preserve |
| `— (404)` | `/custom-tile-stonework/` | **New** — 404 in WordPress |
| `— (404)` | `/accessibility-remodels/` | **New** — 404 in WordPress |
| `/general-contracting/` | `/general-contracting/` | Preserve |
| `/new-home-construction/` | `/new-home-construction/` | Preserve |
| `/custom-home-builders-las-vegas/` | `/custom-home-builders-las-vegas/` | Preserve |
| `/design-build/` | `/design-build/` | Preserve |
| `/countertop-installation/` | `/countertop-installation/` | Preserve |
| `/kitchen-flooring/` | `/kitchen-flooring/` | Preserve |
| `— (404)` | `/commercial-contractor-las-vegas/` | **New** — 404 in WordPress |
| `/tenant-improvements/` | `/tenant-improvements/` | Preserve |
| `/office-build-outs/` | `/office-build-outs/` | Preserve |
| `/retail-restaurant-build-outs/` | `/retail-restaurant-build-outs/` | Preserve |
| `/medical-healthcare-facility-construction/` | `/medical-healthcare-facility-construction/` | Preserve |
| `/commercial-maintenance/` | `/commercial-maintenance/` | Preserve |
| `/property-maintenance-handyman/` | `/property-maintenance-handyman/` | Preserve |
| `/shower-tub-conversions/` | `/shower-tub-conversions/` | URL preserved, metadata updated |
| `/walk-in-bathtub-las-vegas/` | `/walk-in-bathtub-las-vegas/` | Preserve |
| `/vanity-cabinet-installation/` | `/vanity-cabinet-installation/` | Preserve |
| `/toilet-repair-las-vegas/` | `/toilet-repair-las-vegas/` | Preserve |
| `/plumbing-services/` | `/plumbing-services/` | Preserve |
| `/water-line-repairs/` | `/water-line-repairs/` | Preserve |
| `/drain-cleaning/` | `/drain-cleaning/` | Preserve |
| `/sewer-line-services/` | `/sewer-line-services/` | Preserve |
| `/leak-detection/` | `/leak-detection/` | Preserve |
| `/water-heater-services/` | `/water-heater-services/` | Preserve |
| `— (404)` | `/water-heater-replacement-las-vegas/` | **New** — 404 in WordPress |
| `— (404)` | `/emergency-water-heater-repair/` | **New** — 404 in WordPress |
| `/water-damage-restoration/` | `/water-damage-restoration/` | Preserve |
| `/fire-smoke-damage-restoration/` | `/fire-smoke-damage-restoration/` | Preserve |
| `/handyman-services/` | `/handyman-services/` | Preserve |
| `/home-maintenance/` | `/home-maintenance/` | Preserve |
| `— (404)` | `/privacy-policy/` | **New** — 404 in WordPress |

### The 6 new URLs

These are not new content — the theme already contained complete templates for them, and
the footer, `/services/` grid and the cross-link grid on all 37 service pages linked to
them. Because the WordPress pages were never created, those links 404'd. Publishing them
repairs dozens of broken internal links.

| URL | Why it 404'd in WordPress |
| --- | --- |
| `/accessibility-remodels/` | Template `page-accessibility-remodels.php` existed; page never created |
| `/custom-tile-stonework/` | Template existed; page never created |
| `/commercial-contractor-las-vegas/` | Template existed; page never created |
| `/water-heater-replacement-las-vegas/` | Template existed; page never created |
| `/emergency-water-heater-repair/` | Template existed; page never created |
| `/privacy-policy/` | Template existed but had a PHP syntax error (missing `endif`); page never created |

Because they were never indexable, publishing them cannot cannibalise existing rankings.
If any of them should stay unpublished, delete its entry from `content/services.json`
(or the route for `/privacy-policy/`) — the menus, grids, sitemap and 404 page all derive
from that data.

---

## 2. Redirects

Implemented in `next.config.ts`:

| Source | Destination | Status |
| --- | --- | --- |
| `/about` | `/about-us/` | 301 |

WordPress served this same 301 (`/about/` → `/about-us/`) from an old slug. It is
preserved so any external link or bookmark still resolves.

There are **no redirect chains**: internal links that used to point at `/about/` now point
straight at `/about-us/`. No other redirect is needed, because no URL changed.

`trailingSlash: true` matches WordPress's permalink format; requests without the trailing
slash get a 308 to the canonical form.

---

## 3. Metadata

Built with the Next.js Metadata API in `lib/seo.ts` from typed `PageSeo` objects. Every
page gets its own title, description, canonical, robots directives, Open Graph block and
Twitter card — there is no global fallback title in use.

Robots directives match what Rank Math emitted:
`index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`.

| URL | Title | Meta description |
| --- | --- | --- |
| `/` | Las Vegas General Contractor \| Butler’s Construction | Butler’s Construction is a licensed Las Vegas general contractor for kitchen & bathroom remodeling, new home construction, plumbing, and commercial projects. Call today. |
| `/services/` | All Services \| Butler's Construction | All 37 services from Butler's Construction — Las Vegas remodeling, new construction, commercial build-outs, plumbing, restoration, and property maintenance. |
| `/about-us/` | Las Vegas General Contractor \| Butler's Construction | Learn about Butler's Construction, a licensed Las Vegas contractor offering custom builds, remodels, renovations, and restoration services. |
| `/contact-us/` | Contact Las Vegas Contractors \| Butler's Construction | Contact Butler's Construction for Las Vegas remodeling, construction, plumbing, and commercial services. Get a free quote within 24 hours. |
| `/gallery/` | Project Gallery \| Butler's Construction | View completed Las Vegas construction projects, including kitchen remodels, bathrooms, commercial spaces, and custom renovation work. |
| `/kitchen-remodeling/` | Kitchen Remodeling In Las Vegas \| Butler's Construction | Create a beautiful, functional Las Vegas kitchen with custom cabinets, modern layouts, energy-efficient upgrades, and expert remodeling. |
| `/bathroom-remodeling/` | Bathroom Remodeling Las Vegas \| Butler's Construction | Upgrade your bathroom with trusted Las Vegas remodelers. Butler's Construction delivers custom designs, quality materials, and free estimates. |
| `/home-remodeling/` | Home Remodeling In Las Vegas \| Butler's Construction | Remodel your Las Vegas home with expert upgrades for kitchens, bathrooms, additions, storage, energy efficiency, and outdoor living. |
| `/commercial-remodeling/` | Commercial Remodeling Las Vegas \| Butler's Construction | Transform your Las Vegas business with expert commercial remodeling for offices, retail, restaurants, medical spaces, and tenant improvements. |
| `/room-additions-las-vegas/` | Room Additions In Las Vegas \| Butler's Construction | Expand your Las Vegas home with custom room additions, extra bedrooms, offices, living spaces, and energy-efficient upgrades. |
| `/outdoor-living-spaces/` | Outdoor Living Spaces In Las Vegas \| Butler's Construction | Create a beautiful Las Vegas outdoor space with custom patios, pergolas, decks, outdoor kitchens, and durable designs built to last. |
| `/custom-tile-stonework/` | Custom Tile & Stonework Las Vegas \| Butler's Construction | Custom tile and stonework in Las Vegas — backsplashes, floors, showers, and feature walls installed by a licensed general contractor. |
| `/accessibility-remodels/` | Accessibility Remodels (ADA) Las Vegas \| Butler's Construction | ADA and aging-in-place remodels in Las Vegas — walk-in tubs, curbless showers, grab bars, and wider doorways from a licensed contractor. |
| `/general-contracting/` | General Contracting In Las Vegas \| Butler's Construction | Hire a licensed Las Vegas general contractor for remodels, renovations, upgrades, and full project management from start to finish. |
| `/new-home-construction/` | New Home Construction In Las Vegas \| Butler's Construction | Build your dream home in Las Vegas with expert design, permitting, energy-efficient features, and quality construction from start to finish. |
| `/custom-home-builders-las-vegas/` | Custom Home Builders Las Vegas \| Butler's Construction | Build your dream home in Las Vegas with custom design, premium materials, expert craftsmanship, and a licensed local contractor. |
| `/design-build/` | Design-Build Services Las Vegas \| Butler's Construction | Plan and build smarter with Las Vegas design-build services focused on energy efficiency, comfort, quality materials, and lasting value. |
| `/countertop-installation/` | Countertop Installation Las Vegas \| Butler's Construction | Upgrade your kitchen with premium countertop installation in Las Vegas. Choose granite, marble, quartz, and more with expert craftsmanship. |
| `/kitchen-flooring/` | Kitchen Flooring Las Vegas \| Butler's Construction | Upgrade your kitchen with durable flooring in Las Vegas, including tile, hardwood, and luxury vinyl installed with expert care. |
| `/commercial-contractor-las-vegas/` | Commercial Contractor Las Vegas \| Butler's Construction | Licensed Las Vegas commercial contractor for build-outs, tenant improvements, remodels, and ground-up commercial construction. |
| `/tenant-improvements/` | Tenant Improvements In Las Vegas \| Butler's Construction | Upgrade your Las Vegas commercial space with tenant improvements, modern layouts, finishes, permitting, and turnkey construction. |
| `/office-build-outs/` | Office Build-Outs In Las Vegas \| Butler's Construction | Create a productive Las Vegas office with expert build-outs, custom layouts, lighting, finishes, and turnkey commercial construction. |
| `/retail-restaurant-build-outs/` | Retail & Restaurant Build-Outs in Las Vegas \| Butler's Construction | Build a standout Las Vegas retail or restaurant space with custom layouts, lighting, finishes, kitchens, and turnkey commercial construction. |
| `/medical-healthcare-facility-construction/` | Healthcare Facility Builds Las Vegas \| Butler's Construction | Build or upgrade Las Vegas medical facilities with expert construction for clinics, dental offices, urgent care centers, and healthcare spaces. |
| `/commercial-maintenance/` | Commercial Maintenance Las Vegas \| Butler's Construction | Keep your Las Vegas property running smoothly with reliable commercial maintenance, repairs, cleaning, trash outs, and make-ready services. |
| `/property-maintenance-handyman/` | Property Maintenance & Handyman in Las Vegas \| Butler's Construction | Reliable Las Vegas property maintenance and handyman services for homes, rentals, and businesses, including repairs, cleaning, and trash outs. |
| `/shower-tub-conversions/` | Shower & Tub Conversions In Las Vegas \| Butler's Construction | Tub-to-shower and shower-to-tub conversions in Las Vegas — design guidance, plumbing updates, and seamless installation by a licensed contractor. |
| `/walk-in-bathtub-las-vegas/` | Walk-In Bathtub Installation in Las Vegas \| Butler's Construction | Improve safety and comfort with walk-in bathtub installation in Las Vegas, featuring low-threshold entry, seating, grab bars, and hydrotherapy. |
| `/vanity-cabinet-installation/` | Bathroom Cabinets In Las Vegas \| Butler's Construction | Upgrade your Las Vegas bathroom with stylish vanity and cabinet installation for better storage, organization, and lasting value. |
| `/toilet-repair-las-vegas/` | Toilet Repair In Las Vegas \| Butler's Construction | Get fast toilet repair in Las Vegas for leaks, clogs, running toilets, broken parts, seal issues, and efficient replacements. |
| `/plumbing-services/` | Plumbing Services In Las Vegas \| Butler's Construction | Get reliable plumbing services in Las Vegas for toilet repair, faucet replacement, drain clearing, main line repair, and water pressure issues. |
| `/water-line-repairs/` | Water Line Repairs In Las Vegas \| Butler's Construction | Restore water fast with expert water line repairs in Las Vegas for broken lines, leaks, water damage, yard flooding, and foundation risks. |
| `/drain-cleaning/` | Drain Cleaning In Las Vegas \| Butler's Construction | Clear clogged drains fast with expert drain cleaning in Las Vegas. Safe plumbing solutions for sinks, pipes, and sewer lines. |
| `/sewer-line-services/` | Sewer Line Services In Las Vegas \| Butler's Construction | Fix sewer line issues in Las Vegas with expert cleaning, trenchless repairs, replacements, and advanced diagnostics for lasting reliability. |
| `/leak-detection/` | Leak Detection In Las Vegas \| Butler's Construction | Find and fix hidden leaks fast with expert leak detection in Las Vegas. Prevent water damage, mold, high bills, and costly repairs. |
| `/water-heater-services/` | Water Heater Services In Las Vegas \| Butler's Construction | Get reliable water heater repair, installation, and replacement in Las Vegas for tank and tankless systems with fast, honest service. |
| `/water-heater-replacement-las-vegas/` | Water Heater Replacement Las Vegas \| Butler's Construction | Water heater replacement in Las Vegas — tank and tankless installation by a licensed C-1 plumbing contractor. Free estimates. |
| `/emergency-water-heater-repair/` | Emergency Water Heater Repair Las Vegas \| Butler's Construction | Emergency water heater repair in Las Vegas — fast diagnosis and repair of leaks, pilot failures, and no-hot-water calls. |
| `/water-damage-restoration/` | Water Damage Restoration Las Vegas \| Butler's Construction | Restore your Las Vegas property with expert water extraction, drying, repairs, and mold prevention after leaks, burst pipes, or flooding. |
| `/fire-smoke-damage-restoration/` | Fire & Smoke Damage Restoration in Las Vegas \| Butler's Construction | Restore your Las Vegas home after fire damage with expert smoke cleanup, odor removal, debris removal, and structural repair services. |
| `/handyman-services/` | Handyman Services In Las Vegas \| Butler's Construction | Get reliable handyman services in Las Vegas for drywall repair, painting, fixture replacements, carpentry, and home maintenance. |
| `/home-maintenance/` | Home Maintenance In Las Vegas \| Butler's Construction | Keep your Las Vegas home or rental in top shape with reliable repairs, cleaning, trash outs, seasonal upkeep, and rent-ready services. |
| `/privacy-policy/` | Privacy Policy \| Butler's Construction | How Butler's Construction & Service Solutions collects, uses, and protects the information you share through this website. |

### Metadata that changed

Three values were not carried over verbatim. Each is a defect in the source data rather
than an editorial decision.

| URL | WordPress value | New value | Reason |
| --- | --- | --- | --- |
| `/services/` (title) | `Services - bcs7022` | `All Services \| Butler's Construction` | Rank Math had no title, so WordPress fell back to the placeholder site name `bcs7022`. The new title follows the pattern used by all 42 other pages. |
| `/services/` (description) | *(none)* | See table above | The page had no meta description at all. |
| `/shower-tub-conversions/` (description) | `Fix sewer line issues in Las Vegas with expert cleaning, trenchless repairs, replacements, and advanced diagnostics for lasting reliability.` | See table above | Rank Math held the sewer-line description on this page — a copy/paste slip that left two URLs sharing one description that did not describe either page. Rewritten from this page's own copy. |

To restore any original value, edit `seoCorrections` in `data/services.ts` or the
`overrides` passed to `seo()` in `data/pages.ts`.

The 6 newly published URLs had no Rank Math data, so their titles and descriptions are
new, written from each page's own content and following the sibling pattern
`<Service> in Las Vegas | Butler's Construction`. They are in `seoFallbacks`
(`data/services.ts`) and in `privacyPage.seo` (`data/pages.ts`).

---

## 4. Canonicals

Every page emits a self-referencing canonical built from one source:

```ts
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bcss702.com';
export const SITE_URL = rawSiteUrl.replace(/\/+$/, '');
```

`absoluteUrl()` in `data/site.ts` is the only place a URL is assembled, so the scheme,
host and trailing slash are consistent across canonicals, Open Graph URLs, JSON-LD `@id`
values, the sitemap and `robots.txt`. The domain is never hardcoded anywhere else.

**Host consistency is a deployment responsibility.** Set `NEXT_PUBLIC_SITE_URL` to the one
canonical origin *before* running `npm run build`, and enforce that origin at the
proxy/CDN (redirect http → https and www → non-www, or the reverse, to match).

---

## 5. Open Graph and Twitter

Per page:

- `og:type` — `website` on the homepage, `article` elsewhere (matching Rank Math)
- `og:title`, `og:description` — the page's own values
- `og:url` — the canonical
- `og:site_name` — `Butler's Construction & Service Solutions`
- `og:locale` — `en_US`
- `og:image` — 1200×630 project photo with alt text
- `article:published_time` / `article:modified_time` — the original WordPress dates
- `twitter:card` — `summary_large_image`, plus title, description and image

> Rank Math emitted `og:site_name` and a schema `Organization.name` of **`bcs7022`** — the
> placeholder WordPress site title, not the business name. The real trading name is used
> instead, matching what every page renders on screen.

---

## 6. Structured data

Hand-written JSON-LD in `lib/schema.ts`, emitted through `components/seo/JsonLd.tsx`.
Every graph is generated from typed site data, never from user input, and validated as
parseable JSON in the automated audit.

| Schema | Where | Notes |
| --- | --- | --- |
| `HomeAndConstructionBusiness` + `GeneralContractor` + `Organization` | Every page (root layout) | Name, legal name, phone, email, logo, `PostalAddress`, `openingHours` from the published hours, `areaServed` for the 7 communities the site names, `sameAs` → Google Business Profile |
| `WebSite` | Every page (root layout) | Publisher linked to the Organization |
| `WebPage` | Every page | `@id`, canonical URL, name, description, `datePublished` / `dateModified` from the WordPress values |
| `BreadcrumbList` | Every inner page | Mirrors the visible breadcrumb trail exactly |
| `Service` | Each of the 37 service pages | `serviceType`, provider linked to the Organization, `areaServed` |
| `ItemList` | `/services/` | The 37 services in the order the grid renders them |

**Deliberately not implemented:** `AggregateRating` / `Review`. The homepage shows three
testimonials, but the site publishes no verifiable rating count, so marking them up would
risk fabricated review data. `FAQPage` is likewise absent — no page uses a Q&A format.

Rank Math also emitted an `Article` node with a `Person` author of `admin`. That is
inappropriate for service pages, and the "author" was the WordPress admin account rather
than a real byline, so it was replaced with `WebPage` + `Service`.

---

## 7. Sitemap

`app/sitemap.ts` generates `/sitemap.xml` from the same data the pages render, so it
cannot drift.

- 43 URLs — every indexable public page.
- `lastModified` uses each page's real WordPress `dateModified`, falling back to
  `datePublished`.
- Priorities: homepage `1.0`, `/services/` `0.9`, service pages / about / contact `0.8`,
  gallery `0.7`, privacy `0.3`.
- **Excluded**: `/api/*`, and there are no admin, private, noindex or duplicate URLs to
  exclude.
- Verified both directions against a crawl of the built site: no page missing from the
  sitemap, no sitemap URL that fails to resolve.

The WordPress sitemap lived at `/sitemap_index.xml` → `/page-sitemap.xml`. The new one is
at `/sitemap.xml`; submit it in Search Console after launch.

---

## 8. Robots

`app/robots.ts` generates:

```
User-Agent: *
Allow: /
Disallow: /api/

Host: https://bcss702.com
Sitemap: https://bcss702.com/sitemap.xml
```

WordPress disallowed `/wp-admin/` and allowed `/wp-admin/admin-ajax.php`; neither path
exists any more. Nothing public is blocked.

---

## 9. Breadcrumbs

The theme rendered a breadcrumb line in the hero of every inner page. Reproduced with the
same design, using `<nav aria-label="Breadcrumb"><ol>` with real links and
`aria-current="page"` on the last crumb, and backed by `BreadcrumbList` schema.

| Page type | Trail |
| --- | --- |
| Service pages | Home / Services / *Service name* |
| About, gallery, contact, privacy | Home / *Page name* |
| Homepage, `/services/` | none (as before) |

---

## 10. On-page SEO

- One `<h1>` per page, verified across all 43.
- Heading levels no longer skip (the theme jumped `h1` → `h3` in hero forms and used `h4`
  in footer columns). Font sizes are unchanged.
- Semantic landmarks: `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`, plus a
  skip link as the first tab stop.
- Every image has descriptive `alt` text, carried over from the theme. No empty and no
  keyword-stuffed alt attributes.
- Images are served through `next/image` with explicit dimensions or a sized container, so
  they do not shift layout, and in AVIF/WebP where the browser supports it.
- Internal linking is preserved in full: mega menu (32 links), footer columns, the
  `/services/` grid (37), the homepage specialty strip, and the cross-link grid on every
  service page (the other 36).
- The 404 page returns a real 404 status and lists all 37 services.

---

## 11. Verification

| Check | Result |
| --- | --- |
| Titles, descriptions, canonicals and `h1`s compared against all 37 published WordPress URLs | Identical except the three documented changes in §3 |
| Full body-text comparison per page | Identical |
| Link + asset crawl of the built site | 43 pages, 59 assets, 0 broken |
| Sitemap vs crawl, both directions | Exact match |
| Duplicate titles / descriptions | None |
| Canonical correctness on every page | Pass |
| Robots directives on every page | Pass — all indexable |
| Open Graph + Twitter completeness | Pass |
| JSON-LD parses on every page | Pass |
| Images without `alt` | None |
| Pixel comparison at 390 / 768 / 1024 / 1440 px | No visible differences |

---

## 12. Launch checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin, then `npm run build`.
2. Enforce one canonical host at the proxy/CDN (https, and pick www or non-www).
3. Confirm `/about/` → `/about-us/` still returns 301.
4. Spot-check a few canonicals and the sitemap on the live domain.
5. Submit `https://bcss702.com/sitemap.xml` in Google Search Console.
6. Keep the Google site verification token in `data/site.ts` in place — it is already
   emitted on every page.
7. Test the Google Rich Results tool against the homepage and one service page.
8. Monitor Search Console coverage for two weeks before decommissioning WordPress.
