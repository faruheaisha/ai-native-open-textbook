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
pageSha256: "eb4e24cf9cc26b926cef802d4d17eaac2ac81a9db66afedbc65307ce0eed6004"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Span Outcome Evaluation Ongoing Event

- `BetaManagedAgentsSpanOutcomeEvaluationOngoingEvent object`

  Periodic heartbeat emitted while an outcome evaluation cycle is in progress. Distinguishes 'evaluation is actively running' from 'evaluation is stuck' between the corresponding `span.outcome_evaluation_start` and `span.outcome_evaluation_end` events.

  - `type: "span.outcome_evaluation_ongoing"`

  - `id: string`

    Unique identifier for this event.

  - `iteration: number`

    0-indexed revision cycle, matching the corresponding `span.outcome_evaluation_start`.

    format: int32

  - `outcome_id: string`

    The `outc_` ID of the outcome being evaluated.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time
