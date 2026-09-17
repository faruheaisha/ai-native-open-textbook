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
pageSha256: "a1d9142247422eaf355330751c7af7c5afb6fe08f5448a3887cc54a68e5182f9"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Web Search Tool Config

- `BetaManagedAgentsWebSearchToolConfig object`

  Configuration for the web_search tool.

  - `type: "web_search"`

  - `enabled: boolean`

  - `name: "web_search"`

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

  - `user_location: optional BetaManagedAgentsUserLocation or null`

    Approximate user location for search result localization.

    - `type: "approximate"`

      Location precision. Only "approximate" is supported.

    - `city: optional string or null`

      City name.

      minLength: 1, maxLength: 255

    - `country: optional string or null`

      Two-letter ISO 3166-1 country code, uppercase.

    - `region: optional string or null`

      Region or state name.

      minLength: 1, maxLength: 255

    - `timezone: optional string or null`

      IANA timezone identifier, e.g. "America/Los_Angeles".

      minLength: 1, maxLength: 255
