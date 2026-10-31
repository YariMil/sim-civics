import { TAG_GROUPS, TAGS, MAX_TAGS, type Tag } from '../../data/ideaTags';

// Figma "Tag" (blue pill) and "Subtag" (red rounded rectangle), selected = filled.

type Kind = 'tag' | 'subtag';

export function Chip({ kind, label }: { kind: Kind; label: string }) {
  return <span className={`sc-chip sc-chip--${kind} sc-chip--on`}>{label}</span>;
}

export function ChipList({ kind, labels }: { kind: Kind; labels: string[] }) {
  return (
    <ul className='sc-chips'>
      {labels.map((l) => (
        <li key={l}><Chip kind={kind} label={l} /></li>
      ))}
    </ul>
  );
}

function ToggleChip({
  kind,
  label,
  on,
  disabled,
  onClick,
}: {
  kind: Kind;
  label: string;
  on: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type='button'
      aria-pressed={on}
      disabled={disabled}
      className={`sc-chip sc-chip--${kind}${on ? ' sc-chip--on' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/**
 * General tags (up to MAX_TAGS), then the subtags of the chosen tags (pick at most one).
 * Unchoosing a tag also clears its subtag.
 */
export function TagPicker({
  tags,
  subtag,
  onChange,
}: {
  tags: string[];
  subtag: string | null;
  onChange: (next: { tags: string[]; subtag: string | null }) => void;
}) {
  const chosen = TAGS.filter((t) => tags.includes(t));
  const full = chosen.length >= MAX_TAGS;

  function toggleTag(tag: Tag) {
    if (!chosen.includes(tag)) return onChange({ tags: [...chosen, tag], subtag });
    const next = chosen.filter((t) => t !== tag);
    const keep = subtag !== null && next.some((t) => (TAG_GROUPS[t] as readonly string[]).includes(subtag));
    onChange({ tags: next, subtag: keep ? subtag : null });
  }

  return (
    <div className='sc-tag-picker'>
      <fieldset className='sc-picker'>
        <legend>Tags (choose up to {MAX_TAGS})</legend>
        <div className='sc-chips'>
          {TAGS.map((tag) => {
            const on = chosen.includes(tag);
            return (
              <ToggleChip
                key={tag}
                kind='tag'
                label={tag}
                on={on}
                disabled={full && !on}
                onClick={() => toggleTag(tag)}
              />
            );
          })}
        </div>
      </fieldset>

      {chosen.length > 0 && (
        <fieldset className='sc-picker'>
          <legend>Subtag (optional, choose one)</legend>
          {chosen.map((tag) => (
            <div key={tag} className='sc-picker__group'>
              <p className='sc-picker__group-name'>{tag}</p>
              <div className='sc-chips'>
                {TAG_GROUPS[tag].map((name) => {
                  const on = subtag === name;
                  return (
                    <ToggleChip
                      key={name}
                      kind='subtag'
                      label={name}
                      on={on}
                      onClick={() => onChange({ tags: chosen, subtag: on ? null : name })}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </fieldset>
      )}
    </div>
  );
}
