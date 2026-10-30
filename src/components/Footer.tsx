import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logomark" aria-hidden="true">S</div>
          <div>
            <p className="footer__name">Sim-Civics</p>
            <p className="footer__tagline">LA Civic Education</p>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <div className="footer__col">
            <p className="footer__col-heading">Site</p>
            <Link to="/">Home</Link>
            <Link to="/simulation">City Council Simulation</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="footer__col">
            <p className="footer__col-heading">Organization</p>
            <span>Based in Los Angeles, CA</span>
            <a href="mailto:hello@simcivics.org">hello@simcivics.org</a>
          </div>
        </nav>
      </div>
      <div className="container footer__bottom">
        <p className="footer__legal">© {new Date().getFullYear()} Sim-Civics. All rights reserved.</p>
      </div>
    </footer>
  );
}
