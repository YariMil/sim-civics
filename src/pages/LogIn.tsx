import { useId, useRef, useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useAuth } from '../auth/AuthContext';
import '../styles/sim-civics-tokens.css';
import '../components/SubscribeForm.css';
import './SignUp.css';

const SITE_KEY = '0x4AAAAAAFr_0iYfpD7W-5oP';

// Same layout as the Figma "Sign Up" frame, with only email and password.
export default function LogIn() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  // Pages that require an account send people here with { from } so we can return them.
  const from = (useLocation().state as { from?: string } | null)?.from ?? '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const widget = useRef<TurnstileInstance>(null);

  if (user) return <Navigate to={from} replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, token }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setUser(data.user);
        navigate(from, { replace: true });
        return;
      }
      setError(data.error ?? 'Something went wrong. Please try again.');
    } catch {
      setError('Network error. Please try again.');
    }
    setSending(false);
    widget.current?.reset(); // Turnstile tokens are single-use
    setToken('');
  }

  return (
    <main className='sc-signup'>
      <div className='sc-signup__inner'>
        <div className='sc-heading'>
          <h1>Log In</h1>
          <span className='sc-heading__rule' aria-hidden='true' />
        </div>

        <div className='sc-signup__body'>
          <section className='sc-signup__intro'>
            <div className='sc-signup__bar' aria-hidden='true' />
            <h2>Welcome back</h2>
            <p>Log in to pick up where you left off on resources and keep working on your ideas.</p>
          </section>

          <form className='sc-form' onSubmit={onSubmit}>
            <h2 className='sc-form__title'>Log in</h2>

            <div className='sc-field'>
              <label htmlFor={id('email')}>Email</label>
              <input
                id={id('email')}
                type='email'
                required
                maxLength={254}
                autoComplete='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='sc-field'>
              <label htmlFor={id('password')}>Password</label>
              <input
                id={id('password')}
                type='password'
                required
                autoComplete='current-password'
                placeholder='Your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Turnstile ref={widget} siteKey={SITE_KEY} onSuccess={setToken} />

            <button type='submit' className='sc-form__submit' disabled={!token || sending}>
              {sending ? 'Logging in…' : 'Log in'}
            </button>

            {error && <p role='alert' className='sc-form__error'>{error}</p>}

            <p className='sc-form__login'>
              New to Sim-Civics? <Link to='/sign-up'>Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
