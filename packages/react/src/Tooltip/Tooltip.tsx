import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { usePortalThemeAttributes } from '../ThemeProvider';
import './Tooltip.css';

export interface TooltipProps extends Pick<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  'side' | 'align'
> {
  /** Short hint shown on hover and keyboard focus. Plain text only, no links or buttons. */
  content: ReactNode;
  /** The element it describes; must be focusable (e.g. an IconButton). */
  children: ReactElement;
  /** Delay before showing, in ms. Default 400. */
  delayDuration?: number;
  /** Open state (controlled). */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * A short hint for a control, shown on hover and on keyboard focus. Escape hides it. Don't put
 * essential information or interactive content in it.
 */
export const Tooltip = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 400,
  open,
  defaultOpen,
  onOpenChange,
}: TooltipProps) => {
  const themeAttrs = usePortalThemeAttributes();
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="ds-tooltip"
            side={side}
            align={align}
            sideOffset={6}
            {...themeAttrs}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
