import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Map, Play, ClipboardCheck, PenLine,
  ChevronRight, ChevronDown, PlayCircle,
} from 'lucide-react';
import SimCivicsTop from '../components/SimCivicsTop';
import SimCivicsBottom from '../components/SimCivicsBottom';
import { modules, categoryMeta, type ResourceCategory } from '../data/resources';
import './Resources.css';

// ─── Icon map ────────────────────────────────────────────────────
const iconMap: Record<ResourceCategory, JSX.Element> = {
  explainer: <BookOpen  size={14} aria-hidden="true" />,
  guide:     <Map       size={14} aria-hidden="true" />,
  video:     <Play      size={14} aria-hidden="true" />,
  quiz:      <ClipboardCheck size={14} aria-hidden="true" />,
  activity:  <PenLine   size={14} aria-hidden="true" />,
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
    <>
      {/* ── Top band (page title lives here, as on the other redesigned pages) ── */}
      <SimCivicsTop title="Civic Education Curriculum" active="resources" />

      <main className="sc-res">
        {/* ── Intro ── */}
        <div className="sc-res__intro">
          <p className="sc-res__eyebrow">Educational Resources</p>
          <p className="sc-res__sub">
            A structured curriculum for understanding Los Angeles city government —
            from how the Council works to how you can shape local policy.
          </p>
          <div className="sc-res__chips">
            <span className="sc-tag sc-tag--blue">{modules.length} modules</span>
            <span className="sc-tag sc-tag--green">{totalItems} resources</span>
            <span className="sc-tag sc-tag--red">Self-paced</span>
          </div>
        </div>

        {/* ── Layout ── */}
        <div className="sc-res__layout">

          {/* Sidebar */}
          <aside className="sc-res__sidebar" aria-label="Module navigation">
            <p className="sc-res__sidebar-heading">Curriculum</p>
            <nav>
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  className={`sc-res__nav-item ${activeModule === mod.id ? 'sc-res__nav-item--active' : ''}`}
                  onClick={() => jumpTo(mod.id)}
                  style={{ '--mod-color': mod.color } as React.CSSProperties}
                >
                  <span className="sc-res__nav-num" aria-hidden="true">
                    {String(mod.number).padStart(2, '0')}
                  </span>
                  <span className="sc-res__nav-info">
                    <span className="sc-res__nav-title">{mod.title}</span>
                    <span className="sc-res__nav-count">{itemCount(mod.items.length)}</span>
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Module list */}
          <div className="sc-res__modules">
            {modules.map((mod) => {
              const isOpen = openModules.has(mod.id);
              return (
                <section
                  key={mod.id}
                  id={mod.id}
                  className="sc-module"
                  aria-labelledby={`${mod.id}-heading`}
                  style={{ '--mod-color': mod.color } as React.CSSProperties}
                >
                  {/* Module header — click to collapse */}
                  <button
                    className="sc-module__header"
                    onClick={() => toggleModule(mod.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${mod.id}-body`}
                  >
                    <span className="sc-module__header-left">
                      <span className="sc-module__eyebrow">
                        Module {mod.number}
                      </span>
                      <h2 className="sc-module__title" id={`${mod.id}-heading`}>
                        {mod.title}
                      </h2>
                      <span className="sc-module__subtitle">{mod.subtitle}</span>
                    </span>
                    <span className="sc-module__header-right">
                      <span className="sc-module__count">{itemCount(mod.items.length)}</span>
                      <ChevronDown
                        size={22}
                        className={`sc-module__chevron ${isOpen ? 'sc-module__chevron--open' : ''}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  {/* Start button — sits just below the header, outside the accordion toggle */}
                  <div className="sc-module__start-row">
                    <Link
                      to={`/resources/${mod.id}`}
                      className="sc-btn-blue"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PlayCircle size={16} aria-hidden="true" />
                      Start module
                    </Link>
                  </div>

                  {/* Module body */}
                  {isOpen && (
                    <div className="sc-module__body" id={`${mod.id}-body`}>
                      <p className="sc-module__desc">{mod.description}</p>

                      <ol className="sc-item-list" aria-label={`Items in ${mod.title}`}>
                        {mod.items.map((item, idx) => {
                          const meta = categoryMeta[item.category];
                          return (
                            <li key={item.id} className="sc-item">
                              <div className="sc-item__index" aria-hidden="true">
                                {String(idx + 1).padStart(2, '0')}
                              </div>
                              <div className="sc-item__body">
                                <div className="sc-item__meta">
                                  <span className="sc-tag sc-tag--blue sc-tag--sm">
                                    {iconMap[item.category]}
                                    {meta.label}
                                  </span>
                                  {item.isNew && (
                                    <span className="sc-tag sc-tag--red sc-tag--sm">New</span>
                                  )}
                                  {item.readTime && (
                                    <span className="sc-item__time">{item.readTime}</span>
                                  )}
                                </div>
                                <h3 className="sc-item__title">{item.title}</h3>
                                <p className="sc-item__desc">{item.description}</p>
                              </div>
                              {/* Items without an href show no button */}
                              {item.href && (
                                <a
                                  href={item.href}
                                  className="sc-btn-blue sc-item__cta"
                                  aria-label={`Open: ${item.title}`}
                                >
                                  <span>Open</span>
                                  <ChevronRight size={14} aria-hidden="true" />
                                </a>
                              )}
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

      <SimCivicsBottom />
    </>
  );
}
