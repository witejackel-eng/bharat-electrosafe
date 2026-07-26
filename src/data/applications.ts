export interface StandardCompliance {
  standard: string;
  scope: string;
}

export interface KeyConsideration {
  title: string;
  description: string;
}

export interface TypicalSpec {
  label: string;
  value: string;
}

export interface Application {
  id: string;
  name: string;
  system: string;
  systemShort: string;
  image: string;
  /** 2-3 sentence overview of where this product system is deployed. */
  overview: string;
  /** 4-5 specific use cases for this application. */
  useCases: string[];
  /** List of product system IDs (e.g. ['electrical-insulation']) that apply. */
  relatedProducts: string[];
  /** 2-3 applicable standards with their scope. */
  standardsCompliance: StandardCompliance[];
  /** 3-4 engineering considerations specific to this application. */
  keyConsiderations: KeyConsideration[];
  /** 3-4 typical specification rows (label + value). */
  typicalSpecs: TypicalSpec[];
}

export const applications: Application[] = [
  {
    id: "substations",
    name: "Substations",
    system: "Electrical Insulation",
    systemShort: "EI",
    image: "/images/app-substation.png",
    overview:
      "Insulating mats deployed across HV/MV switchyards, transformer bays and control rooms to protect operators from step-and-touch potential during switching, isolation and inspection. Specified to IS 15652 by voltage class, with permanent embossed class markings for audit traceability.",
    useCases: [
      "HV switchyard operator aisles",
      "Transformer bay walkways",
      "Control panel frontage",
      "PT/CT operating zones",
      "Isolator and circuit-breaker operating positions",
    ],
    relatedProducts: ["electrical-insulation"],
    standardsCompliance: [
      { standard: "IS 15652", scope: "Insulating matting for electrical purposes" },
      { standard: "IEC 61111", scope: "Live working — electrical insulating matting" },
      { standard: "CBIP / CEA safety manual", scope: "Substation safety practices and operator protection" },
    ],
    keyConsiderations: [
      {
        title: "Voltage class",
        description:
          "Class B (11 kV) is typical for 33/11 kV substations; Class C (33 kV) is required in 132/33 kV switchyards and HV bays.",
      },
      {
        title: "Coverage area",
        description:
          "Full-length matting in front of panels and along operator aisles; the mat should extend the full bay width with no gaps.",
      },
      {
        title: "Surface pattern",
        description:
          "Diamond anti-skid pattern on both sides prevents slip in outdoor and humid indoor conditions.",
      },
      {
        title: "Audit trail",
        description:
          "Embossed class + voltage + batch marking enables annual CEA / state-board safety audits.",
      },
    ],
    typicalSpecs: [
      { label: "Class", value: "B / C" },
      { label: "Thickness", value: "2.5 / 3.0 mm" },
      { label: "Standard", value: "IS 15652:2006" },
      { label: "Surface", value: "Diamond anti-skid" },
    ],
  },
  {
    id: "control-rooms",
    name: "Control Rooms",
    system: "Electrical Insulation",
    systemShort: "EI",
    image: "/images/app-control-room.png",
    overview:
      "Insulating mats laid in front of control panels, mimic panels and SCADA operator consoles in distribution control rooms and process-control centres. Antistatic surface prevents static build-up on sensitive electronics while protecting personnel from inadvertent contact with live terminals.",
    useCases: [
      "Control panel frontage",
      "Mimic / SCADA operator desks",
      "DC distribution bays",
      "Relay and metering racks",
      "Battery charger rooms",
    ],
    relatedProducts: ["electrical-insulation", "visible-safety"],
    standardsCompliance: [
      { standard: "IS 15652", scope: "Insulating matting for electrical purposes" },
      { standard: "IEC 61340", scope: "Electrostatic control in electronics environments" },
    ],
    keyConsiderations: [
      {
        title: "Voltage class",
        description:
          "Class A (3.3 kV) covers LT panels; Class B (11 kV) is specified where 11 kV metering / relay panels are present.",
      },
      {
        title: "Antistatic surface",
        description:
          "Low surface-resistance top layer (< 10⁹ Ω) prevents ESD damage to microprocessor-based relays and SCADA cards.",
      },
      {
        title: "Seamless coverage",
        description:
          "Continuous matting along panel rows avoids tripping and maintains insulation integrity at joints.",
      },
      {
        title: "Cleanability",
        description:
          "Smooth border edges and resistance to oil and coolant allow daily wipe-down without degradation.",
      },
    ],
    typicalSpecs: [
      { label: "Class", value: "A / B" },
      { label: "Thickness", value: "2.0 / 2.5 mm" },
      { label: "Standard", value: "IS 15652:2006" },
      { label: "Surface", value: "Antistatic, anti-skid" },
    ],
  },
  {
    id: "power-utilities",
    name: "Power Utilities",
    system: "Electrical Insulation",
    systemShort: "EI",
    image: "/images/app-power-utility.png",
    overview:
      "Insulating matting deployed across the full utility value chain — from generating-station turbine halls and 11 kV station auxiliaries, through 132 / 220 / 400 kV switchyards, to 33 / 11 kV distribution substations. Single-supplier consistency ensures uniform class marking and QA documentation across state and central utility fleets.",
    useCases: [
      "Generating station auxiliary panels",
      "220 / 400 kV switchyard operator zones",
      "33 / 11 kV distribution substations",
      "Switchgear operating aisles",
      "Transformer marshalling kiosks",
    ],
    relatedProducts: ["electrical-insulation"],
    standardsCompliance: [
      { standard: "IS 15652", scope: "Insulating matting for electrical purposes" },
      { standard: "CEA Safety Regulations", scope: "Measures relating to safety and electric supply" },
      { standard: "IEC 61111", scope: "Live working — insulating matting" },
    ],
    keyConsiderations: [
      {
        title: "Voltage class mix",
        description:
          "Utilities typically stock all three classes — A for LT auxiliaries, B for 11 kV, C for 33 kV bays — to standardise procurement.",
      },
      {
        title: "Bulk roll supply",
        description:
          "Standard 10 m rolls plus cut-to-size mats reduce scrap; the vendor should support board-specific cut lists.",
      },
      {
        title: "Documentation",
        description:
          "Each batch ships with a BIS-licence test certificate, class / voltage embossing, and a traceability sheet for the asset register.",
      },
      {
        title: "Replacement cycle",
        description:
          "Inspection every 12 months per CEA; mats failing dielectric retest must be replaced from the same specification.",
      },
    ],
    typicalSpecs: [
      { label: "Class", value: "A / B / C" },
      { label: "Thickness", value: "2.0 – 3.0 mm" },
      { label: "Standard", value: "IS 15652:2006" },
      { label: "Roll length", value: "10 m standard" },
    ],
  },
  {
    id: "railways-metro",
    name: "Railways / Metro",
    system: "Visible Safety",
    systemShort: "VS",
    image: "/images/app-railway.png",
    overview:
      "Insulating mats specified for Indian Railways traction substations (25 kV AC), OHE maintenance vehicles and depot earthing bays, plus metro rolling-stock depots and traction SCADA rooms. Class B / C matting protects maintainers during pantograph isolation, OHE bonding and switchgear operations.",
    useCases: [
      "Traction substation 25 kV bays",
      "OHE maintenance vehicle floors",
      "Depot earthing and bonding zones",
      "Pantograph isolation areas",
      "Traction SCADA control rooms",
    ],
    relatedProducts: ["electrical-insulation", "visible-safety"],
    standardsCompliance: [
      { standard: "IS 15652", scope: "Insulating matting for electrical purposes" },
      { standard: "RDSO / IRS specifications", scope: "Traction distribution safety equipment" },
      { standard: "IEC 61111", scope: "Live working — insulating matting" },
    ],
    keyConsiderations: [
      {
        title: "Voltage class",
        description:
          "Class C (33 kV) matting is specified at 25 kV traction substations to provide margin above system voltage; Class B at 11 kV auxiliary bays.",
      },
      {
        title: "High-visibility variants",
        description:
          "Strip and bi-colour mats support depot safety zoning — visible-safety variants are commonly specified for OHE vehicles.",
      },
      {
        title: "Mobile application",
        description:
          "Loose-laid or bonded mats in OHE maintenance vehicles must resist vibration, oil and track-borne moisture.",
      },
      {
        title: "RDSO conformance",
        description:
          "Procurement typically calls for RDSO / IRS acceptance in addition to BIS licence — the vendor should provide both.",
      },
    ],
    typicalSpecs: [
      { label: "Class", value: "B / C" },
      { label: "Thickness", value: "2.5 / 3.0 mm" },
      { label: "Standard", value: "IS 15652 + RDSO" },
      { label: "Finish", value: "Anti-skid / hi-vis option" },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    system: "Visible Safety",
    systemShort: "VS",
    image: "/images/app-manufacturing.png",
    overview:
      "Insulating mats for heavy-engineering shop floors, HT / LT motor control centres, process-industry panels and captive power houses. Class A / B matting protects electrical maintenance staff during motor switching, breaker isolation and panel inspection across continuous-process plants.",
    useCases: [
      "HT / LT motor control centres",
      "Captive power-house panels",
      "Process-industry switchrooms",
      "Cranes and EOT gantry cab floors",
      "Cement / steel plant sub-stations",
    ],
    relatedProducts: ["electrical-insulation", "visible-safety"],
    standardsCompliance: [
      { standard: "IS 15652", scope: "Insulating matting for electrical purposes" },
      { standard: "Factory Act / State Factories Rules", scope: "Safety provisions for electrical installations" },
      { standard: "IEC 61111", scope: "Live working — insulating matting" },
    ],
    keyConsiderations: [
      {
        title: "Voltage class",
        description:
          "Class A (3.3 kV) covers LT motor panels; Class B (11 kV) is required where 11 kV HT switchgear is installed.",
      },
      {
        title: "Wear resistance",
        description:
          "Heavy foot and trolley traffic on shop floors demands a high-abrasion rubber compound and ≥ 3 mm thickness at high-traffic panels.",
      },
      {
        title: "Oil and chemical exposure",
        description:
          "Mats in machine shops and process areas must resist cutting fluid, hydraulic oil and mild alkalis.",
      },
      {
        title: "Safety zoning",
        description:
          "Visible-safety coloured-strip variants demarcate HT / LT zones and emergency isolation points.",
      },
    ],
    typicalSpecs: [
      { label: "Class", value: "A / B" },
      { label: "Thickness", value: "2.0 / 2.5 mm" },
      { label: "Standard", value: "IS 15652:2006" },
      { label: "Compound", value: "Oil-resistant rubber" },
    ],
  },
  {
    id: "tunnels-water",
    name: "Tunnels / Water",
    system: "Civil Protection",
    systemShort: "CP",
    image: "/images/app-tunnel.png",
    overview:
      "Civil-protection systems for tunnel lining waterproofing, Metro / road tunnel construction joints, water-treatment and storage tank linings, and canal / landfill containment. BharatMembrane HDPE geomembranes and BharatHydro water-stop profiles provide long-term water-tightness in aggressive sub-grade environments.",
    useCases: [
      "Metro and road tunnel lining waterproofing",
      "Construction-joint water-stop",
      "Water tank and reservoir lining",
      "Canal and ash-pond lining",
      "Landfill containment",
    ],
    relatedProducts: ["civil-protection"],
    standardsCompliance: [
      { standard: "IS 15401", scope: "HDPE geomembrane for lining" },
      { standard: "IS 15070", scope: "PVC water-stop for construction joints" },
      { standard: "ASTM D4437", scope: "Seam strength for geomembrane" },
    ],
    keyConsiderations: [
      {
        title: "Membrane selection",
        description:
          "1.0 – 2.0 mm HDPE geomembrane is typical for water containment; thicker 2.0 – 2.5 mm for landfill and hazardous containment.",
      },
      {
        title: "Joint water-stop",
        description:
          "PVC water-stop (centre-bulb or dumbbell) is cast into construction joints to seal against hydrostatic pressure.",
      },
      {
        title: "Subgrade preparation",
        description:
          "Geomembrane requires a smooth, compacted sub-base with no sharp protrusions; a geotextile protection layer is recommended.",
      },
      {
        title: "Welding and QA",
        description:
          "Hot-wedge double-track seams with air-channel test per ASTM D4437 — the vendor should provide on-site QA records.",
      },
    ],
    typicalSpecs: [
      { label: "Membrane", value: "HDPE 1.0 – 2.5 mm" },
      { label: "Water-stop", value: "PVC 150 – 350 mm" },
      { label: "Standard", value: "IS 15401 / IS 15070" },
      { label: "Seam test", value: "Air-channel per ASTM D4437" },
    ],
  },
];
