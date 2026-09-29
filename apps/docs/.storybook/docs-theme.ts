import { create } from 'storybook/theming';

// The docs interface is neutral: it never follows the design system's themes, so the
// component examples are what changes when you switch themes in the toolbar.
const shared = {
  brandTitle: 'Panda Design System',
  brandUrl: './',
  fontBase: '"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
  appBorderRadius: 8,
  inputBorderRadius: 6,
};

export const lightDocsTheme = create({
  ...shared,
  base: 'light',
  colorPrimary: '#3b38a6',
  colorSecondary: '#3b38a6',
  appBg: '#f6f6f9',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e2e1ea',
  textColor: '#1c1b22',
  textMutedColor: '#5f5d6b',
  barBg: '#ffffff',
  barTextColor: '#5f5d6b',
  barSelectedColor: '#3b38a6',
  inputBg: '#ffffff',
  inputBorder: '#d6d5e0',
  inputTextColor: '#1c1b22',
});

export const darkDocsTheme = create({
  ...shared,
  base: 'dark',
  colorPrimary: '#a09dff',
  colorSecondary: '#a09dff',
  appBg: '#121118',
  appContentBg: '#1b1a23',
  appPreviewBg: '#1b1a23',
  appBorderColor: '#2e2c3a',
  textColor: '#ecebf3',
  textMutedColor: '#a6a4b5',
  barBg: '#1b1a23',
  barTextColor: '#a6a4b5',
  barSelectedColor: '#a09dff',
  inputBg: '#121118',
  inputBorder: '#3a3848',
  inputTextColor: '#ecebf3',
});

export const docsTheme = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? darkDocsTheme
    : lightDocsTheme;
