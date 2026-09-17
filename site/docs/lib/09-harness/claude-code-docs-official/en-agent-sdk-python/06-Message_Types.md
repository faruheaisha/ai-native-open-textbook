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
sourceRel: "en/agent-sdk/python.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/python.md"
sourceSha256: "f49fb09963fda69499dc97a835a8db4970f3cd3070dff7f68ae6b644bd544987"
pageSha256: "0ba6b45472f2f51f133e7975d86bada4c320754775f3f4f9b300d13270f3ff66"
contentMode: "local-full"
zh: ""
---

## Message Types

### `Message`

Union type of all possible messages.

```python theme={null}
Message = (
    UserMessage
    | AssistantMessage
    | SystemMessage
    | ResultMessage
    | StreamEvent
    | RateLimitEvent
    | ConversationResetMessage
)
```

### `UserMessage`

User input message.

```python theme={null}
@dataclass
class UserMessage:
    content: str | list[ContentBlock]
    uuid: str | None = None
    parent_tool_use_id: str | None = None
    tool_use_result: dict[str, Any] | None = None
    origin: MessageOrigin | None = None
```

| Field                | Type                        | Description                                                                                                                                                                               |
| :------------------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`            | `str \| list[ContentBlock]` | Message content as text or content blocks                                                                                                                                                 |
| `uuid`               | `str \| None`               | Unique message identifier                                                                                                                                                                 |
| `parent_tool_use_id` | `str \| None`               | Tool use ID if this message is a tool result response                                                                                                                                     |
| `tool_use_result`    | `dict[str, Any] \| None`    | Tool result data if applicable                                                                                                                                                            |
| `origin`             | `MessageOrigin \| None`     | Provenance of this message, populated on injected turns such as task notifications and peer messages. `None` when the CLI didn't attribute it. Requires Python Agent SDK 0.2.137 or later |

The SDK passes `tool_use_result` through from the CLI unmodified. For a tool on an external MCP server whose result contains `resource_link` blocks, the dict has a `resourceLinks` key holding a list of dicts with the keys of the TypeScript [`SDKMcpResourceLink`](https://code.claude.com/docs/en/agent-sdk/typescript#sdkmcpresourcelink) type. Claude receives each link as a line of text in the tool result. To render the files the server returned, read `resourceLinks` instead of parsing that text. The `resourceLinks` key requires Python Agent SDK 0.2.150 or later and Claude Code v2.1.257 or later; the CLI bundled with that SDK version satisfies the Claude Code requirement.

The CLI omits the key when the result has no links and on results from subagents. The CLI keeps at most 50 links per result and stops adding links once the list reaches 64 KiB of serialized JSON. A tool you define in-process with [`tool()`](#tool) never produces the key, because the SDK flattens its `resource_link` blocks to text before the CLI sees the result.

### `AssistantMessage`

Assistant response message with content blocks.

```python theme={null}
@dataclass
class AssistantMessage:
    content: list[ContentBlock]
    model: str
    parent_tool_use_id: str | None = None
    error: AssistantMessageError | None = None
    usage: dict[str, Any] | None = None
    message_id: str | None = None
    stop_reason: str | None = None
    session_id: str | None = None
    uuid: str | None = None
```

| Field                | Type                                                         | Description                                                                    |
| :------------------- | :----------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `content`            | `list[ContentBlock]`                                         | List of content blocks in the response                                         |
| `model`              | `str`                                                        | Model that generated the response                                              |
| `parent_tool_use_id` | `str \| None`                                                | Tool use ID if this is a nested response                                       |
| `error`              | [`AssistantMessageError`](#assistantmessageerror) ` \| None` | Error type if the response encountered an error                                |
| `usage`              | `dict[str, Any] \| None`                                     | Per-message token usage (same keys as [`ResultMessage.usage`](#resultmessage)) |
| `message_id`         | `str \| None`                                                | API message ID. Multiple messages from one turn share the same ID              |
| `stop_reason`        | `str \| None`                                                | Stop reason from the API (e.g. `end_turn`, `tool_use`)                         |
| `session_id`         | `str \| None`                                                | ID of the session this message belongs to                                      |
| `uuid`               | `str \| None`                                                | Unique message identifier within the session transcript                        |

### `AssistantMessageError`

Possible error types for assistant messages.

```python theme={null}
AssistantMessageError = Literal[
    "authentication_failed",
    "billing_error",
    "rate_limit",
    "invalid_request",
    "server_error",
    "unknown",
]
```

The underlying CLI process can emit error types this Literal doesn't list, such as `max_output_tokens`. The SDK passes the value through unmodified, so treat strings outside this list the way you treat `unknown`. The TypeScript [`SDKAssistantMessageError`](https://code.claude.com/docs/en/agent-sdk/typescript#sdkassistantmessage) type lists the full set of values the CLI can emit.

### `SystemMessage`

System message with metadata.

```python theme={null}
@dataclass
class SystemMessage:
    subtype: str
    data: dict[str, Any]
```

### `ResultMessage`

Final result message with cost and usage information.

```python theme={null}
@dataclass
class ResultMessage:
    subtype: str
    duration_ms: int
    duration_api_ms: int
    is_error: bool
    num_turns: int
    session_id: str
    stop_reason: str | None = None
    total_cost_usd: float | None = None
    usage: dict[str, Any] | None = None
    result: str | None = None
    structured_output: Any = None
    model_usage: dict[str, ModelUsage] | None = None
    permission_denials: list[Any] | None = None
    deferred_tool_use: DeferredToolUse | None = None
    errors: list[str] | None = None
    api_error_status: int | None = None
    uuid: str | None = None
    terminal_reason: str | None = None
    origin: MessageOrigin | None = None
```

The `subtype` field determines which other fields are populated. It is one of `"success"`, `"error_during_execution"`, `"error_max_turns"`, `"error_max_budget_usd"`, or `"error_max_structured_output_retries"`. The Python dataclass flattens all variants into one shape, so fields that don't apply to the returned subtype are `None`.

Several fields carry diagnostic detail about how the conversation ended:

* `is_error`: `True` when the conversation ended in an error state. Always `True` on the `error_*` subtypes. On `subtype="success"` it is `True` when the final model request failed, meaning the agent loop completed but the last API call returned an error.
* `api_error_status`: the HTTP status code of the terminating API error. `None` when the turn ended without one. Populated only on `subtype="success"`.
* `result`: text of the final assistant message on `subtype="success"`, or `None` on the `error_*` subtypes. When `subtype="success"` and `is_error=True`, this holds the API error string if one is available but can be empty, so check `api_error_status` and the preceding `AssistantMessage` content for detail.
* `errors`: loop-level error strings such as the max-turns message. Populated only on the `error_*` subtypes.
* `terminal_reason`: why the query loop ended, such as `"completed"`, `"max_turns"`, `"api_error"`, `"aborted_streaming"`, or `"aborted_tools"`. A value of `"aborted_streaming"` or `"aborted_tools"` means the turn was aborted before completing. Common causes are [`interrupt()`](#claudesdkclient) and a permission callback returning [`PermissionResultDeny`](#permissionresultdeny) with `interrupt=True`. `None` on CLI versions that predate the field, on results from local commands such as `/voice` or `/usage`, which bypass the query loop, or on synthesized error results emitted when the session fails fatally. Mirrors the TypeScript SDK's [`SDKResultMessage.terminal_reason`](https://code.claude.com/docs/en/agent-sdk/typescript#sdkresultmessage), which lists the full set of values.
* `origin`: origin of the user message that triggered this turn. In [streaming input mode](https://code.claude.com/docs/en/agent-sdk/streaming-vs-single-mode), check this to tell the result of your own prompt, where `origin` is `None` or `\{"kind": "human"\}`, from the result of an injected turn such as a background-task notification. Requires Python Agent SDK 0.2.137 or later.

The `usage` dict covers the main agent loop only and excludes subagent and other nested or auxiliary model calls. In [streaming input mode](https://code.claude.com/docs/en/agent-sdk/streaming-vs-single-mode), the values are per-turn. Prefer `model_usage` for token and cost accounting. The `usage` dict contains the following keys when present:

| Key                           | Type  | Description                                                                                                                                                                                   |
| ----------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input_tokens`                | `int` | Input tokens consumed by the top-level agent loop. [Subagent tokens aren't included](https://code.claude.com/docs/en/agent-sdk/cost-tracking#get-the-total-cost-of-a-query); use `model_usage` for whole-tree accounting. |
| `output_tokens`               | `int` | Output tokens generated by the top-level agent loop. Subagent tokens aren't included.                                                                                                         |
| `cache_creation_input_tokens` | `int` | Tokens used to create new cache entries.                                                                                                                                                      |
| `cache_read_input_tokens`     | `int` | Tokens read from existing cache entries.                                                                                                                                                      |

The `model_usage` dict maps model names to per-model usage. It covers every model call made through the query pipeline: the main loop, subagents, and internal calls such as compaction and Workflow agents. Helper calls outside that pipeline, such as the permission classifier and token-counting requests, are excluded from `model_usage`. Treat `model_usage` as an estimate, not a billing statement.

In [streaming input mode](https://code.claude.com/docs/en/agent-sdk/streaming-vs-single-mode), `model_usage` and `total_cost_usd` are cumulative across turns, so read the latest result rather than summing across results. See [Track costs in streaming input mode](https://code.claude.com/docs/en/agent-sdk/cost-tracking#track-costs-in-streaming-input-mode) for resets and [Recover totals after a session crash](https://code.claude.com/docs/en/agent-sdk/cost-tracking#recover-totals-after-a-session-crash) for zeroed results.

Each value in `model_usage` is a `ModelUsage` TypedDict, imported via `from claude_agent_sdk.types import ModelUsage`. Its keys use camelCase because the SDK passes the value through unmodified from the underlying CLI process, matching the TypeScript [`ModelUsage`](https://code.claude.com/docs/en/agent-sdk/typescript#modelusage) type:

| Key                        | Type    | Description                                                                                                                                                                                                                                                                           |
| -------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inputTokens`              | `int`   | Input tokens for this model.                                                                                                                                                                                                                                                          |
| `outputTokens`             | `int`   | Output tokens for this model.                                                                                                                                                                                                                                                         |
| `cacheReadInputTokens`     | `int`   | Cache read tokens for this model.                                                                                                                                                                                                                                                     |
| `cacheCreationInputTokens` | `int`   | Cache creation tokens for this model.                                                                                                                                                                                                                                                 |
| `webSearchRequests`        | `int`   | Web search requests made by this model.                                                                                                                                                                                                                                               |
| `thinkingTokens`           | `int`   | Thinking tokens generated by this model, already counted in `outputTokens`. Absent until a turn runs on a Claude Code version that records it, and not declared on the TypedDict, so read it with `.get()`. Requires Python Agent SDK 0.2.150 or later, whose bundled CLI records it. |
| `costUSD`                  | `float` | Estimated cost in USD for this model, computed client-side. See [Track cost and usage](https://code.claude.com/docs/en/agent-sdk/cost-tracking) for billing caveats.                                                                                                                                              |
| `contextWindow`            | `int`   | Context window size for this model.                                                                                                                                                                                                                                                   |
| `maxOutputTokens`          | `int`   | Maximum output token limit for this model.                                                                                                                                                                                                                                            |
| `canonicalModel`           | `str`   | Canonical model ID used for the pricing lookup. May differ from the raw model string the entry is keyed by, such as a provider-specific ID or alias. Not always present.                                                                                                              |
| `provider`                 | `str`   | API provider that served this model, such as `firstParty`, `bedrock`, `vertex`, `foundry`, `anthropicAws`, `mantle`, or `gateway`. Not always present.                                                                                                                                |

### `StreamEvent`

Stream event for partial message updates during streaming. Only received when `include_partial_messages=True` in `ClaudeAgentOptions`. Import via `from claude_agent_sdk.types import StreamEvent`.

```python theme={null}
@dataclass
class StreamEvent:
    uuid: str
    session_id: str
    event: dict[str, Any]  # The raw Claude API stream event
    parent_tool_use_id: str | None = None
```

| Field                | Type             | Description                                                                                                                                                         |
| :------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `uuid`               | `str`            | Unique identifier for this event                                                                                                                                    |
| `session_id`         | `str`            | Session identifier                                                                                                                                                  |
| `event`              | `dict[str, Any]` | The raw Claude API stream event data                                                                                                                                |
| `parent_tool_use_id` | `str \| None`    | Always `None`. Stream events are emitted for the main session only. For subagent attribution, use complete messages such as [`AssistantMessage`](#assistantmessage) |

### `RateLimitEvent`

Emitted when rate limit status changes (for example, from `"allowed"` to `"allowed_warning"`). Use this to warn users before they hit a hard limit, or to back off when status is `"rejected"`.

```python theme={null}
@dataclass
class RateLimitEvent:
    rate_limit_info: RateLimitInfo
    uuid: str
    session_id: str
```

| Field             | Type                              | Description              |
| :---------------- | :-------------------------------- | :----------------------- |
| `rate_limit_info` | [`RateLimitInfo`](#ratelimitinfo) | Current rate limit state |
| `uuid`            | `str`                             | Unique event identifier  |
| `session_id`      | `str`                             | Session identifier       |

### `RateLimitInfo`

Rate limit state carried by [`RateLimitEvent`](#ratelimitevent).

```python theme={null}
RateLimitStatus = Literal["allowed", "allowed_warning", "rejected"]
RateLimitType = Literal[
    "five_hour", "seven_day", "seven_day_opus", "seven_day_sonnet", "overage"
]

@dataclass
class RateLimitInfo:
    status: RateLimitStatus
    resets_at: int | None = None
    rate_limit_type: RateLimitType | None = None
    utilization: float | None = None
    overage_status: RateLimitStatus | None = None
    overage_resets_at: int | None = None
    overage_disabled_reason: str | None = None
    raw: dict[str, Any] = field(default_factory=dict)
```

| Field                     | Type                      | Description                                                                                           |
| :------------------------ | :------------------------ | :---------------------------------------------------------------------------------------------------- |
| `status`                  | `RateLimitStatus`         | Current status. `"allowed_warning"` means approaching the limit; `"rejected"` means the limit was hit |
| `resets_at`               | `int \| None`             | Unix timestamp when the rate limit window resets                                                      |
| `rate_limit_type`         | `RateLimitType \| None`   | Which rate limit window applies                                                                       |
| `utilization`             | `float \| None`           | Fraction of the rate limit consumed (0.0 to 1.0)                                                      |
| `overage_status`          | `RateLimitStatus \| None` | Status of pay-as-you-go overage usage, if applicable                                                  |
| `overage_resets_at`       | `int \| None`             | Unix timestamp when the overage window resets                                                         |
| `overage_disabled_reason` | `str \| None`             | Why overage is unavailable, if status is `"rejected"`                                                 |
| `raw`                     | `dict[str, Any]`          | Full raw dict from the CLI, including fields not modeled above                                        |

### `ConversationResetMessage`

Emitted when the conversation is replaced without ending the connection, such as after `/clear`. See [Track costs in streaming input mode](https://code.claude.com/docs/en/agent-sdk/cost-tracking#track-costs-in-streaming-input-mode) for how a reset affects the running totals on later `ResultMessage` objects. Requires Python Agent SDK 0.2.137 or later.

```python theme={null}
@dataclass
class ConversationResetMessage:
    new_conversation_id: str
    uuid: str
    session_id: str
```

| Field                 | Type  | Description                                                                                                                |
| :-------------------- | :---- | :------------------------------------------------------------------------------------------------------------------------- |
| `new_conversation_id` | `str` | Opaque identifier for the fresh conversation. Not the `session_id` of subsequent messages; read that from the next message |
| `uuid`                | `str` | Unique message identifier                                                                                                  |
| `session_id`          | `str` | ID of the session that was reset. Messages after the reset carry a new `session_id`                                        |

### `TaskStartedMessage`

Emitted when a background task starts. A background task is anything tracked outside the main turn: a backgrounded Bash command, a [Monitor](#monitor) watch, a subagent spawned via the Agent tool, or a remote agent. The `task_type` field tells you which. This naming is unrelated to the `Task`-to-`Agent` tool rename.

```python theme={null}
@dataclass
class TaskStartedMessage(SystemMessage):
    task_id: str
    description: str
    uuid: str
    session_id: str
    tool_use_id: str | None = None
    task_type: str | None = None
```

| Field         | Type          | Description                                                                                                                 |
| :------------ | :------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `task_id`     | `str`         | Unique identifier for the task                                                                                              |
| `description` | `str`         | Description of the task                                                                                                     |
| `uuid`        | `str`         | Unique message identifier                                                                                                   |
| `session_id`  | `str`         | Session identifier                                                                                                          |
| `tool_use_id` | `str \| None` | Associated tool use ID                                                                                                      |
| `task_type`   | `str \| None` | Which kind of background task: `"local_bash"` for background Bash and Monitor watches, `"local_agent"`, or `"remote_agent"` |

### `TaskUsage`

Token and timing data for a background task.

```python theme={null}
class TaskUsage(TypedDict):
    total_tokens: int
    tool_uses: int
    duration_ms: int
```

### `TaskProgressMessage`

Emitted periodically with progress updates for a running background task.

```python theme={null}
@dataclass
class TaskProgressMessage(SystemMessage):
    task_id: str
    description: str
    usage: TaskUsage
    uuid: str
    session_id: str
    tool_use_id: str | None = None
    last_tool_name: str | None = None
```

| Field            | Type          | Description                         |
| :--------------- | :------------ | :---------------------------------- |
| `task_id`        | `str`         | Unique identifier for the task      |
| `description`    | `str`         | Current status description          |
| `usage`          | `TaskUsage`   | Token usage for this task so far    |
| `uuid`           | `str`         | Unique message identifier           |
| `session_id`     | `str`         | Session identifier                  |
| `tool_use_id`    | `str \| None` | Associated tool use ID              |
| `last_tool_name` | `str \| None` | Name of the last tool the task used |

### `TaskNotificationMessage`

Emitted when a background task completes, fails, or is stopped. Background tasks include `run_in_background` Bash commands, Monitor watches, and background subagents.

```python theme={null}
@dataclass
class TaskNotificationMessage(SystemMessage):
    task_id: str
    status: TaskNotificationStatus  # "completed" | "failed" | "stopped"
    output_file: str
    summary: str
    uuid: str
    session_id: str
    tool_use_id: str | None = None
    usage: TaskUsage | None = None
```

| Field         | Type                     | Description                                      |
| :------------ | :----------------------- | :----------------------------------------------- |
| `task_id`     | `str`                    | Unique identifier for the task                   |
| `status`      | `TaskNotificationStatus` | One of `"completed"`, `"failed"`, or `"stopped"` |
| `output_file` | `str`                    | Path to the task output file                     |
| `summary`     | `str`                    | Summary of the task result                       |
| `uuid`        | `str`                    | Unique message identifier                        |
| `session_id`  | `str`                    | Session identifier                               |
| `tool_use_id` | `str \| None`            | Associated tool use ID                           |
| `usage`       | `TaskUsage \| None`      | Final token usage for the task                   |

When the CLI [moves a long MCP tool call to the background](https://code.claude.com/docs/en/mcp#automatic-backgrounding-of-long-tool-calls), the tool result for that call holds only a placeholder and the call's real result arrives in this message. On a `"completed"` notification for such a call, the CLI adds a `resource_links` key listing the files the tool returned by reference, with the same entries and limits as the `resourceLinks` key on [`UserMessage.tool_use_result`](#usermessage). The `resource_links` key requires Python Agent SDK 0.2.150 or later and Claude Code v2.1.257 or later; the CLI bundled with that SDK version satisfies the Claude Code requirement.

The dataclass has no field for `resource_links`. Read it from the `data` dict the message inherits from [`SystemMessage`](#systemmessage): `message.data.get("resource_links")`. Match the notification to the call with `tool_use_id`. The CLI omits the key when the result had no links and on notifications for tasks that aren't MCP tool calls.
