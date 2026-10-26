import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../../components/progress/Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: { value: 64, label: 'Importing invoices' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Determinate when the work has a known end, indeterminate when it does not. Showing a made-up percentage for an unknown wait is worse than showing none, because people time themselves against it. The indeterminate variant leaves aria-valuenow off entirely, and that absence is what tells assistive tech the end is unknown.',
      },
    },
  },
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (a) => <div style={{ maxWidth: 420 }}><Progress {...a} /></div> };

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-space-24)', maxWidth: 420 }}>
      <Progress value={24} label="Importing invoices" />
      <Progress value={100} tone="success" label="Import finished" />
      <Progress value={41} tone="error" label="Import stopped" />
      <Progress value={64} label="Thin track" size="sm" />
      <Progress label="Checking the vendor register" />
    </div>
  ),
};
