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
pageSha256: "2f651ee3a87dc5c1b47602dbd07c86e73ab3434931a22d2bcef899dab0fbac24"
contentMode: "local-full"
zh: ""
---

#### Example

Call `startup()` early, for example on application boot, then call `.query()` on the returned handle once a prompt is ready. This moves subprocess spawn and initialization out of the critical path.

```typescript theme={null}
import { startup } from "@anthropic-ai/claude-agent-sdk";

// Pay startup cost upfront
const warm = await startup({ options: { maxTurns: 3 } });

// Later, when a prompt is ready, this is immediate
for await (const message of warm.query("What files are here?")) {
  console.log(message);
}
```

### `tool()`

Creates a type-safe MCP tool definition for use with SDK MCP servers.

```typescript theme={null}
function tool<Schema extends AnyZodRawShape>(
  name: string,
  description: string,
  inputSchema: Schema,
  handler: (args: InferShape<Schema>, extra: unknown) => Promise<CallToolResult>,
  extras?: { annotations?: ToolAnnotations; searchHint?: string; alwaysLoad?: boolean }
): SdkMcpToolDefinition<Schema>;
```
