export interface ProductSystem {
  id: string;
  index: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  variants: string[];
  exploreLink: string;
}

export const productSystems: ProductSystem[] = [
  {
    id: "electrical-insulation",
    index: "01",
    name: "Electrical Insulation",
    shortName: "Insulating mats",
    description: "Insulating mats selected by operating voltage.",
    image: "/images/electrical-insulation.png",
    variants: ["Class A – 3.3 kV", "Class B – 11 kV", "Class C – 33 kV"],
    exploreLink: "#electrical-insulation",
  },
  {
    id: "visible-safety",
    index: "02",
    name: "Visible Safety",
    shortName: "Safety variants",
    description: "Electrical protection with clearer visual guidance.",
    image: "/images/visible-safety.png",
    variants: ["Coloured Strip", "Bi-Colour", "Auto-Glow / Reflective"],
    exploreLink: "#visible-safety",
  },
  {
    id: "civil-protection",
    index: "03",
    name: "Civil Protection",
    shortName: "Waterproofing & sealing",
    description: "Waterproofing and sealing for civil infrastructure.",
    image: "/images/civil-protection.png",
    variants: ["BharatMembrane", "BharatHydro"],
    exploreLink: "#civil-protection",
  },
];

export interface InsulationClass {
  className: string;
  voltage: string;
  voltageUnit: string;
  thickness: string;
  thicknessUnit: string;
  description: string;
}

export const insulationClasses: InsulationClass[] = [
  {
    className: "A",
    voltage: "3.3",
    voltageUnit: "kV",
    thickness: "2.0",
    thicknessUnit: "mm",
    description: "Low-voltage distribution panels and switchgear.",
  },
  {
    className: "B",
    voltage: "11",
    voltageUnit: "kV",
    thickness: "2.5",
    thicknessUnit: "mm",
    description: "Medium-voltage substations and transformer rooms.",
  },
  {
    className: "C",
    voltage: "33",
    voltageUnit: "kV",
    thickness: "3.0",
    thicknessUnit: "mm",
    description: "High-voltage switchyards and generating stations.",
  },
];
