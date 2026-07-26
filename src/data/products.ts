export interface ProductSystem {
  id: string;
  index: string;
  name: string;
  shortName: string;
  description: string;
  detailCopy: string;
  image: string;
  variants: string[];
  exploreLink: string;
  features: string[];
  standards: string[];
}

export const productSystems: ProductSystem[] = [
  {
    id: "electrical-insulation",
    index: "01",
    name: "Electrical Insulation",
    shortName: "Insulating mats",
    description: "Insulating mats selected by operating voltage.",
    detailCopy:
      "Rubber insulating mats engineered for electrical panels, substations, switchrooms and industrial control areas. Selected by operating voltage to IS 15652.",
    image: "/images/electrical-insulation.png",
    variants: ["Class A – 3.3 kV", "Class B – 11 kV", "Class C – 33 kV"],
    exploreLink: "#electrical-insulation",
    features: [
      "Tested to IS 15652:2006 for electrical insulation",
      "Permanent embossed class and voltage marking",
      "Diamond-pattern anti-skid surface on both sides",
      "Oil, acid and alkali resistant rubber compound",
      "Available in standard rolls and cut sizes",
      " Suitable for indoor and covered outdoor use",
    ],
    standards: ["IS 15652:2006", "IEC 61111"],
  },
  {
    id: "visible-safety",
    index: "02",
    name: "Visible Safety",
    shortName: "Safety variants",
    description: "Electrical protection with clearer visual guidance.",
    detailCopy:
      "Coloured strip, bi-colour and auto-glow / reflective variants for hazard demarcation, safety zoning and improved visibility in demanding environments.",
    image: "/images/visible-safety.png",
    variants: ["Coloured Strip", "Bi-Colour", "Auto-Glow / Reflective"],
    exploreLink: "#visible-safety",
    features: [
      "High-visibility colour coding for safety zoning",
      "Reflective and auto-glow options for low-light areas",
      "Durable rubber base with wear-resistant top layer",
      "Customisable strip widths and bi-colour combinations",
      "Suitable for industrial floors and walkways",
      "Maintains insulation properties with visual guidance",
    ],
    standards: ["IS 15652:2006", "EN 13501-1"],
  },
  {
    id: "civil-protection",
    index: "03",
    name: "Civil Protection",
    shortName: "Waterproofing & sealing",
    description: "Waterproofing and sealing for civil infrastructure.",
    detailCopy:
      "BharatMembrane HDPE geomembranes and BharatHydro water-stop systems for containment, waterproofing and concrete-joint water control.",
    image: "/images/civil-protection.png",
    variants: ["BharatMembrane", "BharatHydro"],
    exploreLink: "#civil-protection",
    features: [
      "HDPE geomembrane for containment and landfill lining",
      "Rubber water-stop for concrete construction joints",
      "High puncture and tear resistance",
      "UV stabilised for exposed applications",
      "Available in various thicknesses and widths",
      "Compatible with conventional concrete construction",
    ],
    standards: ["IS 15401", "ASTM D4437", "IS 15070"],
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
