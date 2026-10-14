import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { X } from 'lucide-react';
import type { BadgeColor } from '../Badge';
import './Tag.css';

export type TagTone = BadgeColor;
export type TagSize = 'small' | 'medium' | 'large';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  /** Text of the tag; also names its remove button. */
  children: string;
  /** Color meaning or category hue. Default secondary (neutral). */
  tone?: TagTone;
  /** `small`, `medium` (default) or `large`. */
  size?: TagSize;
  /** A count after the text, e.g. how many items match a filter. */
  count?: number;
  /** Small round picture before the text, e.g. a person. Decorative. */
  image?: string;
  /** `subtle` (default) or `solid`. */
  appearance?: 'solid' | 'subtle';
  /** Decorative icon before the text. */
  icon?: ReactNode;
  /** Shows a remove button that calls this. */
  onRemove?: () => void;
  /** Accessible name of the remove button, for translation. Default "Remove {text}". */
  removeLabel?: string;
  /**
   * Makes the tag a toggle button, e.g. a filter chip. Pressed tags are solid with a border.
   * Use with onSelectedChange.
   */
  selected?: boolean;
  /** Called with the new pressed state of a selectable tag. */
  onSelectedChange?: (selected: boolean) => void;
  disabled?: boolean;
}

/** A compact label for a keyword or category, optionally removable or selectable. */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      tone = 'secondary',
      size = 'medium',
      count,
      image,
      appearance = 'subtle',
      icon,
      onRemove,
      removeLabel,
      selected,
      onSelectedChange,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const selectable = selected !== undefined || onSelectedChange !== undefined;
    const look = selectable && selected ? 'solid' : appearance;
    const content = (
      <>
        {icon && (
          <span className="ds-tag__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {image && <img className="ds-tag__image" src={image} alt="" />}
        {children}
        {count !== undefined && <span className="ds-tag__count">{count}</span>}
      </>
    );
    return (
      <span
        ref={ref}
        className={[
          'ds-tag',
          `ds-tag--${tone}-${look}`,
          size !== 'medium' && `ds-tag--${size}`,
          selectable && 'ds-tag--selectable',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        data-disabled={disabled ? '' : undefined}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {selectable ? (
          <button
            type="button"
            className="ds-tag__toggle"
            aria-pressed={!!selected}
            disabled={disabled}
            onClick={() => onSelectedChange?.(!selected)}
          >
            {content}
          </button>
        ) : (
          content
        )}
        {onRemove && (
          <button
            type="button"
            className="ds-tag__remove"
            aria-label={removeLabel ?? `Remove ${children}`}
            disabled={disabled}
            onClick={onRemove}
          >
            <X aria-hidden="true" />
          </button>
        )}
      </span>
    );
  },
);
Tag.displayName = 'Tag';
