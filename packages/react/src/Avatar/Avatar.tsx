import {
  Children,
  forwardRef,
  isValidElement,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { User } from 'lucide-react';
import './Avatar.css';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

const STATUS_LABELS: Record<AvatarStatus, string> = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
};

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The person's (or team's) name. Used as the accessible name and for the initials fallback. */
  name: string;
  /** Photo URL. If it's missing or fails to load, initials are shown instead. */
  src?: string;
  /** `small` 24px for dense lists, `medium` 38px, `large` 56px, `xlarge` 80px for profiles. */
  size?: AvatarSize;
  /** Presence dot. Announced after the name, e.g. "Sarah Chen, Online". */
  status?: AvatarStatus;
  /** Replaces the default status wording, e.g. for translation. */
  statusLabel?: string;
  /**
   * Hides the avatar from screen readers. Use when the name is already shown as text right
   * next to it, so it isn't read twice.
   */
  decorative?: boolean;
}

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

/**
 * A person's or team's picture, with initials or an icon as the fallback.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { name, src, size = 'medium', status, statusLabel, decorative = false, className, ...props },
    ref,
  ) => {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);
    const showImage = Boolean(src) && failedSrc !== src;
    const initials = initialsOf(name);
    // An empty name would leave the image unnamed; announce something generic instead.
    const who = name.trim() || 'Unknown person';
    const label = status ? `${who}, ${statusLabel ?? STATUS_LABELS[status]}` : who;

    return (
      <span
        ref={ref}
        className={['ds-avatar', `ds-avatar--${size}`, className].filter(Boolean).join(' ')}
        {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': label })}
        {...props}
      >
        <span className="ds-avatar__frame">
          {showImage ? (
            <img className="ds-avatar__image" src={src} alt="" onError={() => setFailedSrc(src!)} />
          ) : initials ? (
            <span className="ds-avatar__initials" aria-hidden="true">
              {initials}
            </span>
          ) : (
            <User className="ds-avatar__icon" aria-hidden="true" />
          )}
        </span>
        {status && (
          <span className={`ds-avatar__status ds-avatar__status--${status}`} aria-hidden="true" />
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** What the group represents, e.g. "Meeting attendees". Announced before the avatars. */
  label: string;
  /** Show at most this many avatars, then a "+N" count. */
  max?: number;
  /** Size for every avatar in the group. */
  size?: AvatarSize;
  /** Avatar elements. */
  children: ReactNode;
}

/** Overlapping avatars for a set of people, with a count of the rest. */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ label, max, size = 'small', className, children, ...props }, ref) => {
    const avatars = Children.toArray(children).filter(
      isValidElement,
    ) as ReactElement<AvatarProps>[];
    const shown = max !== undefined ? avatars.slice(0, max) : avatars;
    const hidden = avatars.length - shown.length;
    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={['ds-avatar-group', className].filter(Boolean).join(' ')}
        {...props}
      >
        {shown.map((avatar, i) => (
          <Avatar key={avatar.key ?? i} {...avatar.props} size={size} />
        ))}
        {hidden > 0 && (
          <span
            className={`ds-avatar ds-avatar--${size} ds-avatar--more`}
            role="img"
            aria-label={`and ${hidden} more`}
          >
            <span className="ds-avatar__frame">
              <span className="ds-avatar__initials" aria-hidden="true">
                +{hidden}
              </span>
            </span>
          </span>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
