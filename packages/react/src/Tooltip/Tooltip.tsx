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
  /** Bold first line above the content, for a tooltip with a title and supporting text. */
  title?: ReactNode;
  /** Shows a small arrow pointing at the trigger. */
  arrow?: boolean;
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
  title,
  arrow = false,
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
            className={['ds-tooltip', title && 'ds-tooltip--rich'].filter(Boolean).join(' ')}
            side={side}
            align={align}
            sideOffset={6}
            {...themeAttrs}
          >
            {title && <span className="ds-tooltip__title">{title}</span>}
            {title ? <span className="ds-tooltip__text">{content}</span> : content}
            {arrow && <TooltipPrimitive.Arrow className="ds-tooltip__arrow" />}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
