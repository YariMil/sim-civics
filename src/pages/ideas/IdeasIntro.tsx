import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IdeasLayout from './IdeasLayout';
import IdeasWorkspace from './IdeasWorkspace';
import RequireAuth from '../../components/RequireAuth';
import { IDEA_SECTIONS } from './sections';
import './IdeasIntro.css';

// Remembers, per browser, that the intro was shown, so /ideas opens straight to the workspace afterwards.
const SEEN_KEY = 'sc-ideas-intro-seen';

function introSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Without storage the intro shows on each visit, which is harmless.
  }
}

// Figma "Ideas – Intro": shown to everyone, signed in or not.
export default function IdeasIntro({ onContinue }: { onContinue?: () => void }) {
  const navigate = useNavigate();

  function open() {
    markIntroSeen();
    if (onContinue) onContinue();
    else navigate('/ideas');
  }

  return (
    <IdeasLayout>
      <div className='sc-intro'>
        <div className='sc-intro__hero'>
          <h2 className='sc-intro__headline'>
            Turn a local concern into a clearer{' '}
            <span className='sc-intro__mark'>civic idea.</span>
          </h2>
          <p className='sc-intro__text'>
            Maybe you’ve noticed a problem, a need, or a possibility in your neighborhood. This space
            helps you slow down, think it through, and describe it more clearly.
          </p>
        </div>

        <section className='sc-intro__begin' aria-labelledby='sc-intro-begin'>
          <h3 id='sc-intro-begin' className='sc-intro__label'>Before you begin</h3>
          <ul className='sc-intro__pills'>
            {IDEA_SECTIONS.map((s) => (
              <li key={s.key} className={`sc-intro__pill sc-intro__pill--${s.key}`}>
                <img src={s.icon} alt='' width={26} height={26} />
                {s.step}
              </li>
            ))}
          </ul>
        </section>

        <figure className='sc-intro__path'>
          <img
            src='/images/ideas-intro/guided-path.svg'
            width={1120}
            height={240}
            alt='A tangled scribble becomes a clear idea card after three steps: clarify your idea, pin down the place, and think through impacts.'
          />
          <figcaption>A guided path from instinct to action.</figcaption>
        </figure>

        <button type='button' className='sc-btn sc-btn--primary sc-intro__open' onClick={open}>
          Open the Ideas Workspace <span aria-hidden='true'>→</span>
        </button>
      </div>
    </IdeasLayout>
  );
}

// /ideas: the intro on a browser's first visit, then the workspace (which asks signed-out visitors to log in).
export function IdeasHome() {
  const [seen, setSeen] = useState(introSeen);
  if (!seen) return <IdeasIntro onContinue={() => setSeen(true)} />;
  return (
    <RequireAuth>
      <IdeasWorkspace />
    </RequireAuth>
  );
}
