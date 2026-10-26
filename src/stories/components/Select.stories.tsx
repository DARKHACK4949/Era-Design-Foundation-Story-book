import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../../components/select/Select';

const OPTIONS = [
  { value: 'northwind', label: 'Northwind Supply' },
  { value: 'calder', label: 'Calder Logistics' },
  { value: 'brightwell', label: 'Brightwell Print' },
  { value: 'marrow', label: 'Marrow & Sons' },
  { value: 'pell', label: 'Pell Facilities (on hold)', disabled: true },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Vendor', options: OPTIONS, placeholder: 'Choose a vendor' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A native select wearing ERA chrome. Native is a deliberate choice: it brings keyboard handling, type-ahead, the mobile picker and screen reader support for free, and none of those are worth rebuilding for a list of options. A custom listbox only earns its keep when options need icons, descriptions or grouping, and that is a different component.',
      },
    },
  },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (a) => <div style={{ maxWidth: 360 }}><Select {...a} /></div> };

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-space-20)', maxWidth: 360 }}>
      <Select label="Empty" options={OPTIONS} placeholder="Choose a vendor" />
      <Select label="Chosen" options={OPTIONS} defaultValue="calder" />
      <Select label="With help" options={OPTIONS} placeholder="Choose a vendor" helperText="Only vendors with bank details on file are listed." />
      <Select label="Error" options={OPTIONS} placeholder="Choose a vendor" errorText="Pick a vendor to continue." />
      <Select label="Disabled" options={OPTIONS} placeholder="Choose a vendor" disabled />
      <Select label="Small" size="sm" options={OPTIONS} defaultValue="pell" />
      <Select label="Large" size="lg" options={OPTIONS} defaultValue="northwind" />
    </div>
  ),
};
