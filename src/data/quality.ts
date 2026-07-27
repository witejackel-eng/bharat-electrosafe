/* ────────────────────────────────────────────────────────────────
   Bharat Electrosafe — Quality, Standards and Certification Data
   ────────────────────────────────────────────────────────────────

   VERIFICATION RULE FOR THIS FILE
   Every entry below must be traceable to either (a) the client's own
   published website, or (b) a certificate/report supplied by the client.

   Do NOT add licence numbers, report numbers, registrar names or file
   sizes that are not confirmed. Certificate and report reference numbers
   that are held privately but never published by the client must stay
   out of this file — reference the document by name instead.

   `documentAvailable` stays false until the real, client-approved PDF is
   published to /public/downloads. The UI must not render a download link
   for an entry whose document is unavailable.
   See docs/CONTENT_VERIFICATION.md and docs/ASSET_INTEGRATION_PLAN.md.
   ──────────────────────────────────────────────────────────────── */

export interface QualityDocument {
  id: string;
  name: string;
  issuer: string;
  standard: string;
  /** Short label shown as a "stamp" on the document card. */
  stamp: string;
  /** Publicly published reference, or empty when not public. */
  reference: string;
  /** True only when a real approved file exists in /public/downloads. */
  documentAvailable: boolean;
  /** Filename inside /public/downloads — only meaningful when available. */
  fileName?: string;
}

export const qualityDocuments: QualityDocument[] = [
  {
    id: "bis-licence-is15652",
    name: "BIS licence — insulating mats",
    issuer: "Bureau of Indian Standards",
    standard: "IS 15652:2006",
    stamp: "BIS LICENSED",
    // Published by the client on their own product pages.
    reference: "CM/L: 8800129617",
    documentAvailable: false,
  },
  {
    id: "erda-test-report",
    name: "ERDA test report",
    issuer: "Electrical Research and Development Association",
    standard: "IS 15652:2006",
    stamp: "INDEPENDENTLY TESTED",
    // Report/ULR numbers are held privately and are not published — omitted.
    reference: "Available on request",
    documentAvailable: false,
  },
  {
    id: "iso-9001",
    name: "ISO 9001:2015 — Quality Management System",
    issuer: "Accredited registrar",
    standard: "ISO 9001:2015",
    stamp: "CERTIFIED",
    reference: "Available on request",
    documentAvailable: false,
  },
  {
    id: "iso-14001",
    name: "ISO 14001:2015 — Environmental Management System",
    issuer: "Accredited registrar",
    standard: "ISO 14001:2015",
    stamp: "CERTIFIED",
    reference: "Available on request",
    documentAvailable: false,
  },
  {
    id: "iso-45001",
    name: "ISO 45001:2018 — Occupational Health & Safety",
    issuer: "Accredited registrar",
    standard: "ISO 45001:2018",
    stamp: "CERTIFIED",
    reference: "Available on request",
    documentAvailable: false,
  },
  {
    id: "bis-membrane-is15909",
    name: "BharatMembrane — BIS approval",
    issuer: "Bureau of Indian Standards",
    standard: "IS 15909:2020",
    stamp: "BIS APPROVED",
    reference: "Available on request",
    documentAvailable: false,
  },
];

/* ── Accreditation and recognition bodies ──
   These are the organisations whose standards, testing or recognition the
   company actually holds — verified against client-supplied certificates.
   This replaces the previous "institutional clients" rail, which named
   companies that were never confirmed as customers. */
export interface AccreditationBody {
  id: string;
  /** Short label rendered in the trust rail. */
  label: string;
  /** What the relationship actually is. */
  role: string;
}

export const accreditationBodies: AccreditationBody[] = [
  { id: "bis", label: "BIS / ISI", role: "Product licensing to IS 15652:2006" },
  { id: "erda", label: "ERDA", role: "Independent electrical testing" },
  { id: "nabl", label: "NABL", role: "Accredited testing laboratory scope" },
  { id: "ilac", label: "ILAC-MRA", role: "International accreditation arrangement" },
  { id: "iso-9001", label: "ISO 9001:2015", role: "Quality management system" },
  { id: "iso-14001", label: "ISO 14001:2015", role: "Environmental management system" },
  { id: "iso-45001", label: "ISO 45001:2018", role: "Occupational health & safety" },
  { id: "zed", label: "ZED", role: "MSME Zero Defect Zero Effect recognition" },
  { id: "startup-india", label: "Startup India", role: "DPIIT recognition" },
  { id: "make-in-india", label: "Make in India", role: "Domestic manufacturing initiative" },
];

export const traceabilityFields = [
  { label: "Product class", description: "Voltage class rating (A, B or C)" },
  { label: "Thickness", description: "Nominal mat thickness in mm" },
  { label: "Product code", description: "Product identifier (BES1001 / BES1002 / BES1003)" },
  { label: "Standard", description: "Applicable IS standard reference" },
  { label: "Licence reference", description: "BIS licence number" },
];
