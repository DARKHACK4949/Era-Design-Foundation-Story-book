import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../components/badge/Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Needs review', tone: 'warning', fill: 'subtle', size: 'md' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'primary', 'info', 'success', 'warning', 'error'] },
    fill: { control: 'inline-radio', options: ['solid', 'subtle', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A badge states a status in words and uses colour to help you find it faster. The label always carries the meaning, so the component stays readable for someone who cannot separate the red from the green.',
      },
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

const TONES = ['neutral', 'primary', 'info', 'success', 'warning', 'error'] as const;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
      {(['solid', 'subtle', 'outline'] as const).map((fill) => (
        <div key={fill} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-4)' }}>
          <span style={{ fontSize: 'var(--typography-text-xs-size)', color: 'var(--sem-fg-tertiary)' }}>{fill}</span>
          <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', flexWrap: 'wrap' }}>
            {TONES.map((tone) => (
              <Badge key={tone} tone={tone} fill={fill}>
                {tone}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  name: 'With dot',
  parameters: {
    docs: {
      description: {
        story: 'In a dense list, a page of filled badges reads as noise. The dot keeps the colour signal while the badge itself stays quiet.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', flexWrap: 'wrap' }}>
      <Badge tone="success" fill="outline" dot>Released</Badge>
      <Badge tone="warning" fill="outline" dot>Held</Badge>
      <Badge tone="error" fill="outline" dot>Rejected</Badge>
      <Badge tone="neutral" fill="outline" dot>Queued</Badge>
    </div>
  ),
};
