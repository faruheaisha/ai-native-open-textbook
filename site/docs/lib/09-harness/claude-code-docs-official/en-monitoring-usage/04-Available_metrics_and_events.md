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
sourceRel: "en/monitoring-usage.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/monitoring-usage.md"
sourceSha256: "85703528e4de5432950951e0ff1d44d191bee607096ec4370353aa6b15a70b70"
pageSha256: "f5ec061e3a6bf12676a96ea38e9a3957f748f32707486472a9dc446fee087c4c"
contentMode: "local-full"
zh: ""
---

## Available metrics and events

### Standard attributes

All metrics and events share these standard attributes:

| Attribute                            | Description                                                                                                                                                                                                                          | Controlled By                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `session.id`                         | Unique session identifier                                                                                                                                                                                                            | `OTEL_METRICS_INCLUDE_SESSION_ID` (default: true)          |
| `app.version`                        | Current Claude Code version                                                                                                                                                                                                          | `OTEL_METRICS_INCLUDE_VERSION` (default: false)            |
| `app.entrypoint`                     | How the session was launched, such as `cli`, `sdk-cli`, `sdk-ts`, `sdk-py`, or `claude-vscode`                                                                                                                                       | `OTEL_METRICS_INCLUDE_ENTRYPOINT` (default: false)         |
| `organization.id`                    | Organization UUID (when authenticated)                                                                                                                                                                                               | Always included when available                             |
| `user.account_uuid`                  | Account UUID (when authenticated)                                                                                                                                                                                                    | `OTEL_METRICS_INCLUDE_ACCOUNT_UUID` (default: true)        |
| `user.account_id`                    | Account ID in tagged format matching Anthropic admin APIs (when authenticated), such as `user_01BWBeN28...`                                                                                                                          | `OTEL_METRICS_INCLUDE_ACCOUNT_UUID` (default: true)        |
| `user.id`                            | Random anonymous identifier generated on first run and persisted in `~/.claude.json`. It contains no personal information and is not derived from your Claude account. Deleting the file produces a new unrelated value on next run. | Always included                                            |
| `user.email`                         | User email address, from your sign-in or, in a [cloud session](https://code.claude.com/docs/en/claude-code-on-the-web), from the session's own credentials                                                                                                       | Always included when available                             |
| `terminal.type`                      | Terminal type, such as `iTerm.app`, `vscode`, `cursor`, or `tmux`                                                                                                                                                                    | Always included when detected                              |
| Keys from `OTEL_RESOURCE_ATTRIBUTES` | Custom attributes you set, such as `department` or `team.id`. See [Multi-team organization support](#multi-team-organization-support)                                                                                                | `OTEL_METRICS_INCLUDE_RESOURCE_ATTRIBUTES` (default: true) |

When Claude Code is signed in to a [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway), the CLI stamps exports with the authenticated identity from the gateway session: `user.id` is the IdP subject rather than an anonymous installation identifier, `user.email` is the signed-in email, and `user.groups` carries IdP group membership as a comma-separated string. Each export also carries `identity.source: gateway-oidc`. The gateway identity is applied last, so `user.*` and `identity.*` keys set through `OTEL_RESOURCE_ATTRIBUTES` are ignored on gateway sessions.

Events additionally include the following attributes. These are never attached to metrics because they would cause unbounded cardinality:

* `prompt.id`: UUID correlating a user prompt with all subsequent events until the next prompt. See [Event correlation attributes](#event-correlation-attributes).
* `workspace.host_paths`: host workspace directories selected in the desktop app, as a string array
* `workflow.run_id`: run identifier, prefixed `wf_`, on the API and tool events emitted by agents that belong to a [Workflow](https://code.claude.com/docs/en/workflows) tool run. Filtering events by one `workflow.run_id` reconstructs that run's API requests and tool results. The identifier covers the agents the workflow script spawns and any agents those spawn in turn, such as skill invocations. It matches the run identifier reported in the Workflow tool result. Absent on all other events. Requires Claude Code v2.1.202 or later
* `workflow.name`: name of the workflow, its script's `meta.name`, emitted alongside `workflow.run_id`. Built-in workflow names appear verbatim when the run executes the unmodified built-in script. User-authored names, including edited copies of built-in scripts, are replaced with `custom` unless `OTEL_LOG_TOOL_DETAILS=1` is set. Requires Claude Code v2.1.202 or later

### Metrics

Claude Code exports the following metrics. The Unit column shows the OpenTelemetry unit string attached to each metric; count metrics carry none.

| Metric Name                           | Description                                     | Unit   |
| ------------------------------------- | ----------------------------------------------- | ------ |
| `claude_code.session.count`           | Count of CLI sessions started                   | none   |
| `claude_code.lines_of_code.count`     | Count of lines of code modified                 | none   |
| `claude_code.pull_request.count`      | Number of pull requests created                 | none   |
| `claude_code.commit.count`            | Number of git commits created                   | none   |
| `claude_code.cost.usage`              | Cost of the Claude Code session                 | USD    |
| `claude_code.token.usage`             | Number of tokens used                           | tokens |
| `claude_code.code_edit_tool.decision` | Count of code editing tool permission decisions | none   |
| `claude_code.active_time.total`       | Total active time                               | s      |

When `prometheus` is the only exporter listed in `OTEL_METRICS_EXPORTER`, Claude Code omits the `USD`, `tokens`, and `s` units from the exported metrics so the scrape stays valid Prometheus text format. Metric names don't change, and configurations that combine exporters, such as `otlp,prometheus`, keep the units. Before v2.1.216, the Prometheus scrape included OpenMetrics-only `# UNIT` lines that some scrapers rejected.

### Metric details

Each metric includes the standard attributes listed above. Metrics with additional context-specific attributes are noted below.

#### Session counter

Incremented at the start of each session.

**Attributes**:

* All [standard attributes](#standard-attributes)
* `start_type`: How the session was started. One of `"fresh"`, `"resume"`, `"continue"`, or `"agents_view"`. The `"agents_view"` value identifies the `claude agents` dashboard process, a user-launched local UI rather than a conversational session. Filter on this value to separate UI process launches from conversational sessions in your dashboards.

#### Lines of code counter

Incremented when code is added or removed.

**Attributes**:

* All [standard attributes](#standard-attributes)
* `type`: (`"added"`, `"removed"`)
* `model`: Model identifier for the model that made the change (for example, "claude-sonnet-5")

#### Pull request counter

Incremented when Claude Code creates a pull request or merge request through a shell command or an MCP tool.

**Attributes**:

* All [standard attributes](#standard-attributes)

#### Commit counter

Incremented when creating git commits via Claude Code.

**Attributes**:

* All [standard attributes](#standard-attributes)

#### Cost counter

Incremented after each API request.

**Attributes**:

* All [standard attributes](#standard-attributes)
* `model`: Model identifier (for example, "claude-sonnet-5")
* `query_source`: Category of the subsystem that issued the request. One of `"main"`, `"subagent"`, or `"auxiliary"`
* `speed`: `"fast"` when the request used fast mode. Absent otherwise
* `effort`: [Effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) applied to the request: `"low"`, `"medium"`, `"high"`, `"xhigh"`, or `"max"`. Absent when the model doesn't support effort.
* `agent.name`: Subagent type that issued the request. Built-in agent names and agents from official-marketplace plugins appear verbatim. Other user-defined agent names are replaced with `"custom"`. Absent when the request was not issued by a named subagent type.
* `skill.name`: Skill active for the request, set by the Skill tool, a `/` command, or inherited by a spawned subagent. Built-in, bundled, user-defined, and official-marketplace plugin skill names appear verbatim. Third-party plugin skill names are replaced with `"third-party"`. Absent when no skill is active.
* `plugin.name`: Owning plugin when the active skill or subagent is provided by a plugin. Official-marketplace plugin names appear verbatim. Third-party plugin names are replaced with `"third-party"`. Absent when neither the skill nor the subagent has an owning plugin.
* `marketplace.name`: Marketplace the owning plugin was installed from. Only emitted for official-marketplace plugins. Absent otherwise.
* `mcp_server.name`: MCP server whose tool result this request consumed. Built-in, claude.ai-proxied, and official-registry server names appear verbatim. User-configured server names are replaced with `"custom"`. Absent when the request consumed no MCP tool result. Before v2.1.222, Claude Code set this attribute on every request after an MCP tool call, not only on requests that consumed a tool result, so dashboards that aggregate it show a step down after you upgrade.
* `mcp_tool.name`: MCP tool whose result this request consumed, with the same redaction and version behavior as `mcp_server.name`. Absent when the request consumed no MCP tool result.

#### Token counter

Incremented after each API request.

**Attributes**:

* All [standard attributes](#standard-attributes)
* `type`: (`"input"`, `"output"`, `"cacheRead"`, `"cacheCreation"`)
* `model`: Model identifier (for example, "claude-sonnet-5")
* `query_source`: Category of the subsystem that issued the request. One of `"main"`, `"subagent"`, or `"auxiliary"`
* `speed`: `"fast"` when the request used fast mode. Absent otherwise
* `effort`: [Effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) applied to the request. See [Cost counter](#cost-counter) for details.
* `agent.name`, `skill.name`, `plugin.name`, `marketplace.name`, `mcp_server.name`, `mcp_tool.name`: Skill, plugin, agent, and MCP attribution for the request. See [Cost counter](#cost-counter) for definitions and redaction behavior.

#### Code edit tool decision counter

Incremented when user accepts or rejects Edit, Write, or NotebookEdit tool usage.

**Attributes**:

* All [standard attributes](#standard-attributes)
* `tool_name`: Tool name (`"Edit"`, `"Write"`, `"NotebookEdit"`)
* `decision`: User decision (`"accept"`, `"reject"`)
* `source`: Where the decision came from. One of `"config"`, `"hook"`, `"user_permanent"`, `"user_temporary"`, `"user_abort"`, or `"user_reject"`. See the [Tool decision event](#tool-decision-event) for what each value means.
* `language`: Programming language of the edited file, such as `"TypeScript"`, `"Python"`, `"JavaScript"`, or `"Markdown"`. Returns `"unknown"` for unrecognized file extensions.

#### Active time counter

Tracks actual time spent actively using Claude Code, excluding idle time. This metric is incremented during user interactions, such as typing and reading responses, and during CLI processing, such as tool execution and AI response generation.

**Attributes**:

* All [standard attributes](#standard-attributes)
* `type`: `"user"` for keyboard interactions, `"cli"` for tool execution and AI responses

### Events

Claude Code exports the following events via OpenTelemetry logs/events (when `OTEL_LOGS_EXPORTER` is configured):

#### Event correlation attributes

When a user submits a prompt, Claude Code may make multiple API calls and run several tools. The `prompt.id` attribute lets you tie all of those events back to the single prompt that triggered them.

| Attribute           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt.id`         | UUID v4 identifier linking all events produced while processing a single user prompt                                                                                                                                                                                                                                                                                                                                                                                                              |
| `message.uuid`      | UUID of the message as persisted in the session transcript, the `~/.claude/projects/*/*.jsonl` files. Present on `assistant_response`, and on `user_prompt` except for command dispatches, which can produce zero or many messages. On `assistant_response`, this is the response's final transcript entry, which the next turn's `parentUuid` chains from. Requires Claude Code v2.1.214 or later                                                                                                |
| `client_request_id` | Client-generated UUID sent as the `x-client-request-id` request header. Present on `api_request` and `api_error` on first-party API connections; absent on third-party provider backends and when the request was retried through the non-streaming fallback. Pairs a request with its response and remains available for failures such as timeouts that never produced a server `request_id`. Matches the same attribute on the `llm_request` trace span. Requires Claude Code v2.1.214 or later |

To trace all activity triggered by a single prompt, filter your events by a specific `prompt.id` value. This returns the user\_prompt event, any api\_request events, and any tool\_result events that occurred while processing that prompt.

For message-level reconstruction, each event class carries a key that matches a field in the session transcript. The transcript entry format is [internal to Claude Code](https://code.claude.com/docs/en/sessions#where-transcripts-are-stored) and changes between versions, so a pipeline that joins on these fields can break on any release; treat the joins as version-specific rather than a stable contract:

* `message.uuid` on `user_prompt` and `assistant_response`
* `request_id` on the API events, persisted as `requestId` on the transcript's assistant entries
* `tool_use_id` on `tool_result` and `tool_decision` events

#### User prompt event

Logged when a user submits a prompt.

**Event Name**: `claude_code.user_prompt`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"user_prompt"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `prompt_length`: Length of the prompt
* `prompt`: Prompt content. Redacted by default. Set `OTEL_LOG_USER_PROMPTS=1` to include it
* `message.uuid`: UUID of the resulting user message, matching the persisted transcript entry. Absent on command dispatches, which can produce zero or many messages. Requires Claude Code v2.1.214 or later
* `command_name`: Command name when the prompt invokes one. Built-in and bundled command names such as `compact` or `debug` are emitted as-is; aliases such as `reset` emit as typed rather than the canonical name. Custom, plugin, and MCP command names collapse to `custom` or `mcp` unless `OTEL_LOG_TOOL_DETAILS=1` is set
* `command_source`: Origin of the command when present: `builtin`, `custom`, or `mcp`. Plugin-provided commands report as `custom`

#### Assistant response event

Logged after each API request that returns text content from the model. Only the response's text blocks are included; thinking blocks and tool-use blocks are excluded. Requires Claude Code v2.1.193 or later.

**Event Name**: `claude_code.assistant_response`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"assistant_response"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `response_length`: Length of the response text in characters
* `response`: Response text, truncated at the content limit (60 KB by default). Redacted to `<REDACTED>` by default. Set `OTEL_LOG_ASSISTANT_RESPONSES=1` to include it. When `OTEL_LOG_ASSISTANT_RESPONSES` is unset, `OTEL_LOG_USER_PROMPTS` controls it instead, so set `OTEL_LOG_ASSISTANT_RESPONSES=0` to keep responses redacted while prompt logging is on
* `model`: Model identifier (for example, "claude-sonnet-5")
* `request_id`: Anthropic API request ID from the response's `request-id` header. Present only when the API returns one
* `message.uuid`: UUID of the response's final transcript entry. An API response is persisted as one transcript entry per content block; this is the last one, which the next turn's `parentUuid` chains from. Requires Claude Code v2.1.214 or later
* `query_source`: Subsystem that issued the request, such as `"repl_main_thread"`, `"compact"`, or a subagent name

#### Tool result event

Logged when a tool completes execution. Not emitted if the tool call was rejected; see the [Tool decision event](#tool-decision-event) for rejections.

**Event Name**: `claude_code.tool_result`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"tool_result"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `tool_name`: Name of the tool
* `tool_use_id`: Unique identifier for this tool invocation. Matches the `tool_use_id` passed to hooks, allowing correlation between OTel events and hook-captured data.
* `success`: `"true"` or `"false"`
* `duration_ms`: Execution time in milliseconds
* `error_type`: Error category string when the tool failed, such as `"Error:ENOENT"` or `"ShellError"`
* `error` (when `OTEL_LOG_TOOL_DETAILS=1`): Full error message when the tool failed
* `decision_type`: Always `"accept"`, since this event is only emitted after the tool runs. Rejected calls don't produce a tool result
* `decision_source`: Where the permission decision came from. One of `"config"`, `"hook"`, `"user_permanent"`, or `"user_temporary"`. See the [Tool decision event](#tool-decision-event) for what each value means. The reject-only sources `"user_abort"` and `"user_reject"` never appear on this event.
* `tool_input_size_bytes`: Size of the JSON-serialized tool input in bytes
* `tool_result_size_bytes`: Size of the tool result in bytes
* `mcp_server_scope`: MCP server scope identifier (for MCP tools)
* `tool_parameters` (when `OTEL_LOG_TOOL_DETAILS=1`): JSON string containing tool-specific parameters. For Claude Desktop's built-in servers, in sessions Claude Desktop owns, the `mcp_server_name`/`mcp_tool_name` pair is included even with the flag off, the same host-authored exception as the [Tool decision event](#tool-decision-event), requiring Claude Code v2.1.214 or later. The parameters vary by tool:
  * For Bash tool: includes `bash_command`, `full_command`, `timeout`, `description`, `dangerouslyDisableSandbox`, and `git_commit_id` (the commit SHA, when a `git commit` command succeeds). The desktop app's workspace bash tool also reports `tool_name` as `Bash`, but includes only `bash_command`, `full_command`, and `timeout`
  * For MCP tools: includes `mcp_server_name`, `mcp_tool_name`
  * For Skill tool: includes `skill_name`
  * For Agent tool or legacy Task tool: includes `subagent_type`
* `tool_input` (when `OTEL_LOG_TOOL_DETAILS=1`): JSON-serialized tool arguments. Individual values over 512 characters are truncated, and the full payload is bounded to \~4 K characters. Applies to all tools including MCP tools.

#### API request event

Logged for each API request to Claude.

**Event Name**: `claude_code.api_request`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"api_request"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `model`: Model used (for example, "claude-sonnet-5")
* `cost_usd`: Estimated cost in USD
* `cost_usd_micros`: Estimated cost in millionths of a US dollar, emitted as an integer
* `duration_ms`: Request duration in milliseconds
* `input_tokens`: Number of input tokens
* `output_tokens`: Number of output tokens
* `cache_read_tokens`: Number of tokens read from cache
* `cache_creation_tokens`: Number of tokens used for cache creation
* `request_id`: Anthropic API request ID from the response's `request-id` header, such as `"req_011..."`. Present only when the API returns one.
* `client_request_id`: Client-generated UUID sent as the `x-client-request-id` request header; see the [event correlation attributes](#event-correlation-attributes) table for when it's present. Requires Claude Code v2.1.214 or later
* `speed`: `"fast"` or `"normal"`, indicating whether fast mode was active
* `query_source`: Subsystem that issued the request, such as `"repl_main_thread"`, `"compact"`, or a subagent name
* `effort`: [Effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) applied to the request: `"low"`, `"medium"`, `"high"`, `"xhigh"`, or `"max"`. Absent when the model doesn't support effort.
* `agent.name`, `skill.name`, `plugin.name`, `marketplace.name`, `mcp_server.name`, `mcp_tool.name`: Skill, plugin, agent, and MCP attribution for the request. See [Cost counter](#cost-counter) for definitions and redaction behavior.

#### API error event

Logged when an API request to Claude fails.

**Event Name**: `claude_code.api_error`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"api_error"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `model`: Model used (for example, "claude-sonnet-5")
* `error`: Error message
* `status_code`: HTTP status code as a number. Absent for non-HTTP errors such as connection failures.
* `duration_ms`: Request duration in milliseconds
* `attempt`: Total number of attempts made, including the initial request (`1` means no retries occurred)
* `request_id`: Anthropic API request ID from the response's `request-id` header, such as `"req_011..."`. Present only when the API returns one.
* `client_request_id`: Client-generated UUID sent as the `x-client-request-id` request header. Available even when a failure such as a timeout or connection error never produced a server `request_id`; see the [event correlation attributes](#event-correlation-attributes) table for when it's present. Requires Claude Code v2.1.214 or later
* `speed`: `"fast"` or `"normal"`, indicating whether fast mode was active
* `query_source`: Subsystem that issued the request, such as `"repl_main_thread"`, `"compact"`, or a subagent name
* `effort`: [Effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) applied to the request. Absent when the model doesn't support effort.
* `agent.name`, `skill.name`, `plugin.name`, `marketplace.name`, `mcp_server.name`, `mcp_tool.name`: Skill, plugin, agent, and MCP attribution for the request. See [Cost counter](#cost-counter) for definitions and redaction behavior.

#### API refusal event

Logged when an API request returns `stop_reason: "refusal"`. Refusals arrive on a successful response stream rather than as an HTTP error, so the `api_error` event doesn't fire for them. This event lets you track refusal frequency and group refusals by the same attributes as `api_request` and `api_error`.

**Event Name**: `claude_code.api_refusal`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"api_refusal"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `model`: Model identifier from the request
* `request_id`: Anthropic API request ID from the response's `request-id` header, such as `"req_011..."`. Present only when the API returns one.
* `query_source`: Subsystem that issued the request, such as `"repl_main_thread"`, `"compact"`, or a subagent name. See [`api_request`](#api-request-event) for definitions.
* `speed`: Either `"fast"` when [Fast mode](https://code.claude.com/docs/en/fast-mode) is active, or `"normal"`
* `attempt`: Retry attempt number. The first attempt is `1`.
* `effort`: [Effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) applied to the request. Absent when the model doesn't support effort.
* `server_fallback_hop`: `true` when the API's server-side model fallback already retried this refusal on a different model, so the user did not see this particular refusal. `false` when the request ended in a refusal. A single turn can emit both a `true` hop event and a later `false` final event when the fallback model also refuses.
* `has_category`: `true` when the API response carried a `stop_details.category` of `"cyber"`, `"bio"`, `"frontier_llm"`, or `"reasoning_extraction"`. `false` when the response carried no category or a value outside that set. Absent when `server_fallback_hop` is `true`, because hop blocks don't carry `stop_details`.
* `has_explanation`: `true` when the API response carried a `stop_details.explanation`, otherwise `false`. Absent when `server_fallback_hop` is `true`.
* `category`: The `stop_details.category` value from the API response. One of `"cyber"`, `"bio"`, `"frontier_llm"`, or `"reasoning_extraction"`. Only present when `OTEL_LOG_TOOL_DETAILS=1` is set and `has_category` is `true`.
* `agent.name`, `skill.name`, `plugin.name`, `marketplace.name`, `mcp_server.name`, `mcp_tool.name`: Skill, plugin, agent, and MCP attribution for the request. See [Cost counter](#cost-counter) for definitions and redaction behavior.

#### API request body event

Logged for each API request attempt when `OTEL_LOG_RAW_API_BODIES` is set. One event is emitted per attempt, so retries with adjusted parameters each produce their own event.

**Event Name**: `claude_code.api_request_body`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"api_request_body"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `body`: JSON-serialized Messages API request parameters, such as the system prompt, messages, and tools, truncated at the content limit (60 KB by default). Extended-thinking content in prior assistant turns is redacted. Emitted only in inline mode (`OTEL_LOG_RAW_API_BODIES=1`).
* `body_ref`: Absolute path to a `<dir>/<uuid>.request.json` file containing the untruncated body. Emitted only in file mode (`OTEL_LOG_RAW_API_BODIES=file:<dir>`).
* `body_length`: Untruncated body length. UTF-8 bytes when `OTEL_LOG_RAW_API_BODIES=file:<dir>`, or UTF-16 code units when `=1`
* `body_truncated`: `"true"` when inline truncation occurred. Absent in file mode and when no truncation occurred.
* `model`: Model identifier from the request parameters
* `query_source`: Subsystem that issued the request (for example, `"compact"`)

#### API response body event

Logged for each successful API response when `OTEL_LOG_RAW_API_BODIES` is set.

**Event Name**: `claude_code.api_response_body`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"api_response_body"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `body`: JSON-serialized Messages API response, including the id, content blocks, usage, and stop reason, truncated at the content limit (60 KB by default). Extended-thinking content is redacted. Emitted only in inline mode (`OTEL_LOG_RAW_API_BODIES=1`).
* `body_ref`: Absolute path to a `<dir>/<request_id>.response.json` file containing the untruncated body. Emitted only in file mode (`OTEL_LOG_RAW_API_BODIES=file:<dir>`).
* `body_length`: Untruncated body length. UTF-8 bytes when `OTEL_LOG_RAW_API_BODIES=file:<dir>`, or UTF-16 code units when `=1`
* `body_truncated`: `"true"` when inline truncation occurred. Absent in file mode and when no truncation occurred.
* `model`: Model identifier
* `query_source`: Subsystem that issued the request
* `request_id`: Anthropic API request ID from the response's `request-id` header, such as `"req_011..."`. Present only when the API returns one.

#### Tool decision event

Logged when a tool permission decision is made (accept/reject).

**Event Name**: `claude_code.tool_decision`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"tool_decision"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `tool_name`: Name of the tool (for example, "Read", "Edit", "Write", "NotebookEdit")
* `tool_use_id`: Unique identifier for this tool invocation. Matches the `tool_use_id` passed to hooks, allowing correlation between OTel events and hook-captured data.
* `decision`: Either `"accept"` or `"reject"`
* `tool_source`: Always present. The tool's provenance, as a closed set of CLI-authored values. Requires Claude Code v2.1.214 or later
  * `"builtin"`: the CLI's own tools
  * `"mcp"`: MCP servers generally
  * `"sdk_host_builtin_mcp"`: an in-process server built into Claude Desktop itself, in a session Claude Desktop owns. Claude Desktop owns a session it started from one of its own entrypoints, `claude-desktop`, `claude-desktop-3p`, or `local-agent`, when that session isn't a nested child; nested sessions, including sessions Claude Code itself spawns, report these servers as `"mcp"`
* `source`: Where the decision came from:
  * `"config"`: Decided automatically without prompting, based on project settings, allow or deny rules in the user's personal settings, enterprise managed policy, `--allowedTools` or `--disallowedTools` flags, the active permission mode, a session-scoped grant from an earlier prompt in the same interactive CLI session, or because the tool is inherently safe. The event doesn't indicate which of these sources matched. Claude Code also reports `"config"` when the permission prompt request itself fails, for example when the Agent SDK's [`canUseTool`](https://code.claude.com/docs/en/agent-sdk/typescript#canusetool) callback or the [`--permission-prompt-tool`](https://code.claude.com/docs/en/cli-reference#cli-flags) tool returns an invalid result, or when the input stream closes while the request is pending. Before v2.1.216, Claude Code reported these failures as `"user_reject"`.
  * `"hook"`: A `PreToolUse` or `PermissionRequest` hook returned the decision.
  * `"user_permanent"`: Emitted when the user chose "Yes, and don't ask again for ..." at a permission prompt, which saves an allow rule to their personal settings. In the interactive CLI this is emitted only for that choice itself; later calls that match the saved rule emit `"config"` instead. In Agent SDK or non-interactive `-p` sessions, both the initial choice and later rule matches emit `"user_permanent"`. Treated as an accept.
  * `"user_temporary"`: Emitted when the user chose "Yes" at a permission prompt for a one-time approval, or chose an option that grants access for the rest of the session on a file edit or read prompt. In the interactive CLI this is emitted only for the choice itself; later calls allowed by that session-scoped grant emit `"config"` instead. In Agent SDK or non-interactive `-p` sessions, both the choice and later matches emit `"user_temporary"`. Treated as an accept.
  * `"user_abort"`: Emitted when the user dismissed the permission prompt without answering. In Agent SDK and non-interactive `-p` sessions, this includes interrupting the turn while a `canUseTool` or `--permission-prompt-tool` permission request is pending; before v2.1.216, Claude Code reported that interrupt as `"user_reject"`. Treated as a reject.
  * `"user_reject"`: Emitted when the user chose "No" when prompted. In the interactive CLI this is emitted only for that choice itself; calls that match a deny rule in the user's personal settings emit `"config"` instead. In Agent SDK or non-interactive `-p` sessions, calls that match a deny rule in personal settings emit `"user_reject"`. Treated as a reject.
* `tool_parameters` (when `OTEL_LOG_TOOL_DETAILS=1`): JSON string containing tool-specific parameters. Same shape as the [Tool result event](#tool-result-event), minus post-execution fields such as `git_commit_id`. Values may differ from `tool_result` for an accepted call if the permission decision rewrites the tool input via `updatedInput`. Use this attribute to see which command was rejected when `decision` is `"reject"`.
  * For `"sdk_host_builtin_mcp"` tools: `mcp_server_name` and `mcp_tool_name` are included even when `OTEL_LOG_TOOL_DETAILS` is off, because the host application defines these names; without them, a rejected call to one of these built-in servers would be unattributable on the default stream. For user-configured MCP servers, the event's `tool_name` is always the literal `"mcp_tool"`, and the server and tool names appear only in `tool_parameters` with the flag on; argument content requires the flag everywhere. Requires Claude Code v2.1.214 or later
  * For Bash tool: includes `bash_command`, `full_command`, `timeout`, `description`, `dangerouslyDisableSandbox`. The desktop app's workspace bash tool also reports `tool_name` as `Bash`, but includes only `bash_command`, `full_command`, and `timeout`
  * For MCP tools: includes `mcp_server_name`, `mcp_tool_name`
  * For Skill tool: includes `skill_name`
  * For Agent tool or legacy Task tool: includes `subagent_type`

#### Permission mode changed event

Logged when the permission mode changes, for example from `Shift+Tab` cycling, exiting plan mode, or an auto mode gate check.

**Event Name**: `claude_code.permission_mode_changed`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"permission_mode_changed"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `from_mode`: The previous permission mode, for example `"default"`, `"plan"`, `"acceptEdits"`, `"auto"`, or `"bypassPermissions"`
* `to_mode`: The new permission mode
* `trigger`: What caused the change. One of `"shift_tab"`, `"exit_plan_mode"`, `"auto_gate_denied"`, or `"auto_opt_in"`. Absent when the transition originates from the SDK or bridge

#### Auth event

Logged when `/login` or `/logout` completes.

**Event Name**: `claude_code.auth`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"auth"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `action`: `"login"` or `"logout"`
* `success`: `"true"` or `"false"`
* `auth_method`: Authentication method, such as `"oauth"`
* `error_category`: Categorical error kind when the action failed. The raw error message is never included
* `status_code`: HTTP status code as a string when the action failed with an HTTP error

#### MCP server connection event

Logged when an MCP server connects, disconnects, or fails to connect.

**Event Name**: `claude_code.mcp_server_connection`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"mcp_server_connection"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `status`: `"connected"`, `"failed"`, or `"disconnected"`
* `transport_type`: Server transport, such as `"stdio"`, `"sse"`, or `"http"`
* `server_scope`: Scope the server is configured at, such as `"user"`, `"project"`, or `"local"`
* `duration_ms`: Connection attempt duration in milliseconds
* `error_code`: Error code when the connection failed
* `is_plugin`: `true` when the server is provided by a plugin, `false` otherwise
* `plugin_id_hash` (when `is_plugin` is `true`): Stable hash of the plugin name and marketplace, for grouping events by plugin without exposing the name. Claude Code computes it as described under the [plugin loaded event](#plugin-loaded-event)
* `plugin.name` (when `is_plugin` is `true`): Name of the plugin that provides the server. For third-party plugins this is the literal string `"third-party"` unless `OTEL_LOG_TOOL_DETAILS=1`; this protects third-party plugin names from appearing in logs by default. Plugins from official Anthropic sources are always identified by name. The `plugin_id_hash` and `plugin.name` attributes flow to your own monitoring backend and are not sent to Anthropic
* `server_name` (when `OTEL_LOG_TOOL_DETAILS=1`): Configured server name
* `error` (when `OTEL_LOG_TOOL_DETAILS=1`): Full error message when the connection failed

#### Internal error event

Logged when Claude Code catches an unexpected internal error. Only the error class name and an errno-style code are recorded. The error message and stack trace are never included. This event is not emitted when running against Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry, or when `DISABLE_ERROR_REPORTING` is set.

**Event Name**: `claude_code.internal_error`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"internal_error"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `error_name`: Error class name, such as `"TypeError"` or `"SyntaxError"`
* `error_code`: Node.js errno code such as `"ENOENT"` when present on the error

#### Plugin installed event

Logged when a plugin finishes installing, from both the `claude plugin install` CLI command and the interactive `/plugin` UI.

**Event Name**: `claude_code.plugin_installed`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"plugin_installed"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `marketplace.is_official`: `"true"` if the marketplace is an official Anthropic marketplace, `"false"` otherwise
* `install.trigger`: `"cli"` or `"ui"`
* `plugin.name`: Name of the installed plugin. For third-party marketplaces this is included only when `OTEL_LOG_TOOL_DETAILS=1`
* `plugin.version`: Plugin version when declared in the marketplace entry. For third-party marketplaces this is included only when `OTEL_LOG_TOOL_DETAILS=1`
* `marketplace.name`: Marketplace the plugin was installed from. For third-party marketplaces this is included only when `OTEL_LOG_TOOL_DETAILS=1`

#### Plugin loaded event

Logged once per enabled plugin at session start. Use this event to inventory which plugins are active across your fleet, as a complement to `plugin_installed` which records the install action itself.

**Event Name**: `claude_code.plugin_loaded`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"plugin_loaded"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `plugin.name`: name of the plugin. For plugins outside the official marketplace and built-in bundle the value is `"third-party"` unless `OTEL_LOG_TOOL_DETAILS=1`
* `marketplace.name`: marketplace the plugin was installed from, when known. Redacted to `"third-party"` under the same condition as `plugin.name`
* `plugin.version`: version from the plugin manifest. Included only when the name is not redacted and the manifest declares a version
* `plugin.scope`: provenance category for the plugin: `"official"`, `"community"`, `"org"`, `"user-local"`, or `"default-bundle"`
* `enabled_via`: how the plugin came to be enabled: `"default-enable"`, `"org-policy"`, `"admin-install"`, `"seed-mount"`, or `"user-install"`. The `"admin-install"` value means the plugin is set to required or auto-install for your organization in [**Organization settings > Plugins**](https://claude.ai/admin-settings/plugins). Before v2.1.246, Claude Code reported these plugins as `"user-install"` or `"seed-mount"`
* `plugin_id_hash`: deterministic hash of the plugin name and marketplace, sent only to your configured exporter. Lets you count the distinct third-party plugins loaded across your fleet without recording their names. For [plugins synced from claude.ai](https://code.claude.com/docs/en/plugins-reference#synced-plugins), Claude Code hashes the plugin name with the marketplace name that claude.ai reports for the plugin, or with `synced` otherwise. Before v2.1.246, Claude Code didn't use the marketplace name claude.ai reports in the hash
* `has_hooks`: whether the plugin contributes hooks
* `has_mcp`: whether the plugin contributes MCP servers
* `host_owned_mcp`: `true` when the SDK host manages this plugin's MCP connections and Claude Code skipped reading the plugin's MCP server configuration, `false` otherwise. Requires Claude Code v2.1.172 or later
* `skill_path_count`: number of skill directories the plugin declares
* `command_path_count`: number of command directories the plugin declares
* `agent_path_count`: number of agent directories the plugin declares
* `safe_mode`: `"true"` when the session was started with [`--safe-mode`](https://code.claude.com/docs/en/cli-reference), `"false"` otherwise. In safe mode this event reports configured inventory only; the plugin's commands, skills, hooks, and MCP servers don't load. Requires Claude Code v2.1.169 or later

#### Skill activated event

Logged when a skill is invoked, whether Claude calls it through the Skill tool or you run it as a `/` command.

**Event Name**: `claude_code.skill_activated`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"skill_activated"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `skill.name`: Name of the skill. For user-defined and third-party plugin skills the value is the placeholder `"custom_skill"` unless `OTEL_LOG_TOOL_DETAILS=1`
* `invocation_trigger`: How the skill was triggered (`"user-slash"`, `"claude-proactive"`, or `"nested-skill"`)
* `skill.source`: Where the skill was loaded from (for example, `"bundled"`, `"userSettings"`, `"projectSettings"`, `"plugin"`)
* `skill.kind`: `"workflow"` when the skill is a workflow skill. Absent otherwise
* `plugin.name` (when `OTEL_LOG_TOOL_DETAILS=1` or the plugin is from an official marketplace): Name of the owning plugin when the skill is provided by a plugin
* `marketplace.name` (when `OTEL_LOG_TOOL_DETAILS=1` or the plugin is from an official marketplace): Marketplace the owning plugin was installed from, when the skill is provided by a plugin

#### At mention event

Logged when Claude Code resolves an `@`-mention in a prompt. Not every mention emits an event: early-exit paths such as permission denials, oversized files, PDF reference attachments, and directory listing failures return without logging.

**Event Name**: `claude_code.at_mention`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"at_mention"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `mention_type`: Type of mention (`"file"`, `"directory"`, `"agent"`, `"mcp_resource"`, `"peer"`). The `"peer"` value means you mentioned [one of your other Claude Code sessions](https://code.claude.com/docs/en/cross-session-messaging). Requires Claude Code v2.1.232 or later
* `success`: Whether the mention resolved successfully (`"true"` or `"false"`)

#### API retries exhausted event

Logged once when an API request fails after more than one attempt. Emitted alongside the final `api_error` event.

**Event Name**: `claude_code.api_retries_exhausted`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"api_retries_exhausted"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `model`: Model used
* `error`: Final error message
* `status_code`: HTTP status code as a number. Absent for non-HTTP errors.
* `total_attempts`: Total number of attempts made
* `total_retry_duration_ms`: Total wall-clock time across all attempts
* `speed`: `"fast"` or `"normal"`

#### Hook registered event

Logged once per configured hook at session start. Use this event to inventory which hooks are active across your fleet, as a complement to the per-execution `hook_execution_start` and `hook_execution_complete` events.

**Event Name**: `claude_code.hook_registered`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"hook_registered"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `hook_event`: hook event type, such as `"PreToolUse"` or `"PostToolUse"`
* `hook_type`: hook implementation type: `"command"`, `"prompt"`, `"mcp_tool"`, `"http"`, or `"agent"`
* `hook_source`: where the hook is defined: `"userSettings"`, `"projectSettings"`, `"localSettings"`, `"flagSettings"`, `"policySettings"`, or `"pluginHook"`
* `safe_mode`: `"true"` when the session was started with [`--safe-mode`](https://code.claude.com/docs/en/cli-reference), `"false"` otherwise. Requires Claude Code v2.1.169 or later
* `hook_matcher` (when `OTEL_LOG_TOOL_DETAILS=1`): the matcher string from the hook configuration, when one is set
* `plugin.name` (when `hook_source` is `"pluginHook"`): name of the contributing plugin. For plugins outside the official marketplace and built-in bundle the value is `"third-party"` unless `OTEL_LOG_TOOL_DETAILS=1`
* `plugin_id_hash` (when `hook_source` is `"pluginHook"`): deterministic hash of the plugin name and marketplace, sent only to your configured exporter. Lets you count distinct contributing plugins without recording their names. Claude Code computes it as described under the [plugin loaded event](#plugin-loaded-event)

#### Hook execution start event

Logged when one or more hooks begin executing for a hook event.

**Event Name**: `claude_code.hook_execution_start`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"hook_execution_start"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `hook_event`: Hook event type, such as `"PreToolUse"` or `"PostToolUse"`
* `hook_name`: Full hook name including matcher, such as `"PreToolUse:Write"`
* `num_hooks`: Number of matching hook commands
* `managed_only`: `"true"` when only managed-policy hooks are permitted
* `hook_source`: `"policySettings"` or `"merged"`
* `safe_mode`: `"true"` when the session was started with [`--safe-mode`](https://code.claude.com/docs/en/cli-reference), `"false"` otherwise. Requires Claude Code v2.1.169 or later
* `hook_definitions`: JSON-serialized hook configuration. Included only when both detailed beta tracing and `OTEL_LOG_TOOL_DETAILS=1` are enabled

#### Hook execution complete event

Logged when all hooks for a hook event have finished.

**Event Name**: `claude_code.hook_execution_complete`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"hook_execution_complete"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `hook_event`: Hook event type
* `hook_name`: Full hook name including matcher
* `num_hooks`: Number of matching hook commands
* `num_success`: Count that completed successfully
* `num_blocking`: Count that returned a blocking decision
* `num_non_blocking_error`: Count that failed without blocking
* `num_cancelled`: Count cancelled before completion
* `total_duration_ms`: Wall-clock duration of all matching hooks
* `managed_only`: `"true"` when only managed-policy hooks are permitted
* `hook_source`: `"policySettings"` or `"merged"`
* `safe_mode`: `"true"` when the session was started with [`--safe-mode`](https://code.claude.com/docs/en/cli-reference), `"false"` otherwise. Requires Claude Code v2.1.169 or later
* `hook_definitions`: JSON-serialized hook configuration. Included only when both detailed beta tracing and `OTEL_LOG_TOOL_DETAILS=1` are enabled

#### Hook plugin metrics event

Logged when an official-marketplace plugin hook emits per-invocation metrics. Only plugins installed from an official Anthropic marketplace can emit these. Third-party marketplace plugins and user-configured hooks don't emit to this event. Use this event to monitor plugin behavior such as finding rates, costs, and durations from your own observability stack.

**Event Name**: `claude_code.hook_plugin_metrics`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"hook_plugin_metrics"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `plugin_id`: plugin identifier in `<name>@<marketplace>` form
* `hook_event`: hook event type that emitted the metrics
* Up to 20 plugin-emitted metric keys. Names match `^[a-z][a-z0-9_]\{0,39\}$`. Values are boolean or number.

#### Compaction event

Logged when conversation compaction completes.

**Event Name**: `claude_code.compaction`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"compaction"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `trigger`: `"auto"` or `"manual"`
* `success`: `"true"` or `"false"`
* `duration_ms`: Compaction duration
* `pre_tokens`: Approximate token count before compaction
* `post_tokens`: Approximate token count after compaction
* `error`: Error message when compaction failed
* `precompute_reuse`: Only set when `trigger` is `"manual"`. Auto-compaction can prepare a summary in the background before the context window fills, and this attribute records whether `/compact` reused that prepared summary. `"hit"` means it was reused; `"miss_custom_instructions"`, `"miss_hook"`, and `"miss_not_ready"` give the reason a fresh summary was computed instead. Requires Claude Code v2.1.153 or later

#### Subagent completed event

Logged when a [subagent](https://code.claude.com/docs/en/sub-agents) finishes and returns its result to the conversation that started it. Use it to roll up tool use and run time by subagent type; for token or cost rollups, use the [token counter](#token-counter) and [cost counter](#cost-counter) filtered to `query_source` `"subagent"`, since this event's `total_tokens` covers only the final request. The `"subagent"` category also counts requests from agent-based hooks, which emit no subagent event.

**Event Name**: `claude_code.subagent_completed`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"subagent_completed"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `agent_type`: The subagent type. Built-in agent names and agents from official-marketplace plugins appear verbatim; other agent names are replaced with `"custom"` unless `OTEL_LOG_TOOL_DETAILS=1` is set
* `agent.source`: Where the agent definition came from: `built-in`, `plugin`, or the settings source that defined a custom agent, such as `userSettings` or `projectSettings`
* `is_built_in`: Whether the subagent is a built-in agent type
* `is_async`: Whether the subagent ran in the [background](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background)
* `total_tokens`: The token footprint of the subagent's final API request: that one request's input, cache creation, cache read, and output tokens, roughly the subagent's context size at completion. Not a sum across the run
* `total_tool_uses`: Number of tool calls the subagent made across the whole run
* `duration_ms`: Run time in milliseconds
* `model`: The model the subagent was resolved to run
* `final_model`: The model that produced the subagent's final response, which differs from `model` after a mid-run switch such as a fallback. Requires Claude Code v2.1.212 or later
* `model_swapped`: Whether more than one model served the subagent's requests. Requires Claude Code v2.1.212 or later
* `plugin_id_hash`, `plugin.name`: Present for plugin-provided agents. Official-marketplace plugin names appear verbatim; other plugin names are replaced with `"third-party"` unless `OTEL_LOG_TOOL_DETAILS=1` is set

#### Feedback survey event

Logged when a session quality survey is shown or answered. See [Session quality surveys](https://code.claude.com/docs/en/data-usage#session-quality-surveys) for what the surveys collect and how to control them.

**Event Name**: `claude_code.feedback_survey`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"feedback_survey"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `event_type`: Survey lifecycle event, for example `"appeared"`, `"responded"`, or `"transcript_prompt_appeared"`
* `appearance_id`: Unique ID linking the events emitted for one survey instance
* `survey_type`: Which survey produced the event. `"session"` is the "How is Claude doing?" rating prompt
* `response`: The user's selection on `responded` events
* `enabled_via_override`: `true` when [`CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL`](https://code.claude.com/docs/en/env-vars) is set. Emitted as a boolean, not a string. Present on `session` survey events. Filter on this attribute to confirm the override is applied across a fleet

#### Retention sweep event

Logged once per run of the retention cleanup sweep, which deletes [session transcripts and other application data](https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically) older than the [`cleanupPeriodDays`](https://code.claude.com/docs/en/settings-reference#cleanupperioddays) setting. Claude Code runs the sweep in the background at most once per session, and a run that deletes nothing still emits the event. If Claude Code ran the sweep in any session on the same machine in the last 24 hours, it delays this session's sweep by at least 10 minutes, so a session that exits sooner emits nothing. When you run `claude -p` with `--bare`, Claude Code doesn't run the sweep and emits nothing.

Like every OTel event on this page, it goes only to the telemetry backend you configure. Requires Claude Code v2.1.227 or later.

When Claude Code can't safely determine the retention period, it pauses the sweep and emits the event with `result` set to `"skipped"` and a `skip_reason`. When [managed settings](https://code.claude.com/docs/en/server-managed-settings) set `cleanupPeriodDays`, the managed value pins the retention period and the sweep runs even when a settings file in a lower-priority scope is broken or invalid. When `managed-settings.json` itself can't be read, Claude Code still pauses the sweep unless the [managed tier](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources) supplies `cleanupPeriodDays` from elsewhere, such as server-managed settings or a `managed-settings.d/` drop-in beside the broken file. The deletion counter attributes are present only when `result` is `"complete"`.

**Event Name**: `claude_code.retention_sweep`

**Attributes**:

* All [standard attributes](#standard-attributes)
* `event.name`: `"retention_sweep"`
* `event.timestamp`: ISO 8601 timestamp
* `event.sequence`: monotonically increasing counter for ordering events within a session
* `result`: `"complete"` when the sweep ran, `"skipped"` when Claude Code paused it
* `period_days`: The `cleanupPeriodDays` value from merged settings, in days, or `30` when no source sets it. On skipped events, the value the sweep would have used, computed from the settings sources Claude Code could read
* `used_default`: `"true"` when no readable settings source sets `cleanupPeriodDays`, `"false"` otherwise. On complete events, `"true"` means the 30-day default applied
* `skip_reason`: Why Claude Code paused the sweep. Present only when `result` is `"skipped"`:
  * `"user_source_disabled"`: User settings are excluded, for example by the [`--setting-sources`](https://code.claude.com/docs/en/cli-reference#cli-flags) flag or the SDK's [`settingSources`](https://code.claude.com/docs/en/agent-sdk/typescript#options) option, and no enabled source provides `cleanupPeriodDays`
  * `"settings_unknowable"`: A settings file couldn't be read or parsed, so `cleanupPeriodDays` or `desktopSessionCleanupPeriodDays` may be set to a value Claude Code can't see
  * `"settings_invalid_key_set"`: Settings have validation errors and `cleanupPeriodDays` or `desktopSessionCleanupPeriodDays` is explicitly set, so falling back to the default could delete or keep files against that setting
* `transcripts_deleted`: Number of session transcripts, the top-level `~/.claude/projects/*/*.jsonl` files, that the sweep deleted
* `transcripts_exempted_desktop`: Number of transcripts past the retention period that the sweep kept under the [Claude Desktop and Cowork rule](https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically). These don't count toward `files_past_cutoff`. Requires Claude Code v2.1.248 or later
* `session_files_deleted`: Number of artifacts the session-files sweep deleted: transcripts plus per-session companion files such as sidecars, recordings, and tool results
* `artifacts_deleted`: Total items the sweep deleted across the data directories it covers, including the session files. Some sweeps count a whole removed directory tree as one item and a few cleanup passes don't contribute to the counter, so treat the value as a floor rather than an exact file count
* `files_retained_fresh`: Files inspected and left in place because they're still within the retention period. Only per-file sweeps count these, so the value is a floor; a nonzero value is the normal steady state
* `files_past_cutoff`: Files older than the retention period that the sweep failed to delete, for example because of a permission error or a file held open. A value above zero means files outlived the configured retention period; zero isn't proof that none did, because a failed removal of a whole directory counts toward `error_count` instead
* `error_count`: Number of errors the sweep encountered while listing or deleting files
