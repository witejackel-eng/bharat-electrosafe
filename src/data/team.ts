/**
 * Leadership and company values for the About section.
 *
 * This file contains only finished, public-facing copy. Internal
 * verification notes, source commentary, client-confirmation
 * questions and unverified figures live ONLY in
 * `docs/CONTENT_VERIFICATION.md` and
 * `docs/CLIENT_CONTENT_CONFIRMATION.md` — never here.
 *
 * Public-content rules:
 *  - Short biography: standalone intro, no repetition with the
 *    expanded paragraph.
 *  - Expanded biography: a single concise role paragraph that adds
 *    new information (no repeated sentences, no disclaimers, no
 *    source-document references).
 *  - No "visionary", "distinguished", "inspirational", "accomplished
 *    entrepreneur", "global leader", "role model" or similar
 *    exaggerated adjectives.
 *  - No Tata Precision commentary inside any biography.
 *  - No unconfirmed figures (years of experience, prior employers,
 *    qualifications, institutions, export countries, customer counts).
 *  - Sentence case throughout.
 */

export interface Leader {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  shortBio: string;
  /** Multi-paragraph biography, split at logical sentence boundaries. */
  fullProfile: string[];
  /** Per-portrait CSS object-position value (e.g. "center 25%"). */
  imagePosition?: string;
  /** 2–4 concise factual expertise labels derived from the biography. */
  expertise?: string[];
  /** A short, approved statement of the leader’s current focus. */
  leadershipFocus?: string;
}

export const leaders: Leader[] = [
  {
    name: 'Vishnu Gupta',
    role: 'Co-Founder & Director',
    image: '/media/leadership/vishnu-gupta-treated.webp',
    imageAlt: 'Vishnu Gupta, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Vishnu Gupta is a Chartered Accountant and co-founder and director of Bharat Electrosafe. His professional background spans finance, manufacturing and infrastructure businesses.',
    fullProfile: [
      'At Bharat Electrosafe, he guides financial governance, regulatory compliance, manufacturing strategy and long-term business development. His work brings commercial discipline to the company’s growth while supporting stronger processes, documentation and customer delivery.',
    ],
    imagePosition: 'center 25%',
    expertise: ['Financial governance', 'Compliance', 'Manufacturing strategy', 'Business development'],
    leadershipFocus:
      'Financial governance, compliance and manufacturing strategy.',
  },
  {
    name: 'Krishan Kumar Khandelwal',
    role: 'Co-Founder & Director',
    image: '/media/leadership/krishan-kumar-treated.webp',
    imageAlt: 'Krishan Kumar Khandelwal, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Krishan Kumar Khandelwal is a co-founder and director of Bharat Electrosafe with experience in manufacturing and business operations.',
    fullProfile: [
      'He focuses on production coordination, vendor development, partner engagement, quality follow-up and after-sales support. His operational approach helps align product requirements, supplier coordination and customer commitments from enquiry through delivery.',
    ],
    imagePosition: 'center 20%',
    expertise: ['Operations', 'Vendor development', 'Quality coordination', 'Customer support'],
    leadershipFocus:
      'Production coordination, vendor development and after-sales execution.',
  },
  {
    name: 'Priyanka Garg',
    role: 'Co-Founder & Director',
    image: '/media/leadership/priyanka-garg-treated.webp',
    imageAlt: 'Priyanka Garg, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Priyanka Garg is a co-founder and director of Bharat Electrosafe with experience in rubber, polymer and industrial-product businesses.',
    fullProfile: [
      'She contributes to product development, market strategy, customer engagement and business growth. Her understanding of polymer products and market development supports the company’s product positioning and expansion into new industrial and civil-engineering applications.',
    ],
    imagePosition: 'center 30%',
    expertise: ['Rubber and polymer products', 'Product development', 'Market strategy', 'Customer growth'],
    leadershipFocus:
      'Product development, market strategy and customer growth.',
  },
];

export interface Value {
  title: string;
  description: string;
}

/** Mission, vision and values, aligned with spec section 22. */
export const companyValues: Value[] = [
  {
    title: 'Mission',
    description:
      'To support safer electrical and civil-engineering environments through clearly specified products, dependable documentation and responsive technical support.',
  },
  {
    title: 'Vision',
    description:
      'To build long-term trust by supplying consistent electrical-insulation and civil-protection products for demanding industrial applications.',
  },
  {
    title: 'Quality',
    description:
      'Maintain consistency in product specification, documentation and delivery.',
  },
  {
    title: 'Responsibility',
    description:
      'Make careful claims, communicate limitations and support informed product selection.',
  },
  {
    title: 'Customer Focus',
    description:
      'Understand the application before recommending a configuration.',
  },
  {
    title: 'Continuous Improvement',
    description:
      'Improve products, processes and customer support through practical learning and feedback.',
  },
  {
    title: 'Teamwork',
    description:
      'Coordinate manufacturing, quality, sales and support around the customer’s requirement.',
  },
];
