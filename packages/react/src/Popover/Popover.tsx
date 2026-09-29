import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { X } from 'lucide-react';
import { usePortalThemeAttributes } from '../ThemeProvider';
import './Popover.css';

/** Interactive content anchored to a trigger, e.g. a filter form or details. Not modal. */
export const Popover = PopoverPrimitive.Root;
/** The element that toggles the popover; usually a Button via asChild. */
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps extends Omit<
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  'title'
> {
  /** Heading; names the popover. Without it, pass aria-label. */
  title?: ReactNode;
  /** Shows a close button. Default true. Escape and clicking outside also close it. */
  showClose?: boolean;
  /** Accessible name of the close button. Default "Close". */
  closeLabel?: string;
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      title,
      showClose = true,
      closeLabel = 'Close',
      sideOffset = 6,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const themeAttrs = usePortalThemeAttributes();
    const titleId = useId();
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={['ds-popover', className].filter(Boolean).join(' ')}
          aria-labelledby={title ? titleId : undefined}
          {...themeAttrs}
          {...props}
        >
          {(title || showClose) && (
            <div className="ds-popover__header">
              {title && (
                <div className="ds-popover__title" id={titleId}>
                  {title}
                </div>
              )}
              {showClose && (
                <PopoverPrimitive.Close className="ds-popover__close" aria-label={closeLabel}>
                  <X aria-hidden="true" />
                </PopoverPrimitive.Close>
              )}
            </div>
          )}
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  },
);
PopoverContent.displayName = 'PopoverContent';
