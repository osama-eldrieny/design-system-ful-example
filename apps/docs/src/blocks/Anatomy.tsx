import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@ds/react';
import type { ComponentMeta } from '../../../../packages/react/src/meta';
import { useDocsTheme } from './theme-globals';
import './blocks.css';

type Marker = { n: number; x: number; y: number; side: 'top' | 'bottom'; leader: number };

/** A CSS selector inside the example, optionally pointing at its start or end edge. */
export type AnatomyTarget = string | { selector: string; at?: 'start' | 'center' | 'end' };

/**
 * Numbered diagram: renders a live example and points a numbered marker at each part.
 * `targets[i]` points at meta.anatomy[i]: a CSS selector inside the example, or
 * { selector, at } to point at the element's start or end edge.
 */
export function Anatomy({
  meta,
  targets,
  children,
}: {
  meta: ComponentMeta;
  targets: AnatomyTarget[];
  /** The live example to number. Overlays (tooltips, toasts) leave it out: parts table only. */
  children?: ReactNode;
}) {
  const [theme] = useDocsTheme();
  const stage = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const place = () => {
      const box = el.getBoundingClientRect();
      const next: Marker[] = [];
      targets.forEach((t, i) => {
        const { selector, at = 'center' } = typeof t === 'string' ? { selector: t } : t;
        const target = el.querySelector(selector);
        if (!target) return;
        const r = target.getBoundingClientRect();
        const side = i % 2 === 0 ? 'top' : 'bottom';
        const inset = Math.min(16, r.width / 4);
        const x =
          (at === 'start'
            ? r.left + inset
            : at === 'end'
              ? r.right - inset
              : r.left + r.width / 2) - box.left;
        const y = side === 'top' ? 20 : box.height - 20;
        const edge = side === 'top' ? r.top - box.top : r.bottom - box.top;
        next.push({ n: i + 1, x, y, side, leader: Math.max(0, Math.abs(edge - y) - 11) });
      });
      setMarkers(next);
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(el);
    return () => observer.disconnect();
  }, [targets, theme]);

  return (
    <div className="docs-block docs-anatomy">
      {children && (
        <ThemeProvider theme={theme} className="ds-canvas docs-anatomy__stage" ref={stage}>
          {children}
          {markers.map((m) => (
            <span
              key={m.n}
              className="docs-anatomy__marker"
              data-side={m.side}
              style={{
                insetInlineStart: m.x,
                insetBlockStart: m.y,
                ['--leader' as string]: `${m.leader}px`,
              }}
              aria-hidden="true"
            >
              {m.n}
            </span>
          ))}
        </ThemeProvider>
      )}
      <div className="docs-table-wrap">
        <table className="docs-table">
          <tbody>
            {meta.anatomy.map((part, i) => (
              <tr key={part.name}>
                <td className="docs-nowrap">
                  <span className="docs-num">{i + 1}</span>
                </td>
                <th scope="row" className="docs-nowrap">
                  {part.name}
                  {part.optional && <span className="docs-alt"> (optional)</span>}
                </th>
                <td>{part.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
