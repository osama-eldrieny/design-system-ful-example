import { forwardRef, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import './Footer.css';

export interface FooterLink {
  /** Visible text; names the link. */
  label: string;
  /** Destination. Links without href render as buttons (for in-app actions). */
  href?: string;
  /** Called on click. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** The footer line, usually the copyright, e.g. "© 2026 TechHub". */
  title?: ReactNode;
  /** Secondary links such as Privacy or Terms. */
  links?: FooterLink[];
  /** Names the links' navigation landmark. Default "Footer". */
  linksLabel?: string;
}

/** The page footer: a copyright line and secondary links. */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ title, links = [], linksLabel = 'Footer', className, ...props }, ref) => (
    <footer ref={ref} className={['ds-footer', className].filter(Boolean).join(' ')} {...props}>
      {title && <p className="ds-footer__text">{title}</p>}
      {links.length > 0 && (
        <nav aria-label={linksLabel}>
          <ul className="ds-footer__links">
            {links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a className="ds-footer__link" href={link.href} onClick={link.onClick}>
                    {link.label}
                  </a>
                ) : (
                  <button type="button" className="ds-footer__link" onClick={link.onClick}>
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </footer>
  ),
);
Footer.displayName = 'Footer';
