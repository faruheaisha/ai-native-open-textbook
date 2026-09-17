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
pageSha256: "d8496383d6c5b85b6bbc0cd55278076a2d62b76d77efd18bb3119a81dea4ae76"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents User Tool Confirmation Event Params

- `BetaManagedAgentsUserToolConfirmationEventParams object`

  Parameters for confirming or denying a tool execution request.

  - `type: "user.tool_confirmation"`

  - `result: "allow" or "deny"`

    UserToolConfirmationResult enum

    - `"allow"`

    - `"deny"`

  - `tool_use_id: string`

    The id of the `agent.tool_use` or `agent.mcp_tool_use` event this result corresponds to, which can be found in the last `session.status_idle` [event's](https://platform.claude.com/docs/en/api/beta/sessions/events/list#beta_managed_agents_session_requires_action.event_ids) `stop_reason.event_ids` field.

    minLength: 1, maxLength: 128

  - `deny_message: optional string or null`

    Optional message providing context for a 'deny' decision. Only allowed when result is 'deny'.

    maxLength: 10000
