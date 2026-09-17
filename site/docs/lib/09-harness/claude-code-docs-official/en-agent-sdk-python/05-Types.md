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
pageSha256: "b57e808c5bb0d2fca95e9f00a3f509e9175109bf8422eb1f2f298a63a4c237a9"
contentMode: "local-full"
zh: ""
---

## Types

  **`@dataclass` vs `TypedDict`:** This SDK uses two kinds of types. Classes decorated with `@dataclass` (such as `ResultMessage`, `AgentDefinition`, `TextBlock`) are object instances at runtime and support attribute access: `msg.result`. Classes defined with `TypedDict` (such as `ThinkingConfigEnabled`, `McpStdioServerConfig`, `SyncHookJSONOutput`) are **plain dicts at runtime** and require key access: `config["budget_tokens"]`, not `config.budget_tokens`. The `ClassName(field=value)` call syntax works for both, but only dataclasses produce objects with attributes.

### `SdkMcpTool`

Definition for an SDK MCP tool created with the `@tool` decorator.

```python theme={null}
@dataclass
class SdkMcpTool(Generic[T]):
    name: str
    description: str
    input_schema: type[T] | dict[str, Any]
    handler: Callable[[T], Awaitable[dict[str, Any]]]
    annotations: ToolAnnotations | None = None
```

| Property       | Type                                            | Description                                                                                                      |
| :------------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `name`         | `str`                                           | Unique identifier for the tool                                                                                   |
| `description`  | `str`                                           | Human-readable description                                                                                       |
| `input_schema` | `type[T] \| dict[str, Any]`                     | Schema for input validation                                                                                      |
| `handler`      | `Callable[[T], Awaitable[dict[str, Any]]]`      | Async function that handles tool execution                                                                       |
| `annotations`  | [`ToolAnnotations`](#toolannotations)` \| None` | Optional tool annotations (for example `readOnlyHint`, `destructiveHint`, `openWorldHint`, `maxResultSizeChars`) |

### `Transport`

Abstract base class for custom transport implementations. Use this to communicate with the Claude process over a custom channel (for example, a remote connection instead of a local subprocess).

  This is a low-level internal API. The interface may change in future releases. Custom implementations must be updated to match any interface changes.

```python theme={null}
from abc import ABC, abstractmethod
from collections.abc import AsyncIterator
from typing import Any

class Transport(ABC):
    @abstractmethod
    async def connect(self) -> None: ...

    @abstractmethod
    async def write(self, data: str) -> None: ...

    @abstractmethod
    def read_messages(self) -> AsyncIterator[dict[str, Any]]: ...

    @abstractmethod
    async def close(self) -> None: ...

    @abstractmethod
    def is_ready(self) -> bool: ...

    @abstractmethod
    async def end_input(self) -> None: ...
```

| Method            | Description                                                                 |
| :---------------- | :-------------------------------------------------------------------------- |
| `connect()`       | Connect the transport and prepare for communication                         |
| `write(data)`     | Write raw data (JSON + newline) to the transport                            |
| `read_messages()` | Async iterator that yields parsed JSON messages                             |
| `close()`         | Close the connection and clean up resources                                 |
| `is_ready()`      | Returns `True` if the transport can send and receive                        |
| `end_input()`     | Close the input stream (for example, close stdin for subprocess transports) |

Import: `from claude_agent_sdk import Transport`

### `ClaudeAgentOptions`

Configuration dataclass for Claude Code queries.

```python theme={null}
@dataclass
class ClaudeAgentOptions:
    tools: list[str] | ToolsPreset | None = None
    allowed_tools: list[str] = field(default_factory=list)
    system_prompt: str | SystemPromptPreset | SystemPromptFile | None = None
    mcp_servers: dict[str, McpServerConfig] | str | Path = field(default_factory=dict)
    strict_mcp_config: bool = False
    permission_mode: PermissionMode | None = None
    continue_conversation: bool = False
    resume: str | None = None
    session_id: str | None = None
    max_turns: int | None = None
    max_budget_usd: float | None = None
    disallowed_tools: list[str] = field(default_factory=list)
    model: str | None = None
    fallback_model: str | None = None
    betas: list[SdkBeta] = field(default_factory=list)
    output_format: dict[str, Any] | None = None
    permission_prompt_tool_name: str | None = None
    cwd: str | Path | None = None
    cli_path: str | Path | None = None
    settings: str | None = None
    add_dirs: list[str | Path] = field(default_factory=list)
    env: dict[str, str] = field(default_factory=dict)
    extra_args: dict[str, str | None] = field(default_factory=dict)
    max_buffer_size: int | None = None
    debug_stderr: Any = sys.stderr  # Deprecated
    stderr: Callable[[str], None] | None = None
    can_use_tool: CanUseTool | None = None
    hooks: dict[HookEvent, list[HookMatcher]] | None = None
    user: str | None = None
    include_partial_messages: bool = False
    include_hook_events: bool = False
    forward_subagent_text: bool = False
    fork_session: bool = False
    resume_session_at: str | None = None
    resume_drops_turn: str | None = None
    agents: dict[str, AgentDefinition] | None = None
    setting_sources: list[SettingSource] | None = None
    skills: list[str] | Literal["all"] | None = None
    sandbox: SandboxSettings | None = None
    plugins: list[SdkPluginConfig] = field(default_factory=list)
    max_thinking_tokens: int | None = None  # Deprecated: use thinking instead
    thinking: ThinkingConfig | None = None
    effort: EffortLevel | None = None
    enable_file_checkpointing: bool = False
    session_store: SessionStore | None = None
    session_store_flush: SessionStoreFlushMode = "batched"
    load_timeout_ms: int = 60_000
    task_budget: TaskBudget | None = None
```

| Property                      | Type                                                                                  | Default                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------------------- | :------------------------------------------------------------------------------------ | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tools`                       | `list[str] \| ToolsPreset \| None`                                                    | `None`                             | Tools configuration. Use `\{"type": "preset", "preset": "claude_code"\}` for Claude Code's default tools                                                                                                                                                                                                                                                                                                                                                                      |
| `allowed_tools`               | `list[str]`                                                                           | `[]`                               | Tools to auto-approve without prompting. This does not restrict Claude to only these tools. If you name one of the [task-tracking tools](https://code.claude.com/docs/en/agent-sdk/todo-tracking#model-availability) here, Claude Code also opts the session in. Other unlisted tools fall through to `permission_mode` and `can_use_tool`. Use `disallowed_tools` to block tools. See [Permissions](https://code.claude.com/docs/en/agent-sdk/permissions#allow-and-deny-rules)                                                    |
| `system_prompt`               | `str \| SystemPromptPreset \| SystemPromptFile \| None`                               | `None`                             | System prompt configuration. Pass a string for a custom prompt, `\{"type": "preset", "preset": "claude_code"\}` for Claude Code's system prompt with optional `"append"`, or `\{"type": "file", "path": "..."\}` to load a large prompt from disk. See [`SystemPromptPreset`](#systempromptpreset) and [`SystemPromptFile`](#systempromptfile)                                                                                                                                  |
| `mcp_servers`                 | `dict[str, McpServerConfig] \| str \| Path`                                           | `\{\}`                               | MCP server configurations or path to config file                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `strict_mcp_config`           | `bool`                                                                                | `False`                            | When `True`, use only the servers passed in `mcp_servers` and ignore project `.mcp.json`, user settings, plugin-provided MCP servers, and [claude.ai connectors](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai). Maps to the CLI `--strict-mcp-config` flag                                                                                                                                                                                                                        |
| `permission_mode`             | `PermissionMode \| None`                                                              | `None`                             | Permission mode for tool usage                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `continue_conversation`       | `bool`                                                                                | `False`                            | Continue the most recent conversation                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `resume`                      | `str \| None`                                                                         | `None`                             | Session ID to resume                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `session_id`                  | `str \| None`                                                                         | `None`                             | Use a specific session ID instead of an auto-generated one. Must be a valid UUID. Can't be combined with `continue_conversation` or `resume` unless `fork_session` is also set                                                                                                                                                                                                                                                                                              |
| `max_turns`                   | `int \| None`                                                                         | `None`                             | Maximum agentic turns (tool-use round trips)                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `max_budget_usd`              | `float \| None`                                                                       | `None`                             | Stop the query when the client-side cost estimate reaches this USD value. Compared against the same estimate as `total_cost_usd`; see [Track cost and usage](https://code.claude.com/docs/en/agent-sdk/cost-tracking) for accuracy caveats                                                                                                                                                                                                                                                              |
| `disallowed_tools`            | `list[str]`                                                                           | `[]`                               | Tools to deny. A bare name such as `"Bash"` removes the tool from Claude's context. A scoped rule such as `"Bash(rm *)"` leaves the tool available and denies matching calls in every permission mode, including `bypassPermissions`, for the command [as written](https://code.claude.com/docs/en/permissions#bash-rule-limits). See [Permissions](https://code.claude.com/docs/en/agent-sdk/permissions#allow-and-deny-rules)                                                                                                     |
| `enable_file_checkpointing`   | `bool`                                                                                | `False`                            | Enable file change tracking for rewinding. See [File checkpointing](https://code.claude.com/docs/en/agent-sdk/file-checkpointing)                                                                                                                                                                                                                                                                                                                                                                       |
| `model`                       | `str \| None`                                                                         | `None`                             | Claude model alias or full model name. See [accepted values and provider-specific IDs](https://code.claude.com/docs/en/model-config#available-models)                                                                                                                                                                                                                                                                                                                                                   |
| `fallback_model`              | `str \| None`                                                                         | `None`                             | Fallback model to use if the primary model fails                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `betas`                       | `list[SdkBeta]`                                                                       | `[]`                               | Beta features to enable. See [`SdkBeta`](#sdkbeta) for available options                                                                                                                                                                                                                                                                                                                                                                                                    |
| `output_format`               | `dict[str, Any] \| None`                                                              | `None`                             | Output format for structured responses (e.g., <code v-pre>\{"type": "json_schema", "schema": \{...}}</code>). See [Structured outputs](https://code.claude.com/docs/en/agent-sdk/structured-outputs) for details                                                                                                                                                                                                                                                                                                           |
| `permission_prompt_tool_name` | `str \| None`                                                                         | `None`                             | MCP tool name for permission prompts                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `cwd`                         | `str \| Path \| None`                                                                 | `None`                             | Current working directory                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `cli_path`                    | `str \| Path \| None`                                                                 | `None`                             | Custom path to the Claude Code CLI executable                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `settings`                    | `str \| None`                                                                         | `None`                             | Path to settings file                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `add_dirs`                    | `list[str \| Path]`                                                                   | `[]`                               | Additional directories Claude can access. The SDK passes each entry to Claude Code as `--add-dir`, so with the `project` setting source Claude Code also [loads the directory's skills, commands, and subagents](https://code.claude.com/docs/en/permissions#additional-directories-grant-file-access-not-configuration)                                                                                                                                                                                |
| `env`                         | `dict[str, str]`                                                                      | `\{\}`                               | Environment variables merged on top of the inherited process environment. See [Environment variables](https://code.claude.com/docs/en/env-vars) for variables the underlying CLI reads, and [Handle slow or stalled API responses](#handle-slow-or-stalled-api-responses) for timeout-related variables                                                                                                                                                                                                 |
| `extra_args`                  | `dict[str, str \| None]`                                                              | `\{\}`                               | Additional CLI arguments to pass directly to the CLI                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `max_buffer_size`             | `int \| None`                                                                         | `None`                             | Maximum bytes when buffering CLI stdout                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `debug_stderr`                | `Any`                                                                                 | `sys.stderr`                       | *Deprecated* - File-like object for debug output. Use `stderr` callback instead                                                                                                                                                                                                                                                                                                                                                                                             |
| `stderr`                      | `Callable[[str], None] \| None`                                                       | `None`                             | Callback function for stderr output from CLI                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `can_use_tool`                | [`CanUseTool`](#canusetool) ` \| None`                                                | `None`                             | Tool permission callback, invoked only when the [permission flow](https://code.claude.com/docs/en/agent-sdk/permissions#how-permissions-are-evaluated) falls through to a prompt. Not invoked for calls auto-approved by `allowed_tools`, allow rules, or `permission_mode`. An allow rule doesn't pre-approve the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves). See [`CanUseTool`](#canusetool) for details                                                     |
| `hooks`                       | `dict[HookEvent, list[HookMatcher]] \| None`                                          | `None`                             | Hook configurations for intercepting events                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `user`                        | `str \| None`                                                                         | `None`                             | User identifier                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `include_partial_messages`    | `bool`                                                                                | `False`                            | Include partial message streaming events. When enabled, [`StreamEvent`](#streamevent) messages are yielded                                                                                                                                                                                                                                                                                                                                                                  |
| `include_hook_events`         | `bool`                                                                                | `False`                            | Include hook lifecycle events in the message stream as `HookEventMessage` objects                                                                                                                                                                                                                                                                                                                                                                                           |
| `forward_subagent_text`       | `bool`                                                                                | `False`                            | Forward subagent text and thinking blocks in the message stream. Without this option, Claude Code emits subagent `tool_use` and `tool_result` blocks but not text or thinking. Requires Python Agent SDK 0.2.140 or later                                                                                                                                                                                                                                                   |
| `fork_session`                | `bool`                                                                                | `False`                            | When resuming with `resume`, fork to a new session ID instead of continuing the original session                                                                                                                                                                                                                                                                                                                                                                            |
| `resume_session_at`           | `str \| None`                                                                         | `None`                             | When resuming, load the conversation only up to and including the message with this UUID. Use with `resume`, and usually `fork_session`, to branch from an earlier point. Requires Python Agent SDK 0.2.137 or later                                                                                                                                                                                                                                                        |
| `resume_drops_turn`           | `str \| None`                                                                         | `None`                             | UUID of the user prompt whose turn a `resume_session_at` truncation discards. When set, the CLI refuses the resume if the discarded range holds entries not attributable to that turn. Requires Python Agent SDK 0.2.137 or later and Claude Code v2.1.223 or later; the CLI bundled with those SDK versions satisfies the Claude Code requirement                                                                                                                          |
| `agents`                      | `dict[str, AgentDefinition] \| None`                                                  | `None`                             | Programmatically defined subagents                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `plugins`                     | `list[SdkPluginConfig]`                                                               | `[]`                               | Load custom plugins from local paths. See [Plugins](https://code.claude.com/docs/en/agent-sdk/plugins) for details                                                                                                                                                                                                                                                                                                                                                                                      |
| `sandbox`                     | [`SandboxSettings`](#sandboxsettings) ` \| None`                                      | `None`                             | Configure sandbox behavior programmatically. See [Sandbox settings](#sandboxsettings) for details                                                                                                                                                                                                                                                                                                                                                                           |
| `setting_sources`             | `list[SettingSource] \| None`                                                         | `None` (CLI defaults: all sources) | Control which filesystem settings to load. Pass `[]` to disable user, project, and local settings. Endpoint-managed policy loads regardless; server-managed settings are fetched when the session authenticates with an organization credential on an [eligible configuration](https://code.claude.com/docs/en/server-managed-settings#platform-availability). See [Use Claude Code features](https://code.claude.com/docs/en/agent-sdk/claude-code-features#what-settingsources-does-not-control)                                  |
| `skills`                      | `list[str] \| Literal["all"] \| None`                                                 | `None`                             | Skills available to the session. Pass `"all"` to enable every discovered skill, or a list of skill names. Pass exact names only. The SDK rejects malformed and wildcard-form names with a `ValueError` before starting the Claude Code process; this check requires Python Agent SDK 0.2.129 or later. When set, the SDK adds the Skill tool to `allowed_tools` automatically. If you also pass `tools`, include `"Skill"` in that list. See [Skills](https://code.claude.com/docs/en/agent-sdk/skills) |
| `max_thinking_tokens`         | `int \| None`                                                                         | `None`                             | *Deprecated* - Maximum tokens for thinking blocks. Use `thinking` instead                                                                                                                                                                                                                                                                                                                                                                                                   |
| `thinking`                    | [`ThinkingConfig`](#thinkingconfig) ` \| None`                                        | `None`                             | Controls extended thinking behavior. Takes precedence over `max_thinking_tokens`                                                                                                                                                                                                                                                                                                                                                                                            |
| `effort`                      | [`EffortLevel`](#effortlevel) ` \| None`                                              | `None`                             | Effort level for thinking depth. See [adjust the effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level)                                                                                                                                                                                                                                                                                                                                                                        |
| `session_store`               | [`SessionStore`](https://code.claude.com/docs/en/agent-sdk/session-storage#the-sessionstore-interface) ` \| None` | `None`                             | Mirror session transcripts to an external backend so another host can resume them. See [Persist sessions to external storage](https://code.claude.com/docs/en/agent-sdk/session-storage)                                                                                                                                                                                                                                                                                                                |
| `session_store_flush`         | `Literal["batched", "eager"]`                                                         | `"batched"`                        | When to flush mirrored transcript entries to `session_store`. `"batched"` flushes once per turn or when the buffer fills; `"eager"` triggers a background flush after every frame. Ignored when `session_store` is `None`                                                                                                                                                                                                                                                   |
| `load_timeout_ms`             | `int`                                                                                 | `60000`                            | Per-call timeout for `session_store.load()` and `list_subkeys()` during resume materialization, in milliseconds                                                                                                                                                                                                                                                                                                                                                             |
| `task_budget`                 | `TaskBudget \| None`                                                                  | `None`                             | API-side token budget. Sent as `output_config.task_budget` with the `task-budgets-2026-03-13` beta header. Pass `\{"total": <int>\}`.                                                                                                                                                                                                                                                                                                                                         |

#### Handle slow or stalled API responses

The CLI subprocess reads several environment variables that control API timeouts and stall detection. Pass them through `ClaudeAgentOptions.env`:

```python theme={null}
from claude_agent_sdk import ClaudeAgentOptions

options = ClaudeAgentOptions(
    env={
        "API_TIMEOUT_MS": "120000",
        "CLAUDE_CODE_MAX_RETRIES": "2",
        "CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS": "120000",
    },
)
```

* `API_TIMEOUT_MS`: per-request timeout on the Anthropic client, in milliseconds. Default `600000`. Applies to the main loop and all subagents.
* `CLAUDE_CODE_MAX_RETRIES`: maximum API retries. Default `10`, capped at `15`. Each retry gets its own `API_TIMEOUT_MS` window, so worst-case wall time is roughly `API_TIMEOUT_MS × (CLAUDE_CODE_MAX_RETRIES + 1)` plus backoff. For unattended runs that need to wait through longer outages, set [`CLAUDE_CODE_RETRY_WATCHDOG=1`](https://code.claude.com/docs/en/errors#tune-retry-behavior): it retries transient capacity errors indefinitely and, on Claude Code v2.1.199 or later, raises the default for other transient errors to `300` and removes the cap on this variable.
* `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS`: stall watchdog for subagents. While the stream watchdog is on, the default is `CLAUDE_STREAM_IDLE_TIMEOUT_MS` plus 5 minutes, which comes to `600000` unless you raise that variable. With the stream watchdog off, the default is `600000`. Before v2.1.257, the default was always `600000`.

  The timer resets on each stream event. On a stall, Claude Code aborts the subagent and reports the stall to the parent. For a background subagent, it also marks the task failed and attaches any partial result.
* `CLAUDE_ENABLE_STREAM_WATCHDOG` with `CLAUDE_STREAM_IDLE_TIMEOUT_MS`: stream watchdog that aborts the request when headers have arrived but the response body stops streaming. The watchdog is on by default for all providers; set `CLAUDE_ENABLE_STREAM_WATCHDOG=0` to disable it. `CLAUDE_STREAM_IDLE_TIMEOUT_MS` defaults to `300000` and is clamped to that minimum. After the abort, [Automatic retries](https://code.claude.com/docs/en/errors#automatic-retries) covers what Claude Code does, based on how far the response had progressed.

  While the watchdog waits out a response that a gateway behind `ANTHROPIC_BASE_URL` holds open with keep-alive pings, a host that sets `include_partial_messages` keeps receiving `ping` [`StreamEvent`](#streamevent) messages. Read those frames as liveness rather than timing the session out on silence. Before v2.1.257, the frames stopped 5 minutes after the last real stream event.

### `OutputFormat`

Configuration for structured output validation. Pass this as a `dict` to the `output_format` field on `ClaudeAgentOptions`:

```python theme={null}
# Expected dict shape for output_format
{
    "type": "json_schema",
    "schema": {...},  # Your JSON Schema definition
}
```

| Field    | Required | Description                                        |
| :------- | :------- | :------------------------------------------------- |
| `type`   | Yes      | Must be `"json_schema"` for JSON Schema validation |
| `schema` | Yes      | JSON Schema definition for output validation       |

### `SystemPromptPreset`

Configuration for using Claude Code's preset system prompt with optional additions.

```python theme={null}
class SystemPromptPreset(TypedDict):
    type: Literal["preset"]
    preset: Literal["claude_code"]
    append: NotRequired[str]
    exclude_dynamic_sections: NotRequired[bool]
```

| Field                      | Required | Description                                                                                                                                                                                                                                                                                                                  |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                     | Yes      | Must be `"preset"` to use a preset system prompt                                                                                                                                                                                                                                                                             |
| `preset`                   | Yes      | Must be `"claude_code"` to use Claude Code's system prompt                                                                                                                                                                                                                                                                   |
| `append`                   | No       | Additional instructions to append to the preset system prompt                                                                                                                                                                                                                                                                |
| `exclude_dynamic_sections` | No       | Move per-session context such as working directory, the git-repo flag, and auto memory paths from the system prompt into the first user message. Improves prompt-cache reuse across users and machines. See [Modify system prompts](https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts#improve-prompt-caching-across-users-and-machines) |

### `SystemPromptFile`

Configuration for loading a custom system prompt from a file instead of passing it as a string. The SDK maps this to the CLI [`--system-prompt-file`](https://code.claude.com/docs/en/cli-reference#system-prompt-flags) flag. Use the file form when the prompt is large: the SDK passes a string `system_prompt` on the CLI subprocess argv, which is subject to OS command-line length limits before the SDK sends any API request. On Linux a single argument longer than roughly 128 KB fails at process spawn with `Argument list too long`. On Windows the whole command line is capped at roughly 32 KB, so the string form fails at a lower threshold.

```python theme={null}
class SystemPromptFile(TypedDict):
    type: Literal["file"]
    path: str
```

| Field  | Required | Description                                   |
| :----- | :------- | :-------------------------------------------- |
| `type` | Yes      | Must be `"file"` to load the prompt from disk |
| `path` | Yes      | Path to a file containing the system prompt   |

### `SettingSource`

Controls which filesystem-based configuration sources the SDK loads settings from.

```python theme={null}
SettingSource = Literal["user", "project", "local"]
```

| Value       | Description                                                               | Location                      |
| :---------- | :------------------------------------------------------------------------ | :---------------------------- |
| `"user"`    | Global user settings                                                      | `~/.claude/settings.json`     |
| `"project"` | Shared project settings (version controlled)                              | `.claude/settings.json`       |
| `"local"`   | Local project settings, gitignored when Claude Code saves a setting to it | `.claude/settings.local.json` |

#### Default behavior

When `setting_sources` is omitted or `None`, `query()` loads the same filesystem settings as the Claude Code CLI: user, project, and local. Endpoint-managed policy is loaded in all cases; server-managed settings are fetched when the session authenticates with an organization credential on an [eligible configuration](https://code.claude.com/docs/en/server-managed-settings#platform-availability). See [What settingSources does not control](https://code.claude.com/docs/en/agent-sdk/claude-code-features#what-settingsources-does-not-control) for inputs that are read regardless of this option, and how to disable them.

#### Why use setting\_sources

**Disable filesystem settings:**

```python theme={null}
# Do not load user, project, or local settings from disk
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Analyze this code",
        options=ClaudeAgentOptions(
            setting_sources=[]
        ),
    ):
        print(message)

asyncio.run(main())
```

  In Python SDK 0.1.59 and earlier, an empty list was treated the same as omitting the option, so `setting_sources=[]` did not disable filesystem settings. Upgrade to a newer release if you need an empty list to take effect. The TypeScript SDK is not affected.

**Load only specific setting sources:**

```python theme={null}
# Load only project settings, ignore user and local
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Run CI checks",
        options=ClaudeAgentOptions(
            setting_sources=["project"]  # Only .claude/settings.json
        ),
    ):
        print(message)

asyncio.run(main())
```

**SDK-only applications:**

```python theme={null}
# Define everything programmatically.
# Pass [] to opt out of filesystem setting sources.
import asyncio
from claude_agent_sdk import AgentDefinition, ClaudeAgentOptions, query

async def main():
    async for message in query(
        prompt="Review this PR",
        options=ClaudeAgentOptions(
            setting_sources=[],
            agents={
                "code-reviewer": AgentDefinition(
                    description="Reviews code changes",
                    prompt="You are a code reviewer. Report issues in the diff.",
                ),
            },
            allowed_tools=["Read", "Grep", "Glob"],
        ),
    ):
        print(message)

asyncio.run(main())
```

To load CLAUDE.md project instructions, include `"project"` in `setting_sources`. See [Modify system prompts](https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts#claude-md-files-for-project-level-instructions) for how CLAUDE.md loading interacts with the system prompt options.

#### Settings precedence

When multiple sources are loaded, settings are merged with this precedence (highest to lowest):

1. Local settings (`.claude/settings.local.json`)
2. Project settings (`.claude/settings.json`)
3. User settings (`~/.claude/settings.json`)

Programmatic options such as `agents` and `allowed_tools` override user, project, and local filesystem settings. Managed policy settings take precedence over programmatic options.

### `AgentDefinition`

Configuration for a subagent defined programmatically.

```python theme={null}
@dataclass
class AgentDefinition:
    description: str
    prompt: str
    tools: list[str] | None = None
    disallowedTools: list[str] | None = None
    model: str | None = None
    skills: list[str] | None = None
    memory: Literal["user", "project", "local"] | None = None
    mcpServers: list[str | dict[str, Any]] | None = None
    initialPrompt: str | None = None
    maxTurns: int | None = None
    background: bool | None = None
    effort: EffortLevel | int | None = None
    permissionMode: PermissionMode | None = None
```

| Field             | Required | Description                                                                                                                                                                                                                             |
| :---------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`     | Yes      | Natural language description of when to use this agent                                                                                                                                                                                  |
| `prompt`          | Yes      | The agent's system prompt                                                                                                                                                                                                               |
| `tools`           | No       | Array of allowed tool names. If omitted, inherits every [tool available to subagents](https://code.claude.com/docs/en/sub-agents#available-tools)                                                                                                                   |
| `disallowedTools` | No       | Array of tool names to remove from the agent's tool set. MCP server-level patterns are also accepted: `mcp__server` or `mcp__server__*` removes every tool from that server, and `mcp__*` removes every MCP tool from any server        |
| `model`           | No       | Model override for this agent. Accepts an alias such as `"sonnet"`, `"opus"`, `"haiku"`, or `"inherit"`, or a full model ID. When you omit it, Claude Code picks the model in the [subagent model order](https://code.claude.com/docs/en/sub-agents#choose-a-model) |
| `skills`          | No       | List of skill names to preload into the agent's context at startup. Unlisted skills remain invocable through the Skill tool                                                                                                             |
| `memory`          | No       | Memory source for this agent: `"user"`, `"project"`, or `"local"`                                                                                                                                                                       |
| `mcpServers`      | No       | MCP servers available to this agent. Each entry is a server name or an inline `\{name: config\}` dict                                                                                                                                     |
| `initialPrompt`   | No       | Auto-submitted as the first user turn when this agent runs as the main thread agent                                                                                                                                                     |
| `maxTurns`        | No       | Maximum number of agentic turns before the agent stops                                                                                                                                                                                  |
| `background`      | No       | Run this agent as a non-blocking background task when invoked                                                                                                                                                                           |
| `effort`          | No       | Reasoning effort level for this agent. Accepts a named level or an integer. See [`EffortLevel`](#effortlevel)                                                                                                                           |
| `permissionMode`  | No       | Permission mode for tool execution within this agent. The [subagent inheritance rules](https://code.claude.com/docs/en/agent-sdk/permissions#available-modes) decide when it applies. See [`PermissionMode`](#permissionmode)                                       |

  `AgentDefinition` field names use camelCase, such as `disallowedTools`, `permissionMode`, and `maxTurns`. These names map directly to the wire format shared with the TypeScript SDK. This differs from `ClaudeAgentOptions`, which uses Python snake\_case for the equivalent top-level fields such as `disallowed_tools` and `permission_mode`. Because `AgentDefinition` is a dataclass, passing a snake\_case keyword raises a `TypeError` at construction time.

### `PermissionMode`

Permission modes for controlling tool execution.

```python theme={null}
PermissionMode = Literal[
    "default",  # Standard permission behavior
    "acceptEdits",  # Auto-accept file edits
    "plan",  # Planning mode - explore without editing
    "dontAsk",  # Deny anything not pre-approved instead of prompting
    "bypassPermissions",  # Bypass permission checks; explicit ask rules still prompt (use with caution)
    "auto",  # Model classifier approves or denies permission prompts
]
```

### `EffortLevel`

Effort levels for guiding thinking depth.

```python theme={null}
EffortLevel = Literal[
    "low",  # Minimal thinking, fastest responses
    "medium",  # Moderate thinking
    "high",  # Deep reasoning
    "xhigh",  # Extended reasoning; falls back to "high" on models that don't support it
    "max",  # Maximum effort
]
```

### `CanUseTool`

Type alias for tool permission callback functions.

```python theme={null}
CanUseTool = Callable[
    [str, dict[str, Any], ToolPermissionContext], Awaitable[PermissionResult]
]
```

The callback receives:

* `tool_name`: Name of the tool being called
* `input_data`: The tool's input parameters
* `context`: A `ToolPermissionContext` with additional information

Returns a `PermissionResult` (either `PermissionResultAllow` or `PermissionResultDeny`).

The callback is the SDK replacement for the interactive permission prompt: it's invoked only when the [permission evaluation flow](https://code.claude.com/docs/en/agent-sdk/permissions#how-permissions-are-evaluated) resolves to a prompt. Tool calls already approved by an `allowed_tools` entry, a settings allow rule, or the permission mode, such as `acceptEdits` or `bypassPermissions`, never invoke it. To gate every tool call, use a [`PreToolUse` hook](https://code.claude.com/docs/en/agent-sdk/hooks) instead.

An allow rule doesn't pre-approve the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves); see [How permissions are evaluated](https://code.claude.com/docs/en/agent-sdk/permissions#how-permissions-are-evaluated) for which of them reach the callback and what happens in `dontAsk` and `auto` mode.

### `ToolPermissionContext`

Context information passed to tool permission callbacks.

```python theme={null}
@dataclass
class ToolPermissionContext:
    signal: Any | None = None  # Future: abort signal support
    suggestions: list[PermissionUpdate] = field(default_factory=list)
    tool_use_id: str | None = None
    agent_id: str | None = None
    blocked_path: str | None = None
    decision_reason: str | None = None
    title: str | None = None
    display_name: str | None = None
    description: str | None = None
```

| Field             | Type                     | Description                                                                                                                                                                                                                                 |
| :---------------- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `signal`          | `Any \| None`            | Reserved for future abort signal support                                                                                                                                                                                                    |
| `suggestions`     | `list[PermissionUpdate]` | Permission update suggestions from the CLI. Bash prompts include a suggestion with the `localSettings` destination, so returning it in `updated_permissions` writes the rule to `.claude/settings.local.json` and persists across sessions. |
| `tool_use_id`     | `str \| None`            | Identifier of the specific tool call this prompt is for. Always populated when delivered to `can_use_tool`                                                                                                                                  |
| `agent_id`        | `str \| None`            | Sub-agent ID when the call originates from a subagent; `None` for the main agent                                                                                                                                                            |
| `blocked_path`    | `str \| None`            | File path that triggered the permission request, when applicable. For example, when a Bash command tries to access a path outside allowed directories                                                                                       |
| `decision_reason` | `str \| None`            | Reason this permission request was triggered. Forwarded from a PreToolUse hook's `permissionDecisionReason` when the hook returned `"ask"`                                                                                                  |
| `title`           | `str \| None`            | Full permission prompt sentence, such as `Claude wants to read foo.txt`. Use as the primary prompt text when present                                                                                                                        |
| `display_name`    | `str \| None`            | Short noun phrase for the tool action, such as `Read file`, suitable for button labels                                                                                                                                                      |
| `description`     | `str \| None`            | Human-readable subtitle for the permission UI                                                                                                                                                                                               |

### `PermissionResult`

Union type for permission callback results.

```python theme={null}
PermissionResult = PermissionResultAllow | PermissionResultDeny
```

### `PermissionResultAllow`

Result indicating the tool call should be allowed.

```python theme={null}
@dataclass
class PermissionResultAllow:
    behavior: Literal["allow"] = "allow"
    updated_input: dict[str, Any] | None = None
    updated_permissions: list[PermissionUpdate] | None = None
```

| Field                 | Type                             | Default   | Description                               |
| :-------------------- | :------------------------------- | :-------- | :---------------------------------------- |
| `behavior`            | `Literal["allow"]`               | `"allow"` | Must be "allow"                           |
| `updated_input`       | `dict[str, Any] \| None`         | `None`    | Modified input to use instead of original |
| `updated_permissions` | `list[PermissionUpdate] \| None` | `None`    | Permission updates to apply               |

### `PermissionResultDeny`

Result indicating the tool call should be denied.

```python theme={null}
@dataclass
class PermissionResultDeny:
    behavior: Literal["deny"] = "deny"
    message: str = ""
    interrupt: bool = False
```

| Field       | Type              | Default  | Description                                |
| :---------- | :---------------- | :------- | :----------------------------------------- |
| `behavior`  | `Literal["deny"]` | `"deny"` | Must be "deny"                             |
| `message`   | `str`             | `""`     | Message explaining why the tool was denied |
| `interrupt` | `bool`            | `False`  | Whether to interrupt the current execution |

### `PermissionUpdate`

Configuration for updating permissions programmatically.

```python theme={null}
@dataclass
class PermissionUpdate:
    type: Literal[
        "addRules",
        "replaceRules",
        "removeRules",
        "setMode",
        "addDirectories",
        "removeDirectories",
    ]
    rules: list[PermissionRuleValue] | None = None
    behavior: Literal["allow", "deny", "ask"] | None = None
    mode: PermissionMode | None = None
    directories: list[str] | None = None
    destination: (
        Literal["userSettings", "projectSettings", "localSettings", "session"] | None
    ) = None
```

| Field         | Type                                      | Description                                     |
| :------------ | :---------------------------------------- | :---------------------------------------------- |
| `type`        | `Literal[...]`                            | The type of permission update operation         |
| `rules`       | `list[PermissionRuleValue] \| None`       | Rules for add/replace/remove operations         |
| `behavior`    | `Literal["allow", "deny", "ask"] \| None` | Behavior for rule-based operations              |
| `mode`        | `PermissionMode \| None`                  | Mode for setMode operation                      |
| `directories` | `list[str] \| None`                       | Directories for add/remove directory operations |
| `destination` | `Literal[...] \| None`                    | Where to apply the permission update            |

### `PermissionRuleValue`

A rule to add, replace, or remove in a permission update.

```python theme={null}
@dataclass
class PermissionRuleValue:
    tool_name: str
    rule_content: str | None = None
```

### `ToolsPreset`

Preset tools configuration for using Claude Code's default tool set.

```python theme={null}
class ToolsPreset(TypedDict):
    type: Literal["preset"]
    preset: Literal["claude_code"]
```

### `ThinkingConfig`

Controls extended thinking behavior. A union of three configurations:

```python theme={null}
ThinkingDisplay = Literal["summarized", "omitted"]

class ThinkingConfigAdaptive(TypedDict):
    type: Literal["adaptive"]
    display: NotRequired[ThinkingDisplay]

class ThinkingConfigEnabled(TypedDict):
    type: Literal["enabled"]
    budget_tokens: int
    display: NotRequired[ThinkingDisplay]

class ThinkingConfigDisabled(TypedDict):
    type: Literal["disabled"]

ThinkingConfig = ThinkingConfigAdaptive | ThinkingConfigEnabled | ThinkingConfigDisabled
```

| Variant    | Fields                             | Description                                  |
| :--------- | :--------------------------------- | :------------------------------------------- |
| `adaptive` | `type`, `display`                  | Claude adaptively decides when to think      |
| `enabled`  | `type`, `budget_tokens`, `display` | Enable thinking with a specific token budget |
| `disabled` | `type`                             | Disable thinking                             |

The optional `display` field controls whether thinking text is returned `"summarized"` or `"omitted"`. On Claude Opus 4.7 and later, the API default is `"omitted"`, so set `"summarized"` to receive thinking content in [`ThinkingBlock`](#thinkingblock) outputs. Claude Code doesn't send `display` to Amazon Bedrock or Google Cloud's Agent Platform, so on those providers Opus 4.7 and later return empty `ThinkingBlock` outputs even when you set `display` to `"summarized"`.

Because these are `TypedDict` classes, they're plain dicts at runtime. Either construct them as dict literals or call the class like a constructor; both produce a `dict`. Access fields with `config["budget_tokens"]`, not `config.budget_tokens`:

```python theme={null}
from claude_agent_sdk import ClaudeAgentOptions, ThinkingConfigEnabled

# Option 1: dict literal (recommended, no import needed)
options = ClaudeAgentOptions(thinking={"type": "enabled", "budget_tokens": 20000})

# Option 2: constructor-style (returns a plain dict)
config = ThinkingConfigEnabled(type="enabled", budget_tokens=20000)
print(config["budget_tokens"])  # 20000
# config.budget_tokens would raise AttributeError
```

### `TaskBudget`

API-side task budget in tokens, used with the `task_budget` field in `ClaudeAgentOptions`.

```python theme={null}
class TaskBudget(TypedDict):
    total: int
```

| Field   | Type  | Description                     |
| :------ | :---- | :------------------------------ |
| `total` | `int` | Total token budget for the task |

Because this is a `TypedDict`, pass it as a plain dict, such as `ClaudeAgentOptions(task_budget=\{"total": 50000\})`.

### `SdkBeta`

Literal type for SDK beta features.

```python theme={null}
SdkBeta = Literal["context-1m-2025-08-07"]
```

Use with the `betas` field in `ClaudeAgentOptions` to enable beta features.

  The `context-1m-2025-08-07` beta is retired as of April 30, 2026. Passing this header with Claude Sonnet 4.5 or Sonnet 4 has no effect, and requests that exceed the standard 200k-token context window return an error. To use a 1M-token context window, migrate to [Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Opus 4.6, Claude Opus 4.7, or Claude Opus 4.8](https://platform.claude.com/docs/en/about-claude/models/overview), which include 1M context at standard pricing with no beta header required.

### `McpSdkServerConfig`

Configuration for SDK MCP servers created with `create_sdk_mcp_server()`.

```python theme={null}
class McpSdkServerConfig(TypedDict):
    type: Literal["sdk"]
    name: str
    instance: Any  # MCP Server instance
```

### `McpServerConfig`

Union type for MCP server configurations.

```python theme={null}
McpServerConfig = (
    McpStdioServerConfig | McpSSEServerConfig | McpHttpServerConfig | McpSdkServerConfig
)
```

#### `McpStdioServerConfig`

```python theme={null}
class McpStdioServerConfig(TypedDict):
    type: NotRequired[Literal["stdio"]]  # Optional for backwards compatibility
    command: str
    args: NotRequired[list[str]]
    env: NotRequired[dict[str, str]]
```

#### `McpSSEServerConfig`

```python theme={null}
class McpSSEServerConfig(TypedDict):
    type: Literal["sse"]
    url: str
    headers: NotRequired[dict[str, str]]
```

#### `McpHttpServerConfig`

```python theme={null}
class McpHttpServerConfig(TypedDict):
    type: Literal["http"]
    url: str
    headers: NotRequired[dict[str, str]]
```

### `McpServerStatusConfig`

The configuration of an MCP server as reported by [`get_mcp_status()`](#methods). This is the union of all [`McpServerConfig`](#mcpserverconfig) transport variants plus an output-only `claudeai-proxy` variant for servers proxied through claude.ai.

```python theme={null}
McpServerStatusConfig = (
    McpStdioServerConfig
    | McpSSEServerConfig
    | McpHttpServerConfig
    | McpSdkServerConfigStatus
    | McpClaudeAIProxyServerConfig
)
```

`McpSdkServerConfigStatus` is the serializable form of [`McpSdkServerConfig`](#mcpsdkserverconfig) with only `type` (`"sdk"`) and `name` (`str`) fields; the in-process `instance` is omitted. `McpClaudeAIProxyServerConfig` has `type` (`"claudeai-proxy"`), `url` (`str`), and `id` (`str`) fields.

### `McpStatusResponse`

Response from [`ClaudeSDKClient.get_mcp_status()`](#methods). Wraps the list of server statuses under the `mcpServers` key.

```python theme={null}
class McpStatusResponse(TypedDict):
    mcpServers: list[McpServerStatus]
```

### `McpServerStatus`

Status of a connected MCP server, contained in [`McpStatusResponse`](#mcpstatusresponse).

```python theme={null}
class McpServerStatus(TypedDict):
    name: str
    status: McpServerConnectionStatus  # "connected" | "failed" | "needs-auth" | "pending" | "disabled"
    serverInfo: NotRequired[McpServerInfo]
    error: NotRequired[str]
    config: NotRequired[McpServerStatusConfig]
    scope: NotRequired[str]
    tools: NotRequired[list[McpToolInfo]]
```

| Field        | Type                                                         | Description                                                                                                                                                                   |
| :----------- | :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       | `str`                                                        | Server name                                                                                                                                                                   |
| `status`     | `str`                                                        | One of `"connected"`, `"failed"`, `"needs-auth"`, `"pending"`, or `"disabled"`                                                                                                |
| `serverInfo` | `dict` (optional)                                            | Server name and version (`\{"name": str, "version": str\}`)                                                                                                                     |
| `error`      | `str` (optional)                                             | Error message if the server failed to connect                                                                                                                                 |
| `config`     | [`McpServerStatusConfig`](#mcpserverstatusconfig) (optional) | Server configuration. Same shape as [`McpServerConfig`](#mcpserverconfig) (stdio, SSE, HTTP, or SDK), plus a `claudeai-proxy` variant for servers connected through claude.ai |
| `scope`      | `str` (optional)                                             | Configuration scope                                                                                                                                                           |
| `tools`      | `list` (optional)                                            | Tools provided by this server, each with `name`, `description`, and `annotations` fields                                                                                      |

### `SdkPluginConfig`

Configuration for loading plugins in the SDK.

```python theme={null}
class SdkPluginConfig(TypedDict):
    type: Literal["local"]
    path: str
```

| Field  | Type               | Description                                                |
| :----- | :----------------- | :--------------------------------------------------------- |
| `type` | `Literal["local"]` | Must be `"local"` (only local plugins currently supported) |
| `path` | `str`              | Absolute or relative path to the plugin directory          |

**Example:**

```python theme={null}
plugins = [
    {"type": "local", "path": "./my-plugin"},
    {"type": "local", "path": "/absolute/path/to/plugin"},
]
```

For complete information on creating and using plugins, see [Plugins](https://code.claude.com/docs/en/agent-sdk/plugins).
