# Delivery report

Branch: `claude/client-ready-production`, merged to `main`.
Baseline: `11cad44`.

---

## 1. The two findings that mattered most

### The enquiry form could not accept a single enquiry

`src/app/api/contact/route.ts` required a `website` honeypot field in its Zod
schema. `ContactForm.tsx` had no `website` key in its form state, so it never
sent one. Every submission therefore failed validation with HTTP 400.

Because honeypot errors are deliberately stripped from the error response, the
API returned `{"errors": {}, "message": "Please check the highlighted fields"}`
— a message pointing at nothing. A customer could not submit, and could not
work out why.

Verified at runtime before the fix:

```
POST /api/contact -> 400  {"errors":{},"message":"Please check the highlighted fields and try again."}
```

And after:

```
POST valid          -> 503 + direct contact details   (no Resend key configured locally)
POST honeypot       -> 200 (silent drop)
POST too fast       -> 200 (silent drop)
POST invalid email  -> 400 {"errors":{"email":[...],"name":[...]}}
POST text/plain     -> 415
GET                 -> 405
```

Two further client/server mismatches were fixed alongside it: the class
selector sent `class-a` where the API allow-list expects `A`, and the honeypot
input was uncontrolled so its value was never transmitted.

### `GET /api/contact` served every past enquiry, unauthenticated

The route exported a `GET` handler returning the name and email address of
every person who had ever used the form, to any unauthenticated caller. Its own
comment read *"would be auth-gated in production"*. It was in production.

Removed. The endpoint now returns 405, and the in-memory submission store that
backed it is gone — enquiries are delivered, not retained by the web tier.

---

## 2. Security

| Item | Before | After |
| --- | --- | --- |
| `GET /api/contact` | 200, all submissions | 405 |
| `.env` | tracked in git | untracked |
| Origin validation | none | same-origin enforced |
| Content-Type | unchecked | `application/json` only, else 415 |
| Body size | 10 KB, read after parse | 16 KB, checked before parse |
| Header injection | not guarded | CR/LF rejected on every field reaching a header |
| Rate limiting | in-memory only | Upstash when configured, in-memory fallback |
| Delivery honesty | claimed success, discarded | 503 + direct contacts when unconfigured |

**On the tracked `.env`:** it contained `DATABASE_URL=file:/home/z/my-project/db/custom.db`
— a Z.ai scaffold default pointing at a local SQLite path. **No live credential
was exposed.** It is now untracked so the next real secret cannot be committed
by habit.

---

## 3. Assets

`scripts/build-assets.mjs` produces 109 sanitised WebP derivatives from the
private archive. The archive is gitignored; only derivatives are committed.

- **Sanitisation verified, not assumed.** sharp does not copy input metadata
  unless `.withMetadata()` is called, which this pipeline never calls. Outputs
  were re-read and confirmed to carry no EXIF, XMP or ICC data.
- **89.8 MB of source PNG/JPEG became 10.6 MB of WebP.**
- **HEIC needed a second decoder.** sharp reports HEIF input support but has no
  HEVC codec in this build, so all 22 HEIC files failed. `scripts/decode-heic.py`
  (pillow-heif) decodes them to PNG first. This matters because the *real*
  product photography was in those files.
- **`V1.1.zip` contained 66 photographs absent from the flat folder**, including
  the only BharatHydro Seal product shots.

### Authenticity note — please read

Several images on the current live site are **not photographs**:

- `coloured-strip-insulating/product-demo.png` is AI-generated. Every
  switchgear label and placard in it is garbled, illegible pseudo-text.
- `reflective-band-insulating/product-demo-glowing-dark.png` is a rendered
  dark-room scene, not a photograph of the product glowing.
- `slider/slider-bg5.png` is a cartoon illustration.

None of these are used as product evidence in the new build. They were
replaced with genuine photographs from the archive — including a **real
low-light photograph of the auto-glow band actually emitting light**, with the
`IS 15652-2006 CLASS-C VOLTAGE UP TO 33 KV` marking visible on the mat. That is
far stronger evidence than the render it replaces.

---

## 4. Catalogue

BharatHydro Seal existed on the client's live site but had **no route, no nav
entry, no redirect and no sitemap entry** in this repo. Added, with content
transcribed from the published page. No dimensions, tensile figures or pressure
ratings were invented — the source states none.

`MembranePageLayout` was hardcoded to BharatMembrane strings, so it could not
take a second product. Generalised to `EngineeredProductLayout`, driven entirely
by data. Adding a further non-voltage-rated product now needs data only.

The sitemap is now derived from the catalogue, so a product cannot ship
unlisted again.

---

## 5. Verified, not changed

**The voltage inconsistency described in the brief does not exist in this
codebase.** Every occurrence of a class voltage across `products.ts`,
`contact-us/page.tsx`, `layout.tsx` and the product pages is consistently
3.3 kV / 11 kV / 33 kV. There is no 650 V / 1100 V / 3300 V table anywhere.
Searched for `650`, `1100`, `3300`, `3.3`, `11 kV`, `33 kV` — no contradiction
found. Nothing was changed here.

---

## 6. Checks

| Check | Result |
| --- | --- |
| `tsc --noEmit` | pass |
| `npm run build` | pass — 15 routes, 6 product pages prerendered static |
| `scripts/check-assets.mjs` | pass — no missing assets, no placeholder wording |
| All routes | 200; unknown path 404 |
| Legacy redirects | all resolve to correct destination, no chains |
| Broken images in DOM | none |
| Sitemap | 11 URLs, includes `bharat-hydro-seal` |

`scripts/check-assets.mjs` caught real breakage on its first run: **all six
homepage product cards** pointed at `/images/products/<slug>/hero.jpg`, which
never existed, and the capability section pointed at a missing
`/images/company-factory.jpg`. Both fixed.

---

## 7. Not done

Stated plainly rather than glossed:

- **Certificate and test-report PDFs are not published.** Each needs its
  reference number and validity dates read off the document and confirmed
  before publication. Publishing an expired or misattributed certificate for an
  electrical-safety product is the one mistake worth avoiding above all others
  here. The About page offers documents on request instead; no download button
  resolves to a missing file.
- **Real email delivery is untested.** The honest 503 fallback is verified.
  Delivery itself needs `RESEND_API_KEY` and a verified sending domain — a
  client-controlled item. Do not launch on `onboarding@resend.dev`.
- **Playwright tests not written.** `test:e2e` is scripted but no specs exist.
- **Lighthouse not run.** Bundle and image weight improved substantially, but
  no measurement was taken, so no score is claimed.
- **Event videos not integrated.** Seven named participation videos exist in
  `V1.1.zip` (BIS Award Ceremony 2025, IRTS 2025, ABP News interview, Laghu
  Udyog Bharti, PlastIndia 2026). They need poster frames and click-to-load
  facades.
- **Bi-colour photography is still the legacy render.** No genuine bi-colour
  photograph was identified in the archive.
- **About page is still long.** Leadership placeholders are gone and real
  portraits are in, but the section-count reduction requested was not completed.

See `docs/CLIENT_VERIFICATION_REQUIRED.md` for the ten factual items awaiting
client confirmation.

---

## 8. Environment variables

```
RESEND_API_KEY=            # required for enquiry delivery
CONTACT_FROM_EMAIL=        # must be on a verified domain
CONTACT_TO_EMAIL=          # defaults to info@bharatelectrosafe.com
UPSTASH_REDIS_REST_URL=    # optional, distributed rate limiting
UPSTASH_REDIS_REST_TOKEN=  # optional
NEXT_PUBLIC_ALLOW_INDEXING=false   # keep false until launch approved
```

## 9. Rebuilding assets

```bash
python scripts/decode-heic.py --source "<archive>" --out "<temp>"
node scripts/build-assets.mjs --source "<archive>" --heic "<temp>" --v11 "<v11 photos>"
node scripts/check-assets.mjs
```
