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
pageSha256: "6a7de108e250c2e6addce9b5a1be2df8d2ff4bb51c690addf636ce086fd90025"
contentMode: "local-full"
zh: ""
---

#### `McpClaudeAIProxyServerConfig`

```typescript theme={null}
type McpClaudeAIProxyServerConfig = {
  type: "claudeai-proxy";
  url: string;
  id: string;
};
```

### `SdkPluginConfig`

Configuration for loading plugins in the SDK.

```typescript theme={null}
type SdkPluginConfig = {
  type: "local";
  path: string;
  skipMcpDiscovery?: boolean;
};
```

| Field              | Type      | Description                                                                                                                                                                                                   |
| :----------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`             | `'local'` | Must be `'local'` (only local plugins currently supported)                                                                                                                                                    |
| `path`             | `string`  | Absolute or relative path to the plugin directory                                                                                                                                                             |
| `skipMcpDiscovery` | `boolean` | When `true`, the SDK loads skills, hooks, agents, and commands from this plugin but does not read its `.mcp.json` or manifest `mcpServers`. Set this when your application owns the plugin's MCP connections. |

**Example:**

```typescript theme={null}
plugins: [
  { type: "local", path: "./my-plugin" },
  { type: "local", path: "/absolute/path/to/plugin" }
];
```

For complete information on creating and using plugins, see [Plugins](https://code.claude.com/docs/en/agent-sdk/plugins).

## Message Types

### `SDKMessage`

Union type of all possible messages returned by the query.

```typescript theme={null}
type SDKMessage =
  | SDKAssistantMessage
  | SDKUserMessage
  | SDKUserMessageReplay
  | SDKResultMessage
  | SDKSystemMessage
  | SDKPartialAssistantMessage
  | SDKCompactBoundaryMessage
  | SDKStatusMessage
  | SDKLocalCommandOutputMessage
  | SDKHookStartedMessage
  | SDKHookProgressMessage
  | SDKHookResponseMessage
  | SDKPluginInstallMessage
  | SDKToolProgressMessage
  | SDKAuthStatusMessage
  | SDKTaskNotificationMessage
  | SDKTaskStartedMessage
  | SDKTaskProgressMessage
  | SDKTaskUpdatedMessage
  | SDKBackgroundTasksChangedMessage
  | SDKThinkingTokensMessage
  | SDKSessionStateChangedMessage
  | SDKWorkerShuttingDownMessage
  | SDKCommandsChangedMessage
  | SDKNotificationMessage
  | SDKFilesPersistedEvent
  | SDKToolUseSummaryMessage
  | SDKMemoryRecallMessage
  | SDKRateLimitEvent
  | SDKElicitationCompleteMessage
  | SDKPermissionDeniedMessage
  | SDKPromptSuggestionMessage
  | SDKAPIRetryMessage
  | SDKMirrorErrorMessage
  | SDKInformationalMessage
  | SDKConversationResetMessage;
```

### `SDKAssistantMessage`

Assistant response message.

```typescript theme={null}
type SDKAssistantMessage = {
  type: "assistant";
  uuid: UUID;
  session_id: string;
  message: BetaMessage; // From Anthropic SDK
  parent_tool_use_id: string | null;
  error?: SDKAssistantMessageError;
  aborted?: true;
  timestamp?: string;
  context_usage?: SDKContextUsage;
  user_message_uuid?: string;
  user_message_uuids?: string[];
};
```

The `message` field is a [`BetaMessage`](https://platform.claude.com/docs/en/api/messages/create) from the Anthropic SDK. It includes fields like `id`, `content`, `model`, `stop_reason`, and `usage`.

`SDKAssistantMessageError` is one of: `'authentication_failed'`, `'oauth_org_not_allowed'`, `'account_on_hold'`, `'billing_error'`, `'rate_limit'`, `'overloaded'`, `'invalid_request'`, `'model_not_found'`, `'server_error'`, `'max_output_tokens'`, `'cloud_credential_error'`, or `'unknown'`. Four of these values mean more than their names say:

* `'model_not_found'`: the selected model doesn't exist or isn't available to your account or deployment
* `'overloaded'`: the API returned a 529 because the server is at capacity, as opposed to `'rate_limit'`, which is a 429 against your quota
* `'account_on_hold'`: [your account is on hold](https://code.claude.com/docs/en/errors#your-account-is-on-hold)
* `'cloud_credential_error'`: Claude Code couldn't obtain usable AWS or Google Cloud credentials on the machine it runs on, so no request reached the cloud provider. The usual cause is a cloud sign-in that expired or was never completed on that machine, though a briefly unreachable credential service reports the same value. See [Could not load AWS or Google Cloud credentials](https://code.claude.com/docs/en/errors#could-not-load-aws-or-google-cloud-credentials). Requires TypeScript Agent SDK v0.3.267 or later, which bundles Claude Code v2.1.267

`aborted` is `true` when an interrupt or abort truncated the assistant message before the stream completed: the message has no `stop_reason` and the content may end mid-word. The field is absent on normally completed messages. It requires Agent SDK v0.3.214 or later.

Claude Code sets `user_message_uuid` and `user_message_uuids` on the turn's first assistant message, under the conditions in [`user_message_uuid`](#user_message_uuid).

`timestamp` is the ISO 8601 time when the message's content finished generating on the process that produced it. The value comes from that machine's clock, so use it for display only and don't order messages by it. One API turn can produce several assistant messages that share a `message.id`, each with its own `timestamp`. When the field is absent, fall back to the time you received the message.

`context_usage` is a structured copy of the `/context` report, typed as [`SDKContextUsage`](#sdkcontextusage), and requires Agent SDK v0.3.232 or later. When you send `/context` as a prompt, Claude Code delivers the report as an assistant message whose `message.content` holds the markdown table, and attaches `context_usage` to that same message. Claude Code doesn't set the field on any other assistant message, and earlier versions deliver the `/context` table without it, so read the breakdown from the field when it's present and fall back to the markdown text when it isn't.

### `SDKUserMessage`

User input message.

```typescript theme={null}
type SDKUserMessage = {
  type: "user";
  uuid?: UUID;
  session_id?: string;
  message: MessageParam; // From Anthropic SDK
  parent_tool_use_id: string | null;
  isSynthetic?: boolean;
  shouldQuery?: boolean;
  tool_use_result?: unknown;
  origin?: SDKMessageOrigin;
};
```

Set `shouldQuery` to `false` to append the message to the transcript without triggering an assistant turn. The message is held and merged into the next user message that does trigger a turn. Use this to inject context, such as the output of a command you ran out of band, without spending a model call on it.

On a message that carries a `tool_result` block, `tool_use_result` is the tool's structured output object rather than the text sent to the model. Its shape depends on the tool named by the matching `tool_use` block, so the field is typed `unknown`; the built-in shapes are listed under [Tool Output Types](#tool-output-types).

For the `Agent` tool, `tool_use_result` is [`AgentOutput`](#agent-2). On a `completed` result, `content` holds the subagent's report without the agent ID and usage trailer that Claude Code appends to the `tool_result` text, so render from `tool_use_result` instead of parsing that text.

For an MCP tool whose result contains `resource_link` blocks, `tool_use_result` is an object with a `resourceLinks` array of [`SDKMcpResourceLink`](#sdkmcpresourcelink) entries. Claude receives each link as a line of text in the `tool_result` block, so read `resourceLinks` to render the files the server returned instead of parsing that text. Claude Code omits `resourceLinks` when the result has no links and on results from subagents, keeps at most 50 links per result, and stops adding links once the array reaches 64 KiB of serialized JSON. `resourceLinks` requires Agent SDK v0.3.257 or later.

### `SDKUserMessageReplay`

Replayed user message with required UUID.

```typescript theme={null}
type SDKUserMessageReplay = {
  type: "user";
  uuid: UUID;
  session_id: string;
  message: MessageParam;
  parent_tool_use_id: string | null;
  isSynthetic?: boolean;
  tool_use_result?: unknown;
  origin?: SDKMessageOrigin;
  isReplay: true;
};
```

A user turn injected from outside the session, one whose [`origin`](#sdkmessageorigin) kind is `peer` or `channel`, reaches the stream as a replay whether it was delivered during an active turn or started a new turn while the session was idle. Before v2.1.207, an injected turn delivered while the session was idle produced no message on the stream and only appeared when you re-read the transcript.

### `SDKResultMessage`

Final result message.

```typescript theme={null}
type SDKResultMessage =
  | {
      type: "result";
      subtype: "success";
      uuid: UUID;
      session_id: string;
      duration_ms: number;
      duration_api_ms: number;
      is_error: boolean;
      api_error_status?: number | null;
      num_turns: number;
      result: string;
      stop_reason: string | null;
      ttft_ms?: number;
      ttft_stream_ms?: number;
      user_message_uuid?: string;
      user_message_uuids?: string[];
      request_sent_wall_ms?: number;
      first_content_frame_ms?: number;
      first_stream_post_ms?: number;
      first_stream_post_ack_ms?: number;
      first_stream_post_wall_ms?: number;
      total_cost_usd: number;
      usage: NonNullableUsage;
      modelUsage: { [modelName: string]: ModelUsage };
      permission_denials: SDKPermissionDenial[];
      queued_turn_count?: number;
      structured_output?: unknown;
      deferred_tool_use?: { id: string; name: string; input: Record<string, unknown> };
      terminal_reason?: TerminalReason;
      fast_mode_state?: FastModeState;
      fast_mode_disabled_reason?: FastModeDisabledReason;
      origin?: SDKMessageOrigin;
    }
  | {
      type: "result";
      subtype:
        | "error_max_turns"
        | "error_during_execution"
        | "error_max_budget_usd"
        | "error_max_structured_output_retries";
      uuid: UUID;
      session_id: string;
      duration_ms: number;
      duration_api_ms: number;
      is_error: boolean;
      num_turns: number;
      stop_reason: string | null;
      total_cost_usd: number;
      usage: NonNullableUsage;
      modelUsage: { [modelName: string]: ModelUsage };
      permission_denials: SDKPermissionDenial[];
      queued_turn_count?: number;
      errors: string[];
      user_message_uuid?: string;
      user_message_uuids?: string[];
      terminal_reason?: TerminalReason;
      fast_mode_state?: FastModeState;
      fast_mode_disabled_reason?: FastModeDisabledReason;
      origin?: SDKMessageOrigin;
    };
```

Several fields on the result carry diagnostic detail beyond `subtype`:

* `api_error_status`: the HTTP status code of the API error that terminated the conversation. Absent or `null` when the turn ended without an API error.
* `ttft_ms`: time to first token in milliseconds, measured when the first complete assistant message arrives. Present on the success arm only.
* `ttft_stream_ms`: time in milliseconds until the first `message_start` stream event, when the response stream opens. Lower than `ttft_ms`; the gap between the two is time spent streaming the first message. Present on the success arm only.
* `user_message_uuid`: the `uuid` of the message you sent that this turn answered. See [`user_message_uuid`](#user_message_uuid) for which results carry it.
* `user_message_uuids`: the `uuid`s of every message you sent that Claude Code answered in this turn. See [`user_message_uuids`](#user_message_uuids).
* `request_sent_wall_ms`: epoch milliseconds at which Claude Code dispatched the API request, for joins against server-side timestamps. Present only together with [`user_message_uuid`](#user_message_uuid), on a success result with `is_error` false whose turn sent an API request.
* `first_content_frame_ms`: time in milliseconds until the first `content_block_start` or `content_block_delta` stream event, counting thinking blocks as content. Present on the success arm only, when `is_error` is false. Requires Agent SDK v0.3.260 or later.
* `first_stream_post_ms`, `first_stream_post_ack_ms`, `first_stream_post_wall_ms`: timings for uploading the turn's first stream event. Claude Code records them only in sessions it streams to claude.ai, such as [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web), and the results `query()` yields don't carry them. Requires Agent SDK v0.3.260 or later.
* `usage`: main agent loop only. Excludes subagent and auxiliary model calls, and is per-turn in streaming-input sessions. Prefer `modelUsage` for token/cost accounting.
* `modelUsage`: per-model totals for every model call made through the query pipeline during this `query()` call, including the main loop, subagents, and internal calls such as compaction and Workflow agents. Helper calls outside that pipeline, such as the permission classifier and token-counting requests, are excluded. In streaming-input sessions the totals are cumulative across turns, so read the latest result rather than summing across results. See [Track costs in streaming input mode](https://code.claude.com/docs/en/agent-sdk/cost-tracking#track-costs-in-streaming-input-mode) for resets and [Recover totals after a session crash](https://code.claude.com/docs/en/agent-sdk/cost-tracking#recover-totals-after-a-session-crash) for zeroed results.
* `total_cost_usd`: cumulative estimated cost in USD for this `query()` call, covering the same calls as `modelUsage` and reset at the same points. It is an estimate, not a billing statement. See [Track cost and usage](https://code.claude.com/docs/en/agent-sdk/cost-tracking) for accuracy caveats.
* `queued_turn_count`: the number of messages you sent with `origin: \{ kind: "human" \}` that are still waiting when Claude Code produced the result. See [`queued_turn_count`](#queued_turn_count) for what `0` and an absent field tell you.
* `terminal_reason`: why the loop ended. One of `"completed"`, `"max_turns"`, `"tool_deferred"`, `"aborted_streaming"`, `"aborted_tools"`, `"hook_stopped"`, `"stop_hook_prevented"`, `"background_requested"`, `"blocking_limit"`, `"rapid_refill_breaker"`, `"prompt_too_long"`, `"image_error"`, `"model_error"`, `"api_error"`, `"malformed_tool_use_exhausted"`, `"budget_exhausted"`, `"structured_output_retry_exhausted"`, `"tool_deferred_unavailable"`, or `"turn_setup_failed"`.
* `fast_mode_state`: one of `"on"`, `"off"`, or `"cooldown"`.
* `fast_mode_disabled_reason`: why [fast mode](https://code.claude.com/docs/en/fast-mode) isn't available right now. Absent when nothing blocks fast mode, though a request may still run at standard speed. During the cooldown after a fast mode rate limit, Claude Code reports `fast_mode_state: "cooldown"` with no reason code and re-enables fast mode when the cooldown expires. Requires Claude Code v2.1.219 or later.

Use the reason code to explain why fast mode is off in your own UI instead of re-deriving availability. Each code names the check that blocked fast mode:

| Reason code            | Meaning                                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `free`                 | The account doesn't have the paid subscription or usage credits fast mode requires                                                                          |
| `preference`           | The organization has disabled fast mode                                                                                                                     |
| `extra_usage_disabled` | Usage credits are turned off for the account                                                                                                                |
| `network_error`        | The [availability check](https://code.claude.com/docs/en/fast-mode#use-fast-mode-behind-proxies-and-llm-gateways) couldn't reach `api.anthropic.com`                                    |
| `unknown`              | Claude Code couldn't determine availability                                                                                                                 |
| `not_first_party`      | The session uses a provider other than the Anthropic API                                                                                                    |
| `disabled_by_env`      | [`CLAUDE_CODE_DISABLE_FAST_MODE`](https://code.claude.com/docs/en/env-vars) is set                                                                                                      |
| `model_not_allowed`    | The fast mode Opus model isn't in the organization's [`availableModels`](https://code.claude.com/docs/en/model-config#restrict-model-selection) allowlist                               |
| `sdk_opt_in_required`  | The session hasn't opted in to fast mode: pass `fastMode: true` in the [`settings`](#options) option or through [`applyFlagSettings()`](#applyflagsettings) |
| `pending`              | The availability check hasn't completed yet                                                                                                                 |

The same pair of fields appears on [`SDKSystemMessage`](#sdksystemmessage) and on the [`SDKControlInitializeResponse`](#sdkcontrolinitializeresponse), so you can read the fast mode state before the first turn.

The `origin` field forwards the [`SDKMessageOrigin`](#sdkmessageorigin) of the user message that triggered this result. When the SDK injects a synthetic follow-up turn, such as for a finished background task, the resulting `SDKResultMessage` carries `origin: \{ kind: "task-notification" \}`. Routines whose trigger fired and server-verified messages from your other sessions arrive with this kind too, each with the `subkind` described in [Task-notification subkinds](#task-notification-subkinds). Check `kind` to distinguish results that answer your prompt from injected follow-ups before routing or suppressing them.

The field is absent for results emitted before any user turn, such as startup errors.

When a `PreToolUse` hook returns `permissionDecision: "defer"`, the result has `stop_reason: "tool_deferred"` and `deferred_tool_use` carries the pending tool's `id`, `name`, and `input`. Read this field to surface the request in your own UI, then resume with the same `session_id` to continue. See [Defer a tool call for later](https://code.claude.com/docs/en/hooks#defer-a-tool-call-for-later) for the full round trip.
