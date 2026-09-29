import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { ButtonProps } from '../Button';
import './ButtonGroup.css';

export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /** Names the group for screen readers, e.g. "Text alignment". */
  'aria-label': string;
  /** Joins the buttons into one control instead of spacing them. */
  attached?: boolean;
  /** `horizontal` (default) or `vertical`. */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Segmented selection: the Button whose `value` matches is pressed (filled); the others are
   * outlined. Controlled; use with onValueChange.
   */
  value?: string;
  /** Initially pressed value for segmented selection, uncontrolled. */
  defaultValue?: string;
  /** Called with the value of the pressed Button. Turns on segmented selection. */
  onValueChange?: (value: string) => void;
  /** Button elements. */
  children: ReactNode;
}

/**
 * Related buttons shown together, spaced or attached. With a value, it becomes a segmented
 * control where one button is pressed, e.g. a view switcher.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      attached = false,
      orientation = 'horizontal',
      value,
      defaultValue,
      onValueChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const selecting = value !== undefined || defaultValue !== undefined || !!onValueChange;
    const current = value ?? uncontrolled;

    const items = Children.map(children, (child) => {
      if (!selecting || !isValidElement(child)) return child;
      const button = child as ReactElement<ButtonProps>;
      const itemValue = button.props.value as string | undefined;
      if (itemValue === undefined) return child;
      const pressed = itemValue === current;
      return cloneElement(button, {
        'aria-pressed': pressed,
        appearance: pressed ? 'filled' : 'outline',
        onClick: (event) => {
          setUncontrolled(itemValue);
          onValueChange?.(itemValue);
          button.props.onClick?.(event);
        },
      });
    });

    return (
      <div
        ref={ref}
        role="group"
        className={[
          'ds-button-group',
          `ds-button-group--${orientation}`,
          attached && 'ds-button-group--attached',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {items}
      </div>
    );
  },
);
ButtonGroup.displayName = 'ButtonGroup';
