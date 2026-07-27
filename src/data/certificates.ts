/* ────────────────────────────────────────────────────────────────
   Bharat Electrosafe — Certificates & Documents Data Structure
   ────────────────────────────────────────────────────────────────

   NOTE: Entries are placeholder/empty since real certificates
   need to be downloaded and verified before publishing.
   Replace `documentUrl` and `thumbnailUrl` with actual assets
   once documents are obtained and verified.
   ──────────────────────────────────────────────────────────────── */

export type CertificateCategory =
  | "bis-licence"
  | "erda-report"
  | "nth-report"
  | "iso-9001"
  | "iso-45001"
  | "msme"
  | "startup-india"
  | "zed"
  | "other";

export interface CertificateDocument {
  id: string;
  /** Document title */
  name: string;
  /** Category classification */
  category: CertificateCategory;
  /** Issuing authority */
  issuer: string;
  /** Applicable standard or regulation */
  standard: string;
  /** Reference number (empty until verified) */
  referenceNumber: string;
  /** File type */
  fileType: "PDF" | "Image";
  /** Approximate file size (empty until actual document obtained) */
  fileSize: string;
  /** URL to the actual document file (empty until verified) */
  documentUrl: string;
  /** URL to a thumbnail/preview image (empty until obtained) */
  thumbnailUrl: string;
  /** Whether the document has been verified and is approved for display */
  verified: boolean;
  /** Short stamp label for visual display */
  stamp: string;
  /** Year or date of issue (empty until verified) */
  issueDate: string;
}

/* ── Possible certificate categories with labels ── */
export const certificateCategoryLabels: Record<CertificateCategory, string> = {
  "bis-licence": "BIS Licence",
  "erda-report": "ERDA Test Report",
  "nth-report": "NTH Test Report",
  "iso-9001": "ISO 9001:2015",
  "iso-45001": "ISO 45001:2018",
  msme: "MSME Registration",
  "startup-india": "Startup India Recognition",
  zed: "ZED Certification",
  other: "Other Document",
};

/* ── Placeholder certificate entries ── */
export const certificates: CertificateDocument[] = [
  {
    id: "bis-licence",
    name: "BIS Licence Documentation",
    category: "bis-licence",
    issuer: "Bureau of Indian Standards",
    standard: "IS 15652:2006",
    referenceNumber: "",
    fileType: "PDF",
    fileSize: "",
    documentUrl: "",
    thumbnailUrl: "/images/mat-texture.png",
    verified: false,
    stamp: "BIS LICENSED",
    issueDate: "",
  },
  {
    id: "erda-report",
    name: "ERDA Independent Test Report",
    category: "erda-report",
    issuer: "Electrical Research & Development Association (ERDA)",
    standard: "IS 15652 / IEC 61111",
    referenceNumber: "",
    fileType: "PDF",
    fileSize: "",
    documentUrl: "",
    thumbnailUrl: "/images/mat-texture.png",
    verified: false,
    stamp: "TESTED",
    issueDate: "",
  },
  {
    id: "nth-report",
    name: "NTH Test Report",
    category: "nth-report",
    issuer: "National Test House (NTH)",
    standard: "IS 15652:2006",
    referenceNumber: "",
    fileType: "PDF",
    fileSize: "",
    documentUrl: "",
    thumbnailUrl: "/images/mat-texture.png",
    verified: false,
    stamp: "TESTED",
    issueDate: "",
  },
  {
    id: "iso-9001",
    name: "ISO 9001:2015 Certificate",
    category: "iso-9001",
    issuer: "Certification Body",
    standard: "ISO 9001:2015",
    referenceNumber: "",
    fileType: "PDF",
    fileSize: "",
    documentUrl: "",
    thumbnailUrl: "/images/mat-texture.png",
    verified: false,
    stamp: "CERTIFIED",
    issueDate: "",
  },
  {
    id: "iso-45001",
    name: "ISO 45001:2018 Certificate",
    category: "iso-45001",
    issuer: "Certification Body",
    standard: "ISO 45001:2018",
    referenceNumber: "",
    fileType: "PDF",
    fileSize: "",
    documentUrl: "",
    thumbnailUrl: "/images/mat-texture.png",
    verified: false,
    stamp: "CERTIFIED",
    issueDate: "",
  },
  {
    id: "msme",
    name: "MSME Registration Certificate",
    category: "msme",
    issuer: "Ministry of Micro, Small & Medium Enterprises",
    standard: "MSME Act",
    referenceNumber: "",
    fileType: "PDF",
    fileSize: "",
    documentUrl: "",
    thumbnailUrl: "/images/mat-texture.png",
    verified: false,
    stamp: "REGISTERED",
    issueDate: "",
  },
  {
    id: "startup-india",
    name: "Startup India Recognition",
    category: "startup-india",
    issuer: "Department for Promotion of Industry and Internal Trade (DPIIT)",
    standard: "Startup India Initiative",
    referenceNumber: "",
    fileType: "PDF",
    fileSize: "",
    documentUrl: "",
    thumbnailUrl: "/images/mat-texture.png",
    verified: false,
    stamp: "RECOGNISED",
    issueDate: "",
  },
  {
    id: "zed",
    name: "ZED Certification",
    category: "zed",
    issuer: "Quality Council of India",
    standard: "ZED Framework",
    referenceNumber: "",
    fileType: "PDF",
    fileSize: "",
    documentUrl: "",
    thumbnailUrl: "/images/mat-texture.png",
    verified: false,
    stamp: "ZED CERTIFIED",
    issueDate: "",
  },
];

/* ── Traceability fields (visible on product marking) ── */
export const traceabilityFields = [
  { label: "Product class", description: "Voltage class rating (A, B or C)" },
  { label: "Thickness", description: "Nominal mat thickness in mm" },
  { label: "Product code", description: "Unique batch identifier" },
  { label: "Standard", description: "Applicable IS standard reference" },
  { label: "Licence reference", description: "BIS licence number" },
];
