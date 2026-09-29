/**
 * One screenshot per component of its AllThemes story (every brand × mode) and its
 * RightToLeft story. Catches unintended visual changes to tokens, CSS and components.
 */
import { composeStories, setProjectAnnotations } from '@storybook/react-vite';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import preview from '../apps/docs/.storybook/preview';

setProjectAnnotations(preview);

// Freeze motion (spinners, shimmer, entry animations) so screenshots are deterministic.
const freeze = document.createElement('style');
freeze.textContent =
  '*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }';
document.head.append(freeze);

// Unmount each story (and its portals) so earlier stories and open overlays don't shift
// the next screenshot.
afterEach(cleanup);

const modules = import.meta.glob<Record<string, unknown>>('../packages/react/src/*/*.stories.tsx', {
  eager: true,
});

for (const [path, mod] of Object.entries(modules)) {
  const name = path.split('/').at(-2)!;
  const stories = composeStories(mod as never) as Record<
    string,
    { run: (ctx?: unknown) => Promise<void>; Component?: unknown }
  >;
  describe(name, () => {
    for (const key of ['AllThemes', 'RightToLeft']) {
      const Story = stories[key] as unknown as React.ComponentType | undefined;
      if (!Story) continue;
      it(key, async () => {
        const { container } = render(<Story />);
        // Let fonts, portals and entry animations settle.
        await document.fonts.ready;
        await new Promise((r) => setTimeout(r, 400));
        await expect.element(page.elementLocator(container)).toMatchScreenshot(`${name}-${key}`);
      });
    }
  });
}
