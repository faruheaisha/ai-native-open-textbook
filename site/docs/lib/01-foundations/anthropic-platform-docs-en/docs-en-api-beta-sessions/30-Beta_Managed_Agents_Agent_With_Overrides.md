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
sourceRel: "docs/en/api/beta/sessions.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions.md"
sourceSha256: "e4a8446bb6d4b0344d7f996b22b5ecbd47536df1d7800ee2865d8dc67a16abc2"
pageSha256: "6985557527c3a94ae586dd18babcb5dae4ba7c449cd799f15816bcd9b0e5f1cb"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent With Overrides Params

- `BetaManagedAgentsAgentWithOverridesParams object`

  Reference to an `agent` plus optional configuration overrides. Each provided field replaces the agent's value for the caller's use; the agent resource is unchanged.

  - `type: "agent_with_overrides"`

  - `id: string`

    The `agent` ID.

    minLength: 1, maxLength: 128

  - `mcp_servers: optional array of BetaManagedAgentsURLMCPServerParams`

    Replacement MCP server list. Full replacement: the provided array becomes the MCP servers. Send an empty array to clear; omit to preserve the agent's servers.

    - `type: "url"`

    - `name: string`

      Unique name for this server, referenced by mcp_toolset configurations. 1-255 characters.

      minLength: 1, maxLength: 255

    - `url: string`

      Endpoint URL for the MCP server.

      maxLength: 2048

  - `model: optional BetaManagedAgentsModel or BetaManagedAgentsModelConfigParams`

    Replacement model. Accepts the model string, e.g. `claude-opus-5`, or a `model_config` object. Omit to use the agent's model.

    - `BetaManagedAgentsModel = "claude-fable-5-1" or "claude-sonnet-5" or "claude-fable-5" or 11 more or string`

      The model that will power your agent.

      See [models](https://docs.anthropic.com/en/docs/models-overview) for additional details and options.

      - `"claude-fable-5-1" or "claude-sonnet-5" or "claude-fable-5" or 11 more`

        The model that will power your agent.

        See [models](https://docs.anthropic.com/en/docs/models-overview) for additional details and options.

        - `"claude-fable-5-1"`

          Frontier intelligence for ambitious tasks across coding, scientific discovery, and enterprise workflows

        - `"claude-sonnet-5"`

          High-performance model for coding and agents

        - `"claude-fable-5"`

          Next generation of intelligence for the hardest knowledge work and coding problems

        - `"claude-opus-5"`

          Powerful intelligence for long-running agents and coding

        - `"claude-opus-4-8"`

          Powerful intelligence for long-running agents and coding

        - `"claude-opus-4-7"`

          Powerful intelligence for long-running agents and coding

        - `"claude-opus-4-6"`

          Powerful intelligence for long-running agents and coding

        - `"claude-sonnet-4-6"`

          Best combination of speed and intelligence

        - `"claude-haiku-4-5"`

          Fastest model with near-frontier intelligence

        - `"claude-haiku-4-5-20251001"`

          Fastest model with near-frontier intelligence

        - `"claude-opus-4-5"`

          Powerful intelligence for long-running agents and coding

        - `"claude-opus-4-5-20251101"`

          Powerful intelligence for long-running agents and coding

        - `"claude-sonnet-4-5"`

          High-performance model for agents and coding

        - `"claude-sonnet-4-5-20250929"`

          High-performance model for agents and coding

      - `string`

    - `BetaManagedAgentsModelConfigParams object`

      An object that defines additional configuration control over model use

      - `id: BetaManagedAgentsModel`

        The model that will power your agent.

        See [models](https://docs.anthropic.com/en/docs/models-overview) for additional details and options.

      - `effort: optional "low" or "medium" or "high" or 2 more or BetaManagedAgentsEffortLow or BetaManagedAgentsEffortMedium or 3 more or null`

        How hard Claude works on each inference call. Accepts a bare level string (`"high"`) or `\{"type": "high"\}`. On create, omitting it resolves the per-model default; on update, omitting it leaves the stored value unchanged.

        - `BetaManagedAgentsEffortLevel = "low" or "medium" or "high" or 2 more`

          How hard Claude works on each turn. Higher levels favor reasoning depth over latency. Not all models accept every level; invalid combinations are rejected at create time.

          - `"low"`

          - `"medium"`

          - `"high"`

          - `"xhigh"`

          - `"max"`

        - `BetaManagedAgentsEffortLow object`

          Low effort. Favors latency over reasoning depth.

          - `type: "low"`

        - `BetaManagedAgentsEffortMedium object`

          Medium effort. Balances latency and reasoning depth.

          - `type: "medium"`

        - `BetaManagedAgentsEffortHigh object`

          High effort. Favors reasoning depth.

          - `type: "high"`

        - `BetaManagedAgentsEffortXhigh object`

          Extra-high effort. Not all models accept this level.

          - `type: "xhigh"`

        - `BetaManagedAgentsEffortMax object`

          Maximum effort. Favors reasoning depth over latency.

          - `type: "max"`

      - `inference_geo: optional string or null`

        Geographic region for model inference. When unset, requests fall through to the workspace's default_inference_geo. On update, `model` is whole-object replacement — omitting inference_geo clears it.

      - `speed: optional "standard" or "fast" or null`

        Inference speed mode. `fast` provides significantly faster output token generation at premium pricing. Not all models support `fast`; invalid combinations are rejected at create time.

        - `"standard"`

        - `"fast"`

  - `skills: optional array of BetaManagedAgentsSkillParams`

    Replacement skill list. Full replacement: the provided array becomes the skills. Send an empty array to clear; omit to preserve the agent's skills.

    - `BetaManagedAgentsAnthropicSkillParams object`

      An Anthropic-managed skill.

      - `type: "anthropic"`

      - `skill_id: string`

        Identifier of the Anthropic skill (e.g., "xlsx").

        minLength: 1, maxLength: 64

      - `version: optional string or null`

        Version to pin. Defaults to latest if omitted.

        minLength: 1, maxLength: 64

    - `BetaManagedAgentsCustomSkillParams object`

      A user-created custom skill.

      - `type: "custom"`

      - `skill_id: string`

        Tagged ID of the custom skill (e.g., "skill_01XJ5...").

        minLength: 1, maxLength: 64

      - `version: optional string or null`

        Version to pin. Defaults to latest if omitted.

        minLength: 1, maxLength: 64

  - `system: optional string or null`

    Replacement system prompt. Up to 100,000 characters. Set to null to clear the agent's system prompt; omit to preserve it.

    maxLength: 100000

  - `tools: optional array of BetaManagedAgentsAgentToolset20260401Params or BetaManagedAgentsMCPToolsetParams or BetaManagedAgentsCustomToolParams`

    Replacement tool list. Full replacement: the provided array becomes the tool configuration. Send an empty array to clear; omit to preserve the agent's tools.

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

          - `BetaManagedAgentsAlwaysAskPolicy object`

            Tool calls require user confirmation before execution.

          - `BetaManagedAgentsAutoPolicy object`

            The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

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

    - `BetaManagedAgentsCustomToolParams object`

      A custom tool that is executed by the API client rather than the agent. When the agent calls this tool, an `agent.custom_tool_use` event is emitted and the session goes idle, waiting for the client to provide the result via a `user.custom_tool_result` event.

      - `type: "custom"`

      - `description: string`

        Description of what the tool does, shown to the agent to help it decide when to use the tool.

        minLength: 1

      - `input_schema: BetaManagedAgentsCustomToolInputSchema`

        JSON Schema for custom tool input parameters.

        - `type: "object"`

        - `properties: optional map[unknown] or null`

        - `required: optional array of string or null`

      - `name: string`

        Unique name for the tool. 1-128 characters; letters, digits, underscores, and hyphens.

        minLength: 1, maxLength: 128

  - `version: optional number`

    The specific `agent` version to use. Omit to use the latest version.

    format: int32
