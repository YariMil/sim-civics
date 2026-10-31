import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { TURNSTILE_SITE_KEY } from '../config/turnstile';
import { Send, CheckCircle } from 'lucide-react';
import './Contact.css';


/*
  Contact Us — built from the Figma "Contact Us Page" frame:
  blue top band, blue body with the intro text, red bottom band.
  The partnership message form (not in the Figma frame) is kept to the right of the intro.
*/

type PartnerType = 'school' | 'community' | 'city-agency' | 'media' | 'individual' | 'other';

interface FormState {
  name: string;
  org: string;
  email: string;
  partnerType: PartnerType | '';
  message: string;
}

const partnerTypes: { value: PartnerType; label: string }[] = [
  { value: 'school',       label: 'School / University' },
  { value: 'community',    label: 'Community organization' },
  { value: 'city-agency',  label: 'City or government agency' },
  { value: 'media',        label: 'Media / Press' },
  { value: 'individual',   label: 'Individual / Student' },
  { value: 'other',        label: 'Other' },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', org: '', email: '', partnerType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
const [sending, setSending] = useState(false);
const widget = useRef<TurnstileInstance>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (sending) return;
  if (!form.name || !form.email || !form.message) {
    setError('Please fill in your name, email, and message.');
    return;
  }
  if (form.message.trim().length < 10) {
    setError('Please write at least a short sentence in your message.');
    return;
  }

  setSending(true);
  setError('');
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, token }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setSubmitted(true);
      return;
    }
    setError(data.error ?? 'Something went wrong. Please try again.');
  } catch {
    setError('Network error. Please try again.');
  } finally {
    setSending(false);
  }
  widget.current?.reset(); // Turnstile tokens are single-use
  setToken('');
};

  return (
    <>

      <main className="sc-contact">
        <div className="sc-contact__layout">

          {/* Intro text (Figma "contact-body") */}
          <div className="sc-contact__intro">
            <p>Interested in what we’re doing?</p>
            <p>
              We’re always looking for partners to bring civic education to more Angelenos.
              Whether you’re a high school teacher or a community organizer, we’d love to talk.
            </p>
          </div>

          {/* Form */}
          <div className="sc-contact__form-wrap">
            {!submitted ? (
              <form className="sc-contact__form" onSubmit={handleSubmit} noValidate>
                <h2 className="sc-contact__form-title">Send us a message</h2>

                <div className="sc-cf-row">
                  <div className="sc-cf-field">
                    <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
                    <input
                      id="name" name="name" type="text"
                      placeholder="Your full name"
                      value={form.name} onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="sc-cf-field">
                    <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="you@example.com"
                      value={form.email} onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="sc-cf-row">
                  <div className="sc-cf-field">
                    <label htmlFor="org">Organization</label>
                    <input
                      id="org" name="org" type="text"
                      placeholder="School, org, or agency (optional)"
                      value={form.org} onChange={handleChange}
                    />
                  </div>
                  <div className="sc-cf-field">
                    <label htmlFor="partnerType">Type of partnership</label>
                    <select id="partnerType" name="partnerType" value={form.partnerType} onChange={handleChange}>
                      <option value="">Select one…</option>
                      {partnerTypes.map((pt) => (
                        <option key={pt.value} value={pt.value}>{pt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sc-cf-field">
                  <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
                  <textarea
                    id="message" name="message"
                    placeholder="Tell us about your interest in working with Sim-Civics…"
                    rows={5}
                    value={form.message} onChange={handleChange}
                    required
                  />
                </div>
                <Turnstile ref={widget} siteKey={TURNSTILE_SITE_KEY} onSuccess={setToken} />
                {error && <p className="sc-cf-error" role="alert">{error}</p>}

                <button type="submit" className="sc-contact__btn" disabled={!token || sending}>
                {sending ? 'Sending…' : <>Send message <Send size={15} aria-hidden="true" /></>}
                </button>

                <p className="sc-cf-disclaimer">
                  We typically respond within 2–3 business days.
                </p>
              </form>
            ) : (
              <div className="sc-contact__form sc-cf-success" role="status">
                <CheckCircle size={40} className="sc-cf-success__icon" aria-hidden="true" />
                <h2 className="sc-contact__form-title">Message received!</h2>
                <p className="sc-cf-success__text">
                  Thanks for reaching out, {form.name}. We'll be in touch at {form.email} within a few business days.
                </p>
                <button
                  className="sc-contact__btn sc-contact__btn--outline"
                  onClick={() => { setToken(''); setSubmitted(false); setForm({ name: '', org: '', email: '', partnerType: '', message: '' }); }}
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  );
}
