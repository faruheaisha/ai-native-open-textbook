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
pageSha256: "9830093368b5c5032d6080e73b049c57a74a8da5e6359fcc0c2482168d03400d"
contentMode: "local-full"
zh: ""
---

#### `queued_turn_count`

The number of messages you sent with [`origin: \{ kind: "human" \}`](#sdkmessageorigin) that are still waiting in the command queue when Claude Code produced the result. Requires Agent SDK v0.3.242 or later.

What `0` and an absent field tell you:

* **`0`**: Claude Code doesn't count messages you sent without that `origin`, and doesn't count task notifications, so a turn can still follow.
* **Absent**: the final result that Claude Code emits after a crash or fatal startup error omits the field, and [may carry zeroed totals](https://code.claude.com/docs/en/agent-sdk/cost-tracking#recover-totals-after-a-session-crash).

### `SDKSystemMessage`

System initialization message.

```typescript theme={null}
type SDKSystemMessage = {
  type: "system";
  subtype: "init";
  uuid: UUID;
  session_id: string;
  agents?: string[];
  apiKeySource: ApiKeySource;
  betas?: string[];
  claude_code_version: string;
  cwd: string;
  tools: string[];
  mcp_servers: {
    name: string;
    status: string;
  }[];
  model: string;
  permissionMode: PermissionMode;
  slash_commands: string[];
  terminal_slash_commands?: string[];
  output_style: string;
  skills: string[];
  plugins: { name: string; path: string }[];
  fast_mode_state?: FastModeState;
  fast_mode_disabled_reason?: FastModeDisabledReason;
  effort?: "low" | "medium" | "high" | "xhigh" | "max" | null;
  capabilities?: string[];
};
```

`fast_mode_state` reports the session's [fast mode](https://code.claude.com/docs/en/fast-mode) state. When something blocks fast mode, `fast_mode_disabled_reason` names the check that blocked it; the field requires Claude Code v2.1.219 or later. For the reason codes and their meanings, see [`fast_mode_disabled_reason`](#sdkresultmessage) on the result message.

`terminal_slash_commands` names the entries in `slash_commands` whose interface is bound to the local terminal, such as `exit`. You can send them like any other entry in `slash_commands`; the field exists so a remote or mobile client can hide them from its command menus. The field is present only when non-empty, and requires Agent SDK v0.3.229 or later.

* `effort`: the [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) Claude Code sends on the session's next request, or `null` when it sends none. Claude Code sets the field only on the init message it sends to [Remote Control](https://code.claude.com/docs/en/remote-control) clients, and omits it from the init message your application reads. Requires Agent SDK v0.3.234 or later.

The `capabilities` array names the protocol behaviors this CLI implements, so you can feature-detect instead of comparing `claude_code_version` strings. It is an open set: ignore values you don't recognize, and check for the specific capability whose behavior you rely on. The field requires Claude Code v2.1.205 or later and is absent on earlier CLIs.

| Capability                   | Meaning                                                                                                                                                                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `interrupt_receipt_v1`       | [`interrupt()`](#query-object) resolves with an [`SDKControlInterruptResponse`](#sdkcontrolinterruptresponse) receipt listing the messages that were pending when the interrupt arrived                                                                                                           |
| `interrupt_cancel_queued_v1` | The `interrupt` control request honors `cancel_queued: true`, cancelling the messages the receipt would otherwise list under `still_queued` and listing them under `cancelled` instead. See [`SDKControlInterruptResponse`](#sdkcontrolinterruptresponse). Requires Claude Code v2.1.219 or later |

### `SDKPartialAssistantMessage`

Streaming partial message (only when `includePartialMessages` is true). The `parent_tool_use_id` field is always `null`: stream events are emitted for the main session only. For subagent attribution, use complete messages, which carry `parent_tool_use_id`, or enable [`forwardSubagentText`](#options) to receive subagent text and thinking as complete messages.

```typescript theme={null}
type SDKPartialAssistantMessage = {
  type: "stream_event";
  event: BetaRawMessageStreamEvent; // From Anthropic SDK
  parent_tool_use_id: string | null;
  uuid: UUID;
  session_id: string;
  ttft_ms?: number; // Time to first token in ms, present only on message_start events
  user_message_uuid?: string;
  user_message_uuids?: string[];
};
```

Claude Code sets `user_message_uuid` and `user_message_uuids` on the turn's first non-ping stream event, and again when the message the turn is answering changes, under the conditions in [`user_message_uuid`](#user_message_uuid).

### `SDKCompactBoundaryMessage`

Message indicating a conversation compaction boundary.

```typescript theme={null}
type SDKCompactBoundaryMessage = {
  type: "system";
  subtype: "compact_boundary";
  uuid: UUID;
  session_id: string;
  compact_metadata: {
    trigger: "manual" | "auto";
    pre_tokens: number;
  };
};
```

### `SDKInformationalMessage`

Generic text banner emitted by the loop. Carries non-error status lines, hook feedback such as a `UserPromptSubmit` hook's block reason, and command output. On Claude Code v2.1.227 or later, a hook's [`systemMessage`](https://code.claude.com/docs/en/hooks#json-output) can arrive as this message, with each line prefixed by the hook's name, such as `PostToolUse:Bash says:`. Whether a hook's `systemMessage` arrives as this message depends on the event. Each [event's section](https://code.claude.com/docs/en/hooks#hook-events) on the hooks page says how output surfaces. Render `content` as plaintext at the given `level`.

```typescript theme={null}
type SDKInformationalMessage = {
  type: "system";
  subtype: "informational";
  content: string;
  level: "info" | "notice" | "suggestion" | "warning";
  tool_use_id?: string;
  prevent_continuation?: boolean;
  uuid: UUID;
  session_id: string;
};
```

### `SDKWorkerShuttingDownMessage`

Emitted on graceful worker teardown so remote clients can show why the worker exited instead of waiting for heartbeat timeout. The `reason` is a short snake\_case string set by the host CLI, such as `"host_exit"` or `"remote_control_disabled"`. Act on this only when streaming live. A resumed session replays past instances of this message, so ignore them in that case.

```typescript theme={null}
type SDKWorkerShuttingDownMessage = {
  type: "system";
  subtype: "worker_shutting_down";
  reason: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKPluginInstallMessage`

Plugin installation progress event. Emitted when [`CLAUDE_CODE_SYNC_PLUGIN_INSTALL`](https://code.claude.com/docs/en/env-vars) is set, so your Agent SDK application can track marketplace plugin installation before the first turn. The `started` and `completed` statuses bracket the overall install. The `installed` and `failed` statuses report individual marketplaces and include `name`.

```typescript theme={null}
type SDKPluginInstallMessage = {
  type: "system";
  subtype: "plugin_install";
  status: "started" | "installed" | "failed" | "completed";
  name?: string;
  error?: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKPermissionDeniedMessage`

Stream event emitted when the permission system denies a tool call without an interactive prompt. Use it to render the denial in your UI as it happens, rather than only observing the `is_error` tool result that follows. Which denials it reports depends on how the run handles permission prompts:

* **With a [`canUseTool`](#canusetool) callback** and the default [`permissionPrompts: 'host'`](#options): permission prompts go to your callback, and this event reports the denials Claude Code decides on its own without calling it.
* **With neither**: a bare `-p` run, or `query()` that sets neither `canUseTool` nor `permissionPromptToolName`, denies any tool call that would have prompted, and this event reports those denials as well as the ones Claude Code decides on its own. Before v2.1.223, Claude Code didn't emit this event in runs without a callback.
* **With an MCP prompt tool**, set with `permissionPromptToolName` or the [`--permission-prompt-tool`](https://code.claude.com/docs/en/cli-reference#cli-flags) flag, and the default `permissionPrompts: 'host'`: Claude Code doesn't emit this event at all, not even for the rule denials it decides on its own.
* **With [`permissionPrompts: 'none'`](#options)**: Claude Code denies the calls that would have prompted, even when `canUseTool` or an MCP prompt tool is also set, and this event reports those denials as well as the ones Claude Code decides on its own. Requires Claude Code v2.1.259 or later.

In every configuration, this event skips any denial decided on the `PreToolUse` hook path, whether the hook denied the call itself or a deny rule overrode the hook's allow or ask decision. The event is also best-effort: occasionally Claude Code records a denial without emitting this event, so `permission_denials` on the [result message](#sdkresultmessage) is the authoritative record.

```typescript theme={null}
type SDKPermissionDeniedMessage = {
  type: "system";
  subtype: "permission_denied";
  tool_name: string;
  tool_use_id: string;
  agent_id?: string;
  decision_reason_type?: string;
  decision_reason?: string;
  message: string;
  uuid: UUID;
  session_id: string;
};
```

| Field                  | Type     | Description                                                                                                              |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `tool_name`            | `string` | Name of the tool that was denied                                                                                         |
| `tool_use_id`          | `string` | ID of the `tool_use` block this denial answers                                                                           |
| `agent_id`             | `string` | Subagent ID when the denied call originated inside a subagent. Mirrors the field on `can_use_tool` for host-side routing |
| `decision_reason_type` | `string` | Discriminator for the component that decided, such as `"rule"`, `"mode"`, `"classifier"`, or `"asyncAgent"`              |
| `decision_reason`      | `string` | Human-readable reason from the deciding component, when available                                                        |
| `message`              | `string` | Rejection message returned to the model in the `tool_result`                                                             |

### `SDKPermissionDenial`

Information about a denied tool use.

```typescript theme={null}
type SDKPermissionDenial = {
  tool_name: string;
  tool_use_id: string;
  tool_input: Record<string, unknown>;
};
```

### `SDKContextUsage`

Structured form of the `/context` report, carried as `context_usage` on the [`SDKAssistantMessage`](#sdkassistantmessage) that delivers a `/context` result. Agent SDK v0.3.232 and later export the type. Unlike [`SDKControlGetContextUsageResponse`](#sdkcontrolgetcontextusageresponse), it carries only the data needed to render the usage breakdown, without display fields such as `color` and `gridRows`.

```typescript theme={null}
type SDKContextUsage = {
  model: string;
  total_tokens: number;
  raw_max_tokens: number;
  percentage: number;
  over_limit?: {
    tokens_over: number;
    kind: "hard_limit" | "compaction_window";
  };
  categories: SDKContextUsageCategory[];
  mcp_tools: {
    name: string;
    server_name: string;
    tokens: number;
  }[];
  memory_files: {
    path: string;
    type: string;
    tokens: number;
  }[];
  agents: {
    agent_type: string;
    source: string;
    tokens: number;
  }[];
  skills?: {
    name: string;
    source: string;
    plugin_name?: string;
    tokens: number;
  }[];
};
```

The table lists what Claude Code puts in each field. The fields from `model` through `over_limit` describe the session as a whole, and the collection fields attribute tokens to individual items.

| Field            | Type                                                      | Description                                                                                                                                                                                                                                                                                       |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`          | `string`                                                  | The main loop's model Claude Code computed the usage for, not a subagent's                                                                                                                                                                                                                        |
| `total_tokens`   | `number`                                                  | Claude Code's estimate of the tokens in use. Not clamped to the window, so it can exceed `raw_max_tokens` when the session is over the limit                                                                                                                                                      |
| `raw_max_tokens` | `number`                                                  | The model's context window, or the lower [auto-compact window](https://code.claude.com/docs/en/model-config#context-window-and-auto-compaction) when one applies, such as one you set or the 200K boundary Claude Code applies to some models with a 1M-token window. Claude Code measures `total_tokens` against this window |
| `percentage`     | `number`                                                  | `total_tokens` as a rounded percentage of `raw_max_tokens`, so it can exceed 100 when the session is over the limit                                                                                                                                                                               |
| `over_limit`     | `object`                                                  | Present only when `total_tokens` exceeds `raw_max_tokens`. `tokens_over` is the amount over, and `kind` says how Claude Code resolved the window                                                                                                                                                  |
| `categories`     | [`SDKContextUsageCategory`](#sdkcontextusagecategory)`[]` | One entry per row of the usage-by-category breakdown                                                                                                                                                                                                                                              |
| `mcp_tools`      | `object[]`                                                | Tokens attributed to each MCP tool, with its wire name, such as `mcp__linear__create_issue`, and its `server_name`                                                                                                                                                                                |
| `memory_files`   | `object[]`                                                | Tokens attributed to each loaded memory file, with its `path` and a source label such as `Project` or `User` in `type`                                                                                                                                                                            |
| `agents`         | `object[]`                                                | Tokens attributed to each custom subagent definition, with a source identifier such as `projectSettings`, `userSettings`, or `plugin`. Built-in subagents aren't listed                                                                                                                           |
| `skills`         | `object[]`                                                | Tokens attributed to each skill in the skill listing, with a source identifier and, for plugin skills, the plugin's name in `plugin_name`. Absent when no skills contribute tokens                                                                                                                |

`over_limit.kind` records how Claude Code resolved the window, not whether the API accepts the next request:

* `hard_limit`: the window is what Claude Code believes to be the model's own limit, past which the API refuses requests
* `compaction_window`: the window is a compaction-policy window, which may or may not coincide with the model's limit

Claude Code evolves the type additively, adding new data as optional fields rather than reshaping existing ones. Read the fields you know and ignore any you don't recognize.

### `SDKContextUsageCategory`

One row of the `/context` usage-by-category breakdown.

```typescript theme={null}
type SDKContextUsageCategory = {
  name: string;
  tokens: number;
  kind: "used" | "free" | "buffer" | "deferred";
};
```

The table lists what Claude Code puts in each field of a row.

| Field    | Type     | Description                                                                                              |
| -------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `name`   | `string` | The row's display name as `/context` prints it, such as `Messages`. Classify rows by `kind`, not by name |
| `tokens` | `number` | The row's token count. Rows can carry zero tokens                                                        |
| `kind`   | `string` | What the row represents: `used`, `free`, `buffer`, or `deferred`                                         |

Each `kind` value says what the row's tokens are:

* `used`: content that occupies the context window
* `free`: the remaining window
* `buffer`: the compaction reserve
* `deferred`: tool schemas Claude Code holds out of the window and excludes from the usage calculation, listed for awareness

### `SDKMessageOrigin`

Provenance of a user-role message. This appears as `origin` on [`SDKUserMessage`](#sdkusermessage) and is forwarded onto the corresponding [`SDKResultMessage`](#sdkresultmessage) so you can tell what triggered a given turn.

```typescript theme={null}
type SDKMessageOrigin =
  | { kind: "human" }
  | { kind: "channel"; server: string }
  | {
      kind: "peer";
      from: string;
      fromMode?: "bypass" | "prompting";
      name?: string;
      fromSession?: string;
      senderTaskId?: string;
      body?: string;
      verifiedPeerPid?: number;
    }
  | {
      kind: "task-notification";
      subkind?: "scheduled-trigger" | "peer-send-message";
    }
  | { kind: "coordinator" }
  | { kind: "auto-continuation" }
  | { kind: "unclassified" };
```

| `kind`              | Meaning                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `human`             | Direct input from the end user. If your application forwards what the user typed as a user message, set its `origin` to `\{ kind: "human" \}` explicitly: Claude Code treats a user message with no `origin` as unattributed, and checks that require a human-typed prompt, such as the [`ultracode` workflow keyword](https://code.claude.com/docs/en/workflows#ask-for-a-workflow-in-your-prompt), don't accept it. Before v2.1.210, Claude Code treated an absent `origin` on a user message as human input. |
| `channel`           | Message arriving on a [channel](https://code.claude.com/docs/en/channels). `server` is the source MCP server name.                                                                                                                                                                                                                                                                                                                                                                                            |
| `peer`              | Message from another agent: an in-process [teammate](https://code.claude.com/docs/en/agent-teams) or a [cross-session peer](https://code.claude.com/docs/en/cross-session-messaging), another of your Claude Code sessions. See [Peer origin fields](#peer-origin-fields) for the per-field semantics and the trust model.                                                                                                                                                                                                                |
| `task-notification` | Synthetic turn injected for a delivery that arrives without a fresh user prompt, such as a finished background task; see [`SDKTaskNotificationMessage`](#sdktasknotificationmessage) for that arm. The optional `subkind` marks what raised the notification. See [Task-notification subkinds](#task-notification-subkinds).                                                                                                                                                      |
| `coordinator`       | Message from a team coordinator in an [agent team](https://code.claude.com/docs/en/agent-teams).                                                                                                                                                                                                                                                                                                                                                                                                              |
| `auto-continuation` | Synthetic turn injected when the session continues without fresh user input, such as a command result that triggers a follow-up prompt.                                                                                                                                                                                                                                                                                                                                           |
| `unclassified`      | Injected turn whose origin couldn't be determined. Requires Claude Code v2.1.223 or later. When Claude Code receives an [`SDKUserMessage`](#sdkusermessage) with `isSynthetic: true` and can't classify it as any other `kind`, it sets this kind as the message arrives and frames the turn to the model as a non-user source rather than treating it as human input. Your application shouldn't set this value.                                                                 |

### Task-notification subkinds

When Claude Code delivers a task notification into a session, it sets `subkind` on the notification's `origin` only if Anthropic servers verified where that notification came from. `subkind` requires Claude Code v2.1.213 or later, and it takes one of two values:

* `scheduled-trigger`: the notification is a [routine](https://code.claude.com/docs/en/routines)'s stored prompt, delivered because one of the routine's triggers fired: its schedule, its [API trigger](https://code.claude.com/docs/en/routines#add-an-api-trigger), its [GitHub trigger](https://code.claude.com/docs/en/routines#add-a-github-trigger), or **Run now**. Claude Code frames these to the model as the session's assigned task, with a different notice from the [notice that other task notifications carry](#sdktasknotificationmessage).
* `peer-send-message`: the notification is a message that another of your sessions sent with the server-side `send_message` tool that [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) sessions use to message each other, not the [cross-session `SendMessage` tool](https://code.claude.com/docs/en/cross-session-messaging), and Anthropic servers verified that both sessions belong to the same private group of sessions. Requires Claude Code v2.1.224 or later. A `send_message` delivery the servers didn't verify that way gets no subkind.

Every other task notification has no `subkind`. That includes [scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks) that fire on your own machine, [PR activity](https://code.claude.com/docs/en/claude-code-on-the-web#how-claude-responds-to-pr-activity) delivered into a session, and background events such as a finished task. Messages from the [cross-session `SendMessage` tool](https://code.claude.com/docs/en/cross-session-messaging) aren't task notifications at all: whether they come from a session on the same machine or through Anthropic servers from another machine, Claude Code gives them `kind: "peer"` and the [peer origin fields](#peer-origin-fields).

### Peer origin fields

A `peer` origin identifies which agent sent the message: an in-process [teammate](https://code.claude.com/docs/en/agent-teams) sending to `main` with `SendMessage`, or a [cross-session peer](https://code.claude.com/docs/en/cross-session-messaging), another of your Claude Code sessions. Cross-session peers require Claude Code v2.1.224 or later on macOS and Linux; see [cross-session messaging availability](https://code.claude.com/docs/en/cross-session-messaging#availability) for the native Windows requirement. A cross-session peer can run on the same machine, or on [another of your machines](https://code.claude.com/docs/en/cross-session-messaging#message-sessions-on-other-machines) or [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) when its message arrives through Remote Control. The two kinds of sender fill the fields differently:

* `from`: the teammate's name, or the sender address for a cross-session peer. For a [one-way cross-machine message](https://code.claude.com/docs/en/cross-session-messaging#message-sessions-on-other-machines), the sender has no reply address and `from` is `"unknown"`. The value is sender-authored; `verifiedPeerPid` is the verified identity.
* `fromMode`: the sending session's permission class, `bypass` or `prompting`, declared by a host that relays a peer message between your sessions, such as the [desktop app](https://code.claude.com/docs/en/desktop#work-across-sessions). Claude Code reads it in the receiving session when it applies the [inbound controls](https://code.claude.com/docs/en/cross-session-messaging#control-inbound-messages). Requires Agent SDK v0.3.234 or later.
* `senderTaskId`: the teammate's task ID. Absent for a cross-session peer.
* `name`: the sender's display name, normalized by Claude Code: it strips Unicode control, format, surrogate, and line or paragraph separator code points, then trims the result and caps it at 64 code points with an ellipsis. Requires Claude Code v2.1.205 or later.
* `body`: the decoded message body with the peer envelope stripped, byte-exact with what the model sees. Always present for a teammate message; for a cross-session peer, present only when the turn is exactly one peer envelope formed by Claude Code. Render `name` and `body` instead of re-parsing the message text. Requires Claude Code v2.1.205 or later.
* `fromSession`: the sender's host-openable session ID, set by the sender's host so your UI can link back to the sending session. Like `from`, it is sender-asserted: use it as a navigation target only, and don't treat it as proof of the sender's identity. Requires Claude Code v2.1.216 or later.
* `verifiedPeerPid`: the process ID of the process that connected to this session's cross-session messaging socket, verified by the kernel and read from the connection itself, never from the payload. Use it, not `from`, to identify the sender: `from` is forgeable by any same-user process. The field is absent when Claude Code can't verify it, such as on Windows or non-socket ingress, so an absent value means the sender is unverified. For relayed traffic it identifies the relay rather than the message's author, and process IDs are recyclable, so treat it as provenance rather than an authentication token. Requires Claude Code v2.1.216 or later.

## Hook Types

For a comprehensive guide on using hooks with examples and common patterns, see the [Hooks guide](https://code.claude.com/docs/en/agent-sdk/hooks).

### `HookEvent`

Available hook events.

```typescript theme={null}
type HookEvent =
  | "PreToolUse"
  | "PostToolUse"
  | "PostToolUseFailure"
  | "PostToolBatch"
  | "Notification"
  | "UserPromptSubmit"
  | "UserPromptExpansion"
  | "SessionStart"
  | "SessionEnd"
  | "Stop"
  | "StopFailure"
  | "SubagentStart"
  | "SubagentStop"
  | "PreCompact"
  | "PostCompact"
  | "PreModelSwitch"
  | "PostModelSwitch"
  | "PermissionRequest"
  | "PermissionDenied"
  | "Setup"
  | "TeammateIdle"
  | "TaskCreated"
  | "TaskCompleted"
  | "Elicitation"
  | "ElicitationResult"
  | "ConfigChange"
  | "DirectoryAdded"
  | "WorktreeCreate"
  | "WorktreeRemove"
  | "InstructionsLoaded"
  | "CwdChanged"
  | "FileChanged"
  | "MessageDisplay";
```

### `HookCallback`

Hook callback function type.

```typescript theme={null}
type HookCallback = (
  input: HookInput, // Union of all hook input types
  toolUseID: string | undefined,
  options: { signal: AbortSignal }
) => Promise<HookJSONOutput>;
```

### `HookCallbackMatcher`

Hook configuration with optional matcher.

```typescript theme={null}
interface HookCallbackMatcher {
  matcher?: string;
  hooks: HookCallback[];
  timeout?: number; // Timeout in seconds for all hooks in this matcher
}
```

### `HookInput`

Union type of all hook input types.

```typescript theme={null}
type HookInput =
  | PreToolUseHookInput
  | PostToolUseHookInput
  | PostToolUseFailureHookInput
  | PostToolBatchHookInput
  | PermissionDeniedHookInput
  | NotificationHookInput
  | UserPromptSubmitHookInput
  | UserPromptExpansionHookInput
  | SessionStartHookInput
  | SessionEndHookInput
  | StopHookInput
  | StopFailureHookInput
  | SubagentStartHookInput
  | SubagentStopHookInput
  | PreCompactHookInput
  | PostCompactHookInput
  | PreModelSwitchHookInput
  | PostModelSwitchHookInput
  | PermissionRequestHookInput
  | SetupHookInput
  | TeammateIdleHookInput
  | TaskCreatedHookInput
  | TaskCompletedHookInput
  | ElicitationHookInput
  | ElicitationResultHookInput
  | ConfigChangeHookInput
  | InstructionsLoadedHookInput
  | DirectoryAddedHookInput
  | WorktreeCreateHookInput
  | WorktreeRemoveHookInput
  | CwdChangedHookInput
  | FileChangedHookInput
  | MessageDisplayHookInput;
```

### `BaseHookInput`

Base interface that all hook input types extend.

```typescript theme={null}
type BaseHookInput = {
  session_id: string;
  transcript_path: string;
  cwd: string;
  prompt_id?: string;
  permission_mode?: string;
  effort?: { level: string };
  agent_id?: string;
  agent_type?: string;
};
```

The `prompt_id` field is a UUID identifying the user prompt currently being processed. It matches the [`prompt.id` attribute on OpenTelemetry events](https://code.claude.com/docs/en/monitoring-usage#event-correlation-attributes) and is absent until the first user input. Requires Claude Code v2.1.196 or later.
