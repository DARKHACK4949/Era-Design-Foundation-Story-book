import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Ramp, Section, TokenRow } from './kit';

const meta = {
  title: 'Foundations/Colour',
  parameters: { controls: { disable: true } },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const GRID = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--spacing-space-12)' } as const;

export const Ramps: Story = {
  name: 'Ramps',
  render: () => (
    <Page
      title="Colour"
      intro={
        <>
          Every ramp runs 50 to 950 and every step has a job. 50 to 200 are backgrounds, 400 and 500 are borders, 700 is the
          solid fill, 900 and 950 are text. That mapping is the same in all three brands and in both modes, which is why a
          component can ask for a border without knowing which brand it is in.
        </>
      }
    >
      <Section
        title="Brand ramp"
        note="This one changes per brand. Switch the Brand control in the toolbar and watch it move from Iris to Cyan to Jade. Nothing else on this page changes."
      >
        <Card>
          <Ramp name="Primary" varPrefix="--brand-primary-scale" />
        </Card>
      </Section>

      <Section title="Support ramps" note="Shared across brands. A warning should not change meaning because you switched product.">
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-20)' }}>
            <Ramp name="Neutral" varPrefix="--brand-neutral" />
            <Ramp name="Success" varPrefix="--brand-success" />
            <Ramp name="Danger" varPrefix="--brand-danger" />
            <Ramp name="Warning" varPrefix="--brand-warning" />
            <Ramp name="Info" varPrefix="--brand-info" />
          </div>
        </Card>
      </Section>
    </Page>
  ),
};

export const Semantics: Story = {
  name: 'Semantic tokens',
  render: () => (
    <Page
      title="Semantic colour"
      intro={
        <>
          These are the only colour tokens a component is allowed to read. The name says what the colour is for, not what it
          looks like, so <code>--sem-status-error-bg</code> can be a dark red on light and a lighter red on dark without a
          single component knowing.
        </>
      }
    >
      <Section title="Surfaces">
        <Card>
          <div style={GRID}>
            <TokenRow token="bg-canvas" label="The page behind everything" />
            <TokenRow token="bg-surface" label="Cards, panels, table rows" />
            <TokenRow token="bg-surface-sunken" label="Wells and inset areas" />
            <TokenRow token="bg-surface-overlay" label="Menus, popovers, modals" />
            <TokenRow token="bg-inverse" label="Tooltips and inverted bars" />
            <TokenRow token="bg-disabled" label="Any control that is off limits" />
          </div>
        </Card>
      </Section>

      <Section title="Text">
        <Card>
          <div style={GRID}>
            <TokenRow token="fg-primary" label="Body and headings" />
            <TokenRow token="fg-secondary" label="Supporting copy" />
            <TokenRow token="fg-tertiary" label="Metadata and captions" />
            <TokenRow token="fg-placeholder" label="Empty field hint" />
            <TokenRow token="fg-disabled" label="Unavailable label" />
            <TokenRow token="fg-link" label="Inline link" />
          </div>
        </Card>
      </Section>

      <Section title="Borders" note="Three weights, so a divider inside a card never competes with the card's own edge.">
        <Card>
          <div style={GRID}>
            <TokenRow token="border-subtle" label="Dividers inside a container" />
            <TokenRow token="border-default" label="Input and card edges" />
            <TokenRow token="border-strong" label="Hover and emphasis" />
            <TokenRow token="border-focus" label="Focused field" />
          </div>
        </Card>
      </Section>

      <Section
        title="Status"
        note="Each status carries a solid fill, a subtle fill, a border and an icon colour. The subtle pair is what you use in lists, where a page of solid fills would be unreadable."
      >
        <Card>
          <div style={GRID}>
            <TokenRow token="status-success-bg" label="Solid success" />
            <TokenRow token="status-success-bg-subtle" label="Subtle success" />
            <TokenRow token="status-warning-bg" label="Solid warning" />
            <TokenRow token="status-warning-bg-subtle" label="Subtle warning" />
            <TokenRow token="status-error-bg" label="Solid error" />
            <TokenRow token="status-error-bg-subtle" label="Subtle error" />
            <TokenRow token="status-info-bg" label="Solid info" />
            <TokenRow token="status-info-bg-subtle" label="Subtle info" />
          </div>
        </Card>
      </Section>

      <Section
        title="Interaction"
        note="Hover and pressed are alpha overlays rather than fixed colours, so they work on top of any surface, including a status fill, without a token per combination."
      >
        <Card>
          <div style={GRID}>
            <TokenRow token="state-hover" label="Overlay on hover" />
            <TokenRow token="state-pressed" label="Overlay while held" />
            <TokenRow token="state-selected" label="Selected row or item" />
            <TokenRow token="state-focus-ring" label="Keyboard focus ring" />
          </div>
        </Card>
      </Section>
    </Page>
  ),
};
