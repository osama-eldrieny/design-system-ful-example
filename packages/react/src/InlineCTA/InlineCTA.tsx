import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './InlineCTA.css';

export type InlineCTAAppearance = 'subtle' | 'brand' | 'outline';
export type InlineCTALayout = 'horizontal' | 'stacked';

export interface InlineCTAProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** The offer in a few words, e.g. "Upgrade to Pro". */
  title: ReactNode;
  /** One or two sentences on why. */
  description?: ReactNode;
  /** Icon or illustration at the start. */
  icon?: ReactNode;
  /** One or two Buttons or Links. */
  actions?: ReactNode;
  /** `subtle` (default) grey panel, `brand` tinted with the brand color, `outline` bordered. */
  appearance?: InlineCTAAppearance;
  /** `horizontal` (default) puts actions at the end; `stacked` puts them under the text. Narrow screens always stack. */
  layout?: InlineCTALayout;
  /** Heading level for the title. Default 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/**
 * A call to action placed inside page content, between sections or at the end of an article:
 * a title, a short description and one or two actions.
 */
export const InlineCTA = forwardRef<HTMLElement, InlineCTAProps>(
  (
    { title, description, icon, actions, appearance = 'subtle', layout = 'horizontal', headingLevel = 3, className, ...props },
    ref,
  ) => {
    const Heading = `h${headingLevel}` as const;
    return (
      <section
        ref={ref}
        className={['ds-inline-cta', `ds-inline-cta--${appearance}`, `ds-inline-cta--${layout}`, className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {icon && (
          <span className="ds-inline-cta__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="ds-inline-cta__text">
          <Heading className="ds-inline-cta__title">{title}</Heading>
          {description && <p className="ds-inline-cta__description">{description}</p>}
        </div>
        {actions && <div className="ds-inline-cta__actions">{actions}</div>}
      </section>
    );
  },
);
InlineCTA.displayName = 'InlineCTA';
