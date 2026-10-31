import { Link, NavLink } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import '../styles/sim-civics-tokens.css';
import './SimCivicsTop.css';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/ideas', label: 'Ideas', end: false },
  { to: '/simulation', label: 'Simulation', end: false },
  { to: '/resources', label: 'Resources', end: false },
];

export default function SimCivicsTop() {
  const { user } = useAuth();

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
        {user ? (
          // Signed in: single-letter avatar, per the Figma Avatar guidance
          <Link to='/account' className='sc-top__account' aria-label='Your account'>
            <span aria-hidden='true'>{user.email[0].toUpperCase()}</span>
          </Link>
        ) : (
          <Link to='/sign-up' className='sc-top__account' aria-label='Sign up or log in'>
            <User size={20} aria-hidden='true' />
          </Link>
        )}
      </nav>

      <span className='sc-top__rule sc-top__rule--left' aria-hidden='true' />
      <span className='sc-top__rule sc-top__rule--right' aria-hidden='true' />
    </header>
  );
}
