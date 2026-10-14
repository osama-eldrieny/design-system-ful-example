import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './PageHeader.css';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The page or section title. */
  title: ReactNode;
  /** Heading level: h1 for a page (default), h2 or h3 for a section. */
  titleAs?: 'h1' | 'h2' | 'h3';
  /** Supporting text under the title. */
  description?: ReactNode;
  /** Above the title, e.g. a Breadcrumb. */
  breadcrumbs?: ReactNode;
  /** Before the title, e.g. an Avatar or FeaturedIcon. */
  leading?: ReactNode;
  /** Buttons at the end, e.g. "Export" and "Add". */
  actions?: ReactNode;
  /** Under the title row, e.g. Tabs, a search field or filters. */
  children?: ReactNode;
  /** `medium` (default) for pages, `small` for sections and cards. */
  size?: 'medium' | 'small';
  /** A line under the header. */
  divider?: boolean;
}

/**
 * The top of a page or section: breadcrumbs, a title with supporting text, actions, and an
 * optional row for tabs or filters.
 */
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      title,
      titleAs: Heading = 'h1',
      description,
      breadcrumbs,
      leading,
      actions,
      size = 'medium',
      divider = false,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={[
        'ds-page-header',
        size === 'small' && 'ds-page-header--small',
        divider && 'ds-page-header--divider',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {breadcrumbs}
      <div className="ds-page-header__row">
        <div className="ds-page-header__lead">
          {leading}
          <div className="ds-page-header__text">
            <Heading className="ds-page-header__title">{title}</Heading>
            {description && <p className="ds-page-header__description">{description}</p>}
          </div>
        </div>
        {actions && <div className="ds-page-header__actions">{actions}</div>}
      </div>
      {children}
    </div>
  ),
);
PageHeader.displayName = 'PageHeader';
