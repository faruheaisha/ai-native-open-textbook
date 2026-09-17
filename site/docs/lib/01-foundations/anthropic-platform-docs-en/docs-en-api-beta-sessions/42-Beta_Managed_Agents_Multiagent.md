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
pageSha256: "c72a48cc88aa82e752d13ea6101c845b4df8356dca6e7976fd774337d196902a"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Multiagent

- `BetaManagedAgentsMultiagent object`

  Resolved coordinator topology with a concrete agent roster.

  - `type: "coordinator"`

  - `agents: array of BetaManagedAgentsAgentReference or BetaManagedAgentsAdvisor`

    Agents the coordinator may spawn as session threads, each resolved to a specific version.

    - `BetaManagedAgentsAgentReference object`

      A resolved agent reference with a concrete version.

      - `type: "agent"`

      - `id: string`

      - `version: number`

        format: int32

    - `BetaManagedAgentsAdvisor object`

      Platform advisor roster entry: a model the session's primary thread may consult mid-turn.

      - `type: "advisor"`

      - `model: string`

        The advisor model id.
