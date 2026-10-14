import { forwardRef, type OlHTMLAttributes, type ReactNode } from 'react';
import { Avatar } from '../Avatar';
import { FeaturedIcon, type FeaturedIconColor } from '../FeaturedIcon';
import './ActivityFeed.css';

export interface ActivityFeedItem {
  id: string | number;
  /** What happened. Use <strong> for names, e.g. <><strong>Olivia</strong> added a file</>. */
  title: ReactNode;
  /** When, e.g. "2 min ago". Use a <time> element for a machine-readable date. */
  time?: ReactNode;
  /** The person who did it; shows their avatar. */
  avatar?: { name: string; src?: string };
  /** An icon instead of an avatar, e.g. for system events. */
  icon?: ReactNode;
  /** Color of the icon. Default primary. */
  iconTone?: FeaturedIconColor;
  /** Extra content under the title: a comment, file or link, shown in a box. */
  content?: ReactNode;
  /** Marks the item new, with a dot. Announced as "Unread". */
  unread?: boolean;
}

export interface ActivityFeedProps extends Omit<OlHTMLAttributes<HTMLOListElement>, 'children'> {
  items: ActivityFeedItem[];
  /**
   * `connected` (default) a line joins the markers like a timeline, `divided` lines between
   * items, `plain` neither.
   */
  appearance?: 'connected' | 'divided' | 'plain';
  /** Word announced for unread items. Default "Unread". */
  unreadLabel?: string;
}

/** A list of recent events, newest first: who did what and when. */
export const ActivityFeed = forwardRef<HTMLOListElement, ActivityFeedProps>(
  ({ items, appearance = 'connected', unreadLabel = 'Unread', className, ...props }, ref) => (
    <ol
      ref={ref}
      className={['ds-activity-feed', `ds-activity-feed--${appearance}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {items.map((item) => (
        <li key={item.id} className="ds-activity-feed__item">
          {(item.avatar || item.icon) && (
            <span className="ds-activity-feed__marker">
              {item.avatar ? (
                <Avatar {...item.avatar} size="small" decorative />
              ) : (
                <FeaturedIcon icon={item.icon} tone={item.iconTone} size="small" />
              )}
            </span>
          )}
          <div className="ds-activity-feed__body">
            <div className="ds-activity-feed__head">
              <span className="ds-activity-feed__title">
                {item.unread && <span className="ds-activity-feed__hidden">{unreadLabel}: </span>}
                {item.title}
              </span>
              {item.time && <span className="ds-activity-feed__time">{item.time}</span>}
              {item.unread && <span className="ds-activity-feed__unread" aria-hidden="true" />}
            </div>
            {item.content && <div className="ds-activity-feed__content">{item.content}</div>}
          </div>
        </li>
      ))}
    </ol>
  ),
);
ActivityFeed.displayName = 'ActivityFeed';
