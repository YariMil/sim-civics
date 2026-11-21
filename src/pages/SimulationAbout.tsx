import { useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import {
  howItWorksIntro,
  howItWorksSteps,
  picturesIntro,
  pictures,
  statsIntro,
  stats,
  type SimulationPicture,
} from '../data/simulationAbout';

// The "About the Simulation" tab (plus the stats block shown above the tabs). All text and pictures come from src/data/simulationAbout.ts;
// anything left empty there shows as a placeholder.

function Text({ value, fallback }: { value: string; fallback: string }) {
  return value ? <>{value}</> : <span className="sc-about__placeholder">{fallback}</span>;
}

// "By the Numbers" — shown on the Simulation page right under the overview, above the tabs,
// so every visitor sees it.
export function SimulationStats() {
  return (
    <section aria-labelledby="sc-about-stats" className="sc-sim__section">
      <h2 id="sc-about-stats" className="sc-sim__heading">Current City Statistics</h2>
      <p className="sc-sim__sub">
        <Text value={statsIntro} fallback="A line introducing the stats." />
      </p>

      <dl className="sc-about__stats">
        {stats.map((stat, i) => (
          <div key={i} className="sc-about__stat">
            <dt className="sc-about__stat-label">
              <Text value={stat.label} fallback="What this counts" />
            </dt>
            <dd className="sc-about__stat-value">
              <Text value={stat.value} fallback="00" />
            </dd>
            {stat.note && <dd className="sc-about__stat-note">{stat.note}</dd>}
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function SimulationAbout() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<SimulationPicture | null>(null);

  const enlarge = (pic: SimulationPicture) => {
    setOpen(pic);
    dialogRef.current?.showModal();
  };

  return (
    <>
      {/* ── HOW IT WORKS ── */}
      <section aria-labelledby="sc-about-how" className="sc-sim__section">
        <h2 id="sc-about-how" className="sc-sim__heading">How It Works</h2>
        <p className="sc-sim__sub">
          <Text value={howItWorksIntro} fallback="Intro paragraph about how the simulation works." />
        </p>

        <ol className="sc-about__steps">
          {howItWorksSteps.map((step, i) => (
            <li key={i} className="sc-about__step">
              <span className="sc-about__step-num" aria-hidden="true">{i + 1}</span>
              <div>
                <h3 className="sc-about__step-title">
                  <Text value={step.title} fallback={`Step ${i + 1} title`} />
                </h3>
                <p className="sc-about__step-text">
                  <Text value={step.text} fallback="What happens in this step." />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── PICTURES ── */}
      <section aria-labelledby="sc-about-pics" className="sc-sim__section">
        <h2 id="sc-about-pics" className="sc-sim__heading">From the Simulation</h2>
        <p className="sc-sim__sub">
          <Text value={picturesIntro} fallback="A line introducing the pictures." />
        </p>

        <div className="sc-about__gallery">
          {pictures.map((pic, i) => (
            <figure key={i} className="sc-about__figure">
              {pic.src ? (
                <button
                  type="button"
                  className="sc-about__photo-btn"
                  onClick={() => enlarge(pic)}
                  aria-label={`Enlarge picture: ${pic.alt || pic.caption || `picture ${i + 1}`}`}
                >
                  <img src={pic.src} alt={pic.alt} loading="lazy" className="sc-about__photo" />
                </button>
              ) : (
                <div className="sc-about__photo sc-about__photo--empty" aria-hidden="true">
                  <ImageIcon size={36} />
                  <span>Picture {i + 1}</span>
                </div>
              )}
              <figcaption className="sc-about__caption">
                <Text value={pic.caption} fallback="Caption" />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Enlarged picture */}
      <dialog
        ref={dialogRef}
        className="sc-about__lightbox"
        onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === e.currentTarget) dialogRef.current?.close(); }}
      >
        {open && (
          <figure>
            <img src={open.src} alt={open.alt} />
            {open.caption && <figcaption>{open.caption}</figcaption>}
          </figure>
        )}
        <form method="dialog">
          <button className="sc-about__lightbox-close">Close</button>
        </form>
      </dialog>
    </>
  );
}
