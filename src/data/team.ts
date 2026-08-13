/**
 * Leadership and company values for the About section.
 *
 * Leadership biographies are factual, simple-English summaries based only on
 * facts already present in the company's source material. Each biography is
 * approximately 100–140 words, free of generic praise and corporate
 * superlatives.
 *
 * Public references to Tata Precision Industries (India) Ltd. have been
 * removed from the biographies because the current status of that relationship
 * has not been reconfirmed. They are not replaced with another partnership
 * claim.
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
}

export const leaders: Leader[] = [
  {
    name: 'Vishnu Gupta',
    role: 'Co-Founder & Director',
    image: '/media/leadership/vishnu-gupta-treated.webp',
    imageAlt: 'Vishnu Gupta, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Chartered Accountant with more than 18 years of experience across finance, manufacturing and infrastructure.',
    fullProfile: [
      'Vishnu Gupta is a Chartered Accountant, qualified through ICAI in 2005, with more than 18 years of experience across finance, manufacturing and infrastructure. As Co-Founder and Director of Bharat Electrosafe, he works on business operations, compliance and the development of electrical safety products.',
      'Before his entrepreneurial work, he held finance and business roles at Universal Cables Ltd. (MP Birla Group), GHCL Ltd. and Cavendish Industries Ltd. (JK Tyre Group). He is also a co-founder of Samridhi Test House Pvt. Ltd., an ISO/IEC 17025-accredited and BIS-recognized electrical and mechanical testing laboratory.',
      'He has received recognition through Times Power Icons and the Make in India Conclave organised by ABP News.',
    ],
    imagePosition: 'center 25%',
  },
  {
    name: 'Krishan Kumar',
    role: 'Co-Founder & Director',
    image: '/media/leadership/krishan-kumar-treated.webp',
    imageAlt: 'Krishan Kumar, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Business professional with more than 25 years of experience across manufacturing, trading, real estate and infrastructure.',
    fullProfile: [
      'Krishan Kumar Khandelwal has more than 25 years of business experience across manufacturing, trading, real estate and infrastructure. As Co-Founder and Director of Bharat Electrosafe, he works across operations, quality assurance, production, vendor development, partner coordination and after-sales support.',
      'His experience includes supply-chain management, customer relationships and commercial project work, including real estate development and management of commercial and residential projects. At Bharat Electrosafe, he focuses on coordinating production, suppliers and customer requirements through delivery and after-sales activity.',
      'His background in manufacturing operations, vendor management and customer coordination supports the company\'s day-to-day production and supply work across project and repeat-order requirements.',
    ],
    imagePosition: 'center 20%',
  },
  {
    name: 'Priyanka Garg',
    role: 'Co-Founder & Director',
    image: '/media/leadership/priyanka-garg-treated.webp',
    imageAlt: 'Priyanka Garg, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Business professional with more than 20 years of experience in rubber and polymer products, manufacturing and commercial operations.',
    fullProfile: [
      'Priyanka Garg has more than 20 years of experience in the rubber and polymer industry. As Co-Founder and Director of Bharat Electrosafe, her work covers electrical insulating mats, silicone rubber sheets, EPDM membranes, PVC and rubber compounds and other rubber products.',
      'She holds an M.Com from Agra University and a business certification from UP Technical University, as stated in the company\'s existing profile. Her experience also includes consulting, quality testing and international trade facilitation.',
      'At Bharat Electrosafe, she contributes product knowledge, business operations, market development and customer coordination. Her background combines practical experience in rubber and polymer products with commercial and manufacturing work.',
    ],
    imagePosition: 'center 30%',
  },
];

export interface Value {
  title: string;
  description: string;
}

/** Company values. */
export const companyValues: Value[] = [
  {
    title: 'Respect',
    description: 'Treat people, commitments and working relationships with respect.',
  },
  {
    title: 'Trust',
    description: 'Communicate clearly and follow through on commitments.',
  },
  {
    title: 'Ownership',
    description: 'Take responsibility for work, decisions and outcomes.',
  },
  {
    title: 'Teamwork',
    description: 'Work together across functions to complete commitments and solve problems.',
  },
];
