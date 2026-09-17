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
pageSha256: "053eb6967cb4782c678a0a9e0490e4708b2da448c226dbc902214e0d084539f7"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Custom Tool

- `BetaManagedAgentsCustomTool object`

  A custom tool as returned in API responses.

  - `type: "custom"`

  - `description: string`

  - `input_schema: BetaManagedAgentsCustomToolInputSchema`

    JSON Schema for custom tool input parameters.

    - `type: "object"`

    - `properties: optional map[unknown] or null`

    - `required: optional array of string or null`

  - `name: string`
