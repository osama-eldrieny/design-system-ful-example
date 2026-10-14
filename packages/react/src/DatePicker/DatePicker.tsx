import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, IconButton } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import './DatePicker.css';

/* ------------------------------------------------------------------ dates */

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last));
};
const sameDay = (a?: Date | null, b?: Date | null) =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

/** First day of the week for a locale (0 Sunday … 6 Saturday). */
function weekStart(locale?: string): number {
  try {
    const info = new Intl.Locale(locale ?? navigator.language) as unknown as {
      getWeekInfo?: () => { firstDay: number };
      weekInfo?: { firstDay: number };
    };
    const first = info.getWeekInfo?.().firstDay ?? info.weekInfo?.firstDay;
    if (first) return first % 7;
  } catch {
    /* older browsers: fall through */
  }
  return 0;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/* --------------------------------------------------------------- calendar */

export interface CalendarProps {
  /** `single` (default) picks one date, `range` a start and an end. */
  mode?: 'single' | 'range';
  /** Selected date (single). */
  value?: Date | null;
  onValueChange?: (value: Date) => void;
  /** Selected range (range). */
  range?: DateRange;
  onRangeChange?: (range: DateRange) => void;
  /** Month shown first. Default: the selection or today. */
  defaultMonth?: Date;
  /** How many months side by side. Default 1; 2 suits ranges on wide screens. */
  months?: 1 | 2;
  /** Earliest and latest dates that can be picked. */
  min?: Date;
  max?: Date;
  /** Return true for dates that can't be picked, e.g. weekends. */
  isDateDisabled?: (date: Date) => boolean;
  /** BCP 47 locale for month and weekday names, e.g. "ar". Default: the browser’s. */
  locale?: string;
  /** Names for the month buttons, for translation. */
  labels?: { previous?: string; next?: string };
  /** "Today" for the date that is today. */
  today?: Date;
  className?: string;
}

/**
 * A month grid to pick a date or a range. Arrow keys move by day and week, Page Up/Down by
 * month, Home/End to the week’s start and end.
 */
export const Calendar = ({
  mode = 'single',
  value,
  onValueChange,
  range,
  onRangeChange,
  defaultMonth,
  months = 1,
  min,
  max,
  isDateDisabled,
  locale,
  labels = {},
  today = startOfDay(new Date()),
  className,
}: CalendarProps) => {
  const initial = defaultMonth ?? (mode === 'range' ? range?.start : value) ?? today;
  const [month, setMonth] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const [focused, setFocused] = useState<Date>(startOfDay(initial));
  const [hover, setHover] = useState<Date | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);
  const id = useId();
  const first = weekStart(locale);

  const monthFormat = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
    [locale],
  );
  const dayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    [locale],
  );
  const weekdayShort = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: 'short' }),
    [locale],
  );
  const dayNumber = useMemo(() => new Intl.DateTimeFormat(locale, { day: 'numeric' }), [locale]);

  const disabled = (d: Date) =>
    (min && d < startOfDay(min)) || (max && d > startOfDay(max)) || !!isDateDisabled?.(d);

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${key(focused)}"]`)?.focus();
  });

  const moveFocus = (next: Date) => {
    setFocused(next);
    const lastShown = addMonths(month, months - 1);
    if (next < month || next >= addMonths(lastShown, 1)) {
      setMonth(new Date(next.getFullYear(), next.getMonth(), 1));
    }
    shouldFocus.current = true;
  };

  const choose = (d: Date) => {
    if (disabled(d)) return;
    setFocused(d);
    if (mode === 'single') {
      onValueChange?.(d);
      return;
    }
    const { start, end } = range ?? { start: null, end: null };
    if (!start || end || d < start) onRangeChange?.({ start: d, end: null });
    else onRangeChange?.({ start, end: d });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, d: Date) => {
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const map: Record<string, () => Date> = {
      ArrowLeft: () => addDays(d, rtl ? 1 : -1),
      ArrowRight: () => addDays(d, rtl ? -1 : 1),
      ArrowUp: () => addDays(d, -7),
      ArrowDown: () => addDays(d, 7),
      PageUp: () => addMonths(d, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(d, event.shiftKey ? 12 : 1),
      Home: () => addDays(d, -((d.getDay() - first + 7) % 7)),
      End: () => addDays(d, 6 - ((d.getDay() - first + 7) % 7)),
    };
    const next = map[event.key];
    if (next) {
      event.preventDefault();
      moveFocus(next());
    }
  };

  const inRange = (d: Date) => {
    if (mode !== 'range' || !range?.start) return false;
    const end = range.end ?? hover;
    if (!end) return false;
    const [a, b] = range.start <= end ? [range.start, end] : [end, range.start];
    return d > a && d < b;
  };

  const renderMonth = (m: Date, index: number) => {
    const offset = (m.getDay() - first + 7) % 7;
    const gridStart = addDays(m, -offset);
    const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
    const weeks = Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7));
    const headingId = `${id}-heading-${index}`;
    return (
      <div className="ds-calendar__month" key={key(m)}>
        <div className="ds-calendar__header">
          {index === 0 ? (
            <IconButton
              icon={<ChevronLeft className="ds-calendar__chevron" />}
              label={labels.previous ?? 'Previous month'}
              variant="secondary"
              appearance="ghost"
              size="small"
              onClick={() => setMonth(addMonths(month, -1))}
            />
          ) : (
            <span />
          )}
          <span className="ds-calendar__heading" id={headingId} aria-live="polite">
            {monthFormat.format(m)}
          </span>
          {index === months - 1 ? (
            <IconButton
              icon={<ChevronRight className="ds-calendar__chevron" />}
              label={labels.next ?? 'Next month'}
              variant="secondary"
              appearance="ghost"
              size="small"
              onClick={() => setMonth(addMonths(month, 1))}
            />
          ) : (
            <span />
          )}
        </div>
        <table className="ds-calendar__grid" role="grid" aria-labelledby={headingId}>
          <thead>
            <tr>
              {weeks[0].map((d) => (
                <th
                  key={d.getDay()}
                  scope="col"
                  className="ds-calendar__weekday"
                  abbr={new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(d)}
                >
                  {weekdayShort.format(d)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, w) => (
              <tr key={w}>
                {week.map((d) => {
                  const outside = d.getMonth() !== m.getMonth();
                  if (outside && months > 1) return <td key={key(d)} />;
                  const selected =
                    mode === 'single'
                      ? sameDay(d, value)
                      : sameDay(d, range?.start) || sameDay(d, range?.end);
                  const isStart =
                    mode === 'range' && sameDay(d, range?.start) && !!(range?.end ?? hover);
                  const isEnd = mode === 'range' && sameDay(d, range?.end);
                  return (
                    <td
                      key={key(d)}
                      className={[
                        'ds-calendar__cell',
                        inRange(d) && 'ds-calendar__cell--in-range',
                        isStart && 'ds-calendar__cell--range-start',
                        isEnd && 'ds-calendar__cell--range-end',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <button
                        type="button"
                        data-day={key(d)}
                        className={[
                          'ds-calendar__day',
                          outside && 'ds-calendar__day--outside',
                          sameDay(d, today) && 'ds-calendar__day--today',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        tabIndex={sameDay(d, focused) ? 0 : -1}
                        aria-label={dayLabel.format(d)}
                        aria-pressed={selected}
                        aria-current={sameDay(d, today) ? 'date' : undefined}
                        disabled={disabled(d)}
                        onClick={() => choose(d)}
                        onKeyDown={(e) => onKeyDown(e, d)}
                        onPointerEnter={() => mode === 'range' && setHover(d)}
                        onFocus={() => mode === 'range' && setHover(d)}
                      >
                        {dayNumber.format(d)}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div
      ref={gridRef}
      className={['ds-calendar', className].filter(Boolean).join(' ')}
      onPointerLeave={() => setHover(null)}
    >
      {Array.from({ length: months }, (_, i) => renderMonth(addMonths(month, i), i))}
    </div>
  );
};

/* ----------------------------------------------------------------- pickers */

export interface DatePreset {
  label: string;
  /** The range (or date, as start) this preset picks. */
  range: DateRange;
}

const defaultFormat = (locale?: string) =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' });

export interface DatePickerProps extends Omit<CalendarProps, 'mode' | 'range' | 'onRangeChange'> {
  /** Names the trigger, e.g. "Due date". */
  label: string;
  /** Text on the trigger with no date. Default "Select date". */
  placeholder?: string;
  /** Formats the date on the trigger. */
  formatDate?: (date: Date) => string;
  /** `small` or `medium` (default) trigger. */
  size?: 'small' | 'medium';
  disabled?: boolean;
}

/** A button that opens a calendar to pick one date. */
export const DatePicker = ({
  label,
  placeholder = 'Select date',
  formatDate,
  size = 'medium',
  disabled,
  value,
  onValueChange,
  locale,
  ...calendar
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState<Date | null>(value ?? null);
  const current = value !== undefined ? value : inner;
  const format = formatDate ?? ((d: Date) => defaultFormat(locale).format(d));
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          appearance="outline"
          size={size}
          iconStart={<CalendarIcon />}
          disabled={disabled}
          aria-label={`${label}: ${current ? format(current) : placeholder}`}
        >
          {current ? format(current) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        aria-label={label}
        showClose={false}
        className="ds-date-picker__panel"
        align="start"
      >
        <Calendar
          {...calendar}
          locale={locale}
          value={current}
          onValueChange={(d) => {
            setInner(d);
            onValueChange?.(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export interface DateRangePickerProps extends Omit<
  CalendarProps,
  'mode' | 'value' | 'onValueChange' | 'range' | 'onRangeChange'
> {
  label: string;
  /** Applied range. */
  value?: DateRange;
  /** Called when people press Apply. */
  onValueChange?: (range: DateRange) => void;
  /** Quick choices in a side list, e.g. "Last 7 days". */
  presets?: DatePreset[];
  placeholder?: string;
  formatDate?: (date: Date) => string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  /** Button texts, for translation. */
  actionLabels?: { apply?: string; cancel?: string };
}

/**
 * A button that opens two months and optional presets to pick a date range; the range is
 * applied with Apply.
 */
export const DateRangePicker = ({
  label,
  value,
  onValueChange,
  presets,
  placeholder = 'Select dates',
  formatDate,
  size = 'medium',
  disabled,
  months = 2,
  locale,
  actionLabels = {},
  ...calendar
}: DateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState<DateRange>(value ?? { start: null, end: null });
  const current = value ?? applied;
  const [draft, setDraft] = useState<DateRange>(current);
  const format = formatDate ?? ((d: Date) => defaultFormat(locale).format(d));
  const text =
    current.start && current.end
      ? `${format(current.start)} – ${format(current.end)}`
      : placeholder;
  const presetActive = (p: DatePreset) =>
    sameDay(p.range.start, draft.start) && sameDay(p.range.end, draft.end);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setDraft(current);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          appearance="outline"
          size={size}
          iconStart={<CalendarIcon />}
          disabled={disabled}
          aria-label={`${label}: ${text}`}
        >
          {text}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        aria-label={label}
        showClose={false}
        className="ds-date-picker__panel"
        align="start"
      >
        <div className="ds-date-picker">
          {presets && (
            <ul className="ds-date-picker__presets" aria-label="Presets">
              {presets.map((p) => (
                <li key={p.label}>
                  <button
                    type="button"
                    className="ds-date-picker__preset"
                    aria-pressed={presetActive(p)}
                    onClick={() => setDraft(p.range)}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="ds-date-picker__main">
            <Calendar
              {...calendar}
              key={draft.start ? key(draft.start) : 'empty'}
              locale={locale}
              mode="range"
              months={months}
              range={draft}
              onRangeChange={setDraft}
            />
            <div className="ds-date-picker__footer">
              <span className="ds-date-picker__summary" aria-live="polite">
                {draft.start ? format(draft.start) : '—'} – {draft.end ? format(draft.end) : '—'}
              </span>
              <Button
                variant="secondary"
                appearance="outline"
                size="small"
                onClick={() => setOpen(false)}
              >
                {actionLabels.cancel ?? 'Cancel'}
              </Button>
              <Button
                size="small"
                disabled={!draft.start || !draft.end}
                onClick={() => {
                  setApplied(draft);
                  onValueChange?.(draft);
                  setOpen(false);
                }}
              >
                {actionLabels.apply ?? 'Apply'}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

/** Common presets relative to today: last 7, 30 and 90 days, this month, this year. */
export function datePresets(today = startOfDay(new Date())): DatePreset[] {
  return [
    { label: 'Today', range: { start: today, end: today } },
    { label: 'Last 7 days', range: { start: addDays(today, -6), end: today } },
    { label: 'Last 30 days', range: { start: addDays(today, -29), end: today } },
    { label: 'Last 90 days', range: { start: addDays(today, -89), end: today } },
    {
      label: 'This month',
      range: { start: new Date(today.getFullYear(), today.getMonth(), 1), end: today },
    },
    { label: 'This year', range: { start: new Date(today.getFullYear(), 0, 1), end: today } },
  ];
}
