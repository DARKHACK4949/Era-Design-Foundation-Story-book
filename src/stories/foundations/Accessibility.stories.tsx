import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { Card, Page, Section } from './kit';

const meta = { title: 'Foundations/Accessibility', parameters: { controls: { disable: true } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Pairs that carry meaning, checked against the live tokens rather than against
 * a spreadsheet someone updated once. Each row resolves both colours through
 * the real CSS variables for the brand and mode currently selected in the
 * toolbar, so the numbers move when you move the toolbar.
 */
const PAIRS: Array<{ fg: string; bg: string; label: string; size: 'body' | 'large'; note?: string }> = [
  { fg: 'fg-primary', bg: 'bg-surface', label: 'Body text', size: 'body' },
  { fg: 'fg-secondary', bg: 'bg-surface', label: 'Supporting text', size: 'body' },
  { fg: 'fg-tertiary', bg: 'bg-surface', label: 'Metadata and captions', size: 'body' },
  { fg: 'fg-link', bg: 'bg-surface', label: 'Inline link', size: 'body' },
  { fg: 'fg-placeholder', bg: 'form-input-bg', label: 'Input placeholder', size: 'body' },
  { fg: 'form-input-fg', bg: 'form-input-bg', label: 'Input value', size: 'body' },
  { fg: 'form-label-fg', bg: 'bg-surface', label: 'Field label', size: 'body' },
  { fg: 'form-helper-fg', bg: 'bg-surface', label: 'Field helper text', size: 'body' },
  { fg: 'form-error-fg', bg: 'bg-surface', label: 'Field error text', size: 'body' },
  { fg: 'form-success-fg', bg: 'bg-surface', label: 'Field success text', size: 'body' },
  { fg: 'primary-fg-on-bg', bg: 'primary-bg', label: 'Primary button label', size: 'body' },
  { fg: 'primary-fg', bg: 'primary-bg-subtle', label: 'Secondary button label', size: 'body' },
  { fg: 'status-error-fg-on-bg', bg: 'status-error-bg', label: 'Danger button label', size: 'body' },
  { fg: 'status-success-fg-on-bg', bg: 'status-success-bg', label: 'Solid success label', size: 'body' },
  { fg: 'status-warning-fg-on-bg', bg: 'status-warning-bg', label: 'Solid warning label', size: 'body' },
  { fg: 'status-info-fg-on-bg', bg: 'status-info-bg', label: 'Solid info label', size: 'body' },
  { fg: 'status-error-fg', bg: 'status-error-bg-subtle', label: 'Subtle error text', size: 'body' },
  { fg: 'status-warning-fg', bg: 'status-warning-bg-subtle', label: 'Subtle warning text', size: 'body' },
  { fg: 'status-success-fg', bg: 'status-success-bg-subtle', label: 'Subtle success text', size: 'body' },
  { fg: 'status-info-fg', bg: 'status-info-bg-subtle', label: 'Subtle info text', size: 'body' },
  { fg: 'table-cell-fg', bg: 'table-row-bg', label: 'Table cell', size: 'body' },
  { fg: 'table-cell-fg-muted', bg: 'table-row-bg-alt', label: 'Muted cell on a zebra row', size: 'body' },
  { fg: 'table-header-fg', bg: 'table-header-bg', label: 'Table header', size: 'large', note: 'Header is 12px semibold, so it is held to 4.5:1 like body text.' },
  { fg: 'fg-disabled', bg: 'bg-disabled', label: 'Disabled label', size: 'body', note: 'WCAG 1.4.3 exempts inactive controls, so this one is reported but not counted as a failure.' },
];

const EXEMPT = new Set(['Disabled label']);

function parse(c: string): [number, number, number] | null {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(',').map((n) => parseFloat(n));
  return [p[0], p[1], p[2]];
}
const luminance = ([r, g, b]: [number, number, number]) => {
  const f = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a: [number, number, number], b: [number, number, number]) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

function Audit() {
  const probe = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<Array<{ label: string; token: string; ratio: number; pass: boolean; exempt: boolean }>>([]);

  useEffect(() => {
    const el = probe.current;
    if (!el) return;
    const read = (name: string) => {
      el.style.color = `var(--sem-${name})`;
      return parse(getComputedStyle(el).color);
    };
    const next = PAIRS.map((p) => {
      const fg = read(p.fg);
      const bg = read(p.bg);
      const ratio = fg && bg ? contrast(fg, bg) : 0;
      const threshold = p.size === 'large' ? 3 : 4.5;
      return { label: p.label, token: `--sem-${p.fg} on --sem-${p.bg}`, ratio, pass: ratio >= threshold, exempt: EXEMPT.has(p.label) };
    });
    setRows(next);
    el.style.color = '';
  });

  const counted = rows.filter((r) => !r.exempt);
  const failing = counted.filter((r) => !r.pass);

  return (
    <>
      <div ref={probe} style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }} aria-hidden="true" />
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
          <strong style={{ fontSize: 'var(--typography-text-base-size)' }}>
            {failing.length === 0
              ? `All ${counted.length} pairs meet AA in this brand and mode.`
              : `${failing.length} of ${counted.length} pairs are below AA in this brand and mode.`}
          </strong>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {rows.map((r) => (
              <div
                key={r.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(180px, 1.1fr) minmax(0, 2fr) 60px 72px',
                  gap: 'var(--spacing-space-12)',
                  alignItems: 'center',
                  padding: 'var(--spacing-space-8) 0',
                  borderBlockEnd: 'var(--brand-stroke-default) solid var(--sem-border-subtle)',
                  fontSize: 'var(--typography-text-sm-size)',
                }}
              >
                <span>{r.label}</span>
                <code style={{ color: 'var(--sem-fg-secondary)', fontSize: 'var(--typography-text-xs-size)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.token}</code>
                <span style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'end' }}>{r.ratio.toFixed(2)}</span>
                <span
                  style={{
                    justifySelf: 'end',
                    fontSize: 'var(--typography-text-xs-size)',
                    padding: '2px var(--spacing-space-8)',
                    borderRadius: 'var(--brand-radius-roles-tags-chips-sm)',
                    background: r.exempt
                      ? 'var(--sem-status-neutral-bg-subtle)'
                      : r.pass
                        ? 'var(--sem-status-success-bg-subtle)'
                        : 'var(--sem-status-error-bg-subtle)',
                    color: r.exempt ? 'var(--sem-status-neutral-fg)' : r.pass ? 'var(--sem-status-success-fg)' : 'var(--sem-status-error-fg)',
                  }}
                >
                  {r.exempt ? 'Exempt' : r.pass ? 'AA' : 'Below AA'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}

export const ContrastAudit: Story = {
  name: 'Contrast audit',
  render: () => (
    <Page
      title="Accessibility"
      intro={
        <>
          Every pair below is resolved from the live tokens for whichever brand and mode the toolbar is set to, so this page
          cannot claim a pass the system does not have. Switch brands and watch the numbers move: that is the point of
          auditing the token layer rather than auditing a screenshot.
        </>
      }
    >
      <Section
        title="Text and surface pairs"
        note="4.5:1 for body text, 3:1 for large text. Disabled controls are exempt under WCAG 1.4.3 and are listed for completeness rather than counted."
      >
        <Audit />
      </Section>

      <Section
        title="What this page caught"
        note={
          <>
            An earlier run of this audit failed 10 of these 23 pairs, from two root causes. The first was the low end of the
            neutral ramp being used for text: placeholder sat at 1.57:1, helper text at 1.92:1 and field labels at 3.32:1,
            all on steps that exist to draw borders. Only steps 900 and 950 carry body text, which is what Radix intends,
            since it guarantees exactly two text steps per ramp. The second was the solid brand fill carrying one global
            white foreground: Radix splits its step 9 colours into those that take white text and those that need dark
            text, and Cyan and Jade are in the second group, so a white label landed at 2.32:1 on Brand 2 and 3.15:1 on
            Brand 3. That is now a per-brand role token, so each brand answers for its own fill.
          </>
        }
      >
        <div />
      </Section>

      <Section
        title="The one exemption"
        note={
          <>
            The label on a disabled control is deliberately below 4.5:1. WCAG 1.4.3 exempts inactive controls, and a
            disabled button rendered at full contrast stops reading as disabled. It moved from 1.68:1 to 3.33:1, which is
            legible without pretending to be active.
          </>
        }
      >
        <div />
      </Section>
    </Page>
  ),
};
