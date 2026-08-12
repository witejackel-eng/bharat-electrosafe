
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { SectionShell } from '@/components/ui/SectionShell';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { homeFaqs } from '@/data/faqs';

const faqItems: FAQItem[] = homeFaqs;

/**
 * HomeFAQCTA — final content section before the footer.
 *
 * Minimal editorial layout (per IA + FAQ UX pass):
 *   - Desktop: ~68% LEFT (accordion), ~32% RIGHT (small intro)
 *   - Mobile/tablet: intro first, then questions (single column)
 *
 * The accordion uses the existing FAQ component's behavior with a
 * restrained visual treatment (thin border, no filled cards).
 *
 * A compact conversion row (Request Technical Guidance + Request a Quote)
 * sits directly below the FAQ grid, inside the same section — no separate
 * dark CTA band.
 */
export default function HomeFAQCTA() {
  return (
    <SectionShell
      variant="compact"
      bg="bg-be-warm-white"
      topRule
      ariaLabel="Frequently asked questions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[2.1fr_1fr] gap-8 lg:gap-12">
        {/* ── LEFT (desktop) / SECOND (mobile) — Questions accordion ── */}
        <div className="order-2 lg:order-1 min-w-0">
          <FAQ items={faqItems} />
        </div>

        {/* ── RIGHT (desktop) / FIRST (mobile) — Small intro ── */}
        <div className="order-1 lg:order-2 lg:pt-1">
          <Eyebrow>COMMON QUESTIONS</Eyebrow>
          <h2 className="text-section-h2 text-be-charcoal-950 mt-3 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-body text-be-grey-650 leading-relaxed mb-5">
            Practical answers about our products, certifications, sizing and enquiry
            process — all in one place.
          </p>
          <TextLink href="/contact-us?type=technical-guidance">
            Technical Guidance
          </TextLink>
        </div>
      </div>

      {/* ── Compact conversion row — inside the same section ── */}
      <div className="mt-8 pt-6 border-t border-be-grey-250">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center">
          <PrimaryButton href="/contact-us?type=technical-guidance">
            Request Technical Guidance
          </PrimaryButton>
          <SecondaryButton href="/contact-us?type=quote">
            Request a Quote
          </SecondaryButton>
        </div>
      </div>
    </SectionShell>
  );
}
