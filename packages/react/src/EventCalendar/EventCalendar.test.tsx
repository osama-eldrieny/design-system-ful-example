import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { EventCalendar } from './EventCalendar';

const events = [{ id: '1', title: 'Launch', date: new Date(2026, 9, 14) }];

describe('EventCalendar', () => {
  it('names the calendar and shows the month', () => {
    render(<EventCalendar label="Team" month={new Date(2026, 9, 1)} events={events} />);
    expect(screen.getByRole('group', { name: 'Team' })).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('names a day with its event count and selects it', () => {
    const onSelectDate = vi.fn();
    render(<EventCalendar label="Team" month={new Date(2026, 9, 1)} events={events} onSelectDate={onSelectDate} />);
    const day = screen.getByRole('button', { name: /October 14, 1 event/ });
    fireEvent.click(day);
    expect(onSelectDate).toHaveBeenCalledWith(new Date(2026, 9, 14));
    expect(day).toHaveAttribute('aria-pressed', 'true');
  });

  it('moves between months', () => {
    const onMonthChange = vi.fn();
    render(<EventCalendar label="Team" month={new Date(2026, 9, 1)} onMonthChange={onMonthChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 8, 1));
  });

  it('shows the week of the selected day in the week view', () => {
    const { container } = render(
      <EventCalendar label="Team" view="week" month={new Date(2026, 9, 1)} defaultSelectedDate={new Date(2026, 9, 14)} />,
    );
    expect(container.querySelectorAll('.ds-event-calendar__cell')).toHaveLength(7);
    expect(screen.getByRole('grid', { name: /Week of/ })).toBeInTheDocument();
  });

  it('lists the events of one day in the day view with their times', () => {
    render(
      <EventCalendar
        label="Team"
        view="day"
        month={new Date(2026, 9, 1)}
        defaultSelectedDate={new Date(2026, 9, 14)}
        events={[{ id: '1', title: 'Design review', date: new Date(2026, 9, 14), time: '11:00' }]}
      />,
    );
    expect(screen.getByRole('heading', { level: 3, name: /October 14/ })).toBeInTheDocument();
    expect(screen.getByText('11:00')).toBeInTheDocument();
    expect(screen.getByText('Design review')).toBeInTheDocument();
  });

  it('shows a multi-day event on every day it covers', () => {
    const { container } = render(
      <EventCalendar
        label="Team"
        month={new Date(2026, 9, 1)}
        events={[{ id: '1', title: 'Audit', date: new Date(2026, 9, 13), end: new Date(2026, 9, 15) }]}
      />,
    );
    expect(container.querySelectorAll('.ds-event-calendar__event')).toHaveLength(3);
  });

  it('calls onSelectEvent when an event is pressed', () => {
    const onSelectEvent = vi.fn();
    const event = { id: '1', title: 'Launch', date: new Date(2026, 9, 14) };
    render(<EventCalendar label="Team" month={new Date(2026, 9, 1)} events={[event]} onSelectEvent={onSelectEvent} />);
    fireEvent.click(screen.getByRole('button', { name: 'Launch' }));
    expect(onSelectEvent).toHaveBeenCalledWith(event);
  });
});
