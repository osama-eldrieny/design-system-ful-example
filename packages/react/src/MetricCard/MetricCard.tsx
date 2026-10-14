import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '../Badge';
import { FeaturedIcon, type FeaturedIconAppearance, type FeaturedIconColor } from '../FeaturedIcon';
import './MetricCard.css';

export type MetricTrendStyle = 'simple' | 'badge' | 'modern';

export interface MetricCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** What is measured, e.g. "Total revenue". */
  label: ReactNode;
  /** The figure, formatted, e.g. "$124,567". */
  value: ReactNode;
  /** Change since the previous period, e.g. "12%". */
  change?: ReactNode;
  /** Direction of the change. Default neutral. */
  trend?: 'up' | 'down' | 'neutral';
  /** Whether the change is good news. Default: up is good. Use false for e.g. costs rising. */
  positive?: boolean;
  /** `simple` arrow and text, `badge` (default) a tinted pill, `modern` a neutral pill. */
  trendStyle?: MetricTrendStyle;
  /** Context for the change, e.g. "vs last month". */
  comparison?: ReactNode;
  /** An icon shown in a featured icon at the top (or start, when horizontal). */
  icon?: ReactNode;
  /** Color of the featured icon. Default primary. */
  iconTone?: FeaturedIconColor;
  /** Look of the featured icon. Default modern. */
  iconAppearance?: FeaturedIconAppearance;
  /** A small chart beside the value, e.g. a Sparkline. Decorative: the value carries the meaning. */
  chart?: ReactNode;
  /** Actions at the top end, e.g. a DropdownMenu with an IconButton trigger. */
  actions?: ReactNode;
  /** Under a divider, e.g. a "View report" link. */
  footer?: ReactNode;
  /** `vertical` (default) icon above, `horizontal` icon beside the figures. */
  layout?: 'vertical' | 'horizontal';
  /** `small` for dense dashboards, `medium` (default). */
  size?: 'small' | 'medium';
  /** Words announced for the trend, for translation. */
  trendLabels?: { up?: string; down?: string };
}

/**
 * A key figure in a card, e.g. for dashboards: label, value, trend and comparison, with an
 * optional icon, chart, actions menu and footer link.
 */
export const MetricCard = forwardRef<HTMLElement, MetricCardProps>(
  (
    {
      label,
      value,
      change,
      trend = 'neutral',
      positive,
      trendStyle = 'badge',
      comparison,
      icon,
      iconTone = 'primary',
      iconAppearance = 'modern',
      chart,
      actions,
      footer,
      layout = 'vertical',
      size = 'medium',
      trendLabels,
      className,
      ...props
    },
    ref,
  ) => {
    const good = positive ?? trend === 'up';
    const tone = trend === 'neutral' ? 'neutral' : good ? 'up' : 'down';
    const words = { up: 'increased', down: 'decreased', ...trendLabels };
    const hidden = trend !== 'neutral' && (
      <span className="ds-metric-card__hidden">{words[trend]} </span>
    );
    const arrow =
      trend === 'neutral' ? null : trendStyle === 'simple' ? (
        trend === 'up' ? (
          <ArrowUp aria-hidden="true" />
        ) : (
          <ArrowDown aria-hidden="true" />
        )
      ) : trendStyle === 'modern' ? (
        trend === 'up' ? (
          <TrendingUp />
        ) : (
          <TrendingDown />
        )
      ) : trend === 'up' ? (
        <ArrowUpRight />
      ) : (
        <ArrowDownRight />
      );

    const trendNode =
      change === undefined || change === null ? null : trendStyle === 'simple' ? (
        <span className={`ds-metric-card__trend ds-metric-card__trend--${tone}`}>
          {arrow}
          {hidden}
          {change}
        </span>
      ) : (
        <Badge
          tone={tone === 'up' ? 'success' : tone === 'down' ? 'danger' : 'gray'}
          shape={trendStyle === 'modern' ? 'modern' : 'pill'}
          size="small"
          iconStart={arrow ?? undefined}
        >
          {hidden}
          {change}
        </Badge>
      );

    const featured = icon && (
      <FeaturedIcon icon={icon} tone={iconTone} appearance={iconAppearance} shape="square" />
    );

    return (
      <article
        ref={ref}
        className={[
          'ds-metric-card',
          layout === 'horizontal' && 'ds-metric-card--horizontal',
          size === 'small' && 'ds-metric-card--small',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <div className="ds-metric-card__main">
          {layout === 'vertical' && (featured || actions) && (
            <div className="ds-metric-card__top">
              {featured}
              {actions && <div className="ds-metric-card__actions">{actions}</div>}
            </div>
          )}
          {layout === 'horizontal' && featured}
          <div className="ds-metric-card__body">
            <dl className="ds-metric-card__stat">
              <dt className="ds-metric-card__label">{label}</dt>
              <dd className="ds-metric-card__value-row">
                <span className="ds-metric-card__value">{value}</span>
                {trendNode && !comparison && trendNode}
              </dd>
              {trendNode && comparison && (
                <dd className="ds-metric-card__change">
                  {trendNode}
                  <span className="ds-metric-card__comparison">{comparison}</span>
                </dd>
              )}
            </dl>
            {chart && (
              <div className="ds-metric-card__chart" aria-hidden="true">
                {chart}
              </div>
            )}
          </div>
          {layout === 'horizontal' && actions && (
            <div className="ds-metric-card__actions">{actions}</div>
          )}
        </div>
        {footer && <div className="ds-metric-card__footer">{footer}</div>}
      </article>
    );
  },
);
MetricCard.displayName = 'MetricCard';
