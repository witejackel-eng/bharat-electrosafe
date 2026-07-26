'use client';

import { Reveal } from '@/components/motion/Reveal';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from 'lucide-react';

const contactItems = [
  {
    icon: MapPin,
    label: 'Manufacturing facility',
    value: 'Plot No. 12, Sector 7, IMT Manesar, Gurugram, Haryana 122050',
    href: 'https://maps.google.com/?q=IMT+Manesar+Gurugram',
  },
  {
    icon: Phone,
    label: 'Technical sales',
    value: '+91 123 456 7890',
    href: 'tel:+911234567890',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@bharatelectrosafe.com',
    href: 'mailto:info@bharatelectrosafe.com',
  },
  {
    icon: Clock,
    label: 'Office hours',
    value: 'Mon–Sat, 09:00–18:00 IST',
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-background py-20 md:py-28 scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left: Heading + contact info */}
          <div className="md:col-span-6">
            <Reveal delay={0}>
              <span className="text-eyebrow">Contact</span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mt-3 max-w-[480px]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Talk directly with our technical sales team.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-base text-steel mt-3 max-w-[480px]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                We respond to product, voltage and quantity questions within one working day. For project-specific requirements, share drawings or specifications by email.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-4">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-white hover:border-orange/30 hover:shadow-sm transition-all duration-200">
                    <div className="w-10 h-10 rounded-lg bg-orange-soft flex items-center justify-center shrink-0">
                      <Icon className="size-5 text-orange" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-eyebrow block mb-1">{item.label}</span>
                      <span
                        className="text-sm text-navy font-medium block"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {item.value}
                      </span>
                    </div>
                  </div>
                );

                return (
                  <Reveal key={item.label} delay={200 + i * 60}>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right: WhatsApp CTA + Map placeholder */}
          <div className="md:col-span-6 flex flex-col gap-6">
            <Reveal delay={200} translateY={20}>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 md:p-8 rounded-2xl bg-navy text-white relative overflow-hidden"
              >
                {/* Decorative orange line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange via-orange/60 to-transparent" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="size-6 text-white" />
                  </div>
                  <div>
                    <span className="text-eyebrow block mb-2" style={{ color: '#F07830' }}>
                      Quick response
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      Chat with us on WhatsApp
                    </h3>
                    <p className="text-sm text-white/80 mb-4 leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      Send product images, drawings or specifications directly. We respond within working hours.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-orange transition-colors">
                      Open WhatsApp
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>

            {/* Map / location card */}
            <Reveal delay={300} translateY={20}>
              <div className="rounded-2xl overflow-hidden border border-border bg-white">
                <div className="relative h-64 bg-ivory-light">
                  {/* Stylized map placeholder using gradient and pattern */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, transparent 48%, rgba(27, 42, 74, 0.1) 49%, rgba(27, 42, 74, 0.1) 51%, transparent 52%),
                        linear-gradient(-45deg, transparent 48%, rgba(27, 42, 74, 0.1) 49%, rgba(27, 42, 74, 0.1) 51%, transparent 52%)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                  {/* Location pin */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 w-12 h-12 bg-orange/30 rounded-full animate-ping" />
                      <div className="relative w-12 h-12 rounded-full bg-orange flex items-center justify-center shadow-lg">
                        <MapPin className="size-6 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 border border-border/60 shadow-sm">
                      <span className="text-eyebrow block">IMT Manesar</span>
                      <span className="text-sm font-medium text-navy" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        Gurugram, Haryana, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
