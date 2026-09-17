---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/settings-reference.md"
sourceRel: "guide/core/settings-reference.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/settings-reference.md"
sourceSha256: "d71d09e7fe0e14138483215b2914bfeed715745a15fdcc31323d061554ffb433"
pageSha256: "efcc80bb449dda14af034b6a0e64fe6dde3f832791a6fff5ec2d6561d7c4fb58"
contentMode: "local-full"
zh: ""
---

## Environment Variables

Set in your shell before launching `claude`, or configure under the `env` key in `settings.json` to apply to every session. When an env var and an equivalent settings field both apply, the env var takes precedence (e.g. `ANTHROPIC_MODEL` overrides the `model` setting). Changes take effect on the next `claude` launch.

### Authentication

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key for Anthropic API access. When set, used instead of your Claude subscription even if logged in |
| `ANTHROPIC_AUTH_TOKEN` | Custom `Authorization` header value (prefixed with `Bearer `) |
| `ANTHROPIC_BASE_URL` | Custom API endpoint for proxies or LLM gateways |
| `ANTHROPIC_CUSTOM_HEADERS` | Custom headers added to API requests. Format: `Name: Value`, newline-separated for multiple |
| `ANTHROPIC_BETAS` | Comma-separated extra `anthropic-beta` header values. Works with all auth methods including Claude.ai subscription |
| `ANTHROPIC_WORKSPACE_ID` | Workspace ID for workload identity federation when a federation rule covers more than one workspace |
| `CLAUDE_CODE_OAUTH_TOKEN` | OAuth access token for Claude.ai authentication. Alternative to `/login` for SDK and automated environments |
| `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` | OAuth refresh token for headless auth. `claude auth login` exchanges this directly instead of opening a browser. Requires `CLAUDE_CODE_OAUTH_SCOPES` |
| `CLAUDE_CODE_OAUTH_SCOPES` | Space-separated OAuth scopes the refresh token was issued with. Required when `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` is set |
| `CLAUDE_CONFIG_DIR` | Override the configuration directory (default: `~/.claude`) |

### Model Selection

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_MODEL` | Model to use. Accepts aliases (`sonnet`, `opus`, `haiku`) or full model IDs. Overrides the `model` setting |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Override the Haiku model alias with a custom model ID |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME` | Display name for the Haiku model override |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION` | Description for the Haiku model override |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES` | Capabilities for the Haiku model override |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Override the Sonnet model alias |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_NAME` | Display name for the Sonnet model override |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION` | Description for the Sonnet model override |
| `ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES` | Capabilities for the Sonnet model override |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Override the Opus model alias (e.g. `claude-opus-4-6[1m]`) |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_NAME` | Display name for the Opus model override |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION` | Description for the Opus model override |
| `ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES` | Capabilities for the Opus model override |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | Model ID to add as a custom entry in the `/model` picker |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` | Display name for the custom model entry |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` | Display description for the custom model entry |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES` | Capabilities for the custom model entry |
| `ANTHROPIC_SMALL_FAST_MODEL` | **DEPRECATED.** Use `ANTHROPIC_DEFAULT_HAIKU_MODEL` instead |
| `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` | AWS region for the Haiku-class model on Bedrock when `ANTHROPIC_DEFAULT_HAIKU_MODEL` is also set |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Override model for subagents (e.g. `haiku`) |
| `CLAUDE_CODE_EFFORT_LEVEL` | Effort level: `low`, `medium`, `high`, `xhigh`, `max`, or `auto`. Takes precedence over `/effort` and the `effortLevel` setting |
| `FALLBACK_FOR_ALL_PRIMARY_MODELS` | Any non-empty value triggers fallback to `--fallback-model` after repeated overload errors on any primary model, not just Opus |
| `CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP` | Set to `1` to prevent automatic remapping of Opus 4.0 and 4.1 to the current Opus version on the Anthropic API |

### Cloud Providers

#### Amazon Bedrock

| Variable | Description |
|----------|-------------|
| `CLAUDE_CODE_USE_BEDROCK` | Use Amazon Bedrock (`1` to enable) |
| `AWS_BEARER_TOKEN_BEDROCK` | Bedrock API key for authentication |
| `ANTHROPIC_BEDROCK_BASE_URL` | Override the Bedrock endpoint URL. Use for custom regions or when routing through an LLM gateway |
| `ANTHROPIC_BEDROCK_SERVICE_TIER` | Bedrock service tier: `default`, `flex`, or `priority`. Sent as `X-Amzn-Bedrock-Service-Tier` |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | Skip AWS auth for Bedrock (e.g. when using an LLM gateway) |
| `CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK` | Set to `1` to enable byte-level streaming idle watchdog on Bedrock |

#### Bedrock Mantle

| Variable | Description |
|----------|-------------|
| `CLAUDE_CODE_USE_MANTLE` | Use the Bedrock Mantle endpoint |
| `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` | Override the Bedrock Mantle endpoint URL |
| `CLAUDE_CODE_SKIP_MANTLE_AUTH` | Skip AWS auth for Bedrock Mantle |

#### Google Vertex AI

| Variable | Description |
|----------|-------------|
| `CLAUDE_CODE_USE_VERTEX` | Use Google Vertex AI (`1` to enable) |
| `ANTHROPIC_VERTEX_BASE_URL` | Override the Vertex AI endpoint URL |
| `ANTHROPIC_VERTEX_PROJECT_ID` | GCP project ID for Vertex AI requests (overridden by `GCLOUD_PROJECT` or `GOOGLE_CLOUD_PROJECT`) |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | Skip Google auth for Vertex |
| `VERTEX_REGION_CLAUDE_3_5_HAIKU` | Region override for Claude 3.5 Haiku on Vertex AI |
| `VERTEX_REGION_CLAUDE_3_5_SONNET` | Region override for Claude 3.5 Sonnet on Vertex AI |
| `VERTEX_REGION_CLAUDE_3_7_SONNET` | Region override for Claude 3.7 Sonnet on Vertex AI |
| `VERTEX_REGION_CLAUDE_4_0_OPUS` | Region override for Claude 4.0 Opus on Vertex AI |
| `VERTEX_REGION_CLAUDE_4_0_SONNET` | Region override for Claude 4.0 Sonnet on Vertex AI |
| `VERTEX_REGION_CLAUDE_4_1_OPUS` | Region override for Claude 4.1 Opus on Vertex AI |
| `VERTEX_REGION_CLAUDE_4_5_OPUS` | Region override for Claude Opus 4.5 on Vertex AI |
| `VERTEX_REGION_CLAUDE_4_5_SONNET` | Region override for Claude Sonnet 4.5 on Vertex AI |
| `VERTEX_REGION_CLAUDE_4_6_OPUS` | Region override for Claude Opus 4.6 on Vertex AI |
| `VERTEX_REGION_CLAUDE_4_6_SONNET` | Region override for Claude Sonnet 4.6 on Vertex AI |
| `VERTEX_REGION_CLAUDE_4_7_OPUS` | Region override for Claude Opus 4.7 on Vertex AI. Added in v2.1.111 |
| `VERTEX_REGION_CLAUDE_4_8_OPUS` | Region override for Claude Opus 4.8 on Vertex AI |
| `VERTEX_REGION_CLAUDE_HAIKU_4_5` | Region override for Claude Haiku 4.5 on Vertex AI |

#### Microsoft Foundry

| Variable | Description |
|----------|-------------|
| `CLAUDE_CODE_USE_FOUNDRY` | Use Microsoft Foundry (`1` to enable) |
| `ANTHROPIC_FOUNDRY_API_KEY` | API key for Microsoft Foundry authentication |
| `ANTHROPIC_FOUNDRY_BASE_URL` | Full base URL for the Foundry resource (alternative to `ANTHROPIC_FOUNDRY_RESOURCE`) |
| `ANTHROPIC_FOUNDRY_RESOURCE` | Foundry resource name. Required if `ANTHROPIC_FOUNDRY_BASE_URL` is not set |
| `CLAUDE_CODE_SKIP_FOUNDRY_AUTH` | Skip Azure auth for Foundry |

#### Claude Platform on AWS

| Variable | Description |
|----------|-------------|
| `CLAUDE_CODE_USE_ANTHROPIC_AWS` | Use Claude Platform on AWS |
| `ANTHROPIC_AWS_API_KEY` | Workspace API key for Claude Platform on AWS, generated in the AWS Console |
| `ANTHROPIC_AWS_BASE_URL` | Override the Claude Platform on AWS endpoint URL |
| `ANTHROPIC_AWS_WORKSPACE_ID` | Required workspace ID. Sent as the `anthropic-workspace-id` header on every request |
| `CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH` | Skip client-side authentication for Claude Platform on AWS |

#### Multi-cloud

| Variable | Description |
|----------|-------------|
| `CLAUDE_CODE_ENABLE_AUTO_MODE` | Set to `1` to make auto mode available on Bedrock, Vertex AI, and Foundry. Added in v2.1.158. No effect on Anthropic API |
| `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` | Set by host platforms managing model provider routing. When set, provider-selection and auth variables in settings files are ignored |

### Timeouts and Limits

| Variable | Description |
|----------|-------------|
| `API_TIMEOUT_MS` | API request timeout in milliseconds (default: 600000). Maximum: 2147483647 |
| `BASH_DEFAULT_TIMEOUT_MS` | Default bash command timeout in milliseconds (default: 120000) |
| `BASH_MAX_TIMEOUT_MS` | Maximum bash command timeout in milliseconds (default: 600000) |
| `BASH_MAX_OUTPUT_LENGTH` | Maximum characters in bash output before saving to a file and sending the path |
| `MAX_THINKING_TOKENS` | Extended thinking token budget. Set to `0` to disable. Ignored on models with adaptive reasoning unless `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` is set |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | Max output tokens per response (default: 32,000; up to 128,000 on Opus 5, Sonnet 5, Opus 4.8, and Sonnet 4.6) |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | Override default file read token limit |
| `CLAUDE_CODE_MAX_CONTEXT_TOKENS` | Override context window size Claude Code assumes for the active model. Only takes effect when `DISABLE_COMPACT` is also set |
| `CLAUDE_CODE_MAX_TURNS` | Cap the number of agentic turns per session. Equivalent to `--max-turns` (the flag takes precedence when both are set) |
| `CLAUDE_CODE_MAX_RETRIES` | Override the number of retries for failed API requests (default: 10) |
| `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY` | Maximum read-only tools and subagents executing in parallel (default: 10) |
| `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` | Stall timeout in milliseconds for background subagents (default: 600000) |
| `TASK_MAX_OUTPUT_LENGTH` | Maximum characters in subagent output before truncation (default: 32000, max: 160000) |
| `MAX_STRUCTURED_OUTPUT_RETRIES` | Retries when model response fails `--json-schema` validation in non-interactive mode (default: 5) |
| `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` | Maximum consecutive times a Stop hook may block the turn from ending before Claude Code overrides it (default: 8) |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | SessionEnd hook time budget in ms. Default: 1.5s, raised to the highest configured per-hook timeout up to 60s |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | Credential refresh interval in ms for `apiKeyHelper` |
| `MCP_TIMEOUT` | MCP server startup timeout in ms (default: 30000) |
| `MCP_TOOL_TIMEOUT` | MCP tool execution timeout in ms (default: 100000000) |

### Behavior Control

| Variable | Description |
|----------|-------------|
| `CLAUDECODE` | Set to `1` in subprocesses Claude Code spawns (Bash/PowerShell tools, tmux sessions, hook commands, status line commands, stdio MCP subprocesses). Use to detect when a script runs inside Claude Code |
