import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
import { IconButton } from './IconButton';

describe('Button', () => {
  it('renders a native button with its label', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('defaults to type="button" so it never submits a form by accident', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('calls onClick from a pointer and from the keyboard', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('is disabled and not clickable when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('stays focusable but ignores clicks and announces busy while loading', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('hides decorative icons from assistive technology', () => {
    render(<Button iconStart={<svg data-testid="icon" />}>Download</Button>);
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
  });

  it('applies variant, appearance and size classes', () => {
    render(
      <Button variant="danger" appearance="outline" size="large">
        Delete
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveClass(
      'ds-button--danger',
      'ds-button--outline',
      'ds-button--large',
    );
  });

  it('renders a link with href, not followed while disabled', () => {
    const { rerender } = render(<Button href="/report">View report</Button>);
    expect(screen.getByRole('link', { name: 'View report' })).toHaveAttribute('href', '/report');
    rerender(
      <Button href="/report" disabled>
        View report
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'View report' });
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows loadingText while loading', () => {
    render(
      <Button loading loadingText="Saving…">
        Save
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Saving…' })).toHaveAttribute('aria-busy', 'true');
  });
});

describe('IconButton', () => {
  it('uses its label as the accessible name and tooltip', () => {
    render(<IconButton icon={<svg />} label="Close dialog" />);
    const button = screen.getByRole('button', { name: 'Close dialog' });
    expect(button).toHaveAttribute('title', 'Close dialog');
    expect(button).toHaveClass('ds-button--icon-only');
  });
});
