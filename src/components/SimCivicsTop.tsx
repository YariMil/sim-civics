import { Link } from 'react-router-dom';
import './SimCivicsTop.css';

/*
  Sim-Civics Top — from the Figma "Contact Us Page" (symbol: Sim-Civics Top).
  Blue band with a big page title, tab navigation (top right) and the logo.

  Exports: <SimCivicsTop title="…" active="simulation" />

  Logo: public/images/sim-civics-logo.png
  Links: Home, Simulation and Resources go to existing pages.
         "Ordinance Refiner" is a placeholder for later (no link yet).
*/

export type TopNavKey = 'home' | 'simulation' | 'resources';

interface Props {
  title: string;
  active?: TopNavKey;
}

export default function SimCivicsTop({ title, active }: Props) {
  const tabClass = (key?: TopNavKey) =>
    `sc-top__tab ${key && key === active ? 'sc-top__tab--active' : ''}`;

  return (
    <div className="sc-top">
      <h1 className="sc-top__title">{title}</h1>

      <nav className="sc-top__nav" aria-label="Main">
        <Link to="/" className={`${tabClass('home')} sc-top__tab--home`}
              aria-current={active === 'home' ? 'page' : undefined}>
          Home
        </Link>
        <span className={`${tabClass()} sc-top__tab--refiner sc-top__tab--inert`}>
          Ordinance Refiner
        </span>
        <Link to="/simulation" className={`${tabClass('simulation')} sc-top__tab--simulation`}
              aria-current={active === 'simulation' ? 'page' : undefined}>
          Simulation
        </Link>
        <Link to="/resources" className={`${tabClass('resources')} sc-top__tab--resources`}
              aria-current={active === 'resources' ? 'page' : undefined}>
          Resources
        </Link>
      </nav>

      <img
        className="sc-top__logo"
        src="/images/sim-civics-logo.png"
        alt="Sim-Civics logo"
        width={305}
        height={305}
      />
    </div>
  );
}
