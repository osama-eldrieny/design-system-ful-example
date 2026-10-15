import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Badge } from '../Badge';
import { Card, CardBody, CardDescription, CardTitle } from '../Card';
import './KanbanBoard.css';

export interface KanbanCardData {
  id: string;
  /** The task, in a few words. */
  title: ReactNode;
  /** Optional detail under the title. */
  description?: ReactNode;
  /** Tags, dates and counts shown under the detail. */
  meta?: ReactNode;
}

export interface KanbanColumnData {
  id: string;
  /** The stage, e.g. "In progress". */
  title: ReactNode;
  items: KanbanCardData[];
}

export interface KanbanBoardProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the board, e.g. "Task board". */
  label: string;
  columns: KanbanColumnData[];
  /** Tighter cards and gaps, to fit more tasks on screen. */
  compact?: boolean;
  /** Controls at the end of each card, e.g. a menu to move it to another column. */
  renderActions?: (item: KanbanCardData, column: KanbanColumnData) => ReactNode;
}

/**
 * Work grouped into columns by stage: each column has a title and count, and each task is a card
 * with its detail and metadata. Use it to see and move work across stages.
 */
export const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  ({ label, columns, compact = false, renderActions, className, ...props }, ref) => (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      className={['ds-kanban-board', compact && 'ds-kanban-board--compact', className].filter(Boolean).join(' ')}
      {...props}
    >
      {columns.map((column) => (
        <div key={column.id} role="group" className="ds-kanban-board__column" aria-labelledby={`${column.id}-title`}>
          <h2 id={`${column.id}-title`} className="ds-kanban-board__title">
            {column.title}
            <Badge size="small" shape="modern" tone="gray">
              {column.items.length}
            </Badge>
          </h2>
          <ul className="ds-kanban-board__items">
            {column.items.map((item) => (
              <Card key={item.id} as="li" appearance="outlined" className="ds-kanban-board__card">
                <CardBody>
                  <div className="ds-kanban-board__card-head">
                    <CardTitle as="h3" className="ds-kanban-board__card-title">
                      {item.title}
                    </CardTitle>
                    {renderActions && renderActions(item, column)}
                  </div>
                  {item.description && <CardDescription>{item.description}</CardDescription>}
                  {item.meta && <div className="ds-kanban-board__card-meta">{item.meta}</div>}
                </CardBody>
              </Card>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ),
);
KanbanBoard.displayName = 'KanbanBoard';
