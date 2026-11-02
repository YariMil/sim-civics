import { MAX_BODY, MAX_PLACE } from '../../data/ideaTags';

// The three parts of an idea, matching the steps on the Ideas intro.
export type IdeaSectionKey = 'body' | 'place' | 'impacts';

export const IDEA_SECTIONS: {
  key: IdeaSectionKey;
  step: string; // pill text on the intro
  heading: string; // shown on the idea page
  label: string; // editor field
  placeholder: string;
  icon: string;
  max: number;
  rows: number;
}[] = [
  {
    key: 'body',
    step: 'Clarify your idea',
    heading: 'What it is',
    label: 'What is your idea?',
    placeholder: 'Describe the problem, need, or possibility, and the change you’re asking for.',
    icon: '/images/ideas-intro/icon-chat.svg',
    max: MAX_BODY,
    rows: 5,
  },
  {
    key: 'place',
    step: 'Pin down the place',
    heading: 'Where it would take place',
    label: 'Where would it take place?',
    placeholder: 'A street, park, school, neighborhood, or the whole city.',
    icon: '/images/ideas-intro/icon-pin.svg',
    max: MAX_PLACE,
    rows: 2,
  },
  {
    key: 'impacts',
    step: 'Think through impacts',
    heading: 'Intended impacts',
    label: 'What are its intended impacts?',
    placeholder: 'Who would it help, what would change, and what could the trade-offs be?',
    icon: '/images/ideas-intro/icon-sprout.svg',
    max: MAX_BODY,
    rows: 4,
  },
];
