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

  it('keeps each button’s own onClick', async () => {
    const onClick = vi.fn();
    render(
      <ButtonGroup aria-label="Zoom">
        <Button onClick={onClick}>Zoom in</Button>
      </ButtonGroup>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(onClick).toHaveBeenCalled();
  });
});
