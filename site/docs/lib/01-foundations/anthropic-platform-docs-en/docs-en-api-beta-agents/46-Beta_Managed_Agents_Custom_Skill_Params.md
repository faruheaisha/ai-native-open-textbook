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
sourceRel: "docs/en/api/beta/agents.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/agents.md"
sourceSha256: "2701c99a56aa4313e4c59f6eb788100b1488b7b05d3135e992270e808de5849c"
pageSha256: "65a159f2ff5e60ae99fd7cfcd6c110d4b8c55496e2b26351cf755fcd54f67b92"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Custom Skill Params

- `BetaManagedAgentsCustomSkillParams object`

  A user-created custom skill.

  - `type: "custom"`

  - `skill_id: string`

    Tagged ID of the custom skill (e.g., "skill_01XJ5...").

    minLength: 1, maxLength: 64

  - `version: optional string or null`

    Version to pin. Defaults to latest if omitted.

    minLength: 1, maxLength: 64
