import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['!autodocs'],
  args: { currentPage: 5, totalPages: 12, appearance: 'full', siblingCount: 1, onPageChange: fn() },
  parameters: { a11y: { test: 'error' } },
  render: function Render(args) {
    const [page, setPage] = useState(args.currentPage);
    return (
      <Pagination
        {...args}
        currentPage={page}
        onPageChange={(p) => {
          setPage(p);
          args.onPageChange?.(p);
        }}
      />
    );
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Pagination {...args} appearance="full" label="Full pagination" />
      <Pagination {...args} appearance="simple" label="Simple pagination" />
    </div>
  ),
};

export const Ranges: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Pagination {...args} totalPages={5} currentPage={3} label="Few pages" />
      <Pagination {...args} totalPages={20} currentPage={1} label="Start of a long range" />
      <Pagination {...args} totalPages={20} currentPage={10} label="Middle of a long range" />
      <Pagination {...args} totalPages={20} currentPage={20} label="End of a long range" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Pagination {...args} currentPage={1} totalPages={5} label="First page (previous disabled)" />
      <div id="pagination-hover">
        <Pagination {...args} currentPage={3} totalPages={5} label="Hover and focus" />
      </div>
    </div>
  ),
  parameters: {
    pseudo: {
      hover: ['#pagination-hover li:nth-child(3) .ds-pagination__item'],
      focusVisible: ['#pagination-hover li:nth-child(5) .ds-pagination__item'],
    },
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    label: 'التنقل بين الصفحات',
    labels: { previous: 'الصفحة السابقة', next: 'الصفحة التالية', page: (p) => `الصفحة ${p}` },
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Pagination {...args} label={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Next, previous and page buttons change the page; the current page is announced. */
export const Navigate: Story = {
  tags: ['test'],
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Next page' }));
    await expect(args.onPageChange).toHaveBeenLastCalledWith(6);
    await expect(canvas.getByRole('button', { name: 'Page 6' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Page 12' }));
    await expect(canvas.getByRole('button', { name: 'Next page' })).toBeDisabled();
  },
};
