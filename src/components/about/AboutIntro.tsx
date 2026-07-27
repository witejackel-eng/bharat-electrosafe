'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ImageFrame } from '@/components/ui/ImageFrame';

export default function AboutIntro() {
  return (
    <section className="bg-be-warm-white section-padding-major page-horizontal-padding">
      <div className="container-site">
        {/* Breadcrumb */}
        <div className="reveal-up mb-8">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
        </div>

        {/* 55/45 split layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          {/* Left — page title + introduction */}
          <div className="lg:w-[55%] reveal-up">
            <h1 className="text-page-h1 text-be-charcoal-950 mb-6">
              About Bharat Electrosafe
            </h1>
            <p className="text-body-large text-be-grey-650 max-w-xl">
              Bharat Electrosafe is a certified manufacturer of electrical insulating mats
              and engineered protection products, serving India&apos;s power utilities,
              substations, railways and industrial infrastructure. Our products comply with
              IS 15652:2006 and are tested by CPRI and ERDA, ensuring certified quality and
              application reliability across critical electrical environments nationwide.
            </p>
          </div>

          {/* Right — company/product visual */}
          <div className="lg:w-[45%] reveal-up">
            <ImageFrame
              alt="Bharat Electrosafe — Manufacturing and electrical safety"
              slotId="ABOUT-HERO-01"
              aspectRatio="landscape"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
