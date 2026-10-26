import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../components/button/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Release payment', intent: 'primary', size: 'md' },
  argTypes: {
    intent: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'One button, five intents. Intent is chosen by where the action sits in the hierarchy, not by how it should look: one primary per view, secondary for the alternative, outline when it sits on a toolbar, ghost for anything repeated in a row, danger only for an action that destroys or spends something.',
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-12)', flexWrap: 'wrap' }}>{children}</div>
);
const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-20)' }}>{children}</div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 'var(--typography-text-xs-size)', color: 'var(--sem-fg-tertiary)' }}>{children}</span>
);

const ArrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Playground: Story = {};

export const Intents: Story = {
  render: () => (
    <Stack>
      {(['primary', 'secondary', 'outline', 'ghost', 'danger'] as const).map((intent) => (
        <div key={intent} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-4)' }}>
          <Label>{intent}</Label>
          <Row>
            <Button intent={intent}>Release payment</Button>
            <Button intent={intent} disabled>
              Disabled
            </Button>
            <Button intent={intent} loading>
              Releasing
            </Button>
          </Row>
        </div>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    docs: {
      description: {
        story:
          'Height, padding, type step and radius all move together. Changing only one of them is how a button stops looking like the same button at a different size.',
      },
    },
  },
  render: () => (
    <Row>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} size={size}>
          Size {size}
        </Button>
      ))}
    </Row>
  ),
};

export const WithIcons: Story = {
  name: 'With icons',
  render: () => (
    <Row>
      <Button leadingIcon={ArrowIcon}>Leading</Button>
      <Button intent="outline" trailingIcon={ArrowIcon}>
        Trailing
      </Button>
      <Button intent="ghost" leadingIcon={ArrowIcon} aria-label="Next" />
    </Row>
  ),
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The label stays in place while the spinner replaces the leading icon, so the button keeps its width and nothing next to it moves. aria-busy is set, so a screen reader hears the wait rather than hitting a control that has gone quiet.',
      },
    },
  },
  render: () => (
    <Row>
      <Button loading>Releasing payment</Button>
      <Button intent="outline" loading>
        Checking policy
      </Button>
    </Row>
  ),
};
