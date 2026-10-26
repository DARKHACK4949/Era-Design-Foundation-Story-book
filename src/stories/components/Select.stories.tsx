import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from '../../components/select/Select';

const VENDORS = [
  { value: 'northwind', label: 'Northwind Supply', hint: '4 invoices this quarter' },
  { value: 'calder', label: 'Calder Logistics', hint: '2 invoices this quarter' },
  { value: 'brightwell', label: 'Brightwell Print', hint: 'New vendor, first payment held' },
  { value: 'marrow', label: 'Marrow & Sons', hint: '11 invoices this quarter' },
  { value: 'pell', label: 'Pell Facilities', hint: 'On hold since 12 Oct', disabled: true },
];

const PLAIN = VENDORS.map(({ value, label, disabled }) => ({ value, label, disabled }));

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Vendor', options: PLAIN, placeholder: 'Choose a vendor' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A listbox on the same popup surface the Menu uses, so a dropdown looks identical wherever it opens from. The roles are deliberately not shared: a menu holds commands and uses role="menu", a select holds values with one always current and uses a combobox trigger over role="listbox".\n\nFocus stays on the trigger while the list is open and the active option is pointed at with aria-activedescendant, which is what the listbox pattern expects. Arrows move, Home and End jump, typing jumps to the next matching option, Enter picks, Escape closes.\n\nThe honest trade-off against a native select: we give up the iOS and Android wheel picker and carry type-ahead ourselves. What we get back is a control that looks the same in every browser and can hold a second line under an option, which native cannot render at all.',
      },
    },
  },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div style={{ maxWidth: 360, minHeight: 360 }}>{children}</div>
);

export const Playground: Story = { render: (a) => <Box><Select {...a} /></Box> };

export const WithHints: Story = {
  name: 'Options with a second line',
  parameters: { docs: { description: { story: 'The reason this is not a native select. An option can carry context, and for a vendor list that context is usually the thing people are actually choosing on.' } } },
  render: () => {
    const [v, setV] = useState('calder');
    return (
      <Box>
        <Select label="Vendor" options={VENDORS} value={v} onValueChange={setV} helperText="Only vendors with bank details on file are listed." />
      </Box>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-space-20)', maxWidth: 360, minHeight: 420 }}>
      <Select label="Empty" options={PLAIN} placeholder="Choose a vendor" />
      <Select label="Chosen" options={PLAIN} defaultValue="calder" />
      <Select label="Error" options={PLAIN} errorText="Pick a vendor to continue." />
      <Select label="Disabled" options={PLAIN} defaultValue="northwind" disabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-space-20)', maxWidth: 360, minHeight: 360 }}>
      <Select label="Small" size="sm" options={PLAIN} defaultValue="calder" />
      <Select label="Medium" size="md" options={PLAIN} defaultValue="calder" />
      <Select label="Large" size="lg" options={PLAIN} defaultValue="calder" />
    </div>
  ),
};
