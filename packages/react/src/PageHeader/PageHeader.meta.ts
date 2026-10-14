import { defineMeta } from '../meta';

export default defineMeta({
  id: 'page-header',
  name: 'PageHeader',
  category: 'Layout',
  status: 'stable',
  since: '1.1.0',
  description:
    'The top of a page or section: breadcrumbs, a title with supporting text, actions, and a row for tabs, search or filters. Small size works as a section or card header.',
  imports: [{ name: 'PageHeader', from: '@ds/react' }],
  whenToUse: [
    'At the top of every app page, with the page title as h1.',
    'Above a section or card, with size="small" and titleAs="h2".',
  ],
  whenNotToUse: [
    { text: 'For a person’s profile card.', alternative: 'Header' },
    { text: 'For the site’s top navigation.', alternative: 'Navbar' },
  ],
  anatomy: [
    { name: 'Breadcrumbs', description: 'Where the page sits.', optional: true },
    { name: 'Leading', description: 'An avatar or icon before the title.', optional: true },
    { name: 'Title', description: 'h1 by default.' },
    { name: 'Description', description: 'One line of supporting text.', optional: true },
    { name: 'Actions', description: 'The page’s main buttons.', optional: true },
    { name: 'Content row', description: 'Tabs, search or filters (children).', optional: true },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'medium', meaning: 'Page header. Default.' },
        { value: 'small', meaning: 'Section or card header.' },
      ],
    },
    {
      prop: 'divider',
      title: 'Divider',
      values: [
        { value: 'false', meaning: 'No line. Default.' },
        { value: 'true', meaning: 'A line under the header.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'The header itself is not interactive.', trigger: '—' }],
  behavior: [
    { topic: 'Wrapping', text: 'Actions wrap under the title on narrow screens.' },
    { topic: 'Right-to-left', text: 'The layout mirrors; actions move to the left.' },
  ],
  content: [
    'Title: the page’s name, matching the navigation item.',
    'Description: one sentence on what people do here.',
    'Keep to one primary action; put others in outline buttons or a menu.',
  ],
  guidelines: [
    {
      do: 'Use one h1 per page: the PageHeader title.',
      dont: 'Use several page headers with h1 on one page.',
      why: 'Headings form the page outline for screen readers.',
    },
    {
      do: 'Put the main action at the end of the title row.',
      dont: 'Scatter page-level actions through the content.',
      why: 'People look for page actions in the header.',
    },
    {
      do: 'Use children for tabs and filters that change the page’s content.',
      dont: 'Put unrelated controls in the header.',
      why: 'The header should frame what follows.',
    },
  ],
  accessibility: {
    role: 'A div with a heading; it adds no landmark, so several can share a page.',
    keyboard: [{ keys: 'Tab', action: 'Moves through breadcrumbs, actions and children.' }],
    aria: [{ attribute: 'Heading level', when: 'titleAs sets h1, h2 or h3.' }],
    focus: 'Only its interactive children are focusable.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'The title is a real heading.' },
      { criterion: '2.4.6 Headings and Labels', how: 'The title names the page.' },
    ],
    notes: ['Match the browser tab title to the page title.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Page header',
      description: 'Title, description and actions.',
      code: `import { Button, PageHeader } from '@ds/react';\n\n<PageHeader title="Products" description="Manage your catalog." actions={<Button>Add product</Button>} />`,
    },
    {
      id: 'breadcrumbs',
      title: 'With breadcrumbs and tabs',
      description: 'Children render under the title row.',
      code: `import { Breadcrumb, PageHeader, Tab, TabList, Tabs } from '@ds/react';\n\n<PageHeader title="Products" breadcrumbs={<Breadcrumb items={trail} />}>\n  <Tabs appearance="line" defaultValue="all">…</Tabs>\n</PageHeader>`,
    },
    {
      id: 'section',
      title: 'Section header',
      description: 'Small, with an h2.',
      code: `import { PageHeader } from '@ds/react';\n\n<PageHeader size="small" titleAs="h2" title="Recent orders" divider />`,
    },
  ],
  tokenPrefixes: ['--page-header-'],
  related: [
    { id: 'breadcrumb', relation: 'Above the title.' },
    { id: 'tabs', relation: 'In the content row.' },
  ],
  changelog: [{ version: '1.1.0', date: '2026-10-15', changes: ['New component.'] }],
});
