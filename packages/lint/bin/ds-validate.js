#!/usr/bin/env node
/**
 * ds-validate: checks files against the design system.
 *
 *   npx ds-validate src/            # readable report
 *   npx ds-validate src/ --json     # machine-readable, for AI agents and CI
 *
 * JS/TS/JSX: eslint-plugin-ds (components over raw HTML, documented props, accessible names,
 * no raw style values). CSS: no raw colors or lengths (tokens only).
 * Exits 1 when there are errors.
 */
import { ESLint } from 'eslint';
import stylelint from 'stylelint';
import ds from '../eslint/index.js';
import stylelintPlugins from '../stylelint/index.js';

const args = process.argv.slice(2);
const json = args.includes('--json');
const targets = args.filter((a) => !a.startsWith('--'));
if (targets.length === 0) {
  console.error('Usage: ds-validate <files or folders…> [--json]');
  process.exit(2);
}

let parser;
try {
  parser = (await import('typescript-eslint')).parser;
} catch {
  parser = undefined; // plain JS/JSX only
}

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      files: ['**/*.{js,jsx,mjs,ts,tsx}'],
      languageOptions: {
        ...(parser ? { parser } : {}),
        parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' },
      },
      ...ds.configs.recommended,
    },
  ],
  errorOnUnmatchedPattern: false,
});
const jsTargets = targets.map((t) => (/\.[a-z]+$/.test(t) ? t : `${t.replace(/\/$/, '')}/**/*.{js,jsx,ts,tsx}`));
const eslintResults = await eslint.lintFiles(jsTargets);

const cssTargets = targets.map((t) => (/\.[a-z]+$/.test(t) ? t : `${t.replace(/\/$/, '')}/**/*.css`)).filter((t) => t.endsWith('.css'));
const styleResults = cssTargets.length
  ? (
      await stylelint.lint({
        files: cssTargets,
        allowEmptyInput: true,
        config: {
          plugins: stylelintPlugins,
          rules: { 'ds/component-tokens-only': [true, { anyToken: true }] },
        },
      })
    ).results
  : [];

const problems = [
  ...eslintResults.flatMap((r) =>
    r.messages.map((m) => ({
      file: r.filePath,
      line: m.line,
      column: m.column,
      rule: m.ruleId,
      severity: m.severity === 2 ? 'error' : 'warning',
      message: m.message,
    })),
  ),
  ...styleResults.flatMap((r) =>
    r.warnings.map((w) => ({
      file: r.source,
      line: w.line,
      column: w.column,
      rule: w.rule,
      severity: w.severity,
      message: w.text.replace(/\s*\(ds\/[a-z-]+\)$/, ''),
    })),
  ),
];

if (json) {
  console.log(JSON.stringify({ problems, errors: problems.filter((p) => p.severity === 'error').length }, null, 2));
} else if (problems.length === 0) {
  console.log('✓ No design-system problems found.');
} else {
  for (const p of problems) {
    console.log(`${p.file}:${p.line}:${p.column}  ${p.severity}  ${p.message}  (${p.rule})`);
  }
  console.log(`\n${problems.length} problem(s).`);
}
process.exitCode = problems.some((p) => p.severity === 'error') ? 1 : 0;
