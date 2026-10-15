import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { File, X } from 'lucide-react';
import { FeaturedIcon } from '../FeaturedIcon';
import { IconButton } from '../Button';
import './Attachment.css';

export type AttachmentSize = 'small' | 'medium';

export interface AttachmentProps extends HTMLAttributes<HTMLDivElement> {
  /** The file name, e.g. "Guidelines.pdf". */
  name: string;
  /** Size or source shown under the name, e.g. "2.4 MB" or "Google Drive". */
  detail?: ReactNode;
  /** Icon for the file type. Default a generic file icon. */
  icon?: ReactNode;
  /** Makes the name a download link to this URL. */
  href?: string;
  /** Other controls at the end, e.g. a preview button. */
  actions?: ReactNode;
  /** Shows a remove button; called when it is pressed (e.g. before sending). */
  onRemove?: () => void;
  /** Words for the remove button. Default "Remove {name}". */
  removeLabel?: string;
  /** `small` in composers and chat, `medium` (default) in forms and lists. */
  size?: AttachmentSize;
}

/** A file attached to a message, a task or a form: its icon, name, detail and actions. */
export const Attachment = forwardRef<HTMLDivElement, AttachmentProps>(
  (
    {
      name,
      detail,
      icon = <File />,
      href,
      actions,
      onRemove,
      removeLabel,
      size = 'medium',
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={['ds-attachment', `ds-attachment--${size}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      <FeaturedIcon
        icon={icon}
        appearance="modern"
        shape="square"
        size={size === 'small' ? 'small' : 'medium'}
        className="ds-attachment__icon"
      />
      <span className="ds-attachment__text">
        {href ? (
          <a className="ds-attachment__name" href={href} download>
            {name}
          </a>
        ) : (
          <span className="ds-attachment__name">{name}</span>
        )}
        {detail && <span className="ds-attachment__detail">{detail}</span>}
      </span>
      {(actions || onRemove) && (
        <span className="ds-attachment__actions">
          {actions}
          {onRemove && (
            <IconButton
              icon={<X />}
              label={removeLabel ?? `Remove ${name}`}
              variant="secondary"
              appearance="ghost"
              size="xsmall"
              onClick={onRemove}
            />
          )}
        </span>
      )}
    </div>
  ),
);
Attachment.displayName = 'Attachment';
