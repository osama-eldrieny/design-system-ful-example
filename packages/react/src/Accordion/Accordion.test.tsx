import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Accordion, AccordionItem } from './Accordion';

describe('Accordion', () => {
  it('toggles sections from heading buttons', async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a" title="Question" headingLevel={2}>
          Answer
        </AccordionItem>
      </Accordion>,
    );
    const button = screen.getByRole('button', { name: 'Question' });
    expect(screen.getByRole('heading', { level: 2 })).toContainElement(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Answer')).toBeInTheDocument();
  });
});
