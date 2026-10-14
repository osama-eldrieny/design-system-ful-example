import { useMemo, type ReactNode } from 'react';
import {
  ChartFrame,
  ChartLegend,
  ChartTooltip,
  defaultFormat,
  niceTicks,
  seriesColor,
  useActiveIndex,
  useRtl,
  useWidth,
  type ChartRow,
  type ChartSeries,
} from './chart-core';
import './Chart.css';

export type { ChartRow, ChartSeries } from './chart-core';
export { ChartLegend } from './chart-core';

interface CartesianProps {
  /** Names the chart; shown above it unless hideTitle. Also names its data table. */
  title: string;
  /** Hides the title visually; it still names the chart for screen readers. */
  hideTitle?: boolean;
  /** One sentence on what the chart shows. */
  description?: ReactNode;
  /** One object per point on the x axis, e.g. `{ month: 'Jan', revenue: 12000 }`. */
  data: ChartRow[];
  /** Field holding the x axis label, e.g. "month". */
  xKey: string;
  /** The series to draw. */
  series: ChartSeries[];
  /** Plot height in px. Default 240. */
  height?: number;
  /** Formats values on the axis and in the tooltip. Default compact numbers (12K). */
  formatValue?: (value: number) => string;
  /** Shows the legend under the chart. Default: when there are several series. */
  showLegend?: boolean;
  /** Shows horizontal gridlines. Default true. */
  showGrid?: boolean;
  /** Hides the value axis labels, e.g. in small cards. */
  hideYAxis?: boolean;
  className?: string;
}

const PAD = { top: 8, right: 8, bottom: 28, left: 44 };

const tableOf = (data: ChartRow[], xKey: string, series: ChartSeries[]) => ({
  columns: [xKey, ...series.map((s) => s.label)],
  rows: data.map((row) => [String(row[xKey]), ...series.map((s) => Number(row[s.key]))]),
});

/** Line path through points; `curved` uses a monotone cubic so lines don't overshoot. */
function linePath(points: [number, number][], curved: boolean): string {
  if (!points.length) return '';
  if (!curved || points.length < 3) return `M${points.map((p) => p.join(',')).join('L')}`;
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const mx = (x1 - x0) / 2;
    d += `C${x0 + mx},${y0} ${x1 - mx},${y1} ${x1},${y1}`;
  }
  return d;
}

export interface LineChartProps extends CartesianProps {
  /** Fills the area under each line. */
  area?: boolean;
  /** Stacks the areas on top of each other (with area). */
  stacked?: boolean;
  /** Smooth curves instead of straight segments. Default true. */
  curved?: boolean;
  /** Dots on every point. Default: only the active one. */
  showDots?: boolean;
}

/** Values over an ordered axis, usually time: trends and comparisons of a few series. */
export const LineChart = ({
  title,
  hideTitle,
  description,
  data,
  xKey,
  series,
  height = 240,
  formatValue = defaultFormat,
  showLegend,
  showGrid = true,
  hideYAxis = false,
  area = false,
  stacked = false,
  curved = true,
  showDots = false,
  className,
}: LineChartProps) => {
  const [ref, width] = useWidth<HTMLDivElement>();
  const rtl = useRtl(ref);
  const { active, setActive, onKeyDown, onBlur } = useActiveIndex(data.length, rtl);
  const pad = { ...PAD, left: hideYAxis ? 8 : PAD.left };
  const plotW = Math.max(10, width - pad.left - pad.right);
  const plotH = Math.max(10, height - pad.top - pad.bottom);

  // Stacked areas add each series on top of the ones before it.
  const stacks = useMemo(() => {
    const base = data.map(() => 0);
    return series.map((s) =>
      data.map((row, i) => {
        const v = Number(row[s.key]) || 0;
        const from = stacked ? base[i] : 0;
        const to = from + v;
        if (stacked) base[i] = to;
        return [from, to] as [number, number];
      }),
    );
  }, [data, series, stacked]);

  const values = stacks.flat().flat();
  const ticks = niceTicks(Math.min(0, ...values), Math.max(...values, 0));
  const yMin = ticks[0];
  const yMax = ticks[ticks.length - 1];
  const x = (i: number) => {
    const t = data.length <= 1 ? 0.5 : i / (data.length - 1);
    return pad.left + (rtl ? 1 - t : t) * plotW;
  };
  const y = (v: number) => pad.top + plotH - ((v - yMin) / (yMax - yMin || 1)) * plotH;

  const pick = (clientX: number, rect: DOMRect) => {
    const px = clientX - rect.left - pad.left;
    let t = px / plotW;
    if (rtl) t = 1 - t;
    setActive(Math.max(0, Math.min(data.length - 1, Math.round(t * (data.length - 1)))));
  };

  const legendItems = series.map((s, i) => ({ label: s.label, color: seriesColor(s, i) }));
  const activeRow = active === null ? null : data[active];
  const labelEvery = Math.ceil(data.length / Math.max(1, Math.floor(plotW / 64)));

  return (
    <ChartFrame
      title={title}
      hideTitle={hideTitle}
      description={description}
      className={className}
      table={tableOf(data, xKey, series)}
      legend={(showLegend ?? series.length > 1) && <ChartLegend items={legendItems} />}
    >
      <div
        ref={ref}
        className="ds-chart__plot"
        style={{ blockSize: height }}
        tabIndex={0}
        role="slider"
        aria-label={title}
        aria-valuemin={1}
        aria-valuemax={Math.max(1, data.length)}
        aria-valuenow={(active ?? 0) + 1}
        aria-valuetext={
          activeRow
            ? `${activeRow[xKey]}: ${series.map((s) => `${s.label} ${formatValue(Number(activeRow[s.key]))}`).join(', ')}`
            : 'Use the arrow keys to read values'
        }
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onPointerMove={(e) => pick(e.clientX, e.currentTarget.getBoundingClientRect())}
        onPointerLeave={() => setActive(null)}
      >
        <svg width={width} height={height} aria-hidden="true" className="ds-chart__svg">
          {showGrid &&
            ticks.map((t) => (
              <line
                key={t}
                className="ds-chart__grid"
                x1={pad.left}
                x2={pad.left + plotW}
                y1={y(t)}
                y2={y(t)}
              />
            ))}
          {!hideYAxis &&
            ticks.map((t) => (
              <text
                key={t}
                className="ds-chart__axis"
                x={rtl ? pad.left + plotW + pad.right - 4 : pad.left - 8}
                y={y(t)}
                dy="0.32em"
                textAnchor={rtl ? 'start' : 'end'}
              >
                {formatValue(t)}
              </text>
            ))}
          {data.map((row, i) =>
            i % labelEvery === 0 ? (
              <text key={i} className="ds-chart__axis" x={x(i)} y={height - 8} textAnchor="middle">
                {String(row[xKey])}
              </text>
            ) : null,
          )}
          {active !== null && (
            <line
              className="ds-chart__crosshair"
              x1={x(active)}
              x2={x(active)}
              y1={pad.top}
              y2={pad.top + plotH}
            />
          )}
          {series.map((s, si) => {
            const color = seriesColor(s, si);
            const top = stacks[si].map(([, to], i) => [x(i), y(to)] as [number, number]);
            const bottom = stacks[si].map(([from], i) => [x(i), y(from)] as [number, number]);
            const line = linePath(top, curved);
            return (
              <g key={s.key} style={{ color }}>
                {area && (
                  <path
                    className="ds-chart__area"
                    d={`${line}L${linePath([...bottom].reverse(), curved).slice(1)}Z`}
                  />
                )}
                <path className="ds-chart__line" d={line} />
                {top.map(([px, py], i) =>
                  showDots || i === active ? (
                    <circle key={i} className="ds-chart__dot" cx={px} cy={py} />
                  ) : null,
                )}
              </g>
            );
          })}
        </svg>
        {activeRow && active !== null && (
          <ChartTooltip
            x={x(active)}
            y={pad.top}
            width={width}
            title={String(activeRow[xKey])}
            items={series.map((s, i) => ({
              label: s.label,
              value: formatValue(Number(activeRow[s.key])),
              color: seriesColor(s, i),
            }))}
          />
        )}
      </div>
    </ChartFrame>
  );
};

/** LineChart with the area under each line filled. */
export const AreaChart = (props: Omit<LineChartProps, 'area'>) => <LineChart {...props} area />;

export interface BarChartProps extends CartesianProps {
  /** Stacks series in one bar instead of side by side. */
  stacked?: boolean;
  /** `vertical` (default) columns, `horizontal` bars, e.g. for long category names. */
  orientation?: 'vertical' | 'horizontal';
}

/** Compares values across categories, side by side or stacked. */
export const BarChart = ({
  title,
  hideTitle,
  description,
  data,
  xKey,
  series,
  height,
  formatValue = defaultFormat,
  showLegend,
  showGrid = true,
  hideYAxis = false,
  stacked = false,
  orientation = 'vertical',
  className,
}: BarChartProps) => {
  const horizontal = orientation === 'horizontal';
  const h = height ?? (horizontal ? Math.max(160, data.length * 40 + 36) : 240);
  const [ref, width] = useWidth<HTMLDivElement>();
  const rtl = useRtl(ref);
  const { active, setActive, onKeyDown, onBlur } = useActiveIndex(data.length, rtl);
  const pad = horizontal
    ? { top: 8, right: 16, bottom: 28, left: hideYAxis ? 8 : 96 }
    : { ...PAD, left: hideYAxis ? 8 : PAD.left };
  const plotW = Math.max(10, width - pad.left - pad.right);
  const plotH = Math.max(10, h - pad.top - pad.bottom);

  const totals = data.map((row) =>
    stacked
      ? series.reduce((sum, s) => sum + (Number(row[s.key]) || 0), 0)
      : Math.max(...series.map((s) => Number(row[s.key]) || 0)),
  );
  const ticks = niceTicks(0, Math.max(...totals, 0));
  const vMax = ticks[ticks.length - 1] || 1;

  // Band per category; bars fill (1 - gap) of it.
  const bandLength = (horizontal ? plotH : plotW) / Math.max(1, data.length);
  const gapRatio = 0.3;
  const inner = bandLength * (1 - gapRatio);
  const barThickness = stacked ? inner : inner / series.length;
  const scale = (v: number) => (v / vMax) * (horizontal ? plotW : plotH);
  const bandStart = (i: number) => {
    const start = (horizontal ? pad.top : pad.left) + i * bandLength + (bandLength - inner) / 2;
    if (horizontal || !rtl) return start;
    return pad.left + plotW - (start - pad.left) - inner;
  };

  const legendItems = series.map((s, i) => ({ label: s.label, color: seriesColor(s, i) }));
  const activeRow = active === null ? null : data[active];

  const pick = (clientX: number, clientY: number, rect: DOMRect) => {
    const pos = horizontal ? clientY - rect.top - pad.top : clientX - rect.left - pad.left;
    let i = Math.floor(pos / bandLength);
    if (!horizontal && rtl) i = data.length - 1 - i;
    setActive(i >= 0 && i < data.length ? i : null);
  };

  return (
    <ChartFrame
      title={title}
      hideTitle={hideTitle}
      description={description}
      className={className}
      table={tableOf(data, xKey, series)}
      legend={(showLegend ?? series.length > 1) && <ChartLegend items={legendItems} />}
    >
      <div
        ref={ref}
        className="ds-chart__plot"
        style={{ blockSize: h }}
        tabIndex={0}
        role="slider"
        aria-label={title}
        aria-valuemin={1}
        aria-valuemax={Math.max(1, data.length)}
        aria-valuenow={(active ?? 0) + 1}
        aria-valuetext={
          activeRow
            ? `${activeRow[xKey]}: ${series.map((s) => `${s.label} ${formatValue(Number(activeRow[s.key]))}`).join(', ')}`
            : 'Use the arrow keys to read values'
        }
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onPointerMove={(e) => pick(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect())}
        onPointerLeave={() => setActive(null)}
      >
        <svg width={width} height={h} aria-hidden="true" className="ds-chart__svg">
          {showGrid &&
            ticks.map((t) =>
              horizontal ? (
                <line
                  key={t}
                  className="ds-chart__grid"
                  x1={rtl ? pad.left + plotW - scale(t) : pad.left + scale(t)}
                  x2={rtl ? pad.left + plotW - scale(t) : pad.left + scale(t)}
                  y1={pad.top}
                  y2={pad.top + plotH}
                />
              ) : (
                <line
                  key={t}
                  className="ds-chart__grid"
                  x1={pad.left}
                  x2={pad.left + plotW}
                  y1={pad.top + plotH - scale(t)}
                  y2={pad.top + plotH - scale(t)}
                />
              ),
            )}
          {ticks.map((t) =>
            horizontal ? (
              <text
                key={t}
                className="ds-chart__axis"
                x={rtl ? pad.left + plotW - scale(t) : pad.left + scale(t)}
                y={h - 8}
                textAnchor="middle"
              >
                {formatValue(t)}
              </text>
            ) : hideYAxis ? null : (
              <text
                key={t}
                className="ds-chart__axis"
                x={rtl ? pad.left + plotW + pad.right - 4 : pad.left - 8}
                y={pad.top + plotH - scale(t)}
                dy="0.32em"
                textAnchor={rtl ? 'start' : 'end'}
              >
                {formatValue(t)}
              </text>
            ),
          )}
          {data.map((row, i) => {
            const start = bandStart(i);
            let offset = 0;
            return (
              <g key={i} className={active === i ? 'ds-chart__band--active' : undefined}>
                {active === i && (
                  <rect
                    className="ds-chart__band"
                    x={horizontal ? pad.left : start - (bandLength - inner) / 2}
                    y={horizontal ? start - (bandLength - inner) / 2 : pad.top}
                    width={horizontal ? plotW : bandLength}
                    height={horizontal ? bandLength : plotH}
                  />
                )}
                {series.map((s, si) => {
                  const v = Number(row[s.key]) || 0;
                  const length = scale(v);
                  const along = stacked ? start : start + si * barThickness;
                  const from = stacked ? offset : 0;
                  if (stacked) offset += length;
                  const color = seriesColor(s, si);
                  return horizontal ? (
                    <rect
                      key={s.key}
                      className="ds-chart__bar"
                      style={{ color }}
                      x={rtl ? pad.left + plotW - from - length : pad.left + from}
                      y={along}
                      width={Math.max(0, length)}
                      height={Math.max(1, barThickness - (stacked ? 0 : 2))}
                    />
                  ) : (
                    <rect
                      key={s.key}
                      className="ds-chart__bar"
                      style={{ color }}
                      x={rtl && !stacked ? start + inner - (si + 1) * barThickness : along}
                      y={pad.top + plotH - from - length}
                      width={Math.max(1, barThickness - (stacked ? 0 : 2))}
                      height={Math.max(0, length)}
                    />
                  );
                })}
                <text
                  className="ds-chart__axis"
                  x={horizontal ? (rtl ? pad.left + plotW + 8 : pad.left - 8) : start + inner / 2}
                  y={horizontal ? start + inner / 2 : h - 8}
                  dy={horizontal ? '0.32em' : undefined}
                  textAnchor={horizontal ? (rtl ? 'start' : 'end') : 'middle'}
                >
                  {String(row[xKey])}
                </text>
              </g>
            );
          })}
        </svg>
        {activeRow && active !== null && (
          <ChartTooltip
            x={horizontal ? pad.left + plotW / 2 : bandStart(active) + inner / 2}
            y={horizontal ? bandStart(active) : pad.top}
            width={width}
            title={String(activeRow[xKey])}
            items={series.map((s, i) => ({
              label: s.label,
              value: formatValue(Number(activeRow[s.key])),
              color: seriesColor(s, i),
            }))}
          />
        )}
      </div>
    </ChartFrame>
  );
};

export interface DonutChartProps {
  title: string;
  hideTitle?: boolean;
  description?: ReactNode;
  /** One slice per item. */
  data: { label: string; value: number; color?: ChartSeries['color'] }[];
  /** Diameter in px. Default 200. */
  size?: number;
  /** Ring thickness as a share of the radius, 0–1. 1 draws a pie. Default 0.28. */
  thickness?: number;
  /** Big figure in the middle, e.g. the total. */
  centerValue?: ReactNode;
  /** Caption under the center figure, e.g. "Total visits". */
  centerLabel?: ReactNode;
  formatValue?: (value: number) => string;
  /** Default true. */
  showLegend?: boolean;
  className?: string;
}

/** Parts of a whole: a ring (or pie) of up to about six slices. */
export const DonutChart = ({
  title,
  hideTitle,
  description,
  data,
  size = 200,
  thickness = 0.28,
  centerValue,
  centerLabel,
  formatValue = defaultFormat,
  showLegend = true,
  className,
}: DonutChartProps) => {
  const [ref] = useWidth<HTMLDivElement>(size);
  const rtl = useRtl(ref);
  const { active, setActive, onKeyDown, onBlur } = useActiveIndex(data.length, rtl);
  const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0) || 1;
  const r = size / 2;
  const ri = r * (1 - Math.min(1, Math.max(0.05, thickness)));
  const colorOf = (d: DonutChartProps['data'][number], i: number) =>
    seriesColor({ key: d.label, label: d.label, color: d.color }, i);

  const starts = data.map(
    (_, i) =>
      -Math.PI / 2 +
      (data.slice(0, i).reduce((sum, d) => sum + Math.max(0, d.value), 0) / total) * Math.PI * 2,
  );
  const arcs = data.map((d, i) => {
    const sweep = (Math.max(0, d.value) / total) * Math.PI * 2;
    const a0 = starts[i];
    const a1 = a0 + sweep;
    const large = sweep > Math.PI ? 1 : 0;
    const p = (rad: number, a: number) => [r + rad * Math.cos(a), r + rad * Math.sin(a)].join(',');
    const full = sweep >= Math.PI * 2 - 1e-6;
    const d0 = full
      ? `M${p(r, 0)}A${r},${r} 0 1 1 ${p(r, Math.PI)}A${r},${r} 0 1 1 ${p(r, 0)}` +
        (ri > 0
          ? `M${p(ri, 0)}A${ri},${ri} 0 1 0 ${p(ri, Math.PI)}A${ri},${ri} 0 1 0 ${p(ri, 0)}`
          : '')
      : `M${p(r, a0)}A${r},${r} 0 ${large} 1 ${p(r, a1)}` +
        (ri > 0 ? `L${p(ri, a1)}A${ri},${ri} 0 ${large} 0 ${p(ri, a0)}Z` : `L${r},${r}Z`);
    return { d: d0, color: colorOf(d, i), mid: (a0 + a1) / 2 };
  });

  const activeItem = active === null ? null : data[active];
  const pct = (v: number) => `${Math.round((v / total) * 100)}%`;

  return (
    <ChartFrame
      title={title}
      hideTitle={hideTitle}
      description={description}
      className={['ds-chart--donut', className].filter(Boolean).join(' ')}
      table={{
        columns: ['Item', 'Value', 'Share'],
        rows: data.map((d) => [d.label, formatValue(d.value), pct(d.value)]),
      }}
      legend={
        showLegend && (
          <ChartLegend
            items={data.map((d, i) => ({
              label: `${d.label} (${pct(d.value)})`,
              color: colorOf(d, i),
            }))}
          />
        )
      }
    >
      <div
        ref={ref}
        className="ds-chart__plot ds-chart__plot--donut"
        style={{ inlineSize: size, blockSize: size }}
        tabIndex={0}
        role="slider"
        aria-label={title}
        aria-valuemin={1}
        aria-valuemax={Math.max(1, data.length)}
        aria-valuenow={(active ?? 0) + 1}
        aria-valuetext={
          activeItem
            ? `${activeItem.label}: ${formatValue(activeItem.value)}, ${pct(activeItem.value)}`
            : 'Use the arrow keys to read values'
        }
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onPointerLeave={() => setActive(null)}
      >
        <svg width={size} height={size} aria-hidden="true" className="ds-chart__svg">
          <circle
            className="ds-chart__donut-track"
            cx={r}
            cy={r}
            r={(r + ri) / 2}
            strokeWidth={r - ri}
          />
          {arcs.map((arc, i) => (
            <path
              key={i}
              className={[
                'ds-chart__slice',
                active !== null && active !== i && 'ds-chart__slice--dim',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ color: arc.color }}
              d={arc.d}
              fillRule="evenodd"
              onPointerEnter={() => setActive(i)}
            />
          ))}
        </svg>
        {(centerValue || centerLabel || activeItem) && ri > 0 && (
          <span className="ds-chart__center" aria-hidden="true">
            <span className="ds-chart__center-value">
              {activeItem ? pct(activeItem.value) : centerValue}
            </span>
            <span className="ds-chart__center-label">
              {activeItem ? activeItem.label : centerLabel}
            </span>
          </span>
        )}
      </div>
    </ChartFrame>
  );
};

export interface SparklineProps {
  /** The values, oldest first. */
  data: number[];
  /**
   * Line color: `auto` (default) green when the last value is higher than the first and red when
   * lower, or a fixed `primary`, `positive`, `negative` or series 1–8.
   */
  tone?: 'auto' | 'primary' | 'positive' | 'negative' | ChartSeries['color'];
  /** Fills the area under the line. Default true. */
  area?: boolean;
  /** Height in px. Default 48. Width fills the container. */
  height?: number;
  /** What the sparkline shows, e.g. "Revenue, last 12 months: rising". Without it, decorative. */
  label?: string;
  className?: string;
}

/** A tiny line chart without axes, to show a trend next to a figure. */
export const Sparkline = ({
  data,
  tone = 'auto',
  area = true,
  height = 48,
  label,
  className,
}: SparklineProps) => {
  const [ref, width] = useWidth<HTMLDivElement>(120);
  const rtl = useRtl(ref);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pad = 2;
  const points = data.map((v, i) => {
    const t = data.length <= 1 ? 0.5 : i / (data.length - 1);
    return [
      pad + (rtl ? 1 - t : t) * (width - pad * 2),
      pad + (height - pad * 2) * (1 - (v - min) / (max - min || 1)),
    ] as [number, number];
  });
  const resolved =
    tone === 'auto' ? (data[data.length - 1] >= data[0] ? 'positive' : 'negative') : tone;
  const color =
    resolved === 'positive'
      ? 'var(--chart-positive-color)'
      : resolved === 'negative'
        ? 'var(--chart-negative-color)'
        : resolved === 'primary'
          ? 'var(--chart-series-1-color)'
          : `var(--chart-series-${resolved}-color)`;
  const line = linePath(points, true);
  return (
    <div
      ref={ref}
      className={['ds-sparkline', className].filter(Boolean).join(' ')}
      style={{ blockSize: height, color }}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <svg width={width} height={height} aria-hidden="true">
        {area && points.length > 1 && (
          <path
            className="ds-chart__area"
            d={`${line}L${points[points.length - 1][0]},${height}L${points[0][0]},${height}Z`}
          />
        )}
        <path className="ds-sparkline__line" d={line} />
      </svg>
    </div>
  );
};

export interface RadarChartProps {
  title: string;
  hideTitle?: boolean;
  description?: ReactNode;
  /** One object per axis, e.g. `{ skill: 'Design', alice: 8, bob: 5 }`. */
  data: ChartRow[];
  /** Field holding each axis name. */
  axisKey: string;
  series: ChartSeries[];
  /** Largest value on every axis. Default: the largest value in the data. */
  max?: number;
  /** Diameter in px. Default 280. */
  size?: number;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

/** Compares a few series across several dimensions, e.g. skills or product scores. */
export const RadarChart = ({
  title,
  hideTitle,
  description,
  data,
  axisKey,
  series,
  max,
  size = 280,
  showLegend,
  formatValue = defaultFormat,
  className,
}: RadarChartProps) => {
  const top =
    max ?? Math.max(...data.flatMap((row) => series.map((s) => Number(row[s.key]) || 0)), 1);
  const labelRoom = 56;
  const r = size / 2 - labelRoom / 2;
  const c = size / 2;
  const n = data.length;
  const at = (i: number, v: number): [number, number] => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const d = (v / top) * r;
    return [c + d * Math.cos(a), c + d * Math.sin(a)];
  };
  const rings = [0.25, 0.5, 0.75, 1];
  return (
    <ChartFrame
      title={title}
      hideTitle={hideTitle}
      description={description}
      className={['ds-chart--radar', className].filter(Boolean).join(' ')}
      table={{
        columns: [axisKey, ...series.map((s) => s.label)],
        rows: data.map((row) => [
          String(row[axisKey]),
          ...series.map((s) => formatValue(Number(row[s.key]))),
        ]),
      }}
      legend={
        (showLegend ?? series.length > 1) && (
          <ChartLegend
            items={series.map((s, i) => ({ label: s.label, color: seriesColor(s, i) }))}
          />
        )
      }
    >
      <div
        className="ds-chart__plot ds-chart__plot--donut"
        style={{ inlineSize: size, blockSize: size }}
      >
        <svg width={size} height={size} aria-hidden="true" className="ds-chart__svg">
          {rings.map((k) => (
            <polygon
              key={k}
              className="ds-chart__grid ds-chart__grid--polygon"
              points={data.map((_, i) => at(i, top * k).join(',')).join(' ')}
            />
          ))}
          {data.map((row, i) => {
            const [x2, y2] = at(i, top);
            const [lx, ly] = at(i, top * 1.18);
            return (
              <g key={i}>
                <line className="ds-chart__grid" x1={c} y1={c} x2={x2} y2={y2} />
                <text
                  className="ds-chart__axis"
                  x={lx}
                  y={ly}
                  dy="0.32em"
                  textAnchor={Math.abs(lx - c) < 4 ? 'middle' : lx > c ? 'start' : 'end'}
                >
                  {String(row[axisKey])}
                </text>
              </g>
            );
          })}
          {series.map((s, si) => (
            <polygon
              key={s.key}
              className="ds-chart__radar"
              style={{ color: seriesColor(s, si) }}
              points={data.map((row, i) => at(i, Number(row[s.key]) || 0).join(',')).join(' ')}
            />
          ))}
        </svg>
      </div>
    </ChartFrame>
  );
};
