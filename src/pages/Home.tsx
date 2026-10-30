import { Link } from 'react-router-dom';
import './Home.css';

/*
  Home page — recreated from the Figma "Full" page → "Home" frame (1440 × 2048).
  Section 1 ("Home1") is the blue hero; section 2 ("Home2") is the white info section.

  The header and footer are rendered by App.tsx (SimCivicsTop / SimCivicsBottom),
  so they are intentionally not part of this file.

  Links (only these two are wired, everything else is a placeholder for later):
    • "Council Simulations" card → /simulation
    • "Contact Us!" button      → /contact
  The "Ideas Workspace" card, "Government Basics" card and "Sign Up!" button
  have no click behavior yet. The three "Source:" lines are real external links.

  Logo: /images/sim-civics-logo.png
*/
export default function Home() {
  return (
    <main className="sc-home">
      {/* ═════════ Home1 — blue hero ═════════ */}
      <section className="sc-home__hero">
        <img
          className="sc-home__logo"
          src="/images/sim-civics-logo.png"
          alt="Sim-Civics logo"
          width={260}
          height={260}
        />

        <h1 className="sc-home__headline">
          Sim-Civics supports local advocacy through deliberation, action, and learning.
        </h1>

        <p className="sc-home__mission">
          Most civic education stops at the federal level. Sim-Civics starts where policy actually
          touches your life — the LA City Council. We believe every Angeleno deserves to understand
          the meetings where housing, transportation, and budget decisions get made.
        </p>

        <div className="sc-home__cards">
          {/* Ideas Workspace — placeholder (no link yet) */}
          <div className="sc-home__card">
            <h2 className="sc-home__card-title">Ideas Workspace</h2>
            <p className="sc-home__card-text">
              Record and refine your ideas for local action, track their development, and share
              proposals with city council members.
            </p>
            <span className="sc-home__card-label">Develop</span>
          </div>

          {/* Council Simulations — links to /simulation */}
          <Link to="/simulation" className="sc-home__card sc-home__card--link">
            <h2 className="sc-home__card-title">Council Simulations</h2>
            <p className="sc-home__card-text">
              Participate in facilitated city council simulations to discuss local issues, debate
              proposals, and draft ordinances.
            </p>
            <span className="sc-home__card-label sc-home__card-label--practice">Practice</span>
          </Link>

          {/* Government Basics — placeholder (no link yet) */}
          <div className="sc-home__card">
            <h2 className="sc-home__card-title">Government Basics</h2>
            <p className="sc-home__card-text">
              Explore accessible explanations of how local government works and how residents can
              participate.
            </p>
            <span className="sc-home__card-label">Learn</span>
          </div>
        </div>
      </section>

      {/* ═════════ Home2 — white info section ═════════ */}
      <section className="sc-home__info">
        <div className="sc-home__info-inner">

          {/* The Participation Gap */}
          <div className="sc-home__heading sc-home__heading--gap">
            <h2>The Participation Gap</h2>
            <span className="sc-home__rule" aria-hidden="true" />
          </div>

          <p className="sc-home__gap-text">
            Local governments invite public input, but unfamiliar procedures, fixed meeting times,
            and limited information can make it difficult for residents to participate. Residents
            may also find it hard to turn their ideas into concrete proposals and share them with
            decision-makers. Sim-Civics helps bridge these gaps with accessible government
            resources, council simulations, and digital tools to develop and share
            proposals—making civic participation easier to understand and pursue beyond formal
            meetings.
          </p>

          <div className="sc-home__stat sc-home__stat--1">
            <p className="sc-home__stat-num">13%</p>
            <p className="sc-home__stat-desc">
              of U.S. adults attended a local government meeting in the previous 12 months in a 2025
              survey
            </p>
          </div>
          <div className="sc-home__stat sc-home__stat--2">
            <p className="sc-home__stat-num">40.4%</p>
            <p className="sc-home__stat-desc">
              of respondents to an LA County survey question identified length or complexity as a
              barrier to understanding or accessing public budget presentations.
            </p>
          </div>
          <div className="sc-home__stat sc-home__stat--3">
            <p className="sc-home__stat-num">56%</p>
            <p className="sc-home__stat-desc">
              of surveyed California cities reported that remote public comment increased
              participation in city council meetings.
            </p>
          </div>

          {/* About Sim-Civics */}
          <div className="sc-home__heading sc-home__heading--about">
            <h2>About Sim-Civics</h2>
            <span className="sc-home__rule" aria-hidden="true" />
          </div>

          <p className="sc-home__about-text">
            Sim-Civics was started by a group of 3 individuals (Yaroslav Milakin, Hal Craig, and
            Ethan Bai) who saw a big gap in civic education: Modern curricula barely cover local
            government and how it works! Given that local government affects everything from taxes
            to the stop signs placed around your block, we wanted to create a place where people can
            come to learn, explore, and connect with each other in their ideas to make their
            community better. Although we focused on Los Angeles specifically, we by no means want
            to restrict ourselves and are always looking for partners with who to expand our civic
            knowledge to other communities!
          </p>

          <div className="sc-home__actions">
            {/* Sign Up! — placeholder (no link yet) */}
            <button type="button" className="sc-home__btn sc-home__btn--inert">
              Sign Up!
            </button>
            {/* Contact Us! — links to /contact */}
            <Link to="/contact" className="sc-home__btn">
              Contact Us!
            </Link>
          </div>

          <div className="sc-home__sources">
            <p>
              Source:{' '}
              <a
                href="https://www.pewresearch.org/journalism/2026/07/16/how-americans-are-engaged-with-news-politics-religion-and-civic-life/"
                target="_blank"
                rel="noopener noreferrer"
              >
                How Americans Are Engaged With News, Politics, Religion and Civic Life
              </a>
              , Pew Research Center (2026).
            </p>
            <p>
              Source:{' '}
              <a
                href="https://file.lacounty.gov/SDSInter/bos/supdocs/211493.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Public Budget Survey Results
              </a>
              , Los Angeles County Governance Reform Task Force (2025).
            </p>
            <p>
              Source:{' '}
              <a
                href="https://www.commoncause.org/california/wp-content/uploads/2024/01/CA-Remote-Accessv2.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Opening California’s Democracy
              </a>
              , California Common Cause (2024).
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
