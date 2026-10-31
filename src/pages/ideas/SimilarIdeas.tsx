import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IdeasLayout from './IdeasLayout';
import '../../components/SubscribeForm.css';
import IdeaCard from './IdeaCard';
import { Chip } from './Chips';
import { findSimilar, getIdea, type Idea, type SimilarMatch } from './api';
import { useAuth } from '../../auth/AuthContext';

// Figma "Ideas – Similar Ideas". Contact happens outside Sim-Civics: copy the email, or open
// the visitor's own email app with a short template. Nothing is sent or stored by the site.
export default function SimilarIdeas() {
  const id = Number(useParams().id);
  const { user } = useAuth();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [matches, setMatches] = useState<SimilarMatch[] | null>(null);
  const [noTags, setNoTags] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const search = useCallback(async () => {
    setLoading(true);
    setError('');
    const r = await findSimilar(id);
    setLoading(false);
    if (!r.ok) return setError(r.error);
    setMatches(r.data.matches);
    setNoTags(r.data.reason === 'no-tags');
  }, [id]);

  useEffect(() => {
    getIdea(id).then((r) => (r.ok ? setIdea(r.data.idea) : setError(r.error)));
    search();
  }, [id, search]);

  const back = { to: `/ideas/${id}`, label: idea ? `Back to ${idea.title}` : 'Back to idea' };

  return (
    <IdeasLayout back={back}>
      <div className='sc-similar'>
        <section className='sc-similar__yours'>
          <p className='sc-similar__label'>Your idea</p>
          {idea && <IdeaCard idea={idea} />}
        </section>

        <section className='sc-similar__results' aria-live='polite' aria-busy={loading}>
          <h2 className='sc-ideas__subheading'>People with similar ideas</h2>

          {error && <p role='alert' className='sc-ideas__error'>{error}</p>}
          {loading && !matches && <p className='sc-ideas__muted'>Looking for similar ideas…</p>}

          {matches && noTags && (
            <p className='sc-similar__intro'>
              This idea doesn't have any tags yet, so there's nothing to match it on.{' '}
              <Link to={`/ideas/${id}/edit`}>Add tags to your idea</Link> and try again.
            </p>
          )}

          {matches && !noTags && matches.length === 0 && (
            <p className='sc-similar__intro'>
              No members with similar ideas have made their email discoverable yet. Check back later
              as more people share their ideas.
            </p>
          )}

          {matches && matches.length > 0 && idea && (
            <>
              <p className='sc-similar__intro'>
                {matches.length === 1 ? 'One member' : `${matches.length === 2 ? 'Two' : 'Three'} members`} with
                ideas like “{idea.title}”, picked at random. Contact them with your own email.
              </p>
              <ul className='sc-similar__list'>
                {matches.map((m) => (
                  <li key={m.email}>
                    <MatchRow match={m} mine={idea} />
                  </li>
                ))}
              </ul>
              <button type='button' className='sc-btn sc-btn--outline sc-similar__again' onClick={search} disabled={loading}>
                {loading ? 'Looking…' : 'Show different people'}
              </button>
            </>
          )}

          {user && !user.discoverable && (
            <p className='sc-similar__note'>
              Your own email isn't discoverable, so other members won't find you here. You can turn it on
              in <Link to='/account'>your account</Link>.
            </p>
          )}
          <p className='sc-similar__note'>
            Only members who turned on “Make my email discoverable” appear here. Sim-Civics does not
            send or store messages between members.
          </p>
        </section>
      </div>
    </IdeasLayout>
  );
}

// Copies text, falling back to the older copy command where the Clipboard API is blocked.
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  }
}

function useCopyLabel(idle: string) {
  const [state, setState] = useState<'yes' | 'failed' | null>(null);
  async function copy(text: string) {
    setState((await copyText(text)) ? 'yes' : 'failed');
    window.setTimeout(() => setState(null), 2500);
  }
  return { label: state === 'yes' ? 'Copied!' : state === 'failed' ? "Couldn't copy" : idle, copy };
}

function MatchRow({ match, mine }: { match: SimilarMatch; mine: Idea }) {
  const { user } = useAuth();
  const copyEmail = useCopyLabel('Copy email');
  const [composing, setComposing] = useState(false);

  const subject = `Your Sim-Civics idea: ${match.idea.title}`;
  const template = [
    match.name ? `Hi ${match.name},` : 'Hi,',
    '',
    `I found your idea "${match.idea.title}" in the Sim-Civics Ideas Workspace. I'm working on a related idea, "${mine.title}", and we share an interest in ${match.shared.label}.`,
    '',
    'Would you be open to comparing notes, or maybe working on a proposal together?',
    '',
    'Thanks,',
    user?.name ?? '',
  ].join('\n').trimEnd();

  return (
    <article className='sc-similar__row'>
      <div className='sc-similar__contact'>
        {match.name && <p className='sc-similar__name'>{match.name}</p>}
        <p className={match.name ? 'sc-similar__email' : 'sc-similar__email sc-similar__email--only'}>{match.email}</p>
        <div className='sc-similar__shared'>
          <span>Shared {match.shared.kind}</span>
          <Chip kind={match.shared.kind} label={match.shared.label} />
        </div>
      </div>
      <div className='sc-similar__theirs'>
        <p className='sc-similar__eyebrow'>Their idea</p>
        <h3 className='sc-similar__title'>{match.idea.title}</h3>
        <p className='sc-similar__summary'>{match.idea.summary}</p>
      </div>
      <div className='sc-similar__actions'>
        <button type='button' className='sc-btn sc-btn--outline' onClick={() => copyEmail.copy(match.email)}>
          {copyEmail.label}
        </button>
        <button type='button' className='sc-btn sc-btn--primary' onClick={() => setComposing(true)}>
          Send email
        </button>
      </div>
      {composing && (
        <ComposeDialog
          to={match.email}
          toName={match.name}
          subject={subject}
          template={template}
          onClose={() => setComposing(false)}
        />
      )}
    </article>
  );
}

// Apple Mail has no web address; on Apple devices mailto: opens it unless another app is the default.
const ON_APPLE_DEVICE = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

/*
  The message is sent from the visitor's own email account: each button hands the text to
  Gmail, Outlook.com or their mail app. Sim-Civics never sends or stores it.
*/
function ComposeDialog({
  to,
  toName,
  subject,
  template,
  onClose,
}: {
  to: string;
  toName: string;
  subject: string;
  template: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const [body, setBody] = useState(template);
  const copyMessage = useCopyLabel('Copy message');

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  const q = encodeURIComponent;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${q(to)}&su=${q(subject)}&body=${q(body)}`;
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${q(to)}&subject=${q(subject)}&body=${q(body)}`;
  const mailto = `mailto:${to}?subject=${q(subject)}&body=${q(body)}`;

  return (
    <dialog ref={ref} className='sc-compose' aria-labelledby={`${uid}-title`} onClose={onClose}>
      <form method='dialog' className='sc-form sc-compose__inner'>
        <div className='sc-compose__head'>
          <h2 id={`${uid}-title`} className='sc-compose__title'>Email {toName || to}</h2>
          <button type='submit' className='sc-compose__close' aria-label='Close'>×</button>
        </div>
        <p className='sc-compose__to'>
          To: <strong>{to}</strong>
          <br />
          Subject: {subject}
        </p>
        <div className='sc-field'>
          <label htmlFor={`${uid}-body`}>Your message (edit it however you like)</label>
          <textarea
            id={`${uid}-body`}
            rows={9}
            maxLength={4000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <p className='sc-compose__hint'>Choose where to send it from. It opens with this message filled in.</p>
        <div className='sc-compose__actions'>
          <a className='sc-btn sc-btn--primary' href={gmail} target='_blank' rel='noopener noreferrer'>
            Open in Gmail
          </a>
          <a className='sc-btn sc-btn--primary' href={outlook} target='_blank' rel='noopener noreferrer'>
            Open in Outlook.com
          </a>
          <a className='sc-btn sc-btn--outline' href={mailto}>
            {ON_APPLE_DEVICE ? 'Open in Apple Mail' : 'Open my email app'}
          </a>
          <button
            type='button'
            className='sc-btn sc-btn--outline'
            onClick={() => copyMessage.copy(`To: ${to}\nSubject: ${subject}\n\n${body}`)}
          >
            {copyMessage.label}
          </button>
        </div>
        <p className='sc-similar__note'>Sim-Civics doesn't send or keep a copy of this message.</p>
      </form>
    </dialog>
  );
}
