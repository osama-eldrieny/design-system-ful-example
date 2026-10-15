import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import { Card, CardBody, CardFooter, CardHeader } from '../Card';
import './PricingCard.css';

export interface PricingCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** The plan name, e.g. "Pro". */
  name: ReactNode;
  /** The price, e.g. "$29". */
  price: ReactNode;
  /** The billing period, e.g. "per month". */
  period?: ReactNode;
  /** One or two lines on who the plan is for. */
  description?: ReactNode;
  /** What is included, one item per line. */
  features: ReactNode[];
  /** The call to action, usually a Button. */
  action: ReactNode;
  /** A label such as "Most popular". */
  badge?: ReactNode;
  /** Highlights the plan with a brand border. */
  featured?: boolean;
}

/**
 * A pricing plan: name, price, what it includes and one call to action. Put the plan people are
 * most likely to choose in the featured position.
 */
export const PricingCard = forwardRef<HTMLElement, PricingCardProps>(
  ({ name, price, period, description, features, action, badge, featured = false, className, ...props }, ref) => (
    <Card
      ref={ref}
      as="article"
      appearance="outlined"
      className={['ds-pricing-card', featured && 'ds-pricing-card--featured', className].filter(Boolean).join(' ')}
      {...props}
    >
      <CardHeader titleAs="h3" title={name} actions={badge} />
      <CardBody>
        <p className="ds-pricing-card__price">
          {price}
          {period && <span className="ds-pricing-card__period"> {period}</span>}
        </p>
        {description && <p className="ds-pricing-card__description">{description}</p>}
        <ul className="ds-pricing-card__features">
          {features.map((feature, i) => (
            <li key={i} className="ds-pricing-card__feature">
              <Check className="ds-pricing-card__check" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter>{action}</CardFooter>
    </Card>
  ),
);
PricingCard.displayName = 'PricingCard';
