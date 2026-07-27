export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  abbreviation: string;
  sector: string;
  projectContext: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    quote:
      'The Class C mats supplied for our 33 kV substation upgrade were delivered on schedule with full BIS documentation. The traceability markings made our internal audit straightforward.',
    author: 'Rajesh Kumar',
    role: 'General Manager — Electrical Maintenance',
    organization: 'State Transmission Utility',
    abbreviation: 'STU',
    sector: 'Power Transmission',
    projectContext: '33/11 kV substation upgrade · 1,200 sq m coverage',
    rating: 5,
  },
  {
    id: 't-2',
    quote:
      'We needed a colour-coded visible safety variant that would survive platform traffic. The strip mats have held up through two monsoons with no delamination. Good technical support during selection.',
    author: 'Anita Deshpande',
    role: 'Deputy Chief Engineer',
    organization: 'Metro Rail Corporation',
    abbreviation: 'MRC',
    sector: 'Railway & Metro',
    projectContext: 'Platform-edge safety mats · 14 stations',
    rating: 5,
  },
  {
    id: 't-3',
    quote:
      'BharatMembrane was specified for our effluent pond lining. Seam welding was done on-site under their supervision. No leakage detected in the post-installation survey two years on.',
    author: 'Sundeep Iyer',
    role: 'Project Director — Civil',
    organization: 'Industrial Infrastructure Ltd.',
    abbreviation: 'IIL',
    sector: 'Civil Infrastructure',
    projectContext: 'HDPE geomembrane lining · 8,500 sq m',
    rating: 5,
  },
  {
    id: 't-4',
    quote:
      'Their team helped us pick the right class for our control room floors. What stood out was the consistent marking — every roll was identifiable. Made our QA paperwork much cleaner.',
    author: 'Meera Krishnan',
    role: 'Senior Engineer — Procurement',
    organization: 'Heavy Engineering Works',
    abbreviation: 'HEW',
    sector: 'Heavy Engineering',
    projectContext: 'Control room insulation · 6 panels',
    rating: 4,
  },
  {
    id: 't-5',
    quote:
      'Water-stop profiles arrived cut to our construction-joint drawings. Installation was clean. Their brief on joint design was clearer than what we usually get from suppliers.',
    author: 'Vikas Rao',
    role: 'Site In-charge',
    organization: 'National Construction Authority',
    abbreviation: 'NCA',
    sector: 'Construction',
    projectContext: 'Below-grade water-stop · 320 m joints',
    rating: 5,
  },
];
