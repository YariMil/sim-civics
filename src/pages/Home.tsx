import { Link } from 'react-router-dom';
import { Building2, BookOpen, Users, ChevronRight, MapPin } from 'lucide-react';
import './Home.css';

const features = [
  {
    icon: <Building2 size={22} />,
    title: 'City Council Simulation',
    body: 'Live agendas, motions, minutes, and bulletins modeled on real LA Council sessions. Participate as a council member, mayor, or city official.',
    to: '/simulation',
    cta: 'Enter the simulation',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Civic Resources',
    body: 'Guides, explainers, videos, and quizzes explaining how the LA City Council actually works — from introduction to full policy fluency.',
    to: '/resources',
    cta: 'Browse resources',
  },
  {
    icon: <Users size={22} />,
    title: 'Partnerships',
    body: 'We work with schools, community organizations, and city agencies to bring civic education to more Angelenos. Reach out to collaborate.',
    to: '/contact',
    cta: 'Partner with us',
  },
];

const stats = [
  { value: '15', label: 'Council Districts covered' },
  { value: '3+', label: 'Active simulation sessions' },
  { value: 'LA', label: 'Based in Los Angeles' },
];

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="eyebrow animate-fade-up">Los Angeles Civic Education</p>
            <h1 className="display hero__heading animate-fade-up delay-1">
              Learn how your<br />
              <em>city actually works</em>
            </h1>
            <p className="body-lg hero__sub animate-fade-up delay-2">
              Sim-Civics teaches local advocacy through hands-on City Council simulations, 
              focusing on how Los Angeles city government makes decisions that affect your neighborhood.
            </p>
            <div className="hero__actions animate-fade-up delay-3">
              <Link to="/simulation" className="btn btn-primary">
                Enter the simulation <ChevronRight size={16} />
              </Link>
              <Link to="/resources" className="btn btn-ghost-white">
                Explore resources
              </Link>
            </div>
            <div className="hero__location animate-fade-up delay-4">
              <MapPin size={13} />
              <span>Based in Los Angeles, CA</span>
            </div>
          </div>

          <div className="hero__decoration" aria-hidden="true">
            <div className="hero__seal">
              <div className="hero__seal-outer">
                <div className="hero__seal-inner">
                  <span>CITY COUNCIL</span>
                  <span>SIMULATION</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__stats">
          <div className="container hero__stats-inner">
            {stats.map((s) => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section">
        <div className="container">
          <div className="home-features__header">
            <p className="eyebrow">What we offer</p>
            <h2 className="display-sm">Civic engagement,<br />hands-on</h2>
          </div>
          <div className="home-features__grid">
            {features.map((f) => (
              <div key={f.title} className="card home-feature-card">
                <div className="home-feature-card__icon">{f.icon}</div>
                <h3 className="heading">{f.title}</h3>
                <p className="body-sm home-feature-card__body">{f.body}</p>
                <Link to={f.to} className="home-feature-card__link">
                  {f.cta} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="home-mission">
        <div className="container home-mission__inner">
          <div className="home-mission__text">
            <p className="eyebrow">Our mission</p>
            <h2 className="display-sm">Advocacy starts<br />at the local level</h2>
            <p className="body-lg">
              Most civic education stops at the federal level. Sim-Civics starts where policy 
              actually touches your life — the LA City Council. We believe every Angeleno deserves 
              to understand the meetings where housing, transportation, and budget decisions get made.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              Get involved <ChevronRight size={16} />
            </Link>
          </div>
          <div className="home-mission__pull">
            <blockquote>
              <p>"Local government is where democracy is most accessible — and least understood."</p>
              <cite>— Sim-Civics</cite>
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  );
}
