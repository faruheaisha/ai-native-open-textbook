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
pageSha256: "a6b2c5c8a5c5604bf3afa133c6148893b921b6f3256f375972a82855e917604f"
contentMode: "local-full"
zh: ""
---

## Security and privacy

* OpenTelemetry export to your backend is opt-in and requires explicit configuration. For Anthropic's separate operational telemetry and how to disable it, see [Data usage](https://code.claude.com/docs/en/data-usage#telemetry-services)
* Raw file contents and code snippets are not included in metrics or events. Trace spans are a separate data path: see the `OTEL_LOG_TOOL_CONTENT` bullet below
* When authenticated via OAuth, `user.email` is included in telemetry attributes, sent only to the OTel endpoint you configure, never to Anthropic. If this is a concern for your organization, work with your telemetry backend to filter or redact this field
* User prompt content is not collected by default. Only prompt length is recorded. To include prompt content, set `OTEL_LOG_USER_PROMPTS=1`
* Assistant response text is not collected by default. Only response length is recorded. To include response text, set `OTEL_LOG_ASSISTANT_RESPONSES=1`. Like all OpenTelemetry data from Claude Code, the response text is sent only to the OTel endpoint you configure, never to Anthropic. When this variable is unset, `OTEL_LOG_USER_PROMPTS` is used as a fallback, so set `OTEL_LOG_ASSISTANT_RESPONSES=0` if you want prompt content without response content
* Tool input arguments and parameters are not logged by default. To include them, set `OTEL_LOG_TOOL_DETAILS=1`. For Claude Desktop's built-in servers, in sessions Claude Desktop owns, `tool_decision` and `tool_result` carry the `mcp_server_name`/`mcp_tool_name` pair, host-authored names rather than argument content, even with the flag off. The exception requires Claude Code v2.1.214 or later. This data is sent only to the OTEL endpoint you configure, never to Anthropic. Arguments may still contain sensitive values, so configure your telemetry backend to filter or redact these attributes as needed. When enabled:
  * `tool_result` and `tool_decision` events include a `tool_parameters` attribute with Bash commands, MCP server and tool names, and skill names. Fields such as `full_command` are emitted untruncated
  * `tool_result` events additionally include a `tool_input` attribute with file paths, URLs, search patterns, and other arguments. Individual values over 512 characters are truncated and the total is bounded to \~4 K characters
  * `user_prompt` events include the verbatim `command_name` for custom, plugin, and MCP commands
  * Trace spans include the same `tool_input` attribute and input-derived attributes such as `file_path`, with the same truncation as `tool_input`
* Tool input and output content is not logged in trace spans by default. To include it, set `OTEL_LOG_TOOL_CONTENT=1`. When enabled, span events include full tool input and output content truncated at the content limit (60 KB by default) per attribute. This can include raw file contents from Read tool results and Bash command output. Configure your telemetry backend to filter or redact these attributes as needed
* Raw Anthropic Messages API request and response bodies are not logged by default. To include them, set `OTEL_LOG_RAW_API_BODIES` in your shell, user settings, or managed settings. It's ignored in [project and local settings](https://code.claude.com/docs/en/settings-reference#variables-claude-code-ignores-in-env). The bodies contain the full conversation history, including the system prompt, every prior user and assistant turn, and tool results, so enabling this implies consent to everything the other `OTEL_LOG_*` content flags would reveal. Claude Code always redacts Claude's extended-thinking content from these bodies, regardless of other settings. The value you set determines how Claude Code delivers the bodies:
  * With `=1`, Claude Code emits `api_request_body` and `api_response_body` log events for each API call. The events' `body` attribute carries the JSON-serialized payload, truncated at the content limit (60 KB by default)
  * With `=file:<dir>`, Claude Code writes untruncated bodies to `.request.json` and `.response.json` files under that directory, and the events carry a `body_ref` path instead of the inline body. Ship the directory with a log collector or sidecar rather than through the telemetry stream
