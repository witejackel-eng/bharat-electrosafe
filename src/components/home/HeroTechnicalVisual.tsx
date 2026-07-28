'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * HeroTechnicalVisual
 *
 * A premium "electrical safety in action" engineering illustration built as a
 * hybrid of real product photography and lightweight SVG/CSS technical layers.
 *
 * Layer stack (back → front):
 *   1. Warm-cream stage background with clipped corner + radial highlight
 *   2. SVG isometric floor plane, engineering grid, hazard-zone boundary,
 *      faint electrical contour field, measurement nodes
 *   3. SVG simplified switchgear cabinet (charcoal/grey, premium, simplified)
 *   4. REAL Bharat Electrosafe insulating-mat photo (photo-surface-01.webp —
 *      black, coin-pattern anti-skid) via next/image, set on the floor plane
 *      with a CSS perspective transform so it reads as unrolled toward the
 *      viewer. A yellow safety-edge accent ties the visual to the brand.
 *   5. HTML technical callouts (BIS LICENSED, CLASS A · B · C, ANTI-SKID
 *      SAFETY SURFACE, PROTECTED WORKING ZONE) with thin SVG leader lines.
 *
 * The real product photo carries the product realism; SVG supplies the
 * industrial context, depth and technical annotation. No Canvas, WebGL,
 * video or new dependencies. Framer Motion provides one-shot entrance only;
 * prefers-reduced-motion renders the complete illustration immediately.
 *
 * All colours reuse the existing be-* brand tokens.
 */

/* ------------------------------------------------------------------ */
/* Callout configuration — HTML overlays with leader-line anchors.     */
/* ------------------------------------------------------------------ */
type Callout = {
  id: string;
  label: string;
  /** Position of the label box on the stage (percent). */
  style: string;
  /** Anchor point the leader line connects to (percent of stage). */
  anchor: { x: string; y: string };
  /** Leader line goes from label to anchor. */
  hideOnMobile?: boolean;
  /** Secondary (smaller) callout style. */
  secondary?: boolean;
};

const callouts: Callout[] = [
  {
    id: 'bis',
    label: 'BIS LICENSED',
    style: 'top-[5%] right-[5%]',
    anchor: { x: '70%', y: '24%' },
    hideOnMobile: false,
  },
  {
    id: 'class',
    label: 'CLASS A · B · C',
    style: 'top-[30%] left-[3%]',
    anchor: { x: '36%', y: '62%' },
    hideOnMobile: false,
  },
  {
    id: 'skid',
    label: 'ANTI-SKID SAFETY SURFACE',
    style: 'bottom-[20%] right-[4%]',
    anchor: { x: '55%', y: '76%' },
    hideOnMobile: true,
  },
  {
    id: 'zone',
    label: 'PROTECTED WORKING ZONE',
    style: 'bottom-[5%] left-[4%]',
    anchor: { x: '30%', y: '82%' },
    hideOnMobile: true,
    secondary: true,
  },
];

export default function HeroTechnicalVisual() {
  const reduce = useReducedMotion();

  /* ---------------------------------------------------------------- */
  /* Motion presets — one-shot entrance only.                          */
  /* ---------------------------------------------------------------- */
  const switchgearMotion = reduce
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, ease: 'easeOut' as const },
      };

  const matMotion = reduce
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.75, delay: 0.12, ease: 'easeOut' as const },
      };

  const envMotion = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, delay: 0.28, ease: 'easeOut' as const },
      };

  const contourMotion = reduce
    ? { initial: { pathLength: 1, opacity: 0.18 }, animate: { pathLength: 1, opacity: 0.18 } }
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 0.18 },
        viewport: { once: true, amount: 0.3 },
        transition: {
          pathLength: { duration: 2, ease: 'easeInOut' as const },
          opacity: { duration: 0.5 },
        },
      };

  const hazardMotion = reduce
    ? { initial: { pathLength: 1, opacity: 0.5 }, animate: { pathLength: 1, opacity: 0.5 } }
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 0.5 },
        viewport: { once: true, amount: 0.3 },
        transition: {
          pathLength: { duration: 1.4, delay: 0.4, ease: 'easeInOut' as const },
          opacity: { duration: 0.4, delay: 0.4 },
        },
      };

  const stripMotion = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6, delay: 0.5 },
      };

  const calloutMotion = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 5 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.45, delay },
        };

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px] overflow-hidden">
      {/* ── Layer 1: stage background ─────────────────────────────── */}
      {/* The stage blends into the warm-white hero via a soft cream wash that
          fades out toward the edges — no hard card frame. */}
      <div
        className="absolute inset-0"
        style={{
          clipPath:
            'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)',
          background:
            'linear-gradient(135deg, rgba(255,253,243,0) 0%, rgba(255,253,243,0.55) 30%, rgba(255,253,243,0.9) 60%, rgba(255,253,243,0.5) 100%)',
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 62% 36%, rgba(255,251,232,0.7), transparent 62%)',
          }}
        />
      </div>
      {/* One subtle bottom hairline only — keeps a technical boundary without
          framing the illustration as a card. */}
      <div className="absolute left-6 bottom-0 right-6 h-px bg-be-grey-250/60" aria-hidden="true" />

      {/* ── Layers 2–3: SVG technical environment + switchgear ─────── */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 520"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Faint engineering grid */}
          <pattern id="htvGrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M36 0 H0 V36" fill="none" stroke="#242426" strokeOpacity="0.045" strokeWidth="1" />
          </pattern>
          {/* Switchgear body gradient (charcoal, matte metal) */}
          <linearGradient id="htvCab" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#38383A" />
            <stop offset="1" stopColor="#2a2a2c" />
          </linearGradient>
          <linearGradient id="htvCabSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2a2a2c" />
            <stop offset="1" stopColor="#1f1f21" />
          </linearGradient>
          {/* Soft shadow filter */}
          <filter id="htvSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* Engineering grid wash across the whole stage (decorative floor) */}
        <rect x="0" y="0" width="640" height="520" fill="url(#htvGrid)" />

        {/* Faint floor perspective lines converging toward the switchgear base
n            — subtle, no filled trapezoid podium. */}
        <g stroke="#242426" strokeOpacity="0.05" strokeWidth="1">
          <line x1="170" y1="310" x2="40" y2="475" />
          <line x1="280" y1="310" x2="230" y2="475" />
          <line x1="370" y1="310" x2="400" y2="475" />
          <line x1="470" y1="310" x2="600" y2="475" />
        </g>

        {/* ── Layer 3: switchgear cabinet (upper-right, simplified) ── */}
        <motion.g {...switchgearMotion}>
          {/* Cabinet base shadow on floor */}
          <ellipse cx="430" cy="300" rx="96" ry="12" fill="#242426" opacity="0.12" filter="url(#htvSoft)" />
          {/* Cabinet body — tall, three-quarter view (front face + side face) */}
          {/* Side face (right, darker) */}
          <polygon points="500,110 542,92 542,296 500,300" fill="url(#htvCabSide)" />
          {/* Front face */}
          <rect x="348" y="110" width="152" height="190" fill="url(#htvCab)" />
          {/* Top face (isometric sliver) */}
          <polygon points="348,110 500,110 542,92 390,92" fill="#4a4a44" />
          {/* Panel door split line */}
          <line x1="424" y1="110" x2="424" y2="300" stroke="#1f1f21" strokeWidth="1.5" />
          {/* Vents (horizontal slats, upper front) */}
          <g stroke="#1f1f21" strokeWidth="2" opacity="0.7">
            <line x1="360" y1="128" x2="414" y2="128" />
            <line x1="360" y1="135" x2="414" y2="135" />
            <line x1="360" y1="142" x2="414" y2="142" />
            <line x1="434" y1="128" x2="488" y2="128" />
            <line x1="434" y1="135" x2="488" y2="135" />
            <line x1="434" y1="142" x2="488" y2="142" />
          </g>
          {/* Indicator lights (two small LEDs) */}
          <circle cx="372" cy="158" r="3" fill="#FFC400" />
          <circle cx="372" cy="158" r="1.4" fill="#FFF4BE" />
          <circle cx="386" cy="158" r="3" fill="#3a3a3a" stroke="#1f1f21" strokeWidth="0.5" />
          {/* Small gauges / meters */}
          <rect x="440" y="152" width="40" height="20" rx="2" fill="#1f1f21" />
          <circle cx="450" cy="162" r="4" fill="#4a4a44" stroke="#666668" strokeWidth="0.5" />
          <circle cx="470" cy="162" r="4" fill="#4a4a44" stroke="#666668" strokeWidth="0.5" />
          {/* Door handles */}
          <rect x="416" y="200" width="4" height="40" rx="2" fill="#666668" />
          <rect x="428" y="200" width="4" height="40" rx="2" fill="#666668" />
          {/* Warning triangle (high voltage) on front */}
          <g transform="translate(392,218)">
            <polygon points="16,0 32,28 0,28" fill="#FFC400" stroke="#242426" strokeWidth="1.5" />
            <text x="16" y="24" textAnchor="middle" fontSize="18" fontWeight="700" fill="#242426" fontFamily="sans-serif">!</text>
          </g>
          {/* Side vents */}
          <g stroke="#1f1f21" strokeWidth="1.5" opacity="0.6">
            <line x1="510" y1="120" x2="536" y2="108" />
            <line x1="510" y1="135" x2="536" y2="123" />
            <line x1="510" y1="150" x2="536" y2="138" />
          </g>
          {/* Base plinth */}
          <rect x="344" y="298" width="160" height="6" fill="#1f1f21" />
          <polygon points="500,298 542,294 542,300 500,304" fill="#1a1a1c" />
        </motion.g>

        {/* ── Layer 2b: hazard-zone boundary + electrical contour ── */}
        {/* Protective electrical contour field around the mat working zone */}
        <motion.ellipse
          cx="300"
          cy="395"
          rx="250"
          ry="80"
          fill="none"
          stroke="#242426"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          {...contourMotion}
        />
        {/* Yellow hazard-zone boundary (dashed, around the mat) */}
        <motion.path
          d="M70,440 Q120,470 300,470 Q470,470 540,440"
          fill="none"
          stroke="#FFC400"
          strokeWidth="2"
          strokeDasharray="8 5"
          strokeLinecap="round"
          {...hazardMotion}
        />

        {/* Measurement nodes (desktop only, faint) */}
        <motion.g {...envMotion} className="hidden sm:block">
          <g stroke="#242426" strokeOpacity="0.2" strokeWidth="1">
            <line x1="90" y1="478" x2="510" y2="478" />
          </g>
          {[120, 200, 280, 360, 440, 480].map((x) => (
            <line key={x} x1={x} y1="474" x2={x} y2="482" stroke="#242426" strokeOpacity="0.2" strokeWidth="1" />
          ))}
          <circle cx="90" cy="478" r="2.5" fill="#FFFDF3" stroke="#242426" strokeOpacity="0.3" strokeWidth="1" />
          <circle cx="510" cy="478" r="2.5" fill="#FFFDF3" stroke="#242426" strokeOpacity="0.3" strokeWidth="1" />
        </motion.g>
      </svg>

      {/* ── Layer 4: flat insulating mat on the floor (SVG + real photo) ──
          The mat is drawn as a perspective trapezoid directly in the SVG
          below (wider at the front, narrower at the back) so it unmistakably
          reads as lying flat on the floor. The real Bharat Electrosafe
          product photo (photo-surface-01.webp — black, coin-pattern) is
          clipped to that trapezoid, giving genuine product texture while the
          trapezoid shape carries the perspective. No CSS 3D rotation is used
          — the shape itself is the perspective cue. */}
      <motion.div
        className="absolute inset-0"
        {...matMotion}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 640 520"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Bharat Electrosafe electrical insulating mat — a flat black rubber mat with circular anti-skid coin texture and a yellow safety edge, lying on the floor in front of an electrical switchgear cabinet."
        >
          <defs>
            {/* Clip the real mat photo to the perspective trapezoid. */}
            <clipPath id="matClip">
              {/* Back-left, back-right, front-right, front-left — wider at front */}
              <polygon points="195,338 405,338 525,468 115,468" />
            </clipPath>
            {/* Subtle darkening gradient — far edge slightly darker for depth */}
            <linearGradient id="matShade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000000" stopOpacity="0.35" />
              <stop offset="0.5" stopColor="#000000" stopOpacity="0" />
              <stop offset="1" stopColor="#000000" stopOpacity="0.05" />
            </linearGradient>
            {/* Mat body fill — dense charcoal rubber */}
            <linearGradient id="matBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1f1f21" />
              <stop offset="1" stopColor="#242426" />
            </linearGradient>
          </defs>

          {/* Soft contact shadow directly beneath the mat — grounds it */}
          <ellipse
            cx="320"
            cy="473"
            rx="220"
            ry="14"
            fill="#242426"
            opacity="0.16"
            filter="url(#htvSoft)"
          />

          {/* ── Mat body (perspective trapezoid) ── */}
          {/* Base fill — dense charcoal rubber */}
          <polygon points="195,338 405,338 525,468 115,468" fill="url(#matBody)" />

          {/* Real product photo clipped to the trapezoid — coin-pattern texture.
              preserveAspectRatio=slice crops the photo to fill the bounding box
              so the light background around the mat in the source photo is
              cropped out. opacity 0.92 lets the charcoal base show through
              for a consistent dark industrial finish. */}
          <image
            href="/media/products/electrical-insulating-mats/photo-surface-01.webp"
            x="115"
            y="338"
            width="410"
            height="130"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#matClip)"
            opacity="0.92"
          />

          {/* Depth shading — darker at the back (far edge) for perspective */}
          <polygon points="195,338 405,338 525,468 115,468" fill="url(#matShade)" clipPath="url(#matClip)" />

          {/* Thin front-edge thickness — shows realistic material profile */}
          <polygon points="115,468 525,468 520,475 120,475" fill="#0d0d0e" />

          {/* Yellow safety edge — narrow identification strip along the front edge */}
          <motion.polygon
            points="115,468 525,468 523,471 117,471"
            fill="#FFC400"
            opacity="0.88"
            {...stripMotion}
          />

          {/* Very subtle corner lift on the front-left corner — shows flexibility
              without creating a fold. Only 3% of mat width. */}
          <polygon points="115,468 132,468 126,461 119,462" fill="#1a1a1c" stroke="#0d0d0e" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* ── Layer 5: HTML callouts with SVG leader lines ─────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Leader lines (SVG overlay) */}
        <svg
          className="absolute inset-0 h-full w-full hidden sm:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {callouts
            .filter((c) => !c.hideOnMobile)
            .map((c) => {
              // Each callout's label box sits at its style position; the leader
              // runs from the anchor toward the nearest label edge. We draw a
              // short elbow connector from the anchor outward.
              const ax = parseFloat(c.anchor.x);
              const ay = parseFloat(c.anchor.y);
              // Label endpoint — a point just inside the label box edge.
              const isRight = c.style.includes('right');
              const isTop = c.style.includes('top-[5%]') || c.style.includes('top-[16%]');
              const lx = isRight ? ax + 8 : ax - 8;
              const ly = isTop ? ay + 6 : ay - 6;
              return (
                <motion.line
                  key={`line-${c.id}`}
                  x1={ax}
                  y1={ay}
                  x2={lx}
                  y2={ly}
                  stroke="#A9A9A5"
                  strokeWidth="0.4"
                  vectorEffect="non-scaling-stroke"
                  initial={reduce ? { opacity: 0.6 } : { opacity: 0 }}
                  whileInView={reduce ? undefined : { opacity: 0.6 }}
                  viewport={reduce ? undefined : { once: true, amount: 0.3 }}
                  transition={reduce ? undefined : { duration: 0.4, delay: 0.7 }}
                />
              );
            })}
          {/* Anchor dots */}
          {callouts
            .filter((c) => !c.hideOnMobile)
            .map((c) => (
              <motion.circle
                key={`dot-${c.id}`}
                cx={parseFloat(c.anchor.x)}
                cy={parseFloat(c.anchor.y)}
                r="0.8"
                fill="#FFC400"
                stroke="#242426"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={reduce ? undefined : { once: true, amount: 0.3 }}
                transition={reduce ? undefined : { duration: 0.3, delay: 0.65 }}
              />
            ))}
        </svg>

        {/* Callout labels */}
        {callouts.map((c, idx) => (
          <motion.div
            key={c.id}
            className={`absolute ${c.style} flex items-center gap-1.5 ${
              c.hideOnMobile ? 'hidden sm:flex' : 'flex'
            }`}
            {...calloutMotion(0.7 + idx * 0.1)}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                c.secondary ? 'bg-be-charcoal-800' : 'bg-be-yellow-500'
              }`}
            />
            <span
              className={`whitespace-nowrap font-semibold uppercase tracking-[0.13em] text-be-charcoal-800 ${
                c.secondary
                  ? 'text-[0.55rem] sm:text-[0.6rem]'
                  : 'text-[0.6rem] sm:text-[0.625rem]'
              }`}
            >
              {c.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
