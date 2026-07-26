export interface QualityDocument {
  id: string;
  name: string;
  issuer: string;
  standard: string;
  fileType: string;
  fileSize: string;
  thumbnail: string;
}

export const qualityDocuments: QualityDocument[] = [
  {
    id: "bis-licence",
    name: "BIS Licence Documentation",
    issuer: "Bureau of Indian Standards",
    standard: "IS 15652",
    fileType: "PDF",
    fileSize: "2.4 MB",
    thumbnail: "/images/mat-texture.png",
  },
  {
    id: "test-report",
    name: "Independent Test Report",
    issuer: "CPRI / ERDA",
    standard: "IS 15652 / IEC 61111",
    fileType: "PDF",
    fileSize: "1.8 MB",
    thumbnail: "/images/mat-texture.png",
  },
  {
    id: "iso-certificate",
    name: "ISO Certificate",
    issuer: "TÜV / BSI",
    standard: "ISO 9001:2015",
    fileType: "PDF",
    fileSize: "1.2 MB",
    thumbnail: "/images/mat-texture.png",
  },
  {
    id: "is-15652",
    name: "IS 15652 Certificate",
    issuer: "Bureau of Indian Standards",
    standard: "IS 15652:2006",
    fileType: "PDF",
    fileSize: "3.1 MB",
    thumbnail: "/images/mat-texture.png",
  },
];

export const traceabilityFields = [
  { label: "Product class", description: "Voltage class rating (A, B or C)" },
  { label: "Thickness", description: "Nominal mat thickness in mm" },
  { label: "Product code", description: "Unique batch identifier" },
  { label: "Standard", description: "Applicable IS standard reference" },
  { label: "Licence reference", description: "BIS licence number" },
];
