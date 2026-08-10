# Final Audit — Before Changes

**Date:** 2026-07-30
**Repository:** witejackel-eng/bharat-electrosafe
**Original `main` SHA:** `055e8cd7eb147acb7a5b4509155397732343c278`

## Baseline Metrics

| Metric | Value |
|--------|-------|
| `main` branch commit SHA | `055e8cd7eb147acb7a5b4509155397732343c278` |
| Repository visibility | Public |
| Tracked files | 644 |
| Repository size | ~187.50 MiB (pack) |
| Production dependencies | 65 |
| Development dependencies | 11 |
| Bun version | 1.3.14 |

## Existing Routes

- `/` (homepage)
- `/products` (product hub)
- `/products/electrical-insulating-mats`
- `/products/coloured-strip-insulating-mats`
- `/products/bi-color-insulating-mats`
- `/products/auto-glow-reflective-band-insulating-mats`
- `/products/bharat-membrane`
- `/products/bharat-hydro-seal`
- `/about-us`
- `/contact-us`
- `/privacy-policy`
- `/terms`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/api/contact` (POST)
- `/api` (GET — "Hello, world!" placeholder)

## Existing Tests

- `tests/a11y/accessibility.spec.ts`
- `tests/a11y/content-compliance.spec.ts`
- `tests/a11y/header-mobile.spec.ts`
- `tests/a11y/hero-desktop-compress.spec.ts`
- `tests/a11y/hero-mobile.spec.ts`
- `tests/a11y/industry-references.spec.ts`
- `tests/a11y/leadership-biography.spec.ts`
- `tests/a11y/leadership-responsive.spec.ts`
- `tests/a11y/product-assurance.spec.ts`
- `tests/a11y/product-hero-compress.spec.ts`
- `tests/a11y/public-content-leakage.spec.ts`
- `tests/a11y/seo-regression.spec.ts`

## Existing Security Controls

- Server-side Resend usage
- Exact origin comparison
- Zod validation
- HTML escaping of user-controlled email content
- Server-only API key access
- Safe error responses
- Redacted logs
- No raw HTML from form users
- No `unsafe-eval`
- HSTS (with preload)
- Content Security Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy
- Permissions-Policy
- Preview noindex controls
- .env exclusion

## Build Status

- Type-check: ✅ Pass
- Lint: ✅ Pass (1 warning)
- Build: ✅ Pass (with `--webpack` flag; Turbopack crashes)

## Dependency Vulnerabilities

- 65 production dependencies (many unused)
- No audit run yet

## Issues Identified

1. `.env` file is tracked by git (contains local DATABASE_URL)
2. 48 unused shadcn/ui components with 47 unused dependency packages
3. Dead API route (`/api` returning "Hello, world!")
4. Prisma schema (User + Post models) — unused scaffolding
5. Caddyfile with open proxy (`XTransformPort`) — sandbox-only
6. Sandbox IP (`21.0.13.102`) in `allowedDevOrigins`
7. No `poweredByHeader: false`
8. HSTS includes `preload` without verifying subdomain control
9. Internal editorial notes in source comments
10. No README.md
11. No SECURITY.md
12. No CI/CD pipeline
13. No Dependabot configuration
14. No CodeQL workflow
15. Contact form lacks: strict schema, content-type check, rate limiting, honeypot, timing check, Cache-Control: no-store
16. No handoff documentation
17. No security audit documentation
18. User-agent diagnostics in email body (PII concern)
