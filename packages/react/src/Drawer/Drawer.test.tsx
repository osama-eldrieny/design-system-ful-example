import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Drawer, DrawerContent } from './Drawer';

describe('Drawer', () => {
  it('is a named dialog on its side', () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent side="bottom" title="Share">
          Body
        </DrawerContent>
      </Drawer>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Share' });
    expect(dialog).toHaveClass('ds-drawer--bottom');
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
