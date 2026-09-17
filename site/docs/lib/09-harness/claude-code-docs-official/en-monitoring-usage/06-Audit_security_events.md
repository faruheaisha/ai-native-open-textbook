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
pageSha256: "0f3c37b24a33cc880e66799a04d5c8a5808fb17ea1424c60316cd03bb8bff4d2"
contentMode: "local-full"
zh: ""
---

## Audit security events

OpenTelemetry events are the audit data source for Claude Code activity. Every event carries identity attributes that tie tool calls, MCP activity, and permission decisions back to the user who triggered them. The OTLP logs exporter can deliver these events to any Security Information and Event Management (SIEM) platform with an OTLP receiver, or to an OpenTelemetry Collector that forwards to your SIEM.

### Attribute actions to users

The [standard attributes](#standard-attributes) on each event include the authenticated user's identity: `user.email`, `user.account_uuid`, `user.account_id`, and `organization.id` when signed in with a Claude account or, in a [cloud session](https://code.claude.com/docs/en/claude-code-on-the-web), when the session's own credentials carry them, plus `user.id` and the per-session `session.id`. `user.id` is an installation-scoped identifier, except on [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) sessions, where it is the IdP subject from the gateway-issued token.

MCP tool calls, Bash commands, and file edits are therefore attributed to the developer who started the session. Claude Code doesn't act under a separate service account; the identity recorded on each event is the developer's own Claude account, or the developer's IdP identity on a [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) session.

When Claude Code authenticates with a direct API key, or against Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry, there is no Claude account in the session and only `user.id` and `session.id` are populated. In these deployments, attach user identity yourself with `OTEL_RESOURCE_ATTRIBUTES`, set per user through the [managed settings](#administrator-configuration) file or a launch wrapper. Claude apps gateway sessions need none of this: the CLI stamps the IdP identity automatically, as described in [Standard attributes](#standard-attributes).

```bash theme={null}
export OTEL_RESOURCE_ATTRIBUTES="enduser.id=jdoe@example.com,enduser.directory_id=S-1-5-21-..."
```

### Audit MCP activity

To capture MCP server activity with full call detail, enable the logs exporter and set `OTEL_LOG_TOOL_DETAILS=1`. Each MCP operation then produces structured events that carry the server name, tool name, and call arguments alongside the standard identity attributes:

| Event                   | What it records for MCP                                                                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp_server_connection` | Server connect, disconnect, and connection failure with `server_name`, `transport_type`, `server_scope`, and error detail                                                                          |
| `tool_result`           | Each MCP tool call with `tool_name` and `mcp_server_scope`, a `tool_parameters` payload containing `mcp_server_name` and `mcp_tool_name`, and a `tool_input` payload containing the call arguments |
| `tool_decision`         | Whether the call was allowed or denied, whether the decision came from config, a hook, or the user, and a `tool_parameters` payload containing `mcp_server_name` and `mcp_tool_name`               |

Without `OTEL_LOG_TOOL_DETAILS`, these events drop the identifying detail:

* `tool_result`: keeps `mcp_server_scope` and a `tool_name` redacted to the literal `"mcp_tool"` for user-configured servers, omits argument content. For Claude Desktop's built-in servers, in sessions Claude Desktop owns, it also keeps the `mcp_server_name`/`mcp_tool_name` pair inside `tool_parameters`, the same host-authored exception as `tool_decision`, requiring Claude Code v2.1.214 or later
* `tool_decision`: keeps `tool_source` and a `tool_name` redacted to the literal `"mcp_tool"` for user-configured servers, omits argument content. For Claude Desktop's built-in servers, in sessions Claude Desktop owns, it also keeps the `mcp_server_name`/`mcp_tool_name` pair inside `tool_parameters`; `tool_source` and the name pair both require Claude Code v2.1.214 or later
* `mcp_server_connection`: omits `server_name` and the error message, but keeps `is_plugin`, `plugin_id_hash`, and `plugin.name`, with non-Anthropic plugin names redacted to the literal `"third-party"`, so plugin-provided servers remain distinguishable without detailed logging

### Map security questions to events

When building detection rules, look up the signal you want to monitor and query your backend for the corresponding event and attributes:

| Signal                                    | Event                                                                                 | Key attributes                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Tool call allowed or denied, and by what  | `tool_decision`                                                                       | `decision`, `source`, `tool_name`, `tool_parameters`         |
| Permission mode escalation                | `permission_mode_changed`                                                             | `from_mode`, `to_mode`, `trigger`                            |
| Policy hook blocked an action             | `hook_execution_complete`                                                             | `hook_event`, `num_blocking`                                 |
| Login, logout, and authentication failure | `auth`                                                                                | `action`, `success`, `error_category`                        |
| MCP server connect or failure             | `mcp_server_connection`                                                               | `status`, `server_name`, `is_plugin`, `error_code`           |
| Plugin installed and its source           | `plugin_installed`                                                                    | `plugin.name`, `marketplace.name`, `marketplace.is_official` |
| Commands run and files touched            | `tool_result` (executed) or `tool_decision` (rejected) with `OTEL_LOG_TOOL_DETAILS=1` | `tool_parameters`; `tool_input` (`tool_result` only)         |

Claude Code emits the raw event stream only. Anomaly detection, baselining, correlation across sessions, and alerting are the responsibility of your SIEM or observability backend.

### Send events to a SIEM

Point `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` at your SIEM's OTLP receiver, or at an OpenTelemetry Collector that forwards to your SIEM's native ingest API. The following managed-settings example exports events only, with full tool detail enabled for MCP and Bash auditing:

```json theme={null}
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_LOG_TOOL_DETAILS": "1",
    "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "https://siem.example.com:4318/v1/logs",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer your-siem-token"
  }
}
```

To confirm events arrive, submit a prompt in a session running under this configuration and check your SIEM for the `claude_code.user_prompt` event. If nothing arrives, run `claude --debug` and check the debug log for `[3P telemetry]` export errors.
