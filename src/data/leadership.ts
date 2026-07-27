/* ────────────────────────────────────────────────────────────────
   Leadership

   Names, designations, portraits and biographies are transcribed from
   the client's own leadership-team-2.php. Portrait filenames map to
   people via the alt attributes in that markup (VG-1 = Vishnu Gupta,
   KK-1 = Krishan Kumar, PG-1 = Priyanka Garg) — not inferred from
   initials or from the photographs themselves.

   Open point: the Make in India certificate names the third director
   "Priyanka Poddar" while the website says "Priyanka Garg". The website
   spelling is used here because it is the client's own current public
   wording. See docs/CLIENT_VERIFICATION_REQUIRED.md.

   `approved` gates public rendering. Anything false is not displayed.
   ──────────────────────────────────────────────────────────────── */

export interface LeadershipProfile {
  id: string;
  name: string;
  designation: string;
  /** Card-length summary. */
  summary: string;
  /** Longer biography, shown in a disclosure. Each entry is one paragraph. */
  biography: string[];
  portrait?: string;
  portraitAlt?: string;
  /** False keeps the profile out of the rendered page entirely. */
  approved: boolean;
}

export const leadership: LeadershipProfile[] = [
  {
    id: "vishnu-gupta",
    name: "Vishnu Gupta",
    designation: "Co-Founder & Director",
    summary:
      "Chartered Accountant (ICAI, 2005) with over 18 years in finance, manufacturing and infrastructure, leading company operations and compliance.",
    biography: [
      "CA. Vishnu Gupta is a Chartered Accountant (ICAI, 2005) with over 18 years of leadership experience across finance, manufacturing and infrastructure. As Co-Founder and Director of Bharat Electrosafe, he leads operations and the company's compliance programme.",
      "Before Bharat Electrosafe he held financial leadership roles at Universal Cables Ltd. (MP Birla Group), GHCL Ltd. and Cavendish Industries Ltd. (JK Tyre Group).",
      "He is also Co-Founder of Samridhi Test House Pvt. Ltd., an ISO/IEC 17025 accredited and BIS-recognised electrical and mechanical testing laboratory, and is involved in Insulaticaa Polyplast, VKI Business World Ahead and Dwarikadheesh Engineering Infra.",
    ],
    portrait: "/media/leadership/vishnu-gupta.webp",
    portraitAlt: "Vishnu Gupta, Co-Founder and Director of Bharat Electrosafe",
    approved: true,
  },
  {
    id: "krishan-kumar",
    name: "Krishan Kumar",
    designation: "Co-Founder & Director",
    summary:
      "Leads production, vendor development and after-sales coordination, bringing a family business background in supply chain and customer relationships.",
    biography: [
      "Mr. Krishan Kumar Khandelwal is Co-Founder and Director of Bharat Electrosafe, where he manages production, vendor development and after-sales coordination.",
      "He comes from a business family with a long-standing presence in trading, giving him a grounding in supply chain management and customer relationships. He has also led commercial and residential real estate projects.",
    ],
    portrait: "/media/leadership/krishan-kumar.webp",
    portraitAlt: "Krishan Kumar, Co-Founder and Director of Bharat Electrosafe",
    approved: true,
  },
  {
    id: "priyanka-garg",
    name: "Priyanka Garg",
    designation: "Entrepreneur | Co-Founder & Director",
    summary:
      "Over 20 years in the rubber and polymer industry, covering insulating mats, silicone and EPDM sheets, and PVC and rubber compounds.",
    biography: [
      "Mrs. Priyanka Garg is Co-Founder and Director of Bharat Electrosafe, with over 20 years of experience in the rubber and polymer industry.",
      "She holds an M.Com from Agra University and a business certification from UP Technical University. Her areas of work include electrical insulating mats, silicone rubber sheets, EPDM membranes, and PVC and rubber compounds.",
      "Her work extends beyond manufacturing into consulting, quality testing and international trade facilitation.",
    ],
    portrait: "/media/leadership/priyanka-garg.webp",
    portraitAlt: "Priyanka Garg, Co-Founder and Director of Bharat Electrosafe",
    approved: true,
  },
];

/** Only profiles cleared for publication. */
export const publishedLeadership = leadership.filter((person) => person.approved);
