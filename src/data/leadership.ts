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
    assignee: 'Hal Craig',
    order: 1,
  },
  {
    id: 'speaker',
    title: 'Speaker of the Council',
    subtitle: 'Council Presiding Officer',
    description: 'Presides over full council sessions, sets the meeting agenda, and breaks tie votes. Elected by council members.',
    assignee: 'Yari Milakin',
    order: 3,
  },
  {
    id: 'dep-mayor',
    title: 'Deputy Mayor',
    subtitle: 'Council Leadership',
    description: 'Acts in the Mayor\'s absence. Assists Speaker of the Council with scheduling. Elected by council members',
    assignee: 'Boyan Manolov',
    order: 2,
  },
  {
    id: 'city-attorney',
    title: 'Sergeant-At-Arms',
    subtitle: 'Council Officer',
    description: 'Maintains decorum in the Council. Enforces Council procedure and serves as the main enforcement authority in the City Council',
    assignee: 'Zev Craig',
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
