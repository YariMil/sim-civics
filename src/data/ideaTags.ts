/**
 * Tag choices for the Ideas Workspace. Shared by the editor and the Worker, which rejects
 * anything not listed here.
 *
 * An idea has up to MAX_TAGS general tags and at most one subtag, which must belong to one of
 * its tags. Subtags are what "Find people with similar ideas" will match on, so every subtag
 * name must be unique across all groups.
 */
export const TAG_GROUPS = {
  Economy: ['Jobs & Wages', 'Small Business', 'City Budget', 'Tourism & Events'],
  Taxes: ['Property Tax', 'Sales Tax', 'Business Tax', 'Fees & Fines'],
  Environment: ['Parks & Green Space', 'Climate & Energy', 'Air & Water Quality', 'Waste & Recycling', 'Urban Trees'],
  Housing: ['Affordable Housing', 'Homelessness', 'Zoning & Development', 'Renter Protections'],
  Transportation: ['Public Transit', 'Biking & Walking', 'Streets & Traffic', 'Parking'],
  'Public Safety': ['Policing', 'Fire & Emergency Services', 'Traffic Safety', 'Disaster Preparedness'],
  'Education & Youth': ['Libraries', 'Youth Programs', 'Schools & Childcare'],
  Health: ['Public Health', 'Mental Health', 'Food Access'],
  'Community & Culture': ['Arts & Culture', 'Neighborhood Councils', 'Immigrant Services'],
  Government: ['Transparency & Ethics', 'Elections & Voting', 'City Services & 311'],
} as const satisfies Record<string, readonly string[]>;

export type Tag = keyof typeof TAG_GROUPS;

export const TAGS = Object.keys(TAG_GROUPS) as Tag[];
export const MAX_TAGS = 2;

export const isTag = (name: unknown): name is Tag => typeof name === 'string' && name in TAG_GROUPS;

// The subtags available once these tags are chosen.
export const subtagsFor = (tags: readonly string[]): readonly string[] =>
  tags.filter(isTag).flatMap((t) => TAG_GROUPS[t]);

export const MAX_TITLE = 120;
export const MAX_BODY = 10000; // also the limit for intended impacts
export const MAX_PLACE = 1000;
