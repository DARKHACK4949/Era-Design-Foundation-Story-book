import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from '../../components/alert/Alert';
import { Button } from '../../components/button/Button';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: { tone: 'info', title: 'Two invoices are waiting on a second approval.' },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'info', 'success', 'warning', 'error'] } },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An inline message about the thing on screen. Each tone has its own icon shape as well as its own colour, so the meaning survives for someone who cannot tell the fills apart. Errors get role="alert" and interrupt; everything else uses role="status" and waits for a pause.',
      },
    },
  },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)', maxWidth: 560 }}>{children}</div>
);

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <Stack>
      <Alert tone="neutral" title="This vendor was added 3 days ago." description="New vendors are held for a manual check on their first payment." />
      <Alert tone="info" title="Two invoices are waiting on a second approval." description="They stay in the queue until someone with release rights signs off." />
      <Alert tone="success" title="Payment released to Northwind Supply." description="$4,280.00 sent on 24 Oct. It will clear in one to two working days." />
      <Alert tone="warning" title="This invoice is a near-duplicate." description="INV-2301 from the same vendor was paid on 11 Oct for the same amount." />
      <Alert tone="error" title="Release failed: the account is missing a sort code." description="Add the bank details to the vendor record and try again." />
    </Stack>
  ),
};

export const WithActions: Story = {
  name: 'With actions',
  render: () => (
    <Stack>
      <Alert
        tone="warning"
        title="This invoice is a near-duplicate."
        description="INV-2301 from the same vendor was paid on 11 Oct for the same amount."
        actions={
          <>
            <Button size="sm" intent="outline">Compare invoices</Button>
            <Button size="sm" intent="ghost">Release anyway</Button>
          </>
        }
      />
    </Stack>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <Stack>
        {open ? (
          <Alert tone="info" title="Nothing needs you right now." description="The queue is clear." onDismiss={() => setOpen(false)} />
        ) : (
          <Button size="sm" intent="outline" onClick={() => setOpen(true)}>
            Bring it back
          </Button>
        )}
      </Stack>
    );
  },
};
