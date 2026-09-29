import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as RadioPrimitive from '@radix-ui/react-radio-group';
import './ChooseCard.css';

export interface ChooseCardGroupProps extends Omit<
  ComponentPropsWithoutRef<typeof RadioPrimitive.Root>,
  'asChild'
> {
  /** Selected value (controlled). Use with onValueChange. */
  value?: string;
  /** Initially selected value when uncontrolled. */
  defaultValue?: string;
  /** Called with the new value when the selection changes. */
  onValueChange?: (value: string) => void;
  /** `vertical` (default) stacks cards; `horizontal` puts them in a row that wraps when narrow. */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Name the group with aria-labelledby (pointing at a visible heading) or aria-label,
   * e.g. "Plan".
   */
  'aria-labelledby'?: string;
  'aria-label'?: string;
  /** The ChooseCard options. */
  children: ReactNode;
}

/**
 * A set of large, card-style options where exactly one can be chosen, e.g. a plan. Arrow
 * keys move between cards; the group is a single Tab stop.
 */
export const ChooseCardGroup = forwardRef<HTMLDivElement, ChooseCardGroupProps>(
  ({ orientation = 'vertical', className, ...props }, ref) => (
    <RadioPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={['ds-choose-card-group', `ds-choose-card-group--${orientation}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
);
ChooseCardGroup.displayName = 'ChooseCardGroup';

export interface ChooseCardProps extends Omit<
  ComponentPropsWithoutRef<typeof RadioPrimitive.Item>,
  'asChild' | 'children' | 'title'
> {
  /** The value this card selects. */
  value: string;
  /** Option name, e.g. "Pro plan". Names the radio. */
  title: ReactNode;
  /** What the option includes. Read after the name. */
  description?: ReactNode;
  /** Price or other key figure, shown at the end, e.g. "$12 / month". */
  price?: ReactNode;
}

/** One option inside a ChooseCardGroup. The whole card is the radio button. */
export const ChooseCard = forwardRef<HTMLButtonElement, ChooseCardProps>(
  ({ title, description, price, className, ...props }, ref) => {
    const id = useId();
    const describedBy =
      [description && `${id}-description`, price && `${id}-price`].filter(Boolean).join(' ') ||
      undefined;
    return (
      <RadioPrimitive.Item
        ref={ref}
        className={['ds-choose-card', className].filter(Boolean).join(' ')}
        aria-labelledby={`${id}-title`}
        aria-describedby={describedBy}
        {...props}
      >
        <span className="ds-choose-card__indicator" aria-hidden="true">
          <RadioPrimitive.Indicator className="ds-choose-card__dot" />
        </span>
        <span className="ds-choose-card__text">
          <span className="ds-choose-card__title" id={`${id}-title`}>
            {title}
          </span>
          {description && (
            <span className="ds-choose-card__description" id={`${id}-description`}>
              {description}
            </span>
          )}
        </span>
        {price && (
          <span className="ds-choose-card__price" id={`${id}-price`}>
            {price}
          </span>
        )}
      </RadioPrimitive.Item>
    );
  },
);
ChooseCard.displayName = 'ChooseCard';
