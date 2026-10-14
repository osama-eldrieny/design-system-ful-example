import {
  forwardRef,
  useId,
  useState,
  type DragEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { CheckCircle2, FileText, Trash2, UploadCloud } from 'lucide-react';
import { IconButton } from '../Button';
import { FeaturedIcon } from '../FeaturedIcon';
import { Progress } from '../Progress';
import './FileUpload.css';

export interface FileUploadProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'children'
> {
  /** Called with the chosen or dropped files. */
  onFilesChange?: (files: File[]) => void;
  /** Main line in the zone. Default "Click to upload or drag and drop". */
  label?: ReactNode;
  /** Words of the label styled as the action. Default "Click to upload". */
  actionLabel?: ReactNode;
  /** Help under the label, e.g. "SVG, PNG or JPG (max. 800×400px)". */
  hint?: ReactNode;
  /** Uploaded or uploading files, as FileUploadItem elements, shown under the zone. */
  children?: ReactNode;
}

/**
 * A drop zone to pick or drag files, with a list of FileUploadItem rows showing each file’s
 * progress. Uploading itself is up to you: handle onFilesChange and update the items.
 */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      onFilesChange,
      label,
      actionLabel = 'Click to upload',
      hint,
      disabled,
      className,
      children,
      id,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const [dragging, setDragging] = useState(false);
    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      setDragging(false);
      if (disabled) return;
      onFilesChange?.(Array.from(event.dataTransfer.files));
    };
    return (
      <div
        className={['ds-file-upload', className].filter(Boolean).join(' ')}
        data-disabled={disabled ? '' : undefined}
      >
        <label
          htmlFor={inputId}
          className="ds-file-upload__zone"
          data-dragging={dragging ? '' : undefined}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <FeaturedIcon icon={<UploadCloud />} appearance="modern" shape="square" />
          <span>
            {label ?? (
              <>
                <span className="ds-file-upload__action">{actionLabel}</span> or drag and drop
              </>
            )}
          </span>
          {hint && <span>{hint}</span>}
          <input
            ref={ref}
            id={inputId}
            type="file"
            className="ds-file-upload__input"
            disabled={disabled}
            onChange={(e) => {
              onFilesChange?.(Array.from(e.target.files ?? []));
              e.target.value = '';
            }}
            {...props}
          />
        </label>
        {children && <ul className="ds-file-upload__list">{children}</ul>}
      </div>
    );
  },
);
FileUpload.displayName = 'FileUpload';

export interface FileUploadItemProps extends HTMLAttributes<HTMLLIElement> {
  /** File name. */
  name: string;
  /** Size, formatted, e.g. "200 KB". */
  size?: string;
  /** Upload progress, 0–100. Omit when done. */
  progress?: number;
  /** `uploading`, `complete` or `error`. Default: uploading while progress is set, else complete. */
  status?: 'uploading' | 'complete' | 'error';
  /** What went wrong, shown with status="error". */
  error?: ReactNode;
  /** Icon for the file type. Default a document. */
  icon?: ReactNode;
  /** Shows a delete button. */
  onRemove?: () => void;
  /** Accessible name of the delete button. Default "Remove {name}". */
  removeLabel?: string;
  /** Extra action after the text, e.g. "Try again" for errors. */
  action?: ReactNode;
}

/** One file in a FileUpload list: name, size, progress or result, and a delete button. */
export const FileUploadItem = forwardRef<HTMLLIElement, FileUploadItemProps>(
  (
    {
      name,
      size,
      progress,
      status,
      error,
      icon = <FileText />,
      onRemove,
      removeLabel,
      action,
      className,
      ...props
    },
    ref,
  ) => {
    const shown = status ?? (progress !== undefined && progress < 100 ? 'uploading' : 'complete');
    return (
      <li
        ref={ref}
        className={[
          'ds-file-upload-item',
          shown === 'error' && 'ds-file-upload-item--error',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <FeaturedIcon
          icon={icon}
          tone={shown === 'error' ? 'danger' : 'primary'}
          size="small"
          appearance="light"
          shape="square"
        />
        <div className="ds-file-upload-item__body">
          <div className="ds-file-upload-item__head">
            <span className="ds-file-upload-item__text">
              <span className="ds-file-upload-item__name">{name}</span>
              <span className="ds-file-upload-item__meta">
                {shown === 'error' ? (
                  <span className="ds-file-upload-item__error">{error ?? 'Upload failed'}</span>
                ) : (
                  <>
                    {size}
                    {shown === 'complete' && (
                      <span className="ds-file-upload-item__complete">
                        <CheckCircle2 aria-hidden="true" />
                        Complete
                      </span>
                    )}
                  </>
                )}
              </span>
            </span>
            {action}
            {onRemove && (
              <IconButton
                icon={<Trash2 />}
                label={removeLabel ?? `Remove ${name}`}
                variant="secondary"
                appearance="ghost"
                size="small"
                onClick={onRemove}
              />
            )}
          </div>
          {shown === 'uploading' && progress !== undefined && (
            <Progress
              label={`Uploading ${name}`}
              hideLabel
              value={progress}
              showValue
              valuePosition="end"
              size="small"
            />
          )}
        </div>
      </li>
    );
  },
);
FileUploadItem.displayName = 'FileUploadItem';
