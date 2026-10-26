import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '../../components/radio/Radio';

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Radios come in groups and never alone: one on its own is a checkbox you cannot uncheck. The group owns the legend and the error, the individual radio owns only its own label. The fieldset is what makes the legend get announced once instead of on every option.',
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { legend: 'When a payment needs a second approval', name: 'approval', children: null },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <RadioGroup legend="When a payment needs a second approval" name="approval" helperText="Applies to every vendor unless a rule overrides it.">
        <Radio label="Over the auto-release ceiling" hint="Anything above $500." defaultChecked />
        <Radio label="First payment to a vendor" hint="Then never again for that vendor." />
        <Radio label="Every payment" hint="Slowest, and the one most teams turn off within a week." />
        <Radio label="Never" disabled hint="Turned off by your finance admin." />
      </RadioGroup>
    </div>
  ),
};

export const WithError: Story = {
  name: 'With error',
  args: { legend: 'Reason for holding', name: 'reason', children: null },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <RadioGroup legend="Reason for holding" name="reason" errorText="Pick a reason before holding the payment.">
        <Radio label="Possible duplicate" />
        <Radio label="Amount does not match the purchase order" />
        <Radio label="Bank details changed recently" />
      </RadioGroup>
    </div>
  ),
};
