import { useContext, useEffect, useState } from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { GLOBALS_UPDATED, UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { defaultTheme, themeOptions, type Theme } from '@ds/tokens';

type Globals = Record<string, unknown>;

interface DocsChannelContext {
  channel?: {
    on(event: string, fn: (payload: { globals: Globals }) => void): void;
    off(event: string, fn: (payload: { globals: Globals }) => void): void;
    emit(event: string, payload: unknown): void;
  };
  store?: { userGlobals?: { get(): Globals } };
}

const toTheme = (globals: Globals): Theme =>
  Object.fromEntries(
    (Object.keys(themeOptions) as (keyof Theme)[]).map((axis) => [
      axis,
      globals[axis] ?? defaultTheme[axis],
    ]),
  ) as Theme;

/**
 * The design-system theme picked in the Storybook toolbar, readable and settable from docs
 * blocks, so a docs page's examples, token values and diagrams all follow one theme.
 */
export function useDocsTheme(): [Theme, (patch: Partial<Theme>) => void] {
  const context = useContext(DocsContext) as unknown as DocsChannelContext;
  const [theme, setTheme] = useState<Theme>(() => toTheme(context.store?.userGlobals?.get() ?? {}));

  useEffect(() => {
    const channel = context.channel;
    if (!channel) return;
    const onUpdate = ({ globals }: { globals: Globals }) => setTheme(toTheme(globals));
    channel.on(GLOBALS_UPDATED, onUpdate);
    return () => channel.off(GLOBALS_UPDATED, onUpdate);
  }, [context]);

  const update = (patch: Partial<Theme>) =>
    context.channel?.emit(UPDATE_GLOBALS, { globals: patch });
  return [theme, update];
}
