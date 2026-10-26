import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../../components/tabs/Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Follows the WAI-ARIA tabs pattern. Arrow keys move between tabs, Home and End jump to the ends, and only the selected tab is in the tab order, so Tab takes you out of the strip and into the panel rather than through every tab in it.',
      },
    },
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

const body = (text: string) => <p style={{ color: 'var(--sem-fg-secondary)', maxWidth: '60ch' }}>{text}</p>;

export const Default: Story = {
  args: { label: 'Payment queue', tabs: [] },
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Tabs
        label="Payment queue"
        tabs={[
          { id: 'queue', label: 'Needs a decision', count: 12, content: body('Twelve invoices are waiting. Four are over the auto-release ceiling and two look like duplicates.') },
          { id: 'held', label: 'Held', count: 3, content: body('Held payments stay here until someone clears the reason they were held.') },
          { id: 'released', label: 'Released', content: body('Everything released in the last 30 days, newest first.') },
          { id: 'archive', label: 'Archive', disabled: true, content: body('Archived.') },
        ]}
      />
    </div>
  ),
};
