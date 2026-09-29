import { defineMeta } from '../meta';

export default defineMeta({
  id: 'code',
  name: 'Code',
  category: 'Data display',
  status: 'stable',
  since: '0.4.0',
  description:
    'Code shows code inline in text or as a block with a language label and a copy button. Blocks scroll horizontally and can be scrolled from the keyboard.',
  imports: [{ name: 'Code', from: '@ds/react' }],
  whenToUse: [
    'For code, commands, file names and values in text.',
    'For copyable snippets in docs.',
  ],
  whenNotToUse: [
    { text: 'For keyboard keys.', alternative: 'Kbd' },
    { text: 'For editable code.', alternative: 'A code editor' },
  ],
  anatomy: [
    { name: 'Inline code', description: 'Tinted and outlined.' },
    { name: 'Block', description: 'With header, language and copy button.', optional: true },
  ],
  options: [
    {
      prop: 'block',
      title: 'Display',
      values: [
        { value: 'false', meaning: 'Inline in text. Default.' },
        { value: 'true', meaning: 'A block with copy.' },
      ],
    },
  ],
  states: [
    {
      name: 'Copied',
      meaning: 'The copy icon becomes a tick and “Copied” is announced.',
      trigger: 'copy',
    },
  ],
  behavior: [
    { topic: 'Copy', text: 'Copies the text with the Clipboard API and announces “Copied”.' },
    {
      topic: 'Scrolling',
      text: 'Blocks scroll horizontally; the scroll area is focusable and named.',
    },
  ],
  content: ['Show real, runnable code.'],
  guidelines: [
    {
      do: 'Use blocks for multi-line code.',
      dont: 'Put long code inline.',
      why: 'Inline code wraps awkwardly.',
    },
    {
      do: 'Name the language.',
      dont: 'Leave readers guessing.',
      why: 'The label helps people and tools.',
    },
    {
      do: 'Keep lines readable.',
      dont: 'Minify code in docs.',
      why: 'People need to read and adapt it.',
    },
  ],
  accessibility: {
    role: 'code; blocks are a named, focusable group.',
    keyboard: [
      { keys: 'Tab', action: 'Reaches the copy button and the scroll area.' },
      { keys: 'Arrow keys', action: 'Scroll a focused block.' },
    ],
    aria: [
      { attribute: 'role="group" + aria-label', when: 'The block’s focusable scroll area.' },
      { attribute: 'role="status"', when: 'Announces “Copied”.' },
    ],
    focus: 'Focus ring on the copy button and scroll area.',
    wcag: [
      { criterion: '2.1.1 Keyboard', how: 'Blocks scroll from the keyboard.' },
      { criterion: '4.1.3 Status Messages', how: 'Copy result is announced.' },
      { criterion: '1.4.10 Reflow', how: 'Wide code scrolls in its own area.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'inline',
      title: 'Inline',
      description: 'In text.',
      code: "import { Code } from '@ds/react';\n\nRun <Code>npm install</Code> first.",
    },
    {
      id: 'block',
      title: 'Block',
      description: 'With copy.',
      code: "import { Code } from '@ds/react';\n\n<Code block language=\"bash\">{'npm install @ds/react'}</Code>",
    },
    {
      id: 'no-copy',
      title: 'Without copy',
      description: 'Read-only output.',
      code: "import { Code } from '@ds/react';\n\n<Code block copyable={false}>{output}</Code>",
    },
  ],
  tokenPrefixes: ['--code-'],
  related: [{ id: 'kbd', relation: 'For keyboard keys.' }],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
