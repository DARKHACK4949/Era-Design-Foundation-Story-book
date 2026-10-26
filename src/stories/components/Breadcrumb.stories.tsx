import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../../components/breadcrumb/Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The separator is a CSS character rather than a text node, so a screen reader reads "Invoices, Northwind Supply" instead of "Invoices slash Northwind Supply". The last crumb is the current page and is not a link, because linking to where you already are is a dead end.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: [{ label: 'Payables', href: '#' }, { label: 'Invoices', href: '#' }, { label: 'INV-2301' }] },
};

export const Collapsed: Story = {
  parameters: { docs: { description: { story: 'Past the limit the middle collapses. The first and the last always stay, because those are the two people actually use.' } } },
  args: {
    maxItems: 4,
    items: [
      { label: 'Payables', href: '#' },
      { label: 'Vendors', href: '#' },
      { label: 'Northwind Supply', href: '#' },
      { label: 'Invoices', href: '#' },
      { label: 'INV-2301' },
    ],
  },
};
