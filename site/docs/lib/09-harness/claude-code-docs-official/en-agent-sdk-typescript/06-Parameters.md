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
pageSha256: "cda9ccc24582a86582ec12e9ef281a11c311fc20c29f1372a1e8d0f4ab099ade"
contentMode: "local-full"
zh: ""
---

#### Parameters

| Parameter     | Type                                                                                                   | Description                                                                                                                                                                                                                                                                                                   |
| :------------ | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`        | `string`                                                                                               | The name of the tool                                                                                                                                                                                                                                                                                          |
| `description` | `string`                                                                                               | A description of what the tool does                                                                                                                                                                                                                                                                           |
| `inputSchema` | `Schema extends AnyZodRawShape`                                                                        | Zod schema defining the tool's input parameters (supports both Zod 3 and Zod 4)                                                                                                                                                                                                                               |
| `handler`     | `(args, extra) => Promise<`[`CallToolResult`](#calltoolresult)`>`                                      | Async function that executes the tool logic                                                                                                                                                                                                                                                                   |
| `extras`      | `\{ annotations?: `[`ToolAnnotations`](#toolannotations)`; searchHint?: string; alwaysLoad?: boolean \}` | Optional extras. `annotations` provides MCP behavioral hints to clients. `searchHint` is a one-line capability phrase shown in the deferred-tool list when [tool search](https://code.claude.com/docs/en/agent-sdk/tool-search) is active. `alwaysLoad: true` keeps this tool's full schema in the initial prompt instead of deferring it |
