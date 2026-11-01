import { useState } from 'react';
import { FileText, Users } from 'lucide-react';
import DocumentCard from '../components/DocumentCard';
import { documents, uploadedDate, type DocCategory } from '../data/documents';
import { leadershipPositions, getInitials } from '../data/leadership';
import './Simulation.css';

type FilterOption = 'all' | DocCategory;

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: 'all',     label: 'All documents' },
  { value: 'agenda',  label: 'Agendas' },
  { value: 'ordinances', label: 'Ordinances' },
];

export default function Simulation() {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [activeTab, setActiveTab] = useState<'bulletin' | 'leadership'>('bulletin');

  const filtered = filter === 'all'
    ? documents
    : documents.filter((d) => d.category === filter);

  const sorted = [...filtered].sort(
    (a, b) => uploadedDate(b.uploadedAt).getTime() - uploadedDate(a.uploadedAt).getTime()
  );

  const roster = [...leadershipPositions].sort((a, b) => a.order - b.order);

  return (
    <>

      <main className="sc-sim">
        <div className="sc-sim__inner">
          <div className="sc-sim__intro">
            <p>Council Bulletin Board</p>
            <p>
              Sim-Civics began as a city council simulation club at Harvard-Westlake. That simulation is
              still ongoing! This page documents all the documents and agendas for the simulation session. 
              All materials are published as soon as they become available.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="sc-sim__tabs" role="tablist" aria-label="Simulation sections">
            <button
              role="tab"
              aria-selected={activeTab === 'bulletin'}
              className={`sc-sim__tab ${activeTab === 'bulletin' ? 'sc-sim__tab--active' : ''}`}
              onClick={() => setActiveTab('bulletin')}
            >
              <FileText size={18} aria-hidden="true" />
              Bulletin Board
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'leadership'}
              className={`sc-sim__tab ${activeTab === 'leadership' ? 'sc-sim__tab--active' : ''}`}
              onClick={() => setActiveTab('leadership')}
            >
              <Users size={18} aria-hidden="true" />
              Leadership Roster
            </button>
          </div>

          {/* ── BULLETIN BOARD ── */}
          {activeTab === 'bulletin' && (
            <section aria-label="Council bulletin board" className="sc-sim__section">
              <h2 className="sc-sim__heading">Published Documents</h2>
              <p className="sc-sim__sub">
                {sorted.length} document{sorted.length !== 1 ? 's' : ''} · last updated{' '}
                {new Date(Math.max(...documents.map((d) => uploadedDate(d.uploadedAt).getTime())))
                  .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              {/* Filter pills */}
              <div className="sc-sim__filters" role="group" aria-label="Filter documents by type">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilter(opt.value)}
                    aria-pressed={filter === opt.value}
                    className={`sc-sim__pill ${filter === opt.value ? 'sc-sim__pill--active' : ''}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="sc-sim__doc-list">
                {sorted.length > 0
                  ? sorted.map((doc) => <DocumentCard key={doc.id} doc={doc} />)
                  : <p className="sc-sim__empty">No documents in this category yet.</p>}
              </div>
            </section>
          )}

          {/* ── LEADERSHIP ROSTER ── */}
          {activeTab === 'leadership' && (
            <section aria-label="Leadership roster" className="sc-sim__section">
              <h2 className="sc-sim__heading">Simulation Leadership</h2>
              <p className="sc-sim__sub">
                Assigned roles for the current session. Seats shown as vacant are available for assignment.
              </p>

              <div className="sc-sim__leader-grid">
                {roster.map((pos, i) => (
                  <article
                    key={pos.id}
                    className={`sc-leader ${i % 2 ? 'sc-leader--alt' : ''} ${!pos.assignee ? 'sc-leader--vacant' : ''}`}
                  >
                    <div className="sc-leader__avatar" aria-hidden="true">
                      {getInitials(pos)}
                    </div>
                    <div className="sc-leader__body">
                      <p className="sc-leader__role">{pos.title}</p>
                      <p className="sc-leader__name">
                        {pos.assignee ?? <em>Seat Vacant</em>}
                      </p>
                      <p className="sc-leader__subtitle">{pos.subtitle}</p>
                      <p className="sc-leader__desc">{pos.description}</p>
                      {pos.committee && (
                        <span className="badge badge--guide sc-leader__badge">{pos.committee}</span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
