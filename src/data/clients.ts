export interface Client {
  id: string;
  name: string;
  sector: string;
  abbreviation: string;
}

export const clients: Client[] = [
  { id: "1", name: "Indian Railways", sector: "Railway & Metro", abbreviation: "IR" },
  { id: "2", name: "NTPC", sector: "Power Generation", abbreviation: "NTPC" },
  { id: "3", name: "Power Grid Corporation", sector: "Power Transmission", abbreviation: "PGCIL" },
  { id: "4", name: "BHEL", sector: "Heavy Engineering", abbreviation: "BHEL" },
  { id: "5", name: "NHPC", sector: "Hydropower", abbreviation: "NHPC" },
  { id: "6", name: "IOCL", sector: "Oil & Gas", abbreviation: "IOCL" },
  { id: "7", name: "SAIL", sector: "Steel", abbreviation: "SAIL" },
  { id: "8", name: "CPWD", sector: "Construction", abbreviation: "CPWD" },
  { id: "9", name: "DMRC", sector: "Railway & Metro", abbreviation: "DMRC" },
  { id: "10", name: "Tata Power", sector: "Power Generation", abbreviation: "TP" },
  { id: "11", name: "Adani Power", sector: "Power Generation", abbreviation: "AP" },
  { id: "12", name: "L&T", sector: "Heavy Engineering", abbreviation: "L&T" },
  { id: "13", name: "NPCIL", sector: "Nuclear Power", abbreviation: "NPCIL" },
  { id: "14", name: "GAIL", sector: "Oil & Gas", abbreviation: "GAIL" },
  { id: "15", name: "Reliance Industries", sector: "Oil & Gas", abbreviation: "RIL" },
  { id: "16", name: "NHPC", sector: "Hydropower", abbreviation: "NHPC" },
];
