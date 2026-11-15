import { useEffect, useId, useRef, useState } from 'react';
import '../../components/SubscribeForm.css';
import type { CouncilMember } from './api';

/*
  "Are you sure?" before the council email opens. Members testing the site sent joke ideas to
  real council offices, so this says plainly that the recipient and the email are real, and
  asks them to confirm before going on.
*/
export default function CouncilConfirmDialog({
  council,
  onConfirm,
  onClose,
}: {
  council: CouncilMember;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const [understood, setUnderstood] = useState(false);
  // Going on to the email removes this dialog, which can fire its close event: that isn't a cancel.
  const confirmed = useRef(false);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      className='sc-compose'
      aria-labelledby={`${uid}-title`}
      onClose={() => {
        if (!confirmed.current) onClose();
      }}
    >
      <form method='dialog' className='sc-form sc-compose__inner'>
        <div className='sc-compose__head'>
          <h2 id={`${uid}-title`} className='sc-compose__title'>Are you sure?</h2>
          <button type='submit' className='sc-compose__close' aria-label='Close'>×</button>
        </div>

        <div className='sc-confirm__warning' role='note'>
          <p>
            <strong>This is not a practice run or a joke.</strong> {council.name} is the real Los
            Angeles City Councilmember for District {council.district}, and this email goes to
            their real office at <strong>{council.email}</strong>.
          </p>
        </div>

        <p className='sc-compose__hint'>
          Council staff read what constituents send them and may keep it on record. The email comes
          from your own email account, under your name, and it can't be taken back once it's sent.
          Only send an idea you would stand behind.
        </p>

        <label className='sc-confirm__check'>
          <input type='checkbox' checked={understood} onChange={(e) => setUnderstood(e.target.checked)} />
          I understand this goes to a real elected official, and my idea is serious.
        </label>

        <div className='sc-compose__actions'>
          <button
            type='button'
            className='sc-btn sc-btn--primary'
            disabled={!understood}
            onClick={() => {
              confirmed.current = true;
              onConfirm();
            }}
          >
            Yes, write the email
          </button>
          <button type='submit' className='sc-btn sc-btn--outline'>Cancel</button>
        </div>
      </form>
    </dialog>
  );
}
