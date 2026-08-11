/**
 * Leadership and company values for the About section.
 *
 * Leadership biographies are transcribed verbatim from the client's original
 * public About page (bharatelectrosafe.com/about-us.php). Do NOT summarize,
 * paraphrase or shorten them.
 *
 * The client's Tata instruction applies to IMAGES only — Tata-containing
 * images must not be used. Textual references to Tata Precision Industries
 * in the biography are retained as they appear in the original public content.
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
      'CA. Vishnu Gupta is a seasoned Chartered Accountant (ICAI, 2005) and accomplished entrepreneur with over 18 years of leadership experience in finance, manufacturing, and infrastructure.',
    fullProfile: [
      'CA. Vishnu Gupta is a seasoned Chartered Accountant (ICAI, 2005) and accomplished entrepreneur with over 18 years of leadership experience in finance, manufacturing, and infrastructure. As the Co-founder & Director of Bharat Electrosafe, he brings vision, operational expertise, and a deep commitment to advancing electrical safety across India.',
      'Under his leadership, Bharat Electrosafe has become a nationally trusted manufacturer of IS 15652 and IEC 61111 compliant high-voltage electrical insulating mats, proudly marketed through Tata Precision Industries (India) Ltd. The company\'s products are ERDA-tested, BIS-certified, and widely used by major government and private institutions across power generation, distribution, and industrial sectors.',
      'Prior to his entrepreneurial journey, CA. Gupta held key financial leadership roles at reputed corporates such as Universal Cables Ltd. (MP Birla Group), GHCL Ltd., and Cavendish Industries Ltd. (JK Tyre Group), overseeing business operations and finance for portfolios valued at ₹1,500–3,000 Cr. He is also the Co-founder of Samridhi Test House Pvt. Ltd., an ISO/IEC 17025-accredited and BIS-recognized electrical and mechanical testing laboratory, in addition to leading ventures like Insulaticaa Polyplast, VKI Business World Ahead, and Dwarikadheesh Engineering Infra.',
      'CA. Vishnu Gupta has been recognized for his entrepreneurial excellence with the following prestigious awards:',
      '• Young Entrepreneur with Emerging Start-Up by Times Power Icons',
      '• Make in India Award by ABP News, presented by Shri Chirag Paswan, Hon\'ble Cabinet Minister of Food Processing Industries',
      'Committed to the vision of "Vocal for Local" and Atmanirbhar Bharat, CA. Vishnu Gupta continues to drive innovation, compliance, and excellence across India\'s safety and infrastructure ecosystem.',
    ],
    imagePosition: 'center 25%',
  },
  {
    name: 'Krishan Kumar',
    role: 'Co-Founder & Director',
    image: '/media/leadership/krishan-kumar-treated.webp',
    imageAlt: 'Krishan Kumar, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'Mr. Krishan Kumar Khandelwal is a seasoned entrepreneur and business strategist with over 25 years of experience spanning manufacturing, trading, real estate and infrastructure.',
    fullProfile: [
      'Mr. Krishan Kumar Khandelwal is a seasoned entrepreneur and business strategist with a diverse background spanning over 25 years, marked by excellence in manufacturing, trading, real estate and infrastructure, and customer relations. As the Co-founder & Director of Bharat Electrosafe, he plays a key role in overseeing operations, quality assurance, and partner engagement, while driving the company\'s mission of delivering reliable, certified electrical safety solutions across India.',
      'He hails from a reputed business family with a strong legacy of over 70 years in the Tobacco and Sweet supari industry, known for their ethical practices, deep market reach, and longstanding customer trust. This background has endowed him with a strong foundation in supply chain management, customer relationship building, and traditional enterprise values.',
      'In addition to his contribution to Bharat Electrosafe, Mr. Khandelwal has also demonstrated excellence in real estate development and management, where he has successfully led multiple commercial and residential projects with a focus on transparency, long-term value, and client satisfaction.',
      'At Bharat Electrosafe, he brings together his diverse expertise to manage production, vendor development, and after-sales coordination, ensuring customer-focused execution at every level. His collaborative approach has also supported the company\'s strategic tie-up with Tata Precision Industries (India) Ltd., strengthening market presence and brand credibility.',
      'With a vision rooted in "Make in India", Mr. Krishan Kumar Khandelwal continues to contribute to Bharat Electrosafe\'s journey toward becoming a nationally respected leader in the field of electrical safety and infrastructure protection.',
    ],
    imagePosition: 'center 20%',
  },
  {
    name: 'Priyanka Garg',
    role: 'Entrepreneur | Co-founder & Director',
    image: '/media/leadership/priyanka-garg-treated.webp',
    imageAlt: 'Priyanka Garg, Co-Founder and Director of Bharat Electrosafe',
    shortBio:
      'A visionary entrepreneur with over 20 years of experience in the rubber and polymer industry, known for strategic direction, innovation, and operational excellence.',
    fullProfile: [
      'A visionary entrepreneur with over 20 years of experience in the rubber and polymer industry, Mrs. Priyanka Garg stands out as a distinguished leader known for her strategic direction, innovation, and operational excellence. As Co-founder and Director of Bharat Electrosafe, she has been instrumental in shaping the company\'s journey into a leading global supplier and exporter of industrial and commercial products, especially electrical insulating mats.',
      'Armed with an M.Com from Agra University and a Business Certification from UP Technical University, she combines academic expertise with hands-on industry insight. Her core proficiencies include electrical insulating mats, silicone rubber sheets, EPDM membranes, PVC and rubber compounds, and a wide array of advanced rubber products.',
      'As a serial entrepreneur, her journey extends beyond manufacturing to include consulting, quality testing, and international trade facilitation. Her holistic approach to business — grounded in technical skill, financial insight, and deep market understanding — has propelled her ventures to thrive both in India and abroad.',
      'Under her visionary leadership, Bharat Electrosafe has established its presence in 11+ countries, serving a global network of over 1,000 satisfied customers. Her entrepreneurial acumen is matched by her commitment to ethical business practices, customer satisfaction, and value-driven growth.',
      'In addition to her core business strengths, Mrs. Garg is highly proficient in digital marketing and business automation, effectively utilizing platforms like YouTube, targeted email campaigns, and Zoho CRM to enhance brand visibility and drive scalable sales. Her passion for innovation, dedication to excellence, and customer-focused mindset make her not only a successful entrepreneur but also a respected role model and inspirational leader in the rubber and polymer industry.',
    ],
    imagePosition: 'center 30%',
  },
];

export interface Value {
  title: string;
  description: string;
}

/** Company values — from original public About page. */
export const companyValues: Value[] = [
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
