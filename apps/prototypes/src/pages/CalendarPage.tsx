import { useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Calendar,
  IconButton,
  PageHeader,
  Switch,
  useToast,
} from '@ds/react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { events, meetings, weekDays } from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import './calendar.css';

const hours = Array.from({ length: 10 }, (_, i) => 9 + i);
const label = (h: number) => `${((h + 11) % 12) + 1} ${h < 12 ? 'AM' : 'PM'}`;
const calendars = [
  { id: 'work', label: 'Work', tone: 'primary' as const },
  { id: 'personal', label: 'Personal', tone: 'success' as const },
  { id: 'team', label: 'Team events', tone: 'purple' as const },
];

/** Calendar: a week grid with events, a month picker, calendars and what’s next. */
export default function CalendarPage() {
  const toast = useToast();
  const [view, setView] = useState('week');
  const [date, setDate] = useState<Date | null>(new Date(2026, 9, 15));

  return (
    <AppShell current="calendar">
      <div className="page">
        <PageHeader
          title="Calendar"
          description="October 11 – 17, 2026 · Week 42"
          actions={
            <>
              <div className="row">
                <IconButton
                  icon={<ChevronLeft className="calendar__chevron" />}
                  label="Previous week"
                  variant="secondary"
                  appearance="outline"
                  size="small"
                />
                <Button variant="secondary" appearance="outline" size="small">
                  Today
                </Button>
                <IconButton
                  icon={<ChevronRight className="calendar__chevron" />}
                  label="Next week"
                  variant="secondary"
                  appearance="outline"
                  size="small"
                />
              </div>
              <ButtonGroup
                className="scroll-x"
                aria-label="View"
                attached
                value={view}
                onValueChange={setView}
              >
                <Button value="day" variant="secondary" appearance="outline" size="small">
                  Day
                </Button>
                <Button value="week" variant="secondary" appearance="outline" size="small">
                  Week
                </Button>
                <Button value="month" variant="secondary" appearance="outline" size="small">
                  Month
                </Button>
              </ButtonGroup>
              <Button
                iconStart={<Plus />}
                onClick={() => toast({ title: 'Event added', tone: 'success' })}
              >
                Add event
              </Button>
            </>
          }
        />

        <div className="calendar">
          <aside className="calendar__side" aria-label="Calendars">
            <section className="panel">
              <Calendar
                value={date}
                onValueChange={setDate}
                today={new Date(2026, 9, 15)}
                defaultMonth={new Date(2026, 9, 1)}
              />
            </section>
            <section className="panel" aria-labelledby="cal-list-title">
              <h2 className="calendar__h2" id="cal-list-title">
                My calendars
              </h2>
              <ul className="list-reset">
                {calendars.map((c) => (
                  <li key={c.id} className="row row--between">
                    <Badge tone={c.tone} shape="modern" withDot>
                      {c.label}
                    </Badge>
                    <Switch aria-label={`Show ${c.label}`} size="small" defaultChecked />
                  </li>
                ))}
              </ul>
            </section>
            <section className="panel" aria-labelledby="next-title">
              <h2 className="calendar__h2" id="next-title">
                Up next
              </h2>
              <ul className="list-reset">
                {meetings.slice(0, 3).map((m) => (
                  <li key={m.id} className="calendar__next">
                    <span className={`calendar__bar calendar__bar--${m.tone}`} aria-hidden="true" />
                    <span className="stack-text">
                      <strong className="text-sm">{m.title}</strong>
                      <span className="text-sm muted">
                        {m.day} · {m.time}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          <section
            className="panel panel--flush calendar__week"
            aria-label="Week of October 11, 2026"
          >
            <div className="calendar__scroll">
              <div className="calendar__grid">
                <div className="calendar__corner" />
                {weekDays.map((d, i) => (
                  <div
                    key={d}
                    className={['calendar__day', i === 4 && 'calendar__day--today']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {d}
                  </div>
                ))}
                {hours.map((h) => (
                  <div key={h} className="calendar__hour" style={{ gridRow: (h - 9) * 2 + 2 }}>
                    {label(h)}
                  </div>
                ))}
                {hours.map((h) =>
                  weekDays.map((_, d) => (
                    <div
                      key={`${h}-${d}`}
                      className="calendar__slot"

                      style={{ gridRow: `${(h - 9) * 2 + 2} / span 2`, gridColumn: d + 2 }}
                    />
                  )),
                )}
                {events.map((e) => (
                  <div
                    key={e.id}

                    className={`calendar__event calendar__event--${e.tone}`}
                    style={{
                      gridColumn: e.day + 2,
                      gridRow: `${Math.round((e.start - 9) * 2) + 2} / ${Math.round((e.end - 9) * 2) + 2}`,
                    }}
                  >
                    <strong>{e.title}</strong>
                    <span>
                      {label(Math.floor(e.start)).replace(' ', e.start % 1 ? ':30 ' : ':00 ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
