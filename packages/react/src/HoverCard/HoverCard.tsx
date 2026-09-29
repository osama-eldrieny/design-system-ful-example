import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { usePortalThemeAttributes } from '../ThemeProvider';
import './HoverCard.css';

/**
 * A preview shown when pointing at a link, e.g. a profile card for a username. Sighted mouse
 * users only: never put anything there that isn't also reachable by following the link.
 */
export const HoverCard = HoverCardPrimitive.Root;
/** The link it previews; use asChild with a Link. */
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => {
  const themeAttrs = usePortalThemeAttributes();
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={['ds-hover-card', className].filter(Boolean).join(' ')}
        {...themeAttrs}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
});
HoverCardContent.displayName = 'HoverCardContent';
