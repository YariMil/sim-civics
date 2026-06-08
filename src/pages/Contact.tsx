import { useState } from 'react';
import type { FormEvent } from 'react';
import { MapPin, Mail, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    // In production: POST to your backend / Netlify Forms / Formspree here
    console.log('Form submission:', form);
    setSubmitted(true);
  };

  return (
    <main>
      <div className="contact-hero">
        <div className="container contact-hero__inner">
          <p className="eyebrow">Get in touch</p>
          <h1 className="display-sm contact-hero__title">Partnerships &amp; collaboration</h1>
          <p className="body-lg contact-hero__sub">
            Sim-Civics partners with schools, nonprofits, and city agencies to bring civic 
            education to more Angelenos. Reach out to start a conversation.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">

          {/* Info panel */}
          <aside className="contact-info">
            <h2 className="heading">Work with Sim-Civics</h2>
            <p className="body-sm contact-info__body">
              Whether you're a high school teacher looking to bring the simulation to your 
              classroom, a community org working on local advocacy, or a city department 
              exploring civic engagement — we'd love to talk.
            </p>

            <div className="contact-info__details">
              <div className="contact-detail">
                <MapPin size={16} className="contact-detail__icon" />
                <span>Los Angeles, California</span>
              </div>
              <div className="contact-detail">
                <Mail size={16} className="contact-detail__icon" />
                <a href="mailto:hello@simcivics.org">hello@simcivics.org</a>
              </div>
            </div>

            <div className="contact-partnerships">
              <p className="eyebrow contact-partnerships__label">We partner with</p>
              <ul className="contact-partnerships__list">
                {['K–12 schools & educators', 'Community organizations', 'City & county agencies', 'Universities & civic programs', 'Local media & journalists'].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="contact-form-wrap">
            {!submitted ? (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2 className="heading contact-form__title">Send us a message</h2>

                <div className="cf-row">
                  <div className="cf-field">
                    <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
                    <input
                      id="name" name="name" type="text"
                      placeholder="Your full name"
                      value={form.name} onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="cf-field">
                    <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="you@example.com"
                      value={form.email} onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="cf-row">
                  <div className="cf-field">
                    <label htmlFor="org">Organization</label>
                    <input
                      id="org" name="org" type="text"
                      placeholder="School, org, or agency (optional)"
                      value={form.org} onChange={handleChange}
                    />
                  </div>
                  <div className="cf-field">
                    <label htmlFor="partnerType">Type of partnership</label>
                    <select id="partnerType" name="partnerType" value={form.partnerType} onChange={handleChange}>
                      <option value="">Select one…</option>
                      {partnerTypes.map((pt) => (
                        <option key={pt.value} value={pt.value}>{pt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="cf-field">
                  <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
                  <textarea
                    id="message" name="message"
                    placeholder="Tell us about your interest in working with Sim-Civics…"
                    rows={5}
                    value={form.message} onChange={handleChange}
                    required
                  />
                </div>

                {error && <p className="cf-error" role="alert">{error}</p>}

                <button type="submit" className="btn btn-primary cf-submit">
                  Send message <Send size={15} />
                </button>

                <p className="label cf-disclaimer">
                  We typically respond within 2–3 business days.
                </p>
              </form>
            ) : (
              <div className="cf-success" role="status">
                <CheckCircle size={40} className="cf-success__icon" />
                <h2 className="heading">Message received!</h2>
                <p className="body-sm">
                  Thanks for reaching out, {form.name}. We'll be in touch at {form.email} within a few business days.
                </p>
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: '1.5rem' }}
                  onClick={() => { setSubmitted(false); setForm({ name: '', org: '', email: '', partnerType: '', message: '' }); }}
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
