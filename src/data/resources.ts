export interface Resource {
  id: string;
  title: string;
  type: 'Technical Brief' | 'Datasheet' | 'Selection Guide' | 'Case Study' | 'Standard Reference';
  description: string;
  fileType: string;
  fileSize: string;
  pages: number;
  category: 'Electrical' | 'Civil' | 'Quality' | 'Company';
}

export const resources: Resource[] = [
  {
    id: 'selection-guide-mats',
    title: 'Insulating Mat Selection Guide',
    type: 'Selection Guide',
    description:
      'How to choose the correct Class (A / B / C) and thickness based on the highest operating voltage in your installation.',
    fileType: 'PDF',
    fileSize: '1.4 MB',
    pages: 8,
    category: 'Electrical',
  },
  {
    id: 'is-15652-summary',
    title: 'IS 15652 Standard Summary',
    type: 'Standard Reference',
    description:
      'Plain-language summary of the Indian Standard for insulating mats for electrical purposes — including test voltages and classifications.',
    fileType: 'PDF',
    fileSize: '0.9 MB',
    pages: 6,
    category: 'Quality',
  },
  {
    id: 'substation-case-study',
    title: '33 kV Substation Mat Installation — Case Study',
    type: 'Case Study',
    description:
      'Field installation of Class C insulating mats across a 33/11 kV substation for a state transmission utility.',
    fileType: 'PDF',
    fileSize: '2.1 MB',
    pages: 4,
    category: 'Electrical',
  },
  {
    id: 'geomembrane-datasheet',
    title: 'BharatMembrane Datasheet',
    type: 'Datasheet',
    description:
      'Material specifications, roll sizes, seam-welding guidance and chemical resistance for HDPE geomembranes.',
    fileType: 'PDF',
    fileSize: '1.6 MB',
    pages: 5,
    category: 'Civil',
  },
  {
    id: 'waterstop-brief',
    title: 'Water-Stop System Technical Brief',
    type: 'Technical Brief',
    description:
      'PVC water-stop profiles, installation in construction joints and performance in below-grade civil structures.',
    fileType: 'PDF',
    fileSize: '1.1 MB',
    pages: 7,
    category: 'Civil',
  },
  {
    id: 'traceability-brief',
    title: 'Product Traceability & Marking Brief',
    type: 'Technical Brief',
    description:
      'How each mat is permanently marked for batch, class, standard and BIS licence — and why it matters for procurement audits.',
    fileType: 'PDF',
    fileSize: '0.7 MB',
    pages: 3,
    category: 'Quality',
  },
];
