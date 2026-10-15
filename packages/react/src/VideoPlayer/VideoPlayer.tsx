import { forwardRef, type HTMLAttributes } from 'react';
import { Play } from 'lucide-react';
import { IconButton } from '../Button';
import './VideoPlayer.css';

export type VideoPlayerAspectRatio = '16:9' | '4:3' | '1:1';

export interface VideoPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Names the video, e.g. "Product tour". */
  label: string;
  /** The video file or stream. Without it, a placeholder with a play button shows. */
  src?: string;
  /** A still image shown before the video plays. */
  poster?: string;
  /** A WebVTT file with captions for the speech. */
  captions?: string;
  /** Shape of the frame. Default 16:9. */
  aspectRatio?: VideoPlayerAspectRatio;
  /** Called when the placeholder’s play button is pressed (only without src). */
  onPlay?: () => void;
}

const ratio: Record<VideoPlayerAspectRatio, string> = { '16:9': '16 / 9', '4:3': '4 / 3', '1:1': '1 / 1' };

/**
 * A video with native controls: play, pause, seek and volume come from the browser. Without a
 * source it shows a placeholder frame with a play button, as in prototypes.
 */
export const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
  ({ label, src, poster, captions, aspectRatio = '16:9', onPlay, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={['ds-video-player', className].filter(Boolean).join(' ')}
      style={{ ['--video-player-ratio' as string]: ratio[aspectRatio], ...style }}
      {...props}
    >
      {src ? (
        <video className="ds-video-player__media" src={src} poster={poster} controls aria-label={label} preload="metadata">
          <track kind="captions" src={captions} srcLang="en" label="Captions" />
        </video>
      ) : (
        <div className="ds-video-player__placeholder">
          <IconButton icon={<Play />} label={`Play ${label}`} variant="primary" appearance="filled" size="large" onClick={onPlay} />
        </div>
      )}
    </div>
  ),
);
VideoPlayer.displayName = 'VideoPlayer';
