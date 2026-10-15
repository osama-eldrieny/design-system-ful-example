import {
  forwardRef,
  useId,
  useState,
  type FormEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '../Button';
import './PromptInput.css';

export type PromptInputSize = 'small' | 'medium';

export interface PromptInputProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'defaultValue' | 'onSubmit' | 'onChange'> {
  /** Names the prompt box for screen readers, e.g. "Message the assistant". */
  label: string;
  placeholder?: string;
  /** The text (controlled). */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called with the text when the prompt is sent (Enter, or the send button). */
  onSubmit?: (value: string) => void;
  /** Controls at the start of the bottom row, e.g. Attach and voice input. */
  tools?: ReactNode;
  /** Controls at the end, before the send button, e.g. a model picker. */
  actions?: ReactNode;
  /** Words for the send button. Default "Send". */
  submitLabel?: string;
  /** Shows a busy state on the send button and stops sending, e.g. while a reply is generated. */
  busy?: boolean;
  /** `small` for side panels, `medium` (default) for the main composer. */
  size?: PromptInputSize;
  /** Visible lines before the box scrolls. Default 3. */
  rows?: number;
  disabled?: boolean;
}

/**
 * A multi-line prompt box for chat and AI tools: text on top, tools and actions in a bottom row,
 * and a send button. Enter sends; Shift+Enter starts a new line.
 */
export const PromptInput = forwardRef<HTMLFormElement, PromptInputProps>(
  (
    {
      label,
      placeholder,
      value,
      defaultValue = '',
      onValueChange,
      onSubmit,
      tools,
      actions,
      submitLabel = 'Send',
      size = 'medium',
      rows = 3,
      disabled = false,
      busy = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [own, setOwn] = useState(defaultValue);
    const current = value ?? own;
    const id = useId();
    const empty = current.trim() === '';

    const change = (next: string) => {
      setOwn(next);
      onValueChange?.(next);
    };
    const send = () => {
      if (empty || disabled || busy) return;
      onSubmit?.(current.trim());
      if (value === undefined) change('');
    };
    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
        event.preventDefault();
        send();
      }
    };
    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      send();
    };

    return (
      <form
        ref={ref}
        className={['ds-prompt-input', `ds-prompt-input--${size}`, disabled && 'ds-prompt-input--disabled', className]
          .filter(Boolean)
          .join(' ')}
        onSubmit={onFormSubmit}
        {...props}
      >
        <label htmlFor={id} className="ds-prompt-input__label">
          {label}
        </label>
        <textarea
          id={id}
          className="ds-prompt-input__field"
          rows={rows}
          placeholder={placeholder}
          value={current}
          disabled={disabled}
          onChange={(event) => change(event.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className="ds-prompt-input__bar">
          {tools && <div className="ds-prompt-input__tools">{tools}</div>}
          <div className="ds-prompt-input__end">
            {actions}
            <Button
              type="submit"
              iconStart={<ArrowUp />}
              loading={busy}
              disabled={empty || disabled}
              size={size === 'small' ? 'small' : 'medium'}
            >
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    );
  },
);
PromptInput.displayName = 'PromptInput';
