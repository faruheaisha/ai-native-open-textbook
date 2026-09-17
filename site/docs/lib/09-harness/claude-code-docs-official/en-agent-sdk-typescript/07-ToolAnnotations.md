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
pageSha256: "d0b5d40ca851903d1a818398eb4a70ba343375564af5886aac7e17432b59adca"
contentMode: "local-full"
zh: ""
---

#### `ToolAnnotations`

Re-exported from `@modelcontextprotocol/sdk/types.js`. All fields are optional hints; clients should not rely on them for security decisions.

| Field             | Type      | Default     | Description                                                                                                                                          |
| :---------------- | :-------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`           | `string`  | `undefined` | Human-readable title for the tool                                                                                                                    |
| `readOnlyHint`    | `boolean` | `false`     | If `true`, the tool does not modify its environment                                                                                                  |
| `destructiveHint` | `boolean` | `true`      | If `true`, the tool may perform destructive updates (only meaningful when `readOnlyHint` is `false`)                                                 |
| `idempotentHint`  | `boolean` | `false`     | If `true`, repeated calls with the same arguments have no additional effect (only meaningful when `readOnlyHint` is `false`)                         |
| `openWorldHint`   | `boolean` | `true`      | If `true`, the tool interacts with external entities (for example, web search). If `false`, the tool's domain is closed (for example, a memory tool) |

```typescript theme={null}
import { tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const searchTool = tool(
  "search",
  "Search the web",
  { query: z.string() },
  async ({ query }) => {
    return { content: [{ type: "text", text: `Results for: ${query}` }] };
  },
  { annotations: { readOnlyHint: true, openWorldHint: true } }
);
```

### `createSdkMcpServer()`

Creates an MCP server instance that runs in the same process as your application.

```typescript theme={null}
function createSdkMcpServer(options: {
  name: string;
  version?: string;
  instructions?: string;
  tools?: Array<SdkMcpToolDefinition<any>>;
  alwaysLoad?: boolean;
  timeout?: number;
}): McpSdkServerConfigWithInstance;
```
