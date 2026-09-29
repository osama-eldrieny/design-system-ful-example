import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { usePortalThemeAttributes } from '../ThemeProvider';
import './Modal.css';

export type ModalProps = ComponentPropsWithoutRef<typeof Dialog.Root>;

/**
 * A dialog over the page that people must deal with before going back to it. Focus moves in
 * and is trapped until it closes; Escape closes it.
 */
export const Modal = (props: ModalProps) => <Dialog.Root {...props} />;

/** The element that opens the modal; usually a Button via asChild. */
export const ModalTrigger = Dialog.Trigger;

/** Closes the modal; use asChild with a Button for footer actions like Cancel. */
export const ModalClose = Dialog.Close;

export interface ModalContentProps extends Omit<
  ComponentPropsWithoutRef<typeof Dialog.Content>,
  'title'
> {
  /** Heading of the dialog; names it for screen readers. */
  title: ReactNode;
  /** Short explanation under the title; describes the dialog. */
  description?: ReactNode;
  /** `small` for confirmations, `medium` (default) for forms, `large` for rich content. */
  size?: 'small' | 'medium' | 'large';
  /**
   * `alertdialog` for urgent confirmations (e.g. delete): clicking outside doesn't close it
   * and there's no close icon, so people choose an action.
   */
  role?: 'dialog' | 'alertdialog';
  /** Accessible name of the close button. Default "Close". */
  closeLabel?: string;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (
    {
      title,
      description,
      size = 'medium',
      role = 'dialog',
      closeLabel = 'Close',
      className,
      children,
      onPointerDownOutside,
      ...props
    },
    ref,
  ) => {
    const themeAttrs = usePortalThemeAttributes();
    const alert = role === 'alertdialog';
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="ds-modal__scrim" {...themeAttrs} />
        <Dialog.Content
          ref={ref}
          role={role}
          className={['ds-modal', `ds-modal--${size}`, className].filter(Boolean).join(' ')}
          onPointerDownOutside={(event) => {
            if (alert) event.preventDefault();
            onPointerDownOutside?.(event);
          }}
          {...(description ? {} : { 'aria-describedby': undefined })}
          {...themeAttrs}
          {...props}
        >
          <div className="ds-modal__header">
            <Dialog.Title className="ds-modal__title">{title}</Dialog.Title>
            {!alert && (
              <Dialog.Close className="ds-modal__close" aria-label={closeLabel}>
                <X aria-hidden="true" />
              </Dialog.Close>
            )}
          </div>
          {description && (
            <Dialog.Description className="ds-modal__description">{description}</Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    );
  },
);
ModalContent.displayName = 'ModalContent';

/** Actions at the bottom, e.g. Cancel and Save. The primary action goes last. */
export const ModalFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={['ds-modal__footer', className].filter(Boolean).join(' ')} {...props} />
);
