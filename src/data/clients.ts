/* ────────────────────────────────────────────────────────────────
   Bharat Electrosafe — Client Reference Data
   ────────────────────────────────────────────────────────────────

   IMPORTANT — READ BEFORE ADDING ANYTHING HERE.

   This list is intentionally EMPTY.

   A previous revision hard-coded fifteen named organisations (Indian
   Railways, NTPC, PGCIL, BHEL, Reliance, Tata Power, L&T and others) and
   rendered them on the homepage under "Trusted by leading institutions".
   None of those customer relationships were verified, and displaying a
   third party's name or logo as a customer without permission is both a
   factual and a legal risk. They have been removed.

   To add a client reference, ALL of the following must be true:
     1. The customer relationship is confirmed by the client (Bharat
        Electrosafe), not inferred from a photograph or a document.
     2. Written permission exists to display that organisation's name
        and/or logo publicly.
     3. `logoApproved` is set to true only when the logo file itself is
        cleared for public use and present in /public/images/clients/.

   Written endorsements exist in the private asset vault for a small
   number of customers. Those still require explicit display approval
   before they appear on the public site.
   See docs/ASSET_INTEGRATION_PLAN.md and docs/CONTENT_VERIFICATION.md.
   ──────────────────────────────────────────────────────────────── */

export interface ClientEntry {
  id: string;
  name: string;
  sector: string;
  /** Short abbreviation shown when no approved logo is available. */
  abbreviation: string;
  /** Logo image path — only used when logoApproved is true. */
  logo: string;
  /** Whether the logo is cleared and present for public display. */
  logoApproved: boolean;
  /** Whether the client has approved public naming of the relationship. */
  nameApproved: boolean;
}

export const clients: ClientEntry[] = [];

/** Only clients cleared for public display. Components must use this. */
export const approvedClients: ClientEntry[] = clients.filter(
  (c) => c.nameApproved
);
