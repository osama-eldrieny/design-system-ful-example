import { defineMeta } from '../meta';

export default defineMeta({
  id: 'card',
  name: 'Card',
  category: 'Data display',
  status: 'stable',
  since: '0.2.0',
  description:
    'A card groups content and actions about one subject, such as an article, a product or a person, into a single container. It can hold media, a title, text and actions, and can link to a detail page.',
  imports: [
    { name: 'Card', from: '@ds/react' },
    { name: 'CardMedia', from: '@ds/react' },
    { name: 'CardBody', from: '@ds/react' },
    { name: 'CardTitle', from: '@ds/react' },
    { name: 'CardDescription', from: '@ds/react' },
    { name: 'CardFooter', from: '@ds/react' },
  ],
  whenToUse: [
    'To show a collection of similar items people scan and compare, e.g. products or articles in a grid.',
    'To group a summary and its actions, linking to a detail page.',
  ],
  whenNotToUse: [
    { text: 'To lay out a whole page section.', alternative: 'A section or Stack' },
    { text: 'For rows of data people compare column by column.', alternative: 'Table' },
    { text: 'For a single message or status.', alternative: 'Alert' },
  ],
  anatomy: [
    {
      name: 'Container',
      description: 'Background, corners (radius theme) and shadow (shadow theme).',
    },
    {
      name: 'Media',
      description: 'Optional image; the theme’s placeholder shows without one.',
      optional: true,
    },
    { name: 'Title', description: 'Names the subject; becomes the link in a clickable card.' },
    { name: 'Description', description: 'Optional supporting text.', optional: true },
    { name: 'Footer', description: 'Optional actions or metadata.', optional: true },
  ],
  options: [
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        {
          value: 'elevated',
          meaning: 'Shadow from the shadow theme. Default on page backgrounds.',
        },
        {
          value: 'outlined',
          meaning: 'Border instead of shadow, for dense layouts and flat themes.',
        },
        { value: 'filled', meaning: 'Tinted background, for grouping inside another surface.' },
      ],
    },
    {
      prop: 'orientation',
      title: 'Orientation',
      values: [
        { value: 'vertical', meaning: 'Media above the body. Default for grids.' },
        { value: 'horizontal', meaning: 'Media beside the body, for lists.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'At rest.', trigger: '—' },
    {
      name: 'Hover',
      meaning: 'A clickable card highlights its border.',
      trigger: ':hover on a card with href.',
    },
    {
      name: 'Focus',
      meaning: 'The whole card shows the focus ring when its link has focus.',
      trigger: ':focus-within.',
    },
  ],
  behavior: [
    {
      topic: 'Clickable cards',
      text: 'With href, the title becomes the link and its hit area stretches over the card: one link, one Tab stop, a sensible screen reader name.',
    },
    {
      topic: 'Actions in cards',
      text: 'Buttons in CardFooter stay clickable and separate from the card link.',
    },
    {
      topic: 'Headings',
      text: 'Pick the CardTitle level (as) that fits the page outline; default h3.',
    },
    {
      topic: 'Themes',
      text: 'Corners follow the radius theme, the elevated shadow the shadow theme, colors brand and mode.',
    },
  ],
  content: [
    'Keep titles short and front-load the important words.',
    'Keep descriptions to one or two lines in grids so cards stay the same height.',
  ],
  guidelines: [
    {
      do: 'Make the whole card clickable with href when it leads to one place.',
      dont: 'Nest several links that all go to the same page.',
      why: 'Repeated links add Tab stops and noise for screen readers.',
    },
    {
      do: 'Keep cards in a grid consistent: same parts, same order.',
      dont: 'Mix cards with and without media in one row.',
      why: 'Consistent cards are easier to scan and compare.',
    },
    {
      do: 'Use outlined cards when the shadow theme is flat.',
      dont: 'Place flat, borderless cards on a background of the same color.',
      why: 'Without a shadow or border the card’s edges disappear.',
    },
  ],
  accessibility: {
    role: 'article by default (or the element you choose with as).',
    keyboard: [
      { keys: 'Tab', action: 'Reaches the card link (with href) and any footer actions.' },
      { keys: 'Enter', action: 'Follows the card link.' },
    ],
    aria: [{ attribute: 'none needed', when: 'The heading and link give the card its name.' }],
    focus: 'In a clickable card, the focus ring surrounds the whole card.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Cards use real headings and an article element.',
      },
      { criterion: '2.4.4 Link Purpose', how: 'The card link is named by its title.' },
      {
        criterion: '1.1.1 Non-text Content',
        how: 'CardMedia requires alt (empty when decorative).',
      },
    ],
    notes: ['Avoid making a card clickable and also putting other links in its body.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Article card',
      description: 'Media, title and description.',
      code: `import { Card, CardMedia, CardBody, CardTitle, CardDescription } from '@ds/react';

<Card>
  <CardMedia src="/covers/tokens.png" alt="" />
  <CardBody>
    <CardTitle>Design tokens in practice</CardTitle>
    <CardDescription>How one CSS file themes three brands.</CardDescription>
  </CardBody>
</Card>`,
    },
    {
      id: 'link',
      title: 'Clickable card',
      description: 'The whole card links to the article.',
      code: `import { Card, CardBody, CardTitle, CardDescription } from '@ds/react';

<Card href="/articles/tokens" appearance="outlined">
  <CardBody>
    <CardTitle>Design tokens in practice</CardTitle>
    <CardDescription>8 min read</CardDescription>
  </CardBody>
</Card>`,
    },
    {
      id: 'actions',
      title: 'With actions',
      description: 'Footer actions stay separate from the card.',
      code: `import { Card, CardBody, CardTitle, CardFooter, Button } from '@ds/react';

<Card>
  <CardBody>
    <CardTitle>Pro plan</CardTitle>
  </CardBody>
  <CardFooter>
    <Button size="small">Upgrade</Button>
  </CardFooter>
</Card>`,
    },
  ],
  tokenPrefixes: ['--card-'],
  related: [{ id: 'product-card', relation: 'Pattern for products, built from Card.' }],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Card is now a generic container (media, body, title, description, footer) with appearances and orientations.',
        'The product layout moved to ProductCard; the brand prop and its hard-coded colors were removed (use ThemeProvider).',
        'Accessible clickable cards via href.',
      ],
    },
    {
      version: '1.1.0',
      date: '2026-09-30',
      changes: ['Outlined cards use a softer border (--card-outlined-border-color).'],
    },
  ],
});
