import { act, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToastProvider, useToast } from './Toast';

describe('Toast', () => {
  it('shows a toast with its action and dismiss button', () => {
    const { result } = renderHook(() => useToast(), { wrapper: ToastProvider });
    act(() =>
      result.current({
        title: 'Project deleted',
        action: { label: 'Undo', onClick: () => {}, altText: 'Restore from Trash' },
        duration: Infinity,
      }),
    );
    expect(screen.getByText('Project deleted')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('throws outside a provider', () => {
    const Bare = () => {
      useToast();
      return null;
    };
    expect(() => render(<Bare />)).toThrow('ToastProvider');
  });
});
