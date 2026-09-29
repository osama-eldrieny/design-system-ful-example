import {
  createContext,
  forwardRef,
  useContext,
  type ElementType,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react';
import './Card.css';

export type CardAppearance = 'elevated' | 'outlined' | 'filled';
export type CardOrientation = 'vertical' | 'horizontal';

const CardLinkContext = createContext<string | undefined>(undefined);

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /**
   * `elevated` (default) lifts the card with the shadow theme, `outlined` draws a border for
   * dense layouts, `filled` tints it for grouping inside a surface.
   */
  appearance?: CardAppearance;
  /** `vertical` stacks media above the body; `horizontal` puts media beside it. */
  orientation?: CardOrientation;
  /**
   * Makes the whole card a link to this URL. The CardTitle becomes the link, and its hit area
   * covers the card, so there's one clear, accessible target.
   */
  href?: string;
  /** Element to render: `article` (default) for standalone content, `div` or `li` otherwise. */
  as?: ElementType;
  children: ReactNode;
}

/**
 * A container that groups related content and actions about one subject, such as a product,
 * an article or a person.
 */
export const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
      appearance = 'elevated',
      orientation = 'vertical',
      href,
      as: Component = 'article',
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <CardLinkContext.Provider value={href}>
      <Component
        ref={ref}
        className={[
          'ds-card',
          `ds-card--${appearance}`,
          `ds-card--${orientation}`,
          href && 'ds-card--interactive',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </Component>
    </CardLinkContext.Provider>
  ),
);
Card.displayName = 'Card';

export interface CardMediaProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Describes the image. Use an empty string when the image is decorative, e.g. when the
   * title already says what it shows.
   */
  alt: string;
}

/** An image at the top (or side) of the card. Without src, the theme's placeholder shows. */
export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, src, alt, ...props }, ref) => (
    <div ref={ref} className={['ds-card__media', className].filter(Boolean).join(' ')}>
      {src && <img className="ds-card__image" src={src} alt={alt} {...props} />}
    </div>
  ),
);
CardMedia.displayName = 'CardMedia';

/** The card's text and content. */
export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={['ds-card__body', className].filter(Boolean).join(' ')} {...props} />
  ),
);
CardBody.displayName = 'CardBody';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level that fits the page outline. Default h3. */
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/** The card's heading. In a card with href, it is the link. */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Heading = 'h3', className, children, ...props }, ref) => {
    const href = useContext(CardLinkContext);
    return (
      <Heading
        ref={ref}
        className={['ds-card__title', className].filter(Boolean).join(' ')}
        {...props}
      >
        {href ? (
          <a className="ds-card__link" href={href}>
            {children}
          </a>
        ) : (
          children
        )}
      </Heading>
    );
  },
);
CardTitle.displayName = 'CardTitle';

/** Supporting text under the title. */
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={['ds-card__description', className].filter(Boolean).join(' ')}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/** Actions or metadata at the bottom of the card. Buttons here stay clickable in link cards. */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={['ds-card__footer', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';
