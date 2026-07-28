/**
 * HeroTechnicalVisual — Server Component (pure SVG/CSS, no client JS).
 *
 * Redesigned hero illustration telling a complete product story in one
 * integrated scene:
 *
 *   "An electrical technician is operating a control panel while
 *    standing on an insulating mat."
 *
 * Layer stack (back → front):
 *   1. Warm-cream stage background with clipped corner + radial highlight
 *   2. Engineering grid + floor perspective lines (shared vanishing point)
 *   3. Switchgear cabinet (back-right, on floor plane, simplified)
 *   4. Insulating mat (front-center, flat on floor, real product texture
 *      with yellow safety edge, visible thickness, raised perimeter)
 *   5. Operator (side view, standing on mat, facing cabinet, yellow hard
 *      hat, charcoal coveralls, reaching toward panel)
 *   6. Protected-zone yellow dashed boundary (hugging mat outline)
 *   7. Hazard line (floor-level, blue-grey, approaches from left, fades
 *      at mat boundary — conveys "insulating barrier contains the risk")
 *   8. HTML callouts (desktop: 4 positioned labels with leader lines;
 *      mobile: 3 concise inline labels)
 *
 * Responsive label strategy:
 *   Desktop (1024px+): Four overlay callouts with leader lines.
 *   Tablet (768–1023px): Four overlay callouts, slightly reduced.
 *   Mobile (<768px): Three short object labels inside the visual,
 *     plus a HeroTechnicalLegend below with all four complete terms.
 *
 * Static-first guarantee: every element's DEFAULT computed state is its
 * FINAL state. Entry animations use @starting-style (transitions) and
 * CSS @keyframes (path fades). With JS disabled, with animations
 * disabled, with prefers-reduced-motion, or in PageSpeed's first
 * meaningful frame, every element renders at its final state and the
 * complete scene is immediately understandable.
 *
 * Accessibility: the wrapper div has role="img" and a single descriptive
 * aria-label. All internal SVGs are aria-hidden="true" so assistive
 * technology hears one concise description instead of dozens of paths.
 *
 * Performance: server-rendered, no Framer Motion, no Canvas, no WebGL,
 * no video, no large base64. Reuses the existing optimised
 * mat-texture.webp (68 KB). No client JS introduced.
 *
 * All colours reuse the existing be-* brand tokens.
 */

/* ------------------------------------------------------------------ */
/* Callout configuration — HTML overlays with leader-line anchors.     */
/* ------------------------------------------------------------------ */
type Callout = {
  id: string;
  /** Label text — consistent across all viewports. */
  label: string;
  /** Position of the label box on the stage (Tailwind classes). */
  style: string;
  /** Anchor point the leader line connects to (percent of stage, 0–100). */
  anchor: { x: number; y: number };
  /** Show on desktop and tablet (≥768px) only. Hidden on mobile. */
  desktopOnly?: boolean;
  /** Leader-line label endpoint direction. */
  isRight?: boolean;
  isTop?: boolean;
};

/**
 * Desktop/tablet callouts — all four technical terms shown with leader
 * lines.  `desktopOnly: true` means the label only appears ≥768px.
 */
const desktopCallouts: Callout[] = [
  {
    id: 'switchgear',
    label: 'ELECTRICAL SWITCHGEAR',
    style: 'top-[4%] right-[3%]',
    anchor: { x: 72, y: 36 },
    isRight: true,
    isTop: true,
  },
  {
    id: 'operator',
    label: 'OPERATOR STANDING AREA',
    style: 'bottom-[26%] left-[3%]',
    anchor: { x: 47, y: 80 },
  },
  {
    id: 'barrier',
    label: 'INSULATING BARRIER',
    style: 'bottom-[6%] right-[3%]',
    anchor: { x: 80, y: 92 },
    isRight: true,
  },
  {
    id: 'skid',
    label: 'ANTI-SKID SURFACE',
    style: 'top-[46%] left-[3%]',
    anchor: { x: 28, y: 80 },
    isTop: true,
  },
];

/**
 * Mobile inline labels — three concise object labels placed inside the
 * SVG coordinate space. These are short enough to fit without overlap.
 * The fourth concept (Anti-Skid Surface) is covered in the legend below.
 */
type MobileLabel = {
  id: string;
  /** Short label that fits inside the mobile illustration. */
  shortLabel: string;
  /** SVG coordinate for the label anchor point (viewBox 0–640, 0–520). */
  x: number;
  y: number;
  /** Text anchor alignment. */
  anchor?: 'start' | 'middle' | 'end';
};

const mobileLabels: MobileLabel[] = [
  {
    id: 'switchgear',
    shortLabel: 'ELECTRICAL SWITCHGEAR',
    x: 424,
    y: 98,
    anchor: 'middle',
  },
  {
    id: 'operator',
    shortLabel: 'OPERATOR',
    x: 310,
    y: 258,
    anchor: 'middle',
  },
  {
    id: 'mat',
    shortLabel: 'INSULATING MAT',
    x: 320,
    y: 330,
    anchor: 'middle',
  },
];

export default function HeroTechnicalVisual() {
  return (
    <div
      role="img"
      aria-label="Technical illustration of a technician standing on an anti-skid electrical insulating mat while operating switchgear. The mat defines the operator standing area and forms an insulating barrier between the operator and the floor."
      className="relative w-full overflow-hidden h-[340px] sm:h-[380px] md:h-[420px] lg:h-[440px] xl:h-[470px] 2xl:h-[480px]"
    >
      {/* ── Layer 1: stage background ─────────────────────────────── */}
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
      <div
        className="absolute left-6 bottom-0 right-6 h-px bg-be-grey-250/60"
        aria-hidden="true"
      />

      {/* ── Layers 2–7: SVG technical environment (single SVG, shared
            coordinate system so the mat, operator, cabinet, protected
            zone and hazard line all sit on the same perspective plane). */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 520"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Engineering grid pattern */}
          <pattern
            id="htv2-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M36 0 H0 V36"
              fill="none"
              stroke="#242426"
              strokeOpacity="0.045"
              strokeWidth="1"
            />
          </pattern>

          {/* Cabinet gradients */}
          <linearGradient id="htv2-cab" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#38383A" />
            <stop offset="1" stopColor="#2a2a2c" />
          </linearGradient>
          <linearGradient id="htv2-cab-side" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2a2a2c" />
            <stop offset="1" stopColor="#1f1f21" />
          </linearGradient>

          {/* Mat gradients */}
          <linearGradient id="htv2-mat-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f1f21" />
            <stop offset="1" stopColor="#242426" />
          </linearGradient>
          <linearGradient id="htv2-mat-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="#000000" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.05" />
          </linearGradient>

          {/* Mat perspective clip — trapezoid matching mat outline */}
          <clipPath id="htv2-mat-clip">
            <polygon points="195,338 405,338 525,468 115,468" />
          </clipPath>

          {/* Soft shadow filter for contact shadows */}
          <filter
            id="htv2-soft"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* ── Layer 2: floor grid + perspective lines ────────────── */}
        <g className="htv-step htv-step-1">
          <rect x="0" y="0" width="640" height="520" fill="url(#htv2-grid)" />

          {/* Floor perspective lines converging toward back-center */}
          <g stroke="#242426" strokeOpacity="0.06" strokeWidth="1">
            <line x1="80" y1="475" x2="240" y2="310" />
            <line x1="200" y1="475" x2="290" y2="310" />
            <line x1="320" y1="475" x2="320" y2="310" />
            <line x1="440" y1="475" x2="350" y2="310" />
            <line x1="560" y1="475" x2="400" y2="310" />
          </g>

          {/* Floor horizontal lines (slight perspective) */}
          <g stroke="#242426" strokeOpacity="0.05" strokeWidth="1">
            <line x1="40" y1="350" x2="600" y2="350" />
            <line x1="20" y1="400" x2="620" y2="400" />
            <line x1="0" y1="450" x2="640" y2="450" />
          </g>
        </g>

        {/* ── Layer 3: switchgear cabinet (back-right, on floor) ──── */}
        <g className="htv-step htv-step-1">
          {/* Contact shadow on floor */}
          <ellipse
            cx="430"
            cy="306"
            rx="100"
            ry="10"
            fill="#242426"
            opacity="0.14"
            filter="url(#htv2-soft)"
          />
          {/* Cabinet side (right) — shows 3D depth */}
          <polygon points="500,108 542,90 542,296 500,302" fill="url(#htv2-cab-side)" />
          {/* Cabinet front face */}
          <rect x="348" y="108" width="152" height="194" fill="url(#htv2-cab)" />
          {/* Cabinet top — shows 3D depth */}
          <polygon points="348,108 500,108 542,90 390,90" fill="#4a4a44" />
          {/* Centre seam (double-door) */}
          <line x1="424" y1="108" x2="424" y2="302" stroke="#1f1f21" strokeWidth="1.5" />
          {/* Upper vent slots (left door) */}
          <g stroke="#1f1f21" strokeWidth="2" opacity="0.7">
            <line x1="360" y1="126" x2="414" y2="126" />
            <line x1="360" y1="133" x2="414" y2="133" />
            <line x1="360" y1="140" x2="414" y2="140" />
            <line x1="434" y1="126" x2="488" y2="126" />
            <line x1="434" y1="133" x2="488" y2="133" />
            <line x1="434" y1="140" x2="488" y2="140" />
          </g>
          {/* Status LED (yellow) + meter */}
          <circle cx="372" cy="156" r="3" fill="#FFC400" />
          <circle cx="372" cy="156" r="1.4" fill="#FFF4BE" />
          <circle
            cx="386"
            cy="156"
            r="3"
            fill="#3a3a3a"
            stroke="#1f1f21"
            strokeWidth="0.5"
          />
          {/* Digital panel + knobs */}
          <rect x="440" y="150" width="40" height="20" rx="2" fill="#1f1f21" />
          <circle cx="450" cy="160" r="4" fill="#4a4a44" stroke="#666668" strokeWidth="0.5" />
          <circle cx="470" cy="160" r="4" fill="#4a4a44" stroke="#666668" strokeWidth="0.5" />
          {/* Door handles */}
          <rect x="416" y="200" width="4" height="40" rx="2" fill="#666668" />
          <rect x="428" y="200" width="4" height="40" rx="2" fill="#666668" />
          {/* High-voltage warning triangle */}
          <g transform="translate(392,218)">
            <polygon
              points="16,0 32,28 0,28"
              fill="#FFC400"
              stroke="#242426"
              strokeWidth="1.5"
            />
            <text
              x="16"
              y="24"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#242426"
              fontFamily="sans-serif"
            >
              !
            </text>
          </g>
          {/* Side vents */}
          <g stroke="#1f1f21" strokeWidth="1.5" opacity="0.6">
            <line x1="510" y1="118" x2="536" y2="106" />
            <line x1="510" y1="133" x2="536" y2="121" />
            <line x1="510" y1="148" x2="536" y2="136" />
          </g>
          {/* Cabinet base plinth */}
          <rect x="344" y="300" width="160" height="6" fill="#1f1f21" />
          <polygon points="500,300 542,296 542,302 500,306" fill="#1a1a1c" />
        </g>

        {/* ── Layer 4: insulating mat (front-center, flat on floor) ─ */}
        <g className="htv-step htv-step-2">
          {/* Floor contact shadow under mat — confirms mat lies ON floor */}
          <ellipse
            cx="320"
            cy="473"
            rx="220"
            ry="14"
            fill="#242426"
            opacity="0.16"
            filter="url(#htv2-soft)"
          />
          {/* Mat body (perspective trapezoid — narrow at back, wide at front) */}
          <polygon points="195,338 405,338 525,468 115,468" fill="url(#htv2-mat-body)" />
          {/* Real anti-skid product texture — 68 KB purpose-built asset,
              clipped to the perspective trapezoid. */}
          <image
            href="/media/hero/mat-texture.webp"
            x="115"
            y="338"
            width="410"
            height="130"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#htv2-mat-clip)"
            opacity="0.92"
          />
          {/* Depth shading — top-to-bottom light variation */}
          <polygon
            points="195,338 405,338 525,468 115,468"
            fill="url(#htv2-mat-shade)"
            clipPath="url(#htv2-mat-clip)"
          />
          {/* Slightly raised perimeter edge — thin inner outline */}
          <polygon
            points="202,344 398,344 516,462 124,462"
            fill="none"
            stroke="#3a3a3c"
            strokeWidth="1.25"
            opacity="0.45"
          />
          {/* Front-edge thickness — shows mat is a solid 3D object,
              not a painted floor patch. */}
          <polygon points="115,468 525,468 520,475 120,475" fill="#0d0d0e" />
          {/* Yellow safety edge — brand identifier */}
          <polygon
            points="115,468 525,468 523,471 117,471"
            fill="#FFC400"
            opacity="0.88"
          />
          {/* Subtle corner detail (front-left) */}
          <polygon
            points="115,468 132,468 126,461 119,462"
            fill="#1a1a1c"
            stroke="#0d0d0e"
            strokeWidth="0.5"
          />
        </g>

        {/* ── Layer 5: operator (side view, on mat, facing cabinet) ─
            Muted blue-grey coverall (lighter than the dark mat) ensures
            the figure stays visible against the mat without dominating
            it. Thin lighter outline along the figure's edges keeps the
            silhouette readable at all screen sizes. */}
        <g className="htv-step htv-step-3">
          {/* Contact shadow on mat — confirms operator stands ON mat */}
          <ellipse cx="305" cy="416" rx="28" ry="3.5" fill="#000" opacity="0.22" />

          {/* Back leg (slightly behind front leg) */}
          <path
            d="M298,365 L301,413 L308,413 L306,365 Z"
            fill="#3a4248"
            stroke="#5a626a"
            strokeWidth="0.6"
          />
          {/* Back boot */}
          <ellipse cx="304" cy="414" rx="7" ry="2.5" fill="#1a1a1c" stroke="#3a4248" strokeWidth="0.4" />

          {/* Front leg */}
          <path
            d="M310,365 L314,413 L321,413 L318,365 Z"
            fill="#4a5258"
            stroke="#6a7280"
            strokeWidth="0.6"
          />
          {/* Front boot */}
          <ellipse cx="318" cy="414" rx="7" ry="2.5" fill="#1a1a1c" stroke="#4a5258" strokeWidth="0.4" />

          {/* Torso (coverall, slight forward lean toward panel) */}
          <path
            d="M294,295 L322,295 L324,365 L292,365 Z"
            fill="#4a5560"
            stroke="#6a7280"
            strokeWidth="0.6"
          />
          {/* Torso highlight (light from upper-left) */}
          <path d="M294,295 L302,295 L300,365 L293,365 Z" fill="#5a6571" opacity="0.6" />
          {/* Coverall waist band */}
          <rect x="292" y="358" width="32" height="3" fill="#2a3238" opacity="0.6" />

          {/* Back arm (at side, slightly visible behind torso) */}
          <path
            d="M294,302 L289,335 L293,360 L298,335 Z"
            fill="#3a4248"
            stroke="#5a626a"
            strokeWidth="0.5"
          />

          {/* Front arm — reaches toward cabinet to convey "operating" */}
          <path
            d="M322,302 L342,320 L355,340 L350,345 L340,330 L322,315 Z"
            fill="#4a5560"
            stroke="#6a7280"
            strokeWidth="0.5"
          />
          {/* Hand (glove) */}
          <circle cx="353" cy="343" r="4" fill="#3a4248" stroke="#5a626a" strokeWidth="0.4" />

          {/* Neck */}
          <rect x="303" y="287" width="9" height="10" fill="#4a4036" />

          {/* Head (profile, facing right toward cabinet) */}
          <circle cx="309" cy="278" r="9" fill="#4a4036" />

          {/* Hard hat (yellow) — profile view, the only saturated brand
              accent on the operator. Helmet identifies the figure as
              industrial personnel without dominating the mat. */}
          <path
            d="M299,276 Q299,263 309,262 Q319,263 319,276 L321,278 L297,278 Z"
            fill="#FFC400"
            stroke="#DFAA00"
            strokeWidth="0.5"
          />
          {/* Hard hat brim (front) */}
          <path d="M317,272 L323,274 L323,278 L317,278 Z" fill="#FFC400" />
          {/* Hard hat brim (back) */}
          <path d="M295,278 L299,274 L299,278 L295,278 Z" fill="#DFAA00" opacity="0.9" />
          {/* Hard hat subtle highlight */}
          <path
            d="M303,267 Q307,263 313,263"
            stroke="#FFF4BE"
            strokeWidth="1"
            fill="none"
            opacity="0.7"
          />
        </g>

        {/* ── Layer 6: protected-zone boundary (yellow dashed, hugs mat) */}
        <polygon
          points="180,328 420,328 540,478 100,478"
          fill="none"
          stroke="#FFC400"
          strokeWidth="2"
          strokeDasharray="8 5"
          strokeLinecap="round"
          className="htv-zone-draw"
        />

        {/* ── Layer 7: hazard line (floor-level, fades at mat boundary) */}
        {/* The line approaches from the lower-left at floor level and
            stops at the mat boundary — conveys "insulating barrier
            contains floor-level electrical risk". No sparks, no
            lightning, no shock imagery. Just a technical current line
            that fades where the mat begins. */}
        <path
          d="M30,455 Q70,458 108,452"
          fill="none"
          stroke="#5a6a7a"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
          className="htv-hazard-draw"
        />
        {/* Small "stopped" marker where hazard meets mat boundary — a
            subtle visual cue that the line terminates at the mat edge. */}
        <g
          className="htv-step htv-step-6"
          stroke="#5a6a7a"
          strokeWidth="1.5"
          opacity="0.55"
        >
          <line x1="106" y1="448" x2="114" y2="456" />
          <line x1="114" y1="448" x2="106" y2="456" />
        </g>

        {/* ── Mobile inline labels — visible only below 768px ──── */}
        {mobileLabels.map((ml) => (
          <g key={`ml-${ml.id}`} className="md:hidden htv-step htv-step-5">
            {/* Small connecting line from label to element */}
            <line
              x1={ml.x}
              y1={ml.y + 4}
              x2={ml.x}
              y2={ml.y + 14}
              stroke="#A9A9A5"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Yellow anchor dot */}
            <circle
              cx={ml.x}
              cy={ml.y + 14}
              r="2.5"
              fill="#FFC400"
              stroke="#242426"
              strokeWidth="0.8"
            />
            {/* Label background pill */}
            <rect
              x={ml.anchor === 'middle' ? ml.x - 60 : ml.x - 4}
              y={ml.y - 12}
              width={ml.anchor === 'middle' ? 120 : 128}
              height="16"
              rx="3"
              fill="rgba(255,254,249,0.88)"
              stroke="#D8D7D1"
              strokeWidth="0.6"
            />
            {/* Label text */}
            <text
              x={ml.x}
              y={ml.y}
              textAnchor={ml.anchor || 'start'}
              fontSize="9"
              fontWeight="600"
              fill="#38383A"
              fontFamily="sans-serif"
              letterSpacing="0.08em"
            >
              {ml.shortLabel}
            </text>
          </g>
        ))}
      </svg>

      {/* ── Layer 8: Desktop/tablet HTML callouts with leader lines ─ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Leader lines (SVG overlay, container-percent coordinate system) */}
        <svg
          className="absolute inset-0 h-full w-full hidden md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {desktopCallouts.map((c) => {
            const ax = c.anchor.x;
            const ay = c.anchor.y;
            const lx = c.isRight ? ax + 5 : ax - 5;
            const ly = c.isTop ? ay + 4 : ay - 4;
            return (
              <g key={`ll-${c.id}`}>
                <line
                  x1={ax}
                  y1={ay}
                  x2={lx}
                  y2={ly}
                  stroke="#A9A9A5"
                  strokeWidth="0.4"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.6"
                />
                <circle
                  cx={c.anchor.x}
                  cy={c.anchor.y}
                  r="0.8"
                  fill="#FFC400"
                  stroke="#242426"
                  strokeWidth="0.3"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>

        {/* Callout labels — HTML overlays positioned with Tailwind.
            All four labels use their full verified terminology.
            Visible on desktop and tablet (≥768px), hidden on mobile. */}
        {desktopCallouts.map((c) => (
          <div
            key={c.id}
            className={`absolute ${c.style} hidden md:flex items-center gap-1.5 htv-step htv-step-5 rounded-sm px-1.5 py-0.5 bg-be-warm-white/85 backdrop-blur-[1px] border border-be-grey-250/60`}
          >
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0 bg-be-yellow-500"
              aria-hidden="true"
            />
            <span className="whitespace-nowrap font-semibold uppercase tracking-[0.12em] text-be-charcoal-800 text-[0.625rem]">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
