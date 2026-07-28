/**
 * Leadership and company values for the About section.
 *
 * Names, titles and biographical facts are taken from the leadership section
 * of bharatelectrosafe.com. Portraits are matched to people by the `alt`
 * attributes on the client's own leadership markup, not by filename order.
 *
 * Biographies are condensed for the redesigned interface but nothing is
 * added: no qualification, employer, figure or achievement appears here that
 * the source does not state.
 *
 * `fullProfile` is stored as an array of paragraphs so the component can
 * render them with natural spacing without re-splitting on every render.
 * The words are unchanged from the verified source content — only the
 * paragraph boundaries were added for readability.
 *
 * `imagePosition` sets the CSS `object-position` per portrait so faces stay
 * visible without cropping. Each value is chosen for the specific photograph.
 *
 * `expertise` is a short list of factual labels drawn strictly from the
 * biography text — no invented expertise.
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
  /** 2–3 concise factual expertise labels derived from the biography. */
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
      'Chartered Accountant and entrepreneur leading Bharat Electrosafe’s manufacturing and compliance direction.',
    fullProfile: [
      'CA. Vishnu Gupta is a Chartered Accountant (ICAI, 2005) with over 18 years of leadership experience across finance, manufacturing and infrastructure.',
      'As Co-Founder & Director he has led Bharat Electrosafe to become a nationally trusted manufacturer of IS 15652 and IEC 61111 compliant high-voltage insulating mats, marketed through Tata Precision Industries (India) Ltd. He previously held financial leadership roles at Universal Cables Ltd. (MP Birla Group), GHCL Ltd. and Cavendish Industries Ltd. (JK Tyre Group).',
      'He is also Co-Founder of Samridhi Test House Pvt. Ltd., an ISO/IEC 17025-accredited and BIS-recognised testing laboratory.',
    ],
    imagePosition: 'center 25%',
    expertise: ['Finance', 'Manufacturing', 'Compliance'],
    leadershipFocus: 'Directing the company’s financial governance, BIS compliance and manufacturing scale-up.',
  },
  {
    name: 'Krishan Kumar Khandelwal',
    role: 'Co-Founder & Director',
    image: '/media/leadership/krishan-kumar-treated.webp',
    imageAlt: 'Krishan Kumar Khandelwal, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Business strategist overseeing production, quality assurance and partner engagement.',
    fullProfile: [
      'Mr. Krishan Kumar Khandelwal is an entrepreneur and business strategist with over 25 years across manufacturing, trading, real estate, infrastructure and customer relations.',
      'As Co-Founder & Director he oversees operations, quality assurance and partner engagement at Bharat Electrosafe, managing production, vendor development and after-sales coordination. He comes from a business family with a legacy of more than 70 years in the tobacco and sweet supari industry, a background that shaped his approach to supply chain management and long-term customer relationships.',
      'His collaborative work supported the company’s tie-up with Tata Precision Industries (India) Ltd.',
    ],
    imagePosition: 'center 20%',
    expertise: ['Operations', 'Quality assurance', 'Partner engagement'],
    leadershipFocus: 'Managing production, vendor development and after-sales coordination.',
  },
  {
    name: 'Priyanka Garg',
    role: 'Entrepreneur | Co-Founder & Director',
    image: '/media/leadership/priyanka-garg-treated.webp',
    imageAlt: 'Priyanka Garg, Entrepreneur, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Rubber and polymer industry leader directing strategy, exports and international trade.',
    fullProfile: [
      'Mrs. Priyanka Garg brings over 20 years of experience in the rubber and polymer industry, and as Co-Founder and Director has shaped Bharat Electrosafe’s development into a global supplier and exporter of industrial and commercial products, particularly electrical insulating mats.',
      'She holds an M.Com from Agra University and a business certification from UP Technical University. Her proficiencies span insulating mats, silicone rubber sheets, EPDM membranes, and PVC and rubber compounds, extending beyond manufacturing into consulting, quality testing and international trade facilitation.',
      'Under her leadership the company reports a presence in 11+ countries.',
    ],
    imagePosition: 'center 30%',
    expertise: ['Polymer industry', 'Exports', 'International trade'],
    leadershipFocus: 'Driving the company’s export growth and international trade development.',
  },
];

export interface Value {
  title: string;
  description: string;
}

/** Vision, mission and the four values, worded as the source About page words them. */
export const companyValues: Value[] = [
  {
    title: 'Vision',
    description:
      'To be the most trusted name in electrical safety by delivering world-class insulating products that help businesses create secure and compliant workspaces.',
  },
  {
    title: 'Mission',
    description:
      'To safeguard lives and assets by providing superior electrical insulation solutions that adhere to the highest quality and safety standards.',
  },
  {
    title: 'Respect',
    description: 'Thoughtful of showing regard for another person.',
  },
  {
    title: 'Trust',
    description: 'Our integrity speaks through consistent actions and reliable results.',
  },
  {
    title: 'Ownership',
    description: 'We lead from within, taking charge of outcomes with pride and purpose.',
  },
  {
    title: 'Integrated Team Work',
    description: 'United in mission, seamless in execution — we move forward together.',
  },
];
