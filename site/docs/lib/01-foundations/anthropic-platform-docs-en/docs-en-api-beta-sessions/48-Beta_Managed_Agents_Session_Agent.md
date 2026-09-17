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
pageSha256: "d200659a624c3e946245a064e399abc3963832b1617ca6dbc6b1f868e62cb5c0"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Agent

- `BetaManagedAgentsSessionAgent object`

  Resolved `agent` definition for a `session`. Snapshot of the `agent` at `session` creation time.

  - `type: "agent"`

  - `id: string`

  - `description: string or null`

  - `mcp_servers: array of BetaManagedAgentsMCPServerURLDefinition`

    - `type: "url"`

    - `name: string`

    - `url: string`

  - `model: BetaManagedAgentsModelConfig`

    Model identifier and configuration.

    - `id: BetaManagedAgentsModel`

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

    - `effort: optional BetaManagedAgentsEffortLow or BetaManagedAgentsEffortMedium or BetaManagedAgentsEffortHigh or 2 more`

      How hard Claude works on each turn. Sets `output_config.effort` on every Messages call the session makes.

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

    - `inference_geo: optional string`

      Geographic region for model inference. When unset, requests fall through to the workspace's default_inference_geo.

    - `speed: optional "standard" or "fast"`

      Inference speed mode. `fast` provides significantly faster output token generation at premium pricing. Not all models support `fast`; invalid combinations are rejected at create time.

      - `"standard"`

      - `"fast"`

  - `multiagent: BetaManagedAgentsSessionMultiagentCoordinator or null`

    Resolved coordinator topology with full agent definitions for each roster member.

    - `type: "coordinator"`

    - `agents: array of BetaManagedAgentsSessionThreadAgent or BetaManagedAgentsAdvisor`

      Full `agent` definitions the coordinator may spawn as session threads.

      - `BetaManagedAgentsSessionThreadAgent object`

        Resolved `agent` definition for a single `session_thread`. Snapshot of the agent at thread creation time. The multiagent roster is not repeated here; read it from `Session.agent`.

        - `type: "agent"`

        - `id: string`

        - `description: string or null`

        - `mcp_servers: array of BetaManagedAgentsMCPServerURLDefinition`

          - `type: "url"`

          - `name: string`

          - `url: string`

        - `model: BetaManagedAgentsModelConfig`

          Model identifier and configuration.

        - `name: string`

        - `skills: array of BetaManagedAgentsAnthropicSkill or BetaManagedAgentsCustomSkill`

          - `BetaManagedAgentsAnthropicSkill object`

            A resolved Anthropic-managed skill.

            - `type: "anthropic"`

            - `skill_id: string`

            - `version: string`

          - `BetaManagedAgentsCustomSkill object`

            A resolved user-created custom skill.

            - `type: "custom"`

            - `skill_id: string`

            - `version: string`

        - `system: string or null`

        - `tools: array of BetaManagedAgentsAgentToolset20260401 or BetaManagedAgentsMCPToolset or BetaManagedAgentsCustomTool`

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

          - `BetaManagedAgentsMCPToolset object`

            - `type: "mcp_toolset"`

            - `configs: array of BetaManagedAgentsMCPToolConfig`

              - `enabled: boolean`

              - `name: string`

              - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

                Permission policy for tool execution.

                - `BetaManagedAgentsAlwaysAllowPolicy object`

                  Tool calls are automatically approved without user confirmation.

                - `BetaManagedAgentsAlwaysAskPolicy object`

                  Tool calls require user confirmation before execution.

                - `BetaManagedAgentsAutoPolicy object`

                  The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

            - `default_config: BetaManagedAgentsMCPToolsetDefaultConfig`

              Resolved default configuration for all tools from an MCP server.

              - `enabled: boolean`

              - `permission_policy: BetaManagedAgentsAlwaysAllowPolicy or BetaManagedAgentsAlwaysAskPolicy or BetaManagedAgentsAutoPolicy`

                Permission policy for tool execution.

                - `BetaManagedAgentsAlwaysAllowPolicy object`

                  Tool calls are automatically approved without user confirmation.

                - `BetaManagedAgentsAlwaysAskPolicy object`

                  Tool calls require user confirmation before execution.

                - `BetaManagedAgentsAutoPolicy object`

                  The server decides each tool call individually: it judges, from the tool, its input, and the session content so far, whether the call is safe to execute or high-risk, and evaluates it to allow when judged safe and to deny when judged high-risk. A call the server cannot reach a judgement on evaluates to ask.

            - `mcp_server_name: string`

          - `BetaManagedAgentsCustomTool object`

            A custom tool as returned in API responses.

            - `type: "custom"`

            - `description: string`

            - `input_schema: BetaManagedAgentsCustomToolInputSchema`

              JSON Schema for custom tool input parameters.

              - `type: "object"`

              - `properties: optional map[unknown] or null`

              - `required: optional array of string or null`

            - `name: string`

        - `version: number`

          format: int32

      - `BetaManagedAgentsAdvisor object`

        Platform advisor roster entry: a model the session's primary thread may consult mid-turn.

        - `type: "advisor"`

        - `model: string`

          The advisor model id.

  - `name: string`

  - `skills: array of BetaManagedAgentsAnthropicSkill or BetaManagedAgentsCustomSkill`

    - `BetaManagedAgentsAnthropicSkill object`

      A resolved Anthropic-managed skill.

    - `BetaManagedAgentsCustomSkill object`

      A resolved user-created custom skill.

  - `system: string or null`

  - `tools: array of BetaManagedAgentsAgentToolset20260401 or BetaManagedAgentsMCPToolset or BetaManagedAgentsCustomTool`

    - `BetaManagedAgentsAgentToolset20260401 object`

    - `BetaManagedAgentsMCPToolset object`

    - `BetaManagedAgentsCustomTool object`

      A custom tool as returned in API responses.

  - `version: number`

    format: int32
