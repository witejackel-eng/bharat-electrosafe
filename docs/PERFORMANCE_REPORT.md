# Performance Report

**No Lighthouse scores are claimed in this document.** No audit was run against
a deployed build during this pass, so every number below is either a measured
file size or a structural observation.

---

## 1. The biggest issue: images are unoptimised by design

`next.config.ts` sets:

```ts
images: { unoptimized: true }
```

This disables Next.js image optimisation entirely — no resizing, no AVIF/WebP
conversion, no responsive `srcset`. Every visitor downloads the full-size
original regardless of device.

Combined with what is actually in `public/`:

| Asset | Size |
|---|---|
| `app-power-utility.png` | 1.67 MB |
| `app-railway.png` | 1.57 MB |
| `app-manufacturing.png` | 1.52 MB |
| `app-tunnel.png` | 1.36 MB |
| `civil-protection.png` | 1.29 MB |
| `app-substation.png` | 1.25 MB |
| `app-control-room.png` | 1.23 MB |
| `electrical-insulation.png` | 1.24 MB |
| `hero-composition.png` | 1.00 MB |
| `factory.png` | 0.97 MB |
| `visible-safety.png` | 0.99 MB |
| `mat-texture.png` | 0.77 MB |
| `product-marking.png` | 0.66 MB |

**Total: ~15.5 MB of PNGs**, all served unoptimised.

The homepage alone references several of these. On mobile this is the dominant
cost and will hurt LCP more than anything else on the site.

### Why it was not changed here
The deployment target is `output: "standalone"` with a Caddy config, which
suggests self-hosting rather than Vercel. Next's optimiser needs a working
`sharp` in that runtime. Flipping the flag without being able to verify the
production runtime risks breaking image serving entirely.

### Recommended fix, in order of safety
1. **Re-encode the source files** to AVIF/WebP at sensible dimensions. This
   works regardless of the optimiser and is pure win — these are photographs
   stored as PNG, which is the wrong container. Expect roughly an order of
   magnitude reduction.
2. Then re-enable optimisation (`unoptimized: false`) once `sharp` is
   confirmed in the production image.

Doing (1) alone would likely take the image payload from ~15.5 MB to under
1.5 MB with no visible quality loss.

---

## 2. What is already good

| Item | State |
|---|---|
| Server Components by default | ✅ Only the gallery and contact form are client components |
| Client JS surface | ✅ Small — 92 packages removed this pass |
| Font loading | ✅ Single variable font via `next/font` |
| `priority` usage | ✅ Only on hero/product hero images |
| Heavy libraries | ✅ None — charting, carousel, date-picker and form libs all removed |
| Animation | ✅ CSS-only; no animation library |
| Static generation | ✅ 14 of 15 routes prerendered |
| Blocking third-party scripts | ✅ None |

Removing 92 packages meaningfully reduced the dependency surface, though most
were build-time rather than shipped bytes.

---

## 3. Motion and reduced-motion

Animation is limited to short fade-ups, a hover scale, and the accreditation
marquee (a 45 s linear cycle).

**Verified:** `globals.css` contains a `prefers-reduced-motion: reduce` block
that sets `animation: none !important` explicitly on `.animate-logo-rail`,
`.animate-fade-up`, `.animate-dropdown` and `.animate-logo-drift`, plus a
global animation/transition clamp. The marquee — the most likely
reduced-motion violation — is correctly disabled. No change needed.

---

## 4. Budgets for future assets

Derivative targets — see `ASSET_INTEGRATION_PLAN.md`:

| Output | Target |
|---|---|
| Hero | ≤ 250 KB |
| Gallery image | ≤ 180 KB |
| Thumbnail | ≤ 50 KB |
| Logo | ≤ 30 KB |
| Certificate thumbnail | ≤ 80 KB |

The client asset library contains ~12 MP originals and video running to
hundreds of megabytes. **Do not commit raw originals.** Video should be hosted
externally with a click-to-load poster, never autoplayed or self-hosted.

---

## 5. To measure next

1. Lighthouse (mobile) against a production build — record real LCP, CLS, INP.
2. Re-measure after image re-encoding; that is the change most likely to move
   the score.
3. Confirm no layout shift from the gallery on slow connections.

Targets to aim for: Performance 90+, Accessibility 95+, Best Practices 95+,
SEO 95+, LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms.
