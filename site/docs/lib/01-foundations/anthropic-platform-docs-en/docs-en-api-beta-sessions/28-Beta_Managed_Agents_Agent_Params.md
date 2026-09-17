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
pageSha256: "ebe873979dc68f6611135a930193e0063394208e48781c03c4f0d2ece07b40fb"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Params

- `BetaManagedAgentsAgentParams object`

  Specification for an Agent. Provide a specific `version` or use the short-form `agent="agent_id"` for the most recent version

  - `type: "agent"`

  - `id: string`

    The `agent` ID.

    minLength: 1, maxLength: 128

  - `version: optional number`

    The specific `agent` version to use. Omit to use the latest version. Must be at least 1 if specified.

    format: int32
