import { defineMeta } from '../meta';

export default defineMeta({
  id: 'carousel',
  name: 'Carousel',
  category: 'Data display',
  status: 'stable',
  since: '1.3.0',
  description:
    'A set of slides shown one at a time, with previous and next arrows, dots and the arrow keys. Use it for a short set of highlights or featured content.',
  imports: [
    { name: 'Carousel', from: '@ds/react' },
    { name: 'CarouselControls', from: '@ds/react' },
  ],
  whenToUse: [
    'For two to five highlights or featured items on a page.',
    'When each slide is a self-contained message or picture.',
  ],
  whenNotToUse: [
    { text: 'For a long list of items to browse.', alternative: 'Card grid' },
    { text: 'For slides that must play without interaction.', alternative: 'VideoPlayer' },
    { text: 'For switching between views of the same content.', alternative: 'Tabs' },
  ],
  anatomy: [
    { name: 'Slide', description: 'The content currently shown.' },
    { name: 'Previous / next', description: 'Arrow buttons at each side.', optional: true },
    { name: 'Dots', description: 'One per slide; the current one is filled.', optional: true },
  ],
  options: [
    {
      prop: 'controls',
      title: 'Controls',
      values: [
        { value: 'both', meaning: 'Default. Arrows and dots.' },
        { value: 'arrows', meaning: 'Arrows only, for many slides.' },
        { value: 'dots', meaning: 'Dots only, for a compact row.' },
      ],
    },
  ],
  states: [
    { name: 'Current', meaning: 'The slide on show; its dot is filled.', trigger: 'index.' },
    { name: 'Focus', meaning: 'A focus ring on the carousel or a control.', trigger: ':focus-visible.' },
  ],
  behavior: [
    { topic: 'Keyboard', text: 'The arrows and dots are buttons in the tab order; Enter or Space moves to a slide.' },
    { topic: 'Wrapping', text: 'Moving past the last slide returns to the first, and back.' },
    { topic: 'Announcements', text: 'Each slide is announced as “n of total” when it changes.' },
    { topic: 'Right-to-left', text: 'Previous and next swap sides in Arabic, and the arrow keys follow.' },
  ],
  content: [
    'Keep each slide’s message to one idea.',
    'Name the carousel by what it shows, e.g. "Highlights".',
  ],
  guidelines: [
    {
      do: 'Keep to a few slides, two to five.',
      dont: 'Put twenty slides in one carousel.',
      why: 'People rarely go past the first few slides.',
    },
    {
      do: 'Give every slide a visible control or a way to reach it.',
      dont: 'Hide the controls and rely on swiping.',
      why: 'Not every device swipes, and keyboard users need the arrows.',
    },
    {
      do: 'Put the most important message on the first slide.',
      dont: 'Hide the key message on the fourth slide.',
      why: 'Most people only see the first slide.',
    },
  ],
  accessibility: {
    role: 'region with roledescription "carousel"; each slide is a group with roledescription "slide".',
    keyboard: [
      { keys: 'Tab', action: 'Moves to the previous arrow, the dots, then the next arrow.' },
      { keys: 'Enter / Space', action: 'Activates an arrow or dot to show that slide.' },
    ],
    aria: [
      { attribute: 'aria-roledescription', when: 'Carousel and slide.' },
      { attribute: 'aria-live', when: 'Polite, on the slide, so the new slide is announced.' },
      { attribute: 'aria-current', when: 'On the dot for the current slide.' },
    ],
    focus: 'The carousel and each control show a focus ring.',
    wcag: [
      { criterion: '2.1.1 Keyboard', how: 'Slides move with the arrow keys and every control is reachable by Tab.' },
      { criterion: '4.1.3 Status Messages', how: 'Slide changes are announced politely without moving focus.' },
    ],
    notes: ['Only the current slide is shown, so non-current slides are not read out.'],
  },
  examples: [
    {
      id: 'highlights',
      title: 'Highlights',
      description: 'Three highlights with arrows and dots.',
      code: `import { Carousel } from '@ds/react';

<Carousel label="Highlights" slides={[<Highlight key="a" />, <Highlight key="b" />, <Highlight key="c" />]} />`,
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'The current slide lives in your state.',
      code: `import { Carousel } from '@ds/react';

<Carousel label="Offers" slides={offers} index={index} onIndexChange={setIndex} />`,
    },
    {
      id: 'arrows',
      title: 'Arrows only',
      description: 'For a large set of slides.',
      code: `import { Carousel } from '@ds/react';

<Carousel label="Gallery" slides={images} controls="arrows" />`,
    },
  ],
  tokenPrefixes: ['--carousel-'],
  related: [
    { id: 'tabs', relation: 'For switching between views of one thing.' },
    { id: 'video-player', relation: 'For a single video.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
