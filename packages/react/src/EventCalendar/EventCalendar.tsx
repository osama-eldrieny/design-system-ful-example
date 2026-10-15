import { forwardRef, useState, type HTMLAttributes } from 'react';
import { IconButton } from '../Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './EventCalendar.css';

export type EventCalendarTone = 'primary' | 'success' | 'warning' | 'danger' | 'gray';
export type EventCalendarView = 'month' | 'week' | 'day';

export interface EventCalendarEvent {
  id: string;
  /** What the event is, e.g. "Design review". */
  title: string;
  /** The first day of the event. Only the date part is used. */
  date: Date;
  /** The last day of a multi-day event, inclusive. Default: the same day as date. */
  end?: Date;
  /** When it happens, e.g. "09:30" or "All day". Shown in the week and day views. */
  time?: string;
  /** Colour of the event. Default primary. */
  tone?: EventCalendarTone;
}

export interface EventCalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Names the calendar, e.g. "Team calendar". */
  label: string;
  /** Any date in the month to show. */
  month: Date;
  events?: EventCalendarEvent[];
  /** `month` (default) shows the whole month; `week` the week of the selected day; `day` its agenda. */
  view?: EventCalendarView;
  /** Shows the month name and previous / next buttons. Turn off when the page has its own. */
  header?: boolean;
  /** The selected day (controlled). */
  selectedDate?: Date;
  defaultSelectedDate?: Date;
  onSelectDate?: (date: Date) => void;
  /** Called with an event when its chip is pressed. Makes the chips buttons. */
  onSelectEvent?: (event: EventCalendarEvent) => void;
  /** Called with the first day of the month when the arrows are pressed. */
  onMonthChange?: (month: Date) => void;
  /** Day the week starts on: 0 = Sunday, 1 = Monday (default). */
  weekStartsOn?: 0 | 1;
  /** Locale for month and weekday names. Default "en-US". */
  locale?: string;
}

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();
const eventCovers = (e: EventCalendarEvent, day: Date) => {
  const d = startOfDay(day).getTime();
  return d >= startOfDay(e.date).getTime() && d <= startOfDay(e.end ?? e.date).getTime();
};

/**
 * A calendar with month, week and day views. An event shows on each day it covers; choose a day
 * to select it, and press an event to open it when onSelectEvent is set. Days are buttons, so the
 * calendar works with the keyboard.
 */
export const EventCalendar = forwardRef<HTMLDivElement, EventCalendarProps>(
  (
    {
      label,
      month,
      events = [],
      view = 'month',
      header = true,
      selectedDate,
      defaultSelectedDate,
      onSelectDate,
      onSelectEvent,
      onMonthChange,
      weekStartsOn = 1,
      locale = 'en-US',
      className,
      ...props
    },
    ref,
  ) => {
    const [own, setOwn] = useState<Date | undefined>(defaultSelectedDate);
    const selected = selectedDate ?? own;
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const anchor = selected ?? first;
    const today = new Date();
    const monthName = first.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    const dayName = (d: Date) => d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });

    const weekdays = Array.from({ length: 7 }, (_, i) =>
      new Date(2026, 0, 4 + ((i + weekStartsOn) % 7)).toLocaleDateString(locale, { weekday: 'short' }),
    );

    // Month: six weeks, starting on the first day of the week that holds the 1st.
    const monthOffset = (first.getDay() - weekStartsOn + 7) % 7;
    const monthDays = Array.from(
      { length: 42 },
      (_, i) => new Date(first.getFullYear(), first.getMonth(), 1 - monthOffset + i),
    );
    // Week: the seven days of the week that holds the anchor day.
    const weekOffset = (anchor.getDay() - weekStartsOn + 7) % 7;
    const weekDays = Array.from(
      { length: 7 },
      (_, i) => new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - weekOffset + i),
    );

    const pick = (date: Date) => {
      setOwn(date);
      onSelectDate?.(date);
    };
    const shift = (delta: number) => onMonthChange?.(new Date(first.getFullYear(), first.getMonth() + delta, 1));

    const dayButton = (day: Date, inMonth: boolean) => {
      const count = events.filter((e) => eventCovers(e, day)).length;
      const isSelected = !!selected && sameDay(selected, day);
      const cls = [
        'ds-event-calendar__day',
        !inMonth && 'ds-event-calendar__day--outside',
        sameDay(today, day) && 'ds-event-calendar__day--today',
        isSelected && 'ds-event-calendar__day--selected',
      ]
        .filter(Boolean)
        .join(' ');
      return (
        <button
          type="button"
          className={cls}
          aria-label={count ? `${dayName(day)}, ${count} ${count === 1 ? 'event' : 'events'}` : dayName(day)}
          aria-pressed={isSelected}
          onClick={() => pick(day)}
        >
          <span className="ds-event-calendar__number">{day.getDate()}</span>
        </button>
      );
    };

    const eventList = (day: Date, limit: number | undefined, showTime: boolean) => {
      const dayEvents = events.filter((e) => eventCovers(e, day));
      if (dayEvents.length === 0) return null;
      const shown = limit ? dayEvents.slice(0, limit) : dayEvents;
      const hidden = dayEvents.length - shown.length;
      return (
        <ul className="ds-event-calendar__events" aria-hidden={onSelectEvent ? undefined : true}>
          {shown.map((event) => {
            const text = (
              <>
                {showTime && event.time && <span className="ds-event-calendar__time">{event.time} </span>}
                {event.title}
              </>
            );
            return (
              <li key={event.id} className={`ds-event-calendar__event ds-event-calendar__event--${event.tone ?? 'primary'}`}>
                {onSelectEvent ? (
                  <button type="button" className="ds-event-calendar__event-button" onClick={() => onSelectEvent(event)}>
                    {text}
                  </button>
                ) : (
                  text
                )}
              </li>
            );
          })}
          {hidden > 0 && <li className="ds-event-calendar__more">+{hidden}</li>}
        </ul>
      );
    };

    const dayEventsFor = events.filter((e) => eventCovers(e, anchor));

    return (
      <div
        ref={ref}
        className={['ds-event-calendar', `ds-event-calendar--${view}`, className].filter(Boolean).join(' ')}
        role="group"
        aria-label={label}
        {...props}
      >
        {header && (
          <div className="ds-event-calendar__header">
            <span className="ds-event-calendar__month" aria-live="polite">
              {monthName}
            </span>
            <span className="ds-event-calendar__nav">
              <IconButton icon={<ChevronLeft />} label="Previous month" variant="secondary" appearance="ghost" size="small" onClick={() => shift(-1)} />
              <IconButton icon={<ChevronRight />} label="Next month" variant="secondary" appearance="ghost" size="small" onClick={() => shift(1)} />
            </span>
          </div>
        )}

        {view === 'day' ? (
          <section className="ds-event-calendar__agenda" aria-label={dayName(anchor)}>
            <h3 className="ds-event-calendar__agenda-title">{dayName(anchor)}</h3>
            {dayEventsFor.length === 0 ? (
              <p className="ds-event-calendar__empty">No events.</p>
            ) : (
              <ul className="ds-event-calendar__agenda-list">
                {dayEventsFor.map((event) => (
                  <li key={event.id} className={`ds-event-calendar__agenda-item ds-event-calendar__event--${event.tone ?? 'primary'}`}>
                    {event.time && <span className="ds-event-calendar__time">{event.time}</span>}
                    {onSelectEvent ? (
                      <button type="button" className="ds-event-calendar__event-button" onClick={() => onSelectEvent(event)}>
                        {event.title}
                      </button>
                    ) : (
                      <span>{event.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <div className="ds-event-calendar__grid" role="grid" aria-label={view === 'week' ? `Week of ${dayName(weekDays[0])}` : monthName}>
            <div role="row" className="ds-event-calendar__row ds-event-calendar__row--head">
              {weekdays.map((day) => (
                <span key={day} role="columnheader" className="ds-event-calendar__weekday">
                  {day}
                </span>
              ))}
            </div>
            {view === 'month' &&
              Array.from({ length: 6 }, (_, week) => (
                <div role="row" key={week} className="ds-event-calendar__row">
                  {monthDays.slice(week * 7, week * 7 + 7).map((day) => (
                    <div
                      role="gridcell"
                      key={day.toISOString()}
                      className="ds-event-calendar__cell"
                      aria-selected={!!selected && sameDay(selected, day)}
                    >
                      {dayButton(day, day.getMonth() === first.getMonth())}
                      {eventList(day, 2, false)}
                    </div>
                  ))}
                </div>
              ))}
            {view === 'week' && (
              <div role="row" className="ds-event-calendar__row ds-event-calendar__row--tall">
                {weekDays.map((day) => (
                  <div
                    role="gridcell"
                    key={day.toISOString()}
                    className="ds-event-calendar__cell"
                    aria-selected={!!selected && sameDay(selected, day)}
                  >
                    {dayButton(day, true)}
                    {eventList(day, undefined, true)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
EventCalendar.displayName = 'EventCalendar';
