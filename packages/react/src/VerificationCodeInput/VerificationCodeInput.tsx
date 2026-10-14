import {
  forwardRef,
  Fragment,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import './VerificationCodeInput.css';

export interface VerificationCodeInputProps extends Omit<
  HTMLAttributes<HTMLFieldSetElement>,
  'onChange' | 'defaultValue'
> {
  /** What to enter, e.g. "Verification code". Names the group. */
  label: ReactNode;
  /** Number of characters. Default 6. */
  length?: number;
  /** The code (controlled). */
  value?: string;
  /** Starting code (uncontrolled). */
  defaultValue?: string;
  /** Called with the whole code on every change. */
  onValueChange?: (value: string) => void;
  /** Called once every box is filled, e.g. to submit. */
  onComplete?: (value: string) => void;
  /** `small` 64px, `medium` 80px (default), `large` 96px boxes. */
  size?: 'small' | 'medium' | 'large';
  /** Shows a dash after this many boxes, e.g. 3 for "123-456". */
  separatorAfter?: number;
  /** `numeric` (default) accepts digits and opens the number keypad; `text` accepts letters too. */
  mode?: 'numeric' | 'text';
  /** Placeholder in each empty box. Default "0". */
  placeholder?: string;
  /** Help text under the boxes. */
  description?: ReactNode;
  /** Error message; marks every box invalid. */
  error?: ReactNode;
  disabled?: boolean;
  /** Names each box for screen readers. Default "Character {n} of {length}". */
  digitLabel?: (index: number, length: number) => string;
  /** Form field name; the whole code is submitted in a hidden input. */
  name?: string;
}

/**
 * One box per character of a one-time code, e.g. sent by email or SMS. Typing moves to the
 * next box, Backspace goes back, and pasting fills every box.
 */
export const VerificationCodeInput = forwardRef<HTMLFieldSetElement, VerificationCodeInputProps>(
  (
    {
      label,
      length = 6,
      value,
      defaultValue = '',
      onValueChange,
      onComplete,
      size = 'medium',
      separatorAfter,
      mode = 'numeric',
      placeholder = '0',
      description,
      error,
      disabled,
      digitLabel = (i, n) => `Character ${i + 1} of ${n}`,
      name,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const [inner, setInner] = useState(defaultValue);
    const code = (value ?? inner).slice(0, length);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const allowed = mode === 'numeric' ? /\d/ : /[\da-z]/i;

    const commit = (next: string) => {
      const clean = next.slice(0, length);
      if (value === undefined) setInner(clean);
      onValueChange?.(clean);
      if (clean.length === length && !clean.includes(' ')) onComplete?.(clean);
    };

    const setAt = (index: number, char: string) => {
      const chars = code.padEnd(length, ' ').split('');
      chars[index] = char;
      commit(chars.join('').trimEnd());
    };

    const focus = (index: number) => {
      const target = inputs.current[Math.max(0, Math.min(length - 1, index))];
      target?.focus();
      target?.select();
    };

    const onInput = (index: number, raw: string) => {
      const chars = [...raw].filter((c) => allowed.test(c));
      if (!chars.length) return;
      if (chars.length > 1) {
        const merged = (code.padEnd(index, ' ').slice(0, index) + chars.join('')).slice(0, length);
        commit(merged);
        focus(merged.length);
        return;
      }
      setAt(index, chars[0]);
      focus(index + 1);
    };

    const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Backspace') {
        event.preventDefault();
        if (code[index] && code[index] !== ' ') setAt(index, ' ');
        else if (index > 0) {
          setAt(index - 1, ' ');
          focus(index - 1);
        }
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
        const forward = (event.key === 'ArrowRight') !== rtl;
        focus(index + (forward ? 1 : -1));
      } else if (event.key === 'Home') {
        event.preventDefault();
        focus(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        focus(length - 1);
      }
    };

    const onPaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      onInput(index, event.clipboardData.getData('text'));
    };

    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <fieldset
        ref={ref}
        className={[
          'ds-verification-code-input',
          size !== 'medium' && `ds-verification-code-input--${size}`,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        data-invalid={error ? '' : undefined}
        disabled={disabled}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
        {...props}
      >
        <legend className="ds-verification-code-input__label">{label}</legend>
        <div className="ds-verification-code-input__fields">
          {Array.from({ length }, (_, i) => (
            <Fragment key={i}>
              {separatorAfter !== undefined && i === separatorAfter && (
                <span className="ds-verification-code-input__separator" aria-hidden="true">
                  -
                </span>
              )}
              <input
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                className="ds-verification-code-input__digit"
                value={code[i] && code[i] !== ' ' ? code[i] : ''}
                placeholder={placeholder}
                inputMode={mode === 'numeric' ? 'numeric' : 'text'}
                autoComplete={i === 0 ? 'one-time-code' : 'off'}
                aria-label={digitLabel(i, length)}
                aria-invalid={error ? true : undefined}
                onChange={(e) => {
                  // Typing into a filled box gives two characters: keep the new one.
                  const raw = e.target.value;
                  const old = code[i];
                  onInput(
                    i,
                    raw.length === 2 && old && raw.includes(old) ? raw.replace(old, '') : raw,
                  );
                }}
                onKeyDown={(e) => onKeyDown(i, e)}
                onPaste={(e) => onPaste(i, e)}
                onFocus={(e) => e.target.select()}
              />
            </Fragment>
          ))}
        </div>
        {name && <input type="hidden" name={name} value={code.replace(/ /g, '')} />}
        {description && (
          <span className="ds-verification-code-input__description" id={descriptionId}>
            {description}
          </span>
        )}
        {error && (
          <span className="ds-verification-code-input__error" id={errorId}>
            {error}
          </span>
        )}
      </fieldset>
    );
  },
);
VerificationCodeInput.displayName = 'VerificationCodeInput';
