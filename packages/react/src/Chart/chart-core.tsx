import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react';

/** A data series: which field of each row it reads, and its name in the legend. */
export interface ChartSeries {
  /** Field of each data row holding this series' values. */
  key: string;
  /** Name shown in the legend, tooltip and data table. */
  label: string;
  /** Series color 1–8 (default: by position). 1 is the brand color. */
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export type ChartRow = Record<string, string | number>;

export const seriesColor = (series: ChartSeries, index: number) =>
  `var(--chart-series-${series.color ?? (index % 8) + 1}-color)`;

/** Round numbers for axis ticks covering [min, max]. */
export function niceTicks(min: number, max: number, count = 5): number[] {
  if (min === max) {
    max = min === 0 ? 1 : min * 1.1;
    if (min > 0) min = 0;
  }
  const span = max - min;
  const rough = span / Math.max(1, count - 1);
  const power = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * power).find((s) => s >= rough) ?? power * 10;
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Number(v.toFixed(10)));
  return ticks;
}

export const defaultFormat = (value: number) =>
  new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value);

/** Width of an element, kept up to date as it resizes. */
export function useWidth<T extends HTMLElement>(fallback = 600): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setWidth(w);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

/** True when the element's text runs right to left. */
export function useRtl(ref: RefObject<HTMLElement | null>): boolean {
  const [rtl, setRtl] = useState(false);
  useEffect(() => {
    const update = () => {
      if (ref.current) setRtl(getComputedStyle(ref.current).direction === 'rtl');
    };
    update();
    // Follow language switches, which change dir on an ancestor.
    if (typeof MutationObserver === 'undefined') return;
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
      subtree: true,
    });
    return () => observer.disconnect();
  }, [ref]);
  return rtl;
}

export interface ChartLegendProps {
  items: { label: string; color: string }[];
}

/** Colored markers with series names. */
export const ChartLegend = ({ items }: ChartLegendProps) => (
  <ul className="ds-chart__legend">
    {items.map((item) => (
      <li key={item.label} className="ds-chart__legend-item">
        <span
          className="ds-chart__legend-marker"
          style={{ backgroundColor: item.color }}
          aria-hidden="true"
        />
        {item.label}
      </li>
    ))}
  </ul>
);

export interface ChartFrameProps {
  /** Names the chart for everyone; shown above it unless hideTitle. */
  title: string;
  hideTitle?: boolean;
  /** One sentence on what the chart shows, e.g. the key takeaway. */
  description?: ReactNode;
  legend?: ReactNode;
  /** Visually hidden table with every value, for screen readers. */
  table: { columns: string[]; rows: (string | number)[][] };
  className?: string;
  children: ReactNode;
}

/** The figure around every chart: title, description, plot, legend and the data table. */
export const ChartFrame = ({
  title,
  hideTitle,
  description,
  legend,
  table,
  className,
  children,
}: ChartFrameProps) => {
  const id = useId();
  return (
    <figure
      className={['ds-chart', className].filter(Boolean).join(' ')}
      aria-labelledby={`${id}-title`}
    >
      <figcaption className="ds-chart__caption">
        <span id={`${id}-title`} className={hideTitle ? 'ds-chart__hidden' : 'ds-chart__title'}>
          {title}
        </span>
        {description && <span className="ds-chart__description">{description}</span>}
      </figcaption>
      {children}
      {legend}
      <table className="ds-chart__hidden">
        <caption>{title}</caption>
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};

/**
 * Pointer and keyboard reading of a chart: hover or arrow keys pick a point and show its
 * tooltip. The plot is one tab stop; its values are also in the hidden data table.
 */
export function useActiveIndex(count: number, rtl: boolean) {
  const [active, setActive] = useState<number | null>(null);
  const onKeyDown = (event: KeyboardEvent) => {
    if (!count) return;
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    if (event.key === forward || event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => (i === null ? 0 : Math.min(count - 1, i + 1)));
    } else if (event.key === back || event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => (i === null ? count - 1 : Math.max(0, i - 1)));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(count - 1);
    } else if (event.key === 'Escape') {
      setActive(null);
    }
  };
  return { active, setActive, onKeyDown, onBlur: () => setActive(null) };
}

export interface ChartTooltipProps {
  x: number;
  y: number;
  title: ReactNode;
  items: { label: string; value: string; color: string }[];
  /** Plot width, so the tooltip flips to stay inside. */
  width: number;
}

/** The floating box with the values at the active point. */
export const ChartTooltip = ({ x, y, title, items, width }: ChartTooltipProps) => (
  <div
    className="ds-chart__tooltip"
    style={{
      // Plot coordinates are physical (SVG), so position from the left edge.
      left: 0,
      transform: `translate(${x > width / 2 ? `calc(${x}px - 100% - 12px)` : `${x + 12}px`}, ${y}px)`,
    }}
  >
    <span className="ds-chart__tooltip-title">{title}</span>
    {items.map((item) => (
      <span key={item.label} className="ds-chart__tooltip-row">
        <span
          className="ds-chart__legend-marker"
          style={{ backgroundColor: item.color }}
          aria-hidden="true"
        />
        <span className="ds-chart__tooltip-label">{item.label}</span>
        <span className="ds-chart__tooltip-value">{item.value}</span>
      </span>
    ))}
  </div>
);

/** Announces the active point to screen readers while reading with the arrow keys. */
export const ChartLive = ({ text }: { text: string }) => (
  <span className="ds-chart__hidden" aria-live="polite">
    {text}
  </span>
);
