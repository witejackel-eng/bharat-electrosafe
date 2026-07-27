/**
 * Leadership and company values for the About section.
 *
 * Biographies are kept concise and source-derived. No invented employers,
 * awards, founding year or timeline.
 */

export interface Leader {
  name: string;
  role: string;
  shortBio: string;
  fullProfile: string;
  imagePath: string;
}

export const leaders: Leader[] = [
  {
    name: 'Vishnu Gupta',
    role: 'Co-Founder & Director',
    shortBio:
      'Leads Bharat Electrosafe with a focus on electrical-safety manufacturing and engineered product quality.',
    fullProfile:
      "Vishnu Gupta co-founded Bharat Electrosafe to deliver IS 15652:2006 certified electrical insulating mats and engineered PVC membranes to industrial and civil sectors. He oversees manufacturing standards, regulatory compliance and the company's relationships across India and overseas markets, ensuring every product meets the certified electrical and environmental specifications it carries.",
    imagePath: '/media/leadership/vishnu-gupta.webp',
  },
  {
    name: 'Krishan Kumar Khandelwal',
    role: 'Co-Founder & Director',
    shortBio:
      'Directs operations and product engineering across the insulating-mat and membrane divisions.',
    fullProfile:
      "Krishan Kumar Khandelwal is responsible for the operational and engineering direction of Bharat Electrosafe. His work covers production planning, quality assurance against IS 15652:2006 and IS 15909:2020 standards, and the delivery of the company's five product families to customers across India and abroad.",
    imagePath: '/media/leadership/krishan-kumar.webp',
  },
  {
    name: 'Priyanka Garg',
    role: 'Entrepreneur | Co-Founder & Director',
    shortBio:
      'Leads commercial operations, customer engagement and export coordination.',
    fullProfile:
      'Priyanka Garg directs the commercial side of Bharat Electrosafe, including customer engagement, enquiry handling and coordination of deliveries to the markets the company serves. She ensures that customer requirements for the five product families are matched to the correct insulation class, membrane type and application.',
    imagePath: '/media/leadership/priyanka-garg.webp',
  },
];

export interface Value {
  title: string;
  description: string;
}

export const companyValues: Value[] = [
  {
    title: 'Vision',
    description:
      'To be the trusted manufacturer of electrical insulating mats and engineered membranes, protecting people and infrastructure across India and overseas.',
  },
  {
    title: 'Mission',
    description:
      'To manufacture certified safety products to the correct standards, deliver them reliably, and support every customer with accurate technical information.',
  },
  {
    title: 'Respect',
    description:
      'We treat customers, colleagues and partners with respect, and we respect the standards we are certified against.',
  },
  {
    title: 'Trust',
    description:
      'We earn trust by publishing only verified specifications and by standing behind the certifications our products carry.',
  },
  {
    title: 'Ownership',
    description:
      'Every team member owns the quality of their work, from raw material to finished roll, from enquiry to delivery.',
  },
  {
    title: 'Integrated Team Work',
    description:
      'Manufacturing, engineering and commercial teams work as one integrated unit to deliver the five product families on time and to standard.',
  },
];
