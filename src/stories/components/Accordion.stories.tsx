import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../components/accordion/Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Built on details and summary, which gives keyboard operation and the open state for free. The reason it is worth using the native elements: browsers can search inside a closed details element and open it, so in-page find still works. A div-based accordion hides its content from find entirely.',
      },
    },
  },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS = [
  { id: 'ceiling', label: 'What is the auto-release ceiling?', content: 'Any invoice under it is paid without anyone looking. Anything over it waits for a person. Most teams start at $500 and move it once they trust the queue.', defaultOpen: true },
  { id: 'dupes', label: 'How are duplicates detected?', content: 'Same vendor, same amount, and a date within 14 days of an invoice already paid. It flags rather than blocks, because legitimate repeats do happen.' },
  { id: 'holds', label: 'Who can clear a hold?', content: 'Anyone with release rights, except the person who placed the hold. That rule is not configurable.' },
];

export const Default: Story = { args: { items: ITEMS } };

export const Exclusive: Story = {
  parameters: { docs: { description: { story: 'Opening one closes the others, done with the native name attribute rather than state. Leave it off when people need to compare two sections side by side.' } } },
  args: { items: ITEMS.map((i) => ({ ...i, defaultOpen: false })), exclusive: true },
};
