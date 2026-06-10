// ─── Resource types ──────────────────────────────────────────────
// To add a new item: append to any module's `items` array.
// To add a new module: append to the `modules` array at the bottom.

export type ResourceCategory = 'explainer' | 'guide' | 'video' | 'quiz' | 'activity';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  readTime?: string;
  href?: string;      // external link if applicable; null = coming soon
  isNew?: boolean;    // shows a "New" badge
}

export interface ResourceModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;      // accent color for the module (CSS color string)
  items: ResourceItem[];
}

// ─── Category display config ─────────────────────────────────────
export const categoryMeta: Record<ResourceCategory, { label: string; cssClass: string }> = {
  explainer: { label: 'Explainer', cssClass: 'badge--explainer' },
  guide:     { label: 'Guide',     cssClass: 'badge--guide'     },
  video:     { label: 'Video',     cssClass: 'badge--video'     },
  quiz:      { label: 'Quiz',      cssClass: 'badge--quiz'      },
  activity:  { label: 'Activity',  cssClass: 'badge--minutes'   },
};

// ─── Curriculum modules ──────────────────────────────────────────
export const modules: ResourceModule[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'Introduction to LA Government',
    subtitle: 'How the city is structured and who holds power',
    description:
      'Start here. This module covers the fundamental architecture of Los Angeles city government — the split between the Mayor and the City Council, how districts work, and the lifecycle of a policy from first idea to enacted law.',
    color: '#C9922A',
    items: [
      {
        id: 'm1-001',
        title: 'What is the LA City Council?',
        description:
          'An introduction to the 15-district structure, how councilmembers are elected, the committees they sit on, and the legislative powers the Council holds.',
        category: 'explainer',
        readTime: '5 min read',
      },
      {
        id: 'm1-002',
        title: 'The Mayor vs. the Council: LA\'s split executive',
        description:
          'LA operates under a "weak mayor" model compared to cities like New York. This explainer maps the balance of power: what the Mayor controls directly, what requires council approval, and where the lines blur.',
        category: 'explainer',
        readTime: '6 min read',
      },
      {
        id: 'm1-003',
        title: 'How a motion becomes policy',
        description:
          'Step-by-step: a council motion is introduced, referred to committee, heard in public testimony, amended, voted on, and enacted. Follow a real motion from first filing to final vote.',
        category: 'guide',
        readTime: '8 min read',
      },
      {
        id: 'm1-004',
        title: 'Reading a council agenda',
        description:
          'Real LA council agendas are dense. This guide breaks down every section — consent calendar, special items, public comment slots — so you can follow along at a live or simulated session.',
        category: 'guide',
        readTime: '5 min read',
      },
      {
        id: 'm1-005',
        title: 'Know your district — video walkthrough',
        description:
          'A visual tour of how LA\'s 15 council districts are drawn, which neighborhoods they cover, and exactly how to look up who represents you and how to contact them.',
        category: 'video',
        readTime: '12 min',
      },
      {
        id: 'm1-006',
        title: 'Module 1 vocabulary quiz',
        description:
          'Test your grasp of key terms from this module: quorum, ordinance, resolution, consent calendar, motion, and more. A good checkpoint before moving on.',
        category: 'quiz',
        readTime: '~10 questions',
      },
    ],
  },

  {
    id: 'module-2',
    number: 2,
    title: 'LA Government in Practice',
    subtitle: 'Neighborhood councils, budgets, and civic participation',
    description:
      'Beyond the formal structure, LA has a rich ecosystem of neighborhood councils, commissions, and public-participation mechanisms. This module covers the parts of local government most directly accessible to everyday residents.',
    color: '#2A6EC9',
    items: [
      {
        id: 'm2-001',
        title: 'What are Neighborhood Councils?',
        description:
          'LA\'s 100+ neighborhood councils are the most hyperlocal layer of city government. Learn how they\'re formed, what power they actually have, how to find yours, and what "NC funding" means for your block.',
        category: 'explainer',
        readTime: '6 min read',
      },
      {
        id: 'm2-002',
        title: 'City commissions and boards',
        description:
          'Dozens of commissions — Planning, Police, Recreation & Parks, and more — make consequential decisions before items ever reach the Council. This guide maps the commission landscape and explains how to engage.',
        category: 'guide',
        readTime: '7 min read',
      },
      {
        id: 'm2-003',
        title: 'City budget basics',
        description:
          'Where does LA\'s $14B+ annual budget come from and where does it go? This primer walks through revenue sources, departmental allocations, the budget calendar, and how residents can weigh in during the process.',
        category: 'explainer',
        readTime: '7 min read',
      },
      {
        id: 'm2-004',
        title: 'How to speak at public comment',
        description:
          'A practical, step-by-step guide to signing up for, preparing, and delivering public comment at an LA City Council meeting — including two-minute rules, remote sign-up, and what actually makes testimony effective.',
        category: 'guide',
        readTime: '4 min read',
      },
      {
        id: 'm2-005',
        title: 'Writing a public comment — practice activity',
        description:
          'Using a provided sample agenda item, draft a two-minute public comment statement. Follow the structure: identify yourself, state your position, give one piece of evidence, and make a specific ask.',
        category: 'activity',
        readTime: '20 min activity',
        isNew: true,
      },
      {
        id: 'm2-006',
        title: 'Module 2 vocabulary quiz',
        description:
          'Check your understanding of neighborhood councils, commissions, the budget cycle, and public participation terms from this module.',
        category: 'quiz',
        readTime: '~10 questions',
      },
    ],
  },

  {
    id: 'module-3',
    number: 3,
    title: 'Policy Issues & Local Advocacy',
    subtitle: 'Housing, transportation, land use, and how to push for change',
    description:
      'This module connects civic structures to real policy domains. Understand how housing decisions are made in LA, how zoning works, and what effective local advocacy actually looks like — from petition to council vote.',
    color: '#2A8F4E',
    items: [
      {
        id: 'm3-001',
        title: 'Housing policy in LA: a primer',
        description:
          'Rent stabilization, zoning variances, ADU rules, and the Planning Commission — LA\'s housing policy landscape is fragmented across multiple bodies. This explainer maps who controls what.',
        category: 'explainer',
        readTime: '9 min read',
        isNew: true,
      },
      {
        id: 'm3-002',
        title: 'How zoning decisions get made',
        description:
          'From a developer\'s initial application to a City Council vote, trace the full path of a zoning change — including the role of the Planning Department, the Planning Commission, and community input.',
        category: 'guide',
        readTime: '8 min read',
        isNew: true,
      },
      {
        id: 'm3-003',
        title: 'Transportation and mobility policy',
        description:
          'Who decides where bike lanes go? How does LADOT interact with the City Council? This piece covers LA\'s transportation governance and the advocacy levers available to residents.',
        category: 'explainer',
        readTime: '6 min read',
      },
      {
        id: 'm3-004',
        title: 'Running an advocacy campaign — simulation activity',
        description:
          'Pick a real or fictional local issue, identify your target decision-maker, map your stakeholders, and draft a two-step advocacy plan. A guided worksheet for the full Sim-Civics simulation.',
        category: 'activity',
        readTime: '45 min activity',
        isNew: true,
      },
    ],
  },
];
