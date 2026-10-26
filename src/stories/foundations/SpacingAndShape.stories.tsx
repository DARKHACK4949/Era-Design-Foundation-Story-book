import type { Meta, StoryObj } from '@storybook/react';
import { Card, Mono, Page, Section } from './kit';

const meta = { title: 'Foundations/Spacing & shape', parameters: { controls: { disable: true } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const SPACE = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128] as const;
const RADIUS_SCALE = ['none', 'xs-2', 'sm-4', 'md-8', 'lg-12', 'xl-16', '2xl-24', '3xl-32', 'radius-full'] as const;
const RADIUS_ROLES = [
  ['buttons-button-md', 'Button'],
  ['input-field-md', 'Input'],
  ['tags-chips-md', 'Chip'],
  ['card-md', 'Card'],
  ['surface-popover', 'Popover'],
  ['surface-modal', 'Modal'],
  ['nav-item-expanded', 'Nav item'],
] as const;

export const Spacing: Story = {
  render: () => (
    <Page
      title="Spacing"
      intro={
        <>
          A 4px and 8px grid, with 2px kept as one deliberate exception. 2px exists because some gaps genuinely are smaller
          than 4px, a dot next to a label for instance, and pretending otherwise just pushes people into hardcoding a value.
          Everything else is a multiple of 4.
        </>
      }
    >
      <Section title="The scale">
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
            {SPACE.map((n) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-12)' }}>
                <span style={{ inlineSize: 120, flex: 'none' }}>
                  <Mono>{`space-${n}`}</Mono>
                </span>
                <span
                  style={{
                    inlineSize: `var(--spacing-space-${n})`,
                    blockSize: 'var(--spacing-space-16)',
                    background: 'var(--sem-primary-bg)',
                    borderRadius: 'var(--brand-radius-scale-xs-2)',
                  }}
                />
                <span style={{ fontSize: 'var(--typography-text-xs-size)', color: 'var(--sem-fg-tertiary)' }}>{n}px</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </Page>
  ),
};

export const Shape: Story = {
  render: () => (
    <Page
      title="Radius and stroke"
      intro={
        <>
          Radius is where the three brands diverge most. Rather than let components pick from the scale, each component kind
          has a role token, so a brand can decide that buttons are pill-shaped and cards are square without a single
          component being edited.
        </>
      }
    >
      <Section title="Scale" note="The raw steps. Components do not read these directly.">
        <Card>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-16)' }}>
            {RADIUS_SCALE.map((r) => (
              <div key={r} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-4)', alignItems: 'center' }}>
                <div
                  style={{
                    inlineSize: 'var(--spacing-space-64)',
                    blockSize: 'var(--spacing-space-64)',
                    background: 'var(--sem-primary-bg-subtle)',
                    border: 'var(--brand-stroke-default) solid var(--sem-primary-border)',
                    borderRadius: `var(--brand-radius-scale-${r})`,
                  }}
                />
                <Mono>{r}</Mono>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Roles" note="What components actually read. Switch brands and these change shape; the scale above is what they are choosing from.">
        <Card>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-space-16)' }}>
            {RADIUS_ROLES.map(([role, label]) => (
              <div key={role} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-4)', alignItems: 'center' }}>
                <div
                  style={{
                    inlineSize: 'var(--spacing-space-80)',
                    blockSize: 'var(--spacing-space-64)',
                    background: 'var(--sem-bg-surface-sunken)',
                    border: 'var(--brand-stroke-default) solid var(--sem-border-default)',
                    borderRadius: `var(--brand-radius-roles-${role})`,
                  }}
                />
                <span style={{ fontSize: 'var(--typography-text-xs-size)' }}>{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Stroke" note="Four weights. Focus is its own token so the ring can be thickened for accessibility without touching borders.">
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
            {(['thin', 'default', 'thick', 'focus'] as const).map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-12)' }}>
                <span style={{ inlineSize: 100, flex: 'none' }}>
                  <Mono>{`stroke-${s}`}</Mono>
                </span>
                <span style={{ flex: 1, borderBlockStart: `var(--brand-stroke-${s}) solid var(--sem-border-strong)` }} />
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </Page>
  ),
};
