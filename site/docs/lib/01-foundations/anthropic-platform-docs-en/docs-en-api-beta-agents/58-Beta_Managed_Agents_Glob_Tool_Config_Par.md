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
pageSha256: "4921376462d0ab118351def71565b8398243d4f97be82cb0a94e5c111ab095bb"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Glob Tool Config Params

- `BetaManagedAgentsGlobToolConfigParams object`

  Configuration override for the glob tool.

  - `type: optional "glob"`

  - `name: "glob"`

    Must be "glob".

  - `enabled: optional boolean or null`

    Whether this tool is enabled and available to Claude. Overrides the default_config setting.

  - `permission_policy: optional BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy or null`

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
