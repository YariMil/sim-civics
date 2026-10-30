import { Link } from 'react-router-dom';
import './SimCivicsBottom.css';

/*
  Sim-Civics Bottom — from the Figma "Contact Us Page" (symbol: Sim-Civics Bottom).
  Red footer band: logo block on the left, site links and organization info on the right.

  Logo mark: public/images/sim-civics-mark.png
  "Why us?" and "Refiner" are placeholders for later (no link yet).
*/
export default function SimCivicsBottom() {
  return (
    <footer className="sc-bottom">
      <div className="sc-bottom__mark">
        <img
          src="/images/sim-civics-mark.png"
          alt="Sim-Civics"
          width={175}
          height={175}
        />
      </div>

      <div className="sc-bottom__cols">
        <nav className="sc-bottom__site" aria-label="Site">
          <p className="sc-bottom__heading">Site</p>
          <span className="sc-bottom__link sc-bottom__link--start-col">Why us?</span>
          <Link to="/" className="sc-bottom__link sc-bottom__link--end-col">Home</Link>
          <Link to="/simulation" className="sc-bottom__link sc-bottom__link--start-col">Simulation</Link>
          <Link to="/resources" className="sc-bottom__link sc-bottom__link--end-col">Resources</Link>
          <Link to="/contact" className="sc-bottom__link sc-bottom__link--start-col">Contact us</Link>
          <span className="sc-bottom__link sc-bottom__link--end-col">Refiner</span>
        </nav>

        <div className="sc-bottom__org">
          <p>Organization</p>
          <p>Los Angeles, CA</p>
          <p>simcivics@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
