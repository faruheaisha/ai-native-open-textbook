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
pageSha256: "b3d17ce19a4000b77fed657437aeaebf9c2b4e958e210b8e3a8a397ce53923a3"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Web Fetch Tool Config

- `BetaManagedAgentsWebFetchToolConfig object`

  Configuration for the web_fetch tool.

  - `type: "web_fetch"`

  - `enabled: boolean`

  - `name: "web_fetch"`

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

  - `allowed_domains: optional array of string`

  - `blocked_domains: optional array of string`

  - `max_content_tokens: optional number or null`

    format: int32
