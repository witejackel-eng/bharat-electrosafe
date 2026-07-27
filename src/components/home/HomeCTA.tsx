'use client';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { Phone, MessageCircle } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="bg-be-yellow-50 section-padding-major">
      <div className="container-site page-horizontal-padding">
        <div className="reveal-up flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <h2 className="text-section-h2 text-be-charcoal-950">
            Need help selecting the correct product?
          </h2>

          <p className="text-body-large text-be-grey-650">
            Share your operating voltage, dimensions, quantity and delivery
            location.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <PrimaryButton href="/contact-us" size="lg">
              Request a Quote
            </PrimaryButton>

            <SecondaryButton href="tel:+919999999999">
              <Phone className="h-4 w-4 mr-2" />
              Call Sales
            </SecondaryButton>

            <SecondaryButton href="https://wa.me/919999999999" className="gap-2">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
