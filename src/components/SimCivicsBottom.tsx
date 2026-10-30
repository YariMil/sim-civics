import { Link } from 'react-router-dom';
import '../styles/sim-civics-tokens.css';
import './SimCivicsBottom.css';

const SITE_LINKS_A = [
  { to: '/', label: 'Home' },
  { to: '/ideas', label: 'Ideas' },
  { to: '/simulation', label: 'Simulation' },
  { to: '/resources', label: 'Resources' },
];

const SITE_LINKS_B = [
  { to: '/why-us', label: 'Why us?' },
  { to: '/contact', label: 'Contact us' },
  { to: '/sign-up', label: 'Sign up' },
];

export default function SimCivicsBottom() {
  return (
    <footer className='sc-bottom'>
      <div className='sc-bottom__inner'>
        <div className='sc-bottom__brand'>
          <div className='sc-bottom__lockup'>
            {/* Export the logo from Figma (node 163:699) to public/sim-civics-logo.png */}
            <img src='/public/images/sim-civics-logo.png' alt='' width={64} height={64} />
            <span className='sc-bottom__name'>Sim-Civics</span>
          </div>
          <p className='sc-bottom__tagline'>
            Supporting local advocacy in Los Angeles through deliberation, action, and learning.
          </p>
        </div>

        <nav className='sc-bottom__col' aria-label='Footer'>
          <h2 className='sc-bottom__heading'>Site</h2>
          <div className='sc-bottom__links'>
            <ul>
              {SITE_LINKS_A.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
            <ul>
              {SITE_LINKS_B.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </nav>

        <div className='sc-bottom__col'>
          <h2 className='sc-bottom__heading'>Organization</h2>
          <ul>
            <li>Los Angeles, CA</li>
            <li><a href='mailto:simcivics@gmail.com'>simcivics@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
