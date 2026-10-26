import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../../components/tooltip/Tooltip';
import { Button } from '../../components/button/Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: { label: 'Flag for review', children: <span /> },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A tooltip names a control. It never holds anything you need to finish a task, because it is unreachable by touch and gone the moment the pointer moves. It opens on focus as well as hover, and uses aria-describedby so the control keeps its own name and the tooltip is read as extra detail.',
      },
    },
  },
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

const Icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2.5 9.9 6.3l4.1.6-3 2.9.7 4.2L8 12l-3.7 2 .7-4.2-3-2.9 4.1-.6L8 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-space-24)', paddingBlock: 'var(--spacing-space-40)' }}>
      <Tooltip label="Flag for review">
        <Button intent="ghost" leadingIcon={Icon} aria-label="Flag for review" />
      </Tooltip>
      <Tooltip label="Opens below instead" placement="bottom">
        <Button intent="outline">Bottom</Button>
      </Tooltip>
    </div>
  ),
};
