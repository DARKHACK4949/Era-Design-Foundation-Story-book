import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../components/switch/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: 'Auto-release under $500', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A switch applies the moment it moves, which is what separates it from a checkbox. If the change needs a save button, it is a checkbox.',
      },
    },
  },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', alignItems: 'flex-start' }}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Off and disabled" disabled />
      <Switch label="On and disabled" defaultChecked disabled />
      <Switch label="Small" size="sm" defaultChecked />
    </div>
  ),
};
