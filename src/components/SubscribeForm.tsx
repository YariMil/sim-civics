import { useId, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { ACCOUNTS_ENABLED } from '../config/features';
import '../styles/sim-civics-tokens.css';
import './SubscribeForm.css';

const SITE_KEY = '0x4AAAAAAFr_0iYfpD7W-5oP';
const DISTRICTS = Array.from({ length: 15 }, (_, i) => i + 1);

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function SubscribeForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [district, setDistrict] = useState('');
  const [affiliated, setAffiliated] = useState<'yes' | 'no' | ''>('');
  const [organization, setOrganization] = useState('');
  const [discoverable, setDiscoverable] = useState(false);
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const widget = useRef<TurnstileInstance>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;

    if (ACCOUNTS_ENABLED) {
      // Accounts need their own backend (never send passwords to Buttondown). Not built yet.
      setStatus('error');
      setMessage('Accounts are not available yet.');
      return;
    }

    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          district: Number(district),
          affiliated,
          organization: affiliated === 'yes' ? organization : '',
          token,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('done');
        setMessage('Almost done! Check your inbox to confirm your subscription.');
        return;
      }
      setStatus('error');
      setMessage(data.error ?? 'Something went wrong. Please try again.');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
    widget.current?.reset(); // Turnstile tokens are single-use
    setToken('');
  }

  if (status === 'done') {
    return (
      <div className='sc-form'>
        <h2 className='sc-form__title'>Sign up</h2>
        <p role='status' className='sc-form__success'>{message}</p>
      </div>
    );
  }

  return (
    <form className='sc-form' onSubmit={onSubmit}>
      <h2 className='sc-form__title'>Sign up</h2>

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

      {ACCOUNTS_ENABLED && (
        <div className='sc-field'>
          <label htmlFor={id('password')}>Password</label>
          <p id={id('password-hint')} className='sc-field__hint'>Use at least 8 characters.</p>
          <input
            id={id('password')}
            type='password'
            required
            minLength={8}
            autoComplete='new-password'
            placeholder='Create a password'
            aria-describedby={id('password-hint')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}

      <div className='sc-field'>
        <label htmlFor={id('district')}>LA Council District</label>
        <p id={id('district-hint')} className='sc-field__hint'>
          Los Angeles has 15 council districts (CD 1–15).
        </p>
        <select
          id={id('district')}
          required
          aria-describedby={id('district-hint')}
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value='' disabled>Select your district</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>CD {d}</option>
          ))}
        </select>
      </div>

      <fieldset className='sc-affil'>
        <legend>Are you affiliated with an organization?</legend>
        <div className='sc-affil__options'>
          <label>
            <input
              type='radio'
              name={id('affiliated')}
              value='yes'
              checked={affiliated === 'yes'}
              onChange={() => setAffiliated('yes')}
            />
            Yes
          </label>
          <label>
            <input
              type='radio'
              name={id('affiliated')}
              value='no'
              checked={affiliated === 'no'}
              onChange={() => setAffiliated('no')}
            />
            No
          </label>
        </div>
      </fieldset>

      <div className='sc-field'>
        <label htmlFor={id('org')}>Organization name</label>
        <p id={id('org-hint')} className='sc-field__hint'>Shown when you answer “Yes.”</p>
        <input
          id={id('org')}
          type='text'
          maxLength={150}
          disabled={affiliated !== 'yes'}
          placeholder='e.g., Eastside Neighborhood Council'
          aria-describedby={id('org-hint')}
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
      </div>

      {ACCOUNTS_ENABLED && (
        <div className='sc-switch'>
          <div>
            <label htmlFor={id('discoverable')}>Make my email discoverable to other members</label>
            <p id={id('discoverable-hint')} className='sc-field__hint'>
              Members with an idea that shares a subtag with yours can see your email and contact
              you outside Sim-Civics. You can turn this off anytime.
            </p>
          </div>
          <input
            id={id('discoverable')}
            type='checkbox'
            role='switch'
            aria-describedby={id('discoverable-hint')}
            checked={discoverable}
            onChange={(e) => setDiscoverable(e.target.checked)}
          />
        </div>
      )}

      <Turnstile ref={widget} siteKey={SITE_KEY} onSuccess={setToken} />

      <button type='submit' className='sc-form__submit' disabled={!token || status === 'sending'}>
        {status === 'sending' ? 'Signing up…' : ACCOUNTS_ENABLED ? 'Create account' : 'Sign up'}
      </button>

      {status === 'error' && <p role='alert' className='sc-form__error'>{message}</p>}

      <p className='sc-form__note'>
        By signing up you confirm you are 13 or older and agree to our{' '}
        <Link to='/privacy'>Privacy Policy</Link>.
      </p>

      {ACCOUNTS_ENABLED && (
        <p className='sc-form__login'>
          Already have an account? <Link to='/log-in'>Log in</Link>
        </p>
      )}
    </form>
  );
}
