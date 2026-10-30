// ─── Resource types ──────────────────────────────────────────────
export type ResourceCategory = 'explainer' | 'guide' | 'video' | 'quiz' | 'activity';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  readTime?: string;
  href?: string;
  isNew?: boolean;
}

export interface ResourceModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
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
        description: 'An introduction to the 15-district structure, how councilmembers are elected, the committees they sit on, and the legislative powers the Council holds.',
        category: 'explainer',
        readTime: '5 min read',
      },
      {
        id: 'm1-002',
        title: "The Mayor vs. the Council: LA's split executive",
        description: 'LA operates under a "weak mayor" model compared to cities like New York. This explainer maps the balance of power: what the Mayor controls directly, what requires council approval, and where the lines blur.',
        category: 'explainer',
        readTime: '6 min read',
      },
      {
        id: 'm1-003',
        title: 'How a motion becomes policy',
        description: 'Step-by-step: a council motion is introduced, referred to committee, heard in public testimony, amended, voted on, and enacted. Follow a real motion from first filing to final vote.',
        category: 'guide',
        readTime: '8 min read',
      },
      {
        id: 'm1-004',
        title: 'Reading a council agenda',
        description: 'Real LA council agendas are dense. This guide breaks down every section — consent calendar, special items, public comment slots — so you can follow along at a live or simulated session.',
        category: 'guide',
        readTime: '5 min read',
      },
      {
        id: 'm1-005',
        title: 'Know your district — video walkthrough',
        description: "A visual tour of how LA's 15 council districts are drawn, which neighborhoods they cover, and exactly how to look up who represents you.",
        category: 'video',
        readTime: '12 min',
      },
      {
        id: 'm1-006',
        title: 'Module 1 vocabulary quiz',
        description: 'Test your grasp of key terms: quorum, ordinance, resolution, consent calendar, motion, and more.',
        category: 'quiz',
        readTime: '~10 questions',
      },
    ],
  },

  {
    id: 'module-2',
    number: 2,
    title: 'The City Council In Depth',
    subtitle: 'Elections, powers, structure, and a real ordinance case study',
    description:
      'A deep dive into the City Council as an institution — how members get elected, the formal and informal powers the Council holds, its internal leadership structure, and a step-by-step trace of a real ordinance from introduction to enactment.',
    color: '#2A6EC9',
    items: [
      {
        id: 'm2-001',
        title: 'How councilmembers are elected',
        description: 'Nonpartisan top-two elections, odd-year cycles, term limits, and how mid-term vacancies are filled by mayoral appointment.',
        category: 'explainer',
        readTime: '5 min read',
      },
      {
        id: 'm2-002',
        title: "The Council's explicit powers",
        description: 'A full enumeration of what the City Charter formally authorizes: ordinances, budget adoption, contract approval, confirmations, veto override, emergency powers, land use, and bond issuance.',
        category: 'explainer',
        readTime: '6 min read',
      },
      {
        id: 'm2-003',
        title: "The Council's implicit powers",
        description: 'Councilmanic Courtesy, budget leverage, oversight hearings, agenda control by committee chairs, and constituent service — the informal tools that shape outcomes as much as any written rule.',
        category: 'explainer',
        readTime: '6 min read',
      },
      {
        id: 'm2-004',
        title: 'Council leadership and committees',
        description: 'The Council President, President Pro Tempore, and the standing committee system — including how committee chairs are appointed and why that gatekeeper role is so consequential.',
        category: 'guide',
        readTime: '5 min read',
      },
      {
        id: 'm2-005',
        title: 'Case study: Tenant Anti-Harassment Ordinance',
        description: 'Trace CF 14-1635-S2 from a 2014 motion through seven years of hearings, amendments, and advocacy to a 13-0 council vote in 2021.',
        category: 'guide',
        readTime: '8 min read',
      },
      {
        id: 'm2-006',
        title: 'Module 2 quiz',
        description: 'Check your understanding of council elections, formal and informal powers, and the legislative process.',
        category: 'quiz',
        readTime: '~6 questions',
      },
    ],
  },

  {
    id: 'module-3',
    number: 3,
    title: 'The Mayor In Depth',
    subtitle: 'Elections, formal and informal powers, and real examples of mayoral authority',
    description:
      'A deep dive into the Office of the Mayor — how mayors are elected, what the Charter formally grants them, the informal tools that often matter more, and three real case studies showing how LA mayors have exerted power over and around the City Council.',
    color: '#2A8F4E',
    items: [
      {
        id: 'm3-001',
        title: 'How the Mayor is elected',
        description: 'Citywide nonpartisan top-two elections, two-term limits, and how the need to build cross-district coalitions shapes how mayors govern.',
        category: 'explainer',
        readTime: '5 min read',
      },
      {
        id: 'm3-002',
        title: "The Mayor's formal powers",
        description: 'Executive authority, appointment power, budget proposal, veto, emergency powers, and removal authority — what the City Charter explicitly grants.',
        category: 'explainer',
        readTime: '6 min read',
      },
      {
        id: 'm3-003',
        title: "The Mayor's informal powers",
        description: 'The bully pulpit, coalition building, budget signaling, federal and state relationships, and agenda-setting — the soft power that often exceeds formal Charter authority.',
        category: 'explainer',
        readTime: '6 min read',
      },
      {
        id: 'm3-004',
        title: 'Case study: Garcetti and homelessness',
        description: 'The 2015 emergency declaration, Measure HHH, and A Bridge Home — showing how a mayor used public mandate and media pressure to move a reluctant Council.',
        category: 'guide',
        readTime: '7 min read',
      },
      {
        id: 'm3-005',
        title: 'Case study: Bass and Executive Directive 1',
        description: 'Issued on her first day without a Council vote, ED1 mandated 60-day permit processing and created a new interagency body — an exercise of executive authority the Council could not directly stop.',
        category: 'guide',
        readTime: '6 min read',
        isNew: true,
      },
      {
        id: 'm3-006',
        title: 'Case study: Riordan and the veto',
        description: 'The 1996 living wage veto, the failed Council override, and the eventual compromise — illustrating the veto as a negotiating tool.',
        category: 'guide',
        readTime: '4 min read',
      },
      {
        id: 'm3-007',
        title: 'Module 3 quiz',
        description: 'Test your knowledge of mayoral elections, formal and informal powers, and the three case studies.',
        category: 'quiz',
        readTime: '~8 questions',
      },
    ],
  },

  {
    id: 'module-4',
    number: 4,
    title: 'City Departments',
    subtitle: 'What they do, how you encounter them, and why they matter',
    description:
      'The day-to-day experience of city government is delivered by departments — the agencies that turn policy into action. This module profiles five of the most visible: LAPD, Building and Safety, Transportation, Housing, and Public Works.',
    color: '#8B4AC9',
    items: [
      {
        id: 'm4-001',
        title: 'The LAPD: structure, oversight, and reach',
        description: 'How the LAPD is organized, who oversees it, what the Board of Police Commissioners does, and how the department\'s $3B+ budget makes it the central battleground in city budget debates.',
        category: 'explainer',
        readTime: '7 min read',
        isNew: true,
      },
      {
        id: 'm4-002',
        title: 'Building and Safety (LADBS): permits, inspections, and the housing crisis',
        description: 'How LADBS regulates all construction in the city, why slow permitting is itself a housing policy problem, and what the 2025 wildfires revealed about the department\'s capacity.',
        category: 'explainer',
        readTime: '6 min read',
        isNew: true,
      },
      {
        id: 'm4-003',
        title: 'Transportation (LADOT): streets, signals, and DASH',
        description: 'LADOT\'s role in managing 7,500 miles of streets, the Vision Zero program, parking enforcement, and why LADOT and Metro are separate agencies with a coordination problem.',
        category: 'explainer',
        readTime: '6 min read',
        isNew: true,
      },
      {
        id: 'm4-004',
        title: 'Housing (LAHD): RSO enforcement and tenant protections',
        description: 'How LAHD administers the Rent Stabilization Ordinance, handles habitability complaints, and supports tenants facing wrongful eviction or displacement.',
        category: 'guide',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm4-005',
        title: 'Public Works: streets, trash, and stormwater',
        description: 'The five bureaus of Public Works, LA\'s deferred infrastructure maintenance backlog, and why 311 is the most practical civic tool available to any resident.',
        category: 'explainer',
        readTime: '6 min read',
        isNew: true,
      },
      {
        id: 'm4-006',
        title: 'Module 4 quiz',
        description: 'Check your knowledge of which department does what, how to contact each one, and why they matter to daily life in LA.',
        category: 'quiz',
        readTime: '~6 questions',
      },
    ],
  },

  {
    id: 'module-5',
    number: 5,
    title: 'Justice & the Courts in LA',
    subtitle: 'How the legal system works and when you\'ll encounter it',
    description:
      'LA\'s courts are state institutions — not city government — but they shape daily life as directly as any ordinance. This module covers the court structure, how judges are selected, the City Attorney\'s prosecutorial role, administrative hearings, and three real cases where the justice system constrained or transformed city government.',
    color: '#B03A2E',
    items: [
      {
        id: 'm5-001',
        title: 'How courts in LA are structured',
        description: 'The three-tier California court system, what LA Superior Court handles, and how federal courts differ — and when each matters to residents.',
        category: 'explainer',
        readTime: '6 min read',
        isNew: true,
      },
      {
        id: 'm5-002',
        title: 'How judges are selected',
        description: 'Gubernatorial appointment, retention elections, contested races, and the Commission on Judicial Performance — how judges get on and off the bench.',
        category: 'explainer',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm5-003',
        title: 'The City Attorney: prosecutor and city counsel',
        description: 'The independently elected City Attorney\'s two roles — legal advisor to city government and prosecutor of misdemeanors — and how prosecutorial philosophy shapes enforcement on homelessness and quality-of-life offenses.',
        category: 'explainer',
        readTime: '6 min read',
        isNew: true,
      },
      {
        id: 'm5-004',
        title: 'Administrative hearings: the courts you\'re most likely to use',
        description: 'Parking ticket appeals, RSO tenant hearings, LADBS permit disputes — the quasi-judicial city processes that resolve most resident-government conflicts without ever going to Superior Court.',
        category: 'guide',
        readTime: '6 min read',
        isNew: true,
      },
      {
        id: 'm5-005',
        title: 'Case study: Mitchell v. City of Los Angeles',
        description: 'How a 2016 federal lawsuit over encampment sweeps produced a consent decree that constrained how the city could conduct homeless outreach operations for years.',
        category: 'guide',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm5-006',
        title: 'Case study: The LAPD federal consent decree (2001–2013)',
        description: 'After the Rampart scandal, a federal judge placed the LAPD under 12 years of court-supervised reform — one of the most significant examples of judicial intervention in local government in US history.',
        category: 'guide',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm5-007',
        title: 'Case study: Eviction in LA Superior Court',
        description: 'How unlawful detainer cases work, the five-day response window, the representation gap between landlords and tenants, and LA\'s right-to-counsel pilot program.',
        category: 'guide',
        readTime: '6 min read',
        isNew: true,
      },
      {
        id: 'm5-008',
        title: 'Module 5 quiz',
        description: 'Test your knowledge of courts, judicial selection, the City Attorney, administrative hearings, and the three case studies.',
        category: 'quiz',
        readTime: '~6 questions',
      },
    ],
  },

  {
    id: 'module-6',
    number: 6,
    title: 'Neighborhood Councils',
    subtitle: 'The most accessible layer of LA civic life',
    description:
      'Neighborhood Councils are LA\'s hyperlocal advisory bodies — created by the 1999 Charter reform, covering every neighborhood in the city, and open to anyone who lives, works, or has a stake in the community. This module covers their origins, structure, formal and informal powers, real case studies of NC influence, and exactly how to find yours and get involved.',
    color: '#C0392B',
    items: [
      {
        id: 'm6-001',
        title: 'What Neighborhood Councils are and where they came from',
        description: 'The 1999 Charter reform, the Valley secession movement, and why NCs were designed as advisory bodies — plus how over 100 NCs came to cover every neighborhood in the city.',
        category: 'explainer',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm6-002',
        title: 'NC structure and elections',
        description: 'Board composition, stakeholder categories, the broad eligibility definition that goes beyond voter registration or citizenship, and why low turnout creates both opportunity and risk.',
        category: 'explainer',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm6-003',
        title: "What Neighborhood Councils can formally do",
        description: 'Community Impact Statements, Neighborhood Purpose Grants, planning case comments, formal appeals, and Budget Advocates — the full toolkit and its actual weight.',
        category: 'guide',
        readTime: '6 min read',
        isNew: true,
      },
      {
        id: 'm6-004',
        title: "What Neighborhood Councils can informally do",
        description: 'Access to elected officials, resident mobilization, amplification — and the honest limits: councilmanic courtesy, capture risk, and the equity gap between well-resourced and under-resourced NCs.',
        category: 'guide',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm6-005',
        title: 'EmpowerLA: the city office that oversees NCs',
        description: 'How the Department of Neighborhood Empowerment certifies NCs, administers elections, distributes budgets, investigates complaints, and connects the NC system to City Hall.',
        category: 'explainer',
        readTime: '4 min read',
        isNew: true,
      },
      {
        id: 'm6-006',
        title: 'Case study: Silver Lake NC and the reservoir reopening',
        description: 'How sustained multi-venue NC engagement — CIS filings, LADWP Board testimony, City Council pressure — helped reopen the Silver Lake Reservoir as public recreational space after a six-year campaign.',
        category: 'guide',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm6-007',
        title: 'Case study: Boyle Heights NC and anti-displacement advocacy',
        description: 'How the Boyle Heights NC became an organizing hub during rapid gentrification — using CIS statements, town halls, and tenant referrals to shape how councilmembers engaged with development in the district.',
        category: 'guide',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm6-008',
        title: 'Case study: When NCs get captured — Venice',
        description: 'The Venice NC\'s years of dysfunction — contested elections, EmpowerLA investigations, board chaos — as a cautionary example of what happens when organized factions treat an NC as a political prize.',
        category: 'guide',
        readTime: '5 min read',
        isNew: true,
      },
      {
        id: 'm6-009',
        title: 'Finding your NC and getting involved',
        description: 'How to locate your NC at empowerla.org, what to expect at your first meeting, how to file a CIS request, and why consistency matters more than any single appearance.',
        category: 'activity',
        readTime: '10 min activity',
        isNew: true,
      },
      {
        id: 'm6-010',
        title: 'Module 6 quiz',
        description: 'Check your understanding of NC origins, elections, formal tools, informal power, and the three case studies.',
        category: 'quiz',
        readTime: '~7 questions',
      },
    ],
  },
];
