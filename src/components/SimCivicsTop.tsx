import { Link, NavLink } from 'react-router-dom';
import { User } from 'lucide-react';
import '../styles/sim-civics-tokens.css';
import './SimCivicsTop.css';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/ideas', label: 'Ideas', end: false },
  { to: '/simulation', label: 'Simulation', end: false },
  { to: '/resources', label: 'Resources', end: false },
];

export default function SimCivicsTop() {
  return (
    <header className='sc-top'>
      <Link to='/' className='sc-top__wordmark'>
        Sim-Civics
      </Link>

      <nav className='sc-top__nav' aria-label='Main'>
        <ul className='sc-top__tabs'>
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'sc-top__tab sc-top__tab--active' : 'sc-top__tab'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to='/sign-up' className='sc-top__account' aria-label='Sign up'>
          <User size={20} aria-hidden='true' />
        </Link>
      </nav>

      <span className='sc-top__rule sc-top__rule--left' aria-hidden='true' />
      <span className='sc-top__rule sc-top__rule--right' aria-hidden='true' />
    </header>
  );
}
