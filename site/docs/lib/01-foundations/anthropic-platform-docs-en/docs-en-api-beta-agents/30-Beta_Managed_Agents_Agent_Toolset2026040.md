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
pageSha256: "bea083b730a92b45481c24bfd09466c0bda85851ee08600bd02ae4df6c26aa67"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Toolset20260401

- `BetaManagedAgentsAgentToolset20260401 object`

  - `type: "agent_toolset_20260401"`

  - `configs: array of BetaManagedAgentsAgentToolConfig`

    - `BetaManagedAgentsBashToolConfig object`

      Configuration for the bash tool.

      - `type: "bash"`

      - `enabled: boolean`

      - `name: "bash"`

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

    - `BetaManagedAgentsEditToolConfig object`

      Configuration for the edit tool.

      - `type: "edit"`

      - `enabled: boolean`

      - `name: "edit"`

      - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsReadToolConfig object`

      Configuration for the read tool.

      - `type: "read"`

      - `enabled: boolean`

      - `name: "read"`

      - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsWriteToolConfig object`

      Configuration for the write tool.

      - `type: "write"`

      - `enabled: boolean`

      - `name: "write"`

      - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsGlobToolConfig object`

      Configuration for the glob tool.

      - `type: "glob"`

      - `enabled: boolean`

      - `name: "glob"`

      - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsGrepToolConfig object`

      Configuration for the grep tool.

      - `type: "grep"`

      - `enabled: boolean`

      - `name: "grep"`

      - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsWebFetchToolConfig object`

      Configuration for the web_fetch tool.

      - `type: "web_fetch"`

      - `enabled: boolean`

      - `name: "web_fetch"`

      - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

      - `allowed_domains: optional array of string`

      - `blocked_domains: optional array of string`

      - `max_content_tokens: optional number or null`

        format: int32

    - `BetaManagedAgentsWebSearchToolConfig object`

      Configuration for the web_search tool.

      - `type: "web_search"`

      - `enabled: boolean`

      - `name: "web_search"`

      - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

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

  - `default_config: BetaManagedAgentsAgentToolsetDefaultConfig`

    Resolved default configuration for agent tools.

    - `enabled: boolean`

    - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

      Permission policy for tool execution.

      - `BetaManagedAgentsAlwaysAllowPolicy object`

        Tool calls are automatically approved without user confirmation.

      - `BetaManagedAgentsAlwaysAskPolicy object`

        Tool calls require user confirmation before execution.

      - `BetaManagedAgentsAutoPolicy object`

        The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.
