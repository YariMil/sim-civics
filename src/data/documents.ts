// ─── Document types ───────────────────────────────────────────────
// Add new documents here. The `file` path is relative to /public/documents/
// Set `file: null` for placeholders while documents are being uploaded.

export type DocCategory = 'agenda' | 'minutes' | 'report' | 'motion' | 'notice' | 'new';

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
    title: 'Council Agenda — Session 4, Cycle 2',
    description: 'Official agenda for the upcoming full council session including all motions on the floor.',
    category: 'agenda',
    uploadedAt: '2026-06-04',
    sessionLabel: 'Session 4 · Cycle 2',
    file: 'agenda-s4c2.pdf',
    fileSize: '210 KB',
  },
  {
    id: 'doc-002',
    title: 'Housing Committee Meeting Minutes',
    description: 'Approved minutes from the Housing & Homelessness Committee, May 28 session.',
    category: 'minutes',
    uploadedAt: '2026-05-30',
    sessionLabel: 'Session 4 · Cycle 1',
    file: 'minutes-housing-0528.pdf',
    fileSize: '340 KB',
  },
  {
    id: 'doc-003',
    title: 'Budget Allocation Report — FY2026',
    description: 'Fiscal year overview and departmental allocation figures presented to the full council.',
    category: 'report',
    uploadedAt: '2026-05-15',
    sessionLabel: 'Session 3 · Cycle 4',
    file: 'budget-fy2026.pdf',
    fileSize: '1.2 MB',
  },
  {
    id: 'doc-004',
    title: 'Motion 26-041 — Transportation Infrastructure',
    description: 'Proposed motion to authorize study of expanded bike lane network across Districts 4, 5, and 11.',
    category: 'motion',
    uploadedAt: '2026-06-06',
    sessionLabel: 'Session 4 · Cycle 2',
    file: null,
    fileSize: undefined,
  },
  {
    id: 'doc-005',
    title: 'Public Notice — Zoning Variance Hearing',
    description: 'Notice of public hearing on zoning variance request in District 7. Public comment open.',
    category: 'notice',
    uploadedAt: '2026-06-01',
    sessionLabel: 'Session 4 · Cycle 1',
    file: 'notice-zoning-d7.pdf',
    fileSize: '95 KB',
  },
];

// ─── Category display config ─────────────────────────────────────
export const categoryMeta: Record<DocCategory, { label: string; cssClass: string }> = {
  agenda:  { label: 'Agenda',  cssClass: 'badge--agenda'  },
  minutes: { label: 'Minutes', cssClass: 'badge--minutes' },
  report:  { label: 'Report',  cssClass: 'badge--report'  },
  motion:  { label: 'Motion',  cssClass: 'badge--new'     },
  notice:  { label: 'Notice',  cssClass: 'badge--report'  },
  new:     { label: 'New',     cssClass: 'badge--new'     },
};
