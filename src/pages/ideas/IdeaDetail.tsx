import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import IdeasLayout from './IdeasLayout';
import { ChipList } from './Chips';
import { deleteIdea, getIdea, type Idea } from './api';

export default function IdeaDetail() {
  const id = Number(useParams().id);
  const navigate = useNavigate();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getIdea(id).then((r) => (r.ok ? setIdea(r.data.idea) : setError(r.error)));
  }, [id]);

  async function onDelete() {
    if (!idea || !window.confirm(`Delete “${idea.title}”? This can't be undone.`)) return;
    setDeleting(true);
    const r = await deleteIdea(id);
    if (r.ok) navigate('/ideas', { replace: true });
    else {
      setDeleting(false);
      setError(r.error);
    }
  }

  return (
    <IdeasLayout back={{ to: '/ideas', label: 'Back to my ideas' }}>
      {!idea && !error && <p className='sc-ideas__muted'>Loading…</p>}
      {!idea && error && <p role='alert' className='sc-ideas__error'>{error}</p>}

      {idea && (
        <article className='sc-ideas__card'>
          <div className='sc-idea-detail__title-row'>
            <h2 className='sc-idea-detail__title'>{idea.title}</h2>
            <div className='sc-ideas__actions'>
              <Link to={`/ideas/${id}/edit`} className='sc-btn sc-btn--outline'>Edit</Link>
              <button type='button' className='sc-btn sc-btn--outline' onClick={onDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>

          <p className='sc-idea-detail__body'>{idea.body}</p>

          {(idea.tags.length > 0 || idea.subtag) && (
            <div className='sc-idea-detail__tags'>
              {idea.tags.length > 0 && (
                <div className='sc-idea-detail__tag-group'>
                  <span>Tags</span>
                  <ChipList kind='tag' labels={idea.tags} />
                </div>
              )}
              {idea.subtag && (
                <div className='sc-idea-detail__tag-group'>
                  <span>Subtag</span>
                  <ChipList kind='subtag' labels={[idea.subtag]} />
                </div>
              )}
            </div>
          )}

          {error && <p role='alert' className='sc-ideas__error'>{error}</p>}

          <hr className='sc-ideas__divider' />

          {/* Not built yet: matching by subtag and sending to council members */}
          <div className='sc-idea-detail__share'>
            <button type='button' className='sc-btn sc-btn--outline' disabled>
              Find people with similar ideas · Coming soon
            </button>
            <button type='button' className='sc-btn sc-btn--primary' disabled>
              Send to Council Member · Coming soon
            </button>
          </div>
        </article>
      )}
    </IdeasLayout>
  );
}
