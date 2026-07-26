'use client';

import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import {
  BookOpen,
  FileText,
  Clock,
  Calendar,
  ArrowRight,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readingTime: string;
  icon: LucideIcon;
}

const featured: Article = {
  id: 'insight-featured',
  category: 'Technical Brief',
  title: 'Specifying insulating mat thickness for high-humidity environments',
  excerpt:
    'IS 15652 sets minimum thicknesses for Classes A, B and C, but coastal substations and hydroelectric galleries routinely run at 85%+ relative humidity. We walk through how to read the standard, when to specify thickness above the minimum, and which surface patterns dissipate moisture without compromising dielectric strength.',
  author: 'Rajesh Menon, Head of Engineering',
  date: '12 Mar 2025',
  readingTime: '8 min read',
  icon: BookOpen,
};

const articles: Article[] = [
  {
    id: 'insight-dielectric',
    category: 'Testing',
    title: 'Why dielectric breakdown voltage isn’t the only spec that matters',
    excerpt:
      'Leakage current, flame resistance, tensile strength and ageing behaviour together describe a mat you can stand on for a decade — not just one that passes a single dielectric test.',
    author: 'Quality Assurance Team',
    date: '28 Feb 2025',
    readingTime: '5 min read',
    icon: FileText,
  },
  {
    id: 'insight-colour',
    category: 'Standards',
    title: 'Visible-safety colour standards: comparing IS and IEC approaches',
    excerpt:
      'Indian and international standards take different routes to high-visibility safety surfacing. Here is what to specify when your project crosses both regimes.',
    author: 'Compliance Desk',
    date: '09 Feb 2025',
    readingTime: '6 min read',
    icon: TrendingUp,
  },
];

export function InsightsSection() {
  return (
    <section
      id="insights"
      className="bg-ivory-light py-20 md:py-28 scroll-mt-32 relative overflow-hidden grain-overlay"
    >
      {/* Decorative diagonal stripe pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, var(--color-navy) 0, var(--color-navy) 1px, transparent 1px, transparent 16px)',
        }}
        aria-hidden="true"
      />

      {/* Floating decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="floating-shape absolute bottom-[5%] right-[8%] w-60 h-60 rounded-full bg-navy/[0.04] blur-3xl" />
        <div className="floating-shape absolute top-[15%] left-[50%] w-48 h-48 rounded-full bg-orange/[0.06] blur-3xl" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <Reveal delay={0}>
              <span
                className="inline-block text-xs font-semibold tracking-wider uppercase text-orange gradient-text"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Insights
              </span>
              <div className="accent-bar animate-underline-reveal" />
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="text-3xl md:text-4xl font-bold text-navy mt-3 gradient-text"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Technical insights from the production floor.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p
                className="text-base md:text-lg text-steel mt-4 max-w-2xl leading-relaxed"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Field notes, specification briefs and standards commentary
                written by the engineers who roll, test and ship every batch.
              </p>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-orange transition-colors hover-lift group/link"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              All articles
              <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Featured + smaller cards layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured article card */}
          <Reveal delay={150} translateY={16} className="lg:col-span-2">
            <article
              tabIndex={0}
              className="group relative h-full flex flex-col rounded-2xl border border-border/60 bg-white p-6 md:p-8 hover:border-orange/30 hover:shadow-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2 focus-visible:rounded-2xl card-tilt diagonal-line"
              style={{ fontFamily: "'Manrope', sans-serif" }}
              aria-labelledby={`${featured.id}-title`}
            >
              {/* FEATURED badge top-right */}
              <span
                className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-white bg-orange"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <span
                  className="inline-block w-1 h-1 rounded-full bg-white animate-gentle-pulse"
                  aria-hidden="true"
                />
                Featured
              </span>

              {/* Decorative gradient header strip with BookOpen icon */}
              <div
                className="relative h-28 rounded-xl bg-gradient-to-r from-navy via-navy-light to-orange overflow-hidden mb-6"
                aria-hidden="true"
              >
                {/* Dotted overlay */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '14px 14px',
                  }}
                />
                {/* Watermark BookOpen icon */}
                <BookOpen
                  className="absolute -bottom-2 -right-2 size-24 text-white/15 pointer-events-none"
                  strokeWidth={1.25}
                />
                <div className="absolute inset-0 flex items-center px-6">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                    <BookOpen className="size-6 text-white" strokeWidth={1.75} />
                  </div>
                  <span
                    className="ml-4 text-xs font-semibold tracking-wider uppercase text-white/90"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    From the engineering desk
                  </span>
                </div>
              </div>

              {/* Category */}
              <span
                className="text-xs font-semibold tracking-wider uppercase text-orange"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {featured.category}
              </span>

              {/* Title */}
              <h3
                id={`${featured.id}-title`}
                className="text-2xl font-bold text-navy leading-tight mt-2"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {featured.title}
              </h3>

              {/* Excerpt */}
              <p
                className="text-sm md:text-base text-steel leading-relaxed mt-3 line-clamp-3"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {featured.excerpt}
              </p>

              {/* Meta + read link */}
              <div className="mt-6 pt-5 border-t border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div
                  className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-steel"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  <span className="font-medium text-navy/80">
                    {featured.author}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3" />
                    {featured.date}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    {featured.readingTime}
                  </span>
                </div>

                <Link
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-orange hover:underline group/link shrink-0"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Read article
                  <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          </Reveal>

          {/* Smaller article cards stacked */}
          <div className="flex flex-col gap-6">
            {articles.map((article, i) => {
              const ArticleIcon = article.icon;
              return (
                <Reveal
                  key={article.id}
                  delay={230 + i * 80}
                  translateY={16}
                  className="flex-1"
                >
                  <article
                    tabIndex={0}
                    className="group h-full flex flex-col rounded-xl border border-border/60 bg-white p-5 hover:border-orange/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2 focus-visible:rounded-xl card-tilt diagonal-line"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                    aria-labelledby={`${article.id}-title`}
                  >
                    {/* Top row: icon + category */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-soft flex items-center justify-center shrink-0">
                        <ArticleIcon
                          className="size-5 text-orange"
                          strokeWidth={1.75}
                        />
                      </div>
                      <span
                        className="text-xs font-semibold tracking-wider uppercase text-orange"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {article.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      id={`${article.id}-title`}
                      className="text-base font-semibold text-navy leading-snug"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="text-sm text-steel leading-relaxed mt-2 line-clamp-2 flex-1"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                      <div
                        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-steel"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        <span className="font-medium text-navy/80 truncate max-w-[140px]">
                          {article.author}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" />
                          {article.readingTime}
                        </span>
                      </div>

                      <ArrowRight
                        className="size-4 text-orange opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        aria-hidden="true"
                      />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <Reveal delay={420}>
          <p
            className="mt-10 text-xs text-steel text-center md:text-left"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Looking for downloadable datasheets and test reports?{' '}
            <Link
              href="#resources"
              className="text-orange font-medium hover:underline"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Browse the technical resources library
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
