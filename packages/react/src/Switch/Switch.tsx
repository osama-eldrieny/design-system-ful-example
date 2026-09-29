import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import './Switch.css';

export interface SwitchProps extends Omit<
  ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  'asChild' | 'children'
> {
  /** Whether the switch is on (controlled). Use with onCheckedChange. */
  checked?: boolean;
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean;
  /** Called with the new state when the switch is toggled. */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Visible label saying what the switch controls, e.g. "Email notifications". Clicking it
   * toggles the switch. Without a label, pass aria-label.
   */
  label?: ReactNode;
  /** Extra detail under the label; announced as the switch's description. */
  description?: ReactNode;
  /** Side of the switch the label sits on. `end` (default) or `start` for settings lists. */
  labelPosition?: 'start' | 'end';
}

/**
 * Turns a setting on or off immediately, like a light switch. For choices that are only
 * applied after pressing Save, use a Checkbox instead.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ label, description, labelPosition = 'end', id, className, style, ...props }, ref) => {
    const autoId = useId();
    const switchId = id ?? autoId;
    const descriptionId = description ? `${switchId}-description` : undefined;

    // className and style go on the outermost element: the track alone, or the labelled wrapper.
    const control = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={['ds-switch__track', !label && className].filter(Boolean).join(' ')}
        style={label ? undefined : style}
        aria-describedby={descriptionId}
        {...props}
      >
        <SwitchPrimitive.Thumb className="ds-switch__thumb" />
      </SwitchPrimitive.Root>
    );

    if (!label) return control;

    return (
      <div
        className={['ds-switch', `ds-switch--label-${labelPosition}`, className]
          .filter(Boolean)
          .join(' ')}
        style={style}
        data-disabled={props.disabled ? '' : undefined}
      >
        {control}
        <span className="ds-switch__text">
          <label className="ds-switch__label" htmlFor={switchId}>
            {label}
          </label>
          {description && (
            <span className="ds-switch__description" id={descriptionId}>
              {description}
            </span>
          )}
        </span>
      </div>
    );
  },
);

Switch.displayName = 'Switch';
