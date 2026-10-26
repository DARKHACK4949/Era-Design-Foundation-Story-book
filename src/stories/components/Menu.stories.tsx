import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Menu } from '../../components/menu/Menu';
import { Button } from '../../components/button/Button';
import { Badge } from '../../components/badge/Badge';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  args: { label: 'Invoice actions', groups: [], trigger: <Button>Actions</Button> },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A menu holds commands: every item does something when chosen. That is what separates it from a Select, where items are values and one of them is always the current one. The two share a popup surface so dropdowns look identical, and deliberately do not share roles, because assistive tech announces a menu and a listbox differently and should.\n\nKeyboard follows the WAI-ARIA menu button pattern. Enter, Space or Down opens on the first item and Up opens on the last. Arrows move, Home and End jump to the ends, typing a letter jumps to the next item starting with it, and Escape closes and puts focus back on the trigger. The menu flips above the trigger when there is not room below, which matters for a row near the bottom of a table.',
      },
    },
  },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

const icon = (d: string) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EYE = icon('M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z M8 9.75A1.75 1.75 0 1 0 8 6.25a1.75 1.75 0 0 0 0 3.5Z');
const CHECK = icon('m3.5 8.5 3 3 6-7');
const PAUSE = icon('M6.5 4v8M9.5 4v8');
const TRASH = icon('M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8h5.8l.6-8');

export const Default: Story = {
  render: () => {
    const [last, setLast] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)', alignItems: 'flex-start', minHeight: 320 }}>
        <Menu
          label="Invoice actions"
          trigger={<Button intent="outline">Actions</Button>}
          groups={[
            {
              items: [
                { id: 'view', label: 'Open invoice', icon: EYE, shortcut: 'O', onSelect: () => setLast('Open invoice') },
                { id: 'release', label: 'Release payment', icon: CHECK, shortcut: '⌘ ⏎', onSelect: () => setLast('Release payment') },
                { id: 'hold', label: 'Hold for review', icon: PAUSE, hint: 'The vendor is not told.', onSelect: () => setLast('Hold for review') },
              ],
            },
            {
              label: 'Danger zone',
              items: [
                { id: 'export', label: 'Export audit trail', disabled: true, hint: 'Needs finance admin rights.' },
                { id: 'reject', label: 'Reject invoice', icon: TRASH, danger: true, onSelect: () => setLast('Reject invoice') },
              ],
            },
          ]}
        />
        {last && (
          <Badge tone="neutral" fill="subtle">
            Chose: {last}
          </Badge>
        )}
      </div>
    );
  },
};

export const AlignedToTheEnd: Story = {
  name: 'Aligned to the end',
  parameters: { docs: { description: { story: 'A menu opened from the right edge of a row aligns its right edge to the trigger, so it does not run off the screen.' } } },
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', minHeight: 280 }}>
      <Menu
        label="Row actions"
        align="end"
        trigger={<Button intent="ghost" aria-label="Row actions" leadingIcon={icon('M8 4.5h.01M8 8h.01M8 11.5h.01')} />}
        groups={[
          { items: [
            { id: 'open', label: 'Open invoice', icon: EYE },
            { id: 'flag', label: 'Flag for review', icon: PAUSE },
          ] },
          { items: [{ id: 'reject', label: 'Reject invoice', icon: TRASH, danger: true }] },
        ]}
      />
    </div>
  ),
};
