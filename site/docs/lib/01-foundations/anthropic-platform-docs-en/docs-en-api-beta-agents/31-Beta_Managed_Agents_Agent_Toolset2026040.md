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
pageSha256: "775fb714f2e0b416fc6a5fb3de8433d87afaf2fd06586592976666b75f0ce1ad"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Toolset20260401 Bash Input

- `BetaManagedAgentsAgentToolset20260401BashInput object`

  Input payload for the `bash` tool of the
  `agent_toolset_20260401` toolset. All fields are optional;
  a normal invocation supplies `command`, while `restart=true`
  (with no `command`) reboots the runner-side bash session.

  - `command: optional string`

    Shell command to execute. Omit only when `restart` is true.

  - `restart: optional boolean`

    When true, restart the persistent bash session instead of
    running a command. Subsequent calls without `restart` will
    run against the fresh session.

  - `timeout_ms: optional number`

    Per-call timeout in milliseconds. Defaults to the
    runner-wide tool timeout when omitted or zero.

    minimum: 0
