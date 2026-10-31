export type Idea = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  subtag: string | null;
  createdAt: number; // first drafted
  updatedAt: number; // last edited
  councilSentAt: number | null; // when the member said they emailed it to their council member
  councilSentTo: string | null;
};

export type IdeaInput = Pick<Idea, 'title' | 'body' | 'tags' | 'subtag'>;

type Result<T> = { ok: true; data: T } | { ok: false; status: number; error: string };

async function request<T>(path: string, init?: RequestInit): Promise<Result<T>> {
  try {
    const res = await fetch(`/api/ideas${path}`, {
      ...init,
      headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true, data };
    return { ok: false, status: res.status, error: data.error ?? 'Something went wrong. Please try again.' };
  } catch {
    return { ok: false, status: 0, error: 'Network error. Please try again.' };
  }
}

export const listIdeas = () => request<{ ideas: Idea[] }>('');
export const getIdea = (id: number) => request<{ idea: Idea }>(`/${id}`);
export const createIdea = (idea: IdeaInput) =>
  request<{ idea: Idea }>('', { method: 'POST', body: JSON.stringify(idea) });
export const updateIdea = (id: number, idea: IdeaInput) =>
  request<{ idea: Idea }>(`/${id}`, { method: 'PUT', body: JSON.stringify(idea) });
export const deleteIdea = (id: number) => request<{ ok: true }>(`/${id}`, { method: 'DELETE' });
export const markSentToCouncil = (id: number) =>
  request<{ idea: Idea }>(`/${id}/council-sent`, { method: 'POST' });

export const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Saving within a minute of creating counts as the first draft, not an edit.
export const wasEdited = (idea: Idea) => idea.updatedAt - idea.createdAt > 60_000;

export type SimilarMatch = {
  name: string; // may be empty for older accounts
  email: string;
  shared: { kind: 'subtag' | 'tag'; label: string };
  idea: { title: string; summary: string };
};

// "no-tags": the idea has no tags, so there is nothing to match on.
export const findSimilar = (id: number) =>
  request<{ matches: SimilarMatch[]; reason?: 'no-tags' }>(`/${id}/similar`);

export type CouncilMember = {
  district: number;
  name: string;
  salutation: string;
  email: string;
  website: string;
};

// The council member for the district on the signed-in member's account.
export async function getCouncilMember(): Promise<{ ok: true; member: CouncilMember } | { ok: false; error: string }> {
  try {
    const res = await fetch('/api/council-member');
    const data = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true, member: data.member };
    return { ok: false, error: data.error ?? 'Something went wrong. Please try again.' };
  } catch {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}
