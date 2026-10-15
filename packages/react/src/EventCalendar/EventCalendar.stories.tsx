import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { EventCalendar, type EventCalendarEvent } from './EventCalendar';

const events: EventCalendarEvent[] = [
  { id: '1', title: 'Design review', date: new Date(2026, 9, 14), tone: 'primary' },
  { id: '2', title: 'Launch', date: new Date(2026, 9, 14), tone: 'success' },
  { id: '3', title: 'Budget', date: new Date(2026, 9, 21), tone: 'warning' },
];

const meta = {
  title: 'Components/Data display/EventCalendar',
  component: EventCalendar,
  tags: ['!autodocs'],
  args: {
    label: 'Team calendar',
    month: new Date(2026, 9, 1),
    events,
    weekStartsOn: 1,
    onSelectDate: fn(),
    onMonthChange: fn(),
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 760 }}><Story /></div>],
} satisfies Meta<typeof EventCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WeekStart: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <EventCalendar {...args} label="Monday first" weekStartsOn={1} />
      <EventCalendar {...args} label="Sunday first" weekStartsOn={0} />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <EventCalendar {...args} label="تقويم الفريق" locale="ar" events={[{ id: '1', title: 'مراجعة التصميم', date: new Date(2026, 9, 14) }]} />
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
            <EventCalendar {...args} label={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /October 14/ }));
    await expect(args.onSelectDate).toHaveBeenCalled();
    await userEvent.click(canvas.getByRole('button', { name: 'Next month' }));
    await expect(args.onMonthChange).toHaveBeenCalled();
  },
};

/** The three views of the same month, with the same selected day. */
export const Views: Story = {
  args: { defaultSelectedDate: new Date(2026, 9, 14), header: false },
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <EventCalendar {...args} label="Month" view="month" />
      <EventCalendar {...args} label="Week" view="week" />
      <EventCalendar {...args} label="Day" view="day" />
    </div>
  ),
};

/** Events that span several days, and events that open when pressed. */
export const MultiDay: Story = {
  args: {
    defaultSelectedDate: new Date(2026, 9, 13),
    onSelectEvent: fn(),
    events: [
      { id: 'sprint', title: 'SOC 2 audit window', date: new Date(2026, 9, 13), end: new Date(2026, 9, 15), tone: 'danger', time: 'All day' },
      { id: 'review', title: 'Design review', date: new Date(2026, 9, 14), time: '11:00', tone: 'success' },
    ],
  },
};
