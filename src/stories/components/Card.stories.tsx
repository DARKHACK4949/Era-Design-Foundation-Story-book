import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Card } from '../../components/card/Card';
import { Badge } from '../../components/badge/Badge';
import { Button } from '../../components/button/Button';
import { AvatarGroup } from '../../components/avatar/Avatar';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A container, not a decoration. Three elevations: flat for a card among its own kind, raised for something that needs to come forward, outlined for a card on an already-busy surface where another shadow would just add noise. An interactive card renders a real button or link, never a div with a click handler, so it is reachable by keyboard and announced as something you can activate.',
      },
    },
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--spacing-space-16)', maxWidth: 840 }}>{children}</div>
);

export const Elevations: Story = {
  render: () => (
    <Grid>
      <Card elevation="flat" title="Flat" subtitle="Among its own kind">
        Sits in a grid of identical cards where a shadow on each would read as noise.
      </Card>
      <Card elevation="outlined" title="Outlined" subtitle="The default">
        An edge instead of a shadow. Works on a busy surface and in dark mode without tuning.
      </Card>
      <Card elevation="raised" title="Raised" subtitle="Comes forward">
        For the one card that should be read before the others around it.
      </Card>
    </Grid>
  ),
};

export const Selectable: Story = {
  parameters: { docs: { description: { story: 'Selection is announced through aria-pressed, not just drawn with a border.' } } },
  render: () => {
    const [picked, setPicked] = useState('calder');
    const vendors = [
      { id: 'northwind', name: 'Northwind Supply', note: '4 invoices this quarter' },
      { id: 'calder', name: 'Calder Logistics', note: '2 invoices this quarter' },
    ];
    return (
      <Grid>
        {vendors.map((v) => (
          <Card
            key={v.id}
            title={v.name}
            subtitle={v.note}
            selected={picked === v.id}
            onActivate={() => setPicked(v.id)}
            aside={picked === v.id ? <Badge tone="primary" fill="subtle">Selected</Badge> : undefined}
          >
            Bank details last changed in March. No holds in the last 90 days.
          </Card>
        ))}
      </Grid>
    );
  },
};

export const WithActions: Story = {
  name: 'With actions',
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card
        elevation="raised"
        title="INV-2304"
        subtitle="Marrow & Sons, due 27 Oct"
        aside={<Badge tone="warning" fill="subtle" dot>Held</Badge>}
        actions={
          <>
            <Button size="sm" intent="ghost">Compare</Button>
            <Button size="sm">Release</Button>
          </>
        }
      >
        <p style={{ marginBlockEnd: 'var(--spacing-space-12)' }}>$12,750.00. Over the auto-release ceiling, so it is waiting on a second approval.</p>
        <AvatarGroup size="sm" people={[{ name: 'Priya Nair' }, { name: 'Tom Alcott' }, { name: 'Rhea Dsouza' }]} />
      </Card>
    </div>
  ),
};
