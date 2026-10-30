import { Link } from 'react-router-dom';
import './SimCivicsNav.css';

/*
  Sim-Civics tab navigation — Figma "nav-bar" (Home · Ordinance Refiner · Simulation · Resources).
  Used inside SimCivicsTop and on the Home page header.
  "Ordinance Refiner" is a placeholder for later (no page/link yet).
*/

export type TopNavKey = 'home' | 'simulation' | 'resources' | 'contact-us';

interface Props {
  active?: TopNavKey;
  className?: string;   // lets the parent position it
}

export default function SimCivicsNav({ active, className = '' }: Props) {
  const tabClass = (key?: TopNavKey) =>
    `sc-nav__tab ${key && key === active ? 'sc-nav__tab--active' : ''}`;

  return (
    <nav className={`sc-nav ${className}`} aria-label="Main">
      <Link to="/" className={`${tabClass('home')} sc-nav__tab--home`}
            aria-current={active === 'home' ? 'page' : undefined}>
        Home
      </Link>
      <span className={`${tabClass()} sc-nav__tab--refiner sc-nav__tab--inert`}>
        Ordinance Refiner
      </span>
      <Link to="/simulation" className={`${tabClass('simulation')} sc-nav__tab--simulation`}
            aria-current={active === 'simulation' ? 'page' : undefined}>
        Simulation
      </Link>
      <Link to="/resources" className={`${tabClass('resources')} sc-nav__tab--resources`}
            aria-current={active === 'resources' ? 'page' : undefined}>
        Resources
      </Link>
      <Link to="/contact" className={`${tabClass('contact-us')} sc-nav__tab--contact-us`}
            aria-current={active === 'contact-us' ? 'page' : undefined}>
        Contact Us!
      </Link>
    </nav>
  );
}
