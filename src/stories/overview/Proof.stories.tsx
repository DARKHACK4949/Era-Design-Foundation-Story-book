import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { Badge } from '../../components/badge/Badge';
import { Switch } from '../../components/switch/Switch';
import { Alert } from '../../components/alert/Alert';

const meta = {
  title: 'Getting started/One system, three brands',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'The same markup, three times. Each column is pinned to a brand with a single data-brand attribute, and each row to a mode with data-theme. No component is aware of either. If a brand needed its own component variant, the token layering would have failed.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const BRANDS = [
  ['brand-1', 'Brand 1', 'IBM Plex Sans · Iris'],
  ['brand-2', 'Brand 2', 'Geist · Cyan'],
  ['brand-3', 'Brand 3', 'Source Sans 3 · Jade'],
] as const;

/** The panel itself. Not one brand-aware line in it. */
function Panel() {
  return (
    <div
      style={{
        background: 'var(--sem-bg-surface)',
        border: 'var(--brand-stroke-default) solid var(--sem-border-subtle)',
        borderRadius: 'var(--brand-radius-roles-card-md)',
        padding: 'var(--spacing-space-16)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-space-16)',
        fontFamily: 'var(--brand-typography-theme-font-family-font)',
        color: 'var(--sem-fg-primary)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-space-8)' }}>
        <strong style={{ fontSize: 'var(--typography-text-base-size)', fontWeight: 'var(--brand-typography-theme-font-weight-heading)' }}>
          Release rules
        </strong>
        <Badge tone="success" fill="subtle" dot>
          Active
        </Badge>
      </div>

      <Input label="Auto-release ceiling" defaultValue="500.00" leadingAdornment={<span>$</span>} helperText="Anything above this waits for a person." />

      <Switch label="Hold first payment to a new vendor" defaultChecked />

      <Alert tone="warning" title="Three invoices are over the ceiling." />

      <div style={{ display: 'flex', gap: 'var(--spacing-space-8)' }}>
        <Button size="sm">Save rules</Button>
        <Button size="sm" intent="ghost">
          Cancel
        </Button>
      </div>
    </div>
  );
}

function Column({ brand, name, note, theme }: { brand: string; name: string; note: string; theme: 'light' | 'dark' }) {
  return (
    <div data-brand={brand} data-theme={theme} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)', minWidth: 0, color: 'var(--sem-fg-primary)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 'var(--typography-text-sm-size)', fontWeight: 'var(--brand-typography-theme-font-weight-label)' }}>{name}</span>
        <span style={{ fontSize: 'var(--typography-text-xs-size)', color: 'var(--sem-fg-tertiary)' }}>{note}</span>
      </div>
      <Panel />
    </div>
  );
}

function Band({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div
      data-theme={theme}
      style={{
        background: 'var(--sem-bg-canvas)',
        borderRadius: 'var(--brand-radius-roles-card-lg)',
        padding: 'var(--spacing-space-20)',
        color: 'var(--sem-fg-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-space-12)',
      }}
    >
      <span style={{ fontSize: 'var(--typography-text-xs-size)', color: 'var(--sem-fg-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--brand-tracking-others)' }}>
        {theme} mode
      </span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-space-16)', alignItems: 'start' }}>
        {BRANDS.map(([brand, name, note]) => (
          <Column key={brand} brand={brand} name={name} note={note} theme={theme} />
        ))}
      </div>
    </div>
  );
}

export const SideBySide: Story = {
  name: 'Side by side',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-24)', maxWidth: 1100 }}>
      <Band theme="light" />
      <Band theme="dark" />
    </div>
  ),
};
