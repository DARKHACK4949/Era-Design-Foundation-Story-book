import React from 'react';

/** Shared bits for the foundation pages. Everything renders live from the
 *  generated CSS variables, so these pages cannot drift from the tokens. */

export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export function Page({ title, intro, children }: { title: string; intro: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 1040, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-32)' }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
        <h1 style={{ fontSize: 'var(--typography-text-3xl-size)', lineHeight: 'var(--typography-text-3xl-line-height)' }}>{title}</h1>
        <div style={{ color: 'var(--sem-fg-secondary)', maxWidth: '62ch' }}>{intro}</div>
      </header>
      {children}
    </div>
  );
}

export function Section({ title, note, children }: { title: string; note?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
      <h2 style={{ fontSize: 'var(--typography-text-lg-size)', lineHeight: 'var(--typography-text-lg-line-height)' }}>{title}</h2>
      {note && <p style={{ color: 'var(--sem-fg-secondary)', maxWidth: '62ch' }}>{note}</p>}
      {children}
    </section>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--sem-bg-surface)',
        border: 'var(--brand-stroke-default) solid var(--sem-border-subtle)',
        borderRadius: 'var(--brand-radius-roles-card-md)',
        padding: 'var(--spacing-space-16)',
      }}
    >
      {children}
    </div>
  );
}

export function Mono({ children }: { children: React.ReactNode }) {
  return <code style={{ color: 'var(--sem-fg-tertiary)', fontSize: 'var(--typography-text-xs-size)' }}>{children}</code>;
}

/** One colour ramp, 50 through 950, labelled with the step and its role. */
export function Ramp({ name, varPrefix }: { name: string; varPrefix: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-4)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-space-8)' }}>
        <strong style={{ fontSize: 'var(--typography-text-sm-size)' }}>{name}</strong>
        <Mono>{`${varPrefix}-{step}`}</Mono>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`, gap: 'var(--spacing-space-2)' }}>
        {STEPS.map((step) => (
          <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-4)' }}>
            <div
              style={{
                blockSize: 'var(--spacing-space-48)',
                background: `var(${varPrefix}-${step})`,
                borderRadius: 'var(--brand-radius-scale-sm-4)',
                border: 'var(--brand-stroke-default) solid var(--sem-border-subtle)',
              }}
            />
            <span style={{ fontSize: 'var(--typography-text-xs-size)', color: 'var(--sem-fg-tertiary)', textAlign: 'center' }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A semantic token: the resolved colour next to the name you actually write. */
export function TokenRow({ token, label }: { token: string; label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-12)', minWidth: 0 }}>
      <span
        style={{
          inlineSize: 'var(--spacing-space-32)',
          blockSize: 'var(--spacing-space-32)',
          flex: 'none',
          background: `var(--sem-${token})`,
          borderRadius: 'var(--brand-radius-scale-sm-4)',
          border: 'var(--brand-stroke-default) solid var(--sem-border-subtle)',
        }}
      />
      <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Mono>{`--sem-${token}`}</Mono>
        {label && <span style={{ fontSize: 'var(--typography-text-xs-size)', color: 'var(--sem-fg-secondary)' }}>{label}</span>}
      </span>
    </div>
  );
}
