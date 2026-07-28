# Migration Map — Bharat Electrosafe (PHP → Next.js)

**Production domain:** https://bharatelectrosafe.com
**Legacy stack:** PHP (`.php` routes, client-rendered product pages)
**New stack:** Next.js App Router (Server Components, TypeScript)
**Redirect mechanism:** `redirects()` in `next.config.ts`, returning **HTTP 308 Permanent Redirect**.
**Redirect policy:** every redirect is **direct** (no intermediate hops) and uses **308 Permanent** so link equity is preserved and search engines update their indexes.

This document lists every legacy PHP URL and its new permanent destination.

---

## Redirect Map

| Old URL | New URL | Redirect type | Expected status | Reason |
|---|---|---|---|---|
| `/index.php` | https://bharatelectrosafe.com/ | 308 Permanent | 200 on destination | Homepage moved from PHP entry point to App Router root route. |
| `/about-us.php` | https://bharatelectrosafe.com/about-us | 308 Permanent | 200 on destination | About page migrated to `/about-us` (Server Component, AboutPage JSON-LD). |
| `/contact-us.php` | https://bharatelectrosafe.com/contact-us | 308 Permanent | 200 on destination | Contact page migrated to `/contact-us` (NAP + ContactForm + ContactPage JSON-LD). |
| `/electrical-insulating-mats.php` | https://bharatelectrosafe.com/products/electrical-insulating-mats | 308 Permanent | 200 on destination | Product page migrated into `/products/<slug>` structure (IS 15652:2006, Class A/B/C). |
| `/coloured-strip-insulating-mats.php` | https://bharatelectrosafe.com/products/coloured-strip-insulating-mats | 308 Permanent | 200 on destination | Product page migrated into `/products/<slug>` structure. |
| `/bi-color-insulating-mats.php` | https://bharatelectrosafe.com/products/bi-color-insulating-mats | 308 Permanent | 200 on destination | Product page migrated into `/products/<slug>` structure. |
| `/auto-glow-reflective-band-insulating-mat.php` | https://bharatelectrosafe.com/products/auto-glow-reflective-band-insulating-mats | 308 Permanent | 200 on destination | Product page migrated into `/products/<slug>` structure. Note the legacy URL used the singular `…-mat.php`; the new URL uses the plural `…-mats` for consistency with the rest of the catalogue. |
| `/bharat-membrane.php` | https://bharatelectrosafe.com/products/bharat-membrane | 308 Permanent | 200 on destination | Product page migrated into `/products/<slug>` structure. BharatMembrane is **not** an IS 15652:2006 insulating mat; its dedicated page makes this scope explicit. |
| `/BharatHydro-Seal.php` | https://bharatelectrosafe.com/products | 308 Permanent | 200 on destination | BharatHydro-Seal has been **permanently discontinued**. It redirects to the `/products` overview hub, which is the most relevant replacement page listing the current catalogue. **It does NOT redirect to `/products/electrical-insulating-mats`** — there is no like-for-like successor product. |

---

## Notes

- **Direct redirects (no intermediate hops):** Each legacy URL redirects in a single hop to its final destination. There are no chains such as `/about-us.php` → `/about-us` → `/about`. This keeps Time-To-First-Byte low and avoids diluting link equity.
- **308 Permanent preserves link equity:** HTTP 308 is the spec-compliant permanent redirect that preserves the original request method and is treated by Google and Bing as a strong signal to update the indexed URL and forward link equity. 308 is used instead of 301 because 308 is unambiguous about method preservation; both are honoured as permanent by all major search engines.
- **BharatHydro-Seal does NOT redirect to electrical insulating mats:** BharatHydro-Seal was a discontinued product with no direct successor. Redirecting it to `/products/electrical-insulating-mats` would have been misleading (it was not an insulating mat) and would have created a soft-404 risk. The `/products` hub is the correct, neutral replacement.
- **www → non-www and HTTP → HTTPS are handled at the edge** (Vercel or Caddy, per `Caddyfile`). These are configured as single permanent redirects at the edge layer so they compose cleanly with the application-level PHP→Next.js redirects and **do not create redirect chains** (e.g. `http://www.bharatelectrosafe.com/index.php` resolves to `https://bharatelectrosafe.com/` in at most two hops: edge strip, then app redirect).
- **Internal links and sitemap contain only final URLs:** All in-site links (header nav, footer, breadcrumbs, product hub) and every entry in `sitemap.xml` reference the new canonical URLs only. No internal link points at a legacy `.php` URL. This ensures crawlers see the new URL structure as authoritative.
- **Preview deployments are `noindex`:** `robots.ts` returns `Disallow: /` on non-production hosts so that preview/branch deployments do not get indexed and compete with the production canonical URLs.
- **Post-launch external steps (cannot be done in code):**
  1. Submit the new `sitemap.xml` (https://bharatelectrosafe.com/sitemap.xml) in Google Search Console.
  2. Submit the sitemap in Bing Webmaster Tools.
  3. Use Search Console's URL Inspection tool to request indexing of the new canonical URLs.
  4. Monitor the Coverage report over the following weeks to confirm the legacy `.php` URLs are dropped from the index in favour of the new URLs.
