// ─── Document types ───────────────────────────────────────────────
// Add new documents here. The `file` path is relative to /public/documents/
// Set `file: null` for placeholders while documents are being uploaded.

export type DocCategory = 'agenda' | 'ordinances';

export interface CouncilDocument {
  id: string;
  title: string;
  description: string;
  category: DocCategory;
  uploadedAt: string;     // ISO date string
  sessionLabel: string;   // e.g. "Session 4, Cycle 2"
  file: string | null;    // filename in /public/documents/ — null = coming soon
  fileSize?: string;      // display string, e.g. "340 KB"
}

export const documents: CouncilDocument[] = [
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
    uploadedAt: '2026-01-16',
    sessionLabel: 'Session 1 · Cycle 1',
    file: 'ordinance_1_rules_of_procedure.pdf',
    fileSize: '94 KB',
  },
  {
    id: 'doc-003',
    title: 'Ordinance 2 - Treasury Act',
    description: 'An ordinance to establish rules for inattendance and a Wimbishville Treasury. Passed January 15, 2026.',
    category: 'ordinances',
    uploadedAt: '2026-01-16',
    sessionLabel: 'Session 1 · Cycle 1',
    file: null,
    fileSize: undefined,
  },
  {
    id: 'doc-004',
    title: 'Ordinance 3 - Wimbishville Electoral Code',
    description: 'Ordinance establishing an electoral code for elections within the Wimbishville City Council',
    category: 'ordinances',
    uploadedAt: '2026-01-16',
    sessionLabel: 'Session 1 · Cycle 1',
    file: 'ordinance_3_electoral_code.pdf',
    fileSize: '83 KB',
  },
];

// ─── Category display config ─────────────────────────────────────
export const categoryMeta: Record<DocCategory, { label: string; cssClass: string }> = {
  agenda:  { label: 'Agenda',  cssClass: 'badge--agenda'  },
  ordinances: { label: 'Ordinances', cssClass: 'badge--ordinances' },
};
