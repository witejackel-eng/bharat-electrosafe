'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  Eye,
  Droplets,
  Factory,
  Building2,
  TrainTrack,
  HardHat,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Check,
  Lightbulb,
} from 'lucide-react';
import { products, getProductBySlug, imageFitClass, productCategories } from '@/data/products';
import { cn } from '@/lib/utils';

/**
 * ProductFinderWizard — a guided 3-step quiz that recommends the right
 * product family based on the user's primary need, operating voltage,
 * and environment. Replaces the static "Which product do I need?" section
 * on /products with an interactive, premium experience.
 *
 * Flow:
 *   1. Primary need → determines the product family direction
 *   2. Operating voltage → refines the class (A/B/C) for mat products
 *   3. Environment → confirms the recommendation with context
 *   Result: recommended product card + reasoning + secondary suggestion
 *
 * Accessibility:
 *   • role="region" aria-label
 *   • Progress indicator with aria-valuenow
 *   • Each option is a button with descriptive aria-label
 *   • Keyboard: Tab moves between options, Enter/Space selects
 *   • Results announced via aria-live="polite"
 *   • Focus moves to result heading on completion
 *
 * Visual:
 *   • Animated step transitions (slide + fade)
 *   • Premium option cards with icon, hover lift, selected state
 *   • Progress bar with brand-yellow fill
 *   • Result card with product image + "View product" CTA
 */

type Need = 'electrical-safety' | 'hazard-visibility' | 'low-light-safety' | 'waterproofing';
type Voltage = 'lv' | 'mv' | 'hv' | 'na';
type Environment = 'indoor-substation' | 'outdoor' | 'emergency-routes' | 'construction-tunnel';

interface Option {
  id: string;
  label: string;
  description: string;
  icon: typeof Zap;
}

const needOptions: Option[] = [
  {
    id: 'electrical-safety',
    label: 'Operator protection',
    description: 'People working near live electrical equipment',
    icon: ShieldCheck,
  },
  {
    id: 'hazard-visibility',
    label: 'Hazard zone marking',
    description: 'Visible demarcation of safe and unsafe areas',
    icon: Zap,
  },
  {
    id: 'low-light-safety',
    label: 'Low-light / emergency visibility',
    description: 'Guidance that remains visible in darkness or smoke',
    icon: Eye,
  },
  {
    id: 'waterproofing',
    label: 'Waterproofing & containment',
    description: 'Lining, waterproofing or fluid containment',
    icon: Droplets,
  },
];

const voltageOptions: Option[] = [
  {
    id: 'lv',
    label: 'Low voltage (up to 3.3 kV)',
    description: 'Class A — panels, control rooms',
    icon: Zap,
  },
  {
    id: 'mv',
    label: 'Medium voltage (up to 11 kV)',
    description: 'Class B — distribution substations',
    icon: Zap,
  },
  {
    id: 'hv',
    label: 'High voltage (up to 33 kV)',
    description: 'Class C — transmission substations',
    icon: Zap,
  },
  {
    id: 'na',
    label: 'Not applicable',
    description: 'No electrical voltage involved',
    icon: Droplets,
  },
];

const environmentOptions: Option[] = [
  {
    id: 'indoor-substation',
    label: 'Indoor substation / switchroom',
    description: 'Controlled environment, operator workstations',
    icon: Building2,
  },
  {
    id: 'outdoor',
    label: 'Outdoor / exposed area',
    description: 'Weather-exposed installations',
    icon: Factory,
  },
  {
    id: 'emergency-routes',
    label: 'Emergency exit routes',
    description: 'Escape paths, evacuation corridors',
    icon: TrainTrack,
  },
  {
    id: 'construction-tunnel',
    label: 'Construction / tunnel / civil',
    description: 'Tunnels, basements, construction joints',
    icon: HardHat,
  },
];

const STEPS = ['Need', 'Voltage', 'Environment'] as const;

/**
 * Recommendation engine — maps (need, voltage, environment) → product slug.
 * Returns primary recommendation + reasoning + optional secondary.
 */
function recommend(
  need: Need,
  voltage: Voltage,
  _env: Environment,
): { primarySlug: string; reasoning: string; secondarySlug?: string } {
  switch (need) {
    case 'waterproofing':
      return {
        primarySlug: 'bharat-membrane',
        reasoning:
          'BharatMembrane is engineered for waterproofing, lining and containment across tunnels, basements, landfills, reservoirs and industrial effluent ponds.',
      };
    case 'low-light-safety':
      return {
        primarySlug: 'auto-glow-reflective-band-insulating-mats',
        reasoning:
          'Auto-Glow / Reflective Band mats provide photoluminescent guidance that remains visible in darkness or smoke, making them ideal for emergency exit routes and low-light substations. They also provide full electrical insulation to IS 15652:2006.',
      };
    case 'hazard-visibility':
      return {
        primarySlug: 'coloured-strip-insulating-mats',
        reasoning:
          'Coloured Strip mats combine electrical insulation with visible coloured-strip demarcation, so safe walkways, equipment perimeters and hazard zones are clearly marked while still protecting operators from electrical shock.',
        secondarySlug: 'bi-color-insulating-mats',
      };
    case 'electrical-safety':
      return {
        primarySlug: 'electrical-insulating-mats',
        reasoning:
          voltage === 'lv'
            ? 'Electrical Insulating Mats (Class A, 2.0 mm) protect operators near low-voltage equipment up to 3.3 kV — AC control panels, switchrooms and distribution boards.'
            : voltage === 'mv'
              ? 'Electrical Insulating Mats (Class B, 2.5 mm) protect operators near medium-voltage equipment up to 11 kV — distribution substations and switchgear.'
              : voltage === 'hv'
                ? 'Electrical Insulating Mats (Class C, 3.0 mm) protect operators near high-voltage equipment up to 33 kV — transmission substations and HV switchyards.'
                : 'Electrical Insulating Mats provide certified operator protection near live electrical equipment, manufactured to IS 15652:2006 in Classes A, B and C for voltages from 3.3 kV to 33 kV.',
      };
  }
}

export function ProductFinderWizard() {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<Need | null>(null);
  const [voltage, setVoltage] = useState<Voltage | null>(null);
  const [environment, setEnvironment] = useState<Environment | null>(null);
  const [completed, setCompleted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const isWaterproofing = need === 'waterproofing';
  // Waterproofing skips voltage (step 1) — only 2 questions
  const effectiveSteps = isWaterproofing ? ['Need', 'Environment'] : [...STEPS];

  const canAdvance = useMemo(() => {
    if (step === 0) return need !== null;
    if (isWaterproofing) return environment !== null;
    if (step === 1) return voltage !== null;
    return environment !== null;
  }, [step, need, voltage, environment, isWaterproofing]);

  const handleNext = useCallback(() => {
    if (!canAdvance) return;
    if (isWaterproofing && step === 1) {
      setCompleted(true);
    } else if (step === 2) {
      setCompleted(true);
    } else {
      setStep((s) => s + 1);
    }
  }, [canAdvance, step, isWaterproofing]);

  const handleBack = useCallback(() => {
    if (completed) {
      setCompleted(false);
      return;
    }
    if (step === 0) return;
    setStep((s) => s - 1);
  }, [step, completed]);

  const handleRestart = useCallback(() => {
    setStep(0);
    setNeed(null);
    setVoltage(null);
    setEnvironment(null);
    setCompleted(false);
  }, []);

  // Focus the result heading when results appear
  useEffect(() => {
    if (completed && resultRef.current) {
      const t = window.setTimeout(() => {
        resultRef.current?.querySelector('h3')?.focus();
      }, 100);
      return () => window.clearTimeout(t);
    }
  }, [completed]);

  // Keyboard: Enter advances when canAdvance
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canAdvance && !completed) {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [canAdvance, completed, handleNext]);

  const recommendation = useMemo(() => {
    if (!completed || !need) return null;
    return recommend(need, voltage ?? 'na', environment ?? 'indoor-substation');
  }, [completed, need, voltage, environment]);

  const primaryProduct = recommendation
    ? getProductBySlug(recommendation.primarySlug)
    : null;
  const secondaryProduct = recommendation?.secondarySlug
    ? getProductBySlug(recommendation.secondarySlug)
    : null;

  const progress = completed
    ? 100
    : Math.round((step / effectiveSteps.length) * 100);

  return (
    <div
      className="relative rounded-2xl border border-be-grey-250 bg-be-warm-white overflow-hidden shadow-sm"
      role="region"
      aria-label="Product finder wizard"
    >
      {/* Decorative top accent */}
      <div className="h-1.5 bg-gradient-to-r from-be-yellow-500 via-be-brand-yellow to-be-yellow-500" aria-hidden="true" />

      <div className="p-5 sm:p-8 md:p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center size-10 rounded-lg bg-be-yellow-50 shrink-0">
            <Lightbulb className="size-5 text-be-yellow-text" aria-hidden="true" focusable="false" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-be-charcoal-950">
              Find the right product
            </h2>
            <p className="text-sm text-be-grey-650">
              Answer 3 quick questions and we&apos;ll recommend the best match.
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {!completed && (
          <div className="mb-8" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={effectiveSteps.length} aria-label={`Question ${step + 1} of ${effectiveSteps.length}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-metadata text-be-grey-650 font-semibold uppercase tracking-wide">
                Step {step + 1} of {effectiveSteps.length}
              </span>
              <span className="text-metadata text-be-grey-550">
                {effectiveSteps[step]}
              </span>
            </div>
            <div className="h-1.5 bg-be-grey-150 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-be-yellow-500 to-be-brand-yellow rounded-full transition-all duration-500 ease-out motion-reduce:transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Step content — animated via key change */}
        {!completed ? (
          <div key={step} className="animate-[fade-in_0.3s_ease-out] motion-reduce:animate-none">
            {step === 0 && (
              <QuestionStep
                question="What is your primary need?"
                options={needOptions}
                selected={need}
                onSelect={(id) => setNeed(id as Need)}
              />
            )}
            {step === 1 && !isWaterproofing && (
              <QuestionStep
                question="What is your working voltage?"
                hint="This determines the insulation class (A, B or C) for mat products."
                options={voltageOptions}
                selected={voltage}
                onSelect={(id) => setVoltage(id as Voltage)}
              />
            )}
            {(step === 1 && isWaterproofing || step === 2) && (
              <QuestionStep
                question="What is your environment?"
                options={environmentOptions}
                selected={environment}
                onSelect={(id) => setEnvironment(id as Environment)}
              />
            )}
          </div>
        ) : (
          /* ── Result ── */
          <div
            ref={resultRef}
            aria-live="polite"
            className="be-result-reveal"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-5 text-be-yellow-text" aria-hidden="true" focusable="false" />
              <h3
                tabIndex={-1}
                className="text-xl font-bold text-be-charcoal-950 outline-none"
              >
                Our recommendation
              </h3>
            </div>

            {primaryProduct && (
              <div className="rounded-xl border-2 border-be-yellow-500/40 bg-be-white overflow-hidden shadow-sm">
                <div className="flex flex-col sm:flex-row gap-5 p-5">
                  {/* Image */}
                  <div className="relative w-full sm:w-48 shrink-0 aspect-[4/3] overflow-hidden rounded-lg bg-be-cream">
                    <Image
                      src={primaryProduct.images.gallery[0]?.src ?? primaryProduct.images.thumbnail.src}
                      alt={primaryProduct.images.gallery[0]?.alt ?? primaryProduct.images.thumbnail.alt}
                      fill
                      className={imageFitClass(primaryProduct.images.gallery[0] ?? primaryProduct.images.thumbnail)}
                      sizes="192px"
                    />
                  </div>
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-be-yellow-500 text-be-charcoal-950 text-[0.65rem] font-bold tracking-wide">
                        <Check className="size-3" aria-hidden="true" focusable="false" />
                        BEST MATCH
                      </span>
                      <span className="text-metadata text-be-grey-550">
                        {productCategories[primaryProduct.category].displayName}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-be-charcoal-950 mb-2">
                      {primaryProduct.name}
                    </h4>
                    <p className="text-sm text-be-charcoal-800 leading-relaxed mb-4">
                      {recommendation?.reasoning}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/products/${primaryProduct.slug}`}
                        className="be-premium-sheen inline-flex items-center gap-1.5 rounded-md bg-be-charcoal-950 px-4 py-2 text-sm font-semibold text-be-white hover:bg-be-charcoal-800 transition-colors focus-ring"
                      >
                        View product
                        <ArrowRight className="size-4" aria-hidden="true" focusable="false" />
                      </Link>
                      <Link
                        href="/contact-us?type=technical-guidance"
                        className="inline-flex items-center gap-1.5 rounded-md border border-be-grey-250 px-4 py-2 text-sm font-semibold text-be-charcoal-800 hover:border-be-yellow-400 hover:text-be-charcoal-950 transition-colors focus-ring"
                      >
                        Ask our team
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary suggestion */}
            {secondaryProduct && (
              <div className="mt-4 rounded-xl border border-be-grey-250 bg-be-cream/40 p-4">
                <p className="text-metadata text-be-grey-650 font-semibold uppercase tracking-wide mb-2">
                  Also consider
                </p>
                <Link
                  href={`/products/${secondaryProduct.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-lg hover:bg-be-white transition-colors p-2 -m-2 focus-ring"
                >
                  <span className="text-sm font-semibold text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors">
                    {secondaryProduct.name}
                  </span>
                  <ArrowRight className="size-4 text-be-grey-450 group-hover:text-be-yellow-text-hover group-hover:translate-x-0.5 transition-all" aria-hidden="true" focusable="false" />
                </Link>
              </div>
            )}

            {/* Restart */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-be-grey-650 hover:text-be-charcoal-950 hover:bg-be-grey-100 transition-colors focus-ring"
              >
                <RotateCcw className="size-4" aria-hidden="true" focusable="false" />
                Start over
              </button>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {!completed && (
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-be-grey-650 hover:text-be-charcoal-950 hover:bg-be-grey-100 transition-colors disabled:opacity-40 disabled:pointer-events-none focus-ring"
            >
              <ArrowLeft className="size-4" aria-hidden="true" focusable="false" />
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance}
              className="be-premium-sheen inline-flex items-center gap-1.5 rounded-md bg-be-yellow-500 px-6 py-2.5 text-sm font-bold text-be-charcoal-950 hover:bg-be-yellow-400 transition-colors disabled:opacity-50 disabled:pointer-events-none focus-ring"
            >
              {step === effectiveSteps.length - 1 ? 'See recommendation' : 'Continue'}
              <ArrowRight className="size-4" aria-hidden="true" focusable="false" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Sub-component: question step ── */

function QuestionStep({
  question,
  hint,
  options,
  selected,
  onSelect,
}: {
  question: string;
  hint?: string;
  options: Option[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-bold text-be-charcoal-950 mb-1">{question}</h3>
      {hint && <p className="text-sm text-be-grey-650 mb-4">{hint}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              aria-pressed={isSelected}
              className={cn(
                'group flex items-start gap-3 rounded-lg border p-4 text-left transition-all duration-200 focus-ring',
                isSelected
                  ? 'border-be-yellow-500 bg-be-yellow-50/60 shadow-sm'
                  : 'border-be-grey-250 bg-be-white hover:border-be-yellow-400 hover:bg-be-cream/40 hover:shadow-sm',
              )}
            >
              <span
                className={cn(
                  'flex items-center justify-center size-9 rounded-md shrink-0 transition-colors',
                  isSelected
                    ? 'bg-be-yellow-500 text-be-charcoal-950'
                    : 'bg-be-cream text-be-grey-550 group-hover:bg-be-yellow-100 group-hover:text-be-yellow-text',
                )}
              >
                <Icon className="size-4.5" aria-hidden="true" focusable="false" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-bold text-be-charcoal-950">
                  {opt.label}
                </span>
                <span className="block text-metadata text-be-grey-650 mt-0.5 leading-snug">
                  {opt.description}
                </span>
              </span>
              {isSelected && (
                <Check className="size-4 text-be-yellow-text shrink-0 mt-1" aria-hidden="true" focusable="false" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
