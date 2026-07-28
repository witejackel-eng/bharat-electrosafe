import { ClipboardCheck, Microscope, PackageCheck, Truck, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionShell } from '@/components/ui/SectionShell';
import { SectionHeader } from '@/components/ui/SectionHeader';

/**
 * ProcessSection — a 4-step "how we work" band that communicates the
 * manufacturing-to-delivery quality process. Uses the be-step-badge CSS
 * utility for premium numbered circles, and a horizontal connecting
 * line on desktop that ties the steps together.
 *
 * Content is deliberately factual (no fabricated metrics): each step
 * describes what actually happens, grounded in the IS 15652:2006
 * manufacturing standard and BIS licence that the rest of the site
 * references.
 *
 * Server Component — static, no client JS. Entrance animation is handled
 * by the RevealObserver island via the reveal-up class.
 */
interface Step {
  n: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    n: 1,
    title: 'Requirement & specification',
    description:
      'We confirm the operating voltage, insulation class, dimensions and applicable standard for your installation before any material is scheduled.',
    icon: ClipboardCheck,
  },
  {
    n: 2,
    title: 'Manufacture to IS 15652:2006',
    description:
      'Mats are produced under our BIS licence (CM/L:8800129617) with class-specific formulation, thickness and dielectric properties controlled at every batch.',
    icon: PackageCheck,
  },
  {
    n: 3,
    title: 'Batch testing & verification',
    description:
      'Every batch undergoes electrical and physical verification. Independent testing is available through ERDA / NTH for project-specific acceptance.',
    icon: Microscope,
  },
  {
    n: 4,
    title: 'Dispatch with documentation',
    description:
      'Mats ship with test certificates, BIS licence reference and handling instructions so your site team can install and commission with confidence.',
    icon: Truck,
  },
];

export default function ProcessSection() {
  return (
    <SectionShell variant="standard" bg="bg-be-cream" topRule>
      <div className="reveal-up mb-10">
        <SectionHeader
          eyebrow="HOW WE WORK"
          title="From specification to a certified, installed mat"
          supportingText="A transparent four-stage process that keeps quality and documentation visible at every step — so what arrives on site matches what was specified."
        />
      </div>

      <ol
        className="reveal-up be-step-connector relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5"
        aria-label="Our four-stage quality process"
      >
        {/* Connecting horizontal line on lg — sits behind the badges */}
        <div
          className="hidden lg:block absolute top-[2rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-be-grey-300 to-transparent"
          aria-hidden="true"
        />

        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <li
              key={step.n}
              className="be-card-glow be-tile-lift relative flex flex-col items-start gap-3 rounded-lg border border-be-grey-250 bg-be-white p-5 shadow-sm hover:shadow-md hover:border-be-yellow-300"
            >
              {/* Step badge + icon row */}
              <div className="flex items-center gap-3 w-full">
                <span className="be-step-badge shrink-0" aria-hidden="true">
                  {step.n}
                </span>
                <span className="flex items-center justify-center size-8 rounded-md bg-be-yellow-50 text-be-yellow-text border border-be-yellow-100 shrink-0">
                  <Icon className="size-4" aria-hidden="true" focusable="false" />
                </span>
              </div>

              {/* Title + description */}
              <h3 className="text-base font-bold text-be-charcoal-950 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-be-grey-650 leading-relaxed">
                {step.description}
              </p>

              {/* sr-only label for the step number for screen readers */}
              <span className="sr-only">Step {step.n}</span>
            </li>
          );
        })}
      </ol>

      {/* Closing trust line */}
      <div className="reveal-up mt-8 flex items-center gap-2 text-sm text-be-grey-650">
        <ShieldCheck className="size-4 text-be-yellow-text shrink-0" aria-hidden="true" focusable="false" />
        <span>
          Every mat is traceable to its batch, test certificate and BIS licence record.
        </span>
      </div>
    </SectionShell>
  );
}
