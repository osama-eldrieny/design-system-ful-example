#!/usr/bin/env node
/**
 * @ds/mcp: a local MCP server (stdio, no network) for AI agents building with the design
 * system. Register it in your agent, e.g. Claude Code:
 *   claude mcp add ds -- npx ds-mcp
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import * as tools from './tools.js';

const server = new McpServer({ name: 'design-system', version: '0.1.0' });
const reply = (data) => ({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] });

server.registerTool(
  'list_components',
  {
    description:
      'List design-system components (id, name, exports, category, status, purpose). Start here before building UI.',
    inputSchema: { category: z.string().optional().describe('e.g. Forms, Overlays, Patterns') },
  },
  async (args) => reply(tools.listComponents(args)),
);
server.registerTool(
  'get_component',
  {
    description:
      'Full contract of one component: props with allowed values, options, states, accessibility, do/don’t guidelines and examples. Use only props and values listed here.',
    inputSchema: {
      name: z.string().describe('Component name or id, e.g. Button or date-picker'),
      includeTokens: z.boolean().optional().describe('Include every token value per theme (large)'),
    },
  },
  async (args) => reply(tools.getComponent(args)),
);
server.registerTool(
  'get_component_examples',
  {
    description: 'Runnable JSX examples of one component.',
    inputSchema: { name: z.string() },
  },
  async (args) => reply(tools.getComponentExamples(args)),
);
server.registerTool(
  'get_foundations',
  {
    description:
      'Always-on rules and scales: how to import, color roles, spacing, radius, typography, motion, theme axes. Read once per task.',
    inputSchema: {},
  },
  async () => reply(tools.getFoundations()),
);
server.registerTool(
  'get_tokens',
  {
    description:
      'Design tokens whose name contains filter, with description, default value and values per theme. Use tokens instead of raw colors and sizes.',
    inputSchema: {
      filter: z.string().describe('e.g. "--spacing", "--color-bg", "--button-primary"'),
      limit: z.number().int().positive().optional(),
    },
  },
  async (args) => reply(tools.getTokens(args)),
);
server.registerTool(
  'search_docs',
  {
    description: 'Search guides (theming, installation, accessibility) and component docs.',
    inputSchema: { query: z.string(), limit: z.number().int().positive().optional() },
  },
  async (args) => reply(tools.searchDocs(args)),
);
server.registerTool(
  'validate_code',
  {
    description:
      'Check a JSX/TSX snippet against the design system: raw HTML instead of components, undocumented prop values, missing accessible names, raw colors/lengths. Fix every error before finishing.',
    inputSchema: { code: z.string(), filename: z.string().optional() },
  },
  async (args) => reply(await tools.validateCode(args)),
);
server.registerTool(
  'get_changes',
  {
    description: 'Changelog entries (new components, API changes, deprecations), optionally since a version.',
    inputSchema: { since: z.string().optional().describe('e.g. "0.3.0"') },
  },
  async (args) => reply(tools.getChanges(args)),
);

await server.connect(new StdioServerTransport());
