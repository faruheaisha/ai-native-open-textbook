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
pageSha256: "5fe55af7c85f58c0f4c05706e07240570bae2bb4eb1127a9968e0a7c1b6202c3"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Status Rescheduled Event

- `BetaManagedAgentsSessionStatusRescheduledEvent object`

  Indicates the session is recovering from an error state and is rescheduled for execution.

  - `type: "session.status_rescheduled"`

  - `id: string`

    Unique identifier for this event.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time
