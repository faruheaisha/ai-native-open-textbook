---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/sessions/events.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/events.md"
sourceSha256: "f0e0c20f4abb8b0c003df5a7b79ed32e56eaa3f30efeb7e3c91931c3e4e1cb51"
pageSha256: "d57a593e469411207a086f3928fb2184b94943d765e38c8a6a6b25d408eb9085"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents User Tool Confirmation Event

- `BetaManagedAgentsUserToolConfirmationEvent object`

  A tool confirmation event that approves or denies a pending tool execution.

  - `type: "user.tool_confirmation"`

  - `id: string`

    Unique identifier for this event.

  - `result: "allow" or "deny"`

    UserToolConfirmationResult enum

    - `"allow"`

    - `"deny"`

  - `tool_use_id: string`

    The id of the `agent.tool_use` or `agent.mcp_tool_use` event this result corresponds to, which can be found in the last `session.status_idle` [event's](https://platform.claude.com/docs/en/api/beta/sessions/events/list#beta_managed_agents_session_requires_action.event_ids) `stop_reason.event_ids` field.

  - `deny_message: optional string or null`

    Optional message providing context for a 'deny' decision. Only allowed when result is 'deny'.

    maxLength: 10000

  - `processed_at: optional string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `session_thread_id: optional string or null`

    When set, the confirmation routes to this subagent's thread rather than the primary. Echo this from the `session_thread_id` on the `agent.tool_use` or `agent.mcp_tool_use` event that prompted the approval.
