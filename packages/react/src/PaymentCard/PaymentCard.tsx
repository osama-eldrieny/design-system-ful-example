import { forwardRef, type HTMLAttributes } from 'react';
import { Wifi } from 'lucide-react';
import './PaymentCard.css';

export type PaymentCardTone = 'brand' | 'dark' | 'light';
export type PaymentCardSize = 'small' | 'medium';

export interface PaymentCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Name on the card, e.g. "Maya Okafor". */
  holder: string;
  /** The last four digits, e.g. "1234". The rest is never shown. */
  last4: string;
  /** Expiry as shown on the card, e.g. "06/28". */
  expiry: string;
  /** Card network or issuer name, e.g. "Orbit". */
  brand?: string;
  /** Colour of the card. Default brand. */
  tone?: PaymentCardTone;
  /** `medium` (default) in settings and checkout, `small` in lists. */
  size?: PaymentCardSize;
}

/**
 * A payment card illustration with its name, expiry and the last four digits. It only ever shows
 * the last four digits; the full number is never rendered.
 */
export const PaymentCard = forwardRef<HTMLDivElement, PaymentCardProps>(
  ({ holder, last4, expiry, brand = 'Orbit', tone = 'brand', size = 'medium', className, ...props }, ref) => (
    <div
      ref={ref}
      role="img"
      aria-label={`${brand} card ending in ${last4}, ${holder}, expires ${expiry}`}
      className={['ds-payment-card', `ds-payment-card--${tone}`, `ds-payment-card--${size}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="ds-payment-card__brand" aria-hidden="true">
        {brand}.
      </span>
      <Wifi className="ds-payment-card__contactless" aria-hidden="true" />
      <span className="ds-payment-card__chip" aria-hidden="true" />
      <span className="ds-payment-card__number" aria-hidden="true">
        •••• •••• •••• {last4}
      </span>
      <span className="ds-payment-card__holder" aria-hidden="true">
        {holder}
      </span>
      <span className="ds-payment-card__expiry" aria-hidden="true">
        {expiry}
      </span>
    </div>
  ),
);
PaymentCard.displayName = 'PaymentCard';
