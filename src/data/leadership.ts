// ─── Leadership Roster ────────────────────────────────────────────
// Update names and bio details as simulation roles are assigned.
// Set `assignee` to null to show "Seat Vacant".

export interface LeadershipPosition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  assignee: string | null;   // participant name, or null if unassigned
  initials?: string;         // auto-derived if null
  committee?: string;        // relevant committee(s) if applicable
  order: number;             // sort order on the page
}

export const leadershipPositions: LeadershipPosition[] = [
  {
    id: 'mayor',
    title: 'Mayor',
    subtitle: 'Executive Office',
    description: 'Chief executive of the city. Sets policy priorities, proposes the annual budget, and signs or vetoes council ordinances.',
    assignee: null,
    order: 1,
  },
  {
    id: 'speaker',
    title: 'Speaker of the Council',
    subtitle: 'Council Presiding Officer',
    description: 'Presides over full council sessions, sets the meeting agenda, and breaks tie votes. Elected by council members.',
    assignee: null,
    order: 2,
  },
  {
    id: 'pro-tem',
    title: 'President Pro Tempore',
    subtitle: 'Council Leadership',
    description: 'Acts in the Speaker\'s absence. Assists with floor management and committee scheduling.',
    assignee: null,
    order: 3,
  },
  {
    id: 'city-attorney',
    title: 'City Attorney',
    subtitle: 'Legal Affairs',
    description: 'Provides legal counsel to the council and mayor. Reviews motions for legality and advises on ordinances.',
    assignee: null,
    order: 4,
  },
  {
    id: 'controller',
    title: 'City Controller',
    subtitle: 'Fiscal Oversight',
    description: 'Independent auditor of city finances. Reviews the budget and certifies that appropriations are lawful.',
    assignee: null,
    order: 5,
  },
  {
    id: 'whip',
    title: 'Council Whip',
    subtitle: 'Floor Coordination',
    description: 'Coordinates vote counts, ensures quorum, and communicates council positions to members before key votes.',
    assignee: null,
    order: 6,
  },
  {
    id: 'chair-housing',
    title: 'Committee Chair — Housing',
    subtitle: 'Housing & Homelessness Committee',
    description: 'Leads the Housing & Homelessness Committee. Schedules hearings, manages testimony, and reports findings to the full council.',
    assignee: null,
    committee: 'Housing & Homelessness',
    order: 7,
  },
  {
    id: 'chair-budget',
    title: 'Committee Chair — Budget',
    subtitle: 'Budget & Finance Committee',
    description: 'Oversees the Budget & Finance Committee. Reviews departmental funding requests and moves budget motions to the floor.',
    assignee: null,
    committee: 'Budget & Finance',
    order: 8,
  },
  {
    id: 'chair-transport',
    title: 'Committee Chair — Transportation',
    subtitle: 'Transportation Committee',
    description: 'Leads transportation infrastructure hearings. Coordinates with city departments on mobility and transit policy.',
    assignee: null,
    committee: 'Transportation',
    order: 9,
  },
];

// Helper to derive display initials from a name or title
export function getInitials(position: LeadershipPosition): string {
  if (position.initials) return position.initials;
  if (position.assignee) {
    return position.assignee
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  return position.title.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}
