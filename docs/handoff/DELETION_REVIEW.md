# Deletion Review — Commit 71dfca5

## Overview

Commit 71dfca5 removed 145 files and 47 production dependencies, reducing the package count from 834 to approximately 160. This document reviews every deletion category and confirms whether the removal was safe.

---

## 1. Deleted UI Components (src/components/ui/)

The following 42 shadcn/ui component files were removed:

alert-dialog, alert, aspect-ratio, avatar, badge, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input-otp, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, separator, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip

**Why considered unused**: grep for `from '@/components/ui/<name>'` across all `src/` TypeScript files returned zero results for each deleted component. The remaining UI components (button, accordion, FAQ, SectionHeader, PrimaryButton, SecondaryButton, SectionShell, ImageFrame, FeatureList, TextLink, Breadcrumb, Eyebrow, TechnicalBadge, DataTable, DocumentCard, LogoGrid, LogoRail, BackToTop, MobileStickyCTA, RevealObserver, ScrollProgress, select, sheet) are all actively imported.

**Runtime impact**: None. These components had zero imports in the application codebase.

**Verification**: Full import search performed against `src/` directory. No references found.

**CRITICAL FINDING**: The `sheet.tsx` component (used by Header mobile navigation) imports `@radix-ui/react-dialog`, which was removed from `package.json`. The `@radix-ui/react-dialog` package currently exists in `node_modules/` only because it is a stale artifact from the previous install. A clean `bun install` from the current lockfile will NOT install it, causing the Sheet component and mobile navigation to break. **This must be fixed before push.**

---

## 2. Deleted Dependencies (package.json)

### Removed Production Dependencies

| Package | Reason | Import Evidence | Runtime Impact |
|---------|--------|-----------------|----------------|
| @dnd-kit/core | Zero imports in src/ | grep confirmed | None |
| @dnd-kit/sortable | Zero imports in src/ | grep confirmed | None |
| @dnd-kit/utilities | Zero imports in src/ | grep confirmed | None |
| @mdxeditor/editor | Zero imports in src/ | grep confirmed | None |
| @prisma/client | Zero imports in src/; prisma/schema.prisma deleted | grep confirmed | None |
| @radix-ui/react-alert-dialog | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-aspect-ratio | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-avatar | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-checkbox | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-collapsible | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-context-menu | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-dialog | **BUG**: Still imported by sheet.tsx | sheet.tsx imports it | **BREAKS mobile nav** |
| @radix-ui/react-dropdown-menu | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-hover-card | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-label | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-menubar | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-navigation-menu | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-popover | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-progress | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-radio-group | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-scroll-area | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-separator | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-slider | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-switch | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-tabs | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-toast | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-toggle | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-toggle-group | Zero imports; component deleted | grep confirmed | None |
| @radix-ui/react-tooltip | Zero imports; component deleted | grep confirmed | None |
| @reactuses/core | Zero imports in src/ | grep confirmed | None |
| @tanstack/react-query | Zero imports in src/ | grep confirmed | None |
| @tanstack/react-table | Zero imports in src/ | grep confirmed | None |
| cmdk | Zero imports; command component deleted | grep confirmed | None |
| date-fns | Zero imports in src/ | grep confirmed | None |
| embla-carousel-react | Zero imports; carousel component deleted | grep confirmed | None |
| input-otp | Zero imports; component deleted | grep confirmed | None |
| next-auth | Zero imports in src/ | grep confirmed | None |
| next-intl | Zero imports in src/ | grep confirmed | None |
| next-themes | Zero imports in src/ | grep confirmed | None |
| prisma | Schema deleted; not used at runtime | grep confirmed | None |
| react-day-picker | Zero imports; calendar component deleted | grep confirmed | None |
| react-markdown | Zero imports in src/ | grep confirmed | None |
| react-resizable-panels | Zero imports; resizable component deleted | grep confirmed | None |
| react-syntax-highlighter | Zero imports in src/ | grep confirmed | None |
| recharts | Zero imports; chart component deleted | grep confirmed | None |
| sonner | Zero imports; sonner component deleted | grep confirmed | None |
| uuid | Zero imports in src/ | grep confirmed | None |
| vaul | Zero package imports; "vaults" in product text is false positive | grep confirmed | None |

---

## 3. Deleted Scripts and Infrastructure (.zscripts/)

Removed: build.sh, database-runtime-build.sh, dev.pid, dev.sh, mini-services-build.sh, mini-services-install.sh, mini-services-start.sh, python-runtime-build.sh, start.sh

**Reason**: These were development/agent scaffolding scripts not used in the production build or deployment pipeline. The project uses `next dev` and `next build` directly.

**Runtime impact**: None. Vercel deployment uses `next build` and `next start`.

---

## 4. Deleted Documentation Files

| File | Reason | Impact |
|------|--------|--------|
| INTERNATIONAL-SEO-PLAN.md | Internal planning doc, not client-facing | None |
| LOCAL-SEO-CHECKLIST.md | Internal planning doc | None |
| MIGRATION-MAP.md | Internal planning doc | None |
| SEO-AUDIT-RESULTS.md | Internal planning doc | None |
| SEO-OFFPAGE-PLAN.md | Internal planning doc | None |
| lighthouserc.json | CI config not used in Vercel deployment | None |

---

## 5. Deleted Agent Context Files (agent-ctx/)

All agent context files removed. These were internal development artifacts not used at runtime.

**Impact**: None.

---

## 6. Deleted Download/QA Screenshots (download/)

Removed: desktop-homepage-enhanced.png, header-qa/*.png, hero-redesign/*.png, leadership-redesign/*.png, mobile-homepage-enhanced.png, mobile-scroll*.png, qa-homepage-desktop.png

**Reason**: These were QA/development screenshots taken during the design process. They are not served by the application.

**Impact**: None on runtime. These were not referenced by any application code.

---

## 7. Deleted Examples and Unused Code

| File | Reason | Impact |
|------|--------|--------|
| examples/websocket/frontend.tsx | Unused WebSocket example | None |
| examples/websocket/server.ts | Unused WebSocket example | None |
| src/app/api/route.ts | Unused API route (returned simple JSON) | None |
| src/hooks/use-toast.ts | Toast component deleted; no imports | None |
| Caddyfile | Reverse proxy config not used in Vercel | None |
| mini-services/.gitkeep | Empty directory placeholder | None |

---

## 8. Deleted Database Files

| File | Reason | Impact |
|------|--------|--------|
| db/custom.db | SQLite database not used in production | None |
| prisma/schema.prisma | Prisma schema not used in production | None |

**Verification**: No Prisma imports remain in src/. The contact form uses the Resend API.

---

## 9. Deleted Upload/Prompt Files

| File | Reason | Impact |
|------|--------|--------|
| upload/ZAI_Bharat_Electrosafe_Client_Ready_Layout_Visual_Master_Prompt.md | Internal agent prompt | None |
| upload/pasted_image_1785257455684.jpg | Internal reference image | None |

---

## 10. Deleted Test Infrastructure

| File | Reason | Impact |
|------|--------|--------|
| tests/python-runtime-build.sh | Python container test not relevant | None |
| tests/python-runtime-container.sh | Python container test not relevant | None |

---

## 11. package-lock.json Deletion

Replaced by `bun.lock` as the project uses Bun as its package manager. The `bun.lock` is the authoritative lockfile.

---

## 12. Critical Assets NOT Deleted (Verified Present)

- [x] Product images: public/media/products/ (all 6 products)
- [x] Certificates: public/media/certificates/ (10 files)
- [x] Certifications: public/media/certifications/ (13 files)
- [x] Public PDFs: public/media/documents/ 
- [x] Favicon assets: public/favicon.ico, favicon-16x16.png, favicon-32x32.png, favicon-48-be.png
- [x] Open Graph assets: public/og/bharat-electrosafe-og-v2.png, bharat-electrosafe-twitter-v2.png
- [x] Required UI components: button, accordion, sheet, select, FAQ, all custom components
- [x] Mobile navigation: Header uses sheet.tsx (but @radix-ui/react-dialog dependency is missing — see finding)
- [x] Product-gallery dependencies: All present
- [x] Contact-form dependencies: All present
- [x] SEO tests: Security regression tests added
- [x] Deployment configuration: next.config.ts updated
- [x] Bharat Hydro Seal content: page.tsx, BHSClient.tsx, media assets all present

---

## 13. Issues Found

### CRITICAL: Missing @radix-ui/react-dialog dependency

The `sheet.tsx` component (used by the Header for mobile navigation) imports `@radix-ui/react-dialog`, but this package was removed from `package.json`. It currently exists in `node_modules/` only as a stale artifact. A fresh install will break the mobile navigation.

**Required fix**: Add `@radix-ui/react-dialog` back to `package.json` dependencies.

---

## Conclusion

All deletions are safe EXCEPT the removal of `@radix-ui/react-dialog`, which is still imported by the Sheet component used for mobile navigation. This must be restored before the commit is pushed.
