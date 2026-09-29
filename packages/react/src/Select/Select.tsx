import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { FormField } from '../FormField';
import { usePortalThemeAttributes } from '../ThemeProvider';
import './Select.css';

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectProps {
  /** What to choose, e.g. "Country". Always required: it names the field. */
  label: ReactNode;
  /** Hides the label visually but keeps it for screen readers. */
  hideLabel?: boolean;
  /** Help text under the field. */
  description?: ReactNode;
  /** Error message. Marks the field invalid. */
  error?: ReactNode;
  /** Confirmation message. */
  success?: ReactNode;
  /** Marks the field required. */
  required?: boolean;
  /** Marks the field optional with text after the label. */
  optional?: boolean;
  /** Text shown until something is chosen, e.g. "Choose a country". */
  placeholder?: string;
  /** Selected value (controlled). Use with onValueChange. */
  value?: string;
  /** Initially selected value when uncontrolled. */
  defaultValue?: string;
  /** Called with the new value. */
  onValueChange?: (value: string) => void;
  /** `small` for dense UI, `medium` by default, `large` for prominent forms. */
  size?: SelectSize;
  /** Disables the field. */
  disabled?: boolean;
  /** Form field name; the value is submitted with the form. */
  name?: string;
  /** Id of the trigger. */
  id?: string;
  className?: string;
  /** SelectItem, SelectGroup and SelectSeparator elements. */
  children: ReactNode;
}

/**
 * Picks one option from a list that opens below the field. Type to jump to an option;
 * arrow keys move, Enter selects.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      hideLabel,
      description,
      error,
      success,
      required,
      optional,
      placeholder,
      size = 'medium',
      disabled,
      name,
      id,
      className,
      children,
      ...rootProps
    },
    ref,
  ) => {
    const themeAttrs = usePortalThemeAttributes();
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
        className={['ds-select', `ds-select--${size}`, className].filter(Boolean).join(' ')}
      >
        {(control) => (
          <SelectPrimitive.Root {...rootProps} name={name} required={required} disabled={disabled}>
            <SelectPrimitive.Trigger
              ref={ref}
              id={control.id}
              className="ds-select__trigger"
              aria-describedby={control['aria-describedby']}
              aria-invalid={control['aria-invalid']}
            >
              <span className="ds-select__value">
                <SelectPrimitive.Value placeholder={placeholder} />
              </span>
              <SelectPrimitive.Icon className="ds-select__icon">
                <ChevronDown aria-hidden="true" />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content
                className="ds-select__content"
                position="popper"
                sideOffset={4}
                {...themeAttrs}
              >
                <SelectPrimitive.Viewport className="ds-select__viewport">
                  {children}
                </SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>
        )}
      </FormField>
    );
  },
);
Select.displayName = 'Select';

export interface SelectItemProps extends Omit<
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  'asChild'
> {
  /** The value this option selects. */
  value: string;
  /** Option text; also used for typeahead. */
  children: ReactNode;
}

/** One option. The selected option shows a tick. */
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={['ds-select__item', className].filter(Boolean).join(' ')}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="ds-select__indicator">
        <Check aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  ),
);
SelectItem.displayName = 'SelectItem';

export interface SelectGroupProps extends Omit<
  ComponentPropsWithoutRef<typeof SelectPrimitive.Group>,
  'asChild'
> {
  /** Heading shown above the group's options. */
  label: ReactNode;
}

/** A labelled set of options inside a Select. */
export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ label, className, children, ...props }, ref) => (
    <SelectPrimitive.Group
      ref={ref}
      className={['ds-select__group', className].filter(Boolean).join(' ')}
      {...props}
    >
      <SelectPrimitive.Label className="ds-select__group-label">{label}</SelectPrimitive.Label>
      {children}
    </SelectPrimitive.Group>
  ),
);
SelectGroup.displayName = 'SelectGroup';

/** A line between groups of options. */
export const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={['ds-select__separator', className].filter(Boolean).join(' ')}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectSeparator';
