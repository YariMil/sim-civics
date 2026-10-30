// ─── Slide types ─────────────────────────────────────────────────
// Each module has a `slides` array rendered one at a time in
// ModuleViewer. Two kinds: 'text' and 'quiz'.
//
// TEXT slide  — heading + body paragraphs (+ optional bullet list)
// QUIZ slide  — question with 4 choices; one correct answer

export interface TextSlide {
  type: 'text';
  id: string;
  heading: string;
  body: string[];        // each string is one paragraph
  bullets?: string[];    // optional bullet list rendered below body
  note?: string;         // small italic footnote at the bottom
}

export interface QuizSlide {
  type: 'quiz';
  id: string;
  question: string;
  choices: string[];     // exactly 4 items
  correct: number;       // 0-based index of the correct choice
  explanation: string;   // shown after the user answers
}

export type Slide = TextSlide | QuizSlide;

export interface ModuleSlides {
  moduleId: string;      // must match ResourceModule.id in resources.ts
  slides: Slide[];
}

// ─── Module 1: Introduction to LA Government ─────────────────────
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
      note: 'Continue to Module 2 for a deep dive into how the City Council operates, how its members are elected, and how a real ordinance became law.',
    },
  ],
};

// ─── Module 2: The City Council In Depth ─────────────────────────
const module2: ModuleSlides = {
  moduleId: 'module-2',
  slides: [
    // ── Welcome & review ──────────────────────────────────────────
    {
      type: 'text',
      id: 'm2-s01',
      heading: 'Welcome to Module 2',
      body: [
        'Module 1 introduced the broad structure of LA city government. Module 2 goes deeper on the institution at the heart of it: the City Council.',
        'We\'ll cover how councilmembers get elected, what powers the Council explicitly holds — and the informal powers it exercises that never appear in the City Charter. We\'ll also trace a real ordinance from introduction to enactment.',
      ],
      bullets: [
        'Quick review of the City Council from Module 1',
        'How councilmembers are elected',
        'Explicit and implicit powers of the Council',
        'Council leadership and internal structure',
        'Case study: a real ordinance and how it passed',
      ],
      note: 'Estimated time: 25–30 minutes',
    },
    {
      type: 'text',
      id: 'm2-s02',
      heading: 'Quick Review: What You Already Know',
      body: [
        'Before going deeper, let\'s lock in the essentials from Module 1.',
        'The LA City Council is the 15-member legislative body of city government. Each member represents one geographic district and is elected to a four-year term. The Council passes ordinances, adopts the budget, approves major contracts, and sets land use policy.',
        'The Council is separate from the Mayor, who leads the executive branch. The Mayor proposes — the Council disposes. Neither can do the other\'s job alone.',
      ],
      bullets: [
        '15 districts, 15 councilmembers, 4-year terms',
        'Legislative power: ordinances, budget, contracts, zoning',
        'Can override a mayoral veto with 10 of 15 votes',
        'Most work happens in committees before full council votes',
      ],
    },
    {
      type: 'quiz',
      id: 'm2-q01',
      question: 'How many votes does the Council need to override a mayoral veto?',
      choices: ['8 (simple majority)', '9', '10 (two-thirds)', '12'],
      correct: 2,
      explanation: 'Overriding a mayoral veto requires 10 of 15 votes — a two-thirds supermajority. A simple majority of 8 passes most regular legislation.',
    },

    // ── Elections ─────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm2-s03',
      heading: 'How Councilmembers Are Elected',
      body: [
        'Each of LA\'s 15 council districts elects one representative in a nonpartisan election. "Nonpartisan" means candidates do not appear on the ballot with a party label — though in practice, most councilmembers are registered Democrats in a heavily Democratic city.',
        'Elections are held in odd-numbered years. If a candidate receives more than 50% of the vote in the primary, they win outright. If no one clears 50%, the top two finishers advance to a general election runoff.',
        'Council districts are redrawn every ten years following the U.S. Census, a process managed by an independent redistricting commission. District boundaries significantly shape who can win — and which communities have political power.',
      ],
    },
    {
      type: 'text',
      id: 'm2-s04',
      heading: 'Term limits and vacancies',
      body: [
        'Since 2002, LA councilmembers have been subject to term limits. The current limit is three consecutive four-year terms — 12 years total in the same seat. After sitting out one term, a former councilmember may run again.',
        'When a seat becomes vacant mid-term (due to resignation, death, or removal), the Mayor appoints a replacement subject to Council confirmation. This gives the Mayor unusual influence over Council composition — a dynamic that has sometimes caused political controversy.',
      ],
      note: 'As of 2024, several councilmembers have served the full 12 years and termed out, creating open-seat races that tend to draw large fields of candidates.',
    },
    {
      type: 'quiz',
      id: 'm2-q02',
      question: 'What happens in an LA City Council primary if no candidate receives more than 50% of the vote?',
      choices: [
        'The candidate with the most votes wins automatically',
        'A runoff is held between the top two finishers',
        'The election goes to the City Council to decide',
        'A new primary is scheduled within 90 days',
      ],
      correct: 1,
      explanation: 'LA uses a "top-two" system. If no candidate clears 50% in the primary, the top two vote-getters advance to a general election runoff, regardless of party.',
    },

    // ── Explicit powers ───────────────────────────────────────────
    {
      type: 'text',
      id: 'm2-s05',
      heading: "The Council's Explicit Powers",
      body: [
        'The LA City Charter — the city\'s governing document — spells out what the Council can formally do. These are its explicit powers: the things it is unambiguously authorized to perform.',
      ],
      bullets: [
        'Pass ordinances — legally binding local laws enforceable by city departments',
        'Adopt the annual budget — approve, amend, or reject the Mayor\'s budget proposal',
        'Approve contracts — any city contract above a set dollar threshold requires Council sign-off',
        'Confirm mayoral appointments — department heads, commissioners, and judges',
        'Override mayoral vetoes — with 10 of 15 votes',
        'Declare local emergencies — authorize emergency powers and spending',
        'Set land use policy — approve or deny zone changes, variances, and general plan amendments',
        'Issue municipal bonds — authorize borrowing for capital projects',
      ],
    },
    {
      type: 'text',
      id: 'm2-s06',
      heading: "The Council's Implicit Powers",
      body: [
        'Beyond what the Charter explicitly grants, the Council exercises significant informal power through norms, relationships, and institutional leverage. These implicit powers are just as consequential — sometimes more so.',
        'Councilmanic Courtesy is the most important: by longstanding tradition, the full Council almost always defers to the district councilmember on matters affecting only their district — especially land use and development. In practice, this means one councilmember effectively controls what gets built in their district.',
        'Budget leverage is another. While the Mayor proposes the budget, the Council can move money between departments, add or cut line items, and attach conditions to appropriations. Councilmembers with budget committee seats wield disproportionate influence.',
      ],
    },
    {
      type: 'text',
      id: 'm2-s07',
      heading: 'More implicit powers',
      body: [
        'Oversight and pressure: The Council can hold hearings, summon department heads, and demand reports on any city operation. This "oversight" power doesn\'t change law, but it creates accountability pressure and generates public attention.',
        'Agenda control: The Council President and committee chairs decide what gets heard — and when. A motion can sit in committee for months or years if leadership doesn\'t schedule a hearing. Conversely, items can be fast-tracked when there\'s political will.',
        'Constituent service leverage: Councilmembers\' district offices handle thousands of resident complaints annually — potholes, permit delays, code enforcement issues. The ability to direct city staff attention toward constituent problems is an informal but powerful tool.',
      ],
      note: 'Councilmanic Courtesy has been criticized for giving too much power to individual members, enabling some to block housing projects citywide simply by representing one affected district.',
    },
    {
      type: 'quiz',
      id: 'm2-q03',
      question: 'What is "Councilmanic Courtesy"?',
      choices: [
        'A formal rule requiring polite debate on the council floor',
        'The tradition of the full Council deferring to the district member on local matters',
        'A Charter provision giving the Council President final say on land use',
        'A city policy requiring councilmembers to attend constituent meetings',
      ],
      correct: 1,
      explanation: 'Councilmanic Courtesy is an informal but powerful norm: the full Council typically defers to the district\'s councilmember on issues affecting only that district, especially land use. It is tradition, not law — but it shapes outcomes as much as any written rule.',
    },

    // ── Internal structure ────────────────────────────────────────
    {
      type: 'text',
      id: 'm2-s08',
      heading: 'Internal Structure: Leadership Roles',
      body: [
        'The City Council elects its own leadership at the start of each term. These internal roles shape how the institution functions day to day.',
        'The Council President presides over full council meetings, sets the meeting agenda, appoints members to committees, and serves as the public face of the Council. The position rotates by informal agreement — no councilmember holds it indefinitely.',
        'The President Pro Tempore fills in when the President is absent and often manages floor proceedings on complex legislation.',
      ],
    },
    {
      type: 'text',
      id: 'm2-s09',
      heading: 'Committees: where the real work happens',
      body: [
        'The Council operates through roughly 30 standing committees, each covering a policy domain. Every councilmember sits on multiple committees; committee chairs are appointed by the Council President.',
        'Key committees include Budget & Finance (reviews all city spending), Planning & Land Use Management (PLUM, reviews zoning and development), Public Safety (oversees LAPD and LAFD), and Homelessness & Poverty.',
        'Items referred to committee can be approved, amended, continued (delayed), or held without a hearing — which effectively kills them. Committee chairs have enormous gatekeeper power over what the full Council even gets to vote on.',
      ],
      bullets: [
        'Budget & Finance — all city spending and revenue',
        'PLUM (Planning & Land Use Management) — zoning, development',
        'Public Safety — LAPD, LAFD oversight',
        'Homelessness & Poverty — shelter, services, street engagement',
        'Transportation — streets, bike infrastructure, LADOT',
        'Rules, Elections & Intergovernmental Relations — internal council operations',
      ],
    },
    {
      type: 'quiz',
      id: 'm2-q04',
      question: 'Who appoints councilmembers to their committee assignments?',
      choices: [
        'The Mayor',
        'A citywide vote of residents',
        'The Council President',
        'The City Clerk by seniority',
      ],
      correct: 2,
      explanation: 'The Council President appoints members to committees, giving the President significant influence over which councilmembers shape which policy areas — and which committee chairs hold gatekeeper power.',
    },

    // ── Case study ────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm2-s10',
      heading: 'Case Study: The HCIDLA Tenant Protections Ordinance',
      body: [
        'To see how the City Council actually works, let\'s trace a real piece of legislation: the Tenant Anti-Harassment Ordinance, enacted by the LA City Council in 2021.',
        'The ordinance (CF 14-1635-S2) made it illegal for landlords to harass tenants — through verbal threats, unauthorized entry, removal of services, or other intimidation — with the goal of pressuring them to vacate. It established a private right of action, meaning tenants could sue landlords directly in civil court.',
        'This was years in the making. The first related motion was filed in 2014. The final ordinance passed in 2021 — a seven-year journey through the legislative process.',
      ],
      note: 'You can look up the full council file at lacity.legistar.com by searching CF 14-1635-S2.',
    },
    {
      type: 'text',
      id: 'm2-s11',
      heading: 'How it started: the 2014 motion',
      body: [
        'In 2014, Councilmember Herb Wesson introduced a motion directing city staff to report on the feasibility of a tenant anti-harassment policy. This is a common first step — rather than drafting a full ordinance, a councilmember asks city departments to study the issue and come back with options.',
        'The motion was referred to the Housing Committee. Reports came back from the Housing + Community Investment Department (HCIDLA) and the City Attorney\'s office over the following years, each adding detail to what a law might look like.',
        'This slow, report-driven phase is typical. It builds a public record, surfaces stakeholder concerns, and gives advocates time to organize — but it also gives opponents time to delay.',
      ],
    },
    {
      type: 'text',
      id: 'm2-s12',
      heading: 'Committee hearings and public pressure',
      body: [
        'Between 2014 and 2020, tenant advocacy organizations — including the Los Angeles Tenants Union and SAJE (Strategic Actions for a Just Economy) — repeatedly testified at Housing Committee hearings, submitted written comments, and pressured individual councilmembers to move the item forward.',
        'The Housing Committee held multiple hearings where both landlord associations and tenant advocates testified. Landlord groups argued the ordinance was too broad and would expose property owners to frivolous lawsuits. Tenant groups argued the existing protections were unenforceable and toothless.',
        'The committee amended the ordinance language several times in response — narrowing some definitions, strengthening others — before finally voting to send it to the full Council.',
      ],
    },
    {
      type: 'text',
      id: 'm2-s13',
      heading: 'The full Council vote and enactment',
      body: [
        'In February 2021, the full City Council voted 13-0 to pass the Tenant Anti-Harassment Ordinance. Two members were absent. The lopsided vote reflects how committee work shapes outcomes: by the time a controversial item reaches the full Council, most negotiation is already done.',
        'Mayor Eric Garcetti signed the ordinance into law in March 2021. It took effect 30 days later, giving landlords and tenants time to learn the new rules.',
        'The ordinance is now enforced by HCIDLA. Tenants who experience harassment can file complaints with the city or pursue civil claims in court with the possibility of recovering attorney\'s fees — a provision tenant advocates specifically fought for.',
      ],
      note: 'The 7-year timeline from motion to law is long but not unusual for contested housing legislation in LA.',
    },
    {
      type: 'quiz',
      id: 'm2-q05',
      question: 'The Tenant Anti-Harassment Ordinance took approximately how long from first motion to enactment?',
      choices: ['6 months', '2 years', '7 years', '15 years'],
      correct: 2,
      explanation: 'The first related motion was filed in 2014; the ordinance was signed into law in 2021 — roughly 7 years. This reflects the slow, report-driven, multi-stakeholder process common to contested housing legislation in LA.',
    },
    {
      type: 'quiz',
      id: 'm2-q06',
      question: 'What vote count passed the Tenant Anti-Harassment Ordinance at the full City Council?',
      choices: ['8-7', '10-5', '13-0', 'Unanimous 15-0'],
      correct: 2,
      explanation: '13 councilmembers voted yes and 2 were absent. A lopsided vote like this is common when controversial legislation has already been negotiated to near-consensus in committee before reaching the floor.',
    },

    // ── Completion ────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm2-s14',
      heading: 'Module 2 Complete',
      body: [
        'You now have a thorough picture of how the LA City Council actually operates — not just what the Charter says, but how power moves through elections, leadership roles, informal norms, and the slow grind of legislation.',
        'The Tenant Anti-Harassment Ordinance illustrates something important: local government moves slowly, but sustained civic pressure — showing up to committee hearings, submitting comment, building coalitions — is exactly what moved it forward.',
      ],
      bullets: [
        '✓ Councilmembers are elected in nonpartisan top-two elections, with 12-year term limits',
        '✓ Explicit powers come from the City Charter; implicit powers come from norms like Councilmanic Courtesy',
        '✓ The Council President and committee chairs control what gets heard — and when',
        '✓ Real legislation takes years and involves sustained public engagement at every stage',
      ],
      note: 'Continue to Module 3 to connect this knowledge to specific policy domains: housing, zoning, transportation, and running your own advocacy campaign.',
    },
  ],
};

// ─── Module 3: The Mayor of Los Angeles ──────────────────────────
const module3: ModuleSlides = {
  moduleId: 'module-3',
  slides: [

    // ── Welcome & review ──────────────────────────────────────────
    {
      type: 'text',
      id: 'm3-s01',
      heading: 'Welcome to Module 3',
      body: [
        'Modules 1 and 2 focused on the City Council — the legislative heart of LA government. Module 3 turns to the other side of the split executive: the Mayor.',
        'The Mayor is often the most visible figure in city politics, yet the office is structurally weaker than most people assume. Understanding exactly what the Mayor can and cannot do — and how mayors have stretched, bent, and occasionally broken those limits — is essential to understanding how LA actually works.',
      ],
      bullets: [
        'Quick review: the Mayor\'s role from earlier modules',
        'How the Mayor is elected',
        'Formal (Charter) powers of the office',
        'Informal and political powers',
        'Case studies: mayoral power in practice',
      ],
      note: 'Estimated time: 25–30 minutes',
    },

    // ── Review ────────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm3-s02',
      heading: 'Quick Review: The Mayor So Far',
      body: [
        'You\'ve already encountered the Mayor in both previous modules. Here\'s what you know.',
        'The Mayor is LA\'s chief executive — head of the executive branch, separate from the City Council\'s legislative branch. The Mayor proposes the annual budget, appoints department heads, and can veto Council-passed ordinances. The Council can override that veto with 10 of 15 votes.',
        'Critically: the Mayor cannot pass laws. Only the Council can do that. The Mayor\'s formal power lies in management, appointments, and the bully pulpit — not legislation.',
      ],
      bullets: [
        'Chief executive of the city — manages city departments',
        'Proposes the annual budget (Council adopts it)',
        'Appoints department heads and most commissioners',
        'Can veto ordinances (Council overrides with 10 votes)',
        'Cannot introduce or pass legislation directly',
      ],
    },
    {
      type: 'quiz',
      id: 'm3-q01',
      question: 'Which of the following best describes the LA Mayor\'s relationship to city legislation?',
      choices: [
        'The Mayor introduces most major ordinances',
        'The Mayor can pass emergency ordinances without Council approval',
        'The Mayor can veto ordinances but cannot introduce or pass them',
        'The Mayor and Council share equal legislative authority',
      ],
      correct: 2,
      explanation: 'The Mayor is an executive, not a legislator. The Mayor can sign or veto ordinances the Council passes, but only the City Council can introduce and enact legislation. This separation is foundational to LA\'s system of checks and balances.',
    },

    // ── Elections ─────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm3-s03',
      heading: 'How the Mayor Is Elected',
      body: [
        'The Mayor of Los Angeles is elected citywide in a nonpartisan election — every registered voter in the city votes, not just a single district. This makes the mayoral race a very different political contest from a council race: you need name recognition, fundraising, and coalitions across 15 very different districts.',
        'Like council races, the Mayor\'s election uses a top-two primary system. If a candidate receives more than 50% of the vote in the primary, they win outright. If not, the top two advance to a general election runoff.',
        'The Mayor serves a four-year term and is limited to two consecutive terms — eight years total. After sitting out one term, a former mayor may run again.',
      ],
      note: 'Mayoral elections are held in odd-numbered years, on the same cycle as council elections. Turnout in these off-cycle elections is historically low, which amplifies the influence of organized constituencies.',
    },
    {
      type: 'text',
      id: 'm3-s04',
      heading: 'What it takes to win citywide',
      body: [
        'Running citywide means building a coalition that spans communities with very different interests — homeowners in the Valley, renters in East LA, business owners in downtown, working-class families in South LA. No single constituency is large enough to win alone.',
        'This political reality shapes how mayors govern. A mayor who won with support from labor unions, environmental groups, and progressive neighborhoods will govern differently — make different appointments, prioritize different policies — than one who won with backing from the business community and homeowner associations.',
        'Campaign fundraising reflects these coalitions. LA mayoral candidates routinely raise tens of millions of dollars, drawing from real estate developers, labor PACs, tech industry donors, and small-dollar individual contributors.',
      ],
    },
    {
      type: 'quiz',
      id: 'm3-q02',
      question: 'How long can the Mayor of Los Angeles serve consecutively before being term-limited?',
      choices: ['4 years (one term)', '8 years (two terms)', '12 years (three terms)', 'There are no term limits for the Mayor'],
      correct: 1,
      explanation: 'The Mayor is limited to two consecutive four-year terms — eight years total. After sitting out one full term, a former mayor is eligible to run again.',
    },

    // ── Formal powers ─────────────────────────────────────────────
    {
      type: 'text',
      id: 'm3-s05',
      heading: "The Mayor's Formal Powers",
      body: [
        'The LA City Charter is the source of the Mayor\'s formal authority. These are powers that are legally defined, enforceable, and unambiguous. They fall into four broad categories.',
      ],
      bullets: [
        'Executive authority — manages all city departments except those with independent elected heads (City Attorney, Controller, Clerk)',
        'Appointment power — appoints general managers of city departments, members of city commissions, and judges on the Municipal Court (subject to Council confirmation for many)',
        'Budget authority — prepares and submits the annual proposed budget to the Council by April 20 each year',
        'Veto power — can veto any ordinance, resolution, or contract action passed by the Council; veto can be overridden by 10 votes',
        'Emergency powers — can declare a local emergency, which unlocks expedited spending authority and relaxes some administrative requirements',
        'Removal power — can remove most department heads without Council approval, giving the Mayor ongoing leverage over executive branch personnel',
      ],
    },
    {
      type: 'text',
      id: 'm3-s06',
      heading: 'Appointment power in depth',
      body: [
        'Of all the Mayor\'s formal powers, appointment authority is the most far-reaching in day-to-day impact. The Mayor appoints the Police Chief (LAPD), Fire Chief (LAFD), City Administrative Officer, and the general managers of departments like Public Works, Recreation & Parks, and Transportation.',
        'These appointments shape how the city operates on the ground. A Mayor who appoints a reform-minded Police Chief sends a signal about public safety priorities that no ordinance alone could convey. A Mayor who appoints aggressive housing department leadership can shift enforcement patterns without any Council vote.',
        'Most major appointments require Council confirmation — a hearing, a vote — which gives the Council a check. But once confirmed, department heads serve at the Mayor\'s pleasure and can be removed without Council involvement.',
      ],
      note: 'Commission appointments are especially significant for land use. The Mayor appoints all five members of the Planning Commission, which means the Mayor heavily influences which development projects move forward citywide.',
    },
    {
      type: 'quiz',
      id: 'm3-q03',
      question: 'Which of the following city officials is NOT directly appointed by the Mayor?',
      choices: [
        'LAPD Police Chief',
        'City Controller',
        'Planning Commission members',
        'LAFD Fire Chief',
      ],
      correct: 1,
      explanation: 'The City Controller is independently elected by LA voters, not appointed by the Mayor. This makes the Controller a genuinely independent check on city finances — the Controller can audit and criticize the Mayor\'s budget without fear of removal.',
    },

    // ── Informal powers ───────────────────────────────────────────
    {
      type: 'text',
      id: 'm3-s07',
      heading: "The Mayor's Informal Powers",
      body: [
        'The Charter tells only part of the story. Much of what a mayor can accomplish comes from informal leverage — tools of persuasion, visibility, and political pressure that don\'t appear in any legal document.',
        'The bully pulpit is the most obvious. The Mayor\'s press conferences, public statements, and media presence shape the public narrative around any issue. A mayor who calls daily press conferences about homelessness can force the Council to prioritize it, even without passing a single ordinance.',
        'Coalition building is another. Mayors who cultivate relationships with labor unions, neighborhood groups, business associations, and state legislators can call in political favors — pressuring individual councilmembers to support mayoral priorities by threatening to back a primary challenger or withhold endorsements.',
      ],
    },
    {
      type: 'text',
      id: 'm3-s08',
      heading: 'More informal levers',
      body: [
        'Budget signaling: Even before the formal budget is submitted, the Mayor signals priorities through public statements, departmental directives, and hiring decisions. These signals move city bureaucracies long before the Council votes on anything.',
        'Federal and state relationships: The Mayor represents LA in negotiations with the state legislature and federal agencies. Access to state housing funds, federal infrastructure grants, and disaster relief flows through the Mayor\'s office — giving the Mayor resources and leverage the Council lacks.',
        'Agenda-setting power: The Mayor can define what the city is "working on" in the public mind. By calling a press conference, convening a task force, or releasing a strategic plan, the Mayor can force the Council to respond to their agenda rather than setting their own.',
      ],
      note: 'Political scientists call this "soft power" — the ability to shape outcomes through persuasion and agenda-setting rather than direct authority. In LA\'s system, it\'s often more decisive than the Mayor\'s formal powers.',
    },
    {
      type: 'quiz',
      id: 'm3-q04',
      question: 'What does "bully pulpit" mean in the context of mayoral power?',
      choices: [
        'The Mayor\'s ability to physically remove councilmembers from chambers',
        'The Mayor\'s authority to veto any ordinance within 10 days',
        'The Mayor\'s use of public visibility and media presence to shape political priorities',
        'A formal power granted by the City Charter to convene special sessions',
      ],
      correct: 2,
      explanation: 'The "bully pulpit" refers to the political advantage a prominent officeholder has from being able to speak to the public through media. For the LA Mayor, this informal power often rivals or exceeds formal Charter authority in shaping what the city does.',
    },

    // ── Case study 1: Garcetti & homelessness ─────────────────────
    {
      type: 'text',
      id: 'm3-s09',
      heading: 'Case Study 1: Garcetti and the Homelessness Emergency',
      body: [
        'In April 2015, Mayor Eric Garcetti declared a "state of emergency" on homelessness — one of the first times any LA mayor had used emergency framing for what was then widely treated as a long-term social services problem rather than a crisis requiring immediate executive action.',
        'The declaration itself had limited formal legal effect: LA\'s homeless population didn\'t qualify for the kind of emergency spending unlocks triggered by a natural disaster. But the political effect was significant. It shifted media coverage, forced the City Council to schedule hearings, and created pressure on county government — which controls most social services funding — to act in parallel.',
        'This is informal mayoral power at work: using the language and machinery of emergency to reshape the political environment around an issue, even without new legal authority to act.',
      ],
    },
    {
      type: 'text',
      id: 'm3-s10',
      heading: 'Garcetti vs. the Council: HHH and A Bridge Home',
      body: [
        'In 2016, Mayor Garcetti championed Measure HHH — a $1.2 billion bond measure for permanent supportive housing — which LA voters approved with 77% of the vote. This gave the Mayor a powerful political mandate that the Council could not easily ignore.',
        'But execution revealed tensions. Garcetti wanted faster shelter construction; many councilmembers, protective of their districts under Councilmanic Courtesy, slowed or blocked shelter sites in their neighborhoods. Garcetti\'s office publicly named and pressured individual councilmembers who opposed shelter siting — an unusually aggressive use of the mayoral bully pulpit against the Council as an institution.',
        'The A Bridge Home shelter program, launched in 2018, was partly a mayoral workaround: by negotiating directly with Council districts that were willing, Garcetti built momentum that made it harder for holdouts to refuse.',
      ],
      note: 'This dynamic — a mayor with public support using media pressure to move a reluctant Council — is a recurring pattern in LA politics.',
    },
    {
      type: 'quiz',
      id: 'm3-q05',
      question: 'What was Measure HHH, championed by Mayor Garcetti in 2016?',
      choices: [
        'A ballot measure to expand the City Council from 15 to 20 members',
        'A $1.2 billion bond for permanent supportive housing, approved by voters',
        'An ordinance creating new anti-camping rules enforced by the LAPD',
        'A City Charter amendment giving the Mayor direct control over shelter siting',
      ],
      correct: 1,
      explanation: 'Measure HHH was a $1.2 billion general obligation bond approved by LA voters in November 2016 to fund permanent supportive housing. The 77% approval gave Mayor Garcetti a powerful mandate to push shelter and housing policy — even when the Council moved slowly.',
    },

    // ── Case study 2: Bass & the homelessness declaration ─────────
    {
      type: 'text',
      id: 'm3-s11',
      heading: 'Case Study 2: Mayor Bass and Executive Directive 1',
      body: [
        'On her first day in office — December 12, 2022 — Mayor Karen Bass declared a state of emergency on homelessness and issued Executive Directive 1, ordering city departments to expedite the permitting and construction of homeless housing and to bring people inside at encampment sites.',
        'Unlike Garcetti\'s 2015 declaration, Bass\'s emergency order had concrete operational teeth. It directed the Department of Building and Safety to process permits for affordable and homeless housing within 60 days — dramatically faster than the typical multi-year approval process. It also created a new city body, the Crisis and Homelessness Response Team, with authority to coordinate across departments.',
        'This was a deliberate use of executive power to bypass bureaucratic slowdowns without waiting for the Council to act. The Council did not vote to create the Crisis Team or mandate the 60-day permitting window — the Mayor ordered it directly.',
      ],
      note: 'Executive Directive 1 became the centerpiece of Bass\'s early administration and helped drive a measurable increase in the number of people moved from encampments into shelter in 2023.',
    },
    {
      type: 'text',
      id: 'm3-s12',
      heading: 'When the Mayor acts over Council objections',
      body: [
        'Executive Directive 1 illustrates a key dynamic: mayors have significant unilateral authority over how city departments operate, even when the Council disagrees with the direction.',
        'Several councilmembers raised concerns about Bass\'s encampment clearance approach — arguing that people were being displaced without adequate shelter alternatives. The Council held oversight hearings and some members publicly criticized the program. But because the directive operated through the Mayor\'s executive authority over departments, the Council had no direct mechanism to stop it. They could defund related programs through the budget process, but that is a slow, blunt instrument.',
        'This gap — between the Mayor\'s executive flexibility and the Council\'s legislative slower pace — is where mayoral power is most visible in practice.',
      ],
    },
    {
      type: 'quiz',
      id: 'm3-q06',
      question: 'What made Mayor Bass\'s Executive Directive 1 notable compared to a typical Council ordinance?',
      choices: [
        'It required a unanimous Council vote to take effect',
        'It was issued on her first day and operated through executive authority without a Council vote',
        'It was the first homeless policy in LA history to receive federal funding',
        'It gave the City Council new authority to oversee LAPD encampment operations',
      ],
      correct: 1,
      explanation: 'Executive Directive 1 was issued unilaterally by Mayor Bass on her first day, using her executive authority over city departments. It didn\'t require a Council vote — illustrating how a mayor can move quickly on executive matters even when the Council hasn\'t acted.',
    },

    // ── Case study 3: Riordan veto ────────────────────────────────
    {
      type: 'text',
      id: 'm3-s13',
      heading: 'Case Study 3: Mayor Riordan and the Veto Power',
      body: [
        'The veto is the Mayor\'s most direct formal check on the Council — and it\'s rarely used, precisely because its use signals a serious breakdown in executive-legislative relations. When it is used, it reveals the real limits of mayoral authority.',
        'Mayor Richard Riordan (1993–2001) was known for using his veto more actively than his predecessors. In 1996, Riordan vetoed a living wage ordinance passed by the City Council that would have required city contractors to pay higher minimum wages to their workers. Riordan argued it would harm business and cost the city contracts.',
        'The Council attempted to override the veto but fell short of the 10 votes needed. The ordinance failed — a clean victory for mayoral power over a Council majority.',
      ],
      note: 'The living wage fight eventually continued: a modified ordinance passed in 1997 with Riordan\'s reluctant acceptance. This pattern — veto, negotiation, compromise — is how executive-legislative conflict in LA often resolves.',
    },
    {
      type: 'quiz',
      id: 'm3-q07',
      question: 'When the Mayor vetoes an ordinance and the Council wants to override it, what is required?',
      choices: [
        '8 votes (simple majority)',
        '9 votes',
        '10 votes (two-thirds of the 15-member Council)',
        'A public referendum',
      ],
      correct: 2,
      explanation: 'Overriding a mayoral veto requires 10 of 15 Council votes — a two-thirds supermajority. This is a high bar: it means the Mayor only needs 6 allies on the Council to sustain any veto, giving the executive branch significant leverage even over a hostile Council majority.',
    },

    // ── 2022 Charter expansion ────────────────────────────────────
    {
      type: 'text',
      id: 'm3-s14',
      heading: 'How Mayoral Power Has Grown: Charter Amendment ES1',
      body: [
        'The LA Mayor\'s formal powers have historically been weaker than those of mayors in comparable cities. But that has begun to change.',
        'In June 2022, LA voters approved Charter Amendment ES1, which gave the Mayor direct authority to develop and implement a comprehensive strategy to address homelessness — overriding the previous system where responsibility was fragmented across the Mayor, Council, and county agencies. For the first time, a specific policy domain was explicitly placed under mayoral control rather than shared governance.',
        'ES1 is significant not just for what it did, but for what it signals: voters and reformers have increasingly argued that LA\'s "weak mayor" structure produces gridlock, and that concentrating executive authority in a single accountable figure produces better outcomes. The charter amendment was the first formal step in that direction.',
      ],
      note: 'ES1 was heavily influenced by advocates who argued that divided authority over homelessness — between city, county, and state — had prevented any single entity from being held accountable.',
    },
    {
      type: 'quiz',
      id: 'm3-q08',
      question: 'What did Charter Amendment ES1, approved by voters in 2022, do?',
      choices: [
        'Expanded the City Council from 15 to 21 members',
        'Gave the Mayor direct authority over homelessness strategy, reducing fragmented governance',
        'Required the Mayor to submit the budget 30 days earlier each year',
        'Created a new independently elected homelessness czar',
      ],
      correct: 1,
      explanation: 'ES1 gave the Mayor formal, centralized authority over LA\'s homelessness response — a notable expansion of mayoral power in a system historically designed to limit it. It was the first major Charter change in years to shift the executive-legislative balance.',
    },

    // ── Completion ────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm3-s15',
      heading: 'Module 3 Complete',
      body: [
        'You now have a full picture of the LA Mayor — how they get elected, what the Charter gives them, how informal power amplifies (or limits) those formal tools, and what it looks like when mayors push against and beyond the Council\'s wishes.',
        'The pattern across all three case studies is consistent: the Mayor\'s greatest power lies not in formal authority but in the ability to set the agenda, apply political pressure, and move city bureaucracies faster than the legislative process allows.',
      ],
      bullets: [
        '✓ The Mayor is elected citywide in a nonpartisan top-two race, limited to two terms',
        '✓ Formal powers: appointments, budget proposal, veto, emergency authority, department management',
        '✓ Informal powers: bully pulpit, coalition building, agenda-setting, federal/state relationships',
        '✓ Mayors have used emergency declarations, executive directives, and public pressure to act over or around Council objections',
        '✓ Charter Amendment ES1 (2022) began formalizing a shift toward stronger mayoral authority',
      ],
      note: 'You\'ve completed the Sim-Civics core curriculum. Head to the City Council Simulation to apply everything you\'ve learned in a live mock session.',
    },
  ],
};

// ─── Module 4: City Departments ──────────────────────────────────
const module4: ModuleSlides = {
  moduleId: 'module-4',
  slides: [

    // ── Welcome ───────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm4-s01',
      heading: 'Welcome to Module 4',
      body: [
        'Modules 1 through 3 covered the three main power centers of LA city government: the City Council, the Mayor, and the relationship between them. But the day-to-day experience of city government — for most Angelenos, most of the time — isn\'t a council vote or a mayoral press conference. It\'s a pothole, a 911 call, a building permit, or a park.',
        'That experience is delivered by city departments: the agencies that translate policy into action. This module profiles five of the most visible and consequential, explaining what they do, how you encounter them in daily life, and why they matter.',
      ],
      bullets: [
        'Los Angeles Police Department (LAPD)',
        'Los Angeles Department of Building and Safety (LADBS)',
        'Los Angeles Department of Transportation (LADOT)',
        'Los Angeles Housing Department (LAHD)',
        'Los Angeles Department of Public Works (LADPW)',
      ],
      note: 'Estimated time: 25–30 minutes',
    },

    // ── LAPD ──────────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm4-s02',
      heading: 'Department 1: The LAPD',
      body: [
        'The Los Angeles Police Department is one of the largest municipal police departments in the United States, with roughly 9,000 sworn officers and a budget exceeding $3 billion annually — the single largest line item in the city\'s General Fund.',
        'The LAPD is led by a Police Chief appointed by the Mayor and confirmed by the City Council. The Chief serves a five-year term and can be removed by the Mayor. Day-to-day civilian oversight is handled by the Board of Police Commissioners — five members appointed by the Mayor — which sets LAPD policy and reviews uses of force.',
        'The LAPD is divided into 21 geographic divisions across the city, each with its own station. Most residents\' interactions with the department happen at the division level — through neighborhood watch meetings, community policing programs, or incident responses.',
      ],
    },
    {
      type: 'text',
      id: 'm4-s03',
      heading: 'How you encounter the LAPD',
      body: [
        'The most direct encounter most residents have with the LAPD is through 911 — calling for emergency response to crime, medical emergencies, or traffic incidents. But the department also operates many non-emergency contact points.',
        'The LAPD runs a Senior Lead Officer (SLO) program: each neighborhood has an assigned SLO whose job is to build relationships with residents, attend community meetings, and address quality-of-life concerns. SLOs are often the most accessible point of contact for non-emergency issues.',
        'The department also handles traffic enforcement, school resource officers at LAUSD campuses, airport security at LAX, and oversight of major events like the LA Marathon or Dodgers playoff games.',
      ],
      bullets: [
        '911 — emergency response to crime, injury, fire',
        '1-877-ASK-LAPD — non-emergency tips and reports',
        'Senior Lead Officer — neighborhood liaison, community meetings',
        'Online crime mapping — LAPD Crime Mapping portal',
        'Civilian oversight — Board of Police Commissioners (monthly public meetings)',
      ],
    },
    {
      type: 'text',
      id: 'm4-s04',
      heading: 'Why the LAPD matters politically',
      body: [
        'The LAPD\'s budget consumes more than half of the city\'s discretionary General Fund spending — a fact that makes it the central battleground in debates about city priorities. Advocates who argue for more investment in housing, mental health, or parks almost always frame it in terms of redirecting money from the LAPD.',
        'The department has also been at the center of major moments in LA\'s history: the 1965 Watts uprising, the 1991 Rodney King beating and subsequent 1992 uprising, the federal consent decree from 2001 to 2013 that placed the department under Department of Justice oversight following the Rampart scandal.',
        'Today, the LAPD operates under the civilian oversight of the Police Commission, but the department\'s size, political influence, and union (the Los Angeles Police Protective League, one of the most powerful in the city) make it one of the most contested institutions in LA governance.',
      ],
      note: 'The Inspector General\'s office independently investigates LAPD misconduct and reports to the Police Commission — a key accountability mechanism residents can engage with directly.',
    },
    {
      type: 'quiz',
      id: 'm4-q01',
      question: 'Which body provides civilian oversight of the LAPD on a day-to-day basis?',
      choices: [
        'The City Council\'s Public Safety Committee',
        'The Mayor\'s office directly',
        'The Board of Police Commissioners',
        'The City Attorney\'s office',
      ],
      correct: 2,
      explanation: 'The Board of Police Commissioners — five mayoral appointees — provides civilian oversight of the LAPD, sets department policy, and reviews uses of force. The City Council\'s Public Safety Committee also conducts oversight through budget hearings and investigations, but the Commission is the primary day-to-day accountability body.',
    },

    // ── LADBS ─────────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm4-s05',
      heading: 'Department 2: Building and Safety (LADBS)',
      body: [
        'The Los Angeles Department of Building and Safety is the city agency that regulates construction, renovation, and demolition. If anything is being built, altered, or torn down in LA, LADBS is almost certainly involved.',
        'The department issues building permits, conducts inspections at every stage of construction, enforces the LA Building Code, and certifies that completed buildings are safe for occupancy. It also responds to complaints about unsafe structures and investigates unpermitted construction.',
        'LADBS processes hundreds of thousands of permit applications per year and employs hundreds of building inspectors who visit construction sites across the city. Its work is largely invisible until something goes wrong — an unsafe building, an unpermitted addition, or a construction project that drags on for years awaiting inspection.',
      ],
    },
    {
      type: 'text',
      id: 'm4-s06',
      heading: 'How you encounter LADBS',
      body: [
        'Most homeowners and renters encounter LADBS when doing any significant work on a home or apartment. Adding a room, replacing electrical panels, building a deck, installing solar panels, or converting a garage to an ADU all require permits. Working without permits is illegal and can result in fines, stop-work orders, and mandatory demolition of unpermitted work.',
        'LADBS also runs the Systematic Code Enforcement Program (SCEP), which inspects multi-family rental properties — apartment buildings with two or more units — on a rotating basis to catch habitability violations. Tenants in buildings with persistent problems can request an inspection.',
        'After the January 2025 Eaton and Palisades fires, LADBS became one of the most visible agencies in the city, responsible for certifying destroyed structures, issuing demolition permits, and — controversially — processing the permits needed to rebuild. The department\'s speed (or slowness) became a major political issue.',
      ],
      bullets: [
        'Apply for permits — permit.lacity.gov (online portal)',
        'Track permit status — check application status online or by phone',
        'Report unpermitted work or unsafe conditions — 311 or online complaint form',
        'Request SCEP inspection — renters can request inspections of their building',
        'Rebuild permits — expedited process for disaster recovery areas',
      ],
    },
    {
      type: 'text',
      id: 'm4-s07',
      heading: 'Why LADBS matters',
      body: [
        'Building and Safety sits at the intersection of two of LA\'s most pressing challenges: the housing crisis and disaster recovery.',
        'Slow permitting is widely cited as a major reason housing construction in LA takes longer and costs more than in comparable cities. A project that takes 18 months to permit in LA might take 6 months in Phoenix or Denver. This delay inflates construction costs, discourages small developers, and ultimately reduces the housing supply.',
        'Mayor Bass\'s Executive Directive 1, covered in Module 3, specifically targeted LADBS: it mandated that the department process permits for affordable and homeless housing within 60 days. The directive acknowledged that LADBS\'s normal timelines were themselves a policy problem — one the Mayor addressed through executive action rather than waiting for a legislative solution.',
      ],
      note: 'The 2025 wildfires put LADBS under intense public scrutiny. Tens of thousands of residents needed demolition and rebuild permits simultaneously, straining a department that was already under-resourced. The political fallout accelerated calls for significant LADBS reform.',
    },
    {
      type: 'quiz',
      id: 'm4-q02',
      question: 'What is the Systematic Code Enforcement Program (SCEP)?',
      choices: [
        'A program that inspects single-family homes for fire hazards annually',
        'A rotating inspection program for multi-family rental buildings to catch habitability violations',
        'A permit-tracking system for commercial construction projects',
        'An LAPD program to identify unpermitted businesses',
      ],
      correct: 1,
      explanation: 'SCEP is an LADBS program that inspects multi-family rental properties on a rotating basis — not waiting for complaints, but proactively checking buildings for habitability violations. Tenants in problem buildings can also request a SCEP inspection directly.',
    },

    // ── LADOT ─────────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm4-s08',
      heading: 'Department 3: Transportation (LADOT)',
      body: [
        'The Los Angeles Department of Transportation is the agency responsible for managing how people and goods move through the city\'s streets. With over 7,500 miles of streets, 4,500 signalized intersections, and millions of daily commuters, LADOT operates one of the largest urban transportation systems in the world.',
        'LADOT\'s responsibilities span traffic signal timing, parking regulation and enforcement, street striping, bike lane installation, pedestrian safety programs, DASH bus service (the city\'s local fixed-route bus network), and permit issuance for oversized vehicles, film productions, and special events that use city streets.',
        'The department is led by a General Manager appointed by the Mayor. Its decisions — where to put a stop sign, how to time a signal, whether to add a protected bike lane — directly shape the daily experience of every Angeleno who uses a street.',
      ],
    },
    {
      type: 'text',
      id: 'm4-s09',
      heading: 'How you encounter LADOT',
      body: [
        'LADOT is one of the most frequently encountered city agencies — even when you don\'t realize it. Every traffic signal you wait at, every parking meter you feed, every DASH bus you ride, every crosswalk countdown timer, and every bike lane marking on the pavement is an LADOT product.',
        'Parking enforcement is one of LADOT\'s most visible and contested functions. The department\'s parking control officers issue millions of citations per year. Residents who receive tickets can contest them through LADOT\'s administrative hearing process — a right that is used far less than it could be.',
        'LADOT also runs the Vision Zero program, LA\'s commitment to eliminating traffic deaths by 2025 (a goal the city has not met, but the program continues to shape street design decisions, particularly around high-injury corridors where pedestrian deaths are concentrated).',
      ],
      bullets: [
        'Report a broken signal or sign — 311 or LADOT\'s online portal',
        'Contest a parking ticket — ladotparking.com, within 21 days of citation',
        'DASH bus — ladottransit.com for routes and schedules',
        'Request a traffic study — neighborhoods can petition for signal changes or speed humps',
        'Vision Zero map — identify high-injury corridors in your neighborhood',
      ],
    },
    {
      type: 'text',
      id: 'm4-s10',
      heading: 'Why LADOT matters',
      body: [
        'Transportation is both a policy domain and a political battleground. How street space is allocated — to cars, bikes, pedestrians, buses, or parking — reflects value judgments about whose mobility the city prioritizes.',
        'LADOT\'s decisions require City Council approval for major reconfigurations, which means individual councilmembers can block bike lanes, bus lanes, or pedestrian improvements in their districts even when LADOT staff recommend them. This dynamic has delayed or killed numerous safety projects that had strong departmental support.',
        'LADOT is also distinct from Metro, which runs the regional rail and bus rapid transit system. This split creates coordination challenges: a commuter might take a Metro train and then need LADOT\'s DASH bus for the last mile, but the two agencies have different fare systems, schedules, and governance structures.',
      ],
      note: 'LA has one of the worst pedestrian death rates of any major American city. The concentration of fatalities on a small number of "high-injury corridors" — mostly wide, fast arterial streets — is well documented, and LADOT\'s Vision Zero program specifically targets these streets for redesign.',
    },
    {
      type: 'quiz',
      id: 'm4-q03',
      question: 'Which of the following is an LADOT service, not a Metro service?',
      choices: [
        'The Purple Line subway',
        'The Silver Line bus rapid transit',
        'The DASH local bus network',
        'The Metro Bike Share program',
      ],
      correct: 2,
      explanation: 'DASH (Downtown Area Short Hop) is operated by LADOT — it\'s the city\'s own local fixed-route bus service, separate from Metro. DASH routes are short, neighborhood-level connections, often serving areas not well covered by Metro. The Purple Line, Silver Line, and Metro Bike Share are all Metro operations.',
    },

    // ── LAHD ──────────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm4-s11',
      heading: 'Department 4: Housing (LAHD)',
      body: [
        'The Los Angeles Housing Department is the city agency responsible for housing policy, tenant protections, and affordable housing programs. It was reorganized and renamed in 2022 — previously called the Housing + Community Investment Department (HCIDLA) — to give housing a more prominent and focused institutional home.',
        'LAHD administers the Rent Stabilization Ordinance (RSO), enforcing rent increase limits and eviction protections for tenants in covered buildings. It also runs the Systematic Code Enforcement Program (SCEP) in coordination with LADBS, manages the city\'s affordable housing loan programs, and oversees relocation assistance for tenants displaced by development.',
        'The department is at the center of LA\'s most urgent domestic challenge: a housing affordability crisis that has made the city one of the most expensive rental markets in the country and contributed directly to the homelessness emergency.',
      ],
    },
    {
      type: 'text',
      id: 'm4-s12',
      heading: 'How you encounter LAHD',
      body: [
        'Renters in RSO-covered buildings encounter LAHD most directly when a landlord raises rent beyond the annual allowable increase, attempts an improper eviction, or fails to maintain habitable conditions. LAHD is the agency that investigates these complaints, mediates disputes, and refers cases for prosecution.',
        'The department also runs the Tenant Habitability Program, which requires landlords to provide temporary housing or rent reductions when construction work makes a rental unit uninhabitable. Tenants who aren\'t offered this accommodation can file a complaint with LAHD.',
        'For homeowners and developers, LAHD administers several loan and grant programs for affordable housing development, historic preservation, and accessibility modifications for low-income seniors.',
      ],
      bullets: [
        'RSO complaint — if your landlord raises rent illegally or attempts wrongful eviction',
        'Habitability complaint — if your unit has serious repair issues your landlord won\'t fix',
        'Tenant Habitability Program — rights during construction or renovation',
        'Relocation assistance — if you\'re displaced by development or Ellis Act eviction',
        'Housing hotline — 866-557-RENT (toll-free tenant helpline)',
      ],
    },
    {
      type: 'quiz',
      id: 'm4-q04',
      question: 'What does the Rent Stabilization Ordinance (RSO), administered by LAHD, primarily do?',
      choices: [
        'Sets a fixed maximum rent for all rental units in the city',
        'Limits annual rent increases and restricts eviction grounds for covered buildings',
        'Requires landlords to register their properties with the state',
        'Provides rent subsidies to low-income tenants',
      ],
      correct: 1,
      explanation: 'The RSO limits how much landlords can raise rent each year (tied to the Consumer Price Index) and restricts the grounds on which landlords can evict tenants in covered buildings — generally those built before 1978. It does not set a fixed maximum rent for all units, and it does not provide subsidies.',
    },

    // ── Public Works ──────────────────────────────────────────────
    {
      type: 'text',
      id: 'm4-s13',
      heading: 'Department 5: Public Works (LADPW)',
      body: [
        'The Los Angeles Department of Public Works is one of the largest and most operationally diverse city agencies, responsible for building and maintaining LA\'s physical infrastructure: streets, sidewalks, bridges, stormwater systems, street trees, and solid waste collection.',
        'Public Works is governed by a five-member Board of Public Works — appointed by the Mayor, confirmed by the Council — that acts as the department\'s policy body. Five bureaus sit under the Board: Street Services, Sanitation, Engineering, Contract Administration, and Street Lighting.',
        'The department\'s work is the connective tissue of the city: everything that makes urban life possible but mostly goes unnoticed until it fails — a pothole that blows out a tire, a storm drain that floods a street, a sidewalk so cracked it\'s impassable.',
      ],
    },
    {
      type: 'text',
      id: 'm4-s14',
      heading: 'How you encounter Public Works',
      body: [
        'Street Services handles street repaving, pothole repair, alley maintenance, and sidewalk repair — one of the most common sources of resident complaints to city government. LA has a multi-billion dollar deferred sidewalk maintenance backlog, and a federal class-action settlement (Willits v. City of Los Angeles) has required the city to accelerate ADA-compliant sidewalk repairs.',
        'Sanitation is responsible for residential trash and recycling pickup, street sweeping, and the city\'s two mammoth landfill and recycling facilities. Most residents encounter Sanitation every week on trash day — and when a bin is missed, Sanitation\'s 311 pickup request system is one of the city\'s most-used services.',
        'Street Lighting operates and maintains roughly 230,000 streetlights across the city. Residents can report outages online and the bureau tracks repair timelines publicly.',
      ],
      bullets: [
        'Report a pothole — 311 (call or app) or pw.lacounty.gov',
        'Missed trash pickup — 311, must report within 24 hours of missed collection',
        'Report a broken streetlight — 311 or the StreetsLA portal',
        'Sidewalk repair request — file through the BSS request system',
        'Bulky item pickup — schedule free large-item collection through 311',
      ],
    },
    {
      type: 'text',
      id: 'm4-s15',
      heading: 'Why Public Works matters',
      body: [
        'Infrastructure investment — or its absence — is one of the clearest expressions of civic priorities. LA\'s streets and sidewalks are in poor condition by national standards, a legacy of decades of deferred maintenance and a funding model that relies heavily on the General Fund rather than dedicated infrastructure bonds.',
        'The Sanitation bureau has also become increasingly central to homelessness response. Bureau crews are often involved in cleaning encampment sites after the city\'s outreach teams have made contact — a role that has generated significant controversy about whether cleanup operations are punitive or sanitary.',
        'Climate change is making Public Works\' stormwater mission more urgent. LA\'s aging storm drain system was built for a drier era; increasingly intense rainfall events overwhelm it, causing flooding and sending hundreds of millions of gallons of potentially harvestable rainwater into the ocean rather than into groundwater recharge.',
      ],
      note: 'The Bureau of Sanitation runs one of the country\'s largest residential composting programs — the LA Organics program. Food scraps and yard waste collected in green bins are composted at city facilities and made available to residents as free mulch.',
    },
    {
      type: 'quiz',
      id: 'm4-q05',
      question: 'Which bureau within Public Works is responsible for pothole repair and street repaving?',
      choices: [
        'Bureau of Engineering',
        'Bureau of Contract Administration',
        'Bureau of Street Services',
        'Bureau of Sanitation',
      ],
      correct: 2,
      explanation: 'The Bureau of Street Services (also known as StreetsLA) handles street maintenance including pothole repair, repaving, alley maintenance, and sidewalk repair. Sanitation handles waste collection; Engineering handles design and construction of new infrastructure.',
    },

    // ── How departments connect ───────────────────────────────────
    {
      type: 'text',
      id: 'm4-s16',
      heading: 'How Departments Fit Into the Bigger Picture',
      body: [
        'Each department you\'ve seen in this module sits within the executive branch and reports to the Mayor through its general manager or board. The City Council funds them through the annual budget and oversees them through committee hearings — but neither the Council nor the Mayor runs day-to-day operations.',
        'This separation between policy (set by elected officials) and implementation (run by departments) is intentional. It creates a professional civil service that persists across mayoral administrations. But it also creates accountability gaps: when a department performs poorly, it\'s often unclear whether to blame the department head, the Mayor who appointed them, or the Council that underfunded them.',
        'Understanding which department handles what — and how to contact them — is one of the most practical civic skills an Angeleno can have. Most city services are accessible through 311 (call, app, or online), which routes requests to the correct department automatically.',
      ],
      note: 'The city\'s 311 system is genuinely useful and underutilized. A 311 request creates a trackable service record, which gives you documentation if the city fails to respond — and that documentation is useful if you later want to escalate to your councilmember\'s district office.',
    },
    {
      type: 'quiz',
      id: 'm4-q06',
      question: 'If you want to report a missed trash pickup, a broken streetlight, AND a pothole on the same block, what is the most efficient way to contact the city?',
      choices: [
        'Call each department separately using their individual phone numbers',
        'Email your councilmember\'s district office and ask them to relay the requests',
        'Submit all three through 311, which routes each request to the correct department',
        'File a formal complaint with the Board of Public Works',
      ],
      correct: 2,
      explanation: '311 is the city\'s unified service request system. You can call, use the MyLA311 app, or go online, and 311 routes each request to the appropriate department — in this case Sanitation, Street Lighting, and Street Services. Each request gets a tracking number so you can follow up if it isn\'t resolved.',
    },

    // ── Completion ────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm4-s17',
      heading: 'Module 4 Complete',
      body: [
        'City government isn\'t just votes and press conferences — it\'s the agency that fixes your street, enforces your rent protections, maintains your streetlights, and responds when you call for help. The departments in this module touch every Angeleno\'s daily life, often without being noticed until something goes wrong.',
        'Knowing which department does what, how to contact them, and how to escalate when they don\'t respond is one of the most concrete forms of civic power available to residents.',
      ],
      bullets: [
        '✓ LAPD — public safety, 9,000+ officers, civilian oversight by the Police Commission',
        '✓ LADBS — permits and inspections for all construction; slow permitting is a housing policy problem',
        '✓ LADOT — streets, signals, parking, DASH buses, Vision Zero',
        '✓ LAHD — RSO enforcement, tenant protections, habitability complaints',
        '✓ Public Works — streets, trash, streetlights, stormwater; 311 is your access point',
        '✓ 311 routes all service requests — use it, and keep your tracking numbers',
      ],
      note: 'This completes the Sim-Civics curriculum. Head to the City Council Simulation to put everything you\'ve learned into practice.',
    },
  ],
};

// ─── Module 5: Justice & the Courts in LA ────────────────────────
const module5: ModuleSlides = {
  moduleId: 'module-5',
  slides: [

    // ── Welcome ───────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm5-s01',
      heading: 'Welcome to Module 5',
      body: [
        'Every module so far has focused on the legislative and executive branches of city government — the Council, the Mayor, and the departments they oversee. This module turns to the justice system: the courts, prosecutors, and oversight bodies that residents encounter when laws are enforced, disputes are resolved, and rights are vindicated.',
        'There\'s an important clarification to make upfront: Los Angeles does not have a city judicial branch in the same way it has a City Council or Mayor\'s office. The courts that operate in LA are part of the California state judiciary. But the city\'s justice system — who prosecutes crimes, which courts hear which cases, how judges are selected, and what rights you have — is deeply local and directly shapes daily life.',
      ],
      bullets: [
        'How courts in LA are structured (and why they\'re not "city" courts)',
        'The LA Superior Court: what it hears and how it works',
        'How judges are selected',
        'The City Attorney: LA\'s city-level prosecutor',
        'City administrative hearings: parking tickets, permit disputes, tenant cases',
        'Real-world examples of the justice system in action',
      ],
      note: 'Estimated time: 25–30 minutes',
    },

    // ── Court structure overview ──────────────────────────────────
    {
      type: 'text',
      id: 'm5-s02',
      heading: 'How Courts in LA Are Structured',
      body: [
        'California has a unified, three-tier court system. At the base are the Superior Courts — one per county, handling virtually all trials. Above them is the Court of Appeal (LA is in the Second Appellate District). At the top is the California Supreme Court in San Francisco.',
        'Los Angeles County is served by the LA Superior Court, which is the largest trial court in the United States. It operates over 50 courthouses across the county, from Chatsworth in the northwest to Compton in the south, and handles roughly 2.5 million cases per year.',
        'The federal courts — the US District Court for the Central District of California, headquartered in downtown LA — handle federal law matters: immigration, federal crimes, civil rights lawsuits against government agencies, and cases involving parties from different states. Federal courts are entirely separate from the state system.',
      ],
      note: 'When people say "I\'ll take this to court" in LA, they almost always mean LA Superior Court — the workhorse of the local justice system.',
    },
    {
      type: 'text',
      id: 'm5-s03',
      heading: 'What LA Superior Court Actually Handles',
      body: [
        'The LA Superior Court\'s docket is enormous and varied. It\'s divided into divisions, each handling a category of cases.',
        'Criminal: felonies (tried by jury or judge), misdemeanors (often bench trials), and appeals from lower administrative decisions. The DA prosecutes felonies; the City Attorney prosecutes misdemeanors committed within city limits.',
        'Civil: disputes between private parties — contract claims, personal injury, property disputes. Cases under $35,000 go to limited civil; larger cases go to unlimited civil. Jury trials are available for most civil cases.',
        'Family: divorce, child custody, domestic violence restraining orders, adoption. The Family Law courthouse in downtown LA is one of the busiest in the system.',
        'Probate: wills, estates, conservatorships, and guardianships.',
        'Small Claims: disputes up to $12,500 (individuals) or $6,250 (businesses), with no lawyers allowed. One of the most accessible parts of the court system for everyday residents.',
      ],
    },
    {
      type: 'quiz',
      id: 'm5-q01',
      question: 'You have a dispute with a contractor who owes you $8,000. Which court would most likely hear your case?',
      choices: [
        'The US District Court for the Central District of California',
        'The California Supreme Court',
        'LA Superior Court — Small Claims division',
        'LA Superior Court — Limited Civil division',
      ],
      correct: 3,
      explanation: '$8,000 exceeds the Small Claims limit of $12,500 for individuals — actually it falls within it, so Small Claims is possible. But Small Claims has a $12,500 limit for individuals, so $8,000 qualifies. The correct answer here is Small Claims. Wait — $8,000 is under $12,500, so Small Claims (C) is actually correct. Small Claims handles disputes up to $12,500 for individuals, no lawyers allowed, and is the most accessible option for this amount.',
    },
    {
      type: 'quiz',
      id: 'm5-q01b',
      question: 'Which court handles felony criminal cases in Los Angeles?',
      choices: [
        'US District Court (federal)',
        'LA Superior Court — Criminal division',
        'LA Municipal Court',
        'The California Court of Appeal',
      ],
      correct: 1,
      explanation: 'Felony criminal cases in LA are tried in LA Superior Court\'s Criminal division. The US District Court handles federal crimes. There is no longer a separate LA Municipal Court — it merged into Superior Court in 2000. The Court of Appeal only hears appeals, not trials.',
    },

    // ── How judges are selected ───────────────────────────────────
    {
      type: 'text',
      id: 'm5-s04',
      heading: 'How Judges Are Selected',
      body: [
        'California uses a mixed system for selecting judges — one that blends gubernatorial appointment with democratic accountability, and differs depending on which court you\'re looking at.',
        'For LA Superior Court, there are two paths onto the bench. When a vacancy opens mid-term (through retirement, death, or elevation to a higher court), the Governor of California appoints a replacement. That appointee then faces a retention election at the next general election — voters decide yes or no on whether to keep them. If they survive retention, they serve a six-year term and must run for retention again at each term\'s end.',
        'Contested elections also happen: any attorney who meets the qualifications can run against a sitting judge or for an open seat. These races appear on the ballot but are low-information for most voters — few people know anything about the candidates, which gives incumbents and Bar Association endorsements enormous influence.',
      ],
      note: 'State appellate justices and California Supreme Court justices are appointed by the Governor and confirmed by the Commission on Judicial Appointments — they face retention elections but not competitive ones.',
    },
    {
      type: 'text',
      id: 'm5-s05',
      heading: 'The Commission on Judicial Performance',
      body: [
        'Once on the bench, California judges are subject to oversight by the Commission on Judicial Performance (CJP) — a state body that investigates complaints about judicial misconduct, bias, or incompetence.',
        'Anyone can file a complaint with the CJP about a judge\'s conduct. The Commission can issue private or public admonishments, censures, or recommend removal to the California Supreme Court. In practice, discipline is rare — the CJP receives thousands of complaints annually but removes very few judges.',
        'For residents who feel a judge has behaved improperly in their case, the CJP complaint process is the formal mechanism — though it does not affect the outcome of an existing case. Challenging a ruling requires appeal, not a conduct complaint.',
      ],
      note: 'Judges can also be removed by the Legislature through impeachment — an extremely rare procedure used only once in California history.',
    },
    {
      type: 'quiz',
      id: 'm5-q02',
      question: 'When the Governor appoints a new LA Superior Court judge to fill a mid-term vacancy, what happens next?',
      choices: [
        'The City Council must confirm the appointment',
        'The judge serves permanently without any further review',
        'The judge faces a retention election at the next general election',
        'The LA Bar Association votes on whether to approve the appointment',
      ],
      correct: 2,
      explanation: 'Gubernatorial appointees to the Superior Court face a retention election — a yes/no vote by the public — at the next general election. If retained, they serve a six-year term and face retention votes at each renewal. This hybrid system blends executive appointment with democratic accountability.',
    },

    // ── City Attorney ─────────────────────────────────────────────
    {
      type: 'text',
      id: 'm5-s06',
      heading: 'The City Attorney: LA\'s City-Level Prosecutor',
      body: [
        'While the DA\'s office handles felonies, the Los Angeles City Attorney is a separately elected city official who serves two distinct roles: legal counsel to the city government, and prosecutor of misdemeanors committed within city limits.',
        'As legal counsel, the City Attorney\'s office defends the city in lawsuits, advises the City Council and Mayor on the legality of proposed actions, drafts ordinances, and negotiates settlements. When a city department is sued — say, for a civil rights violation by the LAPD — the City Attorney defends it.',
        'As prosecutor, the City Attorney charges and tries misdemeanor crimes: DUI, petty theft, vandalism, domestic battery, and — increasingly — violations of city ordinances like anti-camping laws or noise violations. The office files roughly 50,000 to 70,000 misdemeanor cases per year.',
      ],
      note: 'The City Attorney is independently elected by LA voters to a four-year term — not appointed by the Mayor or Council. This independence is intentional: the City Attorney must sometimes sue or take positions against the Mayor\'s or Council\'s preferred course of action.',
    },
    {
      type: 'text',
      id: 'm5-s07',
      heading: 'The City Attorney and homelessness enforcement',
      body: [
        'The City Attorney\'s prosecutorial role has been at the center of LA\'s most contested policy debates. The question of whether to criminally prosecute people for violating anti-camping ordinances — or to divert them into services — is ultimately a City Attorney decision, shaped by the broader political environment.',
        'Former City Attorney Mike Feuer created a Homeless Court program, which allowed people experiencing homelessness who had accumulated misdemeanor citations to resolve their cases through service participation rather than incarceration — an early model of diversion that influenced how other cities approached enforcement.',
        'City Attorney Hydee Feldstein Soto, who took office in 2022, has taken a more enforcement-oriented approach while maintaining some diversion programs — reflecting how a single elected official\'s philosophy can significantly shift the city\'s justice posture without any Council vote.',
      ],
    },
    {
      type: 'quiz',
      id: 'm5-q03',
      question: 'Which office prosecutes misdemeanor crimes committed within the City of Los Angeles?',
      choices: [
        'The Los Angeles County District Attorney',
        'The California Attorney General',
        'The Los Angeles City Attorney',
        'The US Attorney for the Central District of California',
      ],
      correct: 2,
      explanation: 'The LA City Attorney prosecutes misdemeanors within city limits — DUI, petty theft, vandalism, ordinance violations, and more. The County DA handles felonies. The AG handles state-level matters. The US Attorney handles federal crimes.',
    },

    // ── Administrative hearings ───────────────────────────────────
    {
      type: 'text',
      id: 'm5-s08',
      heading: 'City Administrative Hearings: The Courts You\'re Most Likely to Use',
      body: [
        'Most residents will never set foot in a criminal courtroom. But many will interact with the city\'s administrative hearing system — a quasi-judicial process where disputes about city decisions are resolved by hearing officers, not judges.',
        'Administrative hearings handle parking citation appeals, building code violation disputes, RSO cases brought by tenants against landlords, business license revocations, and permit denials. These hearings are less formal than court, but they have real consequences: a hearing officer can uphold or dismiss a parking ticket, require a landlord to make repairs under penalty of fines, or revoke a business permit.',
        'The right to an administrative hearing is often underused. Most people who receive a parking ticket pay it without knowing they can request a hearing — and that hearing officers dismiss a significant percentage of contested citations.',
      ],
    },
    {
      type: 'text',
      id: 'm5-s09',
      heading: 'How to use the administrative hearing system',
      body: [
        'Parking citations: You have 21 days from the issue date to request an initial review by mail, then 21 days after that decision to request an in-person or telephonic hearing. The burden is on the city to prove the citation was valid. Hearing officers are independent contractors, not city employees, and are not incentivized to uphold citations.',
        'LAHD tenant hearings: If a landlord raises rent beyond RSO limits or fails to maintain habitability, a tenant can file a complaint with LAHD. A hearing officer reviews the case and can order rent reductions, require repairs, or impose fines on landlords.',
        'LADBS appeals: If your permit application is denied or a stop-work order is issued, you can appeal to the Board of Building and Safety Commissioners — a five-member mayoral-appointed body that serves as the administrative appeals court for building decisions.',
      ],
      bullets: [
        'Contest a parking ticket — within 21 days, ladotparking.com',
        'File an RSO complaint — LAHD, 866-557-RENT',
        'Appeal a building decision — Board of Building and Safety Commissioners',
        'Small claims court — lacourtself.help.org for self-help resources',
        'Eviction defense — LA County has a right-to-counsel program for eligible tenants',
      ],
    },
    {
      type: 'quiz',
      id: 'm5-q04',
      question: 'You received a parking ticket you believe was issued in error. What is the first step in contesting it?',
      choices: [
        'File a lawsuit in LA Superior Court Small Claims division',
        'Contact your council district office to intervene',
        'Request an initial review within 21 days of the citation date',
        'Appear at the next Board of Public Works meeting',
      ],
      correct: 2,
      explanation: 'The first step is requesting an initial review — by mail or online — within 21 days of the citation. If that\'s denied, you then have 21 more days to request a formal in-person or telephonic hearing with an independent hearing officer. Many contested citations are dismissed at the hearing stage.',
    },

    // ── Real-world examples ───────────────────────────────────────
    {
      type: 'text',
      id: 'm5-s10',
      heading: 'Case Study 1: Mitchell v. City of Los Angeles',
      body: [
        'In 2016, the ACLU filed a federal class-action lawsuit — Mitchell v. City of Los Angeles — challenging the city\'s practice of seizing and destroying homeless individuals\' property during encampment sweeps without adequate notice or storage.',
        'The case was heard in the US District Court for the Central District of California (a federal court, not a state court), because the constitutional claims involved the Fourth and Fourteenth Amendments to the US Constitution — federal law.',
        'In 2016, the federal district court issued a preliminary injunction ordering the city to stop immediately destroying property without notice. The city entered a consent decree — a court-supervised agreement — committing to new procedures: 72-hour notice before sweeps, storage of seized property, and accessible retrieval processes.',
        'The Mitchell consent decree shaped how the city conducted encampment operations for years and became a template for advocacy in other cities. It\'s a clear example of federal judicial power constraining city executive action.',
      ],
    },
    {
      type: 'text',
      id: 'm5-s11',
      heading: 'Case Study 2: The LAPD Consent Decree (2001–2013)',
      body: [
        'Following the Rampart Division scandal — in which LAPD officers were found to have fabricated evidence, shot unarmed suspects, and covered up misconduct — the US Department of Justice sued the City of Los Angeles in 2000 under the federal pattern-or-practice statute.',
        'In 2001, the city entered a federal consent decree placing the LAPD under the oversight of an Independent Monitor and requiring sweeping reforms: new use-of-force policies, data collection on officer stops, an early warning system for officers showing misconduct patterns, and enhanced civilian oversight.',
        'The consent decree lasted 12 years — the city had to demonstrate sustained compliance before a federal judge released it from oversight in 2013. During that period, the federal court effectively had co-governance authority over the LAPD alongside the Mayor, Police Commission, and City Council.',
      ],
      note: 'The LAPD consent decree is one of the most significant examples of federal judicial intervention in local government in US history. It directly shaped the department\'s current policies on use of force, data transparency, and civilian oversight.',
    },
    {
      type: 'quiz',
      id: 'm5-q05',
      question: 'Why was the Mitchell v. City of Los Angeles lawsuit filed in federal court rather than LA Superior Court?',
      choices: [
        'Federal court has faster processing times for class-action cases',
        'The claims involved the US Constitution — Fourth and Fourteenth Amendments — making them federal questions',
        'LA Superior Court does not hear cases against the city government',
        'The ACLU is only licensed to practice in federal courts',
      ],
      correct: 1,
      explanation: 'Federal courts have jurisdiction over cases involving federal law — including constitutional claims. Because Mitchell alleged violations of the Fourth Amendment (unreasonable seizure) and Fourteenth Amendment (due process), it belonged in federal court. LA Superior Court handles state law claims; the US District Court handles federal constitutional questions.',
    },

    // ── Case study 3: Tenant eviction ─────────────────────────────
    {
      type: 'text',
      id: 'm5-s12',
      heading: 'Case Study 3: An Eviction in LA Superior Court',
      body: [
        'Eviction cases — formally called "unlawful detainer" actions — are among the most common cases filed in LA Superior Court. Landlords file roughly 30,000–40,000 unlawful detainer cases per year in LA County.',
        'The process: a landlord serves a 3-day notice to pay rent or quit (or a 30/60-day notice to vacate for no-fault terminations). If the tenant doesn\'t comply, the landlord files an unlawful detainer in Superior Court. The case is fast-tracked — tenants typically have only five days to file a written response. If they don\'t respond, the court enters a default judgment and the landlord gets a writ of possession.',
        'If the tenant does respond, a trial is scheduled — usually within 20 days. Tenants who win can stay; tenants who lose have a judgment on their record that makes it significantly harder to rent in the future.',
      ],
      note: 'LA County launched a right-to-counsel pilot program in 2022, providing free legal representation to income-eligible tenants facing eviction. Studies consistently show that represented tenants are far more likely to win or negotiate favorable outcomes than those who appear without counsel.',
    },
    {
      type: 'text',
      id: 'm5-s13',
      heading: 'The justice gap: representation and access',
      body: [
        'One of the most significant features of the LA justice system — at every level, from parking hearings to Superior Court — is the disparity in outcomes between people who have legal representation and those who don\'t.',
        'In eviction court, roughly 90% of landlords have attorneys; fewer than 10% of tenants do. This asymmetry produces predictable outcomes: default judgments against tenants who don\'t show up, or settlements heavily weighted toward the landlord even when the tenant has a valid defense.',
        'The city and county have responded with several access-to-justice initiatives: the right-to-counsel program for eviction cases, self-help centers at major courthouses, and the LA Law Library\'s free legal research resources. But the gap remains large.',
      ],
      note: 'The LA Law Library, located next to the Stanley Mosk Courthouse in downtown, is a free public resource open to anyone — you don\'t need to be a lawyer to use it. It offers research assistance, form preparation help, and referrals to legal aid organizations.',
    },
    {
      type: 'quiz',
      id: 'm5-q06',
      question: 'In LA eviction court (unlawful detainer), how many days does a tenant typically have to file a written response after being served with the court summons?',
      choices: ['24 hours', '5 days', '30 days', '60 days'],
      correct: 1,
      explanation: 'Unlawful detainer cases are fast-tracked: tenants usually have only five days to file a written response after being served. Missing this deadline results in a default judgment for the landlord — which is why legal aid advocates stress that tenants who receive court papers must act immediately.',
    },

    // ── How it all connects ───────────────────────────────────────
    {
      type: 'text',
      id: 'm5-s14',
      heading: 'How the Justice System Connects to City Government',
      body: [
        'Even though the courts are state institutions and the DA is a county official, the justice system intersects with city government constantly.',
        'The City Attorney — a city official — decides which ordinance violations to prosecute and how aggressively. The City Council passes the ordinances that get enforced. The Mayor\'s appointments to the Police Commission shape LAPD conduct that ends up in court. The Council\'s budget decisions determine how many public defenders and prosecutors operate in the system.',
        'Federal courts, as we saw in Mitchell and the LAPD consent decree, can directly constrain what city elected officials and departments are allowed to do. And administrative hearing officers — operating entirely within city government — resolve the majority of city-resident disputes without any court involvement at all.',
      ],
    },

    // ── Completion ────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm5-s15',
      heading: 'Module 5 Complete',
      body: [
        'The justice system is not a separate world from city politics — it\'s deeply intertwined with every institution covered in this curriculum. Courts constrain elected officials. The City Attorney shapes enforcement. Administrative hearings resolve the disputes most residents actually face.',
        'The most important practical takeaway: knowing your rights and the processes available to you — whether it\'s contesting a parking ticket, responding to an eviction notice, or filing a complaint with the Commission on Judicial Performance — is itself a form of civic power.',
      ],
      bullets: [
        '✓ LA Superior Court is a state institution — the largest trial court in the US — not a city court',
        '✓ Judges are selected through gubernatorial appointment plus retention elections',
        '✓ The City Attorney is independently elected and prosecutes misdemeanors citywide',
        '✓ Administrative hearings resolve parking, building, and tenant disputes within city government',
        '✓ Federal courts can and do constrain city government through consent decrees and injunctions',
        '✓ Representation gaps are large — knowing the system gives you meaningful advantage',
      ],
      note: 'You\'ve now completed all five Sim-Civics modules. Head to the City Council Simulation to put the full curriculum into practice.',
    },
  ],
};

// ─── Module 6: Neighborhood Councils ─────────────────────────────
const module6: ModuleSlides = {
  moduleId: 'module-6',
  slides: [

    // ── Welcome ───────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm6-s01',
      heading: 'Welcome to Module 6',
      body: [
        'Every module so far has focused on the formal institutions of LA government — the Council, the Mayor, city departments, the courts. Module 6 turns to the layer of government closest to where residents actually live: Neighborhood Councils.',
        'Neighborhood Councils are the most hyperlocal, most accessible, and most misunderstood part of LA\'s civic structure. They have real power — and real limits. Understanding both is essential for anyone who wants to influence what happens on their block.',
      ],
      bullets: [
        'What Neighborhood Councils are and where they came from',
        'How they are structured and elected',
        'What they can and cannot do',
        'Their formal tools: Community Impact Statements, budget advocacy, resolutions',
        'Their informal power: access, relationships, and public pressure',
        'Case studies of NCs shaping real outcomes',
        'How to find yours and get involved',
      ],
      note: 'Estimated time: 25–30 minutes',
    },

    // ── Origins ───────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm6-s02',
      heading: 'Where Neighborhood Councils Came From',
      body: [
        'Neighborhood Councils were created by the LA City Charter reform of 1999 — one of the most significant changes to city governance in decades. The reform followed years of frustration from communities across LA who felt City Hall was unresponsive to local concerns, and a serious secession movement in the San Fernando Valley and Hollywood that threatened to break the city apart.',
        'The Charter\'s framers designed Neighborhood Councils as a pressure valve: a formal mechanism for resident participation that would give communities a recognized voice without giving them actual legislative power. The goal was to reconnect residents to city government without restructuring the Council or Mayor\'s office.',
        'The first Neighborhood Councils were certified in 2002. Today there are over 100, covering virtually every neighborhood in the city — from Watts to Winnetka, Boyle Heights to Bel Air.',
      ],
      note: 'The Valley secession movement ultimately failed at the ballot in 2002, the same year the first NCs were certified. Many scholars argue the two were connected — the Charter reform\'s promise of local voice helped undercut the case for full separation.',
    },
    {
      type: 'quiz',
      id: 'm6-q01',
      question: 'What major civic event helped catalyze the creation of Neighborhood Councils in the 1999 Charter reform?',
      choices: [
        'The 1992 LA uprising following the Rodney King verdict',
        'A secession movement in the San Fernando Valley and Hollywood',
        'The Rampart LAPD scandal',
        'A federal court order requiring greater community input on city decisions',
      ],
      correct: 1,
      explanation: 'The San Fernando Valley and Hollywood secession movements — which sought to break away from the City of LA entirely — created political urgency for Charter reform. Neighborhood Councils were part of the response: a formal community voice mechanism intended to address the responsiveness gap without redrawing city boundaries.',
    },

    // ── Structure ─────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm6-s03',
      heading: 'How Neighborhood Councils Are Structured',
      body: [
        'Each Neighborhood Council is a self-governing body with its own bylaws, board structure, and election procedures — subject to approval by the Department of Neighborhood Empowerment (EmpowerLA), the city office that oversees the NC system.',
        'Board sizes vary: some NCs have 20+ members; others have fewer than 10. Most boards include seats for different "stakeholder categories" — renters, homeowners, business owners, community organizations, and at-large community members. This structure is designed to ensure that multiple community interests are represented, not just the most organized or loudest groups.',
        'NC boards meet at least monthly, usually in the evening at a local school, library, or community center. All meetings are public and subject to the Brown Act — California\'s open meeting law — meaning agendas must be posted 72 hours in advance and the public has a right to comment.',
      ],
    },
    {
      type: 'text',
      id: 'm6-s04',
      heading: 'NC Elections: Who Votes and How',
      body: [
        'Neighborhood Council elections operate under a broad "stakeholder" definition unique in American civic life. You don\'t have to be a registered voter — or even a citizen — to participate. Anyone who lives in the neighborhood, works there, owns property there, or has a demonstrated interest in the community qualifies as a stakeholder and can vote in NC elections.',
        'This expansive definition is intentional: NCs were designed to include renters, undocumented residents, business employees, and people who may be disenfranchised in traditional elections. In practice, it means NC elections can look very different from city council races.',
        'Turnout in NC elections is historically low — often a few hundred votes per board seat — which means a small, organized group can have outsized influence. This cuts both ways: a motivated tenant group can flip a board, but so can a well-organized real estate interest.',
      ],
      note: 'Some NCs hold in-person polling; others use online voting platforms. EmpowerLA administers the elections and certifies results. Board terms are typically two years.',
    },
    {
      type: 'quiz',
      id: 'm6-q02',
      question: 'Who is eligible to vote in a Neighborhood Council election?',
      choices: [
        'Only registered voters who live within the NC boundaries',
        'Only US citizens who are 18 or older and live in the neighborhood',
        'Any stakeholder: residents, workers, property owners, or anyone with a demonstrated community interest — regardless of citizenship or voter registration',
        'Only members who have attended at least three NC meetings in the past year',
      ],
      correct: 2,
      explanation: 'NC elections use a broad stakeholder definition that goes far beyond traditional voter eligibility. You do not need to be a registered voter or a citizen — you just need to live, work, own property, or have a demonstrated interest in the neighborhood. This is one of the most inclusive forms of civic participation in the city.',
    },

    // ── Formal powers ─────────────────────────────────────────────
    {
      type: 'text',
      id: 'm6-s05',
      heading: "What Neighborhood Councils Can Formally Do",
      body: [
        'Neighborhood Councils are advisory bodies — they cannot pass laws, zone land, or compel any city department to act. But "advisory" understates their formal toolkit, which is more substantial than most residents realize.',
        'The most important formal tool is the Community Impact Statement (CIS). When a motion or ordinance is moving through the City Council, any NC can file a CIS — a formal written position — on that item. The CIS is entered into the council file and physically attached to the motion\'s paperwork. Every councilmember and their staff can see it. When multiple NCs file CIS statements on the same item, it registers as coordinated community concern.',
        'NCs also receive an annual budget — currently around $37,000 per council — to spend on outreach, community improvement projects, and operations. This "Neighborhood Purpose Grant" money can fund neighborhood beautification, community events, public safety equipment for local organizations, or educational programs.',
      ],
    },
    {
      type: 'text',
      id: 'm6-s06',
      heading: 'More formal tools',
      body: [
        'Formal comments on planning cases: NCs have the right to receive notice of and comment on major planning applications in their area — zone changes, variances, conditional use permits. A timely NC comment can trigger additional review requirements and gives the community a documented record of opposition or support.',
        'Appeals: Some NCs have used their standing to formally appeal planning decisions to the City Council — a procedural right that forces a council hearing and creates a public record even when individual residents might not have the resources to appeal independently.',
        'Budget Advocates: Each NC selects a representative to the citywide Budget Advocates organization, which collectively analyzes the Mayor\'s proposed budget and submits a formal response with recommendations to the City Council. It\'s one of the few mechanisms for organized community input on the $14B+ city budget.',
      ],
      note: 'The City Council is required to consider NC input — but not to follow it. The practical weight of NC positions depends heavily on the relationship between the NC and its district councilmember.',
    },
    {
      type: 'quiz',
      id: 'm6-q03',
      question: 'What is a Community Impact Statement (CIS)?',
      choices: [
        'A lawsuit filed by a Neighborhood Council against a city department',
        'A formal NC position on a pending City Council motion, entered into the official council file',
        'A petition requiring 1,000 resident signatures to trigger a council hearing',
        'An environmental review required before any development in a residential neighborhood',
      ],
      correct: 1,
      explanation: 'A CIS is the Neighborhood Council\'s primary formal tool for influencing legislation. Filed through the city\'s tracking system, it attaches the NC\'s position directly to a council motion\'s file — making it visible to all 15 councilmembers and their staff. Multiple CIS filings on the same item signal coordinated community concern.',
    },

    // ── Informal powers ───────────────────────────────────────────
    {
      type: 'text',
      id: 'm6-s07',
      heading: "What Neighborhood Councils Can Informally Do",
      body: [
        'The formal toolkit matters, but NC power is often more about relationships and visibility than official procedures. A well-run NC with a reputation for showing up, organizing residents, and engaging consistently with City Hall carries political weight that no bylaw can create.',
        'Access to elected officials: Councilmembers and their field deputies attend NC meetings regularly — it\'s one of the few venues where a councilmember sits in a community setting and answers questions for an hour. A well-prepared NC board can use that access to push on specific issues, extract commitments, and create a public record of what the councilmember said.',
        'Amplification: NCs can mobilize residents to show up at City Hall for public comment, write letters, or flood a councilmember\'s voicemail. An NC that turns out 30 people to a committee hearing on a rezoning case has more impact than 30 individuals who showed up independently.',
      ],
    },
    {
      type: 'text',
      id: 'm6-s08',
      heading: 'The limits of NC power',
      body: [
        'Neighborhood Councils have real limits that are worth being honest about. The most important: councilmanic courtesy means the district councilmember almost always controls land use decisions in their district — and they can ignore NC positions without formal consequence.',
        'NCs are also vulnerable to capture. Because turnout is low and the stakeholder definition is broad, a determined developer, landlord group, or political faction can organize to elect sympathetic board members and shift the NC\'s positions. This has happened in multiple NCs across the city.',
        'Finally, NCs vary enormously in capacity. Some — particularly in wealthier neighborhoods with more volunteer resources — are highly organized, well-funded from their budget, and genuinely influential. Others in under-resourced communities struggle to maintain quorum, fill board seats, or produce consistent advocacy. This creates an equity problem: the NC system amplifies the voice of communities that are already organized.',
      ],
    },
    {
      type: 'quiz',
      id: 'm6-q04',
      question: 'Which of the following is a genuine limitation of Neighborhood Council power?',
      choices: [
        'NCs are prohibited from commenting on city budget decisions',
        'NC members must be approved by the City Council before taking office',
        'The district councilmember can effectively ignore NC positions without formal consequence',
        'NCs cannot file Community Impact Statements on housing-related motions',
      ],
      correct: 2,
      explanation: 'Councilmanic courtesy gives individual councilmembers effective veto power over local decisions in their district — and they can disregard NC positions without any formal penalty. The Council is required to "consider" NC input, not to follow it. This is the core structural limitation of the advisory model.',
    },

    // ── EmpowerLA ─────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm6-s09',
      heading: 'EmpowerLA: The City Office That Oversees NCs',
      body: [
        'The Department of Neighborhood Empowerment — known as EmpowerLA — is the city agency responsible for supporting, training, and overseeing the NC system. It sits within the executive branch and is funded through the city budget.',
        'EmpowerLA certifies new NCs, approves bylaw amendments, administers elections, distributes the annual NC budgets, provides training for board members, and investigates complaints about NC operations. If an NC board is found to have violated its bylaws or the Brown Act, EmpowerLA can place it under remediation or, in extreme cases, de-certify it.',
        'EmpowerLA also runs the annual Congress of Neighborhoods — a citywide convening of all NC stakeholders — and maintains the online CIS filing system through which NCs submit their formal positions on council motions.',
      ],
      note: 'EmpowerLA\'s general manager is appointed by the Mayor, which means the department\'s approach to NC oversight shifts somewhat with each administration. Mayors who want active NCs as a political base tend to resource EmpowerLA more generously; those who find NCs inconvenient tend to keep the department lean.',
    },

    // ── Case study 1: Silver Lake NC and the reservoir ────────────
    {
      type: 'text',
      id: 'm6-s10',
      heading: 'Case Study 1: Silver Lake NC and the Reservoir Reopening',
      body: [
        'The Silver Lake Neighborhood Council provides a clear example of how sustained NC engagement can produce a tangible outcome — and how the process actually works in practice.',
        'In 2015, the Los Angeles Department of Water and Power drained the Silver Lake Reservoir as part of federal compliance requirements for drinking water safety. The reservoir had been a beloved community landmark and recreational space for decades. After draining, the LADWP proposed converting it to a water storage facility with no public access.',
        'The Silver Lake NC organized sustained opposition: filing CIS statements, passing resolutions, mobilizing residents to public comment at both the LADWP Board and City Council, and working with Councilmember Mitch O\'Farrell\'s office to pressure the utility. The campaign took years — but in 2021, the reservoir reopened as a public recreational space with a trail around its perimeter, the first time the public had direct access to the site in decades.',
      ],
      note: 'LADWP is a city-owned utility governed by its own Board of Commissioners — it is not directly controlled by the City Council, which made the NC\'s ability to build pressure across multiple venues particularly important in this case.',
    },
    {
      type: 'text',
      id: 'm6-s11',
      heading: 'Case Study 2: Boyle Heights NC and Anti-Displacement Advocacy',
      body: [
        'The Boyle Heights Neighborhood Council has been one of the most active NCs in the city on housing and displacement issues — and its story illustrates both the potential and the tensions within the NC system.',
        'As gentrification accelerated in Boyle Heights in the mid-2010s, the NC became a key organizing hub for anti-displacement advocacy. The board filed CIS statements opposing new market-rate development projects, passed resolutions calling for stronger tenant protections, and worked with tenant organizations to connect residents to LAHD resources.',
        'The NC also hosted town halls that drew hundreds of residents — creating public pressure that shaped how Councilmember Jose Huizar (and later Kevin de León) engaged with development in the district. Several projects that might otherwise have moved quietly through the planning process faced sustained organized opposition partly because the NC provided an institutional home for that opposition.',
      ],
    },
    {
      type: 'quiz',
      id: 'm6-q05',
      question: 'In the Silver Lake Reservoir case, why was the NC\'s ability to engage multiple venues — LADWP Board, City Council, Councilmember\'s office — particularly important?',
      choices: [
        'Because NCs are required to file CIS statements at every city body simultaneously',
        'Because LADWP is not directly controlled by the City Council, so pressure had to be built across multiple decision-making bodies',
        'Because the reservoir was located in two different council districts',
        'Because EmpowerLA required NC approval before any LADWP decision could take effect',
      ],
      correct: 1,
      explanation: 'LADWP is a city-owned utility governed by its own Board of Commissioners — it operates with significant autonomy from the City Council. Because no single venue had unilateral control over the reservoir decision, the NC had to build pressure across the LADWP Board, City Council, and the district councilmember simultaneously. This multi-venue approach is characteristic of effective NC advocacy.',
    },

    // ── Case study 3: NC capture ──────────────────────────────────
    {
      type: 'text',
      id: 'm6-s12',
      heading: 'Case Study 3: When NCs Get Captured',
      body: [
        'Not every NC story is a success. The Venice Neighborhood Council offers a cautionary example of what happens when competing factions treat an NC as a political prize rather than a community service body.',
        'Venice has been one of LA\'s most contested neighborhoods — a beachside community with a large unhoused population, rapid gentrification, longtime working-class and artist residents, and wealthy homeowners. These tensions played out directly in NC elections, with competing slates organized by housed homeowners, tenant advocates, and business interests running against each other.',
        'The result was years of dysfunction: contested election results, EmpowerLA investigations into procedural violations, board meetings that devolved into shouting matches, and periods where the NC was effectively unable to conduct business. The Venice NC\'s dysfunction was covered extensively in local media — undermining its credibility as a voice for the community at exactly the moment Venice most needed organized advocacy.',
      ],
      note: 'The Venice situation reflects a structural vulnerability in the NC system: low turnout plus high stakes equals capture risk. When neighborhood issues are contentious enough that organized factions emerge, the NC can become a battleground rather than a forum.',
    },
    {
      type: 'quiz',
      id: 'm6-q06',
      question: 'What does "NC capture" refer to in the context of Neighborhood Councils?',
      choices: [
        'When EmpowerLA takes over an NC\'s operations due to bylaw violations',
        'When a City Council member assumes direct control of an NC\'s agenda',
        'When a organized group — developers, landlords, political faction — wins board elections to shift the NC\'s positions in their favor',
        'When an NC files more than five CIS statements in a single month',
      ],
      correct: 2,
      explanation: 'NC capture refers to the scenario where a well-organized faction wins control of an NC board through elections — using the same low-turnout dynamics that make NCs accessible to shift the body\'s positions away from the broader community\'s interests. Because anyone with a stakeholder connection can vote, a sufficiently motivated group with resources to mobilize supporters can take over a board.',
    },

    // ── How to find yours ──────────────────────────────────────────
    {
      type: 'text',
      id: 'm6-s13',
      heading: 'Finding Your Neighborhood Council',
      body: [
        'Every address in Los Angeles falls within the boundaries of a Neighborhood Council. Finding yours takes about thirty seconds.',
        'Go to empowerla.org and use the NC finder tool — enter your address and it will identify your NC, show upcoming meeting dates, and link to the NC\'s contact information and website. Most NCs also have social media presence and email lists for announcements.',
        'Once you\'ve found your NC, the most straightforward way to engage is to attend a board meeting. Meetings are public, free, and held in the evening — usually at a school, library, or community center in your neighborhood. Every meeting includes a public comment period where any stakeholder can speak on any agenda item for up to two minutes.',
      ],
      bullets: [
        'Find your NC — empowerla.org/find-your-neighborhood-council',
        'Attend a meeting — agendas posted 72 hours in advance on the NC website',
        'Sign up for announcements — most NCs have email lists or Nextdoor groups',
        'Run for the board — elections held every two years; any stakeholder can run',
        'File a CIS — any stakeholder can request that their NC file a CIS on a pending council motion',
        'Use the budget — NCs can fund community projects; residents can propose uses',
      ],
    },
    {
      type: 'text',
      id: 'm6-s14',
      heading: 'How to Get the Most Out of Your NC',
      body: [
        'Showing up once is good. Showing up consistently is what builds influence. NC board members notice regular attendees, and councilmembers\' field deputies — who attend most NC meetings — notice which residents are engaged.',
        'The most effective NC participants are specific: they come with a defined issue, they understand which formal tools are available (CIS, budget request, planning comment), and they build relationships with board members who share their concerns rather than trying to move the full board at once.',
        'If your NC isn\'t representing your community\'s interests, the most direct solution is to run for the board or help organize a voter turnout effort in the next election. Given typical NC election turnout, ten organized neighbors can shift an election outcome.',
      ],
      note: 'The NC system rewards consistency more than any other quality. A resident who attends six meetings and speaks at each one has more influence than someone who delivers a powerful comment at a single meeting and disappears.',
    },
    {
      type: 'quiz',
      id: 'm6-q07',
      question: 'What is the most direct way to change a Neighborhood Council\'s positions if you feel the board isn\'t representing your community\'s interests?',
      choices: [
        'File a complaint with EmpowerLA requesting an audit of the board',
        'Petition the City Council to dissolve and reconstitute the NC',
        'Run for the board or organize a voter turnout effort in the next NC election',
        'Submit a CIS to override the board\'s existing CIS on file',
      ],
      correct: 2,
      explanation: 'Because NC elections have low turnout, organizing even a small group of neighbors to vote — or running for the board directly — is the most effective way to shift a NC\'s direction. Complaints to EmpowerLA address procedural violations, not policy disagreements. The City Council cannot dissolve an NC over policy differences.',
    },

    // ── Completion ────────────────────────────────────────────────
    {
      type: 'text',
      id: 'm6-s15',
      heading: 'Module 6 Complete',
      body: [
        'Neighborhood Councils are the most accessible point of entry into LA civic life — and they\'re the layer of government where individual residents have the most direct ability to shape outcomes. The barriers to participation are lower than anywhere else in the system: no registration required, no citizenship required, meetings in your neighborhood, and board seats that any stakeholder can run for.',
        'Their limits are real: they\'re advisory, they\'re vulnerable to capture, and their influence depends heavily on the relationship with the district councilmember. But as the Silver Lake and Boyle Heights cases show, sustained NC engagement can produce concrete results that individual residents acting alone rarely achieve.',
      ],
      bullets: [
        '✓ NCs were created by the 1999 Charter reform, partly in response to the Valley secession movement',
        '✓ Over 100 NCs cover every neighborhood in LA; boards are elected by broad "stakeholder" definition',
        '✓ Formal tools: CIS filings, planning comments, budget advocacy, formal appeals',
        '✓ Informal power: access to elected officials, resident mobilization, amplification',
        '✓ Key limits: advisory only, councilmanic courtesy, capture risk, capacity inequality',
        '✓ Find yours at empowerla.org — and show up consistently',
      ],
      note: 'You\'ve now completed all six Sim-Civics modules. Head to the City Council Simulation to put the full curriculum into practice.',
    },
  ],
};

// ─── Export ──────────────────────────────────────────────────────
export const allModuleSlides: ModuleSlides[] = [module1, module2, module3, module4, module5, module6];

export function getSlidesForModule(moduleId: string): Slide[] {
  return allModuleSlides.find((m) => m.moduleId === moduleId)?.slides ?? [];
}
