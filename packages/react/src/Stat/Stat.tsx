import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import './Stat.css';

export type StatSize = 'small' | 'medium' | 'large';
export type StatChangeAppearance = 'text' | 'badge';

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
  /** `small` in dense rows, `medium` (default), `large` for a headline figure. */
  size?: StatSize;
  /** `text` (default) shows the change under the value; `badge` puts it beside the value as a tinted pill. */
  changeAppearance?: StatChangeAppearance;
  /** A line under the figure, e.g. "Updated 5 minutes ago". */
  note?: ReactNode;
  /** Words announced for the trend, for translation. */
  trendLabels?: { up?: string; down?: string };
}

/** A key figure with its label and change, e.g. for dashboards. */
export const Stat = forwardRef<HTMLDListElement, StatProps>(
  (
    {
      label,
      value,
      change,
      trend = 'neutral',
      positive,
      help,
      size = 'medium',
      changeAppearance = 'text',
      note,
      trendLabels,
      className,
      ...props
    },
    ref,
  ) => {
    const good = positive ?? trend === 'up';
    const tone = trend === 'neutral' ? 'neutral' : good ? 'up' : 'down';
    const words = { up: 'increased', down: 'decreased', ...trendLabels };
    const changeInner = change && (
      <>
        {trend === 'up' && <ArrowUpRight aria-hidden="true" />}
        {trend === 'down' && <ArrowDownRight aria-hidden="true" />}
        {trend !== 'neutral' && <span className="ds-stat__hidden">{words[trend]} </span>}
        {change}
      </>
    );
    const badge = changeAppearance === 'badge';
    return (
      <dl
        ref={ref}
        className={['ds-stat', `ds-stat--${size}`, className].filter(Boolean).join(' ')}
        {...props}
      >
        <dt className="ds-stat__label">{label}</dt>
        <dd className={badge ? 'ds-stat__value ds-stat__row' : 'ds-stat__value'}>
          {value}
          {badge && change && (
            <span className={`ds-stat__change ds-stat__change--${tone} ds-stat__change--badge`}>
              {changeInner}
            </span>
          )}
        </dd>
        {!badge && change && (
          <dd className={`ds-stat__change ds-stat__change--${tone}`}>
            {changeInner}
            {help && <span className="ds-stat__help"> {help}</span>}
          </dd>
        )}
        {badge && help && <dd className="ds-stat__note">{help}</dd>}
        {note && <dd className="ds-stat__note">{note}</dd>}
      </dl>
    );
  },
);
Stat.displayName = 'Stat';
