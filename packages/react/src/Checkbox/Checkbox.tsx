import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { Check, Minus } from 'lucide-react';
import { FormField, type FormFieldProps } from '../FormField';
import './Checkbox.css';

export type CheckboxSize = 'small' | 'medium' | 'large';

interface GroupContext {
  values: string[];
  toggle: (value: string, checked: boolean) => void;
  size: CheckboxSize;
  name?: string;
}

const CheckboxGroupContext = createContext<GroupContext | null>(null);

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'checked' | 'defaultChecked'
> {
  /** Visible label; clicking it toggles the box. Without it, pass aria-label. */
  label?: ReactNode;
  /** Extra detail under the label. */
  description?: ReactNode;
  /** Error for a single checkbox, e.g. “Accept the terms to continue”. Marks it invalid. */
  error?: ReactNode;
  /** Checked (controlled). Use with onCheckedChange. */
  checked?: boolean;
  /** Initially checked when uncontrolled. */
  defaultChecked?: boolean;
  /** Called with the new checked state. */
  onCheckedChange?: (checked: boolean) => void;
  /** Shows a dash for “some but not all”, e.g. a select-all box. Announced as “mixed”. */
  indeterminate?: boolean;
  /** `small` for dense lists, `medium` by default, `large` for touch-first forms. */
  size?: CheckboxSize;
  /** Value submitted with the form, and the id of this option inside a CheckboxGroup. */
  value?: string;
}

/**
 * A box people tick to turn one option on or off, or to pick several options from a list.
 * The change applies when the form is submitted; for immediate effect, use a Switch.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      checked,
      defaultChecked,
      onCheckedChange,
      onChange,
      indeterminate = false,
      size,
      value,
      id,
      className,
      style,
      disabled,
      name,
      ...props
    },
    ref,
  ) => {
    const group = useContext(CheckboxGroupContext);
    const autoId = useId();
    const inputId = id ?? autoId;
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // indeterminate is a DOM property, not an attribute.
    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    });

    const inGroup = group !== null && value !== undefined;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const resolvedSize = size ?? group?.size ?? 'medium';

    return (
      <div
        className={['ds-checkbox', `ds-checkbox--${resolvedSize}`, className]
          .filter(Boolean)
          .join(' ')}
        style={style}
        data-disabled={disabled ? '' : undefined}
        data-invalid={error ? '' : undefined}
      >
        <span className="ds-checkbox__control">
          <input
            ref={inputRef}
            id={inputId}
            type="checkbox"
            className="ds-checkbox__input"
            name={name ?? group?.name}
            value={value}
            disabled={disabled}
            checked={inGroup ? group.values.includes(value) : checked}
            defaultChecked={inGroup ? undefined : defaultChecked}
            aria-invalid={error ? true : undefined}
            aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
            onChange={(event) => {
              if (inGroup) group.toggle(value, event.target.checked);
              onCheckedChange?.(event.target.checked);
              onChange?.(event);
            }}
            {...props}
          />
          <span className="ds-checkbox__box" aria-hidden="true">
            <Check className="ds-checkbox__check" />
            <Minus className="ds-checkbox__dash" />
          </span>
        </span>
        {label && (
          <span className="ds-checkbox__text">
            <label className="ds-checkbox__label" htmlFor={inputId}>
              {label}
            </label>
            {description && (
              <span className="ds-checkbox__description" id={descriptionId}>
                {description}
              </span>
            )}
            {error && (
              <span className="ds-checkbox__error" id={errorId}>
                {error}
              </span>
            )}
          </span>
        )}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export interface CheckboxGroupProps extends Omit<
  FormFieldProps,
  'group' | 'children' | 'defaultValue' | 'onChange'
> {
  /** Checked values (controlled). Use with onValueChange. */
  value?: string[];
  /** Initially checked values when uncontrolled. */
  defaultValue?: string[];
  /** Called with the new list of checked values. */
  onValueChange?: (value: string[]) => void;
  /** `vertical` (default) stacks options; `horizontal` puts short options in a row. */
  orientation?: 'vertical' | 'horizontal';
  /** Size of every checkbox in the group. */
  size?: CheckboxSize;
  /** Form field name shared by the checkboxes. */
  name?: string;
  /** The Checkbox options, each with a value. */
  children: ReactNode;
}

/**
 * A set of checkboxes answering one question, e.g. “Which topics interest you?”. A fieldset
 * with a legend, help text and one error for the whole group.
 */
export const CheckboxGroup = forwardRef<HTMLElement, CheckboxGroupProps>(
  (
    {
      value,
      defaultValue = [],
      onValueChange,
      orientation = 'vertical',
      size = 'medium',
      name,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const values = value ?? uncontrolled;
    const toggle = (item: string, on: boolean) => {
      const next = on
        ? [...values.filter((v) => v !== item), item]
        : values.filter((v) => v !== item);
      setUncontrolled(next);
      onValueChange?.(next);
    };
    return (
      <FormField
        ref={ref}
        group
        className={['ds-checkbox-group', `ds-checkbox-group--${orientation}`, className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <CheckboxGroupContext.Provider value={{ values, toggle, size, name }}>
          {children}
        </CheckboxGroupContext.Provider>
      </FormField>
    );
  },
);
CheckboxGroup.displayName = 'CheckboxGroup';
