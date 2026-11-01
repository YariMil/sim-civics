// ─── Document types ───────────────────────────────────────────────
// Add new documents here. The `file` path is relative to /public/documents/
// Set `file: null` for placeholders while documents are being uploaded.

export type DocCategory = 'agenda' | 'ordinances';

export interface CouncilDocument {
  id: string;
  title: string;
  description: string;
  category: DocCategory;
  uploadedAt: string;     // ISO date shown on the card; for ordinances, the day the council voted on it
  sessionLabel?: string;  // e.g. "Session 4, Cycle 2"
  file: string | null;    // filename in /public/documents/ — null = coming soon
  fileSize?: string;      // display string, e.g. "340 KB"
}

export const documents: CouncilDocument[] = [
  {
    id: 'ord-14',
    title: 'Ordinance 14 - Wimbishville Safer Districts Act',
    description: 'Lets the Wimbishville Police Department draw on emergency and supplemental funds to reduce crime in designated high-crime districts. Tabled April 13, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-04-13',
    file: 'ordinance_14_safer_districts_act.pdf',
    fileSize: '22 KB',
  },
  {
    id: 'ord-13',
    title: 'Ordinance 13 - Wimbishville Private Policing Act',
    description: 'Creates a Private Policing License that allows private entities to carry out policing activities in Wimbishville. Passed April 6, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-04-06',
    file: 'ordinance_13_private_policing_act.pdf',
    fileSize: '36 KB',
  },
  {
    id: 'ord-12',
    title: 'Ordinance 12 - Wimbishville Business Act',
    description: 'Conditionally creates a general property tax to fund the city government, and a Business Finance Fund for small and medium businesses. Passed April 6, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-04-06',
    file: 'ordinance_12_business_act.pdf',
    fileSize: '36 KB',
  },
  {
    id: 'ord-11',
    title: 'Ordinance 11 - Public Symbolism and Safety Act',
    description: 'Creates a three-member Committee of Public Symbolism, appointed by the Mayor, to regulate the use of public symbols in the official business of the city. Passed March 12, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-03-12',
    file: 'ordinance_11_public_symbolism_act.pdf',
    fileSize: '95 KB',
  },
  {
    id: 'ord-10',
    title: 'Ordinance 10 - Revised Wimbishville Fair Work and Work–Life Balance Act',
    description: 'A revised version of Ordinance 5 with the same labor standards. The original act loses all enforcement power. Passed March 12, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-03-12',
    file: 'ordinance_10_revised_fair_work_act.pdf',
    fileSize: '126 KB',
  },
  {
    id: 'ord-09',
    title: 'Ordinance 9 - White Text Prohibition in New Legislation Ordinance',
    description: 'Prohibits hidden or unreadable "white text" in newly introduced or adopted legislation and related legislative documents. Passed February 22, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-02-22',
    file: 'ordinance_9_white_text_prohibition.pdf',
    fileSize: '31 KB',
  },
  {
    id: 'ord-08',
    title: 'Ordinance 8 - Revised Fair Ballot Ordinance',
    description: 'Prevents strategic voting by hiding vote tallies from voters until voting has finished. Passed February 22, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-02-22',
    file: 'ordinance_8_revised_fair_ballot.pdf',
    fileSize: '23 KB',
  },
  {
    id: 'ord-07',
    title: 'Ordinance 7 - A Bill to Amend Title III of the Americans with Disabilities Act to Create More Accessible Public Buildings',
    description: 'Requires public buildings in Wimbishville to be more accessible for people with disabilities. Failed February 22, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-02-22',
    file: 'ordinance_7_accessible_public_buildings.pdf',
    fileSize: '55 KB',
  },
  {
    id: 'ord-06',
    title: 'Ordinance 6 - Wimbishville Insulin Affordability and Public Health Act',
    description: 'Aims to lower the cost of insulin by increasing competition in insulin production, and sets up dedicated funding for public health. Failed February 22, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-02-22',
    file: 'ordinance_6_insulin_affordability_act.pdf',
    fileSize: '89 KB',
  },
  {
    id: 'ord-05',
    title: 'Ordinance 5 - Wimbishville Fair Work and Work–Life Balance Act',
    description: 'Reforms labor standards: overtime after 35 hours a week at double pay, a $22 minimum wage, and paid time off. Passed February 11, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-02-11',
    file: 'ordinance_5_fair_work_act.pdf',
    fileSize: '127 KB',
  },
  {
    id: 'ord-04',
    title: 'Ordinance 4 - The Wimbishville Police Act',
    description: 'Creates the Wimbishville Police Department and a conditional Police Services Tax to fund it. Passed January 26, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-01-26',
    file: 'ordinance_4_police_act.pdf',
    fileSize: '33 KB',
  },
  {
    id: 'doc-001',
    title: '1/15 Agenda',
    description: 'Official agenda for the 1/15 council session including all motions on the floor.',
    category: 'agenda',
    uploadedAt: '2026-01-16',
    sessionLabel: 'Session 1 · Cycle 1',
    file: 'agenda-1_15.pdf',
    fileSize: '89 KB',
  },
  {
    id: 'doc-002',
    title: 'Ordinance 1 - Wimbishville Rules of Procedure',
    description: 'Ordinance establishing rules of procedure for the Wimbishville City Council. Passed January 15, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-01-15',
    sessionLabel: 'Session 1 · Cycle 1',
    file: 'ordinance_1_rules_of_procedure.pdf',
    fileSize: '39 KB',
  },
  {
    id: 'doc-003',
    title: 'Ordinance 2 - Treasury Act',
    description: 'An ordinance to establish rules for inattendance and a Wimbishville Treasury. Passed January 15, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-01-15',
    sessionLabel: 'Session 1 · Cycle 1',
    file: 'ordinance_2_treasury_act.pdf',
    fileSize: '12 KB',
  },
  {
    id: 'doc-004',
    title: 'Ordinance 3 - Wimbishville Electoral Code',
    description: 'Ordinance establishing an electoral code for elections within the Wimbishville City Council. Passed January 15, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-01-15',
    sessionLabel: 'Session 1 · Cycle 1',
    file: 'ordinance_3_electoral_code.pdf',
    fileSize: '62 KB',
  },
];

// Reads an uploadedAt date as local midnight. A bare "2026-11-01" parses as UTC, which is the day before in LA.
export const uploadedDate = (iso: string) => new Date(`${iso}T00:00:00`);

// ─── Category display config ─────────────────────────────────────
export const categoryMeta: Record<DocCategory, { label: string; cssClass: string }> = {
  agenda:  { label: 'Agenda',  cssClass: 'badge--agenda'  },
  ordinances: { label: 'Ordinances', cssClass: 'badge--ordinances' },
};
