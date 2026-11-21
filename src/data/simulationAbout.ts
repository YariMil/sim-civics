// ─── About the Simulation ─────────────────────────────────────────
// Everything shown on the "About the Simulation" tab of the Simulation page.
// Fill in the text below; the page lays it out for you.
//
// • Anything left as '' shows as a grey placeholder, so you can see where it goes.
// • Add or remove items in a list to add or remove steps, pictures or stats.
// • Pictures: put the file in public/images/simulation/ and set `src` to
//   '/images/simulation/your-file.jpg'. Always write `alt`: a short description of
//   the picture for people using screen readers.

// Icons available for the How It Works steps (shown in the step graphic).
export type StepIcon = 'submit' | 'debate' | 'vote' | 'sign' | 'stats' | 'council';

export interface HowItWorksStep {
  title: string;
  text: string;
  icon: StepIcon;   // which picture to show for this step
}

export interface SimulationPicture {
  src: string;      // e.g. '/images/simulation/council-vote.jpg'
  alt: string;      // what the picture shows, for screen readers
  caption: string;  // shown under the picture (may be '')
}

export interface SimulationStat {
  value: string;           // the number on the 0-100 scale, e.g. '45'
  label: string;           // the stat's name, e.g. 'Crime'
  higherIsBetter: boolean; // true: the bar goes red at 0 to green at 100. false (e.g. Crime): green at 0 to red at 100
  description: string;     // a short explanation of what the stat measures
}

// ── How it works ──
export const howItWorksIntro = 'The city council simulation run in Harvard Westlake is powered, first and foremost, by students. Students (acting as council members) submit ordinances based on stats in the city. Those ordinances are debated and passed by the city council, being sent on to the mayor for a signature. The stats are then updated based on the ordinances passed.';

export const howItWorksSteps: HowItWorksStep[] = [
  { title: 'Member Submits Ordinance', text: 'A member of Sim-Civics Club at Harvard-Westlake, acting as a council member, submits an ordinance which contains provisions regarding a proposed solution to the city.', icon: 'submit' },
  { title: 'Ordinances Goes to the Floor', text: 'The bill goes on a Legislative Agenda for the next meeting of the club. It is then introduced by the Speaker of the Council and goes through a process of debate.', icon: 'debate' },
  { title: 'Ordinance is Voted and Signed', text: 'The ordinance is voted on. If it passes by a simple majority, the ordinance is sent to the mayor who is allowed to veto it. Most ordinances get signed as a courtesy from the Mayor.', icon: 'vote' },
  {title: 'Stats are updated', text: 'The bill is passed to an AI model specifically designed to rate the effects of the ordinance on certain city stats, assigning values based on how much stats increase or decrease. The stats are updated to reflect the new values. The AI model is trained to be modest in its impacts to reflect how real ordinances take some time to have their full effects seen.', icon: 'stats' }
];

// ── Latest meeting photo ──
// Shown at the top of the Simulation page, to the right of the intro text.
// Put the file in public/images/simulation/ and set src to '/images/simulation/your-file.jpg'.
export const latestMeetingPhoto: SimulationPicture = {
  src: '/images/simulation/Meeting2.jpg',
  alt: '',
  caption: '',
};

// ── Pictures ──
export const picturesIntro = 'As part of meetings, we usually record pictures of the starts of our meetings to record attendance. Here are some of them.';

export const pictures: SimulationPicture[] = [
  { src: '/images/simulation/Meeting1.jpg', alt: '', caption: 'Meeting Last March 2025'},
  { src: '/images/simulation/Meeting4.jpg', alt: '', caption: '10/19/26 Meeting' },
  { src: '/images/simulation/Meeting2.jpg', alt: '', caption: '10/29/26 Meeting' },
];

// ── Stats ── (shown under the overview at the top of the Simulation page, above the tabs)
export const statsIntro = 'Current statistics of the city. All stats are placed on a 0-100 scale. 0 means extremely low or weak depending on the statistic (eg. 0 Economy means a nonfunctioning economy) and 100 means extremely high or strong depending on the statistic (eg. 100 Economy means an extremely robust one). High statistics aren\'t always good; a 100 on crime, for example, means a very unsafe city. Ordinance increase or decrease stats by multiples of 5. Some stats are tied together: a high tax rate, for example, leads to economic downturn over time.';

export const stats: SimulationStat[] = [
  { value: '25', label: 'Crime',
    higherIsBetter: false,
    description: 'How much crime the city has, from violent crime to theft and vandalism.' },
  { value: '50', label: 'Ease of Living',
    higherIsBetter: true,
    description: 'How easy daily life is for residents: housing, transit, services and cost of living.' },
  { value: '50', label: 'Environment',
    higherIsBetter: true,
    description: 'The health of the city\'s air, water, parks and green spaces.' },
  { value: '45', label: 'Economy',
    higherIsBetter: true,
    description: 'How strong the local economy is: jobs, wages and business activity.' },
  {value: '60', label: 'Average Tax Rate',
    higherIsBetter: false,
    description: 'How heavily residents and businesses are taxed on average. High taxes slow the economy over time.' },
  {value: '55', label: 'Education',
    higherIsBetter: true,
    description: 'The quality of and access to the city\'s schools and learning programs.' }
];
