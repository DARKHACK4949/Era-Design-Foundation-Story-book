import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../../components/empty/EmptyState';
import { Button } from '../../components/button/Button';
import { Card } from '../../components/card/Card';

const meta = {
  title: 'Components/Empty state',
  component: EmptyState,
  args: { title: 'No invoices match these filters' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'There are three reasons a list is empty and they need different words. Nothing has been created yet, a filter matched nothing, or something broke. Showing "No results" for all three is how people get stuck: the first needs the action that creates the first item, the second needs a way out of the filter, the third needs a retry.',
      },
    },
  },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeReasons: Story = {
  name: 'Three reasons',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-space-16)', maxWidth: 520 }}>
      <Card flush>
        <EmptyState
          reason="first-run"
          title="No invoices yet"
          description="Once your accounting tool is connected, invoices land here for a decision before anything is paid."
          actions={<Button size="sm">Connect accounting</Button>}
        />
      </Card>
      <Card flush>
        <EmptyState
          reason="no-results"
          title="No invoices match these filters"
          description="You are looking at held payments over $10,000 from the last 7 days."
          actions={<Button size="sm" intent="outline">Clear filters</Button>}
        />
      </Card>
      <Card flush>
        <EmptyState
          reason="error"
          title="Could not load the queue"
          description="The connection to your accounting tool timed out. Nothing was paid or changed."
          actions={<Button size="sm" intent="outline">Try again</Button>}
        />
      </Card>
    </div>
  ),
};
