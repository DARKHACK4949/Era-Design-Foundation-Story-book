import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from '../../components/input/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Invoice number', placeholder: 'INV-0000', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The field, its label, its help text and its error are one component, because splitting them is how a label ends up unlinked from the input it describes. The label is always rendered; hideLabel keeps it in the accessibility tree when the layout genuinely cannot show it.',
      },
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'grid', gap: 'var(--spacing-space-20)', maxWidth: 360 }}>{children}</div>
);

export const Playground: Story = {};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Read-only is not styled like disabled on purpose. A disabled field is out of play; a read-only one still holds a value worth reading and copying, so it keeps its text contrast.',
      },
    },
  },
  render: () => (
    <Grid>
      <Input label="Default" placeholder="INV-0000" />
      <Input label="With help" placeholder="INV-0000" helperText="Found on the top right of the invoice." />
      <Input label="Required" placeholder="INV-0000" required />
      <Input label="Error" defaultValue="INV-23" errorText="No invoice matches this number." />
      <Input label="Success" defaultValue="INV-2301" successText="Matched to Northwind Supply." />
      <Input label="Read only" defaultValue="INV-2301" readOnly />
      <Input label="Disabled" placeholder="INV-0000" disabled />
    </Grid>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Grid>
      <Input label="Small" size="sm" placeholder="INV-0000" />
      <Input label="Medium" size="md" placeholder="INV-0000" />
      <Input label="Large" size="lg" placeholder="INV-0000" />
    </Grid>
  ),
};

export const WithAdornments: Story = {
  name: 'With adornments',
  render: () => (
    <Grid>
      <Input label="Amount" placeholder="0.00" leadingAdornment={<span>$</span>} />
      <Input label="Search vendors" placeholder="Northwind" leadingAdornment={
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      } />
    </Grid>
  ),
};
