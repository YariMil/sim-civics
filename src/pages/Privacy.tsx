import { Link } from 'react-router-dom';
import '../styles/sim-civics-tokens.css';
import './Privacy.css';

/* ------------------------------------------------------------------
   FILL IN THESE VALUES. Search this file for REPLACE to find what's left.
   Everything below the box reads from here, so you shouldn't need to edit the text.
------------------------------------------------------------------- */
const POLICY = {
  orgName: 'Sim-Civics',
  contactEmail: 'simcivics@gmail.com', // e.g. privacy@simcivicsla.com
  lastUpdated: 'October 29, 2026',
  contactMessageRetention: '12 months', // how long you keep contact-form messages
  responseTime: '30 days', // how quickly you'll answer access or deletion requests
  usesGoogleFonts: true, // set to false if you self-host the fonts
  usesWebAnalytics: true, // set to false if you turned off Cloudflare Web Analytics
};
/* ----------------------------------------------------------------- */

export default function Privacy() {
  const p = POLICY;

  return (
    <main className='sc-privacy'>
      <div className='sc-privacy__inner'>
        <div className='sc-privacy__heading'>
          <h1>Privacy Policy</h1>
          <span className='sc-privacy__rule' aria-hidden='true' />
        </div>

        <p className='sc-privacy__updated'>Last updated: {p.lastUpdated}</p>

        <p>
          {p.orgName} is a civic education organization in Los Angeles. This page explains what
          information we collect through this website, why we collect it, and the choices you have.
          We try to collect as little as possible.
        </p>

        <h2>What we collect</h2>
        <p><strong>When you sign up for updates:</strong></p>
        <ul>
          <li>Your email address</li>
          <li>Your Los Angeles council district number</li>
          <li>Whether you are affiliated with an organization and, if so, its name (optional)</li>
        </ul>
        <p><strong>When you contact us:</strong></p>
        <ul>
          <li>Your name and email address</li>
          <li>Your organization and the type of partnership you are interested in (optional)</li>
          <li>The message you write</li>
        </ul>
        <p><strong>Automatically:</strong></p>
        <ul>
          <li>
            When you use our forms, a bot-check service checks that you are a person, which
            involves your IP address and basic browser information.
          </li>
          {p.usesWebAnalytics && (
            <li>
              Simple, privacy-friendly visit counts (such as pages viewed) that do not use cookies
              and do not follow you across other websites.
            </li>
          )}
        </ul>
        <p>We do not ask for your street address.</p>

        <h2>How we use it</h2>
        <ul>
          <li>To send you the {p.orgName} newsletter and updates you asked for.</li>
          <li>To focus our content on issues in your council district.</li>
          <li>To reply to messages and partnership inquiries.</li>
          <li>To keep our website and forms secure and free of spam.</li>
        </ul>

        <h2>Who handles your information</h2>
        <p>We use a small number of services to run the site. They process data on our behalf:</p>
        <ul>
          <li><strong>Buttondown</strong> stores our newsletter subscriber list and sends our emails.</li>
          <li>
            <strong>Cloudflare</strong> hosts this website, protects it from abuse, runs the bot
            check on our forms, and delivers contact-form messages to our inbox.
          </li>
          {p.usesGoogleFonts && (
            <li>
              <strong>Google Fonts</strong> supplies the typefaces on this site, which means your
              browser requests them from Google when a page loads.
            </li>
          )}
        </ul>
        <p>
          We may also share information if the law requires it. We do not sell or rent your
          information, and we do not use it for advertising.
        </p>

        <h2>How long we keep it</h2>
        <ul>
          <li>
            Newsletter information stays until you unsubscribe or ask us to delete it.
          </li>
          <li>Contact-form messages are kept for up to {p.contactMessageRetention}.</li>
        </ul>

        <h2>Your choices</h2>
        <ul>
          <li>Every email we send has an unsubscribe link.</li>
          <li>
            You can ask us what information we hold about you, ask us to correct it, or ask us to
            delete it by emailing <a href={`mailto:${p.contactEmail}`}>{p.contactEmail}</a>. We
            will respond within {p.responseTime}.
          </li>
          <li>
            Depending on where you live, you may have additional rights under privacy laws. Contact
            us and we will do our best to honor them.
          </li>
        </ul>

        <h2>Age</h2>
        <p>
          This website is meant for people 13 and older. We do not knowingly collect information
          from children under 13. If you believe a child has given us information, contact us and
          we will delete it.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we change how we handle information, we will update this page and the date at the top.
          If the changes are significant, we will let newsletter subscribers know.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy? Email{' '}
          <a href={`mailto:${p.contactEmail}`}>{p.contactEmail}</a> or use our{' '}
          <Link to='/contact'>contact form</Link>.
        </p>
      </div>
    </main>
  );
}
