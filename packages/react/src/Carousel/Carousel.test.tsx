import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Carousel } from './Carousel';

const slides = ['One', 'Two', 'Three'];

describe('Carousel', () => {
  it('shows one slide and names it by its position', () => {
    render(<Carousel label="Highlights" slides={slides} />);
    expect(screen.getByRole('region', { name: 'Highlights' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '1 of 3' })).toHaveTextContent('One');
  });

  it('moves forward and wraps around', () => {
    const onIndexChange = vi.fn();
    render(<Carousel label="Highlights" slides={slides} defaultIndex={2} onIndexChange={onIndexChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(onIndexChange).toHaveBeenCalledWith(0);
  });

  it('hides arrows when controls is dots', () => {
    render(<Carousel label="Highlights" slides={slides} controls="dots" />);
    expect(screen.queryByRole('button', { name: 'Next slide' })).toBeNull();
    expect(screen.getAllByRole('button', { name: /Show slide/ })).toHaveLength(3);
  });
});
