import { useState } from 'react';
import { BookOpen, Map, Play, ClipboardCheck, ChevronRight } from 'lucide-react';
import { resources, categoryMeta, type ResourceCategory } from '../data/resources';
import './Resources.css';

const iconMap: Record<ResourceCategory, JSX.Element> = {
  explainer: <BookOpen size={16} />,
  guide:     <Map size={16} />,
  video:     <Play size={16} />,
  quiz:      <ClipboardCheck size={16} />,
};

type FilterOption = 'all' | ResourceCategory;

const filters: { value: FilterOption; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'explainer', label: 'Explainers' },
  { value: 'guide',     label: 'Guides' },
  { value: 'video',     label: 'Videos' },
  { value: 'quiz',      label: 'Quizzes' },
];

export default function Resources() {
  const [filter, setFilter] = useState<FilterOption>('all');

  const filtered = filter === 'all'
    ? resources
    : resources.filter((r) => r.category === filter);

  return (
    <main>
      <div className="res-hero">
        <div className="container res-hero__inner">
          <p className="eyebrow">Educational Resources</p>
          <h1 className="display-sm res-hero__title">How the LA City Council works</h1>
          <p className="body-lg res-hero__sub">
            Everything you need to understand local government in Los Angeles — from the basics 
            to running your own public comment.
          </p>
          <div className="res-filters" role="group" aria-label="Filter resources by type">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`sim-filter-pill ${filter === f.value ? 'sim-filter-pill--active' : ''}`}
                style={{ borderColor: filter === f.value ? '' : 'rgba(255,255,255,0.25)', color: filter === f.value ? '' : 'rgba(255,255,255,0.7)' }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="res-grid">
          {filtered.map((res, i) => {
            const meta = categoryMeta[res.category];
            return (
              <article key={res.id} className="res-card card animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="res-card__top">
                  <div className="res-card__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className={`badge ${meta.cssClass} res-card__badge`}>
                    {iconMap[res.category]}
                    {meta.label}
                  </span>
                </div>
                <h2 className="res-card__title">{res.title}</h2>
                <p className="body-sm res-card__desc">{res.description}</p>
                <div className="res-card__footer">
                  {res.readTime && <span className="label res-card__time">{res.readTime}</span>}
                  <button className="res-card__link">
                    Read more <ChevronRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="body-sm" style={{ padding: '3rem 0', color: 'var(--text-muted)', textAlign: 'center' }}>
            No resources in this category yet — check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
