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
sourceRel: "docs/en/api/beta/sessions.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions.md"
sourceSha256: "e4a8446bb6d4b0344d7f996b22b5ecbd47536df1d7800ee2865d8dc67a16abc2"
pageSha256: "215406a7a5451ce8c290af33a2a9ad6bc647537e2e531dd48486466892132300"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Outcome Evaluation Resource

- `BetaManagedAgentsOutcomeEvaluationResource object`

  Evaluation state for a single outcome defined via a `define_outcome` event.

  - `type: "outcome_evaluation"`

  - `completed_at: string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `description: string`

    What the agent should produce.

  - `explanation: string or null`

    Grader's verdict text from the most recent evaluation. For `satisfied`, explains why criteria are met; for `needs_revision` (intermediate), what's missing; for `failed`, why unrecoverable.

  - `iteration: number`

    0-indexed revision cycle the outcome is currently on.

    format: int32

  - `outcome_id: string`

    Server-generated outc_ ID for this outcome.

  - `result: string`

    Current evaluation state. `pending` before the agent begins work; `running` while producing or revising; `evaluating` while the grader scores; `satisfied`/`max_iterations_reached`/`failed`/`interrupted` are terminal.
