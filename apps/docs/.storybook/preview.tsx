import type { Decorator, Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@ds/react';
import { defaultTheme, themeOptions, type Theme } from '@ds/tokens';
import '@ds/tokens/tokens.css';
import '@ds/tokens/fonts.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './preview.css';
import { docsTheme } from './docs-theme';

const LABELS: {
  [A in keyof Theme]: { title: string; icon: string; names: Record<string, string> };
} = {
  brand: {
    title: 'Brand',
    icon: 'paintbrush',
    names: { diamond: 'Diamond', amber: 'Amber', opal: 'Opal' },
  },
  mode: { title: 'Mode', icon: 'contrast', names: { light: 'Light', dark: 'Dark' } },
  language: { title: 'Language', icon: 'globe', names: { en: 'English', ar: 'Arabic (RTL)' } },
  typeface: { title: 'Typeface', icon: 'paragraph', names: { sans: 'Sans-serif', serif: 'Serif' } },
  density: {
    title: 'Density',
    icon: 'grow',
    names: { comfortable: 'Comfortable', compact: 'Compact' },
  },
  radius: {
    title: 'Radius',
    icon: 'circlehollow',
    names: { square: 'Square', round: 'Round', pills: 'Pills' },
  },
  shadow: {
    title: 'Shadow',
    icon: 'box',
    names: { flat: 'Flat', subtle: 'Subtle', default: 'Default', raised: 'Raised' },
  },
};

const axes = Object.keys(themeOptions) as (keyof Theme)[];

/** The theme picked in the toolbar (defaults for anything not set). */
export const themeFromGlobals = (globals: Record<string, unknown>): Theme =>
  Object.fromEntries(axes.map((a) => [a, globals[a] ?? defaultTheme[a]])) as Theme;

/**
 * Every example renders inside a theme scope, on the theme's page background. The docs
 * page around it keeps its own neutral style.
 */
const withTheme: Decorator = (Story, context) => (
  <ThemeProvider
    theme={themeFromGlobals(context.globals)}
    className="ds-canvas"
    data-layout={context.parameters.layout ?? 'padded'}
  >
    <Story />
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: { ...defaultTheme },
  globalTypes: Object.fromEntries(
    axes.map((axis) => [
      axis,
      {
        description: `Design system theme: ${LABELS[axis].title.toLowerCase()}`,
        toolbar: {
          title: LABELS[axis].title,
          icon: LABELS[axis].icon,
          dynamicTitle: true,
          items: themeOptions[axis].map((value) => ({
            value,
            title: `${LABELS[axis].names[value]}${value === defaultTheme[axis] ? ' (default)' : ''}`,
          })),
        },
      },
    ]),
  ),
  parameters: {
    layout: 'padded',
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: { theme: docsTheme(), toc: { headingSelector: 'h2, h3', title: 'On this page' } },
    // Existing components move to 'error' as Phase 3 fixes them; new components start there.
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Get started',
          ['Introduction', 'Installation', 'Theming', 'Using with AI'],
          'Foundations',
          [
            'Colors',
            'Typography',
            'Spacing & density',
            'Radius',
            'Shadows & elevation',
            'Motion',
            'Accessibility',
          ],
          'Components',
          'Patterns',
          'Resources',
        ],
      },
    },
  },
};

export default preview;
