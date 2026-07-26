'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Zap } from 'lucide-react';
import { useLocale } from '@/components/i18n/useLocale';
import { t, Locale } from '@/lib/i18n';

type InsulationClass = null | 'A' | 'B' | 'C' | 'custom';

interface ClassInfo {
  title: string;
  thickness: string;
  description: string;
  borderColor: string;
  borderClass: string;
  productClass: string;
}

function getClassData(locale: Locale): Record<string, ClassInfo> {
  return {
    A: {
      title: t('voltage.classA', locale),
      thickness: t('voltage.thicknessA', locale),
      description: t('voltage.descA', locale),
      borderColor: 'emerald',
      borderClass: 'border-emerald-500/30',
      productClass: 'Class A',
    },
    B: {
      title: t('voltage.classB', locale),
      thickness: t('voltage.thicknessB', locale),
      description: t('voltage.descB', locale),
      borderColor: 'blue',
      borderClass: 'border-blue-500/30',
      productClass: 'Class B',
    },
    C: {
      title: t('voltage.classC', locale),
      thickness: t('voltage.thicknessC', locale),
      description: t('voltage.descC', locale),
      borderColor: 'orange',
      borderClass: 'border-orange/30',
      productClass: 'Class C',
    },
    custom: {
      title: t('voltage.classCustom', locale),
      thickness: t('voltage.thicknessCustom', locale),
      description: t('voltage.descCustom', locale),
      borderColor: 'orange',
      borderClass: 'border-orange/30',
      productClass: 'Custom',
    },
  };
}

function determineClass(voltage: number): InsulationClass {
  if (voltage <= 0) return null;
  if (voltage <= 3.3) return 'A';
  if (voltage <= 11) return 'B';
  if (voltage <= 33) return 'C';
  return 'custom';
}

export function VoltageCalculator() {
  const locale = useLocale();
  const [rawVoltage, setRawVoltage] = useState<string>('');
  const [debouncedVoltage, setDebouncedVoltage] = useState<number>(0);

  // Debounce input for smoother UX
  useEffect(() => {
    const timer = setTimeout(() => {
      const num = parseFloat(rawVoltage);
      setDebouncedVoltage(isNaN(num) ? 0 : num);
    }, 300);
    return () => clearTimeout(timer);
  }, [rawVoltage]);

  // Derive recommended class from debounced voltage (no setState in effect)
  const recommendedClass = useMemo(() => determineClass(debouncedVoltage), [debouncedVoltage]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRawVoltage(e.target.value);
    },
    []
  );

  const classData = getClassData(locale);
  const resultInfo = recommendedClass ? classData[recommendedClass] : null;
  const showPlaceholder = !recommendedClass;

  return (
    <section
      id="voltage-calculator"
      className="bg-ivory-light py-20 md:py-28 scroll-mt-32 relative overflow-hidden grain-overlay"
      style={{ fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Floating decorative shapes */}
        <div className="floating-shape w-48 h-48 rounded-full bg-orange -top-8 -right-6" aria-hidden="true" style={{ animationDelay: '-5s' }} />
        <div className="floating-shape w-32 h-32 bg-navy bottom-[20%] left-[10%]" aria-hidden="true" style={{ animationDelay: '-12s', transform: 'rotate(45deg)' }} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left column — eyebrow, heading, description */}
          <div className="lg:col-span-5">
            <Reveal delay={0}>
              <span className="inline-block text-eyebrow gradient-text">
                {t('voltage.eyebrow', locale)}
              </span>
              <div className="accent-bar animate-underline-reveal" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mt-3 leading-tight">
                {t('voltage.title', locale)}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[#374151] dark:text-white/75 max-w-md leading-relaxed mt-4">
                {t('voltage.description', locale)}
              </p>
            </Reveal>
            {/* Decorative accent bar */}
            <Reveal delay={180}>
              <div className="accent-bar" />
            </Reveal>
          </div>

          {/* Right column — Calculator card */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8">
                {/* Step 1 — Voltage input */}
                <div className="mb-8">
                  <label
                    htmlFor="voltage-input"
                    className="block text-sm font-semibold text-navy dark:text-foreground mb-2"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {t('voltage.inputLabel', locale)}
                  </label>
                  <div className="relative mt-1">
                    <Zap
                      className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-orange/60"
                      aria-hidden="true"
                    />
                    <input
                      id="voltage-input"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder={t('voltage.placeholder', locale)}
                      value={rawVoltage}
                      onChange={handleInputChange}
                      aria-label={t('voltage.inputLabel', locale)}
                      className="w-full h-12 pl-10 pr-14 rounded-xl border border-border bg-ivory-light dark:bg-navy-dark text-navy dark:text-foreground text-lg font-medium placeholder:text-steel/50 dark:placeholder:text-white/40 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30 transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif', fontVariantNumeric: 'tabular-nums' }}
                    />
                    <span
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-steel dark:text-white/50 font-semibold text-sm"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      kV
                    </span>
                  </div>
                </div>

                {/* Step 2 — Result area */}
                <div className="min-h-[160px]">
                  {showPlaceholder ? (
                    <div
                      className="flex items-center justify-center h-[160px] rounded-xl border border-border/40 bg-ivory-light/50 dark:bg-navy-dark/30"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <p className="text-steel dark:text-white/50 text-sm text-center px-4">
                        {t('voltage.placeholderText', locale)}
                      </p>
                    </div>
                  ) : resultInfo ? (
                    <div
                      key={recommendedClass}
                      className={`rounded-xl border ${resultInfo.borderClass} bg-white dark:bg-card p-6 animate-[resultFadeIn_400ms_ease-out_both]`}
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-navy dark:text-foreground">
                            {resultInfo.title}
                          </h3>
                          <p className="text-sm text-steel dark:text-white/70 mt-1 font-medium">
                            {resultInfo.thickness}
                          </p>
                          <p className="text-sm text-[#374151] dark:text-white/75 mt-1">
                            {resultInfo.description}
                          </p>
                        </div>
                        <QuoteButton
                          productClass={resultInfo.productClass}
                          variant="default"
                          size="sm"
                          showArrow
                          className="bg-orange hover:bg-orange-hover text-white font-semibold shrink-0"
                        >
                          {t('voltage.getQuote', locale)}
                        </QuoteButton>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Safety note */}
                <p
                  className="text-xs text-orange/80 mt-6 leading-relaxed"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {t('voltage.safetyNote', locale)}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

    </section>
  );
}
