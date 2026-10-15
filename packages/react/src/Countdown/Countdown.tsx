import { forwardRef, useEffect, useState, type HTMLAttributes } from 'react';
import './Countdown.css';

export type CountdownSize = 'small' | 'medium' | 'large';

export interface CountdownProps extends HTMLAttributes<HTMLElement> {
  /** Names what is counted down to, e.g. "Launch in". Read before the time. */
  label: string;
  /** The moment to count down to. */
  to: Date;
  /** The current time, for tests and static previews. Default: the live clock. */
  now?: Date;
  /** Words for the units. Default English. */
  units?: { days: string; hours: string; minutes: string; seconds: string };
  /** Words shown when the time has passed. Default "Done". */
  endedLabel?: string;
  /** `small` in cards, `medium` (default), `large` for a launch page. */
  size?: CountdownSize;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * A live countdown to a moment, shown as days, hours, minutes and seconds. It ticks every second
 * unless a fixed `now` is given.
 */
export const Countdown = forwardRef<HTMLElement, CountdownProps>(
  (
    {
      label,
      to,
      now,
      units = { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds' },
      endedLabel = 'Done',
      size = 'medium',
      className,
      ...props
    },
    ref,
  ) => {
    const [clock, setClock] = useState(() => new Date());
    useEffect(() => {
      if (now) return undefined;
      const timer = setInterval(() => setClock(new Date()), 1000);
      return () => clearInterval(timer);
    }, [now]);

    const current = now ?? clock;
    const remaining = Math.max(0, to.getTime() - current.getTime());
    const total = Math.floor(remaining / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    const ended = remaining === 0;
    const spoken = ended
      ? endedLabel
      : `${label} ${days} ${units.days}, ${hours} ${units.hours}, ${minutes} ${units.minutes}, ${seconds} ${units.seconds}`;

    return (
      <section
        ref={ref}
        className={['ds-countdown', `ds-countdown--${size}`, className].filter(Boolean).join(' ')}
        aria-label={spoken}
        {...props}
      >
        {ended ? (
          <span className="ds-countdown__ended">{endedLabel}</span>
        ) : (
          <ul className="ds-countdown__units" aria-hidden="true">
            {[
              [String(days), units.days],
              [pad(hours), units.hours],
              [pad(minutes), units.minutes],
              [pad(seconds), units.seconds],
            ].map(([value, unit]) => (
              <li key={unit} className="ds-countdown__unit">
                <strong className="ds-countdown__value">{value}</strong>
                <span className="ds-countdown__label">{unit}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  },
);
Countdown.displayName = 'Countdown';
