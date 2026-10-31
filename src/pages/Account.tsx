import { useId, useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth, type User } from '../auth/AuthContext';
import '../styles/sim-civics-tokens.css';
import '../components/SubscribeForm.css';
import './SignUp.css';

type Result = { ok: true; user: User } | { ok: false; error: string };

// Posts to an /api/account/* route and returns the updated user or an error message.
async function updateAccount(path: string, body: unknown): Promise<Result> {
  try {
    const res = await fetch(`/api/account/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true, user: data.user };
    return { ok: false, error: data.error ?? 'Something went wrong. Please try again.' };
  } catch {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}

export default function Account() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <main className='sc-signup' aria-busy='true' />;
  if (!user) return <Navigate to='/log-in' replace state={{ from: '/account' }} />;

  async function onLogout() {
    await logout();
    navigate('/');
  }

  return (
    <main className='sc-signup'>
      <div className='sc-signup__inner'>
        <div className='sc-heading'>
          <h1>Your Account</h1>
          <span className='sc-heading__rule' aria-hidden='true' />
        </div>

        <div className='sc-signup__body'>
          <section className='sc-signup__intro'>
            <div className='sc-signup__bar' aria-hidden='true' />
            <h2>You're signed in</h2>
            <p>Your account is where your progress on resources and your work in the Ideas Workspace will be saved.</p>
          </section>

          <div className='sc-account__stack'>
            <div className='sc-form'>
              <h2 className='sc-form__title'>Account details</h2>
              <dl className='sc-account'>
                <dt>Email</dt>
                <dd>{user.email}</dd>
                <dt>LA Council District</dt>
                <dd>CD {user.district}</dd>
                <dt>Organization</dt>
                <dd>{user.affiliated === 'yes' && user.organization ? user.organization : 'None'}</dd>
              </dl>
              <DiscoverableSwitch user={user} />
              <button type='button' className='sc-form__secondary' onClick={onLogout}>
                Log out
              </button>
            </div>
            <ChangeEmailForm />
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
}

// Saves as soon as it's flipped, and flips back if the save fails.
function DiscoverableSwitch({ user }: { user: User }) {
  const uid = useId();
  const { setUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function onChange(discoverable: boolean) {
    setSaving(true);
    setError('');
    setUser({ ...user, discoverable });
    const result = await updateAccount('discoverable', { discoverable });
    setSaving(false);
    if (result.ok) setUser(result.user);
    else {
      setUser(user);
      setError(result.error);
    }
  }

  return (
    <>
      <div className='sc-switch'>
        <div>
          <label htmlFor={`${uid}-switch`}>Make my email discoverable to other members</label>
          <p id={`${uid}-hint`} className='sc-field__hint'>
            Members with an idea that shares a subtag with yours can see your email and contact you
            outside Sim-Civics. You can turn this off anytime.
          </p>
        </div>
        <input
          id={`${uid}-switch`}
          type='checkbox'
          role='switch'
          aria-describedby={`${uid}-hint`}
          checked={user.discoverable}
          disabled={saving}
          onChange={(e) => onChange(e.target.checked)}
        />
      </div>
      {error && <p role='alert' className='sc-form__error'>{error}</p>}
    </>
  );
}

function ChangeEmailForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setMessage(null);
    const result = await updateAccount('email', { email, password });
    setSending(false);
    if (result.ok) {
      setUser(result.user);
      setEmail('');
      setPassword('');
      setMessage({ ok: true, text: 'Your email has been updated.' });
    } else {
      setMessage({ ok: false, text: result.error });
    }
  }

  return (
    <form className='sc-form' onSubmit={onSubmit}>
      <h2 className='sc-form__title'>Change email</h2>
      <div className='sc-field'>
        <label htmlFor={id('email')}>New email</label>
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
        <label htmlFor={id('password')}>Current password</label>
        <input
          id={id('password')}
          type='password'
          required
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit' className='sc-form__submit' disabled={sending}>
        {sending ? 'Saving…' : 'Update email'}
      </button>
      {message && (
        <p role={message.ok ? 'status' : 'alert'} className={message.ok ? 'sc-form__success' : 'sc-form__error'}>
          {message.text}
        </p>
      )}
    </form>
  );
}

function ChangePasswordForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setMessage(null);
    const result = await updateAccount('password', { currentPassword, newPassword });
    setSending(false);
    if (result.ok) {
      setCurrentPassword('');
      setNewPassword('');
      setMessage({ ok: true, text: 'Your password has been changed. Other devices have been logged out.' });
    } else {
      setMessage({ ok: false, text: result.error });
    }
  }

  return (
    <form className='sc-form' onSubmit={onSubmit}>
      <h2 className='sc-form__title'>Change password</h2>
      <div className='sc-field'>
        <label htmlFor={id('current')}>Current password</label>
        <input
          id={id('current')}
          type='password'
          required
          autoComplete='current-password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className='sc-field'>
        <label htmlFor={id('new')}>New password</label>
        <p id={id('new-hint')} className='sc-field__hint'>Use at least 8 characters.</p>
        <input
          id={id('new')}
          type='password'
          required
          minLength={8}
          maxLength={200}
          autoComplete='new-password'
          aria-describedby={id('new-hint')}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button type='submit' className='sc-form__submit' disabled={sending}>
        {sending ? 'Saving…' : 'Change password'}
      </button>
      {message && (
        <p role={message.ok ? 'status' : 'alert'} className={message.ok ? 'sc-form__success' : 'sc-form__error'}>
          {message.text}
        </p>
      )}
    </form>
  );
}
