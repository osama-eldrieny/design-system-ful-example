import { render, screen } from '@testing-library/react';
import { Bell } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { FeaturedIcon } from './FeaturedIcon';

describe('FeaturedIcon', () => {
  it('is decorative by default', () => {
    const { container } = render(<FeaturedIcon icon={<Bell />} />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.firstChild).toHaveClass('ds-featured-icon--primary-light');
  });

  it('is a named image with a label', () => {
    render(<FeaturedIcon icon={<Bell />} label="Notifications" tone="danger" appearance="solid" />);
    expect(screen.getByRole('img', { name: 'Notifications' })).toHaveClass(
      'ds-featured-icon--danger-solid',
    );
  });

  it('applies size, shape and the neutral modern look', () => {
    const { container } = render(
      <FeaturedIcon icon={<Bell />} appearance="modern" size="large" shape="square" />,
    );
    expect(container.firstChild).toHaveClass(
      'ds-featured-icon--modern',
      'ds-featured-icon--large',
      'ds-featured-icon--square',
    );
  });
});
