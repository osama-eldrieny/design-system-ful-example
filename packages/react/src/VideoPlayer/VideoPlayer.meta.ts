import { defineMeta } from '../meta';

export default defineMeta({
  id: 'video-player',
  name: 'VideoPlayer',
  category: 'Data display',
  status: 'stable',
  since: '1.3.0',
  description:
    'A video with the browser’s native controls: play, pause, seek and volume. Without a source it shows a placeholder frame with a play button.',
  imports: [
    { name: 'VideoPlayer', from: '@ds/react' },
    { name: 'VideoPlayerAspectRatio', from: '@ds/react' },
  ],
  whenToUse: [
    'For a product tour, a tutorial or a recording on a page.',
    'As a placeholder frame while a video is prepared.',
  ],
  whenNotToUse: [
    { text: 'For several videos to browse.', alternative: 'Carousel' },
    { text: 'For a background loop with no controls.', alternative: 'Image' },
  ],
  anatomy: [
    { name: 'Frame', description: 'The shape that holds the video at a set aspect ratio.' },
    { name: 'Video', description: 'The native player with its own controls.' },
    { name: 'Placeholder', description: 'A frame with a play button, when there is no source yet.', optional: true },
  ],
  options: [
    {
      prop: 'aspectRatio',
      title: 'Aspect ratio',
      values: [
        { value: '16:9', meaning: 'Default. Widescreen video.' },
        { value: '4:3', meaning: 'Older or square-ish recordings.' },
        { value: '1:1', meaning: 'Square social clips.' },
      ],
    },
  ],
  states: [
    { name: 'Placeholder', meaning: 'No source; a play button shows.', trigger: 'No src.' },
    { name: 'Ready', meaning: 'The video shows with its controls.', trigger: 'src set.' },
  ],
  behavior: [
    { topic: 'Controls', text: 'The browser provides play, pause, seek, volume and fullscreen.' },
    { topic: 'Poster', text: 'The poster image shows before the video plays.' },
    { topic: 'Placeholder', text: 'The play button calls onPlay; play the real video once it has a source.' },
  ],
  content: [
    'Name the video by what it shows, e.g. "Product tour".',
    'Add captions for spoken content when the video is published.',
  ],
  guidelines: [
    {
      do: 'Give every video a poster image.',
      dont: 'Show a black frame before the video starts.',
      why: 'A poster tells people what the video is about before they play it.',
    },
    {
      do: 'Keep the native controls.',
      dont: 'Hide the controls and autoplay with sound.',
      why: 'People need to pause, seek and mute; autoplay with sound is disruptive.',
    },
    {
      do: 'Provide captions for speech.',
      dont: 'Rely on sound alone for information.',
      why: 'Captions help people who are deaf or hard of hearing, and people watching without sound.',
    },
  ],
  accessibility: {
    role: 'video with native controls, named by label; the placeholder is an image with a label.',
    keyboard: [
      { keys: 'Tab', action: 'Moves to the native controls.' },
      { keys: 'Space / K', action: 'Plays or pauses the video.' },
      { keys: 'Left / Right', action: 'Seeks back or forward.' },
    ],
    aria: [{ attribute: 'aria-label', when: 'On the video, from label; on the placeholder, "{label}, video placeholder".' }],
    focus: 'The native controls and the play button show focus.',
    wcag: [
      { criterion: '1.2.2 Captions (Prerecorded)', how: 'Provide captions when the video has speech.' },
      { criterion: '2.2.2 Pause, Stop, Hide', how: 'Native controls let people pause; autoplay is not used.' },
    ],
    notes: ['Captions and audio description are the publisher’s responsibility; the component passes them through as tracks.'],
  },
  examples: [
    {
      id: 'tour',
      title: 'Product tour',
      description: 'A video with a poster and controls.',
      code: `import { VideoPlayer } from '@ds/react';

<VideoPlayer label="Product tour" src="/videos/tour.mp4" poster="/images/tour.jpg" />`,
    },
    {
      id: 'placeholder',
      title: 'Placeholder',
      description: 'A square frame before the video is ready.',
      code: `import { VideoPlayer } from '@ds/react';

<VideoPlayer label="Launch recap" aspectRatio="1:1" onPlay={openVideo} />`,
    },
    {
      id: 'four-three',
      title: 'Four by three',
      description: 'A 4:3 frame for an older recording.',
      code: `import { VideoPlayer } from '@ds/react';

<VideoPlayer label="Demo" aspectRatio="4:3" src="/videos/demo.mp4" />`,
    },
  ],
  tokenPrefixes: ['--video-player-'],
  related: [
    { id: 'carousel', relation: 'For several slides or videos.' },
    { id: 'image', relation: 'For a still picture.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
