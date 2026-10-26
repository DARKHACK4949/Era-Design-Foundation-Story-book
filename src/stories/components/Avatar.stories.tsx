import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '../../components/avatar/Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { name: 'Priya Nair', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] }, shape: { control: 'inline-radio', options: ['circle', 'square'] } },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Falls back from image to initials to nothing, because a broken image in a list of people is worse than no image. The initials colour is derived from the name rather than picked at random, so the same person is the same colour on every screen they appear on.',
      },
    },
  },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 'var(--spacing-space-12)', alignItems: 'center', flexWrap: 'wrap' }}>{children}</div>
);

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <Row>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Avatar key={s} name="Priya Nair" size={s} />
      ))}
    </Row>
  ),
};

export const DerivedColours: Story = {
  name: 'Derived colours',
  parameters: { docs: { description: { story: 'Same name, same colour, every time. Reload the page and nothing moves.' } } },
  render: () => (
    <Row>
      {['Priya Nair', 'Tom Alcott', 'Rhea Dsouza', 'Northwind Supply', 'Calder Logistics', 'Marrow & Sons'].map((n) => (
        <Avatar key={n} name={n} size="lg" />
      ))}
    </Row>
  ),
};

export const BrokenImage: Story = {
  name: 'Broken image',
  parameters: { docs: { description: { story: 'The src here does not resolve. The avatar falls back to initials rather than leaving a torn image icon in the row.' } } },
  render: () => (
    <Row>
      <Avatar name="Priya Nair" size="lg" src="https://example.invalid/missing.jpg" />
      <Avatar name="Northwind Supply" size="lg" shape="square" src="https://example.invalid/missing.jpg" />
    </Row>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-space-16)' }}>
      <AvatarGroup people={[{ name: 'Priya Nair' }, { name: 'Tom Alcott' }, { name: 'Rhea Dsouza' }]} />
      <AvatarGroup
        max={3}
        people={[{ name: 'Priya Nair' }, { name: 'Tom Alcott' }, { name: 'Rhea Dsouza' }, { name: 'Sam Okafor' }, { name: 'Lena Fischer' }, { name: 'Arun Mehta' }]}
      />
    </div>
  ),
};
