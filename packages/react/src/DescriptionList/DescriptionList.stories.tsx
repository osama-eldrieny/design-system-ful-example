import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { DescriptionList } from './DescriptionList';

const items = [
  { term: 'Subtotal', description: '$1,100.00' },
  { term: 'VAT (10%)', description: '$110.00' },
  { term: 'Total', description: '$1,210.00', emphasis: true },
];

const meta = {
  title: 'Components/Data display/DescriptionList',
  component: DescriptionList,
  tags: ['!autodocs'],
  args: { items, layout: 'horizontal', divided: true },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 420 }}><Story /></div>],
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Layouts: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <DescriptionList {...args} layout="horizontal" />
      <div style={{ maxInlineSize: 240 }}>
        <DescriptionList {...args} layout="stacked" />
      </div>
    </div>
  ),
};

export const Dividers: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <DescriptionList {...args} divided={false} />
      <DescriptionList {...args} divided />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <DescriptionList
        {...args}
        items={[
          { term: 'المجموع الفرعي', description: '١٬١٠٠٫٠٠ $' },
          { term: 'الإجمالي', description: '١٬٢١٠٫٠٠ $', emphasis: true },
        ]}
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
            <DescriptionList {...args} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Total')).toBeInTheDocument();
    await expect(canvas.getByText('$1,210.00')).toBeInTheDocument();
  },
};
