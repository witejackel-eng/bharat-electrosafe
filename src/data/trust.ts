/**
 * Verified trust content — Bharat Electrosafe.
 *
 * Single source of truth for every credibility claim on the site, together
 * with the local path to the asset that evidences it.
 *
 * Rules this file exists to enforce:
 *
 *  - Nothing is stated more strongly than bharatelectrosafe.com states it.
 *    The source site uses "ERDA approved" in one place and "ERDA / NTH
 *    tested" in another; the conservative wording is used throughout, because
 *    no approval document has been supplied that would justify the stronger
 *    claim.
 *  - A logo is evidence that a mark exists, not that every product carries
 *    every claim. Marks without a released document get a label and no
 *    download control — never an invented certificate number or expiry.
 *  - No testimonials, order values, project descriptions, factory areas,
 *    capacities or headcounts appear anywhere. None are published by the
 *    source.
 */

import { productFamilyCount } from './products';

/* ────────────────────────────────────────────
   Standards and licences
   ──────────────────────────────────────────── */

export const standards = {
  /** Insulating mats are manufactured for these requirements. */
  isMat: 'IS 15652:2006',
  /** BIS licence number, printed on the source product pages. */
  bisLicence: 'CM/L:8800129617',
  /** The mat range is marked against this IEC standard — referenced, not certified to. */
  iec: 'IEC 61111',
  /** Geo-membrane standard. */
  isMembrane: 'IS 15909:2020',
} as const;

/**
 * Short factual lines safe to render anywhere — hero trust row, product
 * badges, footer. Deliberately terse and deliberately unembellished.
 */
export const trustLines: string[] = [
  `BIS Licence ${standards.bisLicence}`,
  `Manufactured for ${standards.isMat} requirements`,
  'ERDA / NTH tested',
  `${standards.iec} referenced product range`,
];

/* ────────────────────────────────────────────
   Certifications, testing and registrations
   ──────────────────────────────────────────── */

export interface TrustMark {
  /** Accurate, specific label. Never the generic word "Certificate". */
  label: string;
  /** One line explaining what the mark actually is. */
  note: string;
  logo: string;
  alt: string;
  /** Local PDF, when the client has released one. Opens in a new tab. */
  document?: string;
}

/**
 * The compact rail shown on the homepage — six marks, each labelled for what
 * it is rather than lumped together as "certificates".
 */
export const primaryTrustMarks: TrustMark[] = [
  {
    label: 'BIS licence',
    note: `Licence ${standards.bisLicence} against ${standards.isMat}`,
    logo: '/media/certifications/bis.webp',
    alt: 'Bureau of Indian Standards mark',
  },
  {
    label: 'ISI mark',
    note: 'ISI marking applied to the insulating mat range',
    logo: '/media/certifications/isi.webp',
    alt: 'ISI standard mark',
  },
  {
    label: 'ERDA testing',
    note: 'Insulating mats tested through ERDA documentation',
    logo: '/media/certifications/erda.webp',
    alt: 'Electrical Research and Development Association mark',
    document: '/documents/certifications/erda-test-report-2-5mm.pdf',
  },
  {
    label: 'NTH testing',
    note: 'National Test House testing referenced by the company',
    logo: '/media/certifications/nth.webp',
    alt: 'National Test House mark',
  },
  {
    label: 'ISO 9001:2015',
    note: 'Quality Management System certification',
    logo: '/media/certifications/iso.webp',
    alt: 'ISO 9001 certification mark',
    document: '/documents/certifications/iso-9001-2015-qms.pdf',
  },
  {
    label: 'CE mark',
    note: 'CE marking certificate held by the company',
    logo: '/media/certifications/ce.webp',
    alt: 'CE conformity mark',
    document: '/documents/certifications/ce-marking-certificate.pdf',
  },
];

/**
 * The full set shown on the About page. Same marks as the source site's
 * "Industry Certifications and Memberships" rail, plus the registrations it
 * lists alongside them.
 */
export const allTrustMarks: TrustMark[] = [
  ...primaryTrustMarks,
  {
    label: 'ISO 14001:2015',
    note: 'Environmental Management System certification',
    logo: '/media/certifications/iso-1400.webp',
    alt: 'ISO 14001 certification mark',
    document: '/documents/certifications/iso-14001-2015-ems.pdf',
  },
  {
    label: 'ISO 45001:2018',
    note: 'Occupational Health and Safety Management System certification',
    logo: '/media/certifications/iso-4500.webp',
    alt: 'ISO 45001 certification mark',
    document: '/documents/certifications/iso-45001-2018-ohsms.pdf',
  },
  {
    label: 'MSME registration',
    note: 'Registered under the Ministry of Micro, Small and Medium Enterprises',
    logo: '/media/certifications/msme.webp',
    alt: 'MSME registration mark',
  },
  {
    label: 'Startup India recognition',
    note: 'Recognised under the Startup India initiative',
    logo: '/media/certifications/startupindia.webp',
    alt: 'Startup India recognition mark',
    document: '/documents/certifications/startup-india-recognition.pdf',
  },
  {
    label: 'AIRIA membership',
    note: 'Member of the All India Rubber Industries Association',
    logo: '/media/certifications/airia.webp',
    alt: 'All India Rubber Industries Association mark',
  },
];

/* ────────────────────────────────────────────
   Awards
   ──────────────────────────────────────────── */

export interface Award {
  title: string;
  presenter: string;
  detail: string;
  image: string;
  alt: string;
  /** Plaques are contained so the engraved text is never cropped; event
   *  photographs fill their frame. */
  fit?: 'cover' | 'contain';
}

/**
 * Recognition the company can evidence. Titles are verbatim from the award
 * itself — nothing is upgraded in wording.
 *
 * The third entry is an exhibitor appreciation, not a competitive award, and
 * is described as one. Two further items are legible only inside the grouped
 * trophy photograph (India Rubber & Tyre Show 2025 bronze sponsor, 12th India
 * Industrial Fair 2025 exhibitor); with no standalone image of either they are
 * left out rather than illustrated with a crop.
 */
export const awards: Award[] = [
  {
    title: 'Emerging Business in India',
    presenter: 'Make in India Conclave, organised by ABP News',
    detail:
      'Received by Co-Founder & Director Vishnu Gupta, presented by Shri Chirag Paswan, Honourable Cabinet Minister.',
    image: '/media/awards/award-01.webp',
    alt: 'Vishnu Gupta receiving the Emerging Business in India award at the Make in India Conclave',
    fit: 'cover',
  },
  {
    title: 'Young Entrepreneur with Emerging Start-Up',
    presenter: 'Times Power Icons Awards, presented by the Times Group',
    detail: 'Received by Co-Founder & Director Vishnu Gupta.',
    image: '/media/awards/award-02.webp',
    alt: 'Vishnu Gupta receiving the Young Entrepreneur with Emerging Start-Up award at the Times Power Icons Awards',
    fit: 'cover',
  },
  {
    title: 'Exhibitor appreciation — PlastIndia 2026',
    presenter: 'PlastIndia Foundation',
    detail:
      'Presented to Bharatelectrosafe Pvt. Ltd. for participation as an exhibitor at PlastIndia 2026, Bharat Mandapam, New Delhi.',
    image: '/media/awards/photo-03.webp',
    alt: 'PlastIndia Foundation plaque presented to Bharatelectrosafe Pvt. Ltd. for exhibiting at PlastIndia 2026',
    fit: 'contain',
  },
];

/* ────────────────────────────────────────────
   Organisation references
   ──────────────────────────────────────────── */

export interface OrganisationLogo {
  name: string;
  logo: string;
}

/**
 * Presented as references, not as confirmed direct customers — the source
 * site shows these logos but publishes nothing that establishes the nature of
 * each relationship.
 */
export const organisationReferences: OrganisationLogo[] = [
  { name: 'NTPC', logo: '/media/clients/ntpc.webp' },
  { name: 'BHEL', logo: '/media/clients/bhel.webp' },
  { name: 'ONGC', logo: '/media/clients/ongc.webp' },
  { name: 'Power Grid', logo: '/media/clients/power-grid.webp' },
  { name: 'JK Tyre', logo: '/media/clients/jk-tyre.webp' },
  { name: 'PTCUL', logo: '/media/clients/ptcul.webp' },
  { name: 'Indian Oil', logo: '/media/clients/indian-oil.webp' },
  { name: 'SAIL', logo: '/media/clients/sail.webp' },
];

export const organisationReferenceHeading = 'Industry references';
/** Eyebrow shown above the section heading. */
export const organisationReferenceEyebrow = 'INDUSTRY REFERENCES';
/** Section heading — describes coverage without claiming every organisation
 *  is a current client (a claim the source site does not substantiate). */
export const organisationReferenceTitle =
  'Organisations represented across critical industries';
export const organisationReferenceNote =
  'Organisations presented on Bharat Electrosafe\u2019s original company website.';
/** Compact CTA label for the About Us link. */
export const organisationReferenceCtaLabel = 'View awards and leadership';

/* ────────────────────────────────────────────
   Company scale
   ──────────────────────────────────────────── */

/**
 * Wording is fixed to the source About page. "Customers stated by the
 * company" is not clumsiness — it is the qualifier that keeps a company
 * self-statement from reading as an independently verified figure.
 *
 * `shortLabel` is the compact label used inside the homepage statistic cards
 * — the "company-stated" qualifier is moved to a footnote so the cards stay
 * scannable without losing the conservative wording.
 */
export const scaleFacts = [
  {
    value: '11+',
    label: 'Countries served (company-stated)',
    shortLabel: 'Countries served',
    companyStated: true,
  },
  {
    value: '1,000+',
    label: 'Customers stated by the company',
    shortLabel: 'Customers',
    companyStated: true,
  },
  {
    value: String(productFamilyCount),
    label: 'Product families',
    shortLabel: 'Product families',
    companyStated: false,
  },
] as const;

/* ────────────────────────────────────────────
   Manufacturing and capability
   ──────────────────────────────────────────── */

/** Condensed from the source site's "Why Choose Us" list. Nothing added. */
export const capabilityPoints = [
  {
    title: 'Insulating-mat compound and product manufacturing',
    description:
      'An integrated production setup running from compound manufacturing through to the finished insulating mat.',
  },
  {
    title: 'Class A, B and C product configurations',
    description:
      'Production configurations covering Class A (3.3 kV), Class B (11 kV) and Class C (33 kV) insulating mats.',
  },
  {
    title: 'Anti-skid surface options',
    description:
      'Coin, dot and hexa-pattern surface configurations.',
  },
  {
    title: 'Visible-safety variants',
    description:
      'Coloured-strip, bi-color and auto-glow / reflective band variants on the standard insulating-mat platform.',
  },
  {
    title: 'Project-specific dimensions',
    description:
      'Standard rolls and project-specific lengths quoted against the enquiry.',
  },
  {
    title: 'Product documentation and enquiry support',
    description:
      'Available documentation is confirmed for the selected product during quotation.',
  },
] as const;

/** Sectors the source About page names. */
export const industriesServed = [
  'Power utilities',
  'Railways',
  'Oil and gas',
  'Construction',
  'Infrastructure',
  'Heavy industry',
] as const;

/** Manufacturing collaboration — placeholder only; not rendered on public pages.
 *  Tata Precision branding removed per client directive. */
export const manufacturingCollaboration = {
  partner: '',
  statement: '',
  logo: '',
  alt: '',
};

export const manufacturingImage = {
  src: '/media/manufacturing/production-line.webp',
  alt: 'Insulating mat production line inside the Bharat Electrosafe manufacturing setup',
};

/* ────────────────────────────────────────────
   Client-provided company statistics
   ────────────────────────────────────────────
   Display statistics for the homepage credibility strip.
   These are CLIENT-PROVIDED display figures, not independently
   verified. Do not inject these into structured data as verified
   statistics. */

export interface CompanyStatistic {
  value: string;
  label: string;
  icon: string;
}

export const companyStatistics: CompanyStatistic[] = [
  { value: '9+', label: 'Years of Business', icon: 'calendar' },
  { value: '37+', label: 'Countries Exported', icon: 'globe' },
  { value: '2,380+', label: 'Happy Customers', icon: 'users' },
  { value: '6,832+', label: 'Successful Projects', icon: 'check' },
] as const;
