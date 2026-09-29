import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { Hexagon } from 'lucide-react';
import './Logo.css';

export interface LogoProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Product or company name. Shown as the wordmark and used as the accessible name. */
  name: string;
  /** The mark, usually an icon. Decorative: the name already says what it is. */
  icon?: ReactNode;
  /** Makes the logo a link, usually to the home page. */
  href?: string;
  /** Shows only the mark, e.g. in tight spaces. The name is still announced. */
  hideName?: boolean;
}

/** The product's mark and name. Colors, corners and spacing follow the theme. */
export const Logo = forwardRef<HTMLElement, LogoProps>(
  ({ name, icon = <Hexagon />, href, hideName = false, className, ...props }, ref) => {
    const classes = ['ds-logo', className].filter(Boolean).join(' ');
    const content = (
      <>
        <span className="ds-logo__icon" aria-hidden="true">
          {icon}
        </span>
        {!hideName && <span className="ds-logo__name">{name}</span>}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          aria-label={hideName ? name : undefined}
          {...props}
        >
          {content}
        </a>
      );
    }
    return (
      <span
        ref={ref}
        className={classes}
        role={hideName ? 'img' : undefined}
        aria-label={hideName ? name : undefined}
        {...props}
      >
        {content}
      </span>
    );
  },
);
Logo.displayName = 'Logo';
