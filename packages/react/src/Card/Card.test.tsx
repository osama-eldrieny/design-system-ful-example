import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from './Card';

describe('Card', () => {
  it('is an article with a heading', () => {
    render(
      <Card>
        <CardBody>
          <CardTitle>Title</CardTitle>
          <CardDescription>Text</CardDescription>
        </CardBody>
      </Card>,
    );
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Title' })).toBeInTheDocument();
  });

  it('turns the title into the single card link when href is set', () => {
    render(
      <Card href="/a">
        <CardBody>
          <CardTitle as="h2">Read more about tokens</CardTitle>
        </CardBody>
      </Card>,
    );
    const link = screen.getByRole('link', { name: 'Read more about tokens' });
    expect(link).toHaveAttribute('href', '/a');
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 2 })).toContainElement(link);
  });

  it('renders media with the given alt text, or nothing without src', () => {
    const { container, rerender } = render(<CardMedia src="/p.png" alt="Headphones" />);
    expect(screen.getByRole('img', { name: 'Headphones' })).toBeInTheDocument();
    rerender(<CardMedia alt="" />);
    expect(container.querySelector('img')).toBeNull();
  });
});

describe('Card header and footer', () => {
  it('renders a header with title, description and actions, and a divided footer', () => {
    const { container } = render(
      <Card padding="none">
        <CardHeader
          titleAs="h2"
          title="Panel"
          description="Details"
          actions={<button type="button">Go</button>}
        />
        <CardFooter divided>Foot</CardFooter>
      </Card>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Panel' })).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
    expect(container.querySelector('.ds-card--flush')).toBeInTheDocument();
    expect(container.querySelector('.ds-card__footer--divided')).toHaveTextContent('Foot');
  });
});

describe('Card ribbon', () => {
  it('renders a ribbon with its tone', () => {
    const { container } = render(
      <Card ribbon="New" ribbonTone="success">
        Body
      </Card>,
    );
    const ribbon = container.querySelector('.ds-card__ribbon');
    expect(ribbon).toHaveTextContent('New');
    expect(ribbon).toHaveClass('ds-card__ribbon--success');
  });
});
