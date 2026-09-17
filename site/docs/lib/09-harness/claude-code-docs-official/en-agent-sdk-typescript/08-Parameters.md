---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/typescript.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/typescript.md"
sourceSha256: "305f751e4d47db29303c15a79aa95777deff6625785b12533072bc0548010547"
pageSha256: "77418b18f9c57f4d7112a6e66c41df96eacac08e56743569e0dc099648afd52c"
contentMode: "local-full"
zh: ""
---

#### Parameters

| Parameter              | Type                          | Description                                                                                                                                                                                                                                                         |
| :--------------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options.name`         | `string`                      | The name of the MCP server                                                                                                                                                                                                                                          |
| `options.version`      | `string`                      | Optional version string                                                                                                                                                                                                                                             |
| `options.instructions` | `string`                      | Optional server instructions, returned from `initialize` and surfaced to the model as an MCP instructions block                                                                                                                                                     |
| `options.tools`        | `Array<SdkMcpToolDefinition>` | Array of tool definitions created with [`tool()`](#tool)                                                                                                                                                                                                            |
| `options.alwaysLoad`   | `boolean`                     | When `true`, every tool from this server stays in the initial prompt and is never deferred behind [tool search](https://code.claude.com/docs/en/agent-sdk/tool-search). Combines with per-tool `alwaysLoad` in [`tool()`](#tool)                                                                |
| `options.timeout`      | `number`                      | Timeout in milliseconds for this server's tool calls. Claude Code applies it to this server in place of [`MCP_TOOL_TIMEOUT`](https://code.claude.com/docs/en/env-vars). Pass a whole number of at least 1000. Claude Code ignores other values. Requires TypeScript Agent SDK v0.3.248 or later |

### `listSessions()`

Discovers and lists past sessions with light metadata. Filter by project directory or list sessions across all projects.

```typescript theme={null}
function listSessions(options?: ListSessionsOptions): Promise<SDKSessionInfo[]>;
```
