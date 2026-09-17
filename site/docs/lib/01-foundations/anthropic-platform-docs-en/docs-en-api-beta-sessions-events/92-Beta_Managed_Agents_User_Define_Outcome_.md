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
pageSha256: "3e1cb7e30b138437672dea1079392f4b34789b8de136cc144d140dd6bb5ac30a"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents User Define Outcome Event

- `BetaManagedAgentsUserDefineOutcomeEvent object`

  Echo of a `user.define_outcome` input event. Carries the server-generated `outcome_id` that subsequent `span.outcome_evaluation_*` events reference.

  - `type: "user.define_outcome"`

  - `id: string`

    Unique identifier for this event.

  - `description: string`

    What the agent should produce. Copied from the input event.

  - `max_iterations: number or null`

    Evaluate-then-revise cycles before giving up. Default 3, max 20.

    format: int32

  - `outcome_id: string`

    Server-generated `outc_` ID for this outcome. Referenced by `span.outcome_evaluation_*` events and the session's `outcome_evaluations` list.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `rubric: BetaManagedAgentsFileRubric or BetaManagedAgentsTextRubric`

    Rubric for grading the quality of an outcome.

    - `BetaManagedAgentsFileRubric object`

      Rubric referenced by a file uploaded via the Files API.

      - `type: "file"`

      - `file_id: string`

        ID of the rubric file.

    - `BetaManagedAgentsTextRubric object`

      Rubric content provided inline as text.

      - `type: "text"`

      - `content: string`

        Rubric content. Plain text or markdown — the grader treats it as freeform text.
