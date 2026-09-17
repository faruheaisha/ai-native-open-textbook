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
pageSha256: "b9839d8f31db466f62913d6e9c6d050dc355f464df4f769f32452a5e162976be"
contentMode: "local-full"
zh: ""
---

#### Settings precedence

When multiple sources are loaded, settings are merged with this precedence (highest to lowest):

1. Local settings (`.claude/settings.local.json`)
2. Project settings (`.claude/settings.json`)
3. User settings (`~/.claude/settings.json`)

Programmatic options such as `agents`, `allowedTools`, and `settings` override user, project, and local filesystem settings. Managed policy settings take precedence over programmatic options.

### `PermissionMode`

```typescript theme={null}
type PermissionMode =
  | "default" // Standard permission behavior
  | "acceptEdits" // Auto-accept file edits
  | "bypassPermissions" // Bypass permission checks; explicit ask rules still prompt
  | "plan" // Planning mode - explore without editing
  | "dontAsk" // Don't prompt for permissions, deny if not pre-approved
  | "auto"; // Model classifier approves or denies permission prompts
```

### `CanUseTool`

Custom permission function type for controlling tool usage.

The function is the SDK replacement for the interactive permission prompt: it's invoked only when the [permission evaluation flow](https://code.claude.com/docs/en/agent-sdk/permissions#how-permissions-are-evaluated) resolves to a prompt. Tool calls already approved by an `allowedTools` entry, a settings allow rule, or the permission mode, such as `acceptEdits` or `bypassPermissions`, never invoke it. To gate every tool call, use a [`PreToolUse` hook](https://code.claude.com/docs/en/agent-sdk/hooks) instead.

An allow rule doesn't pre-approve the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves); see [How permissions are evaluated](https://code.claude.com/docs/en/agent-sdk/permissions#how-permissions-are-evaluated) for which of them reach the callback and what happens in `dontAsk` and `auto` mode.

```typescript theme={null}
type CanUseTool = (
  toolName: string,
  input: Record<string, unknown>,
  options: {
    signal: AbortSignal;
    suggestions?: PermissionUpdate[];
    blockedPath?: string;
    decisionReason?: string;
    toolUseID: string;
    agentID?: string;
    requestId: string;
  }
) => Promise<PermissionResult | null>;
```

| Option           | Type                                        | Description                                                                                                                                                                                                                                                                                                  |
| :--------------- | :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `signal`         | `AbortSignal`                               | Signaled if the operation should be aborted                                                                                                                                                                                                                                                                  |
| `suggestions`    | [`PermissionUpdate`](#permissionupdate)`[]` | Suggested permission updates so the user is not prompted again for this tool. Bash prompts include a suggestion with the `localSettings` [destination](#permissionupdatedestination), so returning it in `updatedPermissions` writes the rule to `.claude/settings.local.json` and persists across sessions. |
| `blockedPath`    | `string`                                    | The file path that triggered the permission request, if applicable                                                                                                                                                                                                                                           |
| `decisionReason` | `string`                                    | Explains why this permission request was triggered                                                                                                                                                                                                                                                           |
| `toolUseID`      | `string`                                    | Unique identifier for this specific tool call within the assistant message                                                                                                                                                                                                                                   |
| `agentID`        | `string`                                    | If running within a sub-agent, the sub-agent's ID                                                                                                                                                                                                                                                            |
| `requestId`      | `string`                                    | The `control_request` envelope's `request_id`. A `control_response` your application sends outside the SDK, such as a signed HTTP POST, must echo this value so the Claude Code process can match the reply to the request                                                                                   |

The callback normally resolves the request by returning a [`PermissionResult`](#permissionresult), which the SDK writes back over its transport as the `control_response`. Return `null` only when your application has already sent the `control_response` for this request over its own channel, echoing `requestId`; the SDK then skips writing the response to its transport. Returning `null` in any other case leaves the tool call blocked indefinitely, because no `control_response` is ever sent and permission prompts don't time out.

The `requestId` option and the `null` return value require Claude Code v2.1.199 or later.

### `PermissionResult`

Result of a permission check.

```typescript theme={null}
type PermissionResult =
  | {
      behavior: "allow";
      updatedInput?: Record<string, unknown>;
      updatedPermissions?: PermissionUpdate[];
      toolUseID?: string;
    }
  | {
      behavior: "deny";
      message: string;
      interrupt?: boolean;
      toolUseID?: string;
    };
```

### `ToolConfig`

Configuration for built-in tool behavior.

```typescript theme={null}
type ToolConfig = {
  askUserQuestion?: {
    previewFormat?: "markdown" | "html";
  };
};
```

| Field                           | Type                   | Description                                                                                                                                                                   |
| :------------------------------ | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `askUserQuestion.previewFormat` | `'markdown' \| 'html'` | Opts into the `preview` field on [`AskUserQuestion`](https://code.claude.com/docs/en/agent-sdk/user-input#question-format) options and sets its content format. When unset, Claude does not emit previews |

### `McpServerConfig`

Configuration for MCP servers.

```typescript theme={null}
type McpServerConfig =
  | McpStdioServerConfig
  | McpSSEServerConfig
  | McpHttpServerConfig
  | McpSdkServerConfigWithInstance;
```
