import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('names its remove button after the tag', async () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>React</Tag>);
    await userEvent.click(screen.getByRole('button', { name: 'Remove React' }));
    expect(onRemove).toHaveBeenCalled();
  });

  it('is a toggle button when selectable', async () => {
    const onSelectedChange = vi.fn();
    render(
      <Tag selected={false} onSelectedChange={onSelectedChange}>
        On sale
      </Tag>,
    );
    const chip = screen.getByRole('button', { name: 'On sale' });
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it('is plain text without actions', () => {
    render(<Tag>Design</Tag>);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
