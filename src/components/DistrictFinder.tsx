import { useId, useState, type KeyboardEvent } from 'react';

type Result =
  | { kind: 'found'; matchedAddress: string; district: number; councilMember: string | null }
  | { kind: 'outside'; matchedAddress: string }
  | { kind: 'error'; message: string };

/**
 * "Find my district by address". The address is only used for this lookup: it isn't part of
 * the surrounding form, so it's never submitted with the account, and the server doesn't keep it.
 * Lives inside other forms, so it's a plain div and Enter is handled here.
 */
export default function DistrictFinder({ onUse }: { onUse: (district: number) => void }) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [looking, setLooking] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function lookup() {
    if (looking || address.trim().length < 5) return;
    setLooking(true);
    setResult(null);
    try {
      const res = await fetch('/api/district-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) setResult({ kind: 'error', message: data.error ?? 'Something went wrong. Please try again.' });
      else if (data.district) setResult({ kind: 'found', ...data });
      else setResult({ kind: 'outside', matchedAddress: data.matchedAddress });
    } catch {
      setResult({ kind: 'error', message: 'Network error. Please try again.' });
    }
    setLooking(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault(); // don't submit the surrounding form
      lookup();
    }
  }

  if (!open) {
    return (
      <button type='button' className='sc-finder__toggle' onClick={() => setOpen(true)}>
        Don't know your district? Find it by address
      </button>
    );
  }

  return (
    <div className='sc-finder'>
      <label htmlFor={`${uid}-address`}>Your street address</label>
      <p id={`${uid}-hint`} className='sc-field__hint'>
        Only used to find your district. We don't save it.
      </p>
      <div className='sc-finder__row'>
        <input
          id={`${uid}-address`}
          type='text'
          maxLength={200}
          autoComplete='street-address'
          placeholder='e.g., 200 N Spring St'
          aria-describedby={`${uid}-hint`}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button type='button' className='sc-finder__go' onClick={lookup} disabled={looking || address.trim().length < 5}>
          {looking ? 'Looking…' : 'Look up'}
        </button>
      </div>

      <div aria-live='polite'>
        {result?.kind === 'found' && (
          <div className='sc-finder__result'>
            <p>
              Matched <strong>{result.matchedAddress}</strong>
              <br />
              Council District {result.district}
              {result.councilMember && <> · {result.councilMember}</>}
            </p>
            <button
              type='button'
              className='sc-finder__go'
              onClick={() => {
                onUse(result.district);
                setOpen(false);
                setAddress('');
                setResult(null);
              }}
            >
              Use CD {result.district}
            </button>
            <p className='sc-field__hint'>Not your address? Try adding the ZIP code or choose your district below.</p>
          </div>
        )}
        {result?.kind === 'outside' && (
          <div className='sc-finder__result'>
            <p>
              Matched <strong>{result.matchedAddress}</strong>, which isn't in the City of Los Angeles.
              Sim-Civics covers the 15 LA City Council districts.
            </p>
          </div>
        )}
        {result?.kind === 'error' && <p role='alert' className='sc-form__error'>{result.message}</p>}
      </div>
    </div>
  );
}
