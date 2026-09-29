import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import './Stat.css';

export interface StatProps extends HTMLAttributes<HTMLDListElement> {
  /** What is measured, e.g. "Total revenue". */
  label: ReactNode;
  /** The figure, formatted, e.g. "$124,567". */
  value: ReactNode;
  /** Change since the previous period, e.g. "+12.5%". */
  change?: ReactNode;
  /**
   * Direction of the change: `up` or `down` (colored and announced), `neutral`. Whether up is
   * good depends on the metric: set `positive` accordingly.
   */
  trend?: 'up' | 'down' | 'neutral';
  /** Whether the trend is good news. Default: up is good. Use false for e.g. costs rising. */
  positive?: boolean;
  /** Context for the change, e.g. "vs last month". */
  help?: ReactNode;
  /** Words announced for the trend, for translation. */
  trendLabels?: { up?: string; down?: string };
}

/** A key figure with its label and change, e.g. for dashboards. */
export const Stat = forwardRef<HTMLDListElement, StatProps>(
  (
    { label, value, change, trend = 'neutral', positive, help, trendLabels, className, ...props },
    ref,
  ) => {
    const good = positive ?? trend === 'up';
    const tone = trend === 'neutral' ? 'neutral' : good ? 'up' : 'down';
    const words = { up: 'increased', down: 'decreased', ...trendLabels };
    return (
      <dl ref={ref} className={['ds-stat', className].filter(Boolean).join(' ')} {...props}>
        <dt className="ds-stat__label">{label}</dt>
        <dd className="ds-stat__value">{value}</dd>
        {change && (
          <dd className={`ds-stat__change ds-stat__change--${tone}`}>
            {trend === 'up' && <ArrowUpRight aria-hidden="true" />}
            {trend === 'down' && <ArrowDownRight aria-hidden="true" />}
            {trend !== 'neutral' && <span className="ds-stat__hidden">{words[trend]} </span>}
            {change}
            {help && <span className="ds-stat__help"> {help}</span>}
          </dd>
        )}
      </dl>
    );
  },
);
Stat.displayName = 'Stat';
