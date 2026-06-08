import { useState } from 'react';
import { FileText, Users } from 'lucide-react';
import DocumentCard from '../components/DocumentCard';
import { documents, type DocCategory } from '../data/documents';
import { leadershipPositions, getInitials } from '../data/leadership';
import './Simulation.css';

type FilterOption = 'all' | DocCategory;

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: 'all',     label: 'All documents' },
  { value: 'agenda',  label: 'Agendas' },
  { value: 'minutes', label: 'Minutes' },
  { value: 'motion',  label: 'Motions' },
  { value: 'report',  label: 'Reports' },
  { value: 'notice',  label: 'Notices' },
];

const AVATAR_COLORS = ['#E8EDF5','#F5EDE1','#E4EFF0','#F0E8F2','#EDF3E4','#F2EBE1','#E5EBF5','#F5E5E5','#E5F5EF'];

export default function Simulation() {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [activeTab, setActiveTab] = useState<'bulletin' | 'leadership'>('bulletin');

  const filtered = filter === 'all'
    ? documents
    : documents.filter((d) => d.category === filter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

  return (
    <main>
      <div className="sim-hero">
        <div className="container sim-hero__inner">
          <p className="eyebrow">City Council Simulation</p>
          <h1 className="display-sm sim-hero__title">Council Bulletin Board</h1>
          <p className="body-lg sim-hero__sub">
            Official documents, agendas, and notices for the current simulation session. 
            All materials are published here as they become available.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Tab switcher */}
        <div className="sim-tabs" role="tablist" aria-label="Simulation sections">
          <button
            role="tab"
            aria-selected={activeTab === 'bulletin'}
            className={`sim-tab ${activeTab === 'bulletin' ? 'sim-tab--active' : ''}`}
            onClick={() => setActiveTab('bulletin')}
          >
            <FileText size={15} aria-hidden="true" />
            Bulletin Board
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'leadership'}
            className={`sim-tab ${activeTab === 'leadership' ? 'sim-tab--active' : ''}`}
            onClick={() => setActiveTab('leadership')}
          >
            <Users size={15} aria-hidden="true" />
            Leadership Roster
          </button>
        </div>

        {/* ── BULLETIN BOARD ── */}
        {activeTab === 'bulletin' && (
          <section aria-label="Council bulletin board" className="sim-section">
            <div className="sim-bulletin-header">
              <div>
                <h2 className="heading">Published Documents</h2>
                <p className="label" style={{ marginTop: '3px' }}>
                  {sorted.length} document{sorted.length !== 1 ? 's' : ''} · last updated {
                    new Date(Math.max(...documents.map(d => new Date(d.uploadedAt).getTime())))
                      .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  }
                </p>
              </div>
            </div>

            {/* Filter pills */}
            <div className="sim-filters" role="group" aria-label="Filter documents by type">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={`sim-filter-pill ${filter === opt.value ? 'sim-filter-pill--active' : ''}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="sim-doc-list">
              {sorted.length > 0
                ? sorted.map((doc) => <DocumentCard key={doc.id} doc={doc} />)
                : <p className="body-sm" style={{ padding: '2rem 0', color: 'var(--text-muted)' }}>No documents in this category yet.</p>
              }
            </div>

            <div className="sim-upload-note">
              <p className="label">
                Documents are published by the Sim-Civics host. Drop your PDF files into{' '}
                <code>public/documents/</code> and update{' '}
                <code>src/data/documents.ts</code> to add them to the board.
              </p>
            </div>
          </section>
        )}

        {/* ── LEADERSHIP ROSTER ── */}
        {activeTab === 'leadership' && (
          <section aria-label="Leadership roster" className="sim-section">
            <div className="sim-bulletin-header">
              <div>
                <h2 className="heading">Simulation Leadership</h2>
                <p className="label" style={{ marginTop: '3px' }}>
                  Assigned roles for the current session. Seats shown as vacant are available for assignment.
                </p>
              </div>
            </div>

            <div className="sim-leadership-grid">
              {leadershipPositions
                .sort((a, b) => a.order - b.order)
                .map((pos, i) => {
                  const initials = getInitials(pos);
                  const avatarBg = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  return (
                    <article key={pos.id} className={`leader-card ${!pos.assignee ? 'leader-card--vacant' : ''}`}>
                      <div
                        className="leader-card__avatar"
                        style={{ background: avatarBg }}
                        aria-hidden="true"
                      >
                        {initials}
                      </div>
                      <div className="leader-card__body">
                        <p className="leader-card__role">{pos.title}</p>
                        <p className="leader-card__name">
                          {pos.assignee ?? <em>Seat Vacant</em>}
                        </p>
                        <p className="leader-card__subtitle">{pos.subtitle}</p>
                        <p className="leader-card__desc">{pos.description}</p>
                        {pos.committee && (
                          <span className="badge badge--guide" style={{ marginTop: '0.5rem' }}>
                            {pos.committee}
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
