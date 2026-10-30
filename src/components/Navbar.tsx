import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { to: '/simulation', label: 'City Council Simulation' },
  { to: '/resources',  label: 'Resources' },
  { to: '/contact',    label: 'Contact Us' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <span className="navbar__logomark" aria-hidden="true">S</span>
          <span className="navbar__wordmark">Sim-Civics</span>
        </Link>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`} aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-ghost-white navbar__cta" onClick={() => setMenuOpen(false)}>
            Partner with us
          </Link>
        </nav>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
