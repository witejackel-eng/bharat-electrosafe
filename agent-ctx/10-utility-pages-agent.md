# Task 10: Utility Pages — Privacy Policy, Terms, 404

**Agent:** utility-pages-agent
**Date:** 2025-03-05
**Status:** ✅ Completed

## Summary

Created 3 utility pages for the Bharat Electrosafe corporate website: Privacy Policy, Terms of Use, and custom 404 page. All pages use brand primitives from `src/components/ui/`, import Header and Footer from layout components, and follow the established page pattern with `min-h-screen flex flex-col bg-be-warm-white` root wrapper and Footer with natural `mt-auto` via flex layout.

## Files Created

| # | File | Description |
|---|------|-------------|
| 1 | `src/app/privacy-policy/page.tsx` | Privacy Policy page — 8 sections with professional Indian corporate privacy policy language. Breadcrumb (Home > Privacy Policy), SectionHeader with eyebrow "Legal", supporting text with "Last updated: January 2025". Sections: Information We Collect, How We Use Your Information, Data Storage and Security, Sharing of Information, Cookies, Your Rights, Third-Party Links, Contact for Privacy Concerns. Uses text-card-title for section headings (charcoal-800), text-body for paragraphs (be-grey-650), list-disc for bulleted items. IntersectionObserver reveal-up animation. |
| 2 | `src/app/terms/page.tsx` | Terms of Use page — 10 sections with professional terms language. Breadcrumb (Home > Terms), SectionHeader with eyebrow "Legal", supporting text with "Last updated: January 2025". Sections: Acceptance of Terms, Website Purpose, Product Information, Intellectual Property, Enquiries and Quotations, Limitation of Liability, External Links, Modifications, Governing Law, Contact. Same typography and spacing style as Privacy Policy. IntersectionObserver reveal-up animation. |
| 3 | `src/app/not-found.tsx` | Custom 404 page — Centered layout with min-h-screen flex items-center justify-center. Breadcrumb-like element (Home / 404 Error), "404" label in yellow-500, heading "Page not found" in text-section-h2, subtext in text-body-large be-grey-650, two action buttons (PrimaryButton "Return to Home" → /, SecondaryButton "Contact Us" → /contact-us). Clean and simple, no heavy decoration. Server component (no 'use client' directive) importing client components (PrimaryButton, SecondaryButton). |

## Key Design Decisions

- **Root wrapper**: `min-h-screen flex flex-col bg-be-warm-white` with Footer getting `mt-auto` naturally via flex-col layout (same pattern as all existing pages)
- **Typography**: Section headings use `text-card-title text-be-charcoal-800`, paragraphs use `text-body text-be-grey-650`, consistent with brand system
- **Breadcrumb**: Privacy Policy uses "Home > Privacy Policy", Terms uses "Home > Terms", 404 uses "Home / 404 Error" as breadcrumb-like element
- **SectionHeader**: Used for main page heading on Privacy Policy and Terms pages with eyebrow="Legal"
- **Content width**: `max-w-3xl` constraint on content sections for optimal readability
- **Spacing**: `gap-10` between content sections for adequate vertical spacing
- **Reveal animation**: IntersectionObserver on Privacy Policy and Terms pages (same pattern as all existing pages)
- **404 page**: No reveal animation needed — simple centered layout, server component importing client sub-components
- **Lists**: `list-disc pl-6` for bulleted content, `flex flex-col gap-2` for list items
- **Bold labels**: Used `<strong>` tags for emphasis within list items (e.g., "Essential cookies:", "Right to access:")
- **HTML entities**: Used `&apos;` for apostrophes, `&quot;` for quotes in Terms page to avoid JSX escaping issues

## Verification

- `bun run lint` — passed with zero errors
- Dev server compiling successfully on port 3000
