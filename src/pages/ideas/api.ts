export type Idea = {
  id: number;
  title: string;
  body: string; // what it is
  place: string; // where it would take place ('' if not added)
  impacts: string; // intended impacts ('' if not added)
  tags: string[];
  subtag: string | null;
  createdAt: number; // first drafted
  updatedAt: number; // last edited
  councilSentAt: number | null; // when the member said they emailed it to their council member
  councilSentTo: string | null;
};

export type IdeaInput = Pick<Idea, 'title' | 'body' | 'place' | 'impacts' | 'tags' | 'subtag'>;

type Result<T> = { ok: true; data: T } | { ok: false; status: number; error: string };

async function apiRequest<T>(url: string, init?: RequestInit): Promise<Result<T>> {
  try {
    const res = await fetch(url, {
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

const request = <T>(path: string, init?: RequestInit) => apiRequest<T>(`/api/ideas${path}`, init);

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

/* Refine with AI: works on the unsaved text in the editor. */

export type AiDraft = Pick<IdeaInput, 'title' | 'body' | 'place' | 'impacts'>;

export type PolishedVersion = { body: string; place: string; impacts: string; changes: string[] };

export type AiSuggestion = { section: 'body' | 'place' | 'impacts'; title: string; text: string };

const postDraft = <T>(url: string, { title, body, place, impacts }: AiDraft) =>
  apiRequest<T>(url, { method: 'POST', body: JSON.stringify({ title, body, place, impacts }) });

// Two polished versions: the first plainer and shorter, the second more formal.
export const polishWithAi = (draft: AiDraft) => postDraft<{ versions: PolishedVersion[] }>('/api/ai/polish', draft);

// Two new ideas, each meant to be added to one part of the idea.
export const suggestWithAi = (draft: AiDraft) => postDraft<{ suggestions: AiSuggestion[] }>('/api/ai/suggest', draft);
