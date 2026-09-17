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
pageSha256: "bd361404a17ba37a18616e268dec4d59582622c9f16d85d3ffbfe6b945bece11"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Thread Created Event

- `BetaManagedAgentsSessionThreadCreatedEvent object`

  Emitted when a subagent is spawned as a new thread. Written to the parent thread's output stream so clients observing the session see child creation.

  - `type: "session.thread_created"`

  - `id: string`

    Unique identifier for this event.

  - `agent_name: string`

    Name of the callable agent the thread runs.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `session_thread_id: string`

    Public `sthr_` ID of the newly created thread.
