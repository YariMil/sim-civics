import { useState } from 'react';
import AiConfirmDialog from './AiConfirmDialog';
import {
  polishWithAi,
  suggestWithAi,
  type AiDraft,
  type AiSuggestion,
  type IdeaInput,
  type PolishedVersion,
} from './api';
import { IDEA_SECTIONS, type IdeaSectionKey } from './sections';
import './RefineWithAi.css';

// Figma "Ideas – Polish with AI" and "Ideas – Suggest New Ideas": the "Refine with AI" part of the editor.

const VERSION_NAMES = ['Clearer and shorter', 'More formal'];
const sectionFor = (key: IdeaSectionKey) => IDEA_SECTIONS.find((s) => s.key === key)!;

type Polish = { original: AiDraft; versions: PolishedVersion[] };
type Suggest = { forTitle: string; items: AiSuggestion[]; added: boolean[] };
type Pending = { kind: 'polish'; index: number } | { kind: 'suggest'; index: number };

// "A", "A and B", "A, B, and C"
const listWithAnd = (items: string[]) =>
  items.length < 3 ? items.join(' and ') : `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;

export default function RefineWithAi({
  draft,
  onApply,
}: {
  draft: AiDraft;
  onApply: (patch: Partial<IdeaInput>) => void;
}) {
  const [loading, setLoading] = useState<'polish' | 'suggest' | null>(null);
  const [error, setError] = useState('');
  const [polish, setPolish] = useState<Polish | null>(null);
  const [suggest, setSuggest] = useState<Suggest | null>(null);
  const [pending, setPending] = useState<Pending | null>(null);
  const hasIdea = draft.body.trim() !== '';

  async function onPolish() {
    setLoading('polish');
    setError('');
    const original = { ...draft };
    const r = await polishWithAi(original);
    setLoading(null);
    if (!r.ok) return setError(r.error);
    setSuggest(null);
    setPolish({ original, versions: r.data.versions });
  }

  async function onSuggest() {
    setLoading('suggest');
    setError('');
    const r = await suggestWithAi(draft);
    setLoading(null);
    if (!r.ok) return setError(r.error);
    setPolish(null);
    const items = r.data.suggestions;
    setSuggest({ forTitle: draft.title.trim(), items, added: items.map(() => false) });
  }

  // Only the parts the member had written are replaced, so anything typed since stays.
  function applyPolished(index: number) {
    if (!polish) return;
    const v = polish.versions[index];
    const patch: Partial<IdeaInput> = {};
    for (const s of IDEA_SECTIONS) if (polish.original[s.key]) patch[s.key] = v[s.key];
    onApply(patch);
    setPolish(null);
  }

  const appended = (s: AiSuggestion) => {
    const current = draft[s.section].trim();
    return current ? `${current}\n\n${s.text}` : s.text;
  };

  function addSuggestion(index: number) {
    if (!suggest) return;
    const s = suggest.items[index];
    onApply({ [s.section]: appended(s) });
    setSuggest({ ...suggest, added: suggest.added.map((a, i) => a || i === index) });
  }

  return (
    <div className='sc-ai'>
      <p className='sc-ai__label'>Refine with AI</p>
      <div className='sc-ai__modes'>
        <button
          type='button'
          className='sc-ai__mode'
          aria-pressed={polish !== null || loading === 'polish'}
          disabled={!hasIdea || loading !== null}
          onClick={onPolish}
        >
          {loading === 'polish' ? 'Polishing…' : 'Polish with AI'}
        </button>
        <button
          type='button'
          className='sc-ai__mode'
          aria-pressed={suggest !== null || loading === 'suggest'}
          disabled={!hasIdea || loading !== null}
          onClick={onSuggest}
        >
          {loading === 'suggest' ? 'Thinking of ideas…' : 'Suggest new ideas'}
        </button>
      </div>
      {!hasIdea && <p className='sc-ai__hint'>Write what your idea is first, then AI can help refine it.</p>}
      {error && <p role='alert' className='sc-ideas__error'>{error}</p>}

      {polish && (
        <section className='sc-ai__panel' aria-labelledby='sc-ai-polish-title'>
          <h3 id='sc-ai-polish-title' className='sc-ai__title'>Polished versions</h3>
          <p className='sc-ai__subtitle'>Compare the versions, then choose one to use or keep your own.</p>
          <div className='sc-ai__cards'>
            <div className='sc-ai__card sc-ai__card--mine'>
              <h4 className='sc-ai__card-title'>Your version</h4>
              <VersionText version={polish.original} />
            </div>
            {polish.versions.map((v, i) => (
              <div key={i} className='sc-ai__card sc-ai__card--polished'>
                <h4 className='sc-ai__card-title'>
                  Version {i + 1}
                  <span className='sc-ai__card-kind'>{VERSION_NAMES[i]}</span>
                </h4>
                <VersionText version={v} />
                {v.changes.length > 0 && (
                  <div className='sc-ai__changes'>
                    <p>What changed</p>
                    <ul>
                      {v.changes.map((c, j) => <li key={j}>{c}</li>)}
                    </ul>
                  </div>
                )}
                <button
                  type='button'
                  className='sc-btn sc-btn--primary sc-ai__card-action'
                  onClick={() => setPending({ kind: 'polish', index: i })}
                >
                  Use version {i + 1}
                </button>
              </div>
            ))}
          </div>
          <button type='button' className='sc-btn sc-btn--outline' onClick={() => setPolish(null)}>
            Keep my version
          </button>
        </section>
      )}

      {suggest && (
        <section className='sc-ai__panel' aria-labelledby='sc-ai-suggest-title'>
          <h3 id='sc-ai-suggest-title' className='sc-ai__title'>
            New ideas for {suggest.forTitle ? `“${suggest.forTitle}”` : 'your idea'}
          </h3>
          <p className='sc-ai__subtitle'>
            Add either one to your idea, or press “Suggest new ideas” again for different ones.
          </p>
          <div className='sc-ai__cards'>
            {suggest.items.map((s, i) => {
              const section = sectionFor(s.section);
              return (
                <div key={i} className='sc-ai__card sc-ai__card--suggestion'>
                  <p className={`sc-ai__section sc-idea-section--${s.section}`}>
                    <span className='sc-idea-section__icon' aria-hidden='true'>
                      <img src={section.icon} alt='' width={18} height={18} />
                    </span>
                    {section.heading}
                  </p>
                  <h4 className='sc-ai__card-title'>{s.title}</h4>
                  <p className='sc-ai__text'>{s.text}</p>
                  <button
                    type='button'
                    className='sc-btn sc-btn--outline sc-ai__card-action'
                    disabled={suggest.added[i]}
                    onClick={() => setPending({ kind: 'suggest', index: i })}
                  >
                    {suggest.added[i] ? '✓ Added' : '+ Add to my idea'}
                  </button>
                </div>
              );
            })}
          </div>
          <button type='button' className='sc-btn sc-btn--outline' onClick={() => setSuggest(null)}>
            Close suggestions
          </button>
        </section>
      )}

      {pending?.kind === 'polish' && polish && (
        <AiConfirmDialog
          title={`Use version ${pending.index + 1}?`}
          confirmLabel={`Yes, use version ${pending.index + 1}`}
          onConfirm={() => {
            applyPolished(pending.index);
            setPending(null);
          }}
          onClose={() => setPending(null)}
        >
          <p className='sc-compose__hint'>
            This replaces what you wrote for{' '}
            {listWithAnd(IDEA_SECTIONS.filter((s) => polish.original[s.key]).map((s) => s.heading.toLowerCase()))}{' '}
            with version {pending.index + 1}.
          </p>
          <div className='sc-ai__quote'>
            <VersionText version={polish.versions[pending.index]} />
          </div>
        </AiConfirmDialog>
      )}

      {pending?.kind === 'suggest' && suggest && (() => {
        const s = suggest.items[pending.index];
        const section = sectionFor(s.section);
        const fits = appended(s).length <= section.max;
        return (
          <AiConfirmDialog
            title='Add this to your idea?'
            confirmLabel='Yes, add it'
            canConfirm={fits}
            onConfirm={() => {
              addSuggestion(pending.index);
              setPending(null);
            }}
            onClose={() => setPending(null)}
          >
            <p className='sc-compose__hint'>
              This adds “{s.title}” to <strong>{section.heading}</strong>
              {draft[s.section].trim() ? ', after what you already wrote' : ''}:
            </p>
            <div className='sc-ai__quote'>
              <p className='sc-ai__text'>{s.text}</p>
            </div>
            {!fits && (
              <p role='alert' className='sc-ideas__error'>
                There isn't room for this in {section.heading.toLowerCase()}. Shorten what's there first.
              </p>
            )}
          </AiConfirmDialog>
        );
      })()}
    </div>
  );
}

// The parts of a version that have text, each under its heading.
function VersionText({ version }: { version: Pick<AiDraft, IdeaSectionKey> }) {
  return (
    <>
      {IDEA_SECTIONS.filter((s) => version[s.key]).map((s) => (
        <div key={s.key} className='sc-ai__part'>
          <p className='sc-ai__part-heading'>{s.heading}</p>
          <p className='sc-ai__text'>{version[s.key]}</p>
        </div>
      ))}
    </>
  );
}
