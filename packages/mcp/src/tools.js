/**
 * Design-system tools for AI agents, as plain functions over the generated ai/ files.
 * server.js exposes them over MCP; tests call them directly.
 *
 * Data: the package's own ai/ copy (added when packed), else the repo's ai/ folder, or
 * DS_AI_DIR to point somewhere else.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const here = fileURLToPath(new URL('.', import.meta.url));
const candidates = [process.env.DS_AI_DIR, join(here, '../ai'), join(here, '../../../ai')].filter(Boolean);
export const aiDir = candidates.find((dir) => existsSync(join(dir, 'components.json')));
if (!aiDir) throw new Error('Design-system AI files not found. Run `npm run ai` or set DS_AI_DIR.');

const readJson = (file) => JSON.parse(readFileSync(join(aiDir, file), 'utf8'));
const index = readJson('components.json').components;

const find = (name) => {
  const key = String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
  return index.find(
    (c) =>
      c.id.replace(/-/g, '') === key ||
      c.name.toLowerCase() === key ||
      c.exports.some((e) => e.toLowerCase() === key),
  );
};

/** Every component: id, name, exports, category, status and purpose. */
export const listComponents = ({ category } = {}) =>
  index.filter((c) => !category || c.category.toLowerCase() === category.toLowerCase());

/** The full contract of one component (props, options, states, a11y, guidelines, tokens). */
export const getComponent = ({ name, includeTokens = false }) => {
  const entry = find(name);
  if (!entry) return { error: `No component “${name}”. Call list_components for names.` };
  const contract = readJson(`components/${entry.id}.json`);
  if (!includeTokens) {
    contract.tokens = `${Object.keys(contract.tokens).length} tokens; call get_tokens with filter "${contract.tokenPrefixes[0]}".`;
  }
  return contract;
};

/** Runnable examples of one component. */
export const getComponentExamples = ({ name }) => {
  const entry = find(name);
  if (!entry) return { error: `No component “${name}”.` };
  return readJson(`components/${entry.id}.json`).examples;
};

/** Always-on rules and scales: colors roles, spacing, radius, type, motion, themes. */
export const getFoundations = () => readJson('foundations.json');

/**
 * Tokens whose name contains filter (e.g. "--button-primary" or "spacing"), with their
 * default value, description and values per theme.
 */
export const getTokens = ({ filter = '', limit = 60 }) => {
  const { tokens } = readJson('tokens.json');
  const matches = Object.entries(tokens).filter(([name]) => name.includes(filter));
  return {
    total: matches.length,
    tokens: Object.fromEntries(matches.slice(0, limit)),
    ...(matches.length > limit ? { note: `Showing ${limit}; narrow the filter to see more.` } : {}),
  };
};

/** Searches the guides, foundations and component docs; returns the best matches. */
export const searchDocs = ({ query, limit = 5 }) => {
  const words = String(query).toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  const docs = readdirSync(join(aiDir, 'docs')).map((f) => ({ file: `docs/${f}`, text: readFileSync(join(aiDir, 'docs', f), 'utf8') }));
  const comps = readdirSync(join(aiDir, 'components'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ file: `components/${f}`, text: readFileSync(join(aiDir, 'components', f), 'utf8') }));
  return [...docs, ...comps]
    .map((d) => {
      const lower = d.text.toLowerCase();
      const score = words.reduce((n, w) => n + (lower.split(w).length - 1), 0);
      const at = Math.max(0, lower.indexOf(words[0] ?? ''));
      return { file: d.file, score, excerpt: d.text.slice(Math.max(0, at - 200), at + 400).trim() };
    })
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

/** Changelog entries, newest first, optionally since a version (e.g. "0.3.0"). */
export const getChanges = ({ since } = {}) => {
  const newer = (v) => !since || v.localeCompare(since, undefined, { numeric: true }) > 0;
  return index
    .flatMap((c) => readJson(`components/${c.id}.json`).changelog.map((e) => ({ component: c.name, ...e })))
    .filter((e) => newer(e.version))
    .sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));
};

/**
 * Lints a JSX/TSX snippet with the design-system rules (components over raw HTML,
 * documented props, accessible names, no raw style values).
 */
export const validateCode = async ({ code, filename = 'snippet.tsx' }) => {
  const [{ ESLint }, ds] = await Promise.all([import('eslint'), import('@ds/lint/eslint')]);
  let parser;
  try {
    parser = (await import('typescript-eslint')).parser;
  } catch {
    parser = undefined;
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
        ...ds.default.configs.recommended,
      },
    ],
  });
  const [result] = await eslint.lintText(code, { filePath: filename });
  const problems = result.messages.map((m) => ({
    line: m.line,
    column: m.column,
    rule: m.ruleId,
    severity: m.severity === 2 ? 'error' : 'warning',
    message: m.message,
  }));
  return { ok: !problems.some((p) => p.severity === 'error'), problems };
};
