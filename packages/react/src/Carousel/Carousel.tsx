import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '../Button';
import './Carousel.css';

export type CarouselControls = 'both' | 'arrows' | 'dots';

export interface CarouselProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Names the carousel, e.g. "Highlights". */
  label: string;
  /** One item per slide. */
  slides: ReactNode[];
  /** Slide shown (controlled), 0-based. */
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Which controls show: arrows and dots (default), arrows only, or dots only. */
  controls?: CarouselControls;
  /** Words for a slide’s name. Default "{n} of {total}". */
  slideLabel?: (index: number, total: number) => string;
}

/**
 * A set of slides shown one at a time, with arrows, dots and the arrow keys. Use it for a short
 * set of highlights; every slide stays in the page order for screen readers.
 */
export const Carousel = forwardRef<HTMLElement, CarouselProps>(
  (
    {
      label,
      slides,
      index,
      defaultIndex = 0,
      onIndexChange,
      controls = 'both',
      slideLabel = (i, total) => `${i + 1} of ${total}`,
      className,
      ...props
    },
    ref,
  ) => {
    const [own, setOwn] = useState(defaultIndex);
    const total = slides.length;
    const current = Math.min(index ?? own, Math.max(total - 1, 0));
    const go = (next: number) => {
      const wrapped = (next + total) % total;
      setOwn(wrapped);
      onIndexChange?.(wrapped);
    };
    const showArrows = controls !== 'dots';
    const showDots = controls !== 'arrows';

    return (
      <section
        ref={ref}
        aria-roledescription="carousel"
        aria-label={label}
        className={['ds-carousel', className].filter(Boolean).join(' ')}
        {...props}
      >
        <div className="ds-carousel__viewport">
          <div
            className="ds-carousel__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={slideLabel(current, total)}
            aria-live="polite"
          >
            {slides[current]}
          </div>
        </div>
        {(showArrows || showDots) && (
          <div className="ds-carousel__controls">
            {showArrows && (
              <IconButton
                icon={<ChevronLeft />}
                label="Previous slide"
                variant="secondary"
                appearance="outline"
                size="small"
                onClick={() => go(current - 1)}
              />
            )}
            {showDots && (
              <ul className="ds-carousel__dots" aria-label="Slides">
                {slides.map((_, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className={['ds-carousel__dot', i === current && 'ds-carousel__dot--active'].filter(Boolean).join(' ')}
                      aria-label={`Show slide ${i + 1}`}
                      aria-current={i === current ? 'true' : undefined}
                      onClick={() => go(i)}
                    />
                  </li>
                ))}
              </ul>
            )}
            {showArrows && (
              <IconButton
                icon={<ChevronRight />}
                label="Next slide"
                variant="secondary"
                appearance="outline"
                size="small"
                onClick={() => go(current + 1)}
              />
            )}
          </div>
        )}
      </section>
    );
  },
);
Carousel.displayName = 'Carousel';
