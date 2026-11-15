import { useEffect, useId, useRef, type ReactNode } from 'react';
import '../../components/SubscribeForm.css';

/*
  "Are you sure?" before an AI change goes into the idea. Nothing is saved until the member
  presses Save idea, but this makes them look at the change and agree to it first.
*/
export default function AiConfirmDialog({
  title,
  confirmLabel,
  canConfirm = true,
  children,
  onConfirm,
  onClose,
}: {
  title: string;
  confirmLabel: string;
  canConfirm?: boolean;
  children: ReactNode;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId();
  // Confirming removes this dialog, which can fire its close event: that isn't a cancel.
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
          <h2 id={`${uid}-title`} className='sc-compose__title'>{title}</h2>
          <button type='submit' className='sc-compose__close' aria-label='Close'>×</button>
        </div>

        {children}

        <p className='sc-compose__hint'>
          AI can get things wrong. Read it over and make sure it still says what you mean. Nothing is
          saved until you press Save idea.
        </p>

        <div className='sc-compose__actions'>
          {canConfirm && (
            <button
              type='button'
              className='sc-btn sc-btn--primary'
              onClick={() => {
                confirmed.current = true;
                onConfirm();
              }}
            >
              {confirmLabel}
            </button>
          )}
          <button type='submit' className='sc-btn sc-btn--outline'>Cancel</button>
        </div>
      </form>
    </dialog>
  );
}
