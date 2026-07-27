import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1 flex items-center justify-center page-horizontal-padding">
        <div className="container-site text-center py-16">
          {/* Breadcrumb-like element */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center mb-8">
            <ol className="flex items-center gap-1 text-metadata">
              <li className="flex items-center gap-1">
                <Link
                  href="/"
                  className="text-be-charcoal-800 hover:text-be-yellow-600 transition-colors duration-200"
                >
                  Home
                </Link>
                <span className="text-be-grey-400" aria-hidden>/</span>
              </li>
              <li>
                <span className="text-be-grey-650 font-medium" aria-current="page">
                  404 Error
                </span>
              </li>
            </ol>
          </nav>

          {/* 404 label */}
          <p className="text-be-yellow-500 text-metadata font-semibold uppercase tracking-wide mb-4">
            404
          </p>

          {/* Heading */}
          <h1 className="text-section-h2 text-be-charcoal-950 mb-4">
            Page not found
          </h1>

          {/* Subtext */}
          <p className="text-body-large text-be-grey-650 max-w-md mx-auto mb-8">
            The page you are looking for does not exist or has been moved.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton href="/">
              Return to Home
            </PrimaryButton>
            <SecondaryButton href="/contact-us">
              Contact Us
            </SecondaryButton>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
