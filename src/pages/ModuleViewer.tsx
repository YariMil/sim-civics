import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, CheckCircle, XCircle } from 'lucide-react';
import { modules } from '../data/resources';
import { getSlidesForModule, type Slide, type TextSlide, type QuizSlide } from '../data/slides';
import './ModuleViewer.css';

// ─── localStorage helpers ────────────────────────────────────────
function progressKey(moduleId: string) { return `simcivics-progress-${moduleId}`; }

function loadProgress(moduleId: string): number {
  try {
    const raw = localStorage.getItem(progressKey(moduleId));
    return raw ? parseInt(raw, 10) : 0;
  } catch { return 0; }
}

function saveProgress(moduleId: string, idx: number) {
  try { localStorage.setItem(progressKey(moduleId), String(idx)); } catch { /* no-op */ }
}

// ─── Sub-components ──────────────────────────────────────────────
function TextSlideView({ slide }: { slide: TextSlide }) {
  return (
    <div className="mv-slide-content mv-slide-content--text">
      <h2 className="mv-slide-heading">{slide.heading}</h2>
      <div className="mv-slide-body">
        {slide.body.map((para, i) => (
          <p key={i} className="mv-slide-para">{para}</p>
        ))}
        {slide.bullets && slide.bullets.length > 0 && (
          <ul className="mv-slide-bullets">
            {slide.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
      {slide.note && <p className="mv-slide-note">{slide.note}</p>}
    </div>
  );
}

function QuizSlideView({
  slide,
  onAnswer,
}: {
  slide: QuizSlide;
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  function choose(idx: number) {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx === slide.correct);
  }

  return (
    <div className="mv-slide-content mv-slide-content--quiz">
      <p className="mv-quiz-label">Quick check</p>
      <h2 className="mv-slide-heading">{slide.question}</h2>
      <div className="mv-quiz-choices">
        {slide.choices.map((choice, idx) => {
          let cls = 'mv-choice';
          if (answered) {
            if (idx === slide.correct) cls += ' mv-choice--correct';
            else if (idx === selected)  cls += ' mv-choice--wrong';
            else                        cls += ' mv-choice--dim';
          }
          return (
            <button key={idx} className={cls} onClick={() => choose(idx)} disabled={answered}>
              <span className="mv-choice__letter">{String.fromCharCode(65 + idx)}</span>
              <span className="mv-choice__text">{choice}</span>
              {answered && idx === slide.correct && <CheckCircle size={16} className="mv-choice__icon" />}
              {answered && idx === selected && idx !== slide.correct && <XCircle size={16} className="mv-choice__icon" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`mv-quiz-explanation ${selected === slide.correct ? 'mv-quiz-explanation--correct' : 'mv-quiz-explanation--wrong'}`}>
          <strong>{selected === slide.correct ? 'Correct! ' : 'Not quite. '}</strong>
          {slide.explanation}
        </div>
      )}
    </div>
  );
}

// ─── Main viewer ─────────────────────────────────────────────────
export default function ModuleViewer() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const mod = modules.find((m) => m.id === moduleId);
  const slides = moduleId ? getSlidesForModule(moduleId) : [];

  // Saved progress
  const [currentIdx, setCurrentIdx] = useState<number>(() =>
    moduleId ? loadProgress(moduleId) : 0
  );
  // Track which quiz slides have been answered (so Next is gated until answered)
  const [quizAnswered, setQuizAnswered] = useState(false);

  const isFirst = currentIdx === 0;
  const isLast  = currentIdx === slides.length - 1;
  const current: Slide | undefined = slides[currentIdx];
  const isQuiz  = current?.type === 'quiz';
  const canAdvance = !isQuiz || quizAnswered;

  // Save progress whenever index changes
  useEffect(() => {
    if (moduleId) saveProgress(moduleId, currentIdx);
  }, [moduleId, currentIdx]);

  // Reset quiz answered state when slide changes
  useEffect(() => { setQuizAnswered(false); }, [currentIdx]);

  // Keyboard navigation
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && canAdvance && !isLast) goNext();
    if (e.key === 'ArrowLeft' && !isFirst) goPrev();
    if (e.key === 'Escape') navigate('/resources');
  }, [canAdvance, isFirst, isLast]); // eslint-disable-line

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  function goNext() { if (!isLast) setCurrentIdx((i) => i + 1); }
  function goPrev() { if (!isFirst) setCurrentIdx((i) => i - 1); }

  function restart() {
    setCurrentIdx(0);
    if (moduleId) saveProgress(moduleId, 0);
  }

  // Find next module for completion screen
  const nextMod = mod ? modules.find((m) => m.number === mod.number + 1) : undefined;

  // ── Guard: module not found ──
  if (!mod || slides.length === 0) {
    return (
      <div className="mv-error">
        <p>Module not found.</p>
        <Link to="/resources" className="btn btn-primary">Back to Resources</Link>
      </div>
    );
  }

  // ── Completion screen (past last slide) ──
  if (currentIdx >= slides.length) {
    return (
      <div className="mv-shell" style={{ '--mod-color': mod.color } as React.CSSProperties}>
        <div className="mv-complete">
          <div className="mv-complete__icon" aria-hidden="true">✓</div>
          <p className="mv-complete__eyebrow">Module {mod.number} complete</p>
          <h1 className="mv-complete__title">{mod.title}</h1>
          <p className="mv-complete__sub">You've finished all {slides.length} slides in this module.</p>
          <div className="mv-complete__actions">
            {nextMod && (
              <Link
                to={`/resources/${nextMod.id}`}
                className="btn btn-primary"
                onClick={() => nextMod && saveProgress(nextMod.id, 0)}
              >
                Start Module {nextMod.number} <ChevronRight size={16} />
              </Link>
            )}
            <Link to="/resources" className="btn btn-secondary">Back to all modules</Link>
            <button className="btn btn-secondary" onClick={restart}>Restart this module</button>
          </div>
        </div>
      </div>
    );
  }

  const progressPct = Math.round(((currentIdx) / (slides.length - 1)) * 100);

  return (
    <div className="mv-shell" style={{ '--mod-color': mod.color } as React.CSSProperties}>

      {/* ── Top bar ── */}
      <header className="mv-topbar">
        <div className="mv-topbar__left">
          <Link to="/resources" className="mv-close" aria-label="Exit module">
            <X size={18} />
          </Link>
          <span className="mv-topbar__module">Module {mod.number} — {mod.title}</span>
        </div>
        <div className="mv-topbar__right">
          <span className="mv-topbar__count">{currentIdx + 1} / {slides.length}</span>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="mv-progress-track" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
        <div className="mv-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      {/* ── Slide stage ── */}
      <main className="mv-stage">
        <div className="mv-card" key={currentIdx}>
          {current.type === 'text' && <TextSlideView slide={current as TextSlide} />}
          {current.type === 'quiz' && (
            <QuizSlideView
              slide={current as QuizSlide}
              onAnswer={(correct) => { void correct; setQuizAnswered(true); }}
            />
          )}
        </div>
      </main>

      {/* ── Navigation ── */}
      <footer className="mv-nav">
        <button
          className="mv-nav__btn mv-nav__btn--prev"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} /> Back
        </button>

        {/* Dot indicators */}
        <div className="mv-dots" aria-hidden="true">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`mv-dot ${i === currentIdx ? 'mv-dot--active' : ''} ${i < currentIdx ? 'mv-dot--done' : ''}`}
            />
          ))}
        </div>

        {isLast ? (
          <button
            className="mv-nav__btn mv-nav__btn--finish"
            onClick={() => setCurrentIdx(slides.length)}
            disabled={!canAdvance}
            aria-label="Finish module"
          >
            Finish <CheckCircle size={16} />
          </button>
        ) : (
          <button
            className="mv-nav__btn mv-nav__btn--next"
            onClick={goNext}
            disabled={!canAdvance}
            aria-label={canAdvance ? 'Next slide' : 'Answer the question to continue'}
            title={!canAdvance ? 'Answer the question to continue' : undefined}
          >
            Next <ChevronRight size={18} />
          </button>
        )}
      </footer>

    </div>
  );
}
