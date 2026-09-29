import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders hidden text lines', () => {
    const { container } = render(<Skeleton lines={2} />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('.ds-skeleton__line')).toHaveLength(2);
  });

  it('sizes a circle from its width', () => {
    const { container } = render(<Skeleton variant="circle" width={40} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.inlineSize).toBe('40px');
    expect(el.style.blockSize).toBe('40px');
  });
});
