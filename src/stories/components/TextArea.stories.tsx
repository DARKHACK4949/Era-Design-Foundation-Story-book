import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '../../components/textarea/TextArea';

const meta = {
  title: 'Components/Text area',
  component: TextArea,
  args: { label: 'Note for the approver', placeholder: 'What should they know before releasing this?' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shares its chrome with Input so the two never drift apart. The counter stays quiet until the last tenth of the budget, and only starts being announced once it is actually over, because reading a number out on every keystroke is unusable.',
      },
    },
  },
} satisfies Meta<typeof TextArea>;
export default meta;
export const Playground: StoryObj<typeof meta> = { render: (a) => <div style={{ maxWidth: 440 }}><TextArea {...a} /></div> };

export const States: StoryObj<typeof meta> = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-space-20)', maxWidth: 440 }}>
      <TextArea label="Default" placeholder="Add a note" />
      <TextArea label="With a counter" maxLength={120} defaultValue="Vendor confirmed the amount by email on 24 Oct." helperText="Visible to anyone who opens this payment." />
      <TextArea label="Near the limit" maxLength={60} defaultValue="Vendor confirmed the amount by email on 24 October, ref 88" />
      <TextArea label="Over the limit" maxLength={40} defaultValue="Vendor confirmed the amount by email on 24 October." />
      <TextArea label="Error" errorText="A note is required when holding a payment." />
      <TextArea label="Read only" readOnly defaultValue="Held automatically: possible duplicate of INV-2301." />
      <TextArea label="Disabled" disabled placeholder="Add a note" />
    </div>
  ),
};
