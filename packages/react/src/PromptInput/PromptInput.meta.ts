import { defineMeta } from '../meta';

export default defineMeta({
  id: 'prompt-input',
  name: 'PromptInput',
  category: 'Forms',
  status: 'stable',
  since: '1.3.0',
  description:
    'A multi-line prompt box for chat and AI tools: text on top, tools such as Attach and voice on the left, a model picker and a send button on the right. Enter sends.',
  imports: [{ name: 'PromptInput', from: '@ds/react' }],
  whenToUse: [
    'For an AI assistant or chat composer where people write a message or prompt.',
    'For any free-text input that is sent with a button, such as a comment box with attachments.',
  ],
  whenNotToUse: [
    { text: 'For a single line, such as a search.', alternative: 'SearchField' },
    { text: 'For a long document or form field with a label above.', alternative: 'Textarea' },
  ],
  anatomy: [
    { name: 'Field', description: 'The text area where people type.' },
    { name: 'Tools', description: 'Controls at the start of the bottom row, e.g. Attach.', optional: true },
    { name: 'Actions', description: 'Controls at the end, e.g. a model picker.', optional: true },
    { name: 'Send', description: 'Submits the prompt; disabled while the field is empty.' },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'medium', meaning: 'Default. The main composer.' },
        { value: 'small', meaning: 'Side panels and compact layouts.' },
      ],
    },
  ],
  states: [
    { name: 'Empty', meaning: 'No text; the send button is disabled.', trigger: 'Empty or only spaces.' },
    { name: 'Ready', meaning: 'Text present; the send button is enabled.', trigger: 'Text entered.' },
    { name: 'Focus', meaning: 'The border shows focus around the whole box.', trigger: ':focus-within.' },
    { name: 'Busy', meaning: 'A reply is being produced; the send button shows a spinner and sending waits.', trigger: 'busy prop.' },
    { name: 'Disabled', meaning: 'Nothing can be typed or sent.', trigger: 'disabled prop.' },
  ],
  behavior: [
    { topic: 'Sending', text: 'Enter sends; Shift+Enter starts a new line. Whitespace-only text does not send.' },
    {
      topic: 'Controlled or not',
      text: 'Pass value and onValueChange to control the text, or defaultValue to let it manage its own; it clears after sending when uncontrolled.',
    },
    { topic: 'Right-to-left', text: 'Text runs from the right in Arabic; the row order flips with the layout.' },
  ],
  content: [
    'Use a placeholder that shows what to type, e.g. "Ask me anything…".',
    'Name the box with label so screen readers announce its purpose.',
  ],
  guidelines: [
    {
      do: 'Keep tools and the send button on one bottom row.',
      dont: 'Scatter controls around the text.',
      why: 'One row keeps the composer predictable, as people expect in chat tools.',
    },
    {
      do: 'Disable send while the field is empty.',
      dont: 'Let people send empty messages and show an error.',
      why: 'Disabling prevents the mistake before it happens.',
    },
    {
      do: 'Let Enter send and Shift+Enter add a line.',
      dont: 'Make Enter add a line and require a click to send.',
      why: 'Keyboard users expect Enter to send in chat composers.',
    },
  ],
  accessibility: {
    role: 'form with a labelled multi-line text field.',
    keyboard: [
      { keys: 'Enter', action: 'Sends the prompt when it has text.' },
      { keys: 'Shift+Enter', action: 'Starts a new line.' },
      { keys: 'Tab', action: 'Moves through the tools, actions and the send button.' },
    ],
    aria: [
      { attribute: 'label (for)', when: 'The text field is named by label.' },
      { attribute: 'aria-label', when: 'Set on the send button from submitLabel.' },
    ],
    focus: 'The composer border shows focus; controls show their own focus rings.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'The field is labelled by a real label element.' },
      { criterion: '2.1.1 Keyboard', how: 'Sending works with Enter, and every control is reachable with Tab.' },
      { criterion: '3.3.2 Labels or Instructions', how: 'The placeholder supplements the label; it does not replace it.' },
    ],
    notes: ['Disabled sending is announced by the button’s disabled state.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Assistant prompt',
      description: 'The composer with Attach and a send button.',
      code: `import { PromptInput, Button } from '@ds/react';

<PromptInput
  label="Message the assistant"
  placeholder="Ask me anything…"
  tools={<Button size="small" variant="secondary" appearance="outline">Attach</Button>}
  onSubmit={(text) => send(text)}
/>`,
    },
    {
      id: 'model',
      title: 'With a model picker',
      description: 'A model picker in the actions row.',
      code: `import { PromptInput } from '@ds/react';

<PromptInput label="Message" actions={<ModelPicker value={model} onValueChange={setModel} />} />`,
    },
    {
      id: 'small',
      title: 'In a side panel',
      description: 'The small size for narrow panels.',
      code: `import { PromptInput } from '@ds/react';

<PromptInput label="Reply" size="small" rows={2} onSubmit={reply} />`,
    },
  ],
  tokenPrefixes: ['--prompt-input-'],
  related: [
    { id: 'textarea', relation: 'For longer text inside a form with a visible label.' },
    { id: 'search-field', relation: 'For a single line of search.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
