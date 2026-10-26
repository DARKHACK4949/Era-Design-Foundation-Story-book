import type { Meta, StoryObj } from '@storybook/react';
import { ToastRegion, useToasts } from '../../components/toast/Toast';
import { Button } from '../../components/button/Button';

const meta = {
  title: 'Components/Toast',
  component: ToastRegion,
  args: { toasts: [], onDismiss: () => {} },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A short confirmation that something happened. Anything the person has to act on is not a toast, because a toast disappears and an action does not wait. The timer pauses on hover and on focus and keeps the time remaining rather than restarting it, so a toast cannot vanish mid-read and cannot be kept alive forever by hovering.',
      },
    },
  },
} satisfies Meta<typeof ToastRegion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { toasts, push, dismiss } = useToasts();
    return (
      <>
        <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={() => push({ tone: 'success', title: 'Payment released', description: '$4,280.00 to Northwind Supply.' })}>
            Success
          </Button>
          <Button size="sm" intent="outline" onClick={() => push({ tone: 'info', title: 'Queue refreshed', description: 'Two new invoices since you last looked.' })}>
            Info
          </Button>
          <Button size="sm" intent="outline" onClick={() => push({ tone: 'warning', title: 'Near-duplicate detected', description: 'INV-2304 looks like INV-2301.' })}>
            Warning
          </Button>
          <Button size="sm" intent="danger" onClick={() => push({ tone: 'error', title: 'Release failed', description: 'The vendor record is missing a sort code.', duration: 0 })}>
            Error, stays put
          </Button>
        </div>
        <ToastRegion toasts={toasts} onDismiss={dismiss} />
      </>
    );
  },
};
