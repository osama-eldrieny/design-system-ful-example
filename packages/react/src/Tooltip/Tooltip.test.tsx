import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('describes its trigger when open', () => {
    render(
      <Tooltip content="Delete item" defaultOpen>
        <button type="button" aria-label="Delete" />
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toHaveTextContent('Delete item');
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveAccessibleDescription(
      'Delete item',
    );
  });
});
