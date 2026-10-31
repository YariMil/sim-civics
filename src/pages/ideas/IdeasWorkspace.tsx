import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IdeasLayout from './IdeasLayout';
import { ChipList } from './Chips';
import { listIdeas, type Idea } from './api';

export default function IdeasWorkspace() {
  const [ideas, setIdeas] = useState<Idea[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    listIdeas().then((r) => (r.ok ? setIdeas(r.data.ideas) : setError(r.error)));
  }, []);

  return (
    <IdeasLayout>
      <div className='sc-ideas__intro'>
        <p>
          Record and refine your ideas for local action, track their development, and share
          proposals with city council members.
        </p>
        <Link to='/ideas/new' className='sc-btn sc-btn--primary'>+ New idea</Link>
      </div>

      <h2 className='sc-ideas__subheading'>My ideas</h2>

      {error && <p role='alert' className='sc-ideas__error'>{error}</p>}
      {!ideas && !error && <p className='sc-ideas__muted'>Loading your ideas…</p>}

      {ideas && (
        <ul className='sc-idea-grid'>
          {ideas.map((idea) => (
            <li key={idea.id}>
              <Link to={`/ideas/${idea.id}`} className='sc-idea-card'>
                <h3 className='sc-idea-card__title'>{idea.title}</h3>
                <p className='sc-idea-card__body'>{idea.body}</p>
                {idea.tags.length > 0 && <ChipList kind='tag' labels={idea.tags} />}
                {idea.subtag && <ChipList kind='subtag' labels={[idea.subtag]} />}
                <span className='sc-idea-card__view'>View idea</span>
              </Link>
            </li>
          ))}
          <li>
            <Link to='/ideas/new' className='sc-idea-card sc-idea-card--new'>
              <span className='sc-idea-card__plus' aria-hidden='true'>+</span>
              <span className='sc-idea-card__new-title'>Start a new idea</span>
              <span className='sc-idea-card__new-text'>
                Write it down now and come back to refine it anytime.
              </span>
            </Link>
          </li>
        </ul>
      )}
    </IdeasLayout>
  );
}
