/**
 * Card building blocks for Orbit: titled panels with an options menu, trend badges and a payment
 * card illustration. Library components only; layout in kit.css.
 */
import type { ReactNode } from 'react';
import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  PageHeader,
} from '@ds/react';
import { ArrowDownRight, ArrowUpRight, MoreVertical, Wifi } from 'lucide-react';
import './kit.css';

export const More = ({ label }: { label: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <IconButton
        icon={<MoreVertical />}
        label={label}
        variant="secondary"
        appearance="ghost"
        size="small"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>View report</DropdownMenuItem>
      <DropdownMenuItem>Export</DropdownMenuItem>
      <DropdownMenuItem>Hide</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/** A titled card. `flush` removes the padding, e.g. around a table. */
export function Panel({
  title,
  description,
  actions,
  menu = false,
  footer,
  className,
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  menu?: boolean;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={['kit-panel', className].filter(Boolean).join(' ')}>
      {title && (
        <PageHeader
          size="small"
          titleAs="h2"
          title={title}
          description={description}
          actions={
            (actions || menu) && (
              <>
                {actions}
                {menu && (
                  <More label={`Options for ${typeof title === 'string' ? title : 'this card'}`} />
                )}
              </>
            )
          }
        />
      )}
      {children}
      {footer && <div className="kit-panel__footer">{footer}</div>}
    </section>
  );
}

/** A trend shown as a small tinted badge, e.g. ↗ 7.4%. */
export const Trend = ({
  value,
  up = true,
  good,
}: {
  value: string;
  up?: boolean;
  good?: boolean;
}) => (
  <Badge
    tone={(good ?? up) ? 'success' : 'danger'}
    shape="modern"
    size="small"
    iconStart={up ? <ArrowUpRight /> : <ArrowDownRight />}
  >
    {value}
  </Badge>
);

/** A payment card illustration. */
export const BankCard = ({
  tone = 'brand',
  holder = 'Maya Okafor',
  number = '1234',
  expiry = '06/28',
  brand = 'Orbit',
}: {
  tone?: 'brand' | 'dark' | 'light';
  holder?: string;
  number?: string;
  expiry?: string;
  brand?: string;
}) => (
  <div
    className={`kit-card kit-card--${tone}`}
    role="img"
    aria-label={`${brand} card ending in ${number}, ${holder}, expires ${expiry}`}
  >
    <span className="kit-card__brand">{brand}.</span>
    <Wifi className="kit-card__contactless" aria-hidden="true" />
    <span className="kit-card__holder">{holder}</span>
    <span className="kit-card__expiry">{expiry}</span>
    <span className="kit-card__number">1234 1234 1234 {number}</span>
    <span className="kit-card__chip" aria-hidden="true" />
  </div>
);
