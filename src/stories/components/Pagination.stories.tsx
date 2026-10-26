import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '../../components/pagination/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shows the first page, the last page and a window around the current one, so the control is the same width at 5 pages and at 500. Every page button carries its own label, because "3" read on its own means nothing.',
      },
    },
  },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { page: 1, pageCount: 5, onPageChange: () => {} },
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} pageCount={5} onPageChange={setPage} totalItems={94} pageSize={20} />;
  },
};

export const ManyPages: Story = {
  name: 'Many pages',
  args: { page: 1, pageCount: 240, onPageChange: () => {} },
  render: () => {
    const [page, setPage] = useState(12);
    return <Pagination page={page} pageCount={240} onPageChange={setPage} totalItems={4792} pageSize={20} />;
  },
};
