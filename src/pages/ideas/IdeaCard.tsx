import { Link } from 'react-router-dom';
import { ChipList } from './Chips';
import type { Idea } from './api';

// Figma "idea-card": the whole card links to the idea.
export default function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <Link to={`/ideas/${idea.id}`} className='sc-idea-card'>
      <h3 className='sc-idea-card__title'>{idea.title}</h3>
      <p className='sc-idea-card__body'>{idea.body}</p>
      {idea.tags.length > 0 && <ChipList kind='tag' labels={idea.tags} />}
      {idea.subtag && <ChipList kind='subtag' labels={[idea.subtag]} />}
      <span className='sc-idea-card__view'>View idea</span>
    </Link>
  );
}
