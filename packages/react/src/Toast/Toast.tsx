import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import { usePortalThemeAttributes } from '../ThemeProvider';
import './Toast.css';

export type ToastTone = 'primary' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  /** Short message, e.g. "Changes saved". */
  title: string;
  /** Extra detail. */
  description?: string;
  /** Color and icon meaning. Default primary (information). */
  tone?: ToastTone;
  /** One action, e.g. Undo. altText describes how to do it without the toast. */
  action?: { label: string; onClick: () => void; altText: string };
  /** Time before it disappears, in ms. Default 5000; Infinity keeps it until dismissed. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

const ToastContext = createContext<((options: ToastOptions) => void) | null>(null);

/** Shows a toast. Use inside ToastProvider. */
export const useToast = () => {
  const show = useContext(ToastContext);
  if (!show) throw new Error('useToast must be used inside <ToastProvider>.');
  return show;
};

const icons = {
  primary: <Info />,
  success: <CircleCheck />,
  warning: <TriangleAlert />,
  danger: <CircleAlert />,
};

export interface ToastProviderProps {
  children: ReactNode;
  /** Name of the notifications region, announced with its shortcut. Default "Notifications". */
  label?: string;
  /** Accessible name of each close button. Default "Dismiss". */
  closeLabel?: string;
}

/**
 * Hosts toasts: brief messages about something that just happened. Put it once near the root
 * of the app, then call useToast(). Toasts are announced politely; F8 moves focus to them.
 */
export const ToastProvider = ({
  children,
  label = 'Notifications',
  closeLabel = 'Dismiss',
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const themeAttrs = usePortalThemeAttributes();
  const show = useCallback((options: ToastOptions) => {
    setToasts((all) => [...all, { ...options, id: Date.now() + Math.random() }]);
  }, []);
  const remove = (id: number) => setToasts((all) => all.filter((t) => t.id !== id));
  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider label={label} swipeDirection="right">
        {children}
        {toasts.map(({ id, title, description, tone = 'primary', action, duration = 5000 }) => (
          <ToastPrimitive.Root
            key={id}
            className={`ds-toast ds-toast--${tone}`}
            type={tone === 'danger' ? 'foreground' : 'background'}
            duration={duration}
            onOpenChange={(open) => !open && remove(id)}
          >
            <span className="ds-toast__icon" aria-hidden="true">
              {icons[tone]}
            </span>
            <div className="ds-toast__text">
              <ToastPrimitive.Title className="ds-toast__title">{title}</ToastPrimitive.Title>
              {description && (
                <ToastPrimitive.Description className="ds-toast__description">
                  {description}
                </ToastPrimitive.Description>
              )}
            </div>
            {action && (
              <ToastPrimitive.Action
                className="ds-toast__action"
                altText={action.altText}
                onClick={action.onClick}
              >
                {action.label}
              </ToastPrimitive.Action>
            )}
            <ToastPrimitive.Close className="ds-toast__close" aria-label={closeLabel}>
              <X aria-hidden="true" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport
          className="ds-toast__viewport"
          label={`${label} ({hotkey})`}
          {...themeAttrs}
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};
