import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Avatar, AvatarGroup } from '../Avatar';
import './MeetingCard.css';

export type MeetingCardVariant = 'primary' | 'success' | 'warning' | 'danger';

export interface MeetingAttendee {
  /** Full name. Used for initials and announced by screen readers. */
  name: string;
  /** Photo URL. Without it, initials show. */
  src?: string;
}

export interface MeetingCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Meeting name. */
  title: ReactNode;
  /** When it happens, formatted for display, e.g. "10:00 – 11:00". */
  time: ReactNode;
  /** Machine-readable time for `<time dateTime>`, e.g. "2026-09-29T10:00". */
  dateTime?: string;
  /**
   * Color of the card. Pick by meaning and say it in the title or time as well:
   * `primary` (default) a regular meeting, `success` confirmed or done, `warning` needs
   * attention, e.g. it's about to start, `danger` cancelled or clashing.
   */
  variant?: MeetingCardVariant;
  /** People attending, shown as overlapping avatars. */
  attendees?: MeetingAttendee[];
  /** Show at most this many avatars, then a "+N" count. Default 4. */
  maxAttendees?: number;
  /** Name of the avatar group for screen readers. Default "Attendees". */
  attendeesLabel?: string;
  /** Heading level that fits the page outline. Default h3. */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/** A meeting or event in an agenda: title, time and attendees, color-coded by status. */
export const MeetingCard = forwardRef<HTMLElement, MeetingCardProps>(
  (
    {
      title,
      time,
      dateTime,
      variant = 'primary',
      attendees = [],
      maxAttendees = 4,
      attendeesLabel = 'Attendees',
      titleAs: Heading = 'h3',
      className,
      ...props
    },
    ref,
  ) => (
    <article
      ref={ref}
      className={['ds-meeting-card', `ds-meeting-card--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <div className="ds-meeting-card__info">
        <Heading className="ds-meeting-card__title">{title}</Heading>
        <p className="ds-meeting-card__time">
          {dateTime ? <time dateTime={dateTime}>{time}</time> : time}
        </p>
      </div>
      {attendees.length > 0 && (
        <AvatarGroup label={attendeesLabel} max={maxAttendees} size="small">
          {attendees.map((person, i) => (
            <Avatar key={`${person.name}-${i}`} name={person.name} src={person.src} />
          ))}
        </AvatarGroup>
      )}
    </article>
  ),
);
MeetingCard.displayName = 'MeetingCard';
