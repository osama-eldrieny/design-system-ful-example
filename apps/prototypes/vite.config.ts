import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works at any path (GitHub Pages subfolder, local server).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
