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
pageSha256: "9b8c50220a998775dc7632e2c409af43b1566cce5149141af18289b19bad2694"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents User Interrupt Event

- `BetaManagedAgentsUserInterruptEvent object`

  An interrupt event that pauses agent execution and returns control to the user.

  - `type: "user.interrupt"`

  - `id: string`

    Unique identifier for this event.

  - `processed_at: optional string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `session_thread_id: optional string or null`

    If absent, interrupts every non-archived thread in a multiagent session (or the primary alone in a single-agent session). If present, interrupts only the named thread.
