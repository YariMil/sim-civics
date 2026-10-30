import { FileText, Download, Clock } from 'lucide-react';
import type { CouncilDocument } from '../data/documents';
import { categoryMeta } from '../data/documents';
import './DocumentCard.css';

interface Props {
  doc: CouncilDocument;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DocumentCard({ doc }: Props) {
  const meta = categoryMeta[doc.category];
  const isPending = !doc.file;

  const handleOpen = () => {
    if (doc.file) {
      window.open(`/documents/${doc.file}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article
      className={`doc-card ${isPending ? 'doc-card--pending' : ''}`}
      onClick={!isPending ? handleOpen : undefined}
      role={!isPending ? 'button' : undefined}
      tabIndex={!isPending ? 0 : undefined}
      onKeyDown={(e) => { if (!isPending && (e.key === 'Enter' || e.key === ' ')) handleOpen(); }}
      aria-label={`Open ${doc.title}`}
    >
      <div className="doc-card__icon" aria-hidden="true">
        <FileText size={18} />
      </div>

      <div className="doc-card__body">
        <div className="doc-card__meta">
          <span className={`badge ${meta.cssClass}`}>{meta.label}</span>
          <span className="doc-card__session">{doc.sessionLabel}</span>
        </div>
        <h3 className="doc-card__title">{doc.title}</h3>
        <p className="doc-card__desc">{doc.description}</p>
        <div className="doc-card__footer">
          <span className="doc-card__date">
            <Clock size={12} />
            {formatDate(doc.uploadedAt)}
          </span>
          {doc.fileSize && <span className="doc-card__size">{doc.fileSize}</span>}
        </div>
      </div>

      {!isPending && (
        <div className="doc-card__action" aria-hidden="true">
          <Download size={16} />
        </div>
      )}
      {isPending && <span className="doc-card__pending-label">Pending upload</span>}
    </article>
  );
}
