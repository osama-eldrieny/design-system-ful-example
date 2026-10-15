import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DescriptionList } from './DescriptionList';

describe('DescriptionList', () => {
  it('pairs each term with its description', () => {
    render(<DescriptionList items={[{ term: 'Total', description: '$10' }]} />);
    expect(screen.getByText('Total').tagName).toBe('DT');
    expect(screen.getByText('$10').tagName).toBe('DD');
  });

  it('marks emphasised rows', () => {
    const { container } = render(
      <DescriptionList items={[{ term: 'Total', description: '$10', emphasis: true }]} />,
    );
    expect(container.querySelector('.ds-description-list__row--emphasis')).toBeInTheDocument();
  });
});
