import { ShieldCheck, Mail } from 'lucide-react';
import { SectionShell } from '@/components/ui/SectionShell';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { NewsletterForm } from '@/components/home/NewsletterForm';

/**
 * NewsletterCTA — server-rendered homepage newsletter section.
 *
 * Renders as the last section before the footer. The static content
 * (eyebrow, heading, subtext, trust badge, decorative background) is
 * server-rendered; only the form (`NewsletterForm`) is a client island
 * so the section is meaningful in the initial HTML with no JS.
 *
 * Layout:
 *   Desktop (≥ lg): two-column grid — copy left, form card right.
 *   Mobile (< lg): single column, copy first then form.
 *
 * The `reveal-up` class on SectionShell opts the section into the
 * RevealObserver entrance animation (progressive enhancement — content
 * is visible without JS via the noscript fallback).
 *
 * Accessibility:
 *   - SectionShell exposes `aria-label="Newsletter subscription"`.
 *   - Decorative background is `aria-hidden`.
 *   - Heading uses a real <h2> (page has a single <h1> in the hero).
 *   - Form fields are labelled inside NewsletterForm.
 */

export default function NewsletterCTA() {
  return (
    <SectionShell
      variant="conversion"
      bg="bg-be-navy-900"
      ariaLabel="Newsletter subscription"
      className="reveal-up overflow-hidden"
    >
      {/* ─── Decorative background ───────────────────────────────────
          Layered: a faint radial glow + a repeating shield-icon pattern
          clipped to the section. All aria-hidden — purely ornamental. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Top-right radial glow — subtle depth against the navy field */}
        <div
          className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 196, 0, 0.18) 0%, rgba(255, 196, 0, 0) 70%)',
          }}
        />
        {/* Faint Mail-icon grid pattern in the lower-left */}
        <div
          className="absolute -left-8 bottom-0 h-[260px] w-[260px] opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
              '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
            )}")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* ─── Left — copy block ───────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <Eyebrow className="border-be-yellow-500 text-be-yellow-400">
            NEWSLETTER
          </Eyebrow>

          <h2 className="text-section-h2 text-white">
            Stay updated on electrical safety
          </h2>

          <p className="text-body-large text-be-grey-400 max-w-xl">
            Get notified about new product launches, technical bulletins, and
            industry updates. No spam — unsubscribe anytime.
          </p>

          {/* Trust badge — reinforces the "no spam" promise */}
          <div className="mt-2 flex items-center gap-2 text-sm text-be-grey-400">
            <ShieldCheck
              className="size-4 shrink-0 text-be-yellow-400"
              aria-hidden="true"
              focusable="false"
            />
            <span>Privacy protected. Unsubscribe with one click.</span>
          </div>
        </div>

        {/* ─── Right — form card ─────────────────────────────────────
            A subtly elevated panel carved out of the navy field with a
            hairline border and a soft inner tint, so the form reads as a
            distinct surface without breaking the dark section's tone. */}
        <div className="rounded-xl border border-white/10 bg-be-navy-850/50 p-6 shadow-lg shadow-black/20 lg:p-8">
          {/* Small heading row above the form — anchors the card's intent
              for screen readers and sighted users alike. */}
          <div className="mb-5 flex items-center gap-2">
            <Mail
              className="size-4 shrink-0 text-be-yellow-400"
              aria-hidden="true"
              focusable="false"
            />
            <span className="text-sm font-semibold uppercase tracking-widest text-be-yellow-400">
              Subscribe
            </span>
          </div>

          <NewsletterForm />
        </div>
      </div>
    </SectionShell>
  );
}
