import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import './Divider.css';

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /** `horizontal` (default) between stacked content; `vertical` between items in a row. */
  orientation?: 'horizontal' | 'vertical';
  /** Short text in the middle of a horizontal divider, e.g. “or”. */
  label?: ReactNode;
  /** Where the label sits on the line: `center` (default), `start` or `end`. */
  labelAlign?: 'start' | 'center' | 'end';
}

/** A thin line that separates groups of content. */
export const Divider = forwardRef<HTMLElement, DividerProps>(
  ({ orientation = 'horizontal', label, labelAlign = 'center', className, ...props }, ref) => {
    const classes = [
      'ds-divider',
      `ds-divider--${orientation}`,
      label && 'ds-divider--label',
      label && labelAlign !== 'center' && `ds-divider--label-${labelAlign}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');
    if (label && orientation === 'horizontal') {
      return (
        <div ref={ref as Ref<HTMLDivElement>} className={classes} {...props}>
          <span className="ds-divider__label">{label}</span>
        </div>
      );
    }
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref as Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={classes}
          {...props}
        />
      );
    }
    return <hr ref={ref as Ref<HTMLHRElement>} className={classes} {...props} />;
  },
);
Divider.displayName = 'Divider';
