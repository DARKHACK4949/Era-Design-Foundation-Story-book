import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Skeleton, SkeletonGroup } from '../../components/skeleton/Skeleton';
import { Button } from '../../components/button/Button';
import { Card } from '../../components/card/Card';
import { Avatar } from '../../components/avatar/Avatar';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A placeholder shaped like the thing that is loading. Each box is hidden from assistive tech and the region around them is marked busy instead, because reading out a row of grey rectangles helps nobody. The shimmer stops under prefers-reduced-motion.',
      },
    },
  },
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-space-16)', maxWidth: 360 }}>
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton variant="rect" height={96} />
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </div>
  ),
};

export const LoadingACard: Story = {
  name: 'Loading a card',
  parameters: {
    docs: {
      description: {
        story: 'The placeholder matches the real layout closely enough that nothing jumps when the content lands.',
      },
    },
  },
  render: () => {
    const [loading, setLoading] = useState(true);
    return (
      <div style={{ display: 'grid', gap: 'var(--spacing-space-12)', maxWidth: 360 }}>
        <Button size="sm" intent="outline" onClick={() => setLoading((l) => !l)}>
          {loading ? 'Show the content' : 'Show the skeleton'}
        </Button>
        <SkeletonGroup label="Loading vendor" loading={loading}>
          {loading ? (
            <Card>
              <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', alignItems: 'center', marginBlockEnd: 'var(--spacing-space-12)' }}>
                <Skeleton variant="circle" width={40} height={40} />
                <div style={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </Card>
          ) : (
            <Card>
              <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', alignItems: 'center', marginBlockEnd: 'var(--spacing-space-12)' }}>
                <Avatar name="Northwind Supply" size="lg" />
                <div>
                  <div style={{ fontWeight: 'var(--brand-typography-theme-font-weight-label)', color: 'var(--sem-fg-primary)' }}>Northwind Supply</div>
                  <div style={{ fontSize: 'var(--typography-text-xs-size)', color: 'var(--sem-fg-tertiary)' }}>Vendor since Mar 2024</div>
                </div>
              </div>
              <p>Four invoices this quarter, all paid on time. Bank details last changed in March.</p>
            </Card>
          )}
        </SkeletonGroup>
      </div>
    );
  },
};
