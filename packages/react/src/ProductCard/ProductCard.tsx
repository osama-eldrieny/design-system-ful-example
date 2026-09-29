import { forwardRef, type ReactNode } from 'react';
import { Star } from 'lucide-react';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
  type CardProps,
} from '../Card';
import './ProductCard.css';

export interface ProductCardProps extends Omit<CardProps, 'children' | 'title'> {
  /** Product name. */
  title: string;
  /** One or two lines about the product. */
  description?: string;
  /** Product photo. Without it, the theme's placeholder shows. */
  imageUrl?: string;
  /** Current price, formatted for display, e.g. "$299". */
  price: string;
  /** Previous price, shown crossed out and announced as “was”. */
  oldPrice?: string;
  /** Average rating from 0 to 5. Shown as stars and announced in words. */
  rating?: number;
  /** Review count label, e.g. "2,342 reviews". */
  reviews?: string;
  /** Buttons such as “Add to cart”. They stay clickable in a card with href. */
  actions?: ReactNode;
  /** Wording for translation. */
  labels?: { rating?: (rating: number) => string; was?: string };
}

/**
 * A product in a grid or list: photo, name, rating and price. Built from Card.
 */
export const ProductCard = forwardRef<HTMLElement, ProductCardProps>(
  (
    {
      title,
      description,
      imageUrl,
      price,
      oldPrice,
      rating,
      reviews,
      actions,
      labels = {},
      className,
      ...props
    },
    ref,
  ) => {
    const ratingLabel = labels.rating ?? ((r: number) => `Rated ${r} out of 5`);
    return (
      <Card
        ref={ref}
        className={['ds-product-card', className].filter(Boolean).join(' ')}
        {...props}
      >
        {/* The title names the product, so the photo is decorative here. */}
        <CardMedia src={imageUrl} alt="" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
          {rating !== undefined && (
            <div className="ds-product-card__rating">
              <span
                className="ds-product-card__stars"
                role="img"
                aria-label={[ratingLabel(rating), reviews].filter(Boolean).join(', ')}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    aria-hidden="true"
                    className={n <= Math.round(rating) ? 'ds-product-card__star--on' : undefined}
                  />
                ))}
              </span>
              {reviews && (
                <span className="ds-product-card__reviews" aria-hidden="true">
                  {reviews}
                </span>
              )}
            </div>
          )}
          <p className="ds-product-card__prices">
            <span className="ds-product-card__price">{price}</span>
            {oldPrice && (
              <del className="ds-product-card__old-price">
                <span className="ds-product-card__hidden">{labels.was ?? 'Was'} </span>
                {oldPrice}
              </del>
            )}
          </p>
        </CardBody>
        {actions && <CardFooter>{actions}</CardFooter>}
      </Card>
    );
  },
);
ProductCard.displayName = 'ProductCard';
