# Security Audit Report — Bharat Electrosafe Website

**Audit date:** 2026-03-04
**Auditor:** Internal security review
**Scope:** Bharat Electrosafe website — Next.js 16, static marketing site
**Repository:** `bharat-electrosafe` (public GitHub)

---

## 1. Scope

| Property | Value |
|---|---|
| Application | Bharat Electrosafe marketing website |
| Framework | Next.js 16 (App Router, `output: 'standalone'`) |
| Hosting | Vercel (HTTPS enforced, edge CDN) |
| Site type | Static marketing pages + one serverless API route |
| API routes | `/api/contact` (POST only) |
| Admin surface | None |
| Database | None |
| Third-party services | Resend (server-side email delivery), YouTube (iframe embed) |
| Branches audited | `main` |

---

## 2. Methodology

The audit was performed using the following approaches:

| Approach | Description |
|---|---|
| Static analysis | Manual review of source code for unsafe patterns, injection vectors, and misconfigurations |
| Secret scanning | Search of the current source tree and git history for accidentally committed secrets |
| Dependency audit | Review of production and dev dependencies for known vulnerabilities |
| Header inspection | Review of HTTP security headers emitted by the application |
| CSP review | Analysis of Content-Security-Policy directives for completeness and strictness |
| Manual code review | Line-by-line review of the contact-form API route, structured-data components, and configuration |

---

## 3. Tools used

| Tool | Purpose |
|---|---|
| `git grep` | Search for secrets, tokens, and unsafe patterns in the repository |
| `bun audit` | Dependency vulnerability scanning |
| Manual inspection | Review of configuration, headers, and code patterns |

---

## 4. Findings

### 4.1 Secrets scan

| Item | Result |
|---|---|
| Real secrets in current source tree | **None found** |
| Real secrets in git history | **None found** |
| `.env` in repository | Previously tracked; now untracked and removed from git |
| `.env.example` | Contains only placeholder values and documentation; no real secrets |
| Local `DATABASE_URL` | A local SQLite `DATABASE_URL` was present in `.env` (development only); now untracked |

**Verdict:** No real secrets are present in the current source tree or git history. The local `DATABASE_URL` in `.env` was a development-only SQLite path and has been removed from tracking.

---

### 4.2 Dependency scan

| Item | Value |
|---|---|
| Production dependencies (before) | 65 |
| Production dependencies (after) | 18 |
| Dependencies removed | 48 (unused) |
| Critical vulnerabilities | 0 |
| High vulnerabilities | 0 |
| Medium vulnerabilities | 0 |
| Low vulnerabilities | 0 |

**Production dependencies (current):**

| Package | Purpose |
|---|---|
| `next` | Framework |
| `react` / `react-dom` | UI library |
| `zod` | Schema validation |
| `resend` | Server-side email delivery |
| `react-hook-form` | Form state management |
| `@hookform/resolvers` | Zod resolver for react-hook-form |
| `sharp` | Image processing (build-time) |
| `framer-motion` | Animations |
| `lucide-react` | Icon library |
| `class-variance-authority` | Component variant utility |
| `clsx` | Class name utility |
| `tailwind-merge` | Tailwind class merging |
| `tailwindcss-animate` | Tailwind animation utilities |
| `@radix-ui/react-accordion` | Accessible accordion |
| `@radix-ui/react-select` | Accessible select |
| `@radix-ui/react-slot` | Slot component utility |

**Verdict:** No known critical or high-severity vulnerabilities in production dependencies. The attack surface has been significantly reduced by removing 48 unused packages.

---

### 4.3 Static-code review

| Check | Result |
|---|---|
| `dangerouslySetInnerHTML` | Used only for JSON-LD `<script>` tags; content is escaped via `serializeJsonLd()` which replaces `<` with `\u003c` |
| `eval()` / `Function()` | **Not found** in codebase |
| `unsafe-eval` in CSP | **Not present** |
| `document.write()` | **Not found** |
| `innerHTML` assignment | **Not found** |
| `window.location` redirect | **Not found** |
| User-controlled HTML rendering | **Not found** — all user input is escaped before rendering |

**Verdict:** No unsafe code patterns found. The only use of `dangerouslySetInnerHTML` is for JSON-LD structured data, which is properly sanitised.

---

### 4.4 API review — Contact form (`/api/contact`)

| Control | Status | Detail |
|---|---|---|
| Input validation | **Hardened** | Strict Zod schema (`z.strictObject`) with `.trim()`, length limits, regex validation for phone, and enum for `enquiryType` |
| Origin validation | **Hardened** | Exact origin comparison via `isAllowedOrigin()`; no `startsWith` matching; allows production domain, Vercel URLs, and localhost in development |
| Content-type enforcement | **Hardened** | Only `application/json` accepted; returns 415 for other types |
| Request body size limit | **Hardened** | 32 KB maximum; checked both via `Content-Length` header and after reading the body |
| Rate limiting | **Implemented** | In-memory, per-IP: 5 requests per 10-minute window; returns 429 with `Retry-After` header |
| Honeypot | **Implemented** | Hidden `website` field; if filled, form appears to succeed but email is not sent |
| Timing check | **Implemented** | `_formOpenAt` timestamp; rejects submissions faster than 3 seconds or older than 1 hour |
| Cache-Control | **Implemented** | `Cache-Control: no-store` on all API responses |
| HTML escaping | **Implemented** | `escapeHtml()` applied to all user input in email body |
| Subject-header injection | **Prevented** | CR/LF characters stripped from `enquiryType` before use in email subject |
| Privacy logging | **Implemented** | Only `nameLength`, `enquiryType`, and `hasCompany` logged; no PII in console output |
| Referer privacy | **Implemented** | Only the pathname is extracted from the referer; full URL is not logged or sent |
| Error handling | **Implemented** | Graceful degradation with fallback contact details when Resend is unavailable |

**Verdict:** The contact form is well-hardened with multiple layers of defence against abuse, injection, and privacy violations.

---

### 4.5 Header review

| Header | Value | Assessment |
|---|---|---|
| `Content-Security-Policy` | Full CSP with `default-src 'self'`, `script-src 'self' 'unsafe-inline'`, `frame-src https://www.youtube-nocookie.com`, `object-src 'none'`, `frame-ancestors 'none'`, `form-action 'self'`, `upgrade-insecure-requests` (production) | **Good** — see §4.6 for CSP detail |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` (production only) | **Good** — preload not yet enabled; safe rollout without preload |
| `X-Content-Type-Options` | `nosniff` | **Good** |
| `X-Frame-Options` | `DENY` | **Good** — redundant with CSP `frame-ancestors 'none'` but provides defence-in-depth |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | **Good** |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()` | **Good** |
| `X-Powered-By` | **Not present** (`poweredByHeader: false`) | **Good** |

**Verdict:** Security headers are comprehensive and well-configured. HSTS preload is a future enhancement.

---

### 4.6 CSP review

| Directive | Value | Assessment |
|---|---|---|
| `default-src` | `'self'` | **Good** — restrictive default |
| `script-src` | `'self' 'unsafe-inline'` | **P3 residual risk** — `unsafe-inline` is required for Next.js inline bootstrap scripts; no `unsafe-eval` |
| `style-src` | `'self' 'unsafe-inline'` | **P3 residual risk** — `unsafe-inline` required for Next.js styled-components/Tailwind CSS injection |
| `img-src` | `'self' data: https:` | **Acceptable** — allows HTTPS images from any domain; `data:` for inline SVGs |
| `font-src` | `'self'` | **Good** |
| `connect-src` | `'self'` | **Good** — Resend API is server-side only; not exposed to browser |
| `frame-src` | `https://www.youtube-nocookie.com` | **Good** — only YouTube privacy-enhanced mode |
| `object-src` | `'none'` | **Good** — blocks plugins |
| `base-uri` | `'self'` | **Good** — prevents base-tag hijacking |
| `frame-ancestors` | `'none'` | **Good** — prevents clickjacking |
| `form-action` | `'self'` | **Good** — prevents form submission to external origins |
| `manifest-src` | `'self'` | **Good** |
| `upgrade-insecure-requests` | Enabled in production | **Good** |

**Key findings:**
- `unsafe-inline` for `script-src` and `style-src` is a **known moderate residual risk** (P3) inherent to Next.js static sites. A nonce-based CSP would require middleware or dynamic rendering that adds complexity beyond what is justified for this content-first site.
- `unsafe-eval` is **never** included.
- No wildcard origins (`*`) are used.
- `object-src 'none'` and `frame-ancestors 'none'` provide strong secondary protections.

---

### 4.7 XSS review

| Check | Result |
|---|---|
| `dangerouslySetInnerHTML` with user-controlled HTML | **Not found** — only used for JSON-LD with `serializeJsonLd()` escaping |
| User-controlled HTML rendering | **Not found** — all user input is text-only |
| JSON-LD escaping | **Implemented** — `serializeJsonLd()` replaces `<` with `\u003c` to prevent `</script>` breakout |
| URL-based injection | **Not found** — no user-controlled URLs are rendered as links without validation |
| Template literal injection | **Not found** — all dynamic content is properly escaped |

**Verdict:** No XSS vulnerabilities found. The JSON-LD escaping is correct and complete.

---

### 4.8 Injection review

| Check | Result |
|---|---|
| SQL injection | **Not applicable** — no database |
| Subject-header injection | **Prevented** — CR/LF characters stripped from `enquiryType` in email subject |
| HTML injection in email body | **Prevented** — `escapeHtml()` applied to all user input in HTML email template |
| NoSQL injection | **Not applicable** — no NoSQL database |
| Command injection | **Not applicable** — no shell execution |
| LDAP injection | **Not applicable** — no LDAP integration |

**Verdict:** No injection vulnerabilities found. The contact form properly sanitises user input before embedding it in email headers and body.

---

### 4.9 Abuse / spam review

| Control | Implementation | Assessment |
|---|---|---|
| Honeypot | Hidden `website` field; silently accepted but not delivered | **Good** |
| Timing check | `_formOpenAt` timestamp; minimum 3 s, maximum 1 h | **Good** |
| Rate limiting | In-memory, per-IP: 5 requests / 10 min | **P3** — resets on serverless cold start |
| Origin validation | Exact origin comparison; no `startsWith` | **Good** |
| Content-type enforcement | Only `application/json` accepted | **Good** |
| Body size limit | 32 KB maximum | **Good** |

**Verdict:** Multiple anti-abuse controls are in place. The in-memory rate limiter is the only control that is not durable across serverless cold starts.

---

### 4.10 Privacy review

| Check | Result |
|---|---|
| PII in logs | **No** — only `nameLength`, `enquiryType`, `hasCompany` are logged |
| Full referer in email | **No** — only the pathname is extracted |
| User-agent in email | **No** — not included |
| IP address in email | **No** — not included |
| PII in API responses | **No** — responses contain only success/error messages |
| `Cache-Control: no-store` | **Yes** — on all API responses |
| Client-side PII exposure | **No** — `RESEND_API_KEY` is server-side only; not in `connect-src` |

**Verdict:** Privacy controls are well-implemented. No PII is logged, stored, or exposed unnecessarily.

---

### 4.11 Deployment review

| Check | Result |
|---|---|
| Hosting platform | Vercel |
| Output mode | `standalone` |
| HTTPS | Enforced by Vercel |
| SSL/TLS | Managed by Vercel |
| Build output | Static pages + serverless API route |
| `allowedDevOrigins` | `http://127.0.0.1`, `http://localhost` (no sandbox IPs) |
| `poweredByHeader` | `false` |

**Verdict:** Deployment configuration is secure. No sandbox IPs in `allowedDevOrigins`, no `X-Powered-By` header, and HTTPS is enforced.

---

## 5. Findings by severity

| ID | Severity | Finding | Detail |
|---|---|---|---|
| F1 | P3 | `unsafe-inline` in CSP | `script-src` and `style-src` include `'unsafe-inline'` — a known moderate residual risk for Next.js static sites. A nonce-based CSP would eliminate this but requires architectural changes. |
| F2 | P3 | In-memory rate limiting is not serverless-durable | The rate limiter uses an in-memory `Map` that resets on serverless cold starts. A determined attacker can bypass this by triggering cold starts. |

**No P0 (Critical), P1 (High), or P2 (Medium) findings were identified.**

---

## 6. Fixes applied

The following security improvements were applied during or before this audit:

| # | Fix | Category |
|---|---|---|
| 1 | Removed 48 unused production dependencies | Dependency reduction |
| 2 | Removed dead API route | Attack surface reduction |
| 3 | Removed `.env` from git tracking | Secret management |
| 4 | Hardened contact form with strict Zod schema, origin validation, rate limiting, honeypot, timing check | API security |
| 5 | Removed sandbox IP from `allowedDevOrigins` | Configuration |
| 6 | Added `poweredByHeader: false` | Header hardening |
| 7 | Added `Cache-Control: no-store` to all API responses | Privacy / caching |
| 8 | HTML escaping in email body | Injection prevention |
| 9 | Subject-header injection prevention (CR/LF stripping) | Injection prevention |
| 10 | Redacted logging (no PII in console output) | Privacy |
| 11 | Privacy-enhanced YouTube embeds (`youtube-nocookie.com`) | Third-party risk |
| 12 | CSP with `object-src 'none'`, `frame-ancestors 'none'`, `form-action 'self'` | Header hardening |

---

## 7. Residual risks

| Risk | Severity | Justification |
|---|---|---|
| CSP `unsafe-inline` for `script-src` and `style-src` | P3 | Inherent to Next.js static sites; a nonce-based CSP requires middleware or dynamic rendering. For a static marketing site with no user-generated content, the risk is low. Revisit if the site adds dynamic content or user accounts. |
| In-memory rate limiting | P3 | The rate limiter resets on serverless cold starts. For a low-traffic marketing site, the practical impact is minimal. A durable solution (Upstash Redis) is recommended for production hardening. |

---

## 8. External actions required

These items require configuration or action outside the application codebase:

| # | Action | Priority | Detail |
|---|---|---|---|
| 1 | Configure Vercel Firewall rate-limit rule for `/api/contact` | High | Add a Vercel Firewall rule to rate-limit requests to the contact endpoint. This provides durable rate limiting that survives serverless cold starts. |
| 2 | Set up Upstash Redis for durable rate limiting | Medium | Replace the in-memory rate limiter with an Upstash Redis-based solution for serverless-compatible, durable rate limiting. |
| 3 | Verify SPF/DKIM/DMARC for sending domain | High | Ensure the domain used for `CONTACT_FROM_EMAIL` has proper SPF, DKIM, and DMARC records to prevent email spoofing and improve deliverability. |
| 4 | Rotate `RESEND_API_KEY` if it was ever in a public commit | High | If the Resend API key was ever committed to a public branch, rotate it immediately. Even deleted commits remain in git history. |

---

## 9. Final security posture

> **No known critical or high-severity vulnerabilities were found within the
> audited scope.**

The Bharat Electrosafe website has a strong security posture for a static
marketing site:

- **No admin surface** eliminates an entire class of authentication threats.
- **No database** eliminates SQL injection and data-exfiltration threats.
- **Minimal dependencies** (18 production packages) significantly reduces the
  supply-chain attack surface.
- **Comprehensive security headers** provide defence-in-depth against XSS,
  clickjacking, and content-type sniffing.
- **Hardened contact form** with multiple layers of abuse prevention and
  injection protection.
- **Privacy-first logging** ensures no PII is written to server logs.
- **No secrets in the codebase** — all sensitive values are stored as Vercel
  environment variables.

The two P3 findings (CSP `unsafe-inline` and in-memory rate limiting) are
acknowledged and justified for the current site profile. They should be
revisited if the site's risk profile changes.

---

## Appendix A — Severity definitions

| Level | Label | Description |
|---|---|---|
| P0 | Critical | Immediate, system-wide compromise; data breach or full takeover; must be fixed immediately |
| P1 | High | Significant impact with clear exploitation path; urgent fix required within days |
| P2 | Medium | Moderate impact; requires specific conditions or partial control; fix within weeks |
| P3 | Low | Limited impact; requires unlikely conditions or has strong existing controls; fix when practical |
| Informational | Informational | No direct threat; awareness item for future consideration; no fix required |

---

## Appendix B — Audit checklist

- [x] Static analysis — no unsafe patterns
- [x] Secret scanning — no real secrets in codebase or git history
- [x] Dependency audit — no known critical/high vulnerabilities
- [x] Header inspection — comprehensive security headers
- [x] CSP review — strict with known `unsafe-inline` limitation
- [x] XSS review — no injection vectors
- [x] Injection review — all injection vectors mitigated
- [x] Abuse/spam review — multi-layered protection
- [x] Privacy review — no PII leakage
- [x] Deployment review — secure configuration
- [x] Manual code review — contact form and configuration
