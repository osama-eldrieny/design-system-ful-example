import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InlineCTA } from './InlineCTA';

describe('InlineCTA', () => {
  it('renders a heading, description and actions', () => {
    render(<InlineCTA title="Upgrade" description="Get more." actions={<button type="button">Go</button>} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Upgrade' })).toBeInTheDocument();
    expect(screen.getByText('Get more.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });

  it('sets the heading level', () => {
    render(<InlineCTA title="Upgrade" headingLevel={2} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('applies appearance and layout classes', () => {
    const { container } = render(<InlineCTA title="X" appearance="brand" layout="stacked" />);
    expect(container.firstChild).toHaveClass('ds-inline-cta--brand', 'ds-inline-cta--stacked');
  });
});
