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
pageSha256: "d97a02a2e5d506389fd15696e00cbd84a07b43457d499914f13a2821e47c64f0"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Toolset20260401 Grep Input

- `BetaManagedAgentsAgentToolset20260401GrepInput object`

  Input payload for the `grep` tool. Searches file contents for
  a regular expression, returning matching lines.

  - `pattern: string`

    Regular expression to search for.

  - `path: optional string`

    Optional directory root to search under. Defaults to the
    runner's working directory.
