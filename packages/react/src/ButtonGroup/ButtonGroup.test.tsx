import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('is a named group that leaves plain buttons alone', () => {
    render(
      <ButtonGroup aria-label="Pages">
        <Button>Previous</Button>
        <Button>Next</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group', { name: 'Pages' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).not.toHaveAttribute('aria-pressed');
  });

  it('presses one segment at a time and keeps each button’s own onClick', async () => {
    const onValueChange = vi.fn();
    const onClick = vi.fn();
    render(
      <ButtonGroup aria-label="View" defaultValue="list" onValueChange={onValueChange}>
        <Button value="list">List</Button>
        <Button value="grid" onClick={onClick}>
          Grid
        </Button>
      </ButtonGroup>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Grid' }));
    expect(screen.getByRole('button', { name: 'Grid' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute('aria-pressed', 'false');
    expect(onValueChange).toHaveBeenCalledWith('grid');
    expect(onClick).toHaveBeenCalled();
  });
});
