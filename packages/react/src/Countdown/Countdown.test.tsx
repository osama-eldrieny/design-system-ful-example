import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Countdown } from './Countdown';

const now = new Date('2026-10-20T12:00:00Z');

describe('Countdown', () => {
  it('reads the remaining time as one sentence', () => {
    render(<Countdown label="Launch in" to={new Date('2026-10-22T13:30:05Z')} now={now} />);
    expect(screen.getByRole('region', { name: 'Launch in 2 days, 1 hours, 30 minutes, 5 seconds' })).toBeInTheDocument();
  });

  it('shows the ended message when the time has passed', () => {
    render(<Countdown label="Launch in" to={new Date('2026-10-19T00:00:00Z')} now={now} endedLabel="Launched" />);
    expect(screen.getByText('Launched')).toBeInTheDocument();
  });

  it('zero-pads hours, minutes and seconds', () => {
    const { container } = render(<Countdown label="Launch in" to={new Date('2026-10-20T13:05:09Z')} now={now} />);
    const values = Array.from(container.querySelectorAll('.ds-countdown__value')).map((v) => v.textContent);
    expect(values).toEqual(['0', '01', '05', '09']);
  });
});
