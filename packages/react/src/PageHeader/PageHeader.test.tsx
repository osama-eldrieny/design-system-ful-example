import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders a heading at the chosen level with description and actions', () => {
    render(
      <PageHeader
        title="Team"
        titleAs="h2"
        description="Manage members"
        actions={<button type="button">Invite</button>}
      />,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Team' })).toBeInTheDocument();
    expect(screen.getByText('Manage members')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Invite' })).toBeInTheDocument();
  });

  it('defaults to h1 and shows breadcrumbs and children', () => {
    render(
      <PageHeader title="Orders" breadcrumbs={<nav aria-label="Breadcrumb">Home</nav>}>
        <div>Filters</div>
      </PageHeader>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Orders');
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });
});
