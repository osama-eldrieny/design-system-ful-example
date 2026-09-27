import React from 'react';
import '../styles/Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  imageUrl?: string;
  oldPrice?: string;
  newPrice: string;
  reviews?: string;
  brand?: 'diamond' | 'amber' | 'opal';
}

interface BrandColors {
  imageBg: string;
  titleColor: string;
  descColor: string;
  reviewColor: string;
  priceColor: string;
  starsColor: string;
  oldPriceColor: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      description,
      imageUrl,
      oldPrice,
      newPrice,
      reviews = '420 reviews',
      brand = 'diamond',
      className,
      ...props
    },
    ref
  ) => {
    const brandColorsMap: Record<string, BrandColors> = {
      diamond: {
        imageBg: '#F2EDFF',
        titleColor: '#24242C',
        descColor: '#62626D',
        reviewColor: '#62626D',
        priceColor: '#794DFF',
        starsColor: '#EDB000',
        oldPriceColor: '#62626D',
      },
      amber: {
        imageBg: '#F9F4EE',
        titleColor: '#877C71',
        descColor: '#C9B9A9',
        reviewColor: '#C9B9A9',
        priceColor: '#C28F58',
        starsColor: '#8262C5',
        oldPriceColor: '#C9B9A9',
      },
      opal: {
        imageBg: '#EBF3FE',
        titleColor: '#282B3B',
        descColor: '#676B83',
        reviewColor: '#676B83',
        priceColor: '#3B82F6',
        starsColor: '#EAB306',
        oldPriceColor: '#676B83',
      },
    };

    const colors = brandColorsMap[brand] || brandColorsMap.diamond;

    return (
      <div
        ref={ref}
        className={`card ${className || ''}`.trim()}
        style={{
          '--card-image-bgcolor': colors.imageBg,
          '--card-title-font-color': colors.titleColor,
          '--card-desc-font-color': colors.descColor,
          '--card-review-font-color': colors.reviewColor,
          '--card-new-price-font-color': colors.priceColor,
          '--card-old-price-font-color': colors.oldPriceColor,
          '--card-stars-icon-color': colors.starsColor,
        } as React.CSSProperties}
        {...props}
      >
        <div className="card-image">
          {imageUrl ? (
            <img src={imageUrl} alt={title} style={{}} />
          ) : (
            <span>Product Image</span>
          )}
        </div>
        <div className="card-body">
          <div className="card-text-group">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
          </div>
          <div className="card-review">
            <div className="card-stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <span className="card-review-text">{reviews}</span>
          </div>
          <div className="card-prices">
            <p className="card-new-price">{newPrice}</p>
            {oldPrice && <p className="card-old-price">{oldPrice}</p>}
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
