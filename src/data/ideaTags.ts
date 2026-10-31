/**
 * Tag choices for the Ideas Workspace (Figma "Ideas – New Idea").
 * Shared by the editor and the Worker, which rejects anything not listed here.
 * Subtags are what "Find people with similar ideas" will match on later.
 */
export const TAGS = ['Economy', 'Environment', 'Housing', 'Transportation'] as const;
export const SUBTAGS = ['Taxes', 'Parks', 'Zoning', 'Transit'] as const;

export const MAX_TITLE = 120;
export const MAX_BODY = 10000;
