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
    assignee: 'Yari Milakin',
    order: 1,
  },
  {
    id: 'speaker',
    title: 'Speaker of the Council',
    subtitle: 'Council Presiding Officer',
    description: 'Presides over full council sessions, sets the meeting agenda, and breaks tie votes. Elected by council members.',
    assignee: 'Max Waldman',
    order: 2,
  },
  {
    id: 'pro-tem',
    title: 'President Pro Tempore',
    subtitle: 'Council Leadership',
    description: 'Acts in the Speaker\'s absence. Assists with floor management and committee scheduling.',
    assignee: 'Boyan Manolov',
    order: 3,
  },
  {
    id: 'city-attorney',
    title: 'City Attorney',
    subtitle: 'Legal Affairs',
    description: 'Provides legal counsel to the council and mayor. Reviews motions for legality and advises on ordinances.',
    assignee: 'Henry Schneider',
    order: 4,
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
