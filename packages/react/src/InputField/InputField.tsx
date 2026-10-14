import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Kbd } from '../Kbd';
import { Tooltip } from '../Tooltip';
import './InputField.css';

export type InputFieldSize = 'small' | 'medium' | 'large';

export interface InputFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix'
> {
  /** What to enter, e.g. "Email address". Always required: it is the field's accessible name. */
  label: ReactNode;
  /**
   * Hides the label visually but keeps it for screen readers. Only for fields whose purpose
   * is obvious from context, such as a search box with a search icon.
   */
  hideLabel?: boolean;
  /** Marks the field optional with text after the label. Use when most fields are required. */
  optional?: boolean;
  /** Text shown for optional fields. Default "(optional)". */
  optionalLabel?: string;
  /** Help text under the field, e.g. format hints. */
  description?: ReactNode;
  /** Error message. Marks the field invalid and replaces the success message. */
  error?: ReactNode;
  /** Confirmation message, e.g. "Username is available". */
  success?: ReactNode;
  /** `small` for dense UI, `medium` by default, `large` for prominent forms. */
  size?: InputFieldSize;
  /** Icon before the text, e.g. a search or mail icon. Hidden from screen readers. */
  iconStart?: ReactNode;
  /** Icon after the text. Hidden from screen readers. */
  iconEnd?: ReactNode;
  /** Shows a clear button while the (controlled) value isn't empty. Use with onClear. */
  clearable?: boolean;
  /** Called when the clear button is pressed; set the value to '' here. */
  onClear?: () => void;
  /** Accessible name of the clear button. Default "Clear". */
  clearLabel?: string;
  /**
   * A fixed part before the text, inside the border, e.g. "https://" or a country code. It is
   * read with the label. Pass an element (e.g. a small select) for an interactive addon.
   */
  prefix?: ReactNode;
  /** A fixed part after the text, e.g. ".com", "USD" or a unit. */
  suffix?: ReactNode;
  /** A keyboard shortcut hint at the end, e.g. "⌘K". Decorative. */
  shortcut?: string;
  /** Extra help shown in a tooltip from a ? icon at the end of the field. */
  hint?: ReactNode;
  /** Accessible name of the hint button. Default "More information". */
  hintLabel?: string;
}

/**
 * A single-line text field with a label and optional help, error or success message.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      hideLabel = false,
      optional = false,
      optionalLabel = '(optional)',
      description,
      error,
      success,
      size = 'medium',
      iconStart,
      iconEnd,
      clearable = false,
      onClear,
      clearLabel = 'Clear',
      prefix,
      suffix,
      shortcut,
      hint,
      hintLabel = 'More information',
      id,
      className,
      type = 'text',
      required,
      readOnly,
      disabled,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const descriptionId = description ? `${inputId}-description` : undefined;
    const messageId = error || success ? `${inputId}-message` : undefined;
    const prefixId = prefix ? `${inputId}-prefix` : undefined;
    const suffixId = suffix ? `${inputId}-suffix` : undefined;
    const showClear =
      clearable && !disabled && !readOnly && props.value !== undefined && props.value !== '';

    return (
      <div
        className={['ds-input-field', `ds-input-field--${size}`, className]
          .filter(Boolean)
          .join(' ')}
        data-invalid={error ? '' : undefined}
        data-success={!error && success ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        data-readonly={readOnly ? '' : undefined}
      >
        <label
          htmlFor={inputId}
          className={['ds-input-field__label', hideLabel && 'ds-input-field__label--hidden']
            .filter(Boolean)
            .join(' ')}
        >
          {label}
          {required && (
            <span className="ds-input-field__required" aria-hidden="true">
              {' '}
              *
            </span>
          )}
          {optional && !required && (
            <>
              {' '}
              <span className="ds-input-field__optional">{optionalLabel}</span>
            </>
          )}
        </label>
        <div
          className={[
            'ds-input-field__control',
            prefix && 'ds-input-field__control--prefixed',
            suffix && 'ds-input-field__control--suffixed',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {prefix && (
            <span className="ds-input-field__addon ds-input-field__addon--start" id={prefixId}>
              {prefix}
            </span>
          )}
          {iconStart && (
            <span className="ds-input-field__icon" aria-hidden="true">
              {iconStart}
            </span>
          )}
          <input
            ref={inputRef}
            id={inputId}
            type={type}
            className="ds-input-field__input"
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              [prefixId, suffixId, descriptionId, messageId].filter(Boolean).join(' ') || undefined
            }
            {...props}
          />
          {showClear && (
            <button
              type="button"
              className="ds-input-field__clear"
              aria-label={clearLabel}
              title={clearLabel}
              onClick={() => {
                onClear?.();
                inputRef.current?.focus();
              }}
            >
              <X aria-hidden="true" />
            </button>
          )}
          {iconEnd && (
            <span className="ds-input-field__icon" aria-hidden="true">
              {iconEnd}
            </span>
          )}
          {shortcut && (
            <Kbd className="ds-input-field__shortcut" aria-hidden="true">
              {shortcut}
            </Kbd>
          )}
          {hint && (
            <Tooltip content={hint}>
              <button type="button" className="ds-input-field__hint" aria-label={hintLabel}>
                <HelpCircle aria-hidden="true" />
              </button>
            </Tooltip>
          )}
          {suffix && (
            <span className="ds-input-field__addon ds-input-field__addon--end" id={suffixId}>
              {suffix}
            </span>
          )}
        </div>
        {description && (
          <span className="ds-input-field__description" id={descriptionId}>
            {description}
          </span>
        )}
        {(error || success) && (
          <span
            className={`ds-input-field__message ds-input-field__message--${error ? 'error' : 'success'}`}
            id={messageId}
          >
            {error ?? success}
          </span>
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputField';
