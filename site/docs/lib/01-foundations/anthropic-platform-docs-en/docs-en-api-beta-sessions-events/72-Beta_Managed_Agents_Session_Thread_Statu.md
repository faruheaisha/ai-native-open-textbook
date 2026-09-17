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
pageSha256: "2dcfa5202dd3c06ed9ced738f2d44c42eab3f159343bf0794a43a4b50dd1746d"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Thread Status Rescheduled Event

- `BetaManagedAgentsSessionThreadStatusRescheduledEvent object`

  A session thread hit a transient error and is retrying automatically. Emitted on the thread's own stream and cross-posted to the primary stream for child threads.

  - `type: "session.thread_status_rescheduled"`

  - `id: string`

    Unique identifier for this event.

  - `agent_name: string`

    Name of the agent the thread runs.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `session_thread_id: string`

    Public sthr_ ID of the thread that is retrying.
