import type { ReactNode } from 'react';
import type React from 'react';
import { Accordion } from '@era/components/accordion/Accordion';
import { Alert } from '@era/components/alert/Alert';
import { Avatar } from '@era/components/avatar/Avatar';
import { Badge } from '@era/components/badge/Badge';
import { Breadcrumb } from '@era/components/breadcrumb/Breadcrumb';
import { Button } from '@era/components/button/Button';
import { Card } from '@era/components/card/Card';
import { Checkbox } from '@era/components/checkbox/Checkbox';
import { EmptyState } from '@era/components/empty/EmptyState';
import { Input } from '@era/components/input/Input';
import { Menu } from '@era/components/menu/Menu';
import { Pagination } from '@era/components/pagination/Pagination';
import { Progress } from '@era/components/progress/Progress';
import { Radio, RadioGroup } from '@era/components/radio/Radio';
import { Select } from '@era/components/select/Select';
import { Skeleton } from '@era/components/skeleton/Skeleton';
import { Switch } from '@era/components/switch/Switch';
import { Table } from '@era/components/table/Table';
import { Tabs } from '@era/components/tabs/Tabs';
import { TextArea } from '@era/components/textarea/TextArea';
import { Tooltip } from '@era/components/tooltip/Tooltip';

/**
 * One resting instance of each component, for the index.
 *
 * The index used to be a name and a line of prose per component, which told a
 * reader what a thing is called and nothing about what it looks like. These
 * are the real components reading the real tokens, so the index re-themes with
 * the rest of the page.
 *
 * Modal and Toast are missing on purpose: neither has a resting state. Drawing
 * something for them would mean drawing something that is not the component.
 */

type Row = { vendor: string; amount: string };
const ROWS: Row[] = [
  { vendor: 'Calder Logistics', amount: '1,480.00' },
  { vendor: 'Northwind Supply', amount: '920.00' },
];

const PREVIEWS: Record<string, ReactNode> = {
  button: <Button size="sm">Release payment</Button>,

  menu: (
    <Menu
      label="Row actions"
      trigger={<Button size="sm" intent="secondary">Actions</Button>}
      groups={[{ items: [{ id: 'open', label: 'Open' }, { id: 'hold', label: 'Hold' }] }]}
    />
  ),

  input: <Input label="Amount" defaultValue="500.00" hideLabel />,
  'text-area': <TextArea label="Note" hideLabel defaultValue="Approved by finance." rows={2} />,
  select: (
    <Select
      label="Vendor"
      hideLabel
      defaultValue="calder"
      options={[
        { value: 'calder', label: 'Calder Logistics' },
        { value: 'northwind', label: 'Northwind Supply' },
      ]}
    />
  ),
  checkbox: <Checkbox label="Hold first payment" defaultChecked />,
  radio: (
    <RadioGroup legend="Release" name="preview-release" >
      <Radio label="Immediately" defaultChecked />
      <Radio label="On approval" />
    </RadioGroup>
  ),
  switch: <Switch label="Auto release" defaultChecked />,

  table: (
    <Table<Row>
      caption="Open invoices"
      hideCaption
      rowKey={(r) => r.vendor}
      rows={ROWS}
      columns={[
        { key: 'vendor', header: 'Vendor', render: (r) => r.vendor },
        { key: 'amount', header: 'Amount', numeric: true, render: (r) => r.amount },
      ]}
    />
  ),
  card: <Card title="Release rules" subtitle="Applies to every vendor" aside={<Badge tone="success" fill="subtle" dot>Active</Badge>} />,
  badge: <Badge tone="success" fill="subtle" dot>Active</Badge>,
  avatar: <Avatar name="Calder Logistics" />,

  tabs: (
    <Tabs
      tabs={[
        { id: 'open', label: 'Open', count: 4, content: null },
        { id: 'paid', label: 'Paid', content: null },
      ]}
    />
  ),
  breadcrumb: <Breadcrumb items={[{ label: 'Vendors', href: '#' }, { label: 'Calder' }]} />,
  pagination: <Pagination page={2} pageCount={9} totalItems={128} pageSize={16} onPageChange={() => {}} />,

  accordion: (
    <Accordion
      items={[
        { id: 'terms', label: 'Payment terms', content: 'Net 30 from the invoice date.', defaultOpen: true },
        { id: 'contacts', label: 'Contacts', content: 'Two named approvers.' },
      ]}
    />
  ),
  alert: <Alert tone="warning" title="Two invoices are past due" />,
  tooltip: (
    <Tooltip label="Releases the held payment">
      <Button size="sm" intent="secondary">Release</Button>
    </Tooltip>
  ),
  progress: <Progress value={62} label="Migrated" />,
  skeleton: <Skeleton variant="text" width="12rem" />,
  'empty-state': <EmptyState title="No invoices yet" description="They appear here once a vendor bills you." />,
};

/** Which slugs have a resting state worth drawing. */
export const HAS_PREVIEW = (slug: string) => slug in PREVIEWS;

/**
 * Rendered as a component, not looked up as a value. Astro only renders a
 * framework element when it is used as a tag; a React element handed over
 * inside a plain object is stringified, and every card prints
 * "[object Object]".
 */
export function Preview({ slug }: { slug: string }) {
  return (PREVIEWS[slug] ?? null) as React.ReactElement | null;
}
