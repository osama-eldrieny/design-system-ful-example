import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MeetingCard } from './MeetingCard';

describe('MeetingCard', () => {
  it('renders the title as a heading at the chosen level', () => {
    render(<MeetingCard title="Standup" time="9:00" titleAs="h4" />);
    expect(screen.getByRole('heading', { level: 4, name: 'Standup' })).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('ds-meeting-card--primary');
  });

  it('wraps the time in <time> when dateTime is set', () => {
    const { container } = render(
      <MeetingCard title="Standup" time="9:00" dateTime="2026-09-29T09:00" />,
    );
    expect(container.querySelector('time')).toHaveAttribute('datetime', '2026-09-29T09:00');
  });

  it('shows attendees as a labelled group and counts the rest', () => {
    render(
      <MeetingCard
        title="Review"
        time="14:00"
        attendeesLabel="People"
        maxAttendees={1}
        attendees={[{ name: 'Sarah Chen' }, { name: 'James Wilson' }]}
      />,
    );
    expect(screen.getByRole('group', { name: 'People' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Sarah Chen' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'and 1 more' })).toBeInTheDocument();
  });

  it('renders no group without attendees', () => {
    render(<MeetingCard title="Focus" time="All day" />);
    expect(screen.queryByRole('group')).toBeNull();
  });
});
