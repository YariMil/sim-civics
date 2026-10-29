import { Link } from 'react-router-dom';
import './Home.css';

/*
  Home page — built from the Figma "Home Page" frame (Sim-Civics — Home).

  Links:
    • "City Council Simulation" → /simulation
    • "Contact Us!"            → /contact
  The other buttons (Sign Up!, Ordinance Refiner, Learn More) are placeholders
  for later and intentionally have no click behavior yet.

  Logo: place the exported Figma "logo" layer at
  public/images/sim-civics-logo.png
*/
export default function Home() {
  return (
    <main className="sc-home">
      {/* ── Header: brand · logo · tagline ── */}
      <section className="sc-home__header">
        <div className="sc-home__brand">
          <p className="sc-home__brand-name">Sim-Civics</p>
          <p className="sc-home__brand-subtitle">Local government, simplified</p>
        </div>

        <div className="sc-home__logo">
          <img
            src="/images/sim-civics-logo.png"
            alt="Sim-Civics logo"
            width={335}
            height={335}
          />
        </div>

        <p className="sc-home__tagline">
          Learn how your city <em>actually works.</em>
        </p>
      </section>

      {/* ── Hero ── */}
      <section className="sc-home__hero">
        <div className="sc-home__hero-copy">
          <h1 className="sc-home__hero-title">What is Sim-Civics?</h1>
          <p className="sc-home__hero-description">
            Sim-Civics furthers local advocacy by helping you refine your ideas and send them to
            your council members for consideration!
          </p>
        </div>

        <div className="sc-home__hero-actions">
          <button type="button" className="sc-btn sc-btn--sign-up sc-btn--inert">
            Sign Up!
          </button>
          <button type="button" className="sc-btn sc-btn--ordinance sc-btn--inert">
            Ordinance Refiner
          </button>
          <Link to="/simulation" className="sc-btn sc-btn--simulation">
            City Council Simulation
          </Link>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="sc-home__mission">
        <h2 className="sc-home__mission-title">Our Mission</h2>
        <p className="sc-home__mission-body">
          Most civic education stops at the federal level. Sim-Civics starts where policy actually
          touches your life — the LA City Council. We believe every Angeleno deserves to understand
          the meetings where housing, transportation, and budget decisions get made.
        </p>

        <div className="sc-home__mission-actions">
          <button type="button" className="sc-btn sc-btn--mission sc-btn--inert">
            Learn More
          </button>
          <Link to="/contact" className="sc-btn sc-btn--mission">
            Contact Us!
          </Link>
        </div>
      </section>
    </main>
  );
}
