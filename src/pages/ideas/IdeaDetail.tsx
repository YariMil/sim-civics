import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import IdeasLayout from './IdeasLayout';
import { ChipList } from './Chips';
import ComposeDialog from './ComposeDialog';
import {
  deleteIdea,
  formatDate,
  getCouncilMember,
  getIdea,
  markSentToCouncil,
  wasEdited,
  type CouncilMember,
  type Idea,
} from './api';
import { useAuth, type User } from '../../auth/AuthContext';

export default function IdeaDetail() {
  const id = Number(useParams().id);
  const navigate = useNavigate();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();
  const [council, setCouncil] = useState<CouncilMember | null>(null);
  const [loadingCouncil, setLoadingCouncil] = useState(false);

  async function onSendToCouncil() {
    setLoadingCouncil(true);
    setError('');
    const r = await getCouncilMember();
    setLoadingCouncil(false);
    if (r.ok) setCouncil(r.member);
    else setError(r.error);
  }

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

          <dl className='sc-idea-meta'>
            <div>
              <dt>First drafted</dt>
              <dd>{formatDate(idea.createdAt)}</dd>
            </div>
            {wasEdited(idea) && (
              <div>
                <dt>Last edited</dt>
                <dd>{formatDate(idea.updatedAt)}</dd>
              </div>
            )}
            <div>
              <dt>Sent to council member</dt>
              <dd>
                {idea.councilSentAt
                  ? `${formatDate(idea.councilSentAt)}${idea.councilSentTo ? ` · ${idea.councilSentTo}` : ''}`
                  : 'Not yet'}
              </dd>
            </div>
          </dl>

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

          <div className='sc-idea-detail__share'>
            <Link to={`/ideas/${id}/similar`} className='sc-btn sc-btn--outline'>
              Find people with similar ideas
            </Link>
            <button type='button' className='sc-btn sc-btn--primary' onClick={onSendToCouncil} disabled={loadingCouncil}>
              {loadingCouncil ? 'Finding your council member…' : 'Send to Council Member'}
            </button>
          </div>
        </article>
      )}

      {idea && user && council && (
        <ComposeDialog
          to={council.email}
          title={`Email ${council.salutation}`}
          subject={`Idea from a Council District ${council.district} constituent: ${idea.title}`}
          template={councilLetter(idea, council, user)}
          context={
            <>
              Your council member for Council District {council.district} (from your account) is {council.name}.{' '}
              <a href={council.website} target='_blank' rel='noopener noreferrer'>Visit their office's website</a>.
            </>
          }
          onSent={async () => {
            const r = await markSentToCouncil(id);
            if (r.ok) setIdea(r.data.idea);
            return r.ok;
          }}
          onClose={() => setCouncil(null)}
        />
      )}
    </IdeasLayout>
  );
}

// "A", "A and B", "A, B, and C"
function listWithAnd(items: string[]) {
  if (items.length < 3) return items.join(' and ');
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

// A short, formal letter that carries the whole idea.
function councilLetter(idea: Idea, council: CouncilMember, user: User) {
  const topics = listWithAnd(idea.subtag ? [...idea.tags, idea.subtag] : idea.tags);
  return [
    `Dear ${council.salutation},`,
    '',
    `${user.name ? `My name is ${user.name}, and I` : 'I'} live in Council District ${council.district}. I'm writing to share an idea for our community${topics ? ` related to ${topics}` : ''}.`,
    '',
    idea.title,
    '',
    idea.body,
    '',
    "Thank you for your time and for considering this idea. I'd welcome the chance to discuss it with you or your staff.",
    '',
    'Sincerely,',
    user.name || user.email,
    ...(user.name ? [user.email] : []),
  ].join('\n');
}
