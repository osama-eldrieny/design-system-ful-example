import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Avatar } from '../Avatar';
import { FeaturedIcon, type FeaturedIconColor } from '../FeaturedIcon';
import { IconButton } from '../Button';
import './NotificationCard.css';

export interface NotificationCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** The notice in a few words, e.g. "Lana replied to your comment". */
  title: ReactNode;
  /** Optional second line with the detail. */
  description?: ReactNode;
  /** When it happened, e.g. "2 mins ago". */
  time?: ReactNode;
  /** Who it is from; shows their avatar. */
  avatar?: { name: string; src?: string; status?: 'online' | 'offline' };
  /** An icon instead of an avatar, e.g. for system notices. */
  icon?: ReactNode;
  /** Colour of the icon tile. Default primary. */
  iconTone?: FeaturedIconColor;
  /** Buttons such as Reply and Dismiss, shown under the text. */
  actions?: ReactNode;
  /** Shows a close button; called when it is pressed. */
  onDismiss?: () => void;
  /** Words for the close button. Default "Dismiss notification". */
  dismissLabel?: string;
  /** Marks the notice as new: tinted and with a dot. */
  unread?: boolean;
}

/**
 * A single notice about something that happened: who or what it is from, what it says, when,
 * and the actions to take. Use it in notification lists and feeds.
 */
export const NotificationCard = forwardRef<HTMLElement, NotificationCardProps>(
  (
    {
      title,
      description,
      time,
      avatar,
      icon,
      iconTone = 'primary',
      actions,
      onDismiss,
      dismissLabel = 'Dismiss notification',
      unread = false,
      className,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();
    return (
      <article
        ref={ref}
        aria-labelledby={titleId}
        className={['ds-notification-card', unread && 'ds-notification-card--unread', className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {(avatar || icon) && (
          <span className="ds-notification-card__media">
            {avatar ? (
              <Avatar name={avatar.name} src={avatar.src} status={avatar.status} size="small" decorative />
            ) : (
              <FeaturedIcon icon={icon} tone={iconTone} appearance="modern" shape="square" size="small" />
            )}
          </span>
        )}
        <div className="ds-notification-card__body">
          <div className="ds-notification-card__head">
            <span id={titleId} className="ds-notification-card__title">
              {title}
            </span>
            {time && <time className="ds-notification-card__time">{time}</time>}
          </div>
          {description && <p className="ds-notification-card__description">{description}</p>}
          {actions && <div className="ds-notification-card__actions">{actions}</div>}
        </div>
        {onDismiss && (
          <IconButton
            icon={<X />}
            label={dismissLabel}
            variant="secondary"
            appearance="ghost"
            size="xsmall"
            className="ds-notification-card__dismiss"
            onClick={onDismiss}
          />
        )}
      </article>
    );
  },
);
NotificationCard.displayName = 'NotificationCard';
