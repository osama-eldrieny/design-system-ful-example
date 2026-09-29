/**
 * Visual regression: `npm run test:visual`. Screenshots differ between operating systems, so
 * baselines are kept per platform (…-chromium-darwin.png) and this runs on demand, not in CI.
 * Update baselines after an intended change: `npm run test:visual -- --update`.
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import base from './vitest.config';

const storiesProject = (base.test?.projects as { optimizeDeps?: unknown }[])[1];

export default defineConfig({
  plugins: [react()],
  optimizeDeps: storiesProject.optimizeDeps as never,
  test: {
    name: 'visual',
    include: ['visual/**/*.test.tsx'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium', viewport: { width: 1024, height: 768 } }],
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: { allowedMismatchedPixelRatio: 0.002 },
        },
      },
    },
  },
});
