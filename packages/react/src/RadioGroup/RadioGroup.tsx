import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as RadioPrimitive from '@radix-ui/react-radio-group';
import './RadioGroup.css';

export interface RadioGroupProps extends Omit<
  ComponentPropsWithoutRef<typeof RadioPrimitive.Root>,
  'asChild'
> {
  /** Visible group label, e.g. "Time period". Without it, pass aria-label. */
  label?: ReactNode;
  /** Extra detail under the group label. */
  description?: ReactNode;
  /** Error message. Marks the group invalid and is announced with it. */
  error?: ReactNode;
  /** Selected value (controlled). Use with onValueChange. */
  value?: string;
  /** Initially selected value when uncontrolled. */
  defaultValue?: string;
  /** Called with the new value when the selection changes. */
  onValueChange?: (value: string) => void;
  /** `vertical` (default) stacks options; `horizontal` puts two or three short options in a row. */
  orientation?: 'vertical' | 'horizontal';
  /** The Radio options. */
  children: ReactNode;
}

/**
 * A set of options where exactly one can be chosen. Arrow keys move between options; the
 * group is a single Tab stop.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ label, description, error, orientation = 'vertical', className, children, ...props }, ref) => {
    const id = useId();
    const labelId = label ? `${id}-label` : undefined;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div
        className={['ds-radio-group', className].filter(Boolean).join(' ')}
        data-invalid={error ? '' : undefined}
      >
        {label && (
          <span className="ds-radio-group__label" id={labelId}>
            {label}
          </span>
        )}
        {description && (
          <span className="ds-radio-group__description" id={descriptionId}>
            {description}
          </span>
        )}
        <RadioPrimitive.Root
          ref={ref}
          orientation={orientation}
          className={`ds-radio-group__options ds-radio-group__options--${orientation}`}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          {...props}
        >
          {children}
        </RadioPrimitive.Root>
        {error && (
          <span className="ds-radio-group__error" id={errorId}>
            {error}
          </span>
        )}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export interface RadioProps extends Omit<
  ComponentPropsWithoutRef<typeof RadioPrimitive.Item>,
  'asChild' | 'children'
> {
  /** The value this option selects. */
  value: string;
  /** Visible option label; clicking it selects the option. */
  label: ReactNode;
  /** Extra detail under the label. */
  description?: ReactNode;
}

/** One option inside a RadioGroup. */
export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ label, description, id, className, ...props }, ref) => {
    const autoId = useId();
    const radioId = id ?? autoId;
    const descriptionId = description ? `${radioId}-description` : undefined;
    return (
      <div
        className={['ds-radio', className].filter(Boolean).join(' ')}
        data-disabled={props.disabled ? '' : undefined}
      >
        <RadioPrimitive.Item
          ref={ref}
          id={radioId}
          className="ds-radio__control"
          aria-describedby={descriptionId}
          {...props}
        >
          <RadioPrimitive.Indicator className="ds-radio__dot" />
        </RadioPrimitive.Item>
        <span className="ds-radio__text">
          <label className="ds-radio__label" htmlFor={radioId}>
            {label}
          </label>
          {description && (
            <span className="ds-radio__description" id={descriptionId}>
              {description}
            </span>
          )}
        </span>
      </div>
    );
  },
);

Radio.displayName = 'Radio';
