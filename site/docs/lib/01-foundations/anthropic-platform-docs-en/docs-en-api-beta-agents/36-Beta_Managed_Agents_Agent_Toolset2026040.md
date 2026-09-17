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
pageSha256: "3ddbeb228e83544d4902325573d1d09f74aa50df526dd6bd3fc0dcda5faef395"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Toolset20260401 Read Input

- `BetaManagedAgentsAgentToolset20260401ReadInput object`

  Input payload for the `read` tool. Reads file contents
  relative to the runner's working directory (or absolute when
  the runner permits).

  - `file_path: string`

    Path of the file to read.

  - `view_range: optional array of number`

    Optional `[start_line, end_line]` 1-indexed inclusive
    range. When omitted the entire file is returned.
    `end_line` of 0 or negative means "to end of file".

    minItems: 2, maxItems: 2
