import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../../../packages/react/src/**/*.stories.@(ts|tsx)'],
  // Sample photos used in stories and docs (shared with the prototypes).
  staticDirs: ['../public', { from: '../../prototypes/public/assets', to: '/assets' }],
  addons: [
    {
      name: '@storybook/addon-docs',
      // GitHub-flavored Markdown: tables, task lists, autolinks in MDX pages.
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    'storybook-addon-pseudo-states',
    '@storybook/addon-mcp',
  ],
  features: {
    // Component manifests (props, stories, docs) for the MCP server and AI tools.
    componentsManifest: true,
    // Public docs: no Storybook onboarding prompts.
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // The components live in packages/react, so read their types with that project.
      tsconfigPath: fileURLToPath(
        new URL('../../../packages/react/tsconfig.json', import.meta.url),
      ),
      include: [fileURLToPath(new URL('../../../packages/react/src/**/*.tsx', import.meta.url))],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Document the component's own props, not every inherited HTML attribute.
      propFilter: (prop) => !prop.parent || !/node_modules/.test(prop.parent.fileName),
    },
  },
};

export default config;
