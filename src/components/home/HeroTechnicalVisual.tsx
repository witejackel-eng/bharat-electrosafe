'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * HeroTechnicalVisual
 *
 * A custom, lightweight 2.5D technical illustration of a Bharat Electrosafe
 * electrical insulating mat system. Built entirely with inline SVG + CSS + HTML
 * overlays — no Canvas, WebGL, video or extra dependencies.
 *
 * The illustration communicates:
 *  - Electrical insulation (charcoal insulating mat, protective contour field)
 *  - Industrial protection (heavy-duty layered thickness, anti-skid coin surface)
 *  - Engineered manufacturing (measurement ticks, construction marks, grid)
 *  - Certified safety (BIS LICENSED annotation, switchgear schematic)
 *  - The Bharat Electrosafe yellow / charcoal / warm-white identity
 *
 * All colours reuse the existing brand tokens (var(--be-*)). Motion is
 * restricted to a one-shot entrance reveal and fully respects
 * prefers-reduced-motion. With motion disabled the hero still renders complete.
 */

/* ------------------------------------------------------------------ */
/* Mat geometry — single source of truth for the SVG path coordinates. */
/* The flat mat is a 3/4 perspective parallelogram; the right end rolls */
/* up into a cylinder whose coiled cross-section faces the viewer.     */
/* ------------------------------------------------------------------ */
const A = { x: 108, y: 252 }; // back-left
const B = { x: 405, y: 236 }; // back-right (meets roll)
const C = { x: 440, y: 326 }; // front-right (meets roll)
const D = { x: 146, y: 352 }; // front-left

// Anti-skid coin pattern — perspective grid projected onto the mat surface.
const COLS = 7;
const ROWS = 5;
const coins = Array.from({ length: ROWS * COLS }, (_, k) => {
  const i = Math.floor(k / COLS); // depth row (back -> front)
  const j = k % COLS; // width col (left -> right)
  const t = j / (COLS - 1);
  const s = i / (ROWS - 1);
  const bx = A.x + (B.x - A.x) * t;
  const by = A.y + (B.y - A.y) * t;
  const fx = D.x + (C.x - D.x) * t;
  const fy = D.y + (C.y - D.y) * t;
  return {
    x: bx + (fx - bx) * s,
    y: by + (fy - by) * s,
    r: 2.1 + s * 0.9,
  };
});

// Measurement ticks along the bottom construction line.
const ticks = Array.from({ length: 11 }, (_, k) => 120 + k * 31);

type Annotation = {
  id: string;
  label: string;
  className: string;
  dotClass: string;
  dotFirst: boolean; // true = dot on the left (product is left of label)
  hideOnMobile: boolean;
};

const annotations: Annotation[] = [
  {
    id: 'bis',
    label: 'BIS LICENSED',
    className: 'top-[6%] right-[4%]',
    dotClass: 'bg-be-yellow-500',
    dotFirst: true,
    hideOnMobile: false,
  },
  {
    id: 'class',
    label: 'CLASS A · B · C',
    className: 'top-[44%] left-[2%]',
    dotClass: 'bg-be-charcoal-800',
    dotFirst: false,
    hideOnMobile: false,
  },
  {
    id: 'skid',
    label: 'ANTI-SKID SURFACE',
    className: 'bottom-[9%] right-[6%]',
    dotClass: 'bg-be-charcoal-800',
    dotFirst: true,
    hideOnMobile: true,
  },
];

export default function HeroTechnicalVisual() {
  const reduce = useReducedMotion();

  // Motion presets -------------------------------------------------------
  const envMotion = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, delay: 0.15, ease: 'easeOut' as const },
      };

  const envMotion2 = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, delay: 0.32, ease: 'easeOut' as const },
      };

  const matMotion = reduce
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, ease: 'easeOut' as const },
      };

  const contourMotion = reduce
    ? {
        initial: { pathLength: 1, opacity: 0.16 },
        animate: { pathLength: 1, opacity: 0.16 },
      }
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 0.16 },
        viewport: { once: true, amount: 0.3 },
        transition: {
          pathLength: { duration: 2.2, ease: 'easeInOut' as const },
          opacity: { duration: 0.5 },
        },
      };

  const ann = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 6 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.5, delay },
        };

  return (
    <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Stage background — warm cream, clipped top-right corner (stepped
          detail), subtle radial highlight. Merges with the warm-white hero
          instead of reading as a separate card. */}
      <div
        className="absolute inset-0 bg-be-cream"
        style={{
          clipPath:
            'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)',
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 46%, var(--be-yellow-50), transparent 62%)',
          }}
        />
      </div>

      {/* Selective 1px neutral borders — left + bottom only, so the stage
          never reads as an ordinary rounded card. */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px bg-be-grey-250"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 bottom-0 right-0 h-px bg-be-grey-250"
        aria-hidden="true"
      />

      {/* Technical illustration ---------------------------------------- */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 500"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Technical illustration of a Bharat Electrosafe electrical insulating mat — charcoal anti-skid mat partly rolled, with yellow safety edge, layered construction, and a protective contour field, annotated as BIS licensed, Class A B C, anti-skid surface."
      >
        <defs>
          {/* Faint engineering grid */}
          <pattern
            id="heroGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0 H0 V40"
              fill="none"
              stroke="var(--be-charcoal-950)"
              strokeOpacity="0.05"
              strokeWidth="1"
            />
          </pattern>
          {/* Soft shadow filter for grounding the product */}
          <filter id="heroSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Grid wash across the whole stage (decorative) */}
        <g aria-hidden="true">
          <rect x="0" y="0" width="640" height="500" fill="url(#heroGrid)" />
        </g>

        {/* Environment: schematic + grid (staggered reveal, group 1) */}
        <motion.g aria-hidden="true" {...envMotion}>
          {/* Switchgear / control-panel schematic, upper-left */}
          <g stroke="var(--be-charcoal-800)" strokeOpacity="0.12" fill="none" strokeWidth="1">
            <rect x="44" y="58" width="86" height="92" />
            <line x1="44" y1="78" x2="130" y2="78" />
            <line x1="60" y1="78" x2="60" y2="132" />
            <line x1="84" y1="78" x2="84" y2="132" />
            <line x1="108" y1="78" x2="108" y2="132" />
          </g>
          {/* Connection node on schematic */}
          <g stroke="var(--be-charcoal-800)" strokeOpacity="0.28" strokeWidth="1">
            <line x1="83" y1="146" x2="91" y2="146" />
            <line x1="87" y1="142" x2="87" y2="150" />
          </g>
          <circle cx="87" cy="146" r="3" fill="var(--be-cream)" stroke="var(--be-charcoal-800)" strokeOpacity="0.3" strokeWidth="1" />
        </motion.g>

        {/* Environment: measurement ticks + hazard line + nodes (group 2) */}
        <motion.g aria-hidden="true" {...envMotion2}>
          {/* Measurement / construction ticks */}
          <g stroke="var(--be-charcoal-800)" strokeOpacity="0.18" strokeWidth="1">
            <line x1="120" y1="418" x2="430" y2="418" />
            {ticks.map((x) => (
              <line key={x} x1={x} y1="413" x2={x} y2="423" />
            ))}
          </g>
          {/* Restrained yellow hazard-zone line (diagonal) */}
          <line
            x1="96"
            y1="402"
            x2="470"
            y2="394"
            stroke="var(--be-yellow-500)"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="7 5"
          />
          {/* Connection nodes */}
          <g stroke="var(--be-charcoal-800)" strokeOpacity="0.28" strokeWidth="1">
            <line x1="429" y1="414" x2="435" y2="422" />
            <line x1="429" y1="422" x2="435" y2="414" />
          </g>
          <circle cx="432" cy="418" r="3" fill="var(--be-cream)" stroke="var(--be-charcoal-800)" strokeOpacity="0.3" strokeWidth="1" />
        </motion.g>

        {/* Protective contour field — one very slow initial draw */}
        <motion.ellipse
          cx="295"
          cy="300"
          rx="255"
          ry="135"
          fill="none"
          stroke="var(--be-charcoal-800)"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          aria-hidden="true"
          {...contourMotion}
        />

        {/* Soft grounding shadows under the product */}
        <g aria-hidden="true">
          <ellipse cx="275" cy="388" rx="215" ry="18" fill="#242426" opacity="0.09" filter="url(#heroSoft)" />
          <ellipse cx="438" cy="342" rx="58" ry="12" fill="#242426" opacity="0.1" filter="url(#heroSoft)" />
        </g>

        {/* The product — insulating mat system -------------------------- */}
        <motion.g {...matMotion}>
          {/* Mat top surface (charcoal, matte) */}
          <path
            d={`M${A.x},${A.y} L${B.x},${B.y} L${C.x},${C.y} L${D.x},${D.y} Z`}
            fill="var(--be-charcoal-950)"
          />

          {/* Anti-skid coin pattern on the top surface */}
          <g aria-hidden="true">
            {coins.map((c, idx) => (
              <circle
                key={idx}
                cx={c.x}
                cy={c.y}
                r={c.r}
                fill="var(--be-charcoal-800)"
                fillOpacity="0.5"
                stroke="var(--be-grey-400)"
                strokeOpacity="0.18"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Mat thickness / layered construction (front face) */}
          <path
            d={`M${D.x},${D.y} L${C.x},${C.y} L${C.x + 6},${C.y + 18} L${D.x + 6},${D.y + 18} Z`}
            fill="var(--be-charcoal-800)"
          />
          {/* Layer lines within the thickness */}
          <g
            stroke="var(--be-charcoal-950)"
            strokeOpacity="0.55"
            strokeWidth="1"
            aria-hidden="true"
          >
            <line x1={D.x + 2} y1={D.y + 6} x2={C.x + 2} y2={C.y + 6} />
            <line x1={D.x + 4} y1={D.y + 12} x2={C.x + 4} y2={C.y + 12} />
          </g>

          {/* Yellow safety / identification edge — the strong diagonal accent */}
          <line
            x1={D.x}
            y1={D.y}
            x2={C.x}
            y2={C.y}
            stroke="var(--be-yellow-500)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Subdued yellow framing on the back edge */}
          <line
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="var(--be-yellow-500)"
            strokeOpacity="0.45"
            strokeWidth="2"
          />

          {/* Rolled end — cylinder body (right side, above mat plane) */}
          <path
            d="M405,236 Q442,222 476,216 L476,328 Q460,330 440,326 Z"
            fill="var(--be-charcoal-800)"
          />
          {/* Yellow identification stripe wrapping the roll (subtle) */}
          <path
            d="M446,224 L452,223 L452,327 L446,328 Z"
            fill="var(--be-yellow-500)"
            fillOpacity="0.8"
          />

          {/* Coiled cross-section end cap (faces viewer) */}
          <ellipse cx="476" cy="272" rx="17" ry="56" fill="var(--be-charcoal-950)" />
          <g
            fill="none"
            stroke="var(--be-charcoal-800)"
            strokeOpacity="0.7"
            strokeWidth="1"
            aria-hidden="true"
          >
            <ellipse cx="476" cy="272" rx="12" ry="40" />
            <ellipse cx="476" cy="272" rx="7" ry="24" />
            <ellipse cx="476" cy="272" rx="3" ry="10" />
          </g>
          <circle cx="476" cy="272" r="2" fill="var(--be-charcoal-800)" />
        </motion.g>
      </svg>

      {/* HTML annotation overlays — sharp, responsive text -------------- */}
      <div className="absolute inset-0 pointer-events-none">
        {annotations.map((a, idx) => (
          <motion.div
            key={a.id}
            className={`absolute ${a.className} flex items-center gap-1.5 ${
              a.dotFirst ? 'flex-row' : 'flex-row-reverse'
            } ${a.hideOnMobile ? 'hidden sm:flex' : 'flex'}`}
            {...ann(0.6 + idx * 0.12)}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${a.dotClass}`} />
            <span className="h-px w-4 sm:w-5 bg-be-grey-400" />
            <span className="text-[0.6rem] sm:text-[0.625rem] uppercase tracking-[0.14em] font-semibold text-be-charcoal-800 whitespace-nowrap">
              {a.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
