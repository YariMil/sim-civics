import { useEffect, useId, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IdeasLayout from './IdeasLayout';
import '../../components/SubscribeForm.css';
import { TagPicker } from './Chips';
import { createIdea, getIdea, updateIdea, type IdeaInput } from './api';
import { MAX_BODY, MAX_TITLE } from '../../data/ideaTags';

const EMPTY: IdeaInput = { title: '', body: '', tags: [], subtag: null };

// "Ideas – New Idea" at /ideas/new and "Ideas – Edit Idea" at /ideas/:id/edit.
export default function IdeaEditor() {
  const params = useParams();
  const id = params.id ? Number(params.id) : null;
  const navigate = useNavigate();
  const uid = useId();

  const [idea, setIdea] = useState<IdeaInput | null>(id === null ? EMPTY : null);
  const [savedTitle, setSavedTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id === null) return;
    getIdea(id).then((r) => {
      if (!r.ok) return setError(r.error);
      const { title, body, tags, subtag } = r.data.idea;
      setIdea({ title, body, tags, subtag });
      setSavedTitle(title);
    });
  }, [id]);

  const backTo = id === null ? '/ideas' : `/ideas/${id}`;
  const back = { to: backTo, label: id === null ? 'Back to my ideas' : `Back to ${savedTitle || 'idea'}` };

  if (!idea) {
    return (
      <IdeasLayout back={back}>
        {error ? <p role='alert' className='sc-ideas__error'>{error}</p> : <p className='sc-ideas__muted'>Loading…</p>}
      </IdeasLayout>
    );
  }

  const set = (patch: Partial<IdeaInput>) => setIdea({ ...idea, ...patch });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (saving || !idea) return;
    setSaving(true);
    setError('');
    const r = id === null ? await createIdea(idea) : await updateIdea(id, idea);
    if (r.ok) {
      navigate(`/ideas/${r.data.idea.id}`, { replace: true });
      return;
    }
    setSaving(false);
    setError(r.error);
  }

  return (
    <IdeasLayout back={back}>
      <form className='sc-ideas__card sc-form' onSubmit={onSubmit}>
        <h2 className='sc-form__title'>{id === null ? 'New idea' : 'Edit idea'}</h2>

        <div className='sc-field'>
          <label htmlFor={`${uid}-title`}>Idea name</label>
          <input
            id={`${uid}-title`}
            type='text'
            required
            maxLength={MAX_TITLE}
            placeholder='Enter a short name for your idea'
            value={idea.title}
            onChange={(e) => set({ title: e.target.value })}
          />
        </div>

        <div className='sc-field'>
          <label htmlFor={`${uid}-body`}>Your idea</label>
          <textarea
            id={`${uid}-body`}
            required
            rows={6}
            maxLength={MAX_BODY}
            placeholder='What is your idea? What are the main points? How would you like it to be put into practice?'
            value={idea.body}
            onChange={(e) => set({ body: e.target.value })}
          />
        </div>

        <TagPicker tags={idea.tags} subtag={idea.subtag} onChange={set} />

        <div className='sc-ideas__actions'>
          <button type='submit' className='sc-btn sc-btn--primary' disabled={saving}>
            {saving ? 'Saving…' : 'Save idea'}
          </button>
          <button type='button' className='sc-btn sc-btn--outline' onClick={() => navigate(backTo)}>
            Cancel
          </button>
        </div>

        {error && <p role='alert' className='sc-form__error'>{error}</p>}

        <p className='sc-ideas__disclaimer'>
          Note: Sim-Civics is not responsible for any ideas expressed in the Ideas Workspace by
          artificial intelligence or a person.
        </p>
      </form>
    </IdeasLayout>
  );
}
