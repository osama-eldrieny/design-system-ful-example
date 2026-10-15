import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Rating } from './Rating';

describe('Rating', () => {
  it('is a named radio group with one radio per star', () => {
    render(<Rating label="Rate this" />);
    expect(screen.getByRole('radiogroup', { name: 'Rate this' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('chooses a score', () => {
    const onValueChange = vi.fn();
    render(<Rating label="Rate" onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole('radio', { name: '2 stars' }));
    expect(onValueChange).toHaveBeenCalledWith(2);
    expect(screen.getByRole('radio', { name: '2 stars' })).toBeChecked();
  });

  it('read-only is an image with a summary and no radios', () => {
    render(<Rating label="Average" value={4.5} readOnly showValue />);
    expect(screen.getByRole('img', { name: 'Average: Rated 4.5 out of 5' })).toBeInTheDocument();
    expect(screen.queryByRole('radio')).toBeNull();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('respects max', () => {
    render(<Rating label="Rate" max={3} />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });
});
