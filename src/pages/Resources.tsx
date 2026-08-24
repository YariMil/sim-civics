import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Map, Play, ClipboardCheck, PenLine,
  ChevronRight, ChevronDown, Lock, PlayCircle,
} from 'lucide-react';
import { modules, categoryMeta, type ResourceCategory } from '../data/resources';
import './Resources.css';

// ─── Icon map ────────────────────────────────────────────────────
const iconMap: Record<ResourceCategory, JSX.Element> = {
  explainer: <BookOpen  size={13} aria-hidden="true" />,
  guide:     <Map       size={13} aria-hidden="true" />,
  video:     <Play      size={13} aria-hidden="true" />,
  quiz:      <ClipboardCheck size={13} aria-hidden="true" />,
  activity:  <PenLine   size={13} aria-hidden="true" />,
};

// ─── Total item count helper ─────────────────────────────────────
function itemCount(n: number): string {
  return `${n} ${n === 1 ? 'item' : 'items'}`;
}

export default function Resources() {
  // Which module accordion panels are open (all open by default)
  const [openModules, setOpenModules] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.id))
  );
  // Which module is highlighted in the sidebar
  const [activeModule, setActiveModule] = useState<string>(modules[0].id);

  function toggleModule(id: string) {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function jumpTo(id: string) {
    setActiveModule(id);
    // Ensure the target module is open
    setOpenModules((prev) => new Set([...prev, id]));
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const totalItems = modules.reduce((sum, m) => sum + m.items.length, 0);

  return (
    <main>
      {/* ── Hero ── */}
      <div className="res-hero">
        <div className="container res-hero__inner">
          <p className="eyebrow">Educational Resources</p>
          <h1 className="display-sm res-hero__title">Civic Education Curriculum</h1>
          <p className="body-lg res-hero__sub">
            A structured curriculum for understanding Los Angeles city government —
            from how the Council works to how you can shape local policy.
          </p>
          <div className="res-meta-row">
            <span className="res-meta-chip">{modules.length} modules</span>
            <span className="res-meta-chip">{totalItems} resources</span>
            <span className="res-meta-chip">Self-paced</span>
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="container res-layout">

        {/* Sidebar */}
        <aside className="res-sidebar" aria-label="Module navigation">
          <p className="res-sidebar__heading">Curriculum</p>
          <nav>
            {modules.map((mod) => (
              <button
                key={mod.id}
                className={`res-sidebar__item ${activeModule === mod.id ? 'res-sidebar__item--active' : ''}`}
                onClick={() => jumpTo(mod.id)}
                style={{ '--mod-color': mod.color } as React.CSSProperties}
              >
                <span className="res-sidebar__num" aria-hidden="true">
                  {String(mod.number).padStart(2, '0')}
                </span>
                <span className="res-sidebar__info">
                  <span className="res-sidebar__title">{mod.title}</span>
                  <span className="res-sidebar__count">{itemCount(mod.items.length)}</span>
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Module list */}
        <div className="res-modules">
          {modules.map((mod) => {
            const isOpen = openModules.has(mod.id);
            return (
              <section
                key={mod.id}
                id={mod.id}
                className="res-module"
                aria-labelledby={`${mod.id}-heading`}
                style={{ '--mod-color': mod.color } as React.CSSProperties}
              >
                {/* Module header — click to collapse */}
                <button
                  className="res-module__header"
                  onClick={() => toggleModule(mod.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${mod.id}-body`}
                >
                  <div className="res-module__header-left">
                    <span className="res-module__eyebrow">
                      Module {mod.number}
                    </span>
                    <h2 className="res-module__title" id={`${mod.id}-heading`}>
                      {mod.title}
                    </h2>
                    <p className="res-module__subtitle">{mod.subtitle}</p>
                  </div>
                  <div className="res-module__header-right">
                    <span className="res-module__count">{itemCount(mod.items.length)}</span>
                    <ChevronDown
                      size={18}
                      className={`res-module__chevron ${isOpen ? 'res-module__chevron--open' : ''}`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Start button — sits just below the header, outside the accordion toggle */}
                <div className="res-module__start-row">
                  <Link
                    to={`/resources/${mod.id}`}
                    className="res-module__start-btn"
                    style={{ '--mod-color': mod.color } as React.CSSProperties}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PlayCircle size={15} aria-hidden="true" />
                    Start module
                  </Link>
                </div>

                {/* Module body */}
                {isOpen && (
                  <div className="res-module__body" id={`${mod.id}-body`}>
                    <p className="res-module__desc body-sm">{mod.description}</p>

                    <ol className="res-item-list" aria-label={`Items in ${mod.title}`}>
                      {mod.items.map((item, idx) => {
                        const meta = categoryMeta[item.category];
                        return (
                          <li key={item.id} className="res-item">
                            <div className="res-item__index" aria-hidden="true">
                              {String(idx + 1).padStart(2, '0')}
                            </div>
                            <div className="res-item__body">
                              <div className="res-item__meta">
                                <span className={`badge ${meta.cssClass} res-item__badge`}>
                                  {iconMap[item.category]}
                                  {meta.label}
                                </span>
                                {item.isNew && (
                                  <span className="res-item__new">New</span>
                                )}
                                {item.readTime && (
                                  <span className="res-item__time">{item.readTime}</span>
                                )}
                              </div>
                              <h3 className="res-item__title">{item.title}</h3>
                              <p className="res-item__desc body-sm">{item.description}</p>
                            </div>
                            <button
                              className="res-item__cta"
                              aria-label={`Open: ${item.title}`}
                            >
                              {item.href
                                ? <><span>Open</span><ChevronRight size={14} aria-hidden="true" /></>
                                : <><span>Coming soon</span><Lock size={13} aria-hidden="true" /></>
                              }
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                )}
              </section>
            );
          })}
        </div>

      </div>
    </main>
  );
}
