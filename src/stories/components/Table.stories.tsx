import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Table, type SortDirection } from '../../components/table/Table';
import { Badge } from '../../components/badge/Badge';

interface Invoice {
  id: string;
  vendor: string;
  amount: number;
  due: string;
  status: 'released' | 'held' | 'rejected' | 'queued';
}

const ROWS: Invoice[] = [
  { id: 'INV-2301', vendor: 'Northwind Supply', amount: 4280, due: '24 Oct', status: 'released' },
  { id: 'INV-2302', vendor: 'Calder Logistics', amount: 918.5, due: '25 Oct', status: 'held' },
  { id: 'INV-2303', vendor: 'Brightwell Print', amount: 240, due: '26 Oct', status: 'queued' },
  { id: 'INV-2304', vendor: 'Marrow & Sons', amount: 12750, due: '27 Oct', status: 'held' },
  { id: 'INV-2305', vendor: 'Pell Facilities', amount: 1630.75, due: '29 Oct', status: 'rejected' },
];

const TONE = { released: 'success', held: 'warning', rejected: 'error', queued: 'neutral' } as const;
const LABEL = { released: 'Released', held: 'Held', rejected: 'Rejected', queued: 'Queued' } as const;
const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'ERA gives the table its own token group rather than reusing the generic surface and border tokens, because a table needs decisions nothing else does: a header that stays readable when it is sticky, a zebra stripe that survives a row hover on top of it, and a selected row that can still show hover. Money and dates are right-aligned with tabular figures so a long column can be scanned down instead of read across.',
      },
    },
  },
} satisfies Meta<typeof Table>;
export default meta;

export const Default: StoryObj = {
  render: () => {
    const [sort, setSort] = React.useState<{ key: string; direction: SortDirection }>({ key: 'due', direction: 'asc' });
    const [selected, setSelected] = React.useState<string[]>(['INV-2304']);

    const rows = React.useMemo(() => {
      const dir = sort.direction === 'asc' ? 1 : -1;
      return [...ROWS].sort((a, b) => {
        const key = sort.key as keyof Invoice;
        const [x, y] = [a[key], b[key]];
        return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))) * dir;
      });
    }, [sort]);

    const toggleSort = (key: string) =>
      setSort((s) => ({ key, direction: s.key === key && s.direction === 'asc' ? 'desc' : 'asc' }));

    return (
      <Table<Invoice>
        caption="Invoices awaiting a decision, sorted by due date"
        hideCaption={false}
        zebra
        rows={rows}
        rowKey={(r) => r.id}
        sort={sort}
        onSortChange={toggleSort}
        selectedKeys={selected}
        columns={[
          { key: 'id', header: 'Invoice', sortable: true, render: (r) => <code>{r.id}</code> },
          { key: 'vendor', header: 'Vendor', sortable: true, render: (r) => r.vendor },
          { key: 'due', header: 'Due', sortable: true, numeric: true, render: (r) => r.due },
          { key: 'amount', header: 'Amount', sortable: true, numeric: true, render: (r) => money(r.amount) },
          {
            key: 'status',
            header: 'Status',
            render: (r) => (
              <Badge tone={TONE[r.status]} fill="subtle" dot>
                {LABEL[r.status]}
              </Badge>
            ),
          },
          {
            key: 'select',
            header: 'Flagged',
            render: (r) => (
              <button
                type="button"
                onClick={() => setSelected((s) => (s.includes(r.id) ? s.filter((k) => k !== r.id) : [...s, r.id]))}
                style={{
                  background: 'none',
                  border: 0,
                  padding: 0,
                  color: 'var(--sem-fg-link)',
                  cursor: 'pointer',
                  font: 'inherit',
                  textDecoration: 'underline',
                }}
              >
                {selected.includes(r.id) ? 'Unflag' : 'Flag'}
              </button>
            ),
          },
        ]}
      />
    );
  },
};
