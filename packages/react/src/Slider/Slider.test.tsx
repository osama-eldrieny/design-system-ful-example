import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { Slider } from './Slider';

beforeAll(() => {
  // Radix measures the thumbs; jsdom has no ResizeObserver.
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

describe('Slider', () => {
  it('names a single thumb with the label and describes it', () => {
    render(
      <Slider
        label="Volume"
        defaultValue={[30]}
        description="Media volume."
        formatValue={(v) => `${v}%`}
      />,
    );
    const thumb = screen.getByRole('slider', { name: 'Volume' });
    expect(thumb).toHaveAttribute('aria-valuenow', '30');
    expect(thumb).toHaveAttribute('aria-valuetext', '30%');
    expect(thumb).toHaveAccessibleDescription('Media volume.');
  });

  it('names range thumbs and shows the formatted values', () => {
    render(<Slider label="Price" defaultValue={[10, 90]} showValue formatValue={(v) => `$${v}`} />);
    expect(screen.getByRole('slider', { name: 'Price Minimum' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Price Maximum' })).toBeInTheDocument();
    expect(screen.getByText('$10 – $90')).toBeInTheDocument();
  });
});
