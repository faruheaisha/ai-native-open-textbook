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
sourceRel: "docs/en/managed-agents/events-and-streaming.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/events-and-streaming.md"
sourceSha256: "b681673ea44583d365ff7c008a149752bfe4251979591e4b054076f37e5ece85"
pageSha256: "f2c30e67dc4d3a19fa2efb2594f3abcbb9a7a4ecc2a1c197bbd32d67fb4f14f1"
contentMode: "local-full"
zh: ""
---

## Event types

Events flow in two directions.

* **User events** and **system events** are what you send to the agent: `user.*` events start a session and steer it as it progresses; `system.message` appends system-level context that applies to the accompanying turn and all subsequent turns.
* **Session events**, **span events**, and **agent events** are sent to you for observability into your session state and agent progress. Stream connections that opt in also receive [event deltas](https://platform.claude.com/docs/en/managed-agents/events-and-streaming#event-deltas).

Session, span, agent, user, and system event type strings follow a `\{domain\}.\{action\}` naming convention. The stream-only delta preview events (`event_start`, `event_delta`) are the exception. See [Event types](https://platform.claude.com/docs/en/managed-agents/reference#event-types) in the reference for the full catalog. [Webhook event types](https://platform.claude.com/docs/en/managed-agents/webhooks#supported-event-types) are separate, and some of their names differ from the stream's (for example, `session.status_idled` rather than `session.status_idle`).

Every persisted event includes a `processed_at` timestamp set when the event finishes processing. On events you send, `processed_at` is null while the event is still queued behind earlier events. The exceptions are `user.define_outcome`, `user.custom_tool_result`, and `user.tool_result`, which are processed on receipt and echoed back with `processed_at` already populated.
