import { defineMeta } from '../meta';

export default defineMeta({
  id: 'pagination',
  name: 'Pagination',
  category: 'Navigation',
  status: 'stable',
  since: '0.2.0',
  description:
    'Pagination moves between pages of a long list or table. It shows where people are, lets them step forward and back, and jumps to a page, shortening long ranges with an ellipsis.',
  imports: [{ name: 'Pagination', from: '@ds/react' }],
  whenToUse: [
    'For long lists, search results or tables split into pages.',
    'When people need to know how much content there is and return to a specific page.',
  ],
  whenNotToUse: [
    {
      text: 'For feeds people browse casually.',
      alternative: 'Infinite scroll or a “Load more” button',
    },
    { text: 'For steps in a process.', alternative: 'Stepper' },
  ],
  anatomy: [
    { name: 'Previous button', description: 'Goes back one page; disabled on the first page.' },
    { name: 'Page number', description: 'Jumps to that page.' },
    { name: 'Current page', description: 'Filled, and announced as the current page.' },
    {
      name: 'Ellipsis',
      description: 'Stands in for skipped pages in long ranges.',
      optional: true,
    },
    { name: 'Next button', description: 'Goes forward one page; disabled on the last page.' },
  ],
  options: [
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'full', meaning: 'Page numbers with ellipses. Default.' },
        { value: 'simple', meaning: '“Page 2 of 10” between the arrows, for narrow spaces.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'A page people can go to.', trigger: 'At rest.' },
    { name: 'Hover', meaning: 'Shows the page responds to the pointer.', trigger: ':hover.' },
    { name: 'Current', meaning: 'The page being shown.', trigger: 'currentPage.' },
    { name: 'Focus', meaning: 'Shows keyboard focus.', trigger: ':focus-visible.' },
    { name: 'Disabled', meaning: 'No previous/next page.', trigger: 'On the first or last page.' },
  ],
  behavior: [
    {
      topic: 'Long ranges',
      text: 'Always shows the first and last page, siblingCount pages on each side of the current one, and “…” for the rest.',
    },
    {
      topic: 'After changing page',
      text: 'Scroll to the top of the list and consider moving focus to its heading so keyboard users land on the new content.',
    },
    {
      topic: 'Right-to-left',
      text: 'Order and arrows follow the reading direction: “previous” points right in Arabic.',
    },
  ],
  content: [
    'Keep the default labels (“Previous page”, “Next page”, “Page 3”) unless translating.',
    'In simple mode, the summary reads “Page 2 of 10”.',
  ],
  guidelines: [
    {
      do: 'Show the total number of pages.',
      dont: 'Hide how much content there is.',
      why: 'People decide whether to keep going based on how much is left.',
    },
    {
      do: 'Keep pagination in the same place on every page.',
      dont: 'Move it around as the list length changes.',
      why: 'A stable position lets people step through pages without hunting.',
    },
    {
      do: 'Use the simple appearance where space is tight.',
      dont: 'Let page numbers wrap onto several lines.',
      why: 'Wrapped numbers are hard to scan and tap.',
    },
  ],
  accessibility: {
    role: 'navigation landmark containing a list of buttons.',
    keyboard: [
      { keys: 'Tab / Shift+Tab', action: 'Moves between the arrows and page buttons.' },
      { keys: 'Enter / Space', action: 'Goes to that page.' },
    ],
    aria: [
      {
        attribute: 'aria-label on nav',
        when: 'From label (default “Pagination”); use distinct labels if a page has two.',
      },
      { attribute: 'aria-current="page"', when: 'Set on the current page.' },
      { attribute: 'aria-label on buttons', when: '“Previous page”, “Next page”, “Page 3”.' },
      { attribute: 'aria-live="polite"', when: 'On the simple summary, so changes are announced.' },
    ],
    focus: 'Every button shows the focus ring when reached with the keyboard.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'A labelled navigation landmark with a list.',
      },
      { criterion: '2.4.4 Link Purpose', how: 'Every control has a descriptive name.' },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Numbers pass 4.5:1 at rest, hovered and current.',
      },
      {
        criterion: '4.1.2 Name, Role, Value',
        how: 'The current page is exposed with aria-current.',
      },
    ],
    notes: ['The ellipsis is hidden from screen readers; the page numbers around it are enough.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Paging through results',
      description: 'Controlled by the current page.',
      code: `import { Pagination } from '@ds/react';

<Pagination currentPage={page} totalPages={12} onPageChange={setPage} />`,
    },
    {
      id: 'simple',
      title: 'Compact',
      description: 'For narrow layouts.',
      code: `import { Pagination } from '@ds/react';

<Pagination appearance="simple" currentPage={page} totalPages={12} onPageChange={setPage} />`,
    },
    {
      id: 'translated',
      title: 'Translated labels',
      description: 'Pass the wording for another language.',
      code: `import { Pagination } from '@ds/react';

<Pagination
  currentPage={page}
  totalPages={12}
  onPageChange={setPage}
  label="التنقل بين الصفحات"
  labels={{ previous: 'الصفحة السابقة', next: 'الصفحة التالية', page: (p) => \`الصفحة \${p}\` }}
/>`,
    },
  ],
  tokenPrefixes: ['--pagination-'],
  related: [{ id: 'table', relation: 'Often paired with a paginated table.' }],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Navigation landmark, aria-current and named previous/next buttons (they had no names).',
        'Ellipsis for long ranges (siblingCount), simple appearance, translatable labels, RTL.',
        'The current page is now filled with the brand accent, distinct from hover.',
      ],
    },
  ],
});
