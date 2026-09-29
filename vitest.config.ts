import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const docsDir = fileURLToPath(new URL('./apps/docs/.storybook', import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./vitest.setup.ts'],
          include: ['packages/**/*.test.{ts,tsx}', 'apps/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts'],
          exclude: ['**/node_modules/**', '**/dist/**'],
          css: false,
        },
      },
      {
        // Every story runs in a real browser: render, play function and axe checks.
        plugins: [storybookTest({ configDir: docsDir })],
        // Pre-bundle the library's runtime dependencies so a newly imported one can't make
        // Vite re-optimize and reload mid-run (which fails every story file at once).
        optimizeDeps: {
          include: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            'lucide-react',
            '@radix-ui/react-switch',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-tabs',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-slider',
            'downshift',
            '@radix-ui/react-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-toast',
            '@radix-ui/react-accordion',
          ],
        },
        test: {
          name: 'stories',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
