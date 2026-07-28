# Bharat Electrosafe — Local SEO Implementation Checklist

This checklist covers **external, human-driven** local SEO actions for the
client. Code-level SEO (metadata, JSON-LD, sitemap, robots, canonicals) is
already implemented on the website; the items below are the actions the
client must complete outside the codebase.

> **NAP source of truth:** The company's Name, Address, and Phone are
> centralized in `src/lib/site-config.ts` and rendered consistently in the
> site footer, contact page, and `Organization` / `PostalAddress` JSON-LD.
> Use that exact NAP for every external listing below. Do **not** create
> fake city landing pages (e.g. "Insulating Mats in Mumbai", "Delhi NCR
> supplier") — they violate the project's content integrity rules and add
> no real local SEO value.

---

## Google Business Profile consistency

- [ ] Claim the Noida Google Business Profile for Bharat Electrosafe (postcard or phone verification through a controlled business inbox).
- [ ] Ensure NAP on GBP matches the website **exactly** (Name: Bharat Electrosafe; Address: Sector 62, Noida, Uttar Pradesh 201309, India; Phone: +91 98100 00000; Email: info@bharatelectrosafe.com). Confirm exact unit/sector before launch.
- [ ] Add primary GBP category **"Electrical Equipment Manufacturer"** and secondary category **"Safety Equipment Supplier"**.
- [ ] Add the verified service area (India + overseas where verified) and business hours (Mon–Sat, 09:30–18:30 IST).
- [ ] Add real photographs: product close-ups, BIS label, factory floor, installation photos (with customer permission), certificate thumbnails (redact sensitive numbers if required).
- [ ] Collect **genuine** customer reviews only — no incentivising, no gating that violates GBP policy, no fabricated reviews. Respond professionally to every review.

## Search Console verification

- [ ] Verify `bharatelectrosafe.com` as a property in Google Search Console (DNS TXT record recommended for domain property covering all subdomains).
- [ ] Submit `https://bharatelectrosafe.com/sitemap.xml` and confirm it is processed without errors.
- [ ] Review the **Coverage** / **Pages** report regularly for indexed vs. excluded URLs and fix any unexpected exclusions.
- [ ] Monitor the **Crawl stats** and **URL Inspection** for crawl errors, soft 404s, or redirect chains; resolve promptly.

## Bing Webmaster Tools

- [ ] Verify the site in **Bing Webmaster Tools** (DNS or meta tag verification).
- [ ] Submit `sitemap.xml` to Bing.
- [ ] Monitor Bing indexing status and crawl errors on a recurring schedule.
- [ ] Use Bing's SEO Reports and Keyword Research tools as a secondary signal alongside Google Search Console.

## Google Analytics / GTM

- [ ] Set up a **GA4** property (and/or a Google Tag Manager container) for `bharatelectrosafe.com`.
- [ ] Implement **consent mode v2** (or an equivalent consent mechanism) before deploying analytics — required for GDPR/DPDP compliance and accurate GA4 measurement.
- [ ] Exclude internal traffic (office IP, manufacturing facility IP, agency IPs) via filters/referral exclusions.
- [ ] Track the **quotation form submission** (`/api/contact` success events) as a conversion in GA4/GTM.
- [ ] Verify event tracking with Tag Assistant / DebugView before going live.

## Industry directory listings

- [ ] Create or verify the Bharat Electrosafe profile on **IndiaMART** — consistent NAP, BIS reference, correct product categories (Electrical Insulating Mats, IS 15652:2006).
- [ ] Create or verify the profile on **TradeIndia** — same NAP and product description.
- [ ] Create or verify the profile on **ExportersIndia** — same NAP and product description.
- [ ] Create or verify the profile on **JustDial** — same NAP, categories, and hours.
- [ ] For every directory above, confirm the listed phone number, address, and email match `src/lib/site-config.ts` exactly. No "near me" keyword stuffing in the listing title.

## Consistent company citations

- [ ] Audit all existing online mentions of "Bharat Electrosafe" (search the web, social platforms, association directories, B2B marketplaces).
- [ ] Ensure NAP is uniform across every mention — same spelling of the company name, same address format, same phone format, same email.
- [ ] Fix any inconsistencies directly with the platform (claim listing, request edit, or remove duplicate entries).
- [ ] Re-audit citations quarterly. Citation drift (different phone numbers, old addresses, duplicated listings) undermines local search trust.

---

## Reminders

- **No fake city landing pages.** Do not generate "City + product" pages for cities where the company has no physical presence or verified service relationship. This is a content-integrity rule for the project, not a stylistic preference.
- **No fabricated client lists, reviews, or testimonials.** Customer case studies require written permission.
- **NAP changes start in `src/lib/site-config.ts`** and propagate to the footer, contact page, and structured data. If the registered address or phone changes, update the code first, then update every external listing to match.
