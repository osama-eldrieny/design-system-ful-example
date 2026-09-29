import { defineMeta } from '../meta';

export default defineMeta({
  id: 'tabs',
  name: 'Tabs',
  category: 'Navigation',
  status: 'stable',
  since: '0.2.0',
  description:
    'Tabs switch between related views of content in the same place, one at a time. Tabs holds the state, TabList the row of Tab buttons, and each TabPanel the content for one tab.',
  imports: [
    { name: 'Tabs', from: '@ds/react' },
    { name: 'TabList', from: '@ds/react' },
    { name: 'Tab', from: '@ds/react' },
    { name: 'TabPanel', from: '@ds/react' },
  ],
  whenToUse: [
    'To organize related content into views people switch between without leaving the page.',
    'To filter one list by category, e.g. All / Electronics / Accessories.',
  ],
  whenNotToUse: [
    { text: 'To navigate to other pages.', alternative: 'Navbar or links' },
    { text: 'For content people need to compare side by side.', alternative: 'Show it together' },
    { text: 'For a sequence of steps.', alternative: 'Stepper' },
    { text: 'To choose a form value.', alternative: 'RadioGroup' },
  ],
  anatomy: [
    { name: 'Tab list', description: 'The row of tabs; enclosed tabs sit in a tinted container.' },
    { name: 'Selected tab', description: 'The tab whose panel is showing.' },
    { name: 'Tab', description: 'A label, optionally with an icon.' },
    { name: 'Panel', description: 'The content for the selected tab.' },
  ],
  options: [
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'enclosed', meaning: 'Tabs in a tinted container. Compact filters and toolbars.' },
        {
          value: 'pill',
          meaning: 'Filled pill on the selected tab, no container. Light filtering inside cards.',
        },
        { value: 'line', meaning: 'Underline under the selected tab. Page-level sections.' },
      ],
    },
    {
      prop: 'orientation',
      title: 'Orientation',
      values: [
        { value: 'horizontal', meaning: 'Tabs in a row above the panel. Default.' },
        {
          value: 'vertical',
          meaning:
            'Tabs in a column beside the panel, e.g. settings with many sections. A row again on narrow screens.',
        },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Not selected.', trigger: 'At rest.' },
    { name: 'Hover', meaning: 'Shows the tab responds to the pointer.', trigger: ':hover.' },
    { name: 'Selected', meaning: 'Its panel is showing.', trigger: 'value matches the tab.' },
    {
      name: 'Focus',
      meaning: 'Shows keyboard focus.',
      trigger: ':focus-visible; adds the focus ring.',
    },
    { name: 'Disabled', meaning: 'Not available right now.', trigger: 'disabled on a Tab.' },
  ],
  behavior: [
    {
      topic: 'Keyboard',
      text: 'The tab list is one Tab stop. Arrow keys move between tabs and select them; Home and End jump to the first and last; Tab moves into the panel.',
    },
    {
      topic: 'Filtering',
      text: 'When tabs filter one list, render a single TabPanel with value set to the selected tab.',
    },
    {
      topic: 'Overflow',
      text: 'Tabs wrap onto a new line when they don’t fit; keep labels short and the number of tabs small.',
    },
    {
      topic: 'Right-to-left',
      text: 'Tab order and arrow keys follow the reading direction in Arabic.',
    },
  ],
  content: [
    'Use one or two words per tab, in sentence case.',
    'Label the tab list with what it switches between, e.g. "Product categories".',
    'Keep the order stable; don’t reorder tabs based on use.',
  ],
  guidelines: [
    {
      do: 'Use tabs for peer views of the same subject.',
      dont: 'Use tabs as page navigation.',
      why: 'Tabs change content in place; links belong in navigation.',
    },
    {
      do: 'Keep to a handful of short tabs.',
      dont: 'Squeeze in many tabs with long labels.',
      why: 'Too many tabs wrap and become hard to scan; consider a Select instead.',
    },
    {
      do: 'Select a sensible tab by default.',
      dont: 'Show tabs with none selected.',
      why: 'A panel should always be visible so the page isn’t empty.',
    },
  ],
  accessibility: {
    role: 'tablist with tab buttons and tabpanel regions (Radix Tabs).',
    keyboard: [
      { keys: 'Tab', action: 'Moves focus to the selected tab, then into the panel.' },
      { keys: 'Arrow Left / Right', action: 'Moves to and selects the previous or next tab.' },
      { keys: 'Home / End', action: 'Moves to the first or last tab.' },
    ],
    aria: [
      { attribute: 'aria-label on the tablist', when: 'From TabList’s label prop.' },
      { attribute: 'aria-selected', when: 'Set on the selected tab.' },
      { attribute: 'aria-controls / aria-labelledby', when: 'Link each tab and its panel.' },
    ],
    focus: 'Tabs and the panel show the focus ring when reached with the keyboard.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Tabs and panels are linked; the list is labelled.',
      },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Tab labels pass 4.5:1 in every state and theme.',
      },
      {
        criterion: '2.1.1 Keyboard',
        how: 'Arrow keys, Home and End as in the WAI-ARIA tabs pattern.',
      },
      { criterion: '4.1.2 Name, Role, Value', how: 'Exposed as tabs with their selected state.' },
    ],
    notes: [
      'Selected tabs are shown with color and a heavier weight (and an underline in the line appearance), not color alone.',
    ],
  },
  examples: [
    {
      id: 'basic',
      title: 'Sections of a page',
      description: 'Line tabs with a panel per tab.',
      code: `import { Tabs, TabList, Tab, TabPanel } from '@ds/react';

<Tabs defaultValue="overview" appearance="line">
  <TabList label="Project">
    <Tab value="overview">Overview</Tab>
    <Tab value="activity">Activity</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  <TabPanel value="overview">…</TabPanel>
  <TabPanel value="activity">…</TabPanel>
  <TabPanel value="settings">…</TabPanel>
</Tabs>`,
    },
    {
      id: 'filter',
      title: 'Filtering one list',
      description: 'One panel shows the list for the selected tab.',
      code: `import { Tabs, TabList, Tab, TabPanel } from '@ds/react';

<Tabs value={category} onValueChange={setCategory}>
  <TabList label="Product categories">
    <Tab value="all">All</Tab>
    <Tab value="electronics">Electronics</Tab>
  </TabList>
  <TabPanel value={category}>
    <ProductGrid category={category} />
  </TabPanel>
</Tabs>`,
    },
    {
      id: 'icons',
      title: 'With icons',
      description: 'Icons support the labels.',
      code: `import { Tabs, TabList, Tab } from '@ds/react';
import { LayoutGrid, Laptop } from 'lucide-react';

<Tabs defaultValue="all" appearance="pill">
  <TabList label="Categories">
    <Tab value="all" icon={<LayoutGrid />}>All</Tab>
    <Tab value="electronics" icon={<Laptop />}>Electronics</Tab>
  </TabList>
</Tabs>`,
    },
  ],
  tokenPrefixes: ['--tabs-'],
  related: [
    { id: 'navbar', relation: 'Use for navigation between pages.' },
    { id: 'radio-group', relation: 'Use to choose a form value.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Compound API (Tabs, TabList, Tab, TabPanel) on Radix with keyboard navigation and linked panels.',
        'Appearances enclosed, pill and line; icons as React nodes; tokens renamed from --tap-* to --tabs-*.',
      ],
    },
    {
      version: '1.1.0',
      date: '2026-09-29',
      changes: [
        'Line tabs: thin neutral baseline, so only the selected tab is underlined in the accent color.',
      ],
    },
  ],
});
