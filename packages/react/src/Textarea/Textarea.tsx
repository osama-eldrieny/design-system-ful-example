import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { FormField } from '../FormField';
import './Textarea.css';

export type TextareaSize = 'small' | 'medium' | 'large';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** What to write, e.g. "Message". Always required: it names the field. */
  label: ReactNode;
  /** Hides the label visually but keeps it for screen readers. */
  hideLabel?: boolean;
  /** Help text under the field, e.g. what to include. */
  description?: ReactNode;
  /** Error message. Marks the field invalid. */
  error?: ReactNode;
  /** Confirmation message. */
  success?: ReactNode;
  /** Marks the field optional with text after the label. */
  optional?: boolean;
  /** `small` for dense UI, `medium` by default, `large` for prominent forms. */
  size?: TextareaSize;
  /** Grows with its content from `rows` lines up to `maxRows`, instead of scrolling. */
  autoResize?: boolean;
  /** With autoResize, the most lines before it scrolls. */
  maxRows?: number;
  /** Shows a character counter. Needs maxLength. */
  showCount?: boolean;
  /** Counter text, for translation. Default "12 / 200". */
  countLabel?: (count: number, max: number) => string;
  /** What screen readers hear after typing pauses. Default "188 characters left". */
  remainingLabel?: (remaining: number) => string;
}

const defaultCount = (count: number, max: number) => `${count} / ${max}`;
const defaultRemaining = (remaining: number) =>
  `${remaining} ${remaining === 1 ? 'character' : 'characters'} left`;

/** A multi-line text field with a label, help text, messages and an optional counter. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hideLabel,
      description,
      error,
      success,
      optional,
      size = 'medium',
      autoResize = false,
      maxRows,
      showCount = false,
      countLabel = defaultCount,
      remainingLabel = defaultRemaining,
      rows = 3,
      maxLength,
      id,
      className,
      required,
      disabled,
      readOnly,
      onChange,
      style,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLTextAreaElement);

    const initial = String(props.value ?? props.defaultValue ?? '');
    const [count, setCount] = useState(initial.length);
    const [announcement, setAnnouncement] = useState('');
    const typed = useRef(false);
    const controlledLength = props.value === undefined ? undefined : String(props.value).length;
    const length = controlledLength ?? count;
    const counting = showCount && maxLength !== undefined;

    // Announce what's left once typing pauses, not on every keystroke.
    useEffect(() => {
      if (!counting || !typed.current) return;
      const timer = setTimeout(() => setAnnouncement(remainingLabel(maxLength - length)), 700);
      return () => clearTimeout(timer);
    }, [counting, length, maxLength, remainingLabel]);

    // Grow to fit the content between `rows` and `maxRows` lines.
    useLayoutEffect(() => {
      const el = inputRef.current;
      if (!autoResize || !el) return;
      el.style.height = 'auto';
      const styles = getComputedStyle(el);
      const px = (value: string) => Number.parseFloat(value) || 0;
      const border = px(styles.borderBlockStartWidth) + px(styles.borderBlockEndWidth);
      const padding = px(styles.paddingBlockStart) + px(styles.paddingBlockEnd);
      // border-box: scrollHeight covers content and padding; add the borders.
      const needed = el.scrollHeight + border;
      const max = maxRows ? maxRows * px(styles.lineHeight) + padding + border : Infinity;
      el.style.height = `${Math.min(needed, max)}px`;
      el.style.overflowY = needed > max ? 'auto' : 'hidden';
    });

    return (
      <FormField
        id={id}
        label={label}
        hideLabel={hideLabel}
        description={description}
        error={error}
        success={success}
        required={required}
        optional={optional}
        disabled={disabled}
        className={[
          'ds-textarea',
          `ds-textarea--${size}`,
          readOnly && 'ds-textarea--readonly',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
      >
        {(control) => (
          <>
            <textarea
              ref={inputRef}
              className="ds-textarea__input"
              rows={rows}
              maxLength={maxLength}
              readOnly={readOnly}
              {...control}
              aria-describedby={
                [control['aria-describedby'], counting && `${control.id}-count`]
                  .filter(Boolean)
                  .join(' ') || undefined
              }
              onChange={(event) => {
                typed.current = true;
                setCount(event.target.value.length);
                onChange?.(event);
              }}
              {...props}
            />
            {counting && (
              <div className="ds-textarea__footer">
                <span
                  className="ds-textarea__counter"
                  id={`${control.id}-count`}
                  data-over={length >= maxLength ? '' : undefined}
                >
                  {countLabel(length, maxLength)}
                </span>
                <span className="ds-textarea__live" role="status">
                  {announcement}
                </span>
              </div>
            )}
          </>
        )}
      </FormField>
    );
  },
);
Textarea.displayName = 'Textarea';
