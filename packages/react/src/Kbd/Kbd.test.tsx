import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('renders keys joined by plus', () => {
    const { container } = render(<Kbd keys={['Ctrl', 'K']} />);
    expect(container.querySelectorAll('kbd kbd')).toHaveLength(2);
    expect(container).toHaveTextContent('Ctrl+K');
  });

  it('renders a single key', () => {
    render(<Kbd>Esc</Kbd>);
    expect(screen.getByText('Esc').tagName).toBe('KBD');
  });
});
