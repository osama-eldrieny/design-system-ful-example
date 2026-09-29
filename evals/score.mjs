#!/usr/bin/env node
/**
 * Scores AI-generated screens against the design system.
 *   node evals/score.mjs evals/results/tools      → report.json + summary
 *
 * For each .tsx file:
 *   dsUsage        design-system components ÷ (components + raw interactive HTML)
 *   hallucinated   props on @ds/react components that aren't in the contract or HTML/ARIA
 *   invalidValues  documented props with undocumented values (ds/valid-props)
 *   rawValues      raw colors / lengths in inline styles (ds/no-raw-style-values)
 *   a11y           missing accessible names (ds/require-accessible-name) + jsx-a11y errors
 * Axe on the rendered result is left to the story tests; this is static.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { ESLint } from 'eslint';
import { parser } from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import ds from '../packages/lint/eslint/index.js';

const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node evals/score.mjs <results folder>');
  process.exit(2);
}

// Every documented prop per exported component, from the contracts.
const aiDir = new URL('../ai/', import.meta.url);
const index = JSON.parse(readFileSync(new URL('components.json', aiDir), 'utf8')).components;
const contractProps = new Map();
for (const c of index) {
  const contract = JSON.parse(readFileSync(new URL(`components/${c.id}.json`, aiDir), 'utf8'));
  for (const comp of contract.components) contractProps.set(comp.name, new Set(Object.keys(comp.props)));
}
const COMMON = new Set(
  'key ref children className style id role title tabIndex hidden lang dir name value defaultValue type placeholder disabled required readOnly autoFocus autoComplete form href target rel min max step rows cols maxLength minLength pattern checked defaultChecked open defaultOpen asChild htmlFor src alt width height'.split(' '),
);
const RAW_INTERACTIVE = new Set(['button', 'input', 'select', 'textarea', 'table', 'dialog', 'progress', 'hr']);

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      files: ['**/*.tsx'],
      languageOptions: { parser, parserOptions: { ecmaFeatures: { jsx: true } } },
      plugins: { ds, 'jsx-a11y': jsxA11y },
      rules: {
        ...jsxA11y.flatConfigs.recommended.rules,
        'ds/valid-props': 'error',
        'ds/require-accessible-name': 'error',
        'ds/no-raw-style-values': 'error',
      },
    },
  ],
});

const files = readdirSync(dir).filter((f) => f.endsWith('.tsx'));
const results = [];
for (const file of files) {
  const code = readFileSync(join(dir, file), 'utf8');
  const imported = new Map();
  for (const m of code.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]@ds\/react['"]/g)) {
    for (const part of m[1].split(',')) {
      const [name, alias] = part.trim().split(/\s+as\s+/);
      if (name && !name.startsWith('type ')) imported.set((alias ?? name).trim(), name.trim());
    }
  }
  let dsCount = 0;
  let rawCount = 0;
  const hallucinated = [];
  let ast;
  try {
    ast = parser.parseForESLint(code, { ecmaFeatures: { jsx: true }, sourceType: 'module', range: false }).ast;
  } catch {
    ast = null;
  }
  const walk = (node) => {
    if (!node || typeof node.type !== 'string') return;
    if (node.type === 'JSXOpeningElement' && node.name.type === 'JSXIdentifier') {
      const tag = node.name.name;
      const attrs = node.attributes.filter((a) => a.type === 'JSXAttribute');
      if (imported.has(tag)) {
        dsCount++;
        const props = contractProps.get(imported.get(tag)) ?? new Set();
        for (const a of attrs) {
          const attr = a.name.type === 'JSXIdentifier' ? a.name.name : '';
          if (!attr || props.has(attr) || COMMON.has(attr) || /^(on[A-Z]|aria-|data-)/.test(attr)) continue;
          hallucinated.push(`${imported.get(tag)}.${attr}`);
        }
      } else if (RAW_INTERACTIVE.has(tag)) {
        const type = attrs.find((a) => a.name.name === 'type')?.value?.value;
        if (type !== 'hidden') rawCount++;
      }
    }
    for (const key of Object.keys(node)) {
      if (key === 'parent') continue;
      const child = node[key];
      if (Array.isArray(child)) child.forEach(walk);
      else if (child && typeof child === 'object') walk(child);
    }
  };
  walk(ast);
  const [lint] = await eslint.lintText(code, { filePath: file });
  const count = (prefix) => lint.messages.filter((x) => x.ruleId?.startsWith(prefix)).length;
  results.push({
    id: basename(file, '.tsx'),
    dsUsage: dsCount + rawCount ? dsCount / (dsCount + rawCount) : 0,
    rawElements: rawCount,
    hallucinated: [...new Set(hallucinated)],
    invalidValues: count('ds/valid-props'),
    rawValues: count('ds/no-raw-style-values'),
    a11y: count('ds/require-accessible-name') + count('jsx-a11y/'),
    parseError: lint.messages.some((x) => x.fatal),
  });
}

const sum = (k) => results.reduce((n, r) => n + (Array.isArray(r[k]) ? r[k].length : Number(r[k])), 0);
const summary = {
  files: results.length,
  dsUsage: results.length ? results.reduce((n, r) => n + r.dsUsage, 0) / results.length : 0,
  rawElements: sum('rawElements'),
  hallucinatedProps: sum('hallucinated'),
  invalidValues: sum('invalidValues'),
  rawValues: sum('rawValues'),
  a11yProblems: sum('a11y'),
  parseErrors: sum('parseError'),
};
writeFileSync(join(dir, 'report.json'), JSON.stringify({ summary, results }, null, 2) + '\n');
console.log(`${dir}: ${summary.files} screens`);
console.log(`  design-system usage   ${(summary.dsUsage * 100).toFixed(1)}%   (target ≥ 90%)`);
console.log(`  raw HTML controls     ${summary.rawElements}`);
console.log(`  hallucinated props    ${summary.hallucinatedProps}   (target 0)`);
console.log(`  undocumented values   ${summary.invalidValues}   (target 0)`);
console.log(`  raw style values      ${summary.rawValues}   (target 0)`);
console.log(`  accessibility errors  ${summary.a11yProblems}   (target 0)`);
if (summary.parseErrors) console.log(`  files that don't parse ${summary.parseErrors}`);
