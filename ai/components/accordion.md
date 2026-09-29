# Accordion

> An accordion stacks sections whose content shows and hides when their heading is pressed, such as an FAQ. One or several sections can be open.

Status: stable · Category: Data display · Since 0.4.0

```tsx
import { Accordion } from '@ds/react';
import { AccordionItem } from '@ds/react';
```

## When to use
- For FAQs and long pages people scan for one answer.
- For optional detail that would crowd the page.

## When not to use
- When people need to compare sections side by side. Use Tabs or a plain page.
- For content most people need. Use Show it directly.

## Type (`type`)
- `single`: One section open at a time; add collapsible to allow none.
- `multiple`: Any number open.

## States
- **Open**: Content shown; chevron up. (aria-expanded="true")
- **Hover**: Tinted heading. (:hover)
- **Focus**: Focus ring inside the heading. (:focus-visible)
- **Disabled**: Can’t open. (disabled)

## Props
### Accordion

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

### AccordionItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` |  | Id of this section within the accordion. |
| `title` | `ReactNode` |  | The heading text of the button that opens the section. |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | 3 | Heading level of the title, to fit the page outline. Default h3. |
| `asChild` | `boolean` |  |  |

## Guidelines
- Do: Write headings people can scan. Don’t: Use vague headings like “More”. Why: People decide what to open from the heading alone.
- Do: Pick the heading level that fits the page. Don’t: Leave every accordion at h3 regardless of context. Why: Screen reader users navigate by heading level.
- Do: Show essential content directly. Don’t: Hide required information in closed sections. Why: Many people never open accordions.

## Content
- Headings: the question or topic, specific enough to scan.

## Accessibility
- Role: headings containing buttons that control regions.
- Tab: Moves between headings.
- Enter / Space: Toggles a section.
- ↑ ↓ Home End: Move between headings.
- `aria-expanded / aria-controls`: On each heading button (Radix).
- Focus: Focus ring inside the heading.
- WCAG 1.3.1 Info and Relationships: Real headings and button semantics.
- WCAG 4.1.2 Name, Role, Value: Expanded state exposed.
- WCAG 2.1.1 Keyboard: Fully keyboard operable.

## Examples
### FAQ
One at a time.

```tsx
import { Accordion, AccordionItem } from '@ds/react';

<Accordion type="single" collapsible>
  <AccordionItem value="shipping" title="How long does shipping take?">3–5 working days.</AccordionItem>
  <AccordionItem value="returns" title="Can I return an item?">Yes, within 30 days.</AccordionItem>
</Accordion>
```

### Several open
Settings sections.

```tsx
import { Accordion, AccordionItem } from '@ds/react';

<Accordion type="multiple" defaultValue={['profile']}>
  <AccordionItem value="profile" title="Profile">…</AccordionItem>
  <AccordionItem value="security" title="Security">…</AccordionItem>
</Accordion>
```

### Heading level
Under an h2.

```tsx
import { Accordion, AccordionItem } from '@ds/react';

<h2>Help</h2>
<Accordion type="single" collapsible>
  <AccordionItem value="a" title="Question" headingLevel={3}>Answer.</AccordionItem>
</Accordion>
```

Tokens: `--accordion-*` (values per theme in ai/components/accordion.json).
