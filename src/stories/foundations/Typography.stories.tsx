import type { Meta, StoryObj } from '@storybook/react';
import { Card, Mono, Page, Section } from './kit';

const meta = { title: 'Foundations/Typography', parameters: { controls: { disable: true } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const STEPS = [
  ['9xl', 128, 128],
  ['8xl', 96, 96],
  ['7xl', 72, 72],
  ['6xl', 60, 60],
  ['5xl', 48, 48],
  ['4xl', 36, 40],
  ['3xl', 30, 36],
  ['2xl', 24, 32],
  ['xl', 20, 28],
  ['lg', 18, 28],
  ['base', 16, 24],
  ['sm', 14, 20],
  ['xs', 12, 16],
] as const;

export const Scale: Story = {
  render: () => (
    <Page
      title="Typography"
      intro={
        <>
          One scale, thirteen steps, nothing below 12px. The floor is deliberate: 12px is already the smallest size that
          stays legible for a label or a count, and anything under it ends up being read by nobody. Each step pairs a size
          with a line height that lands on the 4px grid.
        </>
      }
    >
      <Section
        title="Typeface comes from the brand"
        note="The family and the four weights are brand tokens. Switch the Brand control and this whole page is reset in another typeface without a single size changing."
      >
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
            <div style={{ fontSize: 'var(--typography-text-2xl-size)', lineHeight: 'var(--typography-text-2xl-line-height)', fontWeight: 'var(--brand-typography-theme-font-weight-display)' }}>
              Display weight
            </div>
            <div style={{ fontSize: 'var(--typography-text-xl-size)', lineHeight: 'var(--typography-text-xl-line-height)', fontWeight: 'var(--brand-typography-theme-font-weight-heading)' }}>
              Heading weight
            </div>
            <div style={{ fontSize: 'var(--typography-text-sm-size)', fontWeight: 'var(--brand-typography-theme-font-weight-label)' }}>Label weight</div>
            <div style={{ fontSize: 'var(--typography-text-base-size)', fontWeight: 'var(--brand-typography-theme-font-weight-body)' }}>
              Body weight, which is what most of an interface is actually made of.
            </div>
          </div>
        </Card>
      </Section>

      <Section title="The scale">
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
            {STEPS.map(([name, size, lh]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-space-16)', borderBlockEnd: 'var(--brand-stroke-default) solid var(--sem-border-subtle)', paddingBlockEnd: 'var(--spacing-space-12)' }}>
                <span style={{ inlineSize: 140, flex: 'none', display: 'flex', flexDirection: 'column' }}>
                  <Mono>{`text-${name}`}</Mono>
                  <span style={{ fontSize: 'var(--typography-text-xs-size)', color: 'var(--sem-fg-tertiary)' }}>
                    {size} / {lh}
                  </span>
                </span>
                <span
                  style={{
                    fontSize: `var(--typography-text-${name}-size)`,
                    lineHeight: `var(--typography-text-${name}-line-height)`,
                    letterSpacing: size >= 30 ? 'var(--brand-tracking-display)' : 'var(--brand-tracking-others)',
                    fontWeight: size >= 20 ? 'var(--brand-typography-theme-font-weight-heading)' : 'var(--brand-typography-theme-font-weight-body)',
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Payment released to vendor
                </span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section
        title="Tracking"
        note="Large type gets tightened by 1px and everything else sits at zero. Two tokens is enough: tracking is a correction for size, not a style choice to make per component."
      >
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)' }}>
            <div style={{ fontSize: 'var(--typography-text-4xl-size)', lineHeight: 'var(--typography-text-4xl-line-height)', letterSpacing: 'var(--brand-tracking-display)', fontWeight: 'var(--brand-typography-theme-font-weight-display)' }}>
              Display, tightened
            </div>
            <div style={{ fontSize: 'var(--typography-text-base-size)', letterSpacing: 'var(--brand-tracking-others)' }}>Body, left alone</div>
          </div>
        </Card>
      </Section>
    </Page>
  ),
};
