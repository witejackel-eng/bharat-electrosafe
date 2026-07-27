/* ────────────────────────────────────────────────────────────────
   Bharat Electrosafe — Client Logos Data
   ────────────────────────────────────────────────────────────────

   NOTE: Real client logos require client approval before display.
   This file provides a placeholder structure with sector labels.
   Replace `logo` paths with actual client-approved logo assets
   once approvals are obtained.
   ──────────────────────────────────────────────────────────────── */

export interface ClientEntry {
  id: string;
  name: string;
  sector: string;
  /** Short abbreviation shown in logo placeholder */
  abbreviation: string;
  /** Logo image path — placeholder until client approval */
  logo: string;
  /** Whether logo has been approved for public display */
  logoApproved: boolean;
}

export const clients: ClientEntry[] = [
  {
    id: "1",
    name: "Indian Railways",
    sector: "Railway & Metro",
    abbreviation: "IR",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "2",
    name: "NTPC",
    sector: "Power Generation",
    abbreviation: "NTPC",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "3",
    name: "Power Grid Corporation",
    sector: "Power Transmission",
    abbreviation: "PGCIL",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "4",
    name: "BHEL",
    sector: "Heavy Engineering",
    abbreviation: "BHEL",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "5",
    name: "NHPC",
    sector: "Hydropower",
    abbreviation: "NHPC",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "6",
    name: "IOCL",
    sector: "Oil & Gas",
    abbreviation: "IOCL",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "7",
    name: "SAIL",
    sector: "Steel",
    abbreviation: "SAIL",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "8",
    name: "CPWD",
    sector: "Construction",
    abbreviation: "CPWD",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "9",
    name: "DMRC",
    sector: "Railway & Metro",
    abbreviation: "DMRC",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "10",
    name: "Tata Power",
    sector: "Power Generation",
    abbreviation: "TP",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "11",
    name: "Adani Power",
    sector: "Power Generation",
    abbreviation: "AP",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "12",
    name: "L&T",
    sector: "Heavy Engineering",
    abbreviation: "L&T",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "13",
    name: "NPCIL",
    sector: "Nuclear Power",
    abbreviation: "NPCIL",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "14",
    name: "GAIL",
    sector: "Oil & Gas",
    abbreviation: "GAIL",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
  {
    id: "15",
    name: "Reliance Industries",
    sector: "Oil & Gas",
    abbreviation: "RIL",
    logo: "/images/clients/placeholder.svg",
    logoApproved: false,
  },
];

/* ── Sector labels for grouping ── */
export const clientSectors = [
  "Power Generation",
  "Power Transmission",
  "Railway & Metro",
  "Heavy Engineering",
  "Oil & Gas",
  "Steel",
  "Nuclear Power",
  "Hydropower",
  "Construction",
];
