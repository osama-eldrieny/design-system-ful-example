import { defineMeta } from '../meta';

export default defineMeta({
  id: 'dropdown-menu',
  name: 'DropdownMenu',
  category: 'Overlays',
  status: 'stable',
  since: '0.2.0',
  description:
    'A dropdown menu shows a list of actions or options when people press a button. It keeps secondary actions out of the way until needed and closes after a choice.',
  imports: [
    { name: 'DropdownMenu', from: '@ds/react' },
    { name: 'DropdownMenuTrigger', from: '@ds/react' },
    { name: 'DropdownMenuContent', from: '@ds/react' },
    { name: 'DropdownMenuItem', from: '@ds/react' },
    { name: 'DropdownMenuCheckboxItem', from: '@ds/react' },
    { name: 'DropdownMenuRadioGroup', from: '@ds/react' },
    { name: 'DropdownMenuRadioItem', from: '@ds/react' },
    { name: 'DropdownMenuLabel', from: '@ds/react' },
    { name: 'DropdownMenuSeparator', from: '@ds/react' },
    { name: 'DropdownMenuSub', from: '@ds/react' },
    { name: 'DropdownMenuSubTrigger', from: '@ds/react' },
    { name: 'DropdownMenuSubContent', from: '@ds/react' },
  ],
  whenToUse: [
    'For a set of actions that don’t all fit on screen, e.g. a “More” menu on a card.',
    'For view options such as sort order or visible columns.',
  ],
  whenNotToUse: [
    { text: 'To choose a value in a form.', alternative: 'Select or RadioGroup' },
    { text: 'For navigation between pages.', alternative: 'Navbar or links' },
    { text: 'When there are only one or two actions.', alternative: 'Buttons' },
  ],
  anatomy: [
    { name: 'Trigger', description: 'The button that opens the menu.' },
    { name: 'Menu', description: 'The panel with the items; it stays inside the viewport.' },
    { name: 'Group label', description: 'Optional heading for a group of items.', optional: true },
    { name: 'Item', description: 'An action or option, with optional icon and shortcut hint.' },
    { name: 'Separator', description: 'Optional line between groups.', optional: true },
  ],
  options: [
    {
      prop: 'variant',
      title: 'Item variant',
      values: [
        { value: 'default', meaning: 'Ordinary actions.' },
        {
          value: 'danger',
          meaning: 'Destructive actions such as Delete; place them last, after a separator.',
        },
      ],
    },
  ],
  states: [
    { name: 'Closed', meaning: 'Only the trigger shows.', trigger: 'Default.' },
    {
      name: 'Open',
      meaning: 'The menu shows below the trigger.',
      trigger: 'Trigger pressed, or Enter / Space / Arrow Down on it.',
    },
    {
      name: 'Highlighted',
      meaning: 'The item under the pointer or keyboard.',
      trigger: 'Hover or arrow keys.',
    },
    { name: 'Checked', meaning: 'A checkbox or radio item is on.', trigger: 'checked / value.' },
    {
      name: 'Disabled',
      meaning: 'The item can’t be used right now.',
      trigger: 'disabled on the item.',
    },
  ],
  behavior: [
    {
      topic: 'Keyboard',
      text: 'Arrow keys move between items, typing a letter jumps to a matching item, Enter or Space chooses it, Escape closes the menu and returns focus to the trigger.',
    },
    {
      topic: 'Closing',
      text: 'The menu closes after an item is chosen, on Escape, or when clicking outside.',
    },
    {
      topic: 'Position',
      text: 'Opens below the trigger and flips or shifts to stay in the viewport; set align to "end" to align with the trigger’s end edge.',
    },
    {
      topic: 'Themes',
      text: 'The menu renders at the end of the page but keeps the theme of the ThemeProvider it opened from.',
    },
    {
      topic: 'Right-to-left',
      text: 'Alignment, submenus and arrow keys follow the reading direction.',
    },
  ],
  content: [
    'Start item labels with a verb: “Duplicate”, “Move to…”, “Delete”.',
    'Use an ellipsis (…) when an item needs more input before it happens.',
    'Group related items and put destructive ones last.',
  ],
  guidelines: [
    {
      do: 'Give the trigger a clear label or an icon with an accessible name.',
      dont: 'Use an unlabelled “…” icon with no name.',
      why: 'People and screen readers need to know what the menu holds before opening it.',
    },
    {
      do: 'Put destructive items last, after a separator, in the danger variant.',
      dont: 'Mix Delete in among everyday actions.',
      why: 'Separating risky actions prevents accidental clicks.',
    },
    {
      do: 'Keep menus short: about seven items or fewer.',
      dont: 'Put long lists or forms inside a menu.',
      why: 'Long menus are hard to scan; use a dialog or page for complex choices.',
    },
  ],
  accessibility: {
    role: 'button (trigger) with aria-haspopup="menu", and a menu with menuitem, menuitemcheckbox and menuitemradio items (Radix).',
    keyboard: [
      {
        keys: 'Enter / Space / Arrow Down',
        action: 'Opens the menu from the trigger and focuses the first item.',
      },
      { keys: 'Arrow Up / Down', action: 'Moves between items.' },
      { keys: 'Letters', action: 'Jumps to the next item starting with that letter.' },
      { keys: 'Enter / Space', action: 'Chooses the focused item.' },
      { keys: 'Arrow Right / Left', action: 'Opens or closes a submenu.' },
      { keys: 'Escape', action: 'Closes the menu and returns focus to the trigger.' },
    ],
    aria: [
      { attribute: 'aria-haspopup, aria-expanded', when: 'Set on the trigger automatically.' },
      { attribute: 'aria-checked', when: 'Set on checkbox and radio items.' },
      {
        attribute: 'aria-hidden on icons and shortcuts',
        when: 'They’re visual hints; labels carry the meaning.',
      },
    ],
    focus: 'Focus moves into the menu when it opens and back to the trigger when it closes.',
    wcag: [
      {
        criterion: '2.1.1 Keyboard',
        how: 'Everything works from the keyboard, per the WAI-ARIA menu button pattern.',
      },
      { criterion: '2.4.3 Focus Order', how: 'Focus returns to the trigger after closing.' },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Items pass 4.5:1 at rest and highlighted, in every theme.',
      },
      { criterion: '4.1.2 Name, Role, Value', how: 'Menu, items and checked states are exposed.' },
    ],
    notes: ['Shortcut hints are shown only; wire the actual keyboard shortcuts in your app.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Actions menu',
      description: 'A button that opens actions.',
      code: `import { Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@ds/react';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button appearance="outline" variant="secondary">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onSelect={duplicate}>Duplicate</DropdownMenuItem>
    <DropdownMenuItem onSelect={archive}>Archive</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="danger" onSelect={remove}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      id: 'sort',
      title: 'Sort order',
      description: 'Radio items for one exclusive choice.',
      code: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, Button } from '@ds/react';

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button appearance="outline">Sort</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
    <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
      <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      id: 'icon-trigger',
      title: 'Icon trigger',
      description: 'An IconButton trigger with an accessible name.',
      code: `import { IconButton, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@ds/react';
import { Ellipsis } from 'lucide-react';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <IconButton icon={<Ellipsis />} label="More actions" appearance="ghost" variant="secondary" />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Rename</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
  ],
  tokenPrefixes: ['--menu-'],
  related: [
    { id: 'button', relation: 'Use as the trigger (with asChild).' },
    { id: 'select', relation: 'Use to choose a form value.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Replaces Dropdown: a Radix menu with trigger, keyboard navigation, typeahead and focus return.',
        'Labels, separators, checkbox and radio items, submenus, shortcuts, danger items.',
        'Portaled menus keep the theme of their ThemeProvider; compact density padding fixed (was -4px).',
      ],
    },
  ],
});
