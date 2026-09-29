import { forwardRef, Fragment, type HTMLAttributes, type ReactNode } from 'react';
import './Kbd.css';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Keys of a combination, e.g. ['Ctrl', 'K'], shown joined by “+”. */
  keys?: string[];
  /** A single key when not using keys. */
  children?: ReactNode;
}

/** Shows a keyboard key or shortcut, e.g. Ctrl + K. */
export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ keys, className, children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={['ds-kbd', keys && 'ds-kbd--combo', className].filter(Boolean).join(' ')}
      {...props}
    >
      {keys
        ? keys.map((key, i) => (
            <Fragment key={`${key}-${i}`}>
              {i > 0 && <span className="ds-kbd__plus">+</span>}
              <kbd className="ds-kbd__key">{key}</kbd>
            </Fragment>
          ))
        : children}
    </kbd>
  ),
);
Kbd.displayName = 'Kbd';
