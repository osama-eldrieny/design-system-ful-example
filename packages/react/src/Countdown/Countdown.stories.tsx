import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Countdown } from './Countdown';

const now = new Date('2026-10-20T12:00:00Z');
const to = new Date('2026-10-25T20:45:20Z');

const meta = {
  title: 'Components/Data display/Countdown',
  component: Countdown,
  tags: ['!autodocs'],
  args: { label: 'Launch in', to, now, size: 'medium' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Countdown {...args} size="small" label="Small" />
      <Countdown {...args} size="medium" label="Medium" />
      <Countdown {...args} size="large" label="Large" />
    </div>
  ),
};

export const Ended: Story = { args: { now: new Date('2026-10-26T00:00:00Z'), endedLabel: 'Launched' } };

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <Countdown
        {...args}
        label="يبدأ خلال"
        units={{ days: 'يوم', hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية' }}
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
            <Countdown {...args} label={`${brand} ${mode}`} />
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
    await expect(canvas.getByRole('region', { name: /Launch in 5 days, 8 hours, 45 minutes, 20 seconds/ })).toBeInTheDocument();
  },
};
