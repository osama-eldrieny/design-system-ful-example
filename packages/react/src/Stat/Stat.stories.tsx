import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Stat } from './Stat';
import { ThemeProvider } from '../ThemeProvider';

const meta = {
  title: 'Components/Data display/Stat',
  component: Stat,
  tags: ['!autodocs'],
  args: {
    label: 'Total revenue',
    value: '$124,567',
    change: '+12.5%',
    trend: 'up',
    help: 'vs last month',
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Trends: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
      <Stat label="Revenue" value="$124,567" change="+12.5%" trend="up" help="vs last month" />
      <Stat
        label="Churn"
        value="2.1%"
        change="+0.4%"
        trend="up"
        positive={false}
        help="vs last month"
      />
      <Stat label="Costs" value="$8,210" change="-4%" trend="down" positive help="vs last month" />
      <Stat label="Active users" value="8,432" />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    label: 'إجمالي الإيرادات',
    help: 'مقارنة بالشهر الماضي',
    trendLabels: { up: 'ارتفع', down: 'انخفض' },
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Stat
              label={`${brand} ${mode}`}
              value="$124,567"
              change="+12.5%"
              trend="up"
              help="vs last month"
            />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Label and value pair up; the trend is said in words. */
export const Semantics: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('term')).toHaveTextContent('Total revenue');
    await expect(canvas.getByText('increased')).toBeInTheDocument();
  },
};
