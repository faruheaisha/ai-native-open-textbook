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
pageSha256: "99dce7742bf8dc3a23638c191d110e40fcfc7b9e18ea95d007b9011d1e2f896a"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Span Outcome Evaluation Start Event

- `BetaManagedAgentsSpanOutcomeEvaluationStartEvent object`

  Emitted when an outcome evaluation cycle begins.

  - `type: "span.outcome_evaluation_start"`

  - `id: string`

    Unique identifier for this event.

  - `iteration: number`

    0-indexed revision cycle. 0 is the first evaluation; 1 is the re-evaluation after the first revision; etc.

    format: int32

  - `outcome_id: string`

    The `outc_` ID of the outcome being evaluated.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time
