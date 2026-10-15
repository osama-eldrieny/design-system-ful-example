# VideoPlayer

> A video with the browser’s native controls: play, pause, seek and volume. Without a source it shows a placeholder frame with a play button.

Status: stable · Category: Data display · Since 1.3.0

```tsx
import { VideoPlayer } from '@ds/react';
import { VideoPlayerAspectRatio } from '@ds/react';
```

## When to use
- For a product tour, a tutorial or a recording on a page.
- As a placeholder frame while a video is prepared.

## When not to use
- For several videos to browse. Use Carousel.
- For a background loop with no controls. Use Image.

## Aspect ratio (`aspectRatio`)
- `16:9`: Default. Widescreen video.
- `4:3`: Older or square-ish recordings.
- `1:1`: Square social clips.

## States
- **Placeholder**: No source; a play button shows. (No src.)
- **Ready**: The video shows with its controls. (src set.)

## Props
### VideoPlayer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the video, e.g. "Product tour". |
| `src` | `string` |  | The video file or stream. Without it, a placeholder with a play button shows. |
| `poster` | `string` |  | A still image shown before the video plays. |
| `captions` | `string` |  | A WebVTT file with captions for the speech. |
| `aspectRatio` | `VideoPlayerAspectRatio` | 16:9 | Shape of the frame. Default 16:9. |
| `onPlay` | `(() => void)` |  | Called when the placeholder’s play button is pressed (only without src). |

### VideoPlayerAspectRatio

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Give every video a poster image. Don’t: Show a black frame before the video starts. Why: A poster tells people what the video is about before they play it.
- Do: Keep the native controls. Don’t: Hide the controls and autoplay with sound. Why: People need to pause, seek and mute; autoplay with sound is disruptive.
- Do: Provide captions for speech. Don’t: Rely on sound alone for information. Why: Captions help people who are deaf or hard of hearing, and people watching without sound.

## Content
- Name the video by what it shows, e.g. "Product tour".
- Add captions for spoken content when the video is published.

## Accessibility
- Role: video with native controls, named by label; the placeholder is an image with a label.
- Tab: Moves to the native controls.
- Space / K: Plays or pauses the video.
- Left / Right: Seeks back or forward.
- `aria-label`: On the video, from label; on the placeholder, "{label}, video placeholder".
- Focus: The native controls and the play button show focus.
- WCAG 1.2.2 Captions (Prerecorded): Provide captions when the video has speech.
- WCAG 2.2.2 Pause, Stop, Hide: Native controls let people pause; autoplay is not used.
- Captions and audio description are the publisher’s responsibility; the component passes them through as tracks.

## Examples
### Product tour
A video with a poster and controls.

```tsx
import { VideoPlayer } from '@ds/react';

<VideoPlayer label="Product tour" src="/videos/tour.mp4" poster="/images/tour.jpg" />
```

### Placeholder
A square frame before the video is ready.

```tsx
import { VideoPlayer } from '@ds/react';

<VideoPlayer label="Launch recap" aspectRatio="1:1" onPlay={openVideo} />
```

### Four by three
A 4:3 frame for an older recording.

```tsx
import { VideoPlayer } from '@ds/react';

<VideoPlayer label="Demo" aspectRatio="4:3" src="/videos/demo.mp4" />
```

Tokens: `--video-player-*` (values per theme in ai/components/video-player.json).
