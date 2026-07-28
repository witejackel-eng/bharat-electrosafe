'use client';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center page-horizontal-padding bg-be-warm-white">
      <div className="container-site text-center py-16">
        <h2 className="text-section-h2 text-be-charcoal-950 mb-4">
          Something went wrong
        </h2>
        <p className="text-body-large text-be-grey-650 max-w-md mx-auto mb-8">
          We encountered an unexpected error. Please try again, or
          contact our team if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <PrimaryButton onClick={reset}>
            Try Again
          </PrimaryButton>
          <SecondaryButton href="/contact-us">
            Contact Us
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
