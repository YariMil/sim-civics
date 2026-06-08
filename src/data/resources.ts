export type ResourceCategory = 'explainer' | 'guide' | 'video' | 'quiz';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  readTime?: string;
  href?: string;   // external link, if applicable
}

export const resources: Resource[] = [
  {
    id: 'res-001',
    title: 'What is the LA City Council?',
    description: 'An introduction to the 15-district structure, how councilmembers are elected, the powers the Council holds, and how it differs from the Mayor\'s office.',
    category: 'explainer',
    readTime: '5 min read',
  },
  {
    id: 'res-002',
    title: 'How a motion becomes policy',
    description: 'A step-by-step walkthrough of how a council motion is introduced, referred to committee, heard in public testimony, voted on, and enacted into law.',
    category: 'guide',
    readTime: '8 min read',
  },
  {
    id: 'res-003',
    title: 'How to speak at public comment',
    description: 'A practical guide to signing up for, preparing, and delivering public comment at an LA City Council session — including rules, time limits, and tips.',
    category: 'guide',
    readTime: '4 min read',
  },
  {
    id: 'res-004',
    title: 'The Mayor vs. the Council: understanding LA\'s split executive',
    description: 'LA has a "weak mayor" system compared to some cities. This explainer covers the balance of power between the Mayor\'s office and the 15-member council.',
    category: 'explainer',
    readTime: '6 min read',
  },
  {
    id: 'res-005',
    title: 'Know your district — video walkthrough',
    description: 'A visual tour of how LA\'s 15 council districts are drawn, what neighborhoods they cover, and how to find out who represents you.',
    category: 'video',
    readTime: '12 min',
  },
  {
    id: 'res-006',
    title: 'Council vocabulary quiz',
    description: 'Test your knowledge of key terms: quorum, ordinance, resolution, motion, and more. Great prep before participating in the Sim-Civics simulation.',
    category: 'quiz',
    readTime: '~10 questions',
  },
  {
    id: 'res-007',
    title: 'Reading a council agenda',
    description: 'Real LA council agendas can be dense and confusing. This guide breaks down each section so you can follow along at a real or simulated session.',
    category: 'guide',
    readTime: '5 min read',
  },
  {
    id: 'res-008',
    title: 'City budget basics',
    description: 'Where does LA\'s $14B+ annual budget come from and where does it go? This primer covers revenue sources, departmental allocations, and the budget calendar.',
    category: 'explainer',
    readTime: '7 min read',
  },
];

export const categoryMeta: Record<ResourceCategory, { label: string; cssClass: string; icon: string }> = {
  explainer: { label: 'Explainer', cssClass: 'badge--explainer', icon: 'BookOpen' },
  guide:     { label: 'Guide',     cssClass: 'badge--guide',     icon: 'Map' },
  video:     { label: 'Video',     cssClass: 'badge--video',     icon: 'Play' },
  quiz:      { label: 'Quiz',      cssClass: 'badge--quiz',      icon: 'ClipboardCheck' },
};
