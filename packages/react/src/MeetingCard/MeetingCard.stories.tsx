import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { MeetingCard, type MeetingCardVariant } from './MeetingCard';

const VARIANTS: MeetingCardVariant[] = ['primary', 'success', 'warning', 'danger'];
const people = [
  { name: 'Osama Eldrieny', src: 'assets/avatar-1.png' },
  { name: 'Sarah Chen', src: 'assets/avatar-2.png' },
  { name: 'Maria Garcia', src: 'assets/avatar-3.png' },
  { name: 'James Wilson', src: 'assets/avatar-4.png' },
  { name: 'Lina Haddad' },
  { name: 'Tom Becker' },
];

const meta = {
  title: 'Patterns/MeetingCard',
  component: MeetingCard,
  tags: ['!autodocs'],
  args: {
    title: 'Q3 planning',
    time: '10:00 – 11:00',
    variant: 'primary',
    attendees: people.slice(0, 3),
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 320 }}>{Story()}</div>],
} satisfies Meta<typeof MeetingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <MeetingCard {...args} variant="primary" title="Q3 planning" />
      <MeetingCard {...args} variant="success" title="Confirmed: Design review" />
      <MeetingCard {...args} variant="warning" title="Starts in 5 min: Standup" />
      <MeetingCard {...args} variant="danger" title="Cancelled: Budget review" />
    </div>
  ),
};

export const ManyAttendees: Story = {
  args: { attendees: people, maxAttendees: 4 },
};

export const WithoutAttendees: Story = {
  args: { attendees: [], title: 'Focus time' },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { title: 'تخطيط الربع الثالث', time: '10:00 – 11:00', attendeesLabel: 'الحضور' },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [(Story) => <div style={{ display: 'grid', gap: 12 }}>{Story()}</div>],
  render: (args) => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={{ display: 'grid', gap: 8 }}>
              {VARIANTS.map((v) => (
                <MeetingCard key={v} {...args} variant={v} title={`${brand} ${mode} ${v}`} />
              ))}
            </div>
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** Heading, machine-readable time and a named attendee group with a count. */
export const Semantics: Story = {
  tags: ['test'],
  args: { attendees: people, maxAttendees: 3, dateTime: '2026-09-29T10:00' },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('heading', { level: 3, name: 'Q3 planning' })).toBeVisible();
    await expect(canvasElement.querySelector('time')).toHaveAttribute(
      'datetime',
      '2026-09-29T10:00',
    );
    await expect(canvas.getByRole('group', { name: 'Attendees' })).toBeVisible();
    await expect(canvas.getByRole('img', { name: 'and 3 more' })).toBeVisible();
  },
};
