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
pageSha256: "166a0436c1c2cea82a080d376caa48a2af6a9590eb17d5800604a604904ea12c"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Custom Tool Use Event

- `BetaManagedAgentsAgentCustomToolUseEvent object`

  Event emitted when the agent calls a custom tool. The session goes idle until the client sends a `user.custom_tool_result` event with the result.

  - `type: "agent.custom_tool_use"`

  - `id: string`

    Unique identifier for this event.

  - `input: map[unknown]`

    Input parameters for the tool call.

  - `name: string`

    Name of the custom tool being called.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `session_thread_id: optional string or null`

    When set, this event was cross-posted from a subagent's thread to surface its custom tool use on the primary thread's stream. Empty on the thread's own events. Echo this on a `user.custom_tool_result` event to route the result back.
