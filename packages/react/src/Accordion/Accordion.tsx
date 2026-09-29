import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

export type AccordionProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

/**
 * Stacked sections that show and hide their content, e.g. FAQs. `type="single"` opens one at a
 * time (add `collapsible` to allow closing it); `type="multiple"` opens any number.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Root
      ref={ref}
      className={['ds-accordion', className].filter(Boolean).join(' ')}
      {...(props as ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
    />
  ),
);
Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends Omit<
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
  'title'
> {
  /** Id of this section within the accordion. */
  value: string;
  /** The heading text of the button that opens the section. */
  title: ReactNode;
  /** Heading level of the title, to fit the page outline. Default h3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

/** One section: a heading with a button, and its content. */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ title, headingLevel = 3, className, children, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={['ds-accordion__item', className].filter(Boolean).join(' ')}
      {...props}
    >
      <AccordionPrimitive.Header className="ds-accordion__header" asChild>
        {(() => {
          const Heading = `h${headingLevel}` as const;
          return (
            <Heading className="ds-accordion__header">
              <AccordionPrimitive.Trigger className="ds-accordion__trigger">
                <span>{title}</span>
                <ChevronDown className="ds-accordion__icon" aria-hidden="true" />
              </AccordionPrimitive.Trigger>
            </Heading>
          );
        })()}
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="ds-accordion__content">
        <div className="ds-accordion__body">{children}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  ),
);
AccordionItem.displayName = 'AccordionItem';
