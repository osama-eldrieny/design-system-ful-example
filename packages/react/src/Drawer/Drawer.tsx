import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { usePortalThemeAttributes } from '../ThemeProvider';
import './Drawer.css';

export type DrawerProps = ComponentPropsWithoutRef<typeof Dialog.Root>;

/** A panel that slides in from an edge, for secondary tasks like filters or details. */
export const Drawer = (props: DrawerProps) => <Dialog.Root {...props} />;
export const DrawerTrigger = Dialog.Trigger;
export const DrawerClose = Dialog.Close;

export interface DrawerContentProps extends Omit<
  ComponentPropsWithoutRef<typeof Dialog.Content>,
  'title'
> {
  /** Heading; names the drawer. */
  title: ReactNode;
  /** Short explanation under the title. */
  description?: ReactNode;
  /**
   * Edge it slides from: `end` (default; right in LTR, left in RTL), `start`, `top` or
   * `bottom` (common on phones).
   */
  side?: 'start' | 'end' | 'top' | 'bottom';
  /** Accessible name of the close button. Default "Close". */
  closeLabel?: string;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    { title, description, side = 'end', closeLabel = 'Close', className, children, ...props },
    ref,
  ) => {
    const themeAttrs = usePortalThemeAttributes();
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="ds-drawer__scrim" {...themeAttrs} />
        <Dialog.Content
          ref={ref}
          className={['ds-drawer', `ds-drawer--${side}`, className].filter(Boolean).join(' ')}
          {...(description ? {} : { 'aria-describedby': undefined })}
          {...themeAttrs}
          {...props}
        >
          <div className="ds-drawer__header">
            <Dialog.Title className="ds-drawer__title">{title}</Dialog.Title>
            <Dialog.Close className="ds-drawer__close" aria-label={closeLabel}>
              <X aria-hidden="true" />
            </Dialog.Close>
          </div>
          {description && (
            <Dialog.Description className="ds-drawer__description">
              {description}
            </Dialog.Description>
          )}
          <div className="ds-drawer__body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    );
  },
);
DrawerContent.displayName = 'DrawerContent';

/** Actions pinned to the bottom of the drawer. */
export const DrawerFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={['ds-drawer__footer', className].filter(Boolean).join(' ')} {...props} />
);
