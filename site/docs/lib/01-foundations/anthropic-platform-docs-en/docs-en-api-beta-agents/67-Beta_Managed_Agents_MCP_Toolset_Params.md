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
pageSha256: "c19497d05796c5b1e5f1f21ff6d90a49aa36c34ccb13abb1e312373e45a79637"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents MCP Toolset Params

- `BetaManagedAgentsMCPToolsetParams object`

  Configuration for tools from an MCP server defined in `mcp_servers`.

  - `type: "mcp_toolset"`

  - `mcp_server_name: string`

    Name of the MCP server. Must match a server name from the mcp_servers array. 1-255 characters.

    minLength: 1, maxLength: 255

  - `configs: optional array of BetaManagedAgentsMCPToolConfigParams`

    Per-tool configuration overrides.

    - `name: string`

      Name of the MCP tool to configure. 1-128 characters.

      minLength: 1, maxLength: 128

    - `enabled: optional boolean or null`

      Whether this tool is enabled. Overrides the `default_config` setting.

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

  - `default_config: optional BetaManagedAgentsMCPToolsetDefaultConfigParams or null`

    Default configuration for all tools from an MCP server.

    - `enabled: optional boolean or null`

      Whether tools are enabled by default. Defaults to true if not specified.

    - `permission_policy: optional BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy or null`

      Permission policy for tool execution.

      - `BetaManagedAgentsAlwaysAllowPolicy object`

        Tool calls are automatically approved without user confirmation.

      - `BetaManagedAgentsAlwaysAskPolicy object`

        Tool calls require user confirmation before execution.

      - `BetaManagedAgentsAutoPolicy object`

        The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.
