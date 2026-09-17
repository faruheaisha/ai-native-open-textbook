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
pageSha256: "2579f39cf8520a84dd135a72cc434eac77621b8dbb180cde625b2918c72ab8fb"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents MCP Toolset Default Config

- `BetaManagedAgentsMCPToolsetDefaultConfig object`

  Resolved default configuration for all tools from an MCP server.

  - `enabled: boolean`

  - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

    Permission policy for tool execution.

    - `BetaManagedAgentsAlwaysAllowPolicy object`

      Tool calls are automatically approved without user confirmation.

      - `type: "always_allow"`

    - `BetaManagedAgentsAlwaysAskPolicy object`

      Tool calls require user confirmation before execution.

      - `type: "always_ask"`

    - `BetaManagedAgentsAutoPolicy object`

      The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

      - `type: "auto"`
