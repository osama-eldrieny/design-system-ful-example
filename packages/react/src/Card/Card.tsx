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
export type CardPadding = 'default' | 'none';
export type CardRibbonTone = 'primary' | 'success' | 'danger';

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
  /** `none` removes the padding, e.g. around a table that runs edge to edge. */
  padding?: CardPadding;
  /** A corner ribbon flagging the card, e.g. "New" or "Sale". */
  ribbon?: ReactNode;
  /** Colour of the ribbon. Default primary. */
  ribbonTone?: CardRibbonTone;
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
      padding = 'default',
      ribbon,
      ribbonTone = 'primary',
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
          padding === 'none' && 'ds-card--flush',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {ribbon && (
          <span className={`ds-card__ribbon ds-card__ribbon--${ribbonTone}`}>{ribbon}</span>
        )}
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

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The card's heading. */
  title: ReactNode;
  /** Heading level that fits the page outline. Default h3. */
  titleAs?: CardTitleProps['as'];
  /** Supporting text under the title. */
  description?: ReactNode;
  /** Buttons or a menu at the end of the header. */
  actions?: ReactNode;
}

/** A header row: title and description at the start, actions at the end. */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, titleAs, description, actions, className, ...props }, ref) => (
    <div ref={ref} className={['ds-card__header', className].filter(Boolean).join(' ')} {...props}>
      <div className="ds-card__heading">
        <CardTitle as={titleAs}>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </div>
      {actions && <div className="ds-card__actions">{actions}</div>}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Draws a line above the footer and aligns its content to the end, like a dialog's buttons. */
  divided?: boolean;
}

/** Actions or metadata at the bottom of the card. Buttons here stay clickable in link cards. */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ divided = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={['ds-card__footer', divided && 'ds-card__footer--divided', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';
