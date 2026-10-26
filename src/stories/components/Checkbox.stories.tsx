import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '../../components/checkbox/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Hold payments over the ceiling' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A checkbox is a pending change: nothing happens until something else is submitted. If the change takes effect the moment it moves, it is a Switch. The hit area is the whole row, not the 16px box.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

const Col = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)', alignItems: 'flex-start' }}>{children}</div>
);

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <Col>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="With a hint" hint="Anything above $500 waits for a person." />
      <Checkbox label="Invalid" invalid />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled and checked" disabled defaultChecked />
    </Col>
  ),
};

export const SelectAll: Story = {
  name: 'Select all',
  parameters: {
    docs: {
      description: {
        story:
          'The classic reason indeterminate exists. The parent is neither on nor off while the children disagree, and clicking it resolves everything one way.',
      },
    },
  },
  render: () => {
    const [picked, setPicked] = useState<string[]>(['INV-2302']);
    const rows = ['INV-2301', 'INV-2302', 'INV-2303'];
    const all = picked.length === rows.length;
    const some = picked.length > 0 && !all;

    return (
      <Col>
        <Checkbox
          label={`Select all (${picked.length} of ${rows.length})`}
          checked={all}
          indeterminate={some}
          onChange={() => setPicked(all ? [] : rows)}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-8)', paddingInlineStart: 'var(--spacing-space-24)' }}>
          {rows.map((r) => (
            <Checkbox
              key={r}
              label={r}
              checked={picked.includes(r)}
              onChange={() => setPicked((p) => (p.includes(r) ? p.filter((x) => x !== r) : [...p, r]))}
            />
          ))}
        </div>
      </Col>
    );
  },
};
