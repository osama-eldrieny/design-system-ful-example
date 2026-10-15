import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Rating } from './Rating';

const meta = {
  title: 'Components/Forms/Rating',
  component: Rating,
  tags: ['!autodocs'],
  args: { label: 'Rate this template', defaultValue: 3, size: 'medium', readOnly: false, showValue: false, onValueChange: fn() },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Rating {...args} label="Small" size="small" />
      <Rating {...args} label="Medium" size="medium" />
      <Rating {...args} label="Large" size="large" />
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Rating label="Average" value={4.5} readOnly />
      <Rating label="Average" value={3.2} readOnly />
      <Rating label="Average" value={1} readOnly />
    </div>
  ),
};

export const ShowValue: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Rating label="Customer rating" value={4.5} readOnly showValue size="small" />
      <Rating label="Your rating" defaultValue={4} showValue />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Rating label="Not rated" />
      <Rating label="Rated" defaultValue={4} />
      <Rating label="Read only" value={3.5} readOnly />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <div dir="rtl" style={{ display: 'grid', gap: 16 }}>
      <Rating label="قيّم القالب" defaultValue={3} starLabel={(n) => `${n} من 5`} />
      <Rating label="التقييم" value={3.5} readOnly showValue summaryLabel={(v, m) => `${v} من ${m}`} />
    </div>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Rating label={`${brand} ${mode}`} value={3.5} readOnly showValue />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  args: { defaultValue: 0 },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: '4 stars' }));
    await expect(args.onValueChange).toHaveBeenCalledWith(4);
    await expect(canvas.getByRole('radio', { name: '4 stars' })).toBeChecked();
  },
};
