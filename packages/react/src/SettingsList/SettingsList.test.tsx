import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SettingsList } from './SettingsList';

describe('SettingsList', () => {
  it('renders one row per item with its title, description and control', () => {
    render(
      <SettingsList
        items={[
          { id: 'a', title: 'Password', description: 'Changed today', control: <button type="button">Change</button> },
          { id: 'b', title: 'Two-factor', control: <input type="checkbox" aria-label="2FA" /> },
        ]}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Changed today')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: '2FA' })).toBeInTheDocument();
  });

  it('frames the list when framed is set', () => {
    const { container } = render(<SettingsList framed items={[]} />);
    expect(container.firstChild).toHaveClass('ds-settings-list--framed');
  });
});
