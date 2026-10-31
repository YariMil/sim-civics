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

// Multi-select group of toggle buttons.
export function ChipPicker({
  kind,
  legend,
  options,
  selected,
  onChange,
}: {
  kind: Kind;
  legend: string;
  options: readonly string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (name: string) =>
    onChange(selected.includes(name) ? selected.filter((s) => s !== name) : [...selected, name]);

  return (
    <fieldset className='sc-picker'>
      <legend>{legend}</legend>
      <div className='sc-chips'>
        {options.map((name) => {
          const on = selected.includes(name);
          return (
            <button
              key={name}
              type='button'
              aria-pressed={on}
              className={`sc-chip sc-chip--${kind}${on ? ' sc-chip--on' : ''}`}
              onClick={() => toggle(name)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
