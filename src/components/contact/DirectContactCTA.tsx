'use client';

import { Phone, Mail, MessageCircle } from 'lucide-react';
import { SecondaryButton } from '@/components/ui/SecondaryButton';

export default function DirectContactCTA() {
  return (
    <section className="section-padding-supporting page-horizontal-padding bg-be-yellow-50">
      <div className="container-site">
        <div className="reveal-up flex flex-col items-center gap-6 text-center">
          <h2 className="text-section-h2 text-be-charcoal-950">
            Speak with our team directly
          </h2>
          <p className="text-body-large text-be-grey-650 max-w-xl">
            Our experts are ready to help you select the right product, answer technical questions, and provide quotations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <SecondaryButton href="tel:+91XXXXXXXXXX">
              <Phone className="size-4 mr-1.5" />
              Call
            </SecondaryButton>
            <SecondaryButton href="mailto:info@bharatelectrosafe.com">
              <Mail className="size-4 mr-1.5" />
              Email
            </SecondaryButton>
            <SecondaryButton href="https://wa.me/91XXXXXXXXXX">
              <MessageCircle className="size-4 mr-1.5" />
              WhatsApp
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
