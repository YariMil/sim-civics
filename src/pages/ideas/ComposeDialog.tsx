import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import '../../components/SubscribeForm.css';

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

export function useCopyLabel(idle: string) {
  const [state, setState] = useState<'yes' | 'failed' | null>(null);
  async function copy(text: string) {
    setState((await copyText(text)) ? 'yes' : 'failed');
    window.setTimeout(() => setState(null), 2500);
  }
  return { label: state === 'yes' ? 'Copied!' : state === 'failed' ? "Couldn't copy" : idle, copy };
}

// Apple Mail has no web address; on Apple devices mailto: opens it unless another app is the default.
const ON_APPLE_DEVICE = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

// Above roughly this length some email apps cut off a message passed in a link.
const LONG_MESSAGE = 1800;

/*
  The message is sent from the visitor's own email account: each button hands the text to
  Gmail, Outlook.com or their mail app. Sim-Civics never sends or stores it.
*/
export default function ComposeDialog({
  to,
  title,
  subject,
  template,
  context,
  onClose,
}: {
  to: string;
  title: string;
  subject: string;
  template: string;
  context?: ReactNode; // extra line under To/Subject, e.g. why this recipient
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
          <h2 id={`${uid}-title`} className='sc-compose__title'>{title}</h2>
          <button type='submit' className='sc-compose__close' aria-label='Close'>×</button>
        </div>
        <p className='sc-compose__to'>
          To: <strong>{to}</strong>
          <br />
          Subject: {subject}
        </p>
        {context && <p className='sc-compose__to'>{context}</p>}
        <div className='sc-field'>
          <label htmlFor={`${uid}-body`}>Your message (edit it however you like)</label>
          <textarea
            id={`${uid}-body`}
            rows={9}
            maxLength={12000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <p className='sc-compose__hint'>
          Choose where to send it from. It opens with this message filled in.
          {body.length > LONG_MESSAGE && (
            <> This message is long, so some email apps may cut it off. If that happens, use Copy message and paste it in.</>
          )}
        </p>
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
