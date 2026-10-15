import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { KanbanBoard } from './KanbanBoard';

describe('KanbanBoard', () => {
  it('shows each column with its count and its cards', () => {
    render(
      <KanbanBoard
        label="Tasks"
        columns={[
          { id: 'todo', title: 'To do', items: [{ id: '1', title: 'Write brief' }, { id: '2', title: 'Review' }] },
          { id: 'done', title: 'Done', items: [] },
        ]}
      />,
    );
    expect(screen.getByRole('region', { name: 'Tasks' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /To do/ })).toHaveTextContent('2');
    expect(screen.getByRole('heading', { level: 3, name: 'Write brief' })).toBeInTheDocument();
  });
});
