// ─── About the Simulation ─────────────────────────────────────────
// Everything shown on the "About the Simulation" tab of the Simulation page.
// Fill in the text below; the page lays it out for you.
//
// • Anything left as '' shows as a grey placeholder, so you can see where it goes.
// • Add or remove items in a list to add or remove steps, pictures or stats.
// • Pictures: put the file in public/images/simulation/ and set `src` to
//   '/images/simulation/your-file.jpg'. Always write `alt`: a short description of
//   the picture for people using screen readers.

export interface HowItWorksStep {
  title: string;
  text: string;
}

export interface SimulationPicture {
  src: string;      // e.g. '/images/simulation/council-vote.jpg'
  alt: string;      // what the picture shows, for screen readers
  caption: string;  // shown under the picture (may be '')
}

export interface SimulationStat {
  value: string;    // the big number, e.g. '42' or '3 years'
  label: string;    // what it counts, e.g. 'Ordinances passed'
  note?: string;    // optional small line underneath
}

// ── How it works ──
export const howItWorksIntro = '';

export const howItWorksSteps: HowItWorksStep[] = [
  { title: '', text: '' },
  { title: '', text: '' },
  { title: '', text: '' },
];

// ── Pictures ──
export const picturesIntro = '';

export const pictures: SimulationPicture[] = [
  { src: '', alt: '', caption: '' },
  { src: '', alt: '', caption: '' },
  { src: '', alt: '', caption: '' },
];

// ── Stats ──
export const statsIntro = '';

export const stats: SimulationStat[] = [
  { value: '', label: '' },
  { value: '', label: '' },
  { value: '', label: '' },
  { value: '', label: '' },
];
