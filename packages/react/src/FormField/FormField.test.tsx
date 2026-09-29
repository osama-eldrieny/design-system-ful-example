import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormField, useFormField } from './FormField';

describe('FormField', () => {
  it('labels and describes a single control', () => {
    render(
      <FormField label="Start date" description="First day." error="Pick a date." required>
        <input type="date" />
      </FormField>,
    );
    const input = screen.getByLabelText(/Start date/);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('First day. Pick a date.');
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('keeps props the control sets itself', () => {
    render(
      <FormField label="Name" id="from-field">
        <input id="own-id" />
      </FormField>,
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'own-id');
  });

  it('shows the optional marker and success message', () => {
    render(
      <FormField label="Nickname" optional success="Looks good.">
        <input />
      </FormField>,
    );
    expect(screen.getByText('(optional)')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Nickname (optional)' }),
    ).toHaveAccessibleDescription('Looks good.');
  });

  it('renders a named, disabled group as a fieldset', () => {
    render(
      <FormField group label="Email me about" description="Any time." disabled>
        <input type="checkbox" aria-label="Comments" />
      </FormField>,
    );
    const group = screen.getByRole('group', { name: 'Email me about' });
    expect(group).toHaveAccessibleDescription('Any time.');
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('passes control props to a function child and to useFormField', () => {
    const Custom = () => {
      const control = useFormField();
      return <span data-testid="ctx">{control?.id}</span>;
    };
    render(
      <FormField label="Country" id="country">
        {(control) => (
          <>
            <input {...control} />
            <Custom />
          </>
        )}
      </FormField>,
    );
    expect(screen.getByLabelText('Country')).toHaveAttribute('id', 'country');
    expect(screen.getByTestId('ctx')).toHaveTextContent('country');
  });
});
