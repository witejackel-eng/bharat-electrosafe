/**
 * Leadership and company values for the About section.
 *
 * Source-of-truth rules (see docs/CONTENT_VERIFICATION.md and
 * docs/CLIENT_CONTENT_CONFIRMATION.md):
 *
 *  - The short biography is the only biography shown publicly by default.
 *    It contains only facts the client has approved for publication.
 *  - The expanded biography retains the fuller detail from the original
 *    company profile, but every figure that the spec marks as
 *    "client confirmation required" (years of experience, prior employer
 *    names, qualifications, ISO/IEC 17025 recognition, presence in 11+
 *    countries, 1,000+ customers, etc.) is flagged in
 *    docs/CLIENT_CONTENT_CONFIRMATION.md rather than asserted here as
 *    independently verified fact.
 *  - The Tata Precision relationship is not strengthened or implied to
 *    be an ownership, subsidiary or exclusive arrangement. The wording
 *    here matches the conservative public-line rule in spec section 26.
 *  - No "visionary", "distinguished", "inspirational", "accomplished
 *    entrepreneur", "global leader" or "role model" adjectives appear.
 *  - Mission, vision and values are aligned with spec section 22.
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
      'Chartered Accountant and co-founder of Bharat Electrosafe. His professional background spans finance, manufacturing and infrastructure businesses. At Bharat Electrosafe, he focuses on financial governance, compliance, manufacturing growth and the development of the company’s electrical-safety product portfolio.',
    fullProfile: [
      'Vishnu Gupta is a Chartered Accountant and co-founder of Bharat Electrosafe. His professional background spans finance, manufacturing and infrastructure businesses.',
      'At Bharat Electrosafe, he focuses on financial governance, compliance, manufacturing strategy and the development of the company’s electrical-insulating-mat portfolio. Specific prior employers, qualification year, portfolio responsibility figures and other venture affiliations recorded on the original company profile are retained in docs/CLIENT_CONTENT_CONFIRMATION.md and published only after client approval.',
      'The original company website presents Tata Precision Industries (India) Limited in connection with the electrical insulating-mat range. Current commercial wording and logo usage are subject to company confirmation and are not strengthened here.',
    ],
    imagePosition: 'center 25%',
    expertise: ['Finance', 'Compliance', 'Manufacturing', 'Business strategy'],
    leadershipFocus:
      'Directing the company’s financial governance, compliance and manufacturing scale-up.',
  },
  {
    name: 'Krishan Kumar Khandelwal',
    role: 'Co-Founder & Director',
    image: '/media/leadership/krishan-kumar-treated.webp',
    imageAlt: 'Krishan Kumar Khandelwal, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Co-founder and director of Bharat Electrosafe. He supports production coordination, vendor development, partner engagement and after-sales execution.',
    fullProfile: [
      'Krishan Kumar Khandelwal is a co-founder and director of Bharat Electrosafe. He supports production coordination, vendor development, partner engagement and after-sales execution.',
      'At Bharat Electrosafe, his responsibilities include production coordination, supplier relationships, quality follow-up and customer support. Broader experience claims recorded on the original company profile — including the number of years of experience, family-business history and real-estate project history — are retained in docs/CLIENT_CONTENT_CONFIRMATION.md and published only after client approval.',
    ],
    imagePosition: 'center 20%',
    expertise: ['Operations', 'Vendor development', 'Quality coordination', 'Customer support'],
    leadershipFocus:
      'Managing production coordination, vendor development and after-sales execution.',
  },
  {
    name: 'Priyanka Garg',
    role: 'Co-Founder & Director',
    image: '/media/leadership/priyanka-garg-treated.webp',
    imageAlt: 'Priyanka Garg, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Co-founder and director of Bharat Electrosafe with experience in rubber, polymer and industrial-product businesses. She contributes to product development, market strategy and customer growth.',
    fullProfile: [
      'Priyanka Garg is a co-founder and director of Bharat Electrosafe with experience in rubber, polymer and industrial-product businesses. She contributes to product development, market strategy and customer growth.',
      'The original company profile records more than 20 years of experience in rubber and polymer products, together with qualifications in commerce and business studies, and describes work across manufacturing, international trade, digital marketing and business automation. Retain exact qualifications, institutions, years and international-market claims only after client confirmation — they are flagged in docs/CLIENT_CONTENT_CONFIRMATION.md.',
    ],
    imagePosition: 'center 30%',
    expertise: ['Rubber and polymers', 'Product development', 'Market strategy', 'International business'],
    leadershipFocus:
      'Contributing to product development, market strategy and customer growth.',
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
