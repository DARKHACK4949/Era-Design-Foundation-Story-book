import { useMemo, useState } from 'react';
import { REGISTRY, resolveProps, type Control } from './registry';
import './playground.css';

/** Values worth printing. An unset string or a false flag is noise in a
 *  snippet someone is about to paste. */
function printable(value: unknown) {
  if (value === undefined || value === null) return false;
  if (value === false) return false;
  if (value === '') return false;
  return true;
}

function snippetFor(slug: string, state: Record<string, unknown>) {
  const entry = REGISTRY[slug];
  const props: string[] = [];

  for (const [key, value] of Object.entries(state)) {
    if (!printable(value)) continue;
    if (slug === 'text-area' && key === 'maxLength') { props.push('maxLength={120}'); continue; }
    if (slug === 'progress' && key === 'indeterminate') continue;
    if (typeof value === 'boolean') props.push(key);
    else props.push(`${key}="${value}"`);
  }
  if (slug === 'progress' && !state.indeterminate) props.push('value={64}');
  for (const key of entry.raw ?? []) props.push(`${key}={${key}}`);

  const attrs = props.length ? ' ' + props.join(' ') : '';
  const open = `<${entry.tag}${attrs}`;
  // Wrap once the line stops being readable, the way a formatter would.
  const wrapped = open.length > 62 ? `<${entry.tag}\n  ${props.join('\n  ')}\n` : open;

  return entry.children
    ? `${wrapped}${open.length > 62 ? '>' : '>'}\n  ${entry.children}\n</${entry.tag}>`
    : `${wrapped} />`;
}

function Segmented({ control, value, onChange }: { control: Control & { kind: 'enum' }; value: string; onChange: (v: string) => void }) {
  return (
    <div className="pg__seg" role="group" aria-label={control.label}>
      {control.options.map((o) => (
        <button key={o} type="button" aria-pressed={o === value} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export default function Playground({ slug }: { slug: string }) {
  const entry = REGISTRY[slug];
  const [state, setState] = useState<Record<string, unknown>>(entry ? { ...entry.defaults } : {});
  const [copied, setCopied] = useState(false);

  const snippet = useMemo(() => (entry ? snippetFor(slug, state) : ''), [slug, state, entry]);
  if (!entry) return null;

  const { Component, fixed = {}, children, stageWidth } = entry;
  const set = (prop: string, value: unknown) => setState((s) => ({ ...s, [prop]: value }));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="pg">
      <div className="pg__stage">
        <div style={stageWidth ? { inlineSize: '100%', maxInlineSize: stageWidth } : undefined}>
          {/* Keyed on the state so uncontrolled props like defaultChecked
              actually re-apply when a control changes them. */}
          <Component key={JSON.stringify(state)} {...fixed} {...resolveProps(slug, state)}>
            {children}
          </Component>
        </div>
      </div>

      <div className="pg__controls">
        {entry.controls.map((c) => (
          <div className="pg__row" key={c.prop}>
            <label className="pg__label" htmlFor={`pg-${slug}-${c.prop}`}>{c.label}</label>
            {c.kind === 'enum' && <Segmented control={c} value={String(state[c.prop] ?? '')} onChange={(v) => set(c.prop, v)} />}
            {c.kind === 'bool' && (
              <input
                id={`pg-${slug}-${c.prop}`}
                className="pg__check"
                type="checkbox"
                checked={Boolean(state[c.prop])}
                onChange={(e) => set(c.prop, e.target.checked)}
              />
            )}
            {c.kind === 'text' && (
              <input
                id={`pg-${slug}-${c.prop}`}
                className="pg__text"
                type="text"
                value={String(state[c.prop] ?? '')}
                onChange={(e) => set(c.prop, e.target.value)}
              />
            )}
          </div>
        ))}
        <button type="button" className="pg__reset" onClick={() => setState({ ...entry.defaults })}>
          Reset
        </button>
      </div>

      <div className="pg__code">
        <pre><code>{snippet}</code></pre>
        <button type="button" className="pg__copy" onClick={copy} aria-live="polite">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
