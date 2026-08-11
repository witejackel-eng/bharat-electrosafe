# WAVE Alert Review — Bharat Electrosafe

**Date:** 2026-07-28
**Commit:** This audit pass
**Baseline:** 22 WAVE alerts, AIM score 7.8/10

## Classification methodology

Each WAVE alert from the baseline report has been classified into one
of four categories:

- **Genuine problem** — a real accessibility issue that should be fixed
- **Intentional and valid** — the alert is expected for a valid design
  decision and does not represent an accessibility barrier
- **Requires manual testing** — the alert may or may not be a problem
  depending on context that WAVE cannot evaluate automatically
- **False positive** — WAVE has misidentified valid markup as an alert

## Alerts identified and classified

### 1. Redundant links (multiple instances)

**Classification:** Intentional and valid

**Explanation:** The header navigation, footer navigation, and mobile
sheet navigation contain links to the same destinations (Home, About
Us, Contact Us, Products). This is standard practice — the header
provides quick navigation on desktop, the footer provides navigation
at the bottom of long pages, and the mobile sheet provides navigation
on small screens. Each navigation landmark has a distinct
`aria-label` ("Main navigation", "Footer company navigation", "Mobile
navigation") so screen reader users can distinguish them. WCAG 2.4.1
Bypass Blocks is satisfied by the landmark structure.

### 2. Nearby headings (heading proximity)

**Classification:** Intentional and valid

**Explanation:** Some sections have an H2 immediately followed by an
H3 (e.g., "Products" H2 followed by "Electrical Insulation" H3 in the
mega-menu). This is a valid heading hierarchy — there is no skipped
level. WAVE flags proximity as an alert for manual review, not an
error.

### 3. Suspicious alternative text

**Classification:** Requires manual testing — reviewed, no issues found

**Explanation:** Product images use descriptive alt text such as
"Bharat Electrosafe electrical insulating mat — anti-skid coin
texture surface". WAVE may flag these as "suspicious" if they contain
words like "image" or "photo" or are very long. All alt text has been
reviewed and is descriptive, not suspicious.

### 4. ARIA reference alerts (aria-controls / aria-labelledby)

**Classification:** Genuine problem (fixed in this pass)

**Explanation:** The Sheet close button had an `sr-only` "Close" span
that WAVE did not detect as an accessible name. This has been fixed by
adding an explicit `aria-label="Close navigation menu"` to the close
button. The Products dropdown chevron already had a state-aware
`aria-label` from the previous pass.

### 5. Small text (metadata-size text)

**Classification:** Intentional and valid

**Explanation:** The design system uses `text-metadata` (0.825rem /
13.2px) for secondary information such as certification labels,
document file sizes, and contact metadata. This is above the 12px
minimum recommended by WCAG and passes contrast requirements at
4.5:1 (the `text-be-grey-650` token #66666A has a contrast ratio of
5.7:1 on white). Small text alerts are informational, not violations.

### 6. New-tab links (target="_blank")

**Classification:** Intentional and valid

**Explanation:** External links (WhatsApp, Google Maps, certificate
PDFs) open in a new tab with `rel="noopener noreferrer"`. Each
external link has a descriptive accessible name (e.g., "Chat on
WhatsApp (opens in a new tab)"). Internal links do not open in new
tabs. This is a valid UX pattern for external resources.

### 7. Repeated navigation (header + mobile sheet)

**Classification:** Intentional and valid

**Explanation:** The desktop navigation and mobile sheet navigation
contain the same links. This is necessary because the desktop nav is
hidden on mobile (`hidden md:flex`) and the mobile sheet is hidden on
desktop (`md:hidden`). Only one is visible at any breakpoint. Each
has a distinct `aria-label`.

### 8. Tabindex alerts

**Classification:** False positive (no issues found in code review)

**Explanation:** No elements in the codebase use positive `tabindex`
values. The Accordion and Radix components use `tabindex="0"` for
interactive elements and `tabindex="-1"` for moved focus targets,
which is standard and correct. WAVE may flag these as informational
alerts.

## Fixes applied in this pass

1. **Sheet close button** — Added explicit `aria-label="Close
   navigation menu"` to supplement the `sr-only` text. This resolves
   the empty-button WAVE error and ensures the close control has a
   meaningful accessible name in all AT/browser combinations.

2. **Dialog close button** — Added `aria-label="Close dialog"` to the
   Dialog close control for the same reason.

3. **Toast close button** — Added `aria-label="Dismiss notification"`
   to the Toast close control.

4. **Select trigger labels** — Added `aria-labelledby` to both Select
   triggers in the contact form (Enquiry Type, Product Interest) so
   they expose their label text to screen readers. This resolves the
   axe-core "name" violation on the contact-us page.

5. **OfficeLocation icons** — Changed `text-be-yellow-500` to
   `text-be-yellow-text` on decorative icons next to contact text.

6. **ProductsClient bullets** — Changed `text-be-yellow-500` to
   `text-be-yellow-text` on decorative bullet characters.

## Retained alerts (intentional)

The following alert types are expected to remain after fixes and are
documented as intentional:

- Redundant links (header + footer + mobile — distinct landmarks)
- Nearby headings (valid H2→H3 hierarchy)
- Small text (`text-metadata` at 0.825rem, passes contrast)
- New-tab links (external links with descriptive names)
- Repeated navigation (responsive desktop/mobile, distinct labels)

## AIM score target

With the empty-button error fixed and contrast errors resolved, the
AIM score is expected to improve from 7.8 to 9.0+. The remaining
alerts are intentional and documented above. AIM score alone does not
constitute WCAG compliance — manual testing (keyboard, screen reader,
200% zoom, reduced motion) confirms accessibility.
