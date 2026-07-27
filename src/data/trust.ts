/**
 * Trust and credibility data for Bharat Electrosafe.
 *
 * Certification marks, awards and client references — all source-supported.
 */

export interface TrustMark {
  name: string;
  label: string;
  imagePath: string;
  pdfPath?: string;
}

export interface Award {
  title: string;
  context: string;
  associatedPerson: string;
  imagePath: string;
}

export interface OrganisationRef {
  name: string;
  imagePath: string;
}

export const trustMarks: TrustMark[] = [
  { name: 'BIS', label: 'BIS licence', imagePath: '/media/certifications/bis.webp' },
  { name: 'MSME', label: 'MSME registration', imagePath: '/media/certifications/msme.webp' },
  { name: 'ISI', label: 'ISI mark', imagePath: '/media/certifications/isi.webp' },
  { name: 'NTH', label: 'NTH testing', imagePath: '/media/certifications/nth.webp' },
  { name: 'CE', label: 'CE mark', imagePath: '/media/certifications/ce.webp' },
  { name: 'ISO', label: 'ISO 9001:2015', imagePath: '/media/certifications/iso.webp' },
];

export const awards: Award[] = [
  {
    title: 'Emerging Business in India',
    context: 'Make in India Conclave, organised by ABP News. Presented by Shri Chirag Paswan.',
    associatedPerson: 'Vishnu Gupta',
    imagePath: '/media/awards/award-01.webp',
  },
  {
    title: 'Young Entrepreneur with Emerging Start-Up',
    context: 'Times Power Icons Awards, presented by the Times Group.',
    associatedPerson: 'Vishnu Gupta',
    imagePath: '/media/awards/award-02.webp',
  },
];

export const organisationRefs: OrganisationRef[] = [
  { name: 'NTPC', imagePath: '/media/clients/ntpc.webp' },
  { name: 'BHEL', imagePath: '/media/clients/bhel.webp' },
  { name: 'ONGC', imagePath: '/media/clients/ongc.webp' },
  { name: 'Power Grid', imagePath: '/media/clients/power-grid.webp' },
  { name: 'JK Tyre', imagePath: '/media/clients/jk-tyre.webp' },
  { name: 'PTCUL', imagePath: '/media/clients/ptcul.webp' },
  { name: 'Indian Oil', imagePath: '/media/clients/indian-oil.webp' },
  { name: 'SAIL', imagePath: '/media/clients/sail.webp' },
];
