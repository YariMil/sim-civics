// ─── Slide types ─────────────────────────────────────────────────
// Each module has a `slides` array. Slides are rendered one at a
// time in ModuleViewer. Two kinds exist: 'text' and 'quiz'.
//
// TEXT slide  — heading + body paragraphs (+ optional bullet list)
// QUIZ slide  — a question with 4 choices; one correct answer

export interface TextSlide {
  type: 'text';
  id: string;
  heading: string;
  body: string[];           // each string is one paragraph
  bullets?: string[];       // optional bullet list rendered below body
  note?: string;            // small italic footnote at the bottom
}

export interface QuizSlide {
  type: 'quiz';
  id: string;
  question: string;
  choices: string[];        // exactly 4 items
  correct: number;          // 0-based index of the correct choice
  explanation: string;      // shown after the user answers
}

export type Slide = TextSlide | QuizSlide;

export interface ModuleSlides {
  moduleId: string;         // must match ResourceModule.id in resources.ts
  slides: Slide[];
}

// ─── Module 1 ────────────────────────────────────────────────────
const module1: ModuleSlides = {
  moduleId: 'module-1',
  slides: [
    {
      type: 'text',
      id: 'm1-s01',
      heading: 'Welcome to Module 1',
      body: [
        'This module introduces the fundamental architecture of Los Angeles city government.',
        'By the end, you\'ll understand who holds power in LA, how the Mayor and City Council relate to each other, and how an idea becomes an enforceable city policy.',
      ],
      bullets: [
        'The structure of the LA City Council',
        'LA\'s split executive: Mayor vs. Council',
        'How a motion becomes policy',
        'Reading a council agenda',
      ],
      note: 'Estimated time: 20–25 minutes',
    },
    {
      type: 'text',
      id: 'm1-s02',
      heading: 'The LA City Council',
      body: [
        'Los Angeles is governed by a 15-member City Council, each member representing one of 15 geographic districts across the city. Councilmembers are elected to four-year terms.',
        'The Council is the legislative branch of city government. It passes ordinances (laws), adopts the city budget, approves contracts, and sets zoning policy.',
        'The Council meets in full session roughly twice a week, but most of the real work happens in committees — smaller groups of 3–5 councilmembers focused on specific policy areas like Housing, Transportation, or Budget.',
      ],
    },
    {
      type: 'text',
      id: 'm1-s03',
      heading: 'What does a councilmember actually do?',
      body: [
        'A councilmember wears several hats simultaneously. As a legislator, they introduce and vote on motions. As a constituency representative, they respond to residents\' concerns and attend community events in their district.',
        'They also sit on 2–4 committees, where most policy is actually shaped before it ever reaches a full council vote.',
      ],
      bullets: [
        'Introduce motions and resolutions',
        'Serve on standing committees (Housing, Budget, Transportation, etc.)',
        'Hold district office hours and community meetings',
        'Approve or block development projects in their district',
        'Advocate for district priorities in the city budget',
      ],
    },
    {
      type: 'quiz',
      id: 'm1-q01',
      question: 'How many members sit on the LA City Council?',
      choices: ['9', '12', '15', '20'],
      correct: 2,
      explanation: 'The LA City Council has 15 members, each representing one of 15 geographic districts. This structure has been in place since 1925.',
    },
    {
      type: 'text',
      id: 'm1-s04',
      heading: "LA's Split Executive: Mayor vs. Council",
      body: [
        'Los Angeles has what political scientists call a "council-manager adjacent" system with a relatively weak mayor compared to cities like New York or Chicago.',
        'The Mayor is the chief executive: they set policy priorities, propose the annual budget, manage city departments, and represent LA externally. But the Mayor cannot pass laws — only the Council can.',
        'The Council, in turn, can override a mayoral veto with a two-thirds vote (10 of 15 members). This creates a system of genuine checks and balances at the local level.',
      ],
      note: 'In 2022, LA voters approved Charter Amendment ES1, giving the Mayor more direct authority over homelessness response — a rare expansion of mayoral power.',
    },
    {
      type: 'text',
      id: 'm1-s05',
      heading: 'Where their powers diverge',
      body: [
        'Understanding which branch controls what helps you know who to contact when you want something to change.',
      ],
      bullets: [
        'Mayor controls: LAPD & LAFD chiefs, city department heads, budget proposal',
        'Council controls: passing ordinances, approving the budget, land use decisions',
        'Shared: major contracts (Mayor proposes, Council approves), emergency declarations',
        'Independent: City Attorney, City Controller (elected separately — answer to voters, not Mayor or Council)',
      ],
    },
    {
      type: 'quiz',
      id: 'm1-q02',
      question: "Which of the following is the Mayor's exclusive power?",
      choices: [
        'Passing city ordinances',
        'Approving the annual budget',
        'Appointing city department heads',
        'Overriding a council veto',
      ],
      correct: 2,
      explanation: 'The Mayor appoints the heads of city departments like the LAPD and LAFD. The Council passes ordinances and approves the budget; the Mayor proposes but cannot unilaterally adopt it.',
    },
    {
      type: 'text',
      id: 'm1-s06',
      heading: 'How a Motion Becomes Policy',
      body: [
        'Most policy in LA begins as a "motion" — a formal request from a councilmember asking the city to do something. Motions are the engine of local lawmaking.',
        'The path from introduction to law is longer than most people realize, and there are multiple points where the public can weigh in.',
      ],
    },
    {
      type: 'text',
      id: 'm1-s07',
      heading: 'The lifecycle of a motion',
      body: [
        'Step 1 — Introduction: A councilmember files a motion. It\'s read into the record at a full council meeting and assigned a file number (e.g., CF 24-0413).',
        'Step 2 — Committee referral: The Council President refers it to the relevant committee (e.g., a motion about bike lanes goes to Transportation).',
        'Step 3 — Committee hearing: The committee holds a public hearing. Residents can speak during public comment. Departments submit reports. Staff make recommendations.',
        'Step 4 — Committee vote: The committee votes to approve, amend, or kill the motion. If approved, it goes back to the full Council.',
        'Step 5 — Full Council vote: All 15 members vote. A simple majority (8 of 15) passes most items. Emergency ordinances require 12 votes.',
        'Step 6 — Mayor action: The Mayor signs or vetoes. Council can override a veto with 10 votes.',
      ],
    },
    {
      type: 'quiz',
      id: 'm1-q03',
      question: 'At which stage can members of the public most directly influence a motion?',
      choices: [
        'When the Mayor signs or vetoes',
        'During the full Council vote',
        'During the committee hearing (public comment)',
        'When the motion is introduced',
      ],
      correct: 2,
      explanation: 'Committee hearings are where public comment carries the most weight. The committee stage is where motions are shaped and amended — full council votes are usually formalities by then.',
    },
    {
      type: 'text',
      id: 'm1-s08',
      heading: 'Reading a Council Agenda',
      body: [
        'A council agenda lists everything scheduled for a meeting. They can run 50+ items and look intimidating — but they follow a consistent structure.',
        'The Consent Calendar contains routine, non-controversial items that are voted on in bulk without discussion. Any councilmember can "pull" an item off consent to discuss it separately.',
        'Special Items are heard individually. These include major ordinances, budget actions, and items that received public opposition. This is where public comment is most impactful.',
      ],
      bullets: [
        'Roll Call & Invocation',
        'Approval of the Consent Calendar',
        'Special Items (heard individually)',
        'Public Comment — General (2 minutes per speaker)',
        'Closed Session (if needed)',
      ],
    },
    {
      type: 'quiz',
      id: 'm1-q04',
      question: 'What is the "Consent Calendar" on a council agenda?',
      choices: [
        'A list of items reserved for the Mayor\'s review',
        'Routine items voted on together without individual debate',
        'Agenda items that require a 2/3 supermajority',
        'A record of previous meeting minutes',
      ],
      correct: 1,
      explanation: 'The Consent Calendar bundles routine, uncontroversial items into a single vote to save time. Any council member can "pull" an item off consent to force a separate discussion.',
    },
    {
      type: 'text',
      id: 'm1-s09',
      heading: 'Module 1 Complete',
      body: [
        'You\'ve covered the core architecture of LA city government: the 15-member Council, the Mayor\'s role, the lifecycle of a motion, and how to read an agenda.',
        'These fundamentals apply to everything else in the curriculum — every other module builds on what you\'ve learned here.',
      ],
      bullets: [
        '✓ The LA City Council has 15 members across 15 districts',
        '✓ LA has a split executive — Mayor and Council check each other',
        '✓ Motions move through introduction → committee → full vote → Mayor',
        '✓ Committee hearings are the main point of public influence',
      ],
      note: 'Continue to Module 2 to explore neighborhood councils, city commissions, and how to participate directly in local government.',
    },
  ],
};

// ─── Module 2 ────────────────────────────────────────────────────
const module2: ModuleSlides = {
  moduleId: 'module-2',
  slides: [
    {
      type: 'text',
      id: 'm2-s01',
      heading: 'Welcome to Module 2',
      body: [
        'Module 1 covered the formal structure. Module 2 goes deeper into the parts of LA government most accessible to everyday residents.',
        'You\'ll learn about neighborhood councils — the most hyperlocal layer of LA government — along with city commissions, the budget process, and exactly how to make your voice heard at a council meeting.',
      ],
      bullets: [
        'Neighborhood Councils and how they work',
        'City commissions and boards',
        'How the city budget is made',
        'How to give public comment',
      ],
      note: 'Estimated time: 20–25 minutes',
    },
    {
      type: 'text',
      id: 'm2-s02',
      heading: 'Neighborhood Councils',
      body: [
        'Los Angeles has over 100 Neighborhood Councils (NCs) — volunteer-run advisory bodies that represent specific communities across the city. They\'re part of LA\'s official government structure, created by the City Charter in 2000.',
        'NCs don\'t pass laws or control budgets directly. Their power is advisory: they submit Community Impact Statements (CIS) on council motions, hold community meetings, and allocate a small annual budget (around $37,000) for neighborhood improvements.',
        'Think of them as the amplifier between residents and the City Council. A CIS from a neighborhood council carries real weight — councilmembers pay attention when their constituents formally go on record.',
      ],
    },
    {
      type: 'quiz',
      id: 'm2-q01',
      question: 'What is a Community Impact Statement (CIS)?',
      choices: [
        'A city report on environmental hazards',
        'A formal neighborhood council position on a pending motion',
        'A petition submitted by residents to the Mayor',
        'A legal challenge to a zoning decision',
      ],
      correct: 1,
      explanation: 'A CIS is how a neighborhood council officially goes on the record about a pending City Council motion. It\'s attached to the council file and visible to all 15 councilmembers.',
    },
    {
      type: 'text',
      id: 'm2-s03',
      heading: 'City Commissions',
      body: [
        'Between the City Council and city departments sit dozens of commissions and boards — appointed bodies that make consequential decisions, often before items reach the Council.',
        'The Planning Commission, for example, holds hearings on major development projects and zoning changes. The Board of Police Commissioners oversees the LAPD. The Recreation and Parks Commission manages the city\'s parks system.',
        'Commissioners are typically appointed by the Mayor with Council confirmation. Meetings are public, and most commissions accept public comment — making them a key, underused advocacy venue.',
      ],
      bullets: [
        'Planning Commission — zoning, development, land use',
        'Board of Police Commissioners — LAPD oversight',
        'Recreation & Parks Commission — parks and facilities',
        'Board of Public Works — infrastructure, streets, sanitation',
        'Civil Service Commission — city employment rules',
      ],
    },
    {
      type: 'text',
      id: 'm2-s04',
      heading: "The City Budget",
      body: [
        'Los Angeles operates on an annual budget of roughly $14–15 billion. The Mayor proposes the budget each April; the Council adopts it by June 1.',
        'The budget funds everything from the LAPD and fire department to library hours, street repair, and park programming. It\'s divided into the General Fund (discretionary spending) and special funds tied to specific revenue streams.',
        'The budget process is one of the most consequential — and most participatory — moments in the city\'s year. Budget advocates, neighborhood councils, and individual residents all have formal opportunities to weigh in.',
      ],
      note: 'The Mayor\'s proposed budget is published online each spring at budget.lacity.gov.',
    },
    {
      type: 'quiz',
      id: 'm2-q02',
      question: 'Who proposes the annual city budget in Los Angeles?',
      choices: [
        'The City Controller',
        'The Budget & Finance Committee',
        'The Mayor',
        'The full City Council by vote',
      ],
      correct: 2,
      explanation: 'The Mayor proposes the budget each April. The Council\'s Budget & Finance Committee then holds hearings and can amend it before the full Council adopts the final budget by June 1.',
    },
    {
      type: 'text',
      id: 'm2-s05',
      heading: 'How to Speak at Public Comment',
      body: [
        'Public comment is your formal right to address the City Council. Every regular council meeting and committee hearing includes a public comment period.',
        'For most items, each speaker gets two minutes. For general public comment (not tied to a specific agenda item), you get one minute.',
        'You can sign up to speak in person at the meeting, or — since the pandemic — remotely by phone. Remote sign-up closes 30 minutes before the meeting starts.',
      ],
    },
    {
      type: 'text',
      id: 'm2-s06',
      heading: 'Making your comment count',
      body: [
        'Two minutes goes fast. The most effective public comments follow a simple structure that maximizes impact.',
      ],
      bullets: [
        '1. Identify yourself — name and, if relevant, your district or neighborhood',
        '2. State your position clearly — support or oppose, in the first sentence',
        '3. Give one specific reason — a personal story or concrete fact lands better than general statements',
        '4. Make a specific ask — "I urge you to vote yes on this motion" or "I ask the committee to amend Section 3"',
        '5. Close strongly — restate your ask, then stop',
      ],
      note: 'Councilmembers and their staff read the speaker list before the meeting. Even if you\'re not called, signing up signals community interest.',
    },
    {
      type: 'quiz',
      id: 'm2-q03',
      question: 'How long does each speaker typically get during public comment on a specific agenda item?',
      choices: ['1 minute', '2 minutes', '3 minutes', '5 minutes'],
      correct: 1,
      explanation: 'Most agenda items allow 2 minutes per speaker. General public comment (not tied to a specific item) is usually 1 minute. Some special hearings allow 3 minutes.',
    },
    {
      type: 'text',
      id: 'm2-s07',
      heading: 'Module 2 Complete',
      body: [
        'You now understand the layers of LA government that exist below and alongside the City Council — neighborhood councils, commissions, and the budget process — and how to engage with all of them.',
      ],
      bullets: [
        '✓ LA has 100+ neighborhood councils with advisory power',
        '✓ City commissions make key decisions before items reach the Council',
        '✓ The Mayor proposes the budget; the Council adopts it',
        '✓ Public comment is 2 minutes — lead with your position and make a specific ask',
      ],
      note: 'Continue to Module 3 to explore housing, zoning, transportation, and how to run a local advocacy campaign.',
    },
  ],
};

// ─── Module 3 ────────────────────────────────────────────────────
const module3: ModuleSlides = {
  moduleId: 'module-3',
  slides: [
    {
      type: 'text',
      id: 'm3-s01',
      heading: 'Welcome to Module 3',
      body: [
        'The first two modules gave you the structure. Module 3 applies it to real policy domains: housing, zoning, and transportation — the issues most likely to come before your neighborhood council or city councilmember.',
        'You\'ll also learn what an effective local advocacy campaign actually looks like, from identifying your target to drafting your ask.',
      ],
      bullets: [
        'Housing policy in LA',
        'How zoning decisions get made',
        'Transportation and mobility governance',
        'Running a local advocacy campaign',
      ],
      note: 'Estimated time: 25–30 minutes',
    },
    {
      type: 'text',
      id: 'm3-s02',
      heading: "Housing Policy in LA",
      body: [
        'Housing is arguably the most contested policy area in Los Angeles. Jurisdiction is fragmented across multiple bodies, which makes it both complex and full of intervention points.',
        'The City Council sets zoning rules and adopts housing elements. The Planning Commission reviews major projects. The State of California increasingly constrains what cities can do, through laws like SB 9 and the Housing Accountability Act.',
      ],
      bullets: [
        'Rent Stabilization Ordinance (RSO) — covers buildings built before 1978',
        'ADU rules — state law now makes it easier to build accessory dwelling units',
        'Inclusionary requirements — some developments must include affordable units',
        'Housing Element — the city\'s state-mandated plan for new housing capacity',
      ],
    },
    {
      type: 'quiz',
      id: 'm3-q01',
      question: "LA's Rent Stabilization Ordinance (RSO) generally applies to buildings built before which year?",
      choices: ['1965', '1978', '1990', '2000'],
      correct: 1,
      explanation: 'The RSO covers most rental units in buildings built before October 1, 1978. Newer buildings are generally not covered, though state law (AB 1482) provides some protections for those.',
    },
    {
      type: 'text',
      id: 'm3-s03',
      heading: 'How Zoning Decisions Get Made',
      body: [
        'Zoning determines what can be built where — housing density, commercial uses, building height. In LA, the base zoning map is set by the City Council, but individual projects often require variances or discretionary approvals.',
        'A typical zoning change or variance goes: applicant submits to Planning Department → environmental review (CEQA) → Planning Commission hearing → City Council if appealed or citywide.',
        'Community members can participate at the Planning Commission stage, at neighborhood council meetings, and by filing appeals if they disagree with a commission decision.',
      ],
    },
    {
      type: 'text',
      id: 'm3-s04',
      heading: 'Transportation and Mobility',
      body: [
        'Transportation policy in LA is split between several agencies. The City Council and LADOT (LA Department of Transportation) control streets, signals, bike lanes, and parking policy within city limits.',
        'Metro — the regional transit authority — is governed by a separate board that includes the Mayor and county supervisors. Metro decisions (rail lines, bus routes, fares) are made there, not at City Hall.',
        'Advocacy at the city level focuses on LADOT decisions: where protected bike lanes go, how parking is managed, and how street space is allocated.',
      ],
      note: 'The LA City Council must approve any major street reconfigurations, which makes councilmembers key decision-makers on mobility projects in their districts.',
    },
    {
      type: 'quiz',
      id: 'm3-q02',
      question: 'Which body governs Metro bus and rail service in LA?',
      choices: [
        'The LA City Council',
        'The LA Department of Transportation (LADOT)',
        'The Metro Board of Directors',
        'The State Transportation Agency (Caltrans)',
      ],
      correct: 2,
      explanation: 'Metro is governed by its own Board of Directors, which includes the Mayor of LA, LA County Supervisors, and representatives from other cities. It\'s separate from the City Council.',
    },
    {
      type: 'text',
      id: 'm3-s05',
      heading: 'Running a Local Advocacy Campaign',
      body: [
        'Effective local advocacy is specific, targeted, and persistent. Showing up once rarely moves anything — sustained engagement over weeks or months is what changes minds and votes.',
        'The first step is identifying the exact decision-maker. Is this a council vote? A Planning Commission hearing? A neighborhood council resolution? Different targets require different strategies.',
      ],
    },
    {
      type: 'text',
      id: 'm3-s06',
      heading: 'The anatomy of a local campaign',
      body: [
        'A simple framework for any local advocacy effort:',
      ],
      bullets: [
        '1. Define your ask — be specific (not "fix housing" but "vote yes on CF 24-0413")',
        '2. Identify your target — which person or body makes this specific decision?',
        '3. Map your allies — who else is affected? Neighborhood council? Other residents?',
        '4. Choose your tactics — public comment, letters, meetings with the councilmember\'s office, media',
        '5. Show up consistently — a single comment is easily forgotten; 10 people over 3 meetings is not',
        '6. Track the file — monitor the council file number at lacity.legistar.com',
      ],
    },
    {
      type: 'quiz',
      id: 'm3-q03',
      question: 'Where can you track a City Council file (motion) as it moves through the process?',
      choices: [
        'lacity.legistar.com',
        'ca.gov/legislation',
        'lamayor.org/motions',
        'neighborhoodcouncils.la',
      ],
      correct: 0,
      explanation: 'lacity.legistar.com is the official City of LA legislative management system. You can search by council file number, keyword, or councilmember to track any motion.',
    },
    {
      type: 'text',
      id: 'm3-s07',
      heading: 'Module 3 Complete',
      body: [
        'You\'ve completed the Sim-Civics core curriculum. You now understand the structure of LA government, how residents can participate, and how to connect that knowledge to real policy issues.',
      ],
      bullets: [
        '✓ Housing policy spans the City Council, Planning Commission, and state law',
        '✓ Zoning decisions involve the Planning Department, Commission, and Council',
        '✓ Metro and LADOT are separate — know which one controls what you\'re advocating for',
        '✓ Effective advocacy is specific, targeted, and sustained',
      ],
      note: 'Ready to put it all together? Head to the City Council Simulation to apply what you\'ve learned in a live mock session.',
    },
  ],
};

// ─── Export ──────────────────────────────────────────────────────
export const allModuleSlides: ModuleSlides[] = [module1, module2, module3];

export function getSlidesForModule(moduleId: string): Slide[] {
  return allModuleSlides.find((m) => m.moduleId === moduleId)?.slides ?? [];
}
