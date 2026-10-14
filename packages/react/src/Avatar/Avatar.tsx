import {
  Children,
  forwardRef,
  isValidElement,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Check, Plus, User } from 'lucide-react';
import './Avatar.css';

export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
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
  /**
   * `xsmall` 20px for inline mentions, `small` 24px for dense lists, `medium` 38px, `large`
   * 56px, `xlarge` 80px for profiles.
   */
  size?: AvatarSize;
  /** Shows a verified check mark. Announced after the name. */
  verified?: boolean;
  /** Replaces the default "Verified" wording, e.g. for translation. */
  verifiedLabel?: string;
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
    {
      name,
      src,
      size = 'medium',
      status,
      statusLabel,
      verified = false,
      verifiedLabel = 'Verified',
      decorative = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);
    const showImage = Boolean(src) && failedSrc !== src;
    const initials = initialsOf(name);
    // An empty name would leave the image unnamed; announce something generic instead.
    const who = name.trim() || 'Unknown person';
    const label = [who, verified && verifiedLabel, status && (statusLabel ?? STATUS_LABELS[status])]
      .filter(Boolean)
      .join(', ');

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
        {verified ? (
          <span className="ds-avatar__verified" aria-hidden="true">
            <Check strokeWidth={3} />
          </span>
        ) : (
          status && (
            <span className={`ds-avatar__status ds-avatar__status--${status}`} aria-hidden="true" />
          )
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
  /** Shows a dashed “add” button after the avatars, e.g. to invite someone. */
  onAdd?: () => void;
  /** Accessible name of the add button. Default "Add person". */
  addLabel?: string;
  /** Avatar elements. */
  children: ReactNode;
}

/** Overlapping avatars for a set of people, with a count of the rest. */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { label, max, size = 'small', onAdd, addLabel = 'Add person', className, children, ...props },
    ref,
  ) => {
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
        className={['ds-avatar-group', `ds-avatar-group--${size}`, className]
          .filter(Boolean)
          .join(' ')}
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
        {onAdd && (
          <button
            type="button"
            className="ds-avatar-group__add"
            aria-label={addLabel}
            onClick={onAdd}
          >
            <Plus aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';

export interface AvatarLabelGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The person's name, shown in bold. */
  name: string;
  /** Supporting text under the name, e.g. an email address or a role. */
  supportingText?: ReactNode;
  /** Photo URL. */
  src?: string;
  /** Size of the avatar; the text scales with it. Default medium. */
  size?: Exclude<AvatarSize, 'xsmall'>;
  /** Presence dot. */
  status?: AvatarStatus;
  /** Verified check mark. */
  verified?: boolean;
}

/** An avatar with a name and supporting text, e.g. in a table cell, menu or sidebar footer. */
export const AvatarLabelGroup = forwardRef<HTMLDivElement, AvatarLabelGroupProps>(
  ({ name, supportingText, src, size = 'medium', status, verified, className, ...props }, ref) => (
    <div
      ref={ref}
      className={['ds-avatar-label-group', `ds-avatar-label-group--${size}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Avatar name={name} src={src} size={size} status={status} verified={verified} decorative />
      <span className="ds-avatar-label-group__text">
        <span className="ds-avatar-label-group__name">{name}</span>
        {supportingText && (
          <span className="ds-avatar-label-group__supporting">{supportingText}</span>
        )}
      </span>
    </div>
  ),
);

AvatarLabelGroup.displayName = 'AvatarLabelGroup';
