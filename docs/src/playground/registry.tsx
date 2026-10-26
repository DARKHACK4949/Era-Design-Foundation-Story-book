import type { ComponentType } from 'react';
import { Button } from '@era/components/button/Button';
import { Badge } from '@era/components/badge/Badge';
import { Input } from '@era/components/input/Input';
import { Select } from '@era/components/select/Select';
import { Switch } from '@era/components/switch/Switch';
import { Checkbox } from '@era/components/checkbox/Checkbox';
import { TextArea } from '@era/components/textarea/TextArea';
import { Alert } from '@era/components/alert/Alert';
import { Progress } from '@era/components/progress/Progress';
import { EmptyState } from '@era/components/empty/EmptyState';

export type Control =
  | { prop: string; label: string; kind: 'enum'; options: string[] }
  | { prop: string; label: string; kind: 'bool' }
  | { prop: string; label: string; kind: 'text' };

export interface Entry {
  Component: ComponentType<Record<string, unknown>>;
  /** The JSX tag printed in the snippet. */
  tag: string;
  controls: Control[];
  defaults: Record<string, unknown>;
  /** Props that are structural rather than tweakable: kept out of the controls
   *  but still passed to the component and printed in the snippet. */
  fixed?: Record<string, unknown>;
  /** Rendered as children, and printed as the element's body. */
  children?: string;
  /** Props the snippet should show as a bare identifier rather than a string. */
  raw?: string[];
  stageWidth?: number;
}

const VENDORS = [
  { value: 'northwind', label: 'Northwind Supply', hint: '4 invoices this quarter' },
  { value: 'calder', label: 'Calder Logistics', hint: '2 invoices this quarter' },
  { value: 'brightwell', label: 'Brightwell Print', hint: 'New vendor, first payment held' },
];

export const REGISTRY: Record<string, Entry> = {
  button: {
    Component: Button as ComponentType<Record<string, unknown>>,
    tag: 'Button',
    children: 'Release payment',
    controls: [
      { prop: 'intent', label: 'Intent', kind: 'enum', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
      { prop: 'size', label: 'Size', kind: 'enum', options: ['xs', 'sm', 'md', 'lg'] },
      { prop: 'loading', label: 'Loading', kind: 'bool' },
      { prop: 'disabled', label: 'Disabled', kind: 'bool' },
      { prop: 'fullWidth', label: 'Full width', kind: 'bool' },
    ],
    defaults: { intent: 'primary', size: 'md', loading: false, disabled: false, fullWidth: false },
  },
  badge: {
    Component: Badge as ComponentType<Record<string, unknown>>,
    tag: 'Badge',
    children: 'Needs review',
    controls: [
      { prop: 'tone', label: 'Tone', kind: 'enum', options: ['neutral', 'primary', 'info', 'success', 'warning', 'error'] },
      { prop: 'fill', label: 'Fill', kind: 'enum', options: ['solid', 'subtle', 'outline'] },
      { prop: 'size', label: 'Size', kind: 'enum', options: ['sm', 'md'] },
      { prop: 'dot', label: 'Dot', kind: 'bool' },
    ],
    defaults: { tone: 'warning', fill: 'subtle', size: 'md', dot: false },
  },
  input: {
    Component: Input as ComponentType<Record<string, unknown>>,
    tag: 'Input',
    stageWidth: 340,
    controls: [
      { prop: 'label', label: 'Label', kind: 'text' },
      { prop: 'placeholder', label: 'Placeholder', kind: 'text' },
      { prop: 'size', label: 'Size', kind: 'enum', options: ['sm', 'md', 'lg'] },
      { prop: 'helperText', label: 'Helper text', kind: 'text' },
      { prop: 'errorText', label: 'Error text', kind: 'text' },
      { prop: 'required', label: 'Required', kind: 'bool' },
      { prop: 'readOnly', label: 'Read only', kind: 'bool' },
      { prop: 'disabled', label: 'Disabled', kind: 'bool' },
    ],
    defaults: {
      label: 'Invoice number',
      placeholder: 'INV-0000',
      size: 'md',
      helperText: 'Found on the top right of the invoice.',
      errorText: '',
      required: false,
      readOnly: false,
      disabled: false,
    },
  },
  select: {
    Component: Select as ComponentType<Record<string, unknown>>,
    tag: 'Select',
    stageWidth: 340,
    fixed: { options: VENDORS, defaultValue: 'calder' },
    raw: ['options'],
    controls: [
      { prop: 'label', label: 'Label', kind: 'text' },
      { prop: 'size', label: 'Size', kind: 'enum', options: ['sm', 'md', 'lg'] },
      { prop: 'helperText', label: 'Helper text', kind: 'text' },
      { prop: 'errorText', label: 'Error text', kind: 'text' },
      { prop: 'disabled', label: 'Disabled', kind: 'bool' },
    ],
    defaults: { label: 'Vendor', size: 'md', helperText: '', errorText: '', disabled: false },
  },
  switch: {
    Component: Switch as ComponentType<Record<string, unknown>>,
    tag: 'Switch',
    controls: [
      { prop: 'label', label: 'Label', kind: 'text' },
      { prop: 'size', label: 'Size', kind: 'enum', options: ['sm', 'md'] },
      { prop: 'defaultChecked', label: 'On', kind: 'bool' },
      { prop: 'disabled', label: 'Disabled', kind: 'bool' },
    ],
    defaults: { label: 'Auto-release under $500', size: 'md', defaultChecked: true, disabled: false },
  },
  checkbox: {
    Component: Checkbox as ComponentType<Record<string, unknown>>,
    tag: 'Checkbox',
    controls: [
      { prop: 'label', label: 'Label', kind: 'text' },
      { prop: 'hint', label: 'Hint', kind: 'text' },
      { prop: 'defaultChecked', label: 'Checked', kind: 'bool' },
      { prop: 'indeterminate', label: 'Indeterminate', kind: 'bool' },
      { prop: 'invalid', label: 'Invalid', kind: 'bool' },
      { prop: 'disabled', label: 'Disabled', kind: 'bool' },
    ],
    defaults: {
      label: 'Hold payments over the ceiling',
      hint: 'Anything above $500 waits for a person.',
      defaultChecked: true,
      indeterminate: false,
      invalid: false,
      disabled: false,
    },
  },
  'text-area': {
    Component: TextArea as ComponentType<Record<string, unknown>>,
    tag: 'TextArea',
    stageWidth: 380,
    controls: [
      { prop: 'label', label: 'Label', kind: 'text' },
      { prop: 'placeholder', label: 'Placeholder', kind: 'text' },
      { prop: 'maxLength', label: 'Counter at 120', kind: 'bool' },
      { prop: 'errorText', label: 'Error text', kind: 'text' },
      { prop: 'disabled', label: 'Disabled', kind: 'bool' },
    ],
    defaults: {
      label: 'Note for the approver',
      placeholder: 'What should they know before releasing this?',
      maxLength: false,
      errorText: '',
      disabled: false,
    },
  },
  alert: {
    Component: Alert as ComponentType<Record<string, unknown>>,
    tag: 'Alert',
    stageWidth: 520,
    controls: [
      { prop: 'tone', label: 'Tone', kind: 'enum', options: ['neutral', 'info', 'success', 'warning', 'error'] },
      { prop: 'title', label: 'Title', kind: 'text' },
      { prop: 'description', label: 'Description', kind: 'text' },
    ],
    defaults: {
      tone: 'warning',
      title: 'This invoice is a near-duplicate.',
      description: 'INV-2301 from the same vendor was paid on 11 Oct for the same amount.',
    },
  },
  progress: {
    Component: Progress as ComponentType<Record<string, unknown>>,
    tag: 'Progress',
    stageWidth: 420,
    controls: [
      { prop: 'label', label: 'Label', kind: 'text' },
      { prop: 'tone', label: 'Tone', kind: 'enum', options: ['default', 'success', 'error'] },
      { prop: 'size', label: 'Size', kind: 'enum', options: ['sm', 'md'] },
      { prop: 'indeterminate', label: 'Indeterminate', kind: 'bool' },
      { prop: 'hideValue', label: 'Hide value', kind: 'bool' },
    ],
    defaults: { label: 'Importing invoices', tone: 'default', size: 'md', indeterminate: false, hideValue: false },
  },
  'empty-state': {
    Component: EmptyState as ComponentType<Record<string, unknown>>,
    tag: 'EmptyState',
    stageWidth: 520,
    controls: [
      { prop: 'reason', label: 'Reason', kind: 'enum', options: ['first-run', 'no-results', 'error'] },
      { prop: 'title', label: 'Title', kind: 'text' },
      { prop: 'description', label: 'Description', kind: 'text' },
    ],
    defaults: {
      reason: 'no-results',
      title: 'No invoices match these filters',
      description: 'You are looking at held payments over $10,000 from the last 7 days.',
    },
  },
};

/** Two controls need translating before they reach the component. */
export function resolveProps(slug: string, state: Record<string, unknown>) {
  const out = { ...state };
  if (slug === 'text-area') out.maxLength = state.maxLength ? 120 : undefined;
  if (slug === 'progress') {
    out.value = state.indeterminate ? undefined : 64;
    // Checkbox has a real indeterminate prop; Progress does not.
    delete (out as Record<string, unknown>).indeterminate;
  }
  return out;
}
