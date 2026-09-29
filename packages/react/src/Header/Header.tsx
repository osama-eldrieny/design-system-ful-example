import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Avatar } from '../Avatar';
import './Header.css';

export interface HeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** The person's full name. Also gives the avatar its initials. */
  name: string;
  /** Their role or job title, e.g. "Design System Designer". */
  jobTitle?: ReactNode;
  /** The page heading under the person, e.g. the project's name. */
  heading?: ReactNode;
  /** Photo URL. Without it, initials show. */
  avatar?: string;
  /** Heading level. Default h1, since this usually opens the page. */
  headingAs?: 'h1' | 'h2' | 'h3';
}

/**
 * A page header introducing a person and their page: avatar, name, job title and the
 * page heading. Use it once, at the top of a portfolio or profile page.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ name, jobTitle, heading, avatar, headingAs: Heading = 'h1', className, ...props }, ref) => (
    <header ref={ref} className={['ds-header', className].filter(Boolean).join(' ')} {...props}>
      <div className="ds-header__person">
        {/* Decorative: the name is right next to it. */}
        <Avatar name={name} src={avatar} size="xlarge" decorative />
        <div className="ds-header__text">
          <p className="ds-header__name">{name}</p>
          {jobTitle && <p className="ds-header__role">{jobTitle}</p>}
        </div>
      </div>
      {heading && <Heading className="ds-header__title">{heading}</Heading>}
    </header>
  ),
);
Header.displayName = 'Header';
