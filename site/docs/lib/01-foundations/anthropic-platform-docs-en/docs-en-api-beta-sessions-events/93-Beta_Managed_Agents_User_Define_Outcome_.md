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
pageSha256: "c170eb77e69b69c1a6a0299acba3a3789ebf94286d5ed444c5cb31613549d492"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents User Define Outcome Event Params

- `BetaManagedAgentsUserDefineOutcomeEventParams object`

  Parameters for defining an outcome the agent should work toward. The agent begins work on receipt.

  - `type: "user.define_outcome"`

  - `description: string`

    What the agent should produce. This is the task specification.

  - `rubric: BetaManagedAgentsFileRubricParams or BetaManagedAgentsTextRubricParams`

    Rubric for grading the quality of an outcome.

    - `BetaManagedAgentsFileRubricParams object`

      Rubric referenced by a file uploaded via the Files API.

      - `type: "file"`

      - `file_id: string`

        ID of the rubric file.

    - `BetaManagedAgentsTextRubricParams object`

      Rubric content provided inline as text.

      - `type: "text"`

      - `content: string`

        Rubric content. Plain text or markdown — the grader treats it as freeform text. Maximum 262144 characters.

        maxLength: 262144

  - `max_iterations: optional number or null`

    Eval→revision cycles before giving up. Default 3, max 20.

    format: int32
