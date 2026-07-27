# Repository Audit

Audit of the Next.js application, with the state before and after this pass.
Every result below was produced by running the command, not inferred.

---

## 1. Baseline commands

| Check | Command | Before | After |
|---|---|---|---|
| Install | `npm install` | OK | OK |
| Lint | `npm run lint` | **1 error** | **Pass (0)** |
| Typecheck | `npm run typecheck` | **script missing** | **Pass (0)** |
| Build | `next build` | **Failed** | **Pass — 15 routes** |

`typecheck` did not exist as a script and has been added
(`"typecheck": "tsc --noEmit"`).

---

## 2. Build was broken — root cause

`next build` failed with:

```
./src/middleware.ts
Module not found: Can't resolve '@/lib/rate-limit'
```

`src/middleware.ts` **does not exist in this repository.**

Turbopack walks up the directory tree looking for a lockfile to determine the
workspace root. It found an unrelated `package-lock.json` in a parent directory
and adopted that folder as the root, then tried to compile a `middleware.ts`
belonging to a completely different project.

**Fix:** pin the root explicitly in `next.config.ts`:

```ts
turbopack: { root: projectRoot }
```

This makes the build independent of whatever sits above the repository —
worth keeping regardless of environment.

---

## 3. Lint error

`src/hooks/use-mobile.ts` called `setState` synchronously inside an effect
(`react-hooks/set-state-in-effect`). The hook had **no consumers** — its only
user was a sidebar component that is itself unused. Removed.

---

## 4. Security findings

### 4.1 `.env` committed to a public repository — HIGH
The repository tracks a `.env` file containing a `DATABASE_URL`, despite
`.gitignore` listing `.env*` (it was committed before the ignore rule, so the
rule has no effect).

The repository is public, so the value is world-readable and is preserved in
git history.

`DATABASE_URL` is **not referenced anywhere in `src/`** — it is dead weight
carrying a live secret.

**Required, in order:**
1. **Rotate the credential.** Assume it is compromised.
2. `git rm --cached .env` so it stops being tracked.
3. Removing it from history needs a rewrite (`git filter-repo`) plus a force
   push — **not performed here**, it is destructive and needs explicit
   approval. Rotation matters more than scrubbing history.

*This pass did not remove the file, to avoid changing deployment behaviour
without confirmation.*

### 4.2 Already in good shape
- `reactStrictMode: true`
- TypeScript and ESLint errors are **not** ignored in the build
- Security headers present: CSP, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`
- Contact API validates with Zod server-side
- No `dangerouslySetInnerHTML` on user input (only static JSON-LD)

### 4.3 Outstanding
- **HSTS is commented out** in `next.config.ts`. Enable in production once
  HTTPS is confirmed on the live domain.
- CSP includes `'unsafe-eval'` and `'unsafe-inline'` for scripts. Tightening
  this is worthwhile but needs testing against Next's inline bootstrap.

---

## 5. Dependency cleanup

The project shipped a full shadcn/ui component set. **Only 6 of 48 UI
components were imported anywhere**: accordion, badge, breadcrumb, button,
sheet, table.

Removed 42 unused UI components, the unused `use-toast` hook and the unused
`use-mobile` hook, then pruned the manifest accordingly.

**Result: 92 npm packages removed.**

Dropped: `@hookform/resolvers`, `react-hook-form`, 25 unused Radix packages,
`cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`,
`react-resizable-panels`, `recharts`, `sonner`, `vaul`.

Retained (verified in use): `@radix-ui/react-accordion`,
`@radix-ui/react-dialog`, `@radix-ui/react-slot`, `class-variance-authority`,
`clsx`, `lucide-react`, `next`, `react`, `react-dom`, `tailwind-merge`,
`tailwindcss-animate`, `zod`.

Nothing was removed without first confirming it had no import in `src/`.

### ⚠️ Lockfile change — action needed if you build with Bun
The project used **Bun** (`bun.lock`), but Bun is not available in the
environment this pass ran in, so dependency work was done with **npm**.

`bun.lock` has been **removed** and `package-lock.json` added. Leaving a stale
`bun.lock` behind would have been worse — it still referenced the 92 removed
packages.

**If your CI or deployment runs `bun install`,** regenerate the Bun lockfile
once and commit it:

```bash
bun install
```

The `start` script still uses Bun (`bun .next/standalone/server.js`) and was
left unchanged. The `build` and `dev` scripts also still use Unix `cp`/`tee`
and were deliberately left alone so the existing deployment pipeline is not
disturbed — they work on the Linux build target, just not on Windows.

---

## 6. Routes

All approved routes exist and build as static pages, plus one dynamic API
route. See `ROUTE_COMPLETION_MATRIX.md` for per-route detail.

```
○ /                                                    ○ /privacy-policy
○ /about-us                                            ○ /terms
○ /contact-us                                          ○ /_not-found
○ /products/electrical-insulating-mats                 ○ /robots.txt
○ /products/coloured-strip-insulating-mats             ○ /sitemap.xml
○ /products/bi-color-insulating-mats                   ƒ /api/contact
○ /products/auto-glow-reflective-band-insulating-mats
○ /products/bharat-membrane
```

### Slug inconsistency (fixed)
The data layer used `bi-colour-insulating-mats` and `bharatmembrane` while the
route directories and links used `bi-color-insulating-mats` and
`bharat-membrane`. Product lookups were done by the data slug, so the mismatch
was live. Data slugs now match the routes, and permanent redirects were added
for the old spellings.

### Redirects verified working
`/index.php` → `/` · `/about-us.php` → `/about-us` ·
`/products/bi-colour-insulating-mats` → `/products/bi-color-insulating-mats` ·
`/products/bharatmembrane` → `/products/bharat-membrane`

---

## 7. Broken assets (fixed)

| Issue | Count | Status |
|---|---|---|
| Gallery images pointing at a non-existent directory | 21 | Fixed — 0 broken images |
| Download links to non-existent PDFs | 8 | Removed |
| Missing client logo placeholder | 1 | Removed with the client list |

Verified in a running browser: **0 broken images**, **0 `/downloads/` links**.

---

## 8. Product page architecture

`ProductPageLayout` renders 12 sections for every mat product. The four mat
pages share identical specification, material, dimensions and application
tables — because the client genuinely publishes the same tables for all four.
The differentiation between them is therefore thin by nature.

The layout is not over-abstracted, but **section count is high** and the four
mat pages read similarly. Consolidation is a design decision rather than a
defect and is noted in the QA checklist as follow-up.

`MembranePageLayout` is correctly separate — no voltage tables leak into the
membrane page.

---

## 9. Remaining risks

1. **`.env` secret still in git history** — rotation required (§4.1).
2. **`images.unoptimized: true`** in `next.config.ts` disables Next's image
   optimisation while `public/` holds 1–1.7 MB PNGs. See
   `PERFORMANCE_REPORT.md`. Not changed here because the deployment target
   (standalone + Caddy) may lack a working image optimiser.
3. **Three content gaps** with no assets available — Bi-Color stills,
   membrane application photography, leadership. See
   `ASSET_INTEGRATION_PLAN.md`.
4. **Lighthouse not measured** — no scores are claimed anywhere.
