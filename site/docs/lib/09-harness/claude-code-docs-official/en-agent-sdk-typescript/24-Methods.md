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
pageSha256: "a0755fa28d6b940c5765468710af0ab96f3110f410384ecca09afd63de4d77e3"
contentMode: "local-full"
zh: ""
---

#### Methods

| Method          | Description                                                                                                               |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `query(prompt)` | Send a prompt to the pre-warmed subprocess and return a [`Query`](#query-object). Can only be called once per `WarmQuery` |
| `close()`       | Close the subprocess without sending a prompt. Use this to discard a warm query that is no longer needed                  |

`WarmQuery` implements `AsyncDisposable`, so it can be used with `await using` for automatic cleanup.

### `SDKControlInitializeResponse`

Return type of `initializationResult()`. Contains session initialization data.

```typescript theme={null}
type SDKControlInitializeResponse = {
  commands: SlashCommand[];
  agents: AgentInfo[];
  output_style: string;
  available_output_styles: string[];
  models: ModelInfo[];
  account: AccountInfo;
  fast_mode_state?: "off" | "cooldown" | "on";
  fast_mode_disabled_reason?: FastModeDisabledReason;
  hooks_applied?: boolean;
};
```

`hooks_applied` reports whether Claude Code registered the `hooks` that the `initialize` request carried. The SDK sends that request once when the session starts and again on each [`reinitialize()`](#query-object) call. The field requires Agent SDK v0.3.238 or later.

Claude Code omits the field when the request carried no hooks. When the request carried hooks, the value depends on whether the request is the session's first initialize and, for a repeated one, on how it reached the session:

* `true`: Claude Code registered the hooks. A session's first initialize returns this value. So does a repeated initialize sent over the CLI's stdin. In that case the hooks in the new request replace the hooks registered earlier.
* `false`: Claude Code ignored the hooks. A repeated initialize sent to a remote session returns this value, so a second client that joins a session can't replace the hooks the first client registered.

Before Agent SDK v0.3.238, the response never carried the field, and Claude Code ignored `hooks` on every repeated initialize.

The response always reports `fast_mode_state`, and when something blocks [fast mode](https://code.claude.com/docs/en/fast-mode), `fast_mode_disabled_reason` carries the reason code alongside it, so you can explain the blocked state instead of re-deriving availability. Both behaviors require Claude Code v2.1.219 or later. Before v2.1.219, the response omitted `fast_mode_state` when fast mode wasn't available and never carried a reason. For the reason codes and their meanings, see [`fast_mode_disabled_reason`](#sdkresultmessage) on the result message.

The control-response wrapper for a successful `initialize` also carries a `pending_permission_requests` array. The field is on the response wrapper itself, not in the `SDKControlInitializeResponse` payload above. Each entry is a complete `control_request` message with the same `\{ type: "control_request", request_id, request \}` shape the session streams for permission requests while running.

The array lists the permission requests that this Claude Code process has issued and not yet resolved. The SDK reads the array for you and dispatches each entry to your [`canUseTool`](#canusetool) callback, the same redelivery that [`reinitialize()`](#query-object) triggers after a transport gap. Handle repeated request IDs idempotently, because an entry can repeat a request the callback already received before the connection dropped.

The array is always present on a successful `initialize` response and is empty when this process has no unresolved permission request. Requires Claude Code v2.1.268 or later. Earlier versions could omit the field, so if you parse the wire protocol yourself, treat a missing field as an older CLI rather than as proof that nothing is pending.

### `SDKControlInterruptResponse`

The interrupt receipt: the value [`interrupt()`](#query-object) resolves with on a CLI that advertises the `interrupt_receipt_v1` capability in [`SDKSystemMessage.capabilities`](#sdksystemmessage). Requires Claude Code v2.1.205 or later. Earlier CLIs answer the interrupt with an empty success payload, so `interrupt()` resolves to `undefined`.

```typescript theme={null}
type SDKControlInterruptResponse = {
  still_queued: string[];
  cancelled?: string[];
};
```

`still_queued` lists the UUIDs of the user messages that were pending when the interrupt arrived: messages still in the queue, plus any messages Claude Code had already taken off the queue for the next turn. Once the session's first turn has started, Claude Code processes the listed messages after the interrupt unless you cancel them first, and can merge several into one turn. If you interrupt before the first turn starts, Claude Code aborts that turn as soon as it starts, and the listed messages in that turn get no response.

Use the receipt to decide whether to resend anything. A listed message that you don't cancel enters the conversation whether or not it gets a response, so resending it delivers it to Claude twice.

Interpret the list with these caveats:

* Only messages that were enqueued with a UUID appear. An empty array doesn't mean nothing else will run.
* Only main-thread messages are listed. Messages addressed to a subagent are out of scope.
* The list can include UUIDs your client never sent, such as [scheduled task](https://code.claude.com/docs/en/scheduled-tasks) triggers. Ignore UUIDs you don't recognize instead of treating them as an error.

A client that drives the CLI's control protocol directly, rather than through `interrupt()`, can set `cancel_queued: true` on the `interrupt` control request. Claude Code v2.1.219 and later advertises support with the `interrupt_cancel_queued_v1` capability in [`SDKSystemMessage.capabilities`](#sdksystemmessage); older CLIs ignore the field and leave queued messages to run as usual. Such an interrupt also cancels every message that would otherwise be listed under `still_queued`: the receipt lists them under `cancelled` instead, `still_queued` is empty, and none of them run.

The `cancelled` list carries the same caveats as `still_queued`. The `interrupt()` method never sends `cancel_queued`, so receipts it resolves with don't carry `cancelled`.

The receipt is a snapshot taken at the moment the interrupt is processed, and on a clean interrupt it arrives before the interrupted turn's [`SDKResultMessage`](#sdkresultmessage). Read the receipt rather than inspecting the queue after that result: the loop starts the next queued turn immediately, so the queue you inspect after the result has already changed.

### `SDKControlGetContextUsageResponse`

Return type of [`getContextUsage()`](#query-object). With the default `detail`, this is the same payload Claude Code renders for the `/context` command in an interactive session, so alongside the token counts it carries display fields such as `color` and `gridRows` that Claude Code uses to draw the `/context` usage grid.

The method's optional `detail` argument chooses how Claude Code counts each category. With the default, `'full'`, Claude Code counts each category with token-counting API requests. Pass `\{ detail: 'summary' \}` to get an answer from the last response's usage and local estimates instead. No token-count requests go out, and the per-category numbers are approximate. The `detail` argument requires Agent SDK v0.3.257 or later.

When you send `/context` as a prompt instead of calling the method, Claude Code attaches an [`SDKContextUsage`](#sdkcontextusage) payload to the `context_usage` field of the assistant message that delivers the result. That field requires Agent SDK v0.3.232 or later.

```typescript theme={null}
type SDKControlGetContextUsageResponse = {
  categories: {
    name: string;
    tokens: number;
    color: string;
    isDeferred?: boolean;
  }[];
  totalTokens: number;
  maxTokens: number;
  rawMaxTokens: number;
  percentage: number;
  gridRows: {
    color: string;
    isFilled: boolean;
    categoryName: string;
    tokens: number;
    percentage: number;
    squareFullness: number;
  }[][];
  model: string;
  memoryFiles: {
    path: string;
    type: string;
    tokens: number;
  }[];
  mcpTools: {
    name: string;
    serverName: string;
    tokens: number;
    isLoaded?: boolean;
  }[];
  deferredBuiltinTools?: {
    name: string;
    tokens: number;
    isLoaded: boolean;
  }[];
  systemTools?: {
    name: string;
    tokens: number;
  }[];
  systemPromptSections?: {
    name: string;
    tokens: number;
  }[];
  agents: {
    agentType: string;
    source: string;
    tokens: number;
  }[];
  slashCommands?: {
    totalCommands: number;
    includedCommands: number;
    tokens: number;
  };
  skills?: {
    totalSkills: number;
    includedSkills: number;
    tokens: number;
    skillFrontmatter: {
      name: string;
      source: string;
      tokens: number;
    }[];
  };
  autoCompactThreshold?: number;
  isAutoCompactEnabled: boolean;
  messageBreakdown?: {
    toolCallTokens: number;
    toolResultTokens: number;
    attachmentTokens: number;
    assistantMessageTokens: number;
    userMessageTokens: number;
    redirectedContextTokens: number;
    unattributedTokens: number;
    toolCallsByType: {
      name: string;
      callTokens: number;
      resultTokens: number;
    }[];
    attachmentsByType: {
      name: string;
      tokens: number;
    }[];
  };
  apiUsage: {
    input_tokens: number;
    output_tokens: number;
    cache_creation_input_tokens: number;
    cache_read_input_tokens: number;
  } | null;
};
```

Read token attribution from the collection fields:

* `categories` holds the per-category totals.
* `mcpTools` and `agents` attribute tokens to individual MCP tools and subagents.
* `memoryFiles` lists each loaded memory file with its cost.
* `skills.skillFrontmatter` attributes the skill listing's tokens to each included skill. The per-skill counts measure each skill's listing entry as Claude Code actually sends it, which can be shorter than the skill's full frontmatter. Compare `skills.totalSkills` with `skills.includedSkills` to see whether every discovered skill made it into the listing.

`totalTokens` is the session's current context usage, and `maxTokens` is the window that usage is measured against. That window is the model's context window, or the lower auto-compaction window when one applies. `rawMaxTokens` carries the same value as `maxTokens`, and `percentage` is `totalTokens` as a rounded percentage of that window.

Claude Code leaves the optional `deferredBuiltinTools`, `systemTools`, and `systemPromptSections` diagnostics unset, so expect them to be absent even though the type declares them.

### `SDKControlReadFileResponse`

Return type of [`readFile()`](#query-object).

```typescript theme={null}
type SDKControlReadFileResponse = {
  contents: string;
  absPath: string;
  truncated?: boolean;
  encoding?: 'base64';
};
```

`contents` holds the file text, or base64 data when you requested `encoding: 'base64'`; the response's `encoding` field is set to `'base64'` in that case. `absPath` is the resolved absolute path. `truncated` is set when the file was longer than the `maxBytes` cap and the contents were cut at that limit.

### `SDKControlReloadSkillsResponse`

Return type of [`reloadSkills()`](#query-object).

```typescript theme={null}
type SDKControlReloadSkillsResponse = {
  skills: SlashCommand[];
};
```

`skills` lists the skills available after the reload, in the same [`SlashCommand`](#slashcommand) shape that `supportedCommands()` returns.

### `AgentDefinition`

Configuration for a subagent defined programmatically.

```typescript theme={null}
type AgentDefinition = {
  description: string;
  tools?: string[];
  disallowedTools?: string[];
  prompt: string;
  model?: string;
  mcpServers?: AgentMcpServerSpec[];
  skills?: string[];
  initialPrompt?: string;
  maxTurns?: number;
  background?: boolean;
  memory?: "user" | "project" | "local";
  effort?: "low" | "medium" | "high" | "xhigh" | "max" | number;
  permissionMode?: PermissionMode;
  criticalSystemReminder_EXPERIMENTAL?: string;
};
```

| Field                                 | Required | Description                                                                                                                                                                                                                                                                      |
| :------------------------------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`                         | Yes      | Natural language description of when to use this agent                                                                                                                                                                                                                           |
| `tools`                               | No       | Array of allowed tool names. If omitted, inherits every [tool available to subagents](https://code.claude.com/docs/en/sub-agents#available-tools). To preload Skills into the agent's context, use the `skills` field rather than listing `'Skill'` here                                                     |
| `disallowedTools`                     | No       | Array of tool names to explicitly disallow for this agent. MCP server-level patterns are also accepted: `mcp__server` or `mcp__server__*` removes every tool from that server, and `mcp__*` removes every MCP tool from any server                                               |
| `prompt`                              | Yes      | The agent's system prompt                                                                                                                                                                                                                                                        |
| `model`                               | No       | Model override for this agent. Accepts an alias such as `'fable'`, `'opus'`, `'sonnet'`, `'haiku'`, `'inherit'`, or a full model ID. `'inherit'` uses the main model. When you omit it, Claude Code picks the model in the [subagent model order](https://code.claude.com/docs/en/sub-agents#choose-a-model) |
| `mcpServers`                          | No       | MCP server specifications for this agent                                                                                                                                                                                                                                         |
| `skills`                              | No       | Array of skill names to preload into the agent context                                                                                                                                                                                                                           |
| `initialPrompt`                       | No       | Auto-submitted as the first user turn when this agent runs as the main thread agent                                                                                                                                                                                              |
| `maxTurns`                            | No       | Maximum number of agentic turns (API round-trips) before stopping                                                                                                                                                                                                                |
| `background`                          | No       | Run this agent as a non-blocking background task when invoked                                                                                                                                                                                                                    |
| `memory`                              | No       | Memory source for this agent: `'user'`, `'project'`, or `'local'`                                                                                                                                                                                                                |
| `effort`                              | No       | Reasoning effort level for this agent. Accepts a named level or an integer                                                                                                                                                                                                       |
| `permissionMode`                      | No       | Permission mode for tool execution within this agent. The [subagent inheritance rules](https://code.claude.com/docs/en/agent-sdk/permissions#available-modes) decide when it applies. See [`PermissionMode`](#permissionmode)                                                                                |
| `criticalSystemReminder_EXPERIMENTAL` | No       | Experimental: Critical reminder added to the system prompt                                                                                                                                                                                                                       |

### `AgentMcpServerSpec`

Specifies MCP servers available to a subagent. Can be a server name (string referencing a server from the parent's `mcpServers` config) or an inline server configuration record mapping server names to configs.

```typescript theme={null}
type AgentMcpServerSpec = string | Record<string, McpServerConfigForProcessTransport>;
```

Where `McpServerConfigForProcessTransport` is `McpStdioServerConfig | McpSSEServerConfig | McpHttpServerConfig | McpSdkServerConfig`.

### `SettingSource`

Controls which filesystem-based configuration sources the SDK loads settings from.

```typescript theme={null}
type SettingSource = "user" | "project" | "local";
```

| Value       | Description                                                               | Location                      |
| :---------- | :------------------------------------------------------------------------ | :---------------------------- |
| `'user'`    | Global user settings                                                      | `~/.claude/settings.json`     |
| `'project'` | Shared project settings (version controlled)                              | `.claude/settings.json`       |
| `'local'`   | Local project settings, gitignored when Claude Code saves a setting to it | `.claude/settings.local.json` |
