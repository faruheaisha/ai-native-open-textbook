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
pageSha256: "76c0c76fe510ea93083fe9cfeb52024d3a6ca2f11c53e3c8f9230a401cabdd4f"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Multiagent Coordinator

- `BetaManagedAgentsMultiagentCoordinator object`

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
