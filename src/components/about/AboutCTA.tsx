'use client';

import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function AboutCTA() {
  return (
    <section className="bg-be-yellow-50 section-padding-supporting page-horizontal-padding">
      <div className="container-site">
        <div className="reveal-up flex flex-col items-center text-center gap-6">
          <h2 className="text-section-h2 text-be-charcoal-950">
            Ready to discuss your requirements?
          </h2>
          <p className="text-body-large text-be-grey-650 max-w-xl">
            Our team is available to provide product specifications, application guidance and certification documentation.
          </p>
          <PrimaryButton href="/contact-us" size="lg">
            Contact Us
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
