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
export const howItWorksIntro = 'The city council simulation run in Harvard Westlake is powered, first and foremost, by students. Students (acting as council members) submit ordinances based on stats in the city. Those ordinances are debated and passed by the city council, being sent on to the mayor for a signature. The stats are then updated based on the ordinances passed.';

export const howItWorksSteps: HowItWorksStep[] = [
  { title: 'Member Submits Ordinance', text: 'A member of Sim-Civics Club at Harvard-Westlake, acting as a council member, submits an ordinance which contains provisions regarding a proposed solution to the city.' },
  { title: 'Ordinances Goes to the Floor', text: 'The bill goes on a Legislative Agenda for the next meeting of the club. It is then introduced by the Speaker of the Council and goes through a process of debate.'},
  { title: 'Ordinance is Voted and Signed', text: 'The ordinance is voted on. If it passes by a simple majority, the ordinance is sent to the mayor who is allowed to veto it. Most ordinances get signed as a courtesy from the Mayor.'},
  {title: 'Stats are updated', text: 'The bill is passed to an AI model specifically designed to rate the effects of the ordinance on certain city stats, assigning values based on how much stats increase or decrease. The stats are updated to reflect the new values. The AI model is trained to be modest in its impacts to reflect how real ordinances take some time to have their full effects seen.'}
];

// ── Pictures ──
export const picturesIntro = 'As part of meetings, we usually record pictures of the starts of our meetings to record attendance. Here are some of them.';

export const pictures: SimulationPicture[] = [
  { src: '/public/images/simulation/Meeting1.jpg', alt: '', caption: 'Meeting Last March 2025'},
  { src: '/public/images/simulation/Meeting4.jpg', alt: '', caption: '10/19/26 Meeting' },
  { src: '/public/images/simulation/Meeting2.jpg', alt: '', caption: '10/29/26 Meeting' },
];

// ── Stats ── (shown under the overview at the top of the Simulation page, above the tabs)
export const statsIntro = 'Current statistics of the city. All stats are placed on a 0-100 scale. 0 means extremely low or weak depending on the statistic (eg. 0 Economy means a nonfunctioning economy) and 100 means extremely high or strong depending on the statistic (eg. 100 Economy means an extremely robust one). High statistics aren\'t always good; a 100 on crime, for example, means a very unsafe city. Ordinance increase or decrease stats by multiples of 5. Some stats are tied together: a high tax rate, for example, leads to economic downturn over time.';

export const stats: SimulationStat[] = [
  { value: '25', label: 'Crime' },
  { value: '50', label: 'Ease of Living' },
  { value: '50', label: 'Environment' },
  { value: '45', label: 'Economy' },
  {value: '60', label: 'Average Tax Rate'},
  {value: '55', label: 'Education'}
];
