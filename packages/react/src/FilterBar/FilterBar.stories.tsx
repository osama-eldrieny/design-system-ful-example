import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within, screen } from 'storybook/test';
import { SearchField } from '../SearchField';
import { ThemeProvider } from '../ThemeProvider';
import { FilterBar, type FilterDefinition } from './FilterBar';

const filters: FilterDefinition[] = [
  {
    id: 'status',
    label: 'Status',
    options: [
      { value: 'paid', label: 'Paid' },
      { value: 'due', label: 'Due' },
      { value: 'overdue', label: 'Overdue' },
    ],
  },
  {
    id: 'owner',
    label: 'Owner',
    options: [
      { value: 'lana', label: 'Lana Steiner' },
      { value: 'omar', label: 'Omar Haddad' },
    ],
  },
  {
    id: 'plan',
    label: 'Plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
    ],
  },
];

const meta = {
  title: 'Components/Forms/FilterBar',
  component: FilterBar,
  tags: ['!autodocs'],
  args: {
    label: 'Filter invoices',
    filters,
    defaultValue: { status: ['paid', 'due'] },
    showChips: true,
    onValueChange: fn(),
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    search: <SearchField placeholder="Search invoices" />,
    end: <span>24 results</span>,
  },
};

export const Chips: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <FilterBar {...args} label="With chips" showChips />
      <FilterBar {...args} label="Without chips" showChips={false} />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <FilterBar {...args} label="Nothing chosen" defaultValue={{}} />
      <FilterBar {...args} label="Two filters active" defaultValue={{ status: ['overdue'], owner: ['lana'] }} />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <div dir="rtl">
      <FilterBar
        label="تصفية الفواتير"
        clearLabel="مسح الكل"
        removeLabel={(f, o) => `إزالة ${f}: ${o}`}
        selectedLabel={(f, n) => `${f}، ${n} محدد`}
        search={<SearchField label="بحث" placeholder="ابحث في الفواتير" />}
        filters={[
          { id: 'status', label: 'الحالة', options: [{ value: 'paid', label: 'مدفوعة' }, { value: 'due', label: 'مستحقة' }] },
          { id: 'owner', label: 'المسؤول', options: [{ value: 'lana', label: 'لانا' }] },
        ]}
        defaultValue={{ status: ['paid'] }}
      />
    </div>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <FilterBar {...args} label={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  args: { defaultValue: {} },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Status' }));
    await userEvent.click(await screen.findByRole('menuitemcheckbox', { name: 'Overdue' }));
    await expect(args.onValueChange).toHaveBeenCalledWith({ status: ['overdue'] });
    await userEvent.keyboard('{Escape}');
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Status: Overdue' }));
    await expect(args.onValueChange).toHaveBeenLastCalledWith({ status: [] });
  },
};
