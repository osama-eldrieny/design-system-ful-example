import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Modal, ModalContent } from './Modal';

describe('Modal', () => {
  it('is a named, described dialog with a close button', () => {
    render(
      <Modal defaultOpen>
        <ModalContent title="Rename" description="Pick a name.">
          Body
        </ModalContent>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Rename' });
    expect(dialog).toHaveAccessibleDescription('Pick a name.');
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('is an alertdialog without a close icon', () => {
    render(
      <Modal defaultOpen>
        <ModalContent role="alertdialog" title="Delete?">
          Body
        </ModalContent>
      </Modal>,
    );
    expect(screen.getByRole('alertdialog', { name: 'Delete?' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
  });
});

describe('ModalContent inline', () => {
  it('draws the dialog in place with its title and footer', () => {
    render(
      <ModalContent inline title="Delete project?" description="Can’t be undone.">
        <button type="button">Cancel</button>
      </ModalContent>,
    );
    expect(screen.getByRole('dialog', { name: 'Delete project?' })).toHaveClass('ds-modal--inline');
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
});
