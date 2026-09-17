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
pageSha256: "17c78bc98f3e8099ac126e552b623fcdcc327f6603a07f850a27d060967cd08e"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Thread Context Compacted Event

- `BetaManagedAgentsAgentThreadContextCompactedEvent object`

  Indicates that context compaction (summarization) occurred during the session.

  - `type: "agent.thread_context_compacted"`

  - `id: string`

    Unique identifier for this event.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time
