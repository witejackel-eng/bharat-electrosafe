# Bharat Electrosafe — International SEO Readiness Plan

This document explains how **future** country/language versions of the
Bharat Electrosafe website should be implemented, and records the
international-readiness decisions already applied in the current codebase.

The current site is **English-only**, targeted primarily at India with
verified overseas enquiries handled case-by-case. No hreflang is implemented
yet because no translated or region-specific pages exist; adding hreflang
prematurely — without genuine alternate content — would be actively harmful.

---

## Current state (already implemented in code)

The following are already in place and should be preserved as the baseline:

- **Document language:** root `<html lang="en">` is set in the layout.
- **Phone numbers:** all phone numbers use the international `+91` format,
  dialable from outside India.
- **Address schema:** `PostalAddress` JSON-LD uses `addressCountry: "IN"`,
  with Noida, Uttar Pradesh, India as the registered address.
- **Open Graph locale:** `og:locale` is set to `en_IN` (English as used in
  India).
- **Service area:** declared as "India and overseas (where verified)" — no
  unverified claims of physical presence in other countries.
- **Units and terminology:** technical specifications use internationally
  understood units (kV, mm, kg/m²) alongside Indian terminology and
  standards references (IS 15652:2006, BIS).
- **Canonical URLs:** each page has a single self-referencing canonical
  pointing to the English root URL — no duplicate or regional variants
  exist that would require cross-canonical coordination.
- **No fake translated pages:** there are no machine-translated stub pages
  or auto-generated locale subdirectories.
- **No premature hreflang:** no `hreflang` link tags are emitted, because
  there are no genuine alternate-language or alternate-region pages to
  declare. Emitting hreflang pairs that point back to the same English
  page is incorrect and can confuse search engines.

---

## Future implementation guidance

When the company is ready to genuinely serve another country or language
(e.g. UAE, Singapore, Middle East French/Arabic audiences), implement the
following **together** — partial implementation is worse than none.

### 1. Separate, indexable URLs per locale

- Use locale subdirectories such as `/ae/`, `/sg/`, or `/en-sg/`, OR
  country-code top-level domains (ccTLDs) such as `bharatelectrosafe.ae`.
  Subdirectories are simpler to maintain on a single Next.js deployment.
- Each locale URL **must host unique content**. Duplicating the English
  page at `/ae/` with only a phone number changed is not acceptable and
  will be treated as duplicate content.

### 2. Fully translated metadata

- Translate `<title>`, `<meta name="description">`, Open Graph tags
  (`og:title`, `og:description`, `og:locale`), and Twitter card text into
  the target language — by a human translator or reviewed professional
  translation, not machine-generated stubs.
- Update `og:locale` to the correct locale code (e.g. `ar_AE`, `en_SG`).
- Update `buildMetadata()` in `src/lib/seo.ts` to accept locale-aware
  values per route.

### 3. Localised content (not just translated)

- Adapt regulatory context: e.g. for UAE, reference IEC 61111 (the
  international equivalent often recognised alongside IS 15652) and any
  local ESMA / civil defence requirements where applicable.
- Localise contact information: regional phone number (with correct
  country code), local email or enquiry form, local office address if one
  exists. Do not list a fake local address.
- Localise units where the market expects them (e.g. some markets use
  inches or feet alongside mm). Keep SI units as the primary technical
  reference for IS 15652 compliance.

### 4. Self-referencing canonicals per language version

- Each locale page must carry a **self-referencing canonical** pointing to
  its own URL, not to the English root. Example: `/ae/products/...` →
  `canonical = https://bharatelectrosafe.com/ae/products/...`.
- This confirms the locale page is the canonical version for that
  language/region, not a duplicate of the English page.

### 5. Correct hreflang tag pairs

- When at least one genuine translated/region-specific page exists,
  emit `hreflang` link tags on **every** language version of that page,
  including the English root.
- Use ISO 639-1 language + ISO 3166-1 alpha-2 region, e.g.:
  - `en-IN` — English for India (current root)
  - `en-AE` — English for UAE (if a regional English variant is published)
  - `ar-AE` — Arabic for UAE (if a translated Arabic page exists)
  - `en-SG` — English for Singapore
- Always include `x-default` pointing to the English root URL
  (`https://bharatelectrosafe.com/`), so users from unsupported regions
  land on the default English version.
- Every hreflang URL must be bidirectional: if page A lists page B as an
  alternate, page B must list page A as an alternate. Missing return tags
  cause hreflang to be ignored.

### 6. Regional contact and compliance information

- Each locale page should display a regional contact: phone with correct
  country code, local business hours in the local time zone, and a local
  email if available. If no local presence exists, state clearly that
  enquiries are handled from India.
- Reference local standards where applicable (e.g. IEC 61111 alongside
  IS 15652 for overseas markets). Do not claim certification to a
  standard the product is not actually certified to.
- Update `PostalAddress` and `Organization` JSON-LD on locale pages to
  reflect the correct regional `addressCountry` and contact points, or
  use `ContactPoint` entries with `areaServed` and `availableLanguage`.

### 7. Implementation order — do not skip ahead

- **Step 1:** Translate and localise the page fully (content, metadata,
  contact info, compliance context).
- **Step 2:** Add the page at its own indexable URL with a
  self-referencing canonical.
- **Step 3:** Add hreflang pairs **only after** the alternate page is
  live, fully translated, and locally reviewed. Update all sibling pages
  to reference it bidirectionally.
- **Step 4:** Submit the new locale URLs and sitemap entries in Search
  Console and Bing Webmaster Tools.

### 8. When NOT to implement hreflang

- Do **not** add hreflang tags pointing only to the existing English page.
- Do **not** add hreflang for languages or regions with no published
  alternate page.
- Do **not** publish machine-translated stub pages just to "unlock"
  hreflang — thin or low-quality translations harm rather than help.
- Do **not** declare a regional variant (e.g. `en-AE`) unless the content
  is genuinely differentiated from the English root (regional contact,
  regulatory context, units).

---

## Why the current state is correct

A single, well-structured English page with correct `lang`, schema, and
self-referencing canonicals is preferable to a half-implemented
multilingual structure. Search engines correctly understand the site as
English content originating from India, serving verified overseas
enquiries without misrepresenting regional presence. When real demand and
resources for a second language/region exist, the steps above provide a
clean migration path with no rework of the current SEO foundation.
