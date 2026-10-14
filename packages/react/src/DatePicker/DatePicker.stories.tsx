import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Calendar, DatePicker, DateRangePicker, datePresets, type DateRange } from './DatePicker';

const today = new Date(2026, 9, 15);

const meta = {
  title: 'Components/Forms/DatePicker',
  component: DatePicker,
  subcomponents: { Calendar, DateRangePicker },
  tags: ['!autodocs'],
  args: { label: 'Due date', today, defaultMonth: today, onValueChange: fn() },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The month grid on its own, e.g. in a sidebar. */
export const Calendars: Story = {
  render: () => {
    const Demo = () => {
      const [date, setDate] = useState<Date | null>(new Date(2026, 9, 20));
      const [range, setRange] = useState<DateRange>({
        start: new Date(2026, 9, 6),
        end: new Date(2026, 9, 13),
      });
      return (
        <div style={{ display: 'grid', gap: 40 }}>
          <Calendar today={today} value={date} onValueChange={setDate} />
          <Calendar today={today} mode="range" months={2} range={range} onRangeChange={setRange} />
        </div>
      );
    };
    return <Demo />;
  },
};

/** Two months with presets; the range applies with Apply. */
export const Range: Story = {
  render: () => (
    <DateRangePicker
      label="Report period"
      today={today}
      defaultMonth={new Date(2026, 8, 1)}
      presets={datePresets(today)}
      onValueChange={fn()}
    />
  ),
};

/** Dates before today and weekends can’t be picked. */
export const Constraints: Story = {
  args: {
    label: 'Delivery date',
    min: today,
    isDateDisabled: (d: Date) => d.getDay() === 0 || d.getDay() === 6,
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Calendar
      today={today}
      defaultMonth={today}
      locale="ar"
      labels={{ previous: 'الشهر السابق', next: 'الشهر التالي' }}
    />
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Calendar
              today={today}
              defaultMonth={today}
              mode="range"
              range={{ start: new Date(2026, 9, 6), end: new Date(2026, 9, 13) }}
              locale="en-US"
            />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Arrow keys move between days. */
export const Keyboard: Story = {
  tags: ['test'],
  render: () => <Calendar today={today} defaultMonth={today} locale="en-US" />,
  play: async ({ canvas }) => {
    canvas.getByRole('button', { name: 'Thursday, October 15, 2026' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Friday, October 16, 2026' })).toHaveFocus();
  },
};
