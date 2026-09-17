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
sourceRel: "docs/en/api/beta/sessions/threads.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/threads.md"
sourceSha256: "7c49e8a644bf5fce181657fff779684ba2ebac0aff547f9d1b8b8c4d2042bd66"
pageSha256: "d23ec44e132cc68995b630ba4d45552214216ea64126b7762880fb366d00d08b"
contentMode: "local-full"
zh: ""
---

### Returns

- `BetaManagedAgentsSessionThread object`

  An execution thread within a `session`. Each session has one primary thread plus zero or more child threads spawned by the coordinator.

  - `type: "session_thread"`

  - `id: string`

    Unique identifier for this thread.

  - `agent: BetaManagedAgentsSessionThreadAgent or BetaManagedAgentsAdvisor`

    The resolved agent a session thread runs: a saved-agent snapshot, the platform advisor entry, or an inline-defined (ephemeral) agent snapshot.

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

  - `archived_at: string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `created_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `parent_thread_id: string or null`

    Parent thread that spawned this thread. Null for the primary thread.

  - `session_id: string`

    The session this thread belongs to.

  - `stats: BetaManagedAgentsSessionThreadStats or null`

    Timing statistics for a session thread.

    - `active_seconds: optional number`

      Cumulative time in seconds the thread spent actively running. Excludes idle time.

      format: double

    - `duration_seconds: optional number`

      Elapsed time since thread creation in seconds. For archived threads, frozen at the final update.

      format: double

    - `startup_seconds: optional number`

      Time in seconds for the thread to begin running. Zero for child threads, which start immediately.

      format: double

  - `status: BetaManagedAgentsSessionThreadStatus`

    SessionThreadStatus enum

    - `"running"`

    - `"idle"`

    - `"rescheduling"`

    - `"terminated"`

  - `updated_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `usage: BetaManagedAgentsSessionThreadUsage or null`

    Cumulative token usage for a session thread across all turns.

    - `active_seconds: optional number`

      Cumulative time in seconds this thread spent in running status. Equal to `stats.active_seconds`; surfaced here so a thread's usage carries every quantity its cost is priced on.

      format: double

    - `cache_creation: optional BetaManagedAgentsCacheCreationUsage`

      Prompt-cache creation token usage broken down by cache lifetime.

      - `ephemeral_1h_input_tokens: optional number`

        Tokens used to create 1-hour ephemeral cache entries.

        format: int32

      - `ephemeral_5m_input_tokens: optional number`

        Tokens used to create 5-minute ephemeral cache entries.

        format: int32

    - `cache_read_input_tokens: optional number`

      Total tokens read from prompt cache.

      format: int32

    - `input_tokens: optional number`

      Total input tokens consumed across all turns.

      format: int32

    - `list_cost: optional BetaMonetaryAmount or null`

      A monetary amount in a specific currency.

      - `amount: string`

        Amount in minor units of the currency, as an integer decimal string with no leading zeros: "2500" is $25.00 and "50" is fifty cents. A string rather than a number so no float rounding is ever applied.

      - `currency: BetaCurrency`

        Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced.

    - `output_tokens: optional number`

      Total output tokens generated across all turns.

      format: int32

    - `server_tool_use: optional BetaManagedAgentsServerToolUsage or null`

      Cumulative count of server-executed tool invocations, broken down by tool.

      - `web_fetch_requests: optional number`

        Number of server-executed web fetch requests.

        format: int32

      - `web_search_requests: optional number`

        Number of server-executed web search requests.

        format: int32
