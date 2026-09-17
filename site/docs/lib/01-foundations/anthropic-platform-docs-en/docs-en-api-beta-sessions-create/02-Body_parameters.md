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
sourceRel: "docs/en/api/beta/sessions/create.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/create.md"
sourceSha256: "0fa573577e0b55a92dd1bef057b2736c365e31b34ae10f562120c2f96619e136"
pageSha256: "a1ec1982ac42e68b189c51609a91943a3f29e0578e8a5ebd4d0063d408f53989"
contentMode: "local-full"
zh: ""
---

## Body parameters

- `agent: string or BetaManagedAgentsAgentParams or BetaManagedAgentsAgentWithOverridesParams`

  Agent identifier. Accepts the `agent` ID string, which pins the latest version for the session, or an `agent` object with both id and version specified.

  - `string`

  - `BetaManagedAgentsAgentParams object`

    Specification for an Agent. Provide a specific `version` or use the short-form `agent="agent_id"` for the most recent version

    - `type: "agent"`

    - `id: string`

      The `agent` ID.

      minLength: 1, maxLength: 128

    - `version: optional number`

      The specific `agent` version to use. Omit to use the latest version. Must be at least 1 if specified.

      format: int32

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

- `environment_id: string`

  ID of the `environment` defining the container configuration for this session.

  minLength: 1, maxLength: 128

- `budget: optional BetaManagedAgentsBudgetLimit`

  A hard spend ceiling. The session stops issuing new model requests once the tracked list cost reaches `max_list_cost`.

  - `type: "limit"`

  - `max_list_cost: BetaMonetaryAmount`

    A monetary amount in a specific currency.

    - `amount: string`

      Amount in minor units of the currency, as an integer decimal string with no leading zeros: "2500" is $25.00 and "50" is fifty cents. A string rather than a number so no float rounding is ever applied.

    - `currency: BetaCurrency`

      Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced.

- `initial_events: optional array of BetaManagedAgentsUserMessageEventParams or BetaManagedAgentsUserDefineOutcomeEventParams`

  Initial events to send to the `session` at creation, processed in order. Supports `user.message` and `user.define_outcome` events. Maximum 50 events.

  - `BetaManagedAgentsUserMessageEventParams object`

    Parameters for sending a user message to the session.

    - `type: "user.message"`

    - `content: array of BetaManagedAgentsTextBlock or BetaManagedAgentsImageBlock or BetaManagedAgentsDocumentBlock or BetaManagedAgentsRedactedBlock`

      Array of content blocks for the user message.

      - `BetaManagedAgentsTextBlock object`

        Regular text content.

        - `type: "text"`

        - `text: string`

          The text content.

          minLength: 1

      - `BetaManagedAgentsImageBlock object`

        Image content specified directly as base64 data or as a reference via a URL.

        - `type: "image"`

        - `source: BetaManagedAgentsBase64ImageSource or BetaManagedAgentsURLImageSource or BetaManagedAgentsFileImageSource`

          Union type for image source variants.

          - `BetaManagedAgentsBase64ImageSource object`

            Base64-encoded image data.

            - `type: "base64"`

            - `data: string`

              Base64-encoded image data.

              minLength: 1

            - `media_type: string`

              MIME type of the image (e.g., "image/png", "image/jpeg", "image/gif", "image/webp").

              minLength: 1

          - `BetaManagedAgentsURLImageSource object`

            Image referenced by URL.

            - `type: "url"`

            - `url: string`

              URL of the image to fetch.

              minLength: 1

          - `BetaManagedAgentsFileImageSource object`

            Image referenced by file ID.

            - `type: "file"`

            - `file_id: string`

              ID of a previously uploaded file.

              minLength: 1

      - `BetaManagedAgentsDocumentBlock object`

        Document content, either specified directly as base64 data, as text, or as a reference via a URL.

        - `type: "document"`

        - `source: BetaManagedAgentsBase64DocumentSource or BetaManagedAgentsPlainTextDocumentSource or BetaManagedAgentsURLDocumentSource or BetaManagedAgentsFileDocumentSource`

          Union type for document source variants.

          - `BetaManagedAgentsBase64DocumentSource object`

            Base64-encoded document data.

            - `type: "base64"`

            - `data: string`

              Base64-encoded document data.

              minLength: 1

            - `media_type: string`

              MIME type of the document (e.g., "application/pdf").

              minLength: 1

          - `BetaManagedAgentsPlainTextDocumentSource object`

            Plain text document content.

            - `type: "text"`

            - `data: string`

              The plain text content.

              minLength: 1

            - `media_type: "text/plain"`

              MIME type of the text content. Must be "text/plain".

          - `BetaManagedAgentsURLDocumentSource object`

            Document referenced by URL.

            - `type: "url"`

            - `url: string`

              URL of the document to fetch.

              minLength: 1

          - `BetaManagedAgentsFileDocumentSource object`

            Document referenced by file ID.

            - `type: "file"`

            - `file_id: string`

              ID of a previously uploaded file.

              minLength: 1

        - `context: optional string or null`

          Additional context about the document for the model.

        - `title: optional string or null`

          The title of the document.

      - `BetaManagedAgentsRedactedBlock object`

        Placeholder for content withheld by Anthropic model policy.

        - `type: "redacted"`

  - `BetaManagedAgentsUserDefineOutcomeEventParams object`

    Parameters for defining an outcome the agent should work toward. The agent begins work on receipt.

    - `type: "user.define_outcome"`

    - `description: string`

      What the agent should produce. This is the task specification.

    - `rubric: BetaManagedAgentsFileRubricParams or BetaManagedAgentsTextRubricParams`

      Rubric for grading the quality of an outcome.

      - `BetaManagedAgentsFileRubricParams object`

        Rubric referenced by a file uploaded via the Files API.

        - `type: "file"`

        - `file_id: string`

          ID of the rubric file.

      - `BetaManagedAgentsTextRubricParams object`

        Rubric content provided inline as text.

        - `type: "text"`

        - `content: string`

          Rubric content. Plain text or markdown — the grader treats it as freeform text. Maximum 262144 characters.

          maxLength: 262144

    - `max_iterations: optional number or null`

      Eval→revision cycles before giving up. Default 3, max 20.

      format: int32

- `metadata: optional map[string]`

  Arbitrary key-value metadata attached to the session. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars.

- `resources: optional array of BetaManagedAgentsGitHubRepositoryResourceParams or BetaManagedAgentsFileResourceParams or BetaManagedAgentsMemoryStoreResourceParam`

  Resources (e.g. repositories, files) to mount into the session's container.

  - `BetaManagedAgentsGitHubRepositoryResourceParams object`

    Mount a GitHub repository into the session's container.

    - `type: "github_repository"`

    - `url: string`

      Github URL of the repository

      minLength: 1, maxLength: 2048

    - `authorization_token: optional string`

      GitHub authorization token used to clone the repository. Required for private repositories; optional for public ones.

      minLength: 1, maxLength: 4096

    - `checkout: optional BetaManagedAgentsBranchCheckout or BetaManagedAgentsCommitCheckout or null`

      Branch or commit to check out. Defaults to the repository's default branch.

      - `BetaManagedAgentsBranchCheckout object`

        - `type: "branch"`

        - `name: string`

          Branch name to check out.

          minLength: 1, maxLength: 255

      - `BetaManagedAgentsCommitCheckout object`

        - `type: "commit"`

        - `sha: string`

          Full commit SHA to check out.

          minLength: 7, maxLength: 64

    - `mount_path: optional string or null`
