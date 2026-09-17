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
pageSha256: "f9a604327a996eba9f80bc8f3a33f186948b1a5a96668f37fdf85f5dc64c344c"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Span Model Request Start Event

- `BetaManagedAgentsSpanModelRequestStartEvent object`

  Emitted when a model request is initiated by the agent.

  - `type: "span.model_request_start"`

  - `id: string`

    Unique identifier for this event.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time
