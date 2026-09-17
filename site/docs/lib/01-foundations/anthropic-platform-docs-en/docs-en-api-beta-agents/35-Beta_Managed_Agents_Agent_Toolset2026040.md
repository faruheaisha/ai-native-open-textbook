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
pageSha256: "1a28b18035df7a6a2877b90debc9c17e6e1a95208e2295e090ecfcdaae1bfa2d"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Toolset20260401 Params

- `BetaManagedAgentsAgentToolset20260401Params object`

  Configuration for built-in agent tools. Use this to enable or disable groups of tools available to the agent.

  - `type: "agent_toolset_20260401"`

  - `configs: optional array of BetaManagedAgentsAgentToolConfigParams`

    Per-tool configuration overrides.

    - `BetaManagedAgentsBashToolConfigParams object`

      Configuration override for the bash tool.

      - `type: optional "bash"`

      - `name: "bash"`

        Must be "bash".

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

    - `BetaManagedAgentsEditToolConfigParams object`

      Configuration override for the edit tool.

      - `type: optional "edit"`

      - `name: "edit"`

        Must be "edit".

      - `enabled: optional boolean or null`

        Whether this tool is enabled and available to Claude. Overrides the default_config setting.

      - `permission_policy: optional BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy or null`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsReadToolConfigParams object`

      Configuration override for the read tool.

      - `type: optional "read"`

      - `name: "read"`

        Must be "read".

      - `enabled: optional boolean or null`

        Whether this tool is enabled and available to Claude. Overrides the default_config setting.

      - `permission_policy: optional BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy or null`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsWriteToolConfigParams object`

      Configuration override for the write tool.

      - `type: optional "write"`

      - `name: "write"`

        Must be "write".

      - `enabled: optional boolean or null`

        Whether this tool is enabled and available to Claude. Overrides the default_config setting.

      - `permission_policy: optional BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy or null`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

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

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsGrepToolConfigParams object`

      Configuration override for the grep tool.

      - `type: optional "grep"`

      - `name: "grep"`

        Must be "grep".

      - `enabled: optional boolean or null`

        Whether this tool is enabled and available to Claude. Overrides the default_config setting.

      - `permission_policy: optional BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy or null`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsWebFetchToolConfigParams object`

      Configuration override for the web_fetch tool.

      - `type: optional "web_fetch"`

      - `name: "web_fetch"`

        Must be "web_fetch".

      - `allowed_domains: optional array of string`

        Only fetch URLs whose host is one of these domains or a subdomain of one. Each entry is a plain hostname like "docs.example.com" (no scheme, port, or path). At most 64 entries; an empty list is rejected (omit the field instead). Cannot be combined with blocked_domains.

      - `blocked_domains: optional array of string`

        Never fetch URLs whose host is one of these domains or a subdomain of one. Each entry is a plain hostname like "ads.example.com" (no scheme, port, or path). At most 64 entries; an empty list is rejected (omit the field instead). Cannot be combined with allowed_domains.

      - `enabled: optional boolean or null`

        Whether this tool is enabled and available to Claude. Overrides the default_config setting.

      - `max_content_tokens: optional number or null`

        Maximum number of tokens of fetched text content to include in context per call. Does not apply to binary content such as PDFs.

        format: int32

      - `permission_policy: optional BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy or null`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

    - `BetaManagedAgentsWebSearchToolConfigParams object`

      Configuration override for the web_search tool.

      - `type: optional "web_search"`

      - `name: "web_search"`

        Must be "web_search".

      - `allowed_domains: optional array of string`

        Only return search results whose host is one of these domains or a subdomain of one. Each entry is a plain hostname like "docs.example.com" (no scheme or port; an optional path suffix is accepted). At most 64 entries; an empty list is rejected (omit the field instead). Cannot be combined with blocked_domains.

      - `blocked_domains: optional array of string`

        Never return search results whose host is one of these domains or a subdomain of one. Each entry is a plain hostname like "ads.example.com" (no scheme or port; an optional path suffix is accepted). At most 64 entries; an empty list is rejected (omit the field instead). Cannot be combined with allowed_domains.

      - `enabled: optional boolean or null`

        Whether this tool is enabled and available to Claude. Overrides the default_config setting.

      - `permission_policy: optional BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy or null`

        Permission policy for tool execution.

        - `BetaManagedAgentsAlwaysAllowPolicy object`

          Tool calls are automatically approved without user confirmation.

        - `BetaManagedAgentsAlwaysAskPolicy object`

          Tool calls require user confirmation before execution.

        - `BetaManagedAgentsAutoPolicy object`

          The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

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

  - `default_config: optional BetaManagedAgentsAgentToolsetDefaultConfigParams or null`

    Default configuration for all tools in a toolset.

    - `enabled: optional boolean or null`

      Whether tools are enabled and available to Claude by default. Defaults to true if not specified.

    - `permission_policy: optional BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy or null`

      Permission policy for tool execution.

      - `BetaManagedAgentsAlwaysAllowPolicy object`

        Tool calls are automatically approved without user confirmation.

      - `BetaManagedAgentsAlwaysAskPolicy object`

        Tool calls require user confirmation before execution.

      - `BetaManagedAgentsAutoPolicy object`

        The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.
