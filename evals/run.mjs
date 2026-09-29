#!/usr/bin/env node
/**
 * Runs the eval prompts through a model and saves one .tsx per prompt, then scores them.
 *
 *   ANTHROPIC_API_KEY=… node evals/run.mjs --condition docs  [--model claude-sonnet-5] [--only id,id]
 *   ANTHROPIC_API_KEY=… node evals/run.mjs --condition tools
 *
 * Conditions:
 *   docs   the model gets AGENTS.md, foundations.json and the component index (llms.txt)
 *   tools  the same, plus the MCP tools (get_component, get_tokens, validate_code, …)
 *
 * Results: evals/results/{condition}/{id}.tsx and report.json.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import * as tools from '../packages/mcp/src/tools.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const condition = arg('condition', 'tools');
const model = arg('model', 'claude-sonnet-5');
const only = arg('only')?.split(',');
const key = process.env.ANTHROPIC_API_KEY;
if (!key) {
  console.error('Set ANTHROPIC_API_KEY to run the eval (it calls the Anthropic API).');
  process.exit(2);
}

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const system = [
  'You build React UI for an app that uses the @ds/react design system.',
  'Answer with one complete TSX file in a single ```tsx code block: imports, and a default-exported component. No other files.',
  '',
  read('../AGENTS.md'),
  '## foundations.json',
  read('../ai/foundations.json'),
  '## Component index (llms.txt)',
  read('../ai/llms.txt'),
].join('\n');

const toolDefs = [
  ['list_components', 'List components (id, name, exports, category, purpose).', { category: { type: 'string' } }, []],
  ['get_component', 'Full contract of one component: props with allowed values, a11y, guidelines, examples.', { name: { type: 'string' } }, ['name']],
  ['get_component_examples', 'Runnable examples of one component.', { name: { type: 'string' } }, ['name']],
  ['get_tokens', 'Tokens whose name contains filter, with values per theme.', { filter: { type: 'string' } }, ['filter']],
  ['search_docs', 'Search guides and component docs.', { query: { type: 'string' } }, ['query']],
  ['validate_code', 'Check TSX against the design-system rules. Fix every error.', { code: { type: 'string' } }, ['code']],
].map(([name, description, properties, required]) => ({
  name,
  description,
  input_schema: { type: 'object', properties, required },
}));
const handlers = {
  list_components: tools.listComponents,
  get_component: tools.getComponent,
  get_component_examples: tools.getComponentExamples,
  get_tokens: tools.getTokens,
  search_docs: tools.searchDocs,
  validate_code: tools.validateCode,
};

async function ask(prompt) {
  const messages = [{ role: 'user', content: prompt }];
  for (let turn = 0; turn < 12; turn++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model,
        max_tokens: 8000,
        system,
        messages,
        ...(condition === 'tools' ? { tools: toolDefs } : {}),
      }),
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    const data = await res.json();
    messages.push({ role: 'assistant', content: data.content });
    if (data.stop_reason !== 'tool_use') {
      const text = data.content.filter((c) => c.type === 'text').map((c) => c.text).join('\n');
      return text.match(/```(?:tsx|jsx)?\n([\s\S]*?)```/)?.[1] ?? text;
    }
    const results = [];
    for (const call of data.content.filter((c) => c.type === 'tool_use')) {
      const output = await handlers[call.name](call.input);
      results.push({ type: 'tool_result', tool_use_id: call.id, content: JSON.stringify(output).slice(0, 20000) });
    }
    messages.push({ role: 'user', content: results });
  }
  throw new Error('Too many tool turns');
}

const prompts = JSON.parse(read('./prompts.json')).filter((p) => !only || only.includes(p.id));
const out = new URL(`./results/${condition}/`, import.meta.url);
mkdirSync(out, { recursive: true });
for (const p of prompts) {
  process.stdout.write(`${p.id}… `);
  try {
    writeFileSync(new URL(`${p.id}.tsx`, out), await ask(p.prompt));
    console.log('done');
  } catch (e) {
    console.log(`failed: ${e.message.slice(0, 200)}`);
  }
}
execFileSync('node', ['evals/score.mjs', `evals/results/${condition}`], { stdio: 'inherit' });
