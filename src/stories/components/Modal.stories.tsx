import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '../../components/modal/Modal';
import { Button } from '../../components/button/Button';
import { TextArea } from '../../components/textarea/TextArea';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: { open: false, onClose: () => {}, title: 'Release payment?' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Built on the native dialog element, which brings focus trapping, Escape to close, inertness of the page behind it and the top layer for free. Those four are what hand-rolled modals usually get wrong, so the native element is worth more here than any amount of custom code. Only the body scrolls, so the title and the actions stay reachable however long the content runs.',
      },
    },
  },
} satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Confirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Release payment</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Release $4,280.00 to Northwind Supply?"
          description="This sends the payment straight away. It cannot be recalled once it clears."
          actions={
            <>
              <Button intent="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Release payment</Button>
            </>
          }
        >
          <p>Invoice INV-2301, due 24 Oct. Approved by Priya Nair this morning.</p>
        </Modal>
      </>
    );
  },
};

export const Destructive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A destructive modal says so before you read a word of it, and the backdrop does not dismiss, so a stray click outside cannot be the thing that loses your place in a decision like this.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button intent="danger" onClick={() => setOpen(true)}>Reject invoice</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          tone="danger"
          size="sm"
          dismissOnBackdrop={false}
          title="Reject INV-2305?"
          description="Pell Facilities will be notified and the invoice leaves the queue."
          actions={
            <>
              <Button intent="ghost" onClick={() => setOpen(false)}>Keep it</Button>
              <Button intent="danger" onClick={() => setOpen(false)}>Reject</Button>
            </>
          }
        />
      </>
    );
  },
};

export const WithForm: Story = {
  name: 'With a form',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button intent="outline" onClick={() => setOpen(true)}>Hold with a reason</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Hold this payment"
          description="The vendor is not told. Anyone with release rights can see the note."
          dismissOnBackdrop={false}
          actions={
            <>
              <Button intent="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Hold payment</Button>
            </>
          }
        >
          <TextArea label="Why is it being held?" maxLength={200} placeholder="Possible duplicate of INV-2301" />
        </Modal>
      </>
    );
  },
};
