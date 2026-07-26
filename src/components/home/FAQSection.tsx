'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Reveal } from '@/components/motion/Reveal';

const faqItems = [
  {
    question: 'What is IS 15652 and why does it matter?',
    answer:
      'IS 15652 is the Bureau of Indian Standards specification for insulating mats for electrical purposes. It replaced IS 5424 and covers Class A (3.3 kV), Class B (11 kV) and Class C (33 kV) mats. All Bharat Electrosafe mats carry a valid BIS licence against this standard.',
  },
  {
    question: 'How do I select the correct insulation class?',
    answer:
      'Select the class whose rated voltage exceeds the highest operating voltage at your installation. For example, a 6.6 kV panel requires Class B (rated 11 kV). Never use Class A mats above 3.3 kV installations.',
  },
  {
    question: 'What thickness do I need for each class?',
    answer:
      'Class A requires ≥ 2.0 mm, Class B ≥ 2.5 mm, and Class C ≥ 3.0 mm as per IS 15652. Bharat Electrosafe manufactures each class at or above the minimum specified thickness.',
  },
  {
    question: 'Are the mats tested by an independent lab?',
    answer:
      'Yes. Every batch is tested by an NABL-accredited independent laboratory for dielectric strength, leakage current, tensile properties and flame resistance. Test reports are available for download from our Proof Centre.',
  },
  {
    question: 'What is a visible-safety variant?',
    answer:
      'Visible-safety mats combine the insulating function with high-visibility colour strips, bi-colour patterns, or auto-glow/reflective surfaces. They help maintenance teams identify safe standing zones in dimly-lit substations and control rooms.',
  },
  {
    question: 'What applications use geomembrane and water-stop systems?',
    answer:
      'BharatMembrane HDPE geomembranes are used in canal lining, landfill containment, tunnel waterproofing and industrial effluent ponds. BharatHydro PVC water-stop profiles seal construction joints in concrete structures — tunnels, basements and water tanks.',
  },
  {
    question: 'How should insulating mats be stored and maintained?',
    answer:
      'Store mats flat in a dry, shaded area away from direct sunlight and heat sources. Roll out fully before installation. CEA guidelines recommend a 12-month visual and dielectric inspection cycle. Mats showing cuts, punctures or surface degradation must be replaced immediately.',
  },
  {
    question: 'Do you offer custom sizes and project-specific packaging?',
    answer:
      'Yes. Mats can be manufactured in custom widths and lengths to fit specific panel layouts. Bulk orders for infrastructure projects are packaged in labelled rolls with mill markings, batch codes and test certificates.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-ivory-light py-20 md:py-28 scroll-mt-32">
      {/* Orange safety-line accent */}
      <div className="h-1 bg-gradient-to-r from-orange via-orange/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-10 md:pt-14">
        <Reveal delay={0}>
          <span className="text-eyebrow" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Common questions
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mt-3 max-w-[600px]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Frequently asked questions about our products and standards.
          </h2>
        </Reveal>

        <Reveal delay={160} translateY={16}>
          <Accordion type="single" collapsible className="mt-10 md:mt-14">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={`faq-${i + 1}`}
                value={`faq-${i + 1}`}
                className="border-b border-border/60 last:border-b-0"
              >
                <AccordionTrigger
                  className="text-navy text-sm md:text-base hover:text-orange hover:no-underline py-5 group"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  <span className="relative pl-4">
                    {/* Orange left border accent bar */}
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-sm bg-orange/40 group-hover:bg-orange transition-colors duration-200"
                      aria-hidden="true"
                    />
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className="text-steel text-sm leading-relaxed"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
