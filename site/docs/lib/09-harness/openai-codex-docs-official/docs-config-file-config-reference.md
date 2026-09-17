---
title: "Configuration Reference"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/config-file/config-reference.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/config-file/config-reference.md"
sourceSha256: "f432ae52ed50ad88998c396c8da88cba74ef022f51f2def7ca494fd08c94ae58"
pageSha256: "f432ae52ed50ad88998c396c8da88cba74ef022f51f2def7ca494fd08c94ae58"
contentMode: "local-full"
zh: ""
---

# Configuration Reference

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use this page as a searchable reference for Codex configuration files. For conceptual guidance and examples, start with [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic) and [Advanced Config](https://learn.chatgpt.com/docs/config-file/config-advanced).

## `config.toml`

User-level configuration lives in `~/.codex/config.toml`. You can also add project-scoped overrides in `.codex/config.toml` files. Codex loads project-scoped config files only when you trust the project.

Project-scoped config can't override machine-local provider, auth,
host-owned app request metadata, notification, configuration profile selection,
or telemetry routing keys. Codex ignores `openai_base_url`,
`chatgpt_base_url`, `apps_mcp_product_sku`, `model_provider`,
`model_providers`, `notify`, `profile`, `profiles`,
`experimental_realtime_ws_base_url`, and `otel` when they appear in a
project-local `.codex/config.toml`; put provider, notification, and telemetry
keys in user-level config instead. Config [profile files](https://learn.chatgpt.com/docs/config-file/config-advanced#profiles) live next to
`config.toml` as `$CODEX_HOME/profile-name.config.toml`; select one with
`--profile profile-name`.

For sandbox and approval keys (`approval_policy`, `sandbox_mode`, and `sandbox_workspace_write.*`), pair this reference with [Sandbox and approvals](https://learn.chatgpt.com/docs/agent-approvals-security#sandbox-and-approvals), [Protected paths in writable roots](https://learn.chatgpt.com/docs/agent-approvals-security#protected-paths-in-writable-roots), and [Network access](https://learn.chatgpt.com/docs/agent-approvals-security#network-access). For beta permission profiles, see [Permissions](https://learn.chatgpt.com/docs/permissions).

Codex and ChatGPT Work no longer support `approval_policy = "untrusted"`.
Remove the setting or choose a supported policy. Project entries with
`trust_level = "untrusted"` in user-level `~/.codex/config.toml` remain supported. See
[Migrate from the retired `untrusted` approval policy](https://learn.chatgpt.com/docs/agent-approvals-security#migrate-from-the-retired-untrusted-approval-policy)
for examples and approval tradeoffs.

<ConfigTable
  options={[
    {
      key: "model",
      type: "string",
      description: "Model to use (e.g., `gpt-5.5`).",
    },
    {
      key: "review_model",
      type: "string",
      description:
        "Optional model override used by `/review` (defaults to the current session model).",
    },
    {
      key: "model_provider",
      type: "string",
      description: "Provider id from `model_providers` (default: `openai`).",
    },
    {
      key: "openai_base_url",
      type: "string",
      description:
        "Base URL override for the built-in `openai` model provider.",
    },
    {
      key: "model_context_window",
      type: "number",
      description: "Context window tokens available to the active model.",
    },
    {
      key: "model_auto_compact_token_limit",
      type: "number",
      description:
        "Token threshold that triggers automatic history compaction (unset uses model defaults).",
    },
    {
      key: "model_auto_compact_token_limit_scope",
      type: "total | body_after_prefix",
      description:
        "Controls whether the auto-compaction threshold counts the full active context (`total`, the default) or only growth after the carried compaction-window prefix (`body_after_prefix`).",
    },
    {
      key: "model_catalog_json",
      type: "string (path)",
      description:
        "Optional path to a JSON model catalog loaded on startup. A selected `$CODEX_HOME/profile-name.config.toml` profile file can override this per profile.",
    \},
    \{
      key: "oss_provider",
      type: "lmstudio | ollama",
      description:
        "Default local provider used when running with `--oss` (defaults to prompting if unset).",
    \},
    \{
      key: "approval_policy",
      type: "on-request | never | \{ granular = \{ sandbox_approval = bool, rules = bool, mcp_elicitations = bool, request_permissions = bool, skill_approval = bool \} \}",
      description:
        "Controls when Codex pauses for approval before executing commands. You can also use `approval_policy = \{ granular = \{ ... \} \}` to allow or auto-reject specific prompt categories while keeping other prompts interactive. `untrusted` is unsupported, and `on-failure` is deprecated; use `on-request` for interactive runs or `never` for non-interactive runs.",
    \},
    \{
      key: "approval_policy.granular.sandbox_approval",
      type: "boolean",
      description:
        "When `true`, sandbox escalation approval prompts are allowed to surface.",
    \},
    \{
      key: "approval_policy.granular.rules",
      type: "boolean",
      description:
        "When `true`, approvals triggered by execpolicy `prompt` rules are allowed to surface.",
    \},
    \{
      key: "approval_policy.granular.mcp_elicitations",
      type: "boolean",
      description:
        "When `true`, MCP elicitation prompts are allowed to surface instead of being auto-rejected.",
    \},
    \{
      key: "approval_policy.granular.request_permissions",
      type: "boolean",
      description:
        "When `true`, prompts from the `request_permissions` tool are allowed to surface.",
    \},
    \{
      key: "approval_policy.granular.skill_approval",
      type: "boolean",
      description:
        "When `true`, skill-script approval prompts are allowed to surface.",
    \},
    \{
      key: "approvals_reviewer",
      type: "user | auto_review",
      description:
        "Who reviews eligible approval prompts under `on-request` or granular approval policies. Defaults to `user`; `auto_review` uses the reviewer subagent. This setting doesn't change sandboxing or review actions already allowed inside the sandbox.",
    \},
    \{
      key: "auto_review.policy",
      type: "string",
      description:
        "Local Markdown policy instructions for automatic review. Managed `guardian_policy_config` takes precedence. Blank values are ignored.",
    \},
    \{
      key: "allow_login_shell",
      type: "boolean",
      description:
        "Allow shell-based tools to use login-shell semantics. Defaults to `true`; when `false`, `login = true` requests are rejected and omitted `login` defaults to non-login shells.",
    \},
    \{
      key: "sandbox_mode",
      type: "read-only | workspace-write | danger-full-access",
      description:
        "Sandbox policy for filesystem and network access during command execution.",
    \},
    \{
      key: "sandbox_workspace_write.writable_roots",
      type: "array&lt;string>",
      description:
        'Additional writable roots when `sandbox_mode = "workspace-write"`.',
    \},
    \{
      key: "sandbox_workspace_write.network_access",
      type: "boolean",
      description:
        "Allow outbound network access inside the workspace-write sandbox.",
    \},
    \{
      key: "sandbox_workspace_write.exclude_tmpdir_env_var",
      type: "boolean",
      description:
        "Exclude `$TMPDIR` from writable roots in workspace-write mode.",
    },
    {
      key: "sandbox_workspace_write.exclude_slash_tmp",
      type: "boolean",
      description:
        "Exclude `/tmp` from writable roots in workspace-write mode.",
    },
    {
      key: "windows.sandbox",
      type: "unelevated | elevated",
      description:
        "Windows-only native sandbox mode when running Codex natively on Windows.",
    },
    {
      key: "windows.sandbox_private_desktop",
      type: "boolean",
      description:
        "Run the final sandboxed child process on a private desktop by default on native Windows. Set `false` only for compatibility with the older `Winsta0\\\\Default` behavior.",
    },
    {
      key: "browser_use.allow_history_access",
      type: "boolean",
      description:
        "Set to `false` to restrict browser-history access. Managed requirements can enforce this restriction.",
    },
    {
      key: "browser_use.default_origin_policy",
      type: "table",
      description:
        "Fallback browser-origin restrictions. Supports `access`, `uploads`, `downloads`, and `full_cdp_access`, each set to `allow` or `deny`.",
    },
    {
      key: "browser_use.origins.&lt;origin>",
      type: "table",
      description:
        "Per-origin browser restrictions with the same fields as `browser_use.default_origin_policy`. Include an HTTP or HTTPS scheme and optional port; omit paths, queries, and fragments. Local values cannot relax managed denies.",
    },
    {
      key: "computer_use.default_app_access",
      type: "allow | deny",
      description:
        "Fallback native-app access policy for Computer Use. App-specific entries can supply a policy; local configuration cannot relax managed restrictions.",
    },
    {
      key: "computer_use.macos.bundle_ids",
      type: "map&lt;string, allow | deny>",
      description: "Native macOS app access keyed by bundle identifier.",
    },
    {
      key: "computer_use.windows.aumids",
      type: "map&lt;string, allow | deny>",
      description:
        "Packaged Windows app access keyed by Application User Model ID (AUMID).",
    },
    {
      key: "computer_use.windows.exes",
      type: "array",
      description:
        "Windows executable access rules. Each rule requires `publisher_name`, `product_name`, and `access` (`allow` or `deny`); `binary_name` is optional.",
    },
    {
      key: "computer_use.windows.always_allowed_app_ids",
      type: "array&lt;string>",
      description:
        "Windows app identifiers that Computer Use can open without prompting. Apps not in the list require approval; remove saved entries from the ChatGPT desktop app's Computer Use settings.",
    },
    {
      key: "notify",
      type: "array&lt;string>",
      description:
        "Command invoked for notifications; receives a JSON payload from Codex.",
    },
    {
      key: "check_for_update_on_startup",
      type: "boolean",
      description:
        "Check for Codex updates on startup (set to false only when updates are centrally managed).",
    },
    {
      key: "feedback.enabled",
      type: "boolean",
      description:
        "Enable feedback submission via `/feedback` across local clients (default: true).",
    },
    {
      key: "analytics.enabled",
      type: "boolean",
      description:
        "Enable or disable analytics for this machine/profile. When unset, the client default applies.",
    },
    {
      key: "instructions",
      type: "string",
      description:
        "Reserved for future use; prefer `model_instructions_file` or `AGENTS.md`.",
    },
    {
      key: "developer_instructions",
      type: "string",
      description:
        "Additional developer instructions injected into the session (optional).",
    },
    {
      key: "log_dir",
      type: "string (path)",
      description:
        "Directory where Codex writes log files; defaults to `$CODEX_HOME/log`. Setting this explicitly also enables the opt-in plaintext TUI log, `codex-tui.log`, in that directory.",
    \},
    \{
      key: "sqlite_home",
      type: "string (path)",
      description:
        "Directory where Codex stores the SQLite-backed state DB used by agent jobs and other resumable runtime state.",
    \},
    \{
      key: "compact_prompt",
      type: "string",
      description: "Inline override for the history compaction prompt.",
    \},
    \{
      key: "model_instructions_file",
      type: "string (path)",
      description:
        "Replacement for built-in instructions instead of `AGENTS.md`.",
    \},
    \{
      key: "personality",
      type: "none | friendly | pragmatic",
      description:
        "Default communication style for models that advertise `supportsPersonality`; can be overridden per thread/turn or via `/personality`.",
    \},
    \{
      key: "service_tier",
      type: "string",
      description:
        "Preferred service tier for new turns. Use `fast` or another tier advertised by the active model; `fast` maps to the request value `priority`.",
    \},
    \{
      key: "experimental_compact_prompt_file",
      type: "string (path)",
      description:
        "Load the compaction prompt override from a file (experimental).",
    \},
    \{
      key: "skills.max_context_tokens",
      type: "integer (positive)",
      description:
        "Token budget for the available-skills catalog. Defaults to 2% of the model's context window. Explicit values are capped at `10000` tokens.",
    \},
    \{
      key: "skills.config",
      type: "array&lt;object>",
      description: "Per-skill enablement overrides stored in config.toml.",
    \},
    \{
      key: "skills.config.&lt;index>.path",
      type: "string (path)",
      description: "Path to a skill folder containing `SKILL.md`.",
    \},
    \{
      key: "skills.config.&lt;index>.enabled",
      type: "boolean",
      description: "Enable or disable the referenced skill.",
    \},
    \{
      key: "apps.&lt;id>.enabled",
      type: "boolean",
      description:
        "Enable or disable a specific app/connector by id (default: true).",
    \},
    \{
      key: "apps._default.enabled",
      type: "boolean",
      description:
        "Default app enabled state for all apps unless overridden per app.",
    \},
    \{
      key: "apps._default.destructive_enabled",
      type: "boolean",
      description:
        "Default allow/deny for app tools with `destructive_hint = true`.",
    \},
    \{
      key: "apps._default.open_world_enabled",
      type: "boolean",
      description:
        "Default allow/deny for app tools with `open_world_hint = true`.",
    \},
    \{
      key: "apps._default.approvals_reviewer",
      type: "user | auto_review",
      description:
        "Default reviewer for app tool approval prompts unless overridden per app. When omitted, apps inherit the top-level `approvals_reviewer` value.",
    \},
    \{
      key: "apps._default.default_tools_approval_mode",
      type: "auto | prompt | writes | approve",
      description:
        "Default approval behavior for app tools without per-app or per-tool overrides.",
    \},
    \{
      key: "apps.&lt;id>.destructive_enabled",
      type: "boolean",
      description:
        "Allow or block tools in this app that advertise `destructive_hint = true`.",
    \},
    \{
      key: "apps.&lt;id>.open_world_enabled",
      type: "boolean",
      description:
        "Allow or block tools in this app that advertise `open_world_hint = true`.",
    \},
    \{
      key: "apps.&lt;id>.default_tools_enabled",
      type: "boolean",
      description:
        "Default enabled state for tools in this app unless a per-tool override exists.",
    \},
    \{
      key: "apps.&lt;id>.approvals_reviewer",
      type: "user | auto_review",
      description:
        "Reviewer for this app's tool approval prompts. Overrides `apps._default.approvals_reviewer`.",
    \},
    \{
      key: "apps.&lt;id>.default_tools_approval_mode",
      type: "auto | prompt | writes | approve",
      description:
        "Default approval behavior for tools in this app unless a per-tool override exists.",
    \},
    \{
      key: "apps.&lt;id>.tools.&lt;tool>.enabled",
      type: "boolean",
      description:
        "Per-tool enabled override for an app tool (for example `repos/list`).",
    \},
    \{
      key: "apps.&lt;id>.tools.&lt;tool>.approval_mode",
      type: "auto | prompt | writes | approve",
      description: "Per-tool approval behavior override for a single app tool.",
    \},
    \{
      key: "tool_suggest.discoverables",
      type: "array",
      description:
        'Allow tool suggestions for additional discoverable connectors or plugins. Each entry uses `type = "connector"` or `"plugin"` and an `id`.',
    \},
    \{
      key: "tool_suggest.disabled_tools",
      type: "array",
      description:
        'Disable suggestions for specific discoverable connectors or plugins. Each entry uses `type = "connector"` or `"plugin"` and an `id`.',
    \},
    \{
      key: "features.apps",
      type: "boolean",
      description:
        "Enable app (connector) integrations (stable; on by default). App and connector traffic is not controlled by the sandboxed-command network proxy or its domain allowlist.",
    \},
    \{
      key: "features.hooks",
      type: "boolean",
      description:
        "Enable lifecycle hooks loaded from `hooks.json` or inline `[hooks]` config. `features.codex_hooks` is a deprecated alias.",
    \},
    \{
      key: "features.code_mode.enabled",
      type: "boolean",
      description:
        "Enable code mode feature configuration. This feature is under development and off by default.",
    \},
    \{
      key: "features.code_mode.excluded_tool_namespaces",
      type: "array&lt;string>",
      description:
        "Tool namespaces code mode excludes from nested code-mode tool guidance and executor exposure.",
    \},
    \{
      key: "features.code_mode.direct_only_tool_namespaces",
      type: "array&lt;string>",
      description:
        "Tool namespaces code mode can use only through direct tool calls.",
    \},
    \{
      key: "features.context_management.experimental_mode",
      type: "boolean",
      description:
        "Enable experimental context management (off by default). Rather than repeatedly compressing context into a single summary, it uses notes and searchable history to preserve accumulated details. Requires ChatGPT sign-in on Plus, Pro, or Pro Lite.",
    \},
    \{
      key: "features.rollout_budget.enabled",
      type: "boolean",
      description:
        "Enable rollout budget tracking. This feature is under development and off by default. When enabled, `features.rollout_budget.limit_tokens` is required.",
    \},
    \{
      key: "features.rollout_budget.limit_tokens",
      type: "integer",
      description:
        "Positive token limit for rollout budget tracking. Required when rollout budget is enabled.",
    \},
    \{
      key: "features.rollout_budget.reminder_interval_tokens",
      type: "integer",
      description:
        "Positive token interval between rollout budget reminders. Defaults to 10% of `limit_tokens`, with a minimum of 1 token.",
    \},
    \{
      key: "features.rollout_budget.sampling_token_weight",
      type: "number",
      description:
        "Finite non-negative multiplier for sampled tokens in rollout budget accounting. Defaults to `1.0`.",
    \},
    \{
      key: "features.rollout_budget.prefill_token_weight",
      type: "number",
      description:
        "Finite non-negative multiplier for prefill tokens in rollout budget accounting. Defaults to `1.0`.",
    \},
    \{
      key: "hooks",
      type: "table",
      description:
        "Lifecycle hooks configured inline in `config.toml`. Uses the same event schema as `hooks.json`; see the Hooks guide for examples and supported events.",
    \},
    \{
      key: "hooks.&lt;Event>",
      type: "array",
      description:
        "Matcher groups for hook events such as `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `SessionStart`, `SessionEnd`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, `Stop`, or `Interrupt`.",
    \},
    \{
      key: "hooks.&lt;Event>[].hooks",
      type: "array",
      description:
        "Hook handlers for a matcher group. Command and MCP tool hooks are supported while prompt and agent hook handlers are parsed but skipped.",
    \},
    \{
      key: "hooks.&lt;Event>[].hooks[].async",
      type: "boolean",
      description:
        "Run a command hook in the background without delaying the triggering operation. Defaults to `false`; `SessionEnd` always runs synchronously. See [Run hooks in the background](https://learn.chatgpt.com/docs/hooks#run-hooks-in-the-background).",
    \},
    \{
      key: "hooks.&lt;Event>[].hooks[].additionalContextLimit",
      type: "integer",
      description:
        "Approximate per-handler token threshold for saving oversized `additionalContext` to disk and showing the model a shorter preview. Defaults to `2500`; `0` passes the full context directly to the model. See [Large hook output](https://learn.chatgpt.com/docs/hooks#large-hook-output).",
    \},
    \{
      key: "hooks.&lt;Event>[].hooks[].commandWindows",
      type: "string",
      description:
        "Windows-only command override for command hooks. The TOML alias `command_windows` is also accepted.",
    \},
    \{
      key: "features.memories",
      type: "boolean",
      description:
        "Enable [Memories](https://learn.chatgpt.com/docs/customization/memories) (off by default).",
    \},
    \{
      key: "mcp_optional_startup_grace_ms",
      type: "integer (milliseconds)",
      description:
        "Shared wait for optional MCP servers when building the initial tool catalog. Defaults to `1000`. Set to `0` to wait for each server's `startup_timeout_sec` instead.",
    \},
    \{
      key: "mcp_servers.&lt;id>.command",
      type: "string",
      description: "Launcher command for an MCP stdio server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.args",
      type: "array&lt;string>",
      description: "Arguments passed to the MCP stdio server command.",
    \},
    \{
      key: "mcp_servers.&lt;id>.env",
      type: "map&lt;string,string>",
      description: "Environment variables forwarded to the MCP stdio server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.env_vars",
      type: 'array&lt;string | \{ name = string, source = "local" | "remote" \}>',
      description:
        'Additional environment variables to whitelist for an MCP stdio server. String entries default to `source = "local"`; use `source = "remote"` only with executor-backed remote stdio.',
    \},
    \{
      key: "mcp_servers.&lt;id>.cwd",
      type: "string",
      description: "Working directory for the MCP stdio server process.",
    \},
    \{
      key: "mcp_servers.&lt;id>.url",
      type: "string",
      description: "Endpoint for an MCP streamable HTTP server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.auth",
      type: "oauth | chatgpt",
      description:
        "Authentication fallback for an MCP HTTP server after configured bearer tokens and authorization headers. `oauth` (default) uses stored MCP OAuth credentials when available. `chatgpt` uses the current ChatGPT session for the trusted first-party ChatGPT origin, then falls back to stored OAuth. Both modes can connect without authentication if no credential source resolves.",
    \},
    \{
      key: "mcp_servers.&lt;id>.oauth.client_id",
      type: "string",
      description:
        "Pre-registered OAuth client ID used for authorization and token exchange with this MCP server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.oauth.callback_url",
      type: "string",
      description:
        "Server-specific OAuth callback. Pre-registered clients reuse it when issuer identification is supported or the URL already ends in the server-specific callback ID. Otherwise, Codex uses the global or default callback with that ID appended. Clients without a pre-registered ID use this callback during client registration.",
    \},
    \{
      key: "mcp_servers.&lt;id>.oauth.callback_port",
      type: "integer",
      description:
        "Fixed OAuth callback listener port for this MCP server. Overrides `mcp_oauth_callback_port`. For a direct loopback callback with an explicit URL port, configure the same listener port.",
    \},
    \{
      key: "mcp_servers.&lt;id>.bearer_token_env_var",
      type: "string",
      description:
        "Environment variable sourcing the bearer token for an MCP HTTP server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.http_headers",
      type: "map&lt;string,string>",
      description: "Static HTTP headers included with each MCP HTTP request.",
    \},
    \{
      key: "mcp_servers.&lt;id>.http_headers_helper",
      type: "string (command)",
      description:
        "Local command that prints a JSON object of HTTP header names and values. Supported only for locally connected HTTP MCP servers. Explicit bearer tokens and OAuth credentials take precedence over helper-provided Authorization headers.",
    \},
    \{
      key: "mcp_servers.&lt;id>.env_http_headers",
      type: "map&lt;string,string>",
      description:
        "HTTP headers populated from environment variables for an MCP HTTP server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.enabled",
      type: "boolean",
      description: "Disable an MCP server without removing its configuration.",
    \},
    \{
      key: "mcp_servers.&lt;id>.required",
      type: "boolean",
      description:
        "When true, fail startup/resume if this enabled MCP server cannot initialize.",
    \},
    \{
      key: "mcp_servers.&lt;id>.startup_timeout_sec",
      type: "number",
      description:
        "Override the default 10s startup timeout for an MCP server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.startup_timeout_ms",
      type: "number",
      description: "Alias for `startup_timeout_sec` in milliseconds.",
    \},
    \{
      key: "mcp_servers.&lt;id>.tool_timeout_sec",
      type: "number",
      description:
        "Override the default 60s per-tool timeout for an MCP server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.enabled_tools",
      type: "array&lt;string>",
      description: "Allow list of tool names exposed by the MCP server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.disabled_tools",
      type: "array&lt;string>",
      description:
        "Deny list applied after `enabled_tools` for the MCP server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.default_tools_approval_mode",
      type: "auto | prompt | writes | approve",
      description:
        "Default approval behavior for MCP tools on this server unless a per-tool override exists.",
    \},
    \{
      key: "mcp_servers.&lt;id>.tools.&lt;tool>.approval_mode",
      type: "auto | prompt | writes | approve",
      description:
        "Per-tool approval behavior override for one MCP tool on this server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.tools.&lt;tool>.output_token_limit",
      type: "integer (positive)",
      description:
        "Token budget for one MCP tool's output, before the standard 20% serialization allowance. Overrides the model's default output truncation budget for that tool.",
    \},
    \{
      key: "mcp_servers.&lt;id>.scopes",
      type: "array&lt;string>",
      description:
        "OAuth scopes to request when authenticating to that MCP server.",
    \},
    \{
      key: "mcp_servers.&lt;id>.oauth_resource",
      type: "string",
      description:
        "Optional RFC 8707 OAuth resource parameter to include during MCP login.",
    \},
    \{
      key: "mcp_servers.&lt;id>.experimental_environment",
      type: "local | remote",
      description:
        "Experimental placement for an MCP server. `remote` starts stdio servers through a remote executor environment; streamable HTTP remote placement is not implemented.",
    \},
    \{
      key: "agents",
      type: "table",
      description:
        "Multi-agent settings and custom role declarations. Scalar setting names are reserved and can't be used as custom role names.",
    \},
    \{
      key: "agents.enabled",
      type: "boolean",
      description: "Enable or disable multi-agent tools (default: true).",
    \},
    \{
      key: "agents.max_concurrent_threads_per_session",
      type: "number",
      description:
        "Maximum number of spawned-agent threads that can be open concurrently, excluding the primary thread. When unset, Codex chooses the default.",
    \},
    \{
      key: "agents.max_threads",
      type: "number",
      description:
        "Legacy alias for `agents.max_concurrent_threads_per_session`.",
    \},
    \{
      key: "agents.default_subagent_model",
      type: "string",
      description:
        "Default model for spawned agents. An explicit spawn model takes precedence.",
    \},
    \{
      key: "agents.default_subagent_reasoning_effort",
      type: "string",
      description:
        "Default reasoning effort for spawned agents. An explicit spawn effort takes precedence.",
    \},
    \{
      key: "agents.interrupt_message",
      type: "boolean",
      description:
        "Record a model-visible message when an agent turn is interrupted (default: true).",
    \},
    \{
      key: "agents.&lt;name>.description",
      type: "string",
      description:
        "Role guidance shown to Codex when choosing and spawning that agent type.",
    \},
    \{
      key: "agents.&lt;name>.config_file",
      type: "string (path)",
      description:
        "Path to a TOML config layer for that role; relative paths resolve from the config file that declares the role.",
    \},
    \{
      key: "memories.generate_memories",
      type: "boolean",
      description:
        "When `false`, newly created threads are not stored as memory-generation inputs. Defaults to `true`.",
    \},
    \{
      key: "memories.use_memories",
      type: "boolean",
      description:
        "When `false`, Codex skips injecting existing memories into future sessions. Defaults to `true`.",
    \},
    \{
      key: "memories.disable_on_external_context",
      type: "boolean",
      description:
        "When `true`, threads that use external context such as MCP tool calls, web search, or tool search are kept out of memory generation. Defaults to `false`. Legacy alias: `memories.no_memories_if_mcp_or_web_search`.",
    \},
    \{
      key: "memories.max_raw_memories_for_consolidation",
      type: "number",
      description:
        "Maximum recent raw memories retained for global consolidation. Defaults to `256` and is capped at `4096`.",
    \},
    \{
      key: "memories.max_unused_days",
      type: "number",
      description:
        "Maximum days since a memory was last used before it becomes ineligible for consolidation. Defaults to `30` and is clamped to `0`-`365`.",
    \},
    \{
      key: "memories.max_rollout_age_days",
      type: "number",
      description:
        "Maximum age of threads considered for memory generation. Defaults to `30` and is clamped to `0`-`90`.",
    \},
    \{
      key: "memories.max_rollouts_per_startup",
      type: "number",
      description:
        "Maximum rollout candidates processed per startup pass. Defaults to `16` and is capped at `128`.",
    \},
    \{
      key: "memories.min_rollout_idle_hours",
      type: "number",
      description:
        "Minimum idle time before a thread is considered for memory generation. Defaults to `6` and is clamped to `1`-`48`.",
    \},
    \{
      key: "memories.min_rate_limit_remaining_percent",
      type: "number",
      description:
        "Minimum remaining percentage required in Codex rate-limit windows before memory generation starts. Defaults to `25` and is clamped to `0`-`100`.",
    \},
    \{
      key: "memories.extract_model",
      type: "string",
      description: "Optional model override for per-thread memory extraction.",
    \},
    \{
      key: "memories.consolidation_model",
      type: "string",
      description: "Optional model override for global memory consolidation.",
    \},
    \{
      key: "features.unified_exec",
      type: "boolean",
      description:
        "Use the unified PTY-backed exec tool (stable; enabled by default except on Windows).",
    \},
    \{
      key: "features.shell_snapshot",
      type: "boolean",
      description:
        "Snapshot shell environment to speed up repeated commands (stable; on by default).",
    \},
    \{
      key: "features.multi_agent",
      type: "boolean",
      description:
        "Enable multi-agent collaboration tools (`spawn_agent`, `send_input`, `resume_agent`, `wait_agent`, and `close_agent`) (stable; on by default).",
    \},
    \{
      key: "features.goals",
      type: "boolean",
      description:
        "Enable persisted goals and automatic continuation (stable; on by default).",
    \},
    \{
      key: "features.remote_plugin",
      type: "boolean",
      description: "Enable the remote plugin catalog (stable; on by default).",
    \},
    \{
      key: "features.personality",
      type: "boolean",
      description:
        "Enable personality selection controls (stable; on by default).",
    \},
    \{
      key: "features.network_proxy",
      type: "boolean | table",
      description:
        "Start the network proxy for sandboxed commands (experimental; off by default). Required to enforce permission-profile domain rules unless enabled administrator-managed `experimental_network` requirements start the proxy. Use a table when setting feature-level policy options such as `domains`. Does not filter web search, apps, MCP, or other hosted tools.",
    \},
    \{
      key: "features.network_proxy.enabled",
      type: "boolean",
      description:
        "Start the sandboxed-command network proxy when command network access is enabled. Defaults to `false`; permission-profile domain rules are not enforced while the proxy is off.",
    \},
    \{
      key: "features.network_proxy.domains",
      type: "map&lt;string, allow | deny>",
      description:
        "Domain policy for sandboxed networking. Unset by default, which means no external destinations are allowed until you add `allow` rules. Supports exact hosts, `*.example.com` for subdomains only, `**.example.com` for apex plus subdomains, and global `*` allow rules; prefer scoped rules because `*` broadly opens public outbound access. Add `deny` rules for blocked destinations; `deny` wins on conflicts.",
    \},
    \{
      key: "features.network_proxy.unix_sockets",
      type: "map&lt;string, allow | deny>",
      description:
        "Unix socket policy for sandboxed networking. Unset by default; add `allow` entries for permitted sockets.",
    \},
    \{
      key: "features.network_proxy.allow_local_binding",
      type: "boolean",
      description:
        "Allow broader local/private-network access. Defaults to `false`; exact local IP literal or `localhost` allow rules can still permit specific local targets.",
    \},
    \{
      key: "features.network_proxy.enable_socks5",
      type: "boolean",
      description: "Expose SOCKS5 support. Defaults to `true`.",
    \},
    \{
      key: "features.network_proxy.enable_socks5_udp",
      type: "boolean",
      description: "Allow UDP over SOCKS5. Defaults to `true`.",
    \},
    \{
      key: "features.network_proxy.allow_upstream_proxy",
      type: "boolean",
      description:
        "Allow chaining through an upstream proxy from the environment. Defaults to `true`.",
    \},
    \{
      key: "features.network_proxy.dangerously_allow_non_loopback_proxy",
      type: "boolean",
      description:
        "Permit non-loopback listener addresses. Defaults to `false`; enabling it can expose proxy listeners beyond localhost.",
    \},
    \{
      key: "features.network_proxy.dangerously_allow_all_unix_sockets",
      type: "boolean",
      description:
        "Permit arbitrary Unix socket destinations instead of allowlist-only access. Defaults to `false`; use only in tightly controlled environments.",
    \},
    \{
      key: "features.network_proxy.proxy_url",
      type: "string",
      description:
        'HTTP listener URL for sandboxed networking. Defaults to `"http://127.0.0.1:3128"`.',
    \},
    \{
      key: "features.network_proxy.socks_url",
      type: "string",
      description:
        'SOCKS5 listener URL. Defaults to `"http://127.0.0.1:8081"`.',
    \},
    \{
      key: "features.web_search",
      type: "boolean",
      description:
        "Deprecated legacy toggle; prefer the top-level `web_search` setting.",
    \},
    \{
      key: "features.web_search_cached",
      type: "boolean",
      description:
        'Deprecated legacy toggle. When `web_search` is unset, true maps to `web_search = "cached"`.',
    \},
    \{
      key: "features.web_search_request",
      type: "boolean",
      description:
        'Deprecated legacy toggle. When `web_search` is unset, true maps to `web_search = "live"`.',
    \},
    \{
      key: "features.shell_tool",
      type: "boolean",
      description:
        "Enable the default `shell` tool for running commands (stable; on by default).",
    \},
    \{
      key: "features.enable_request_compression",
      type: "boolean",
      description:
        "Compress streaming request bodies with zstd when supported (stable; on by default).",
    \},
    \{
      key: "features.skill_mcp_dependency_install",
      type: "boolean",
      description:
        "Allow prompting and installing missing MCP dependencies for skills (stable; on by default).",
    \},
    \{
      key: "features.fast_mode",
      type: "boolean",
      description:
        "Enable model-catalog service tier selection in the TUI, including Fast-tier commands when the active model advertises them (stable; on by default).",
    \},
    \{
      key: "features.prevent_idle_sleep",
      type: "boolean",
      description:
        "Prevent the machine from sleeping while a turn is actively running (experimental; off by default).",
    \},
    \{
      key: "suppress_unstable_features_warning",
      type: "boolean",
      description:
        "Suppress the warning that appears when under-development feature flags are enabled.",
    \},
    \{
      key: "model_providers.&lt;id>",
      type: "table",
      description:
        "Custom provider definition. Built-in provider IDs (`openai`, `ollama`, and `lmstudio`) are reserved and cannot be overridden.",
    \},
    \{
      key: "model_providers.&lt;id>.name",
      type: "string",
      description: "Display name for a custom model provider.",
    \},
    \{
      key: "model_providers.&lt;id>.base_url",
      type: "string",
      description: "API base URL for the model provider.",
    \},
    \{
      key: "model_providers.&lt;id>.env_key",
      type: "string",
      description: "Environment variable supplying the provider API key.",
    \},
    \{
      key: "model_providers.&lt;id>.env_key_instructions",
      type: "string",
      description: "Optional setup guidance for the provider API key.",
    \},
    \{
      key: "model_providers.&lt;id>.experimental_bearer_token",
      type: "string",
      description:
        "Direct bearer token for the provider (discouraged; use `env_key`).",
    \},
    \{
      key: "model_providers.&lt;id>.requires_openai_auth",
      type: "boolean",
      description:
        "The provider uses OpenAI authentication (defaults to false).",
    \},
    \{
      key: "model_providers.&lt;id>.wire_api",
      type: "responses",
      description:
        "Protocol used by the provider. `responses` is the only supported value, and it is the default when omitted.",
    \},
    \{
      key: "model_providers.&lt;id>.query_params",
      type: "map&lt;string,string>",
      description: "Extra query parameters appended to provider requests.",
    \},
    \{
      key: "model_providers.&lt;id>.http_headers",
      type: "map&lt;string,string>",
      description: "Static HTTP headers added to provider requests.",
    \},
    \{
      key: "model_providers.&lt;id>.env_http_headers",
      type: "map&lt;string,string>",
      description:
        "HTTP headers populated from environment variables when present.",
    \},
    \{
      key: "model_providers.&lt;id>.request_max_retries",
      type: "number",
      description:
        "Retry count for HTTP requests to the provider (default: 4).",
    \},
    \{
      key: "model_providers.&lt;id>.stream_max_retries",
      type: "number",
      description: "Retry count for SSE streaming interruptions (default: 5).",
    \},
    \{
      key: "model_providers.&lt;id>.stream_idle_timeout_ms",
      type: "number",
      description:
        "Idle timeout for SSE streams in milliseconds (default: 300000).",
    \},
    \{
      key: "model_providers.&lt;id>.supports_websockets",
      type: "boolean",
      description:
        "Whether that provider supports the Responses API WebSocket transport.",
    \},
    \{
      key: "model_providers.&lt;id>.supports_standalone_web_search",
      type: "boolean",
      description:
        "Advertise support for a compatible standalone web search endpoint (default: false). Standalone search remains under development and off by default; provider compatibility alone doesn't enable it.",
    \},
    \{
      key: "model_providers.&lt;id>.auth",
      type: "table",
      description:
        "Command-backed bearer token configuration for a custom provider. Do not combine with `env_key`, `experimental_bearer_token`, or `requires_openai_auth`.",
    \},
    \{
      key: "model_providers.&lt;id>.auth.command",
      type: "string",
      description:
        "Command to run when Codex needs a bearer token. The command must print the token to stdout.",
    \},
    \{
      key: "model_providers.&lt;id>.auth.args",
      type: "array&lt;string>",
      description: "Arguments passed to the token command.",
    \},
    \{
      key: "model_providers.&lt;id>.auth.timeout_ms",
      type: "number",
      description:
        "Maximum token command runtime in milliseconds (default: 5000).",
    \},
    \{
      key: "model_providers.&lt;id>.auth.refresh_interval_ms",
      type: "number",
      description:
        "How often Codex proactively refreshes the token in milliseconds (default: 300000). Set to `0` to refresh only after an authentication retry.",
    \},
    \{
      key: "model_providers.&lt;id>.auth.cwd",
      type: "string (path)",
      description: "Working directory for the token command.",
    \},
    \{
      key: "model_providers.amazon-bedrock.aws.profile",
      type: "string",
      description:
        "AWS profile name used by the built-in `amazon-bedrock` provider.",
    \},
    \{
      key: "model_providers.amazon-bedrock.aws.region",
      type: "string",
      description: "AWS region used by the built-in `amazon-bedrock` provider.",
    \},
    \{
      key: "model_reasoning_effort",
      type: "minimal | low | medium | high | xhigh",
      description:
        "Adjust reasoning effort for supported models (Responses API only; `xhigh` is model-dependent).",
    \},
    \{
      key: "plan_mode_reasoning_effort",
      type: "none | minimal | low | medium | high | xhigh",
      description:
        "Plan-mode-specific reasoning override. When unset, Plan mode uses its built-in preset default.",
    \},
    \{
      key: "model_reasoning_summary",
      type: "auto | concise | detailed | none",
      description:
        "Select reasoning summary detail or disable summaries entirely.",
    \},
    \{
      key: "model_verbosity",
      type: "low | medium | high",
      description:
        "Optional GPT-5 Responses API verbosity override; when unset, the selected model/preset default is used.",
    \},
    \{
      key: "model_supports_reasoning_summaries",
      type: "boolean",
      description: "Force Codex to send or not send reasoning metadata.",
    \},
    \{
      key: "shell_environment_policy.inherit",
      type: "all | core | none",
      description:
        "Baseline environment inheritance when spawning subprocesses.",
    \},
    \{
      key: "shell_environment_policy.ignore_default_excludes",
      type: "boolean",
      description:
        "Keep variables containing KEY, SECRET, or TOKEN before other filters run (default: true). Set to false to apply automatic secret-name exclusions.",
    \},
    \{
      key: "shell_environment_policy.filters",
      type: "map&lt;string, include | exclude>",
      description:
        "Canonical case-insensitive environment-variable pattern filters. Include entries create an allowlist and can't restore excluded values. Explicit `set` values apply after exclusions. Don't combine filters with legacy `exclude` or `include_only` arrays in the same layer.",
    \},
    \{
      key: "shell_environment_policy.exclude",
      type: "array&lt;string>",
      description:
        "Legacy environment-variable exclusion patterns. Use `shell_environment_policy.filters` for new configuration; don't combine both forms in the same layer.",
    \},
    \{
      key: "shell_environment_policy.include_only",
      type: "array&lt;string>",
      description:
        "Legacy allowlist of environment-variable patterns. Use `shell_environment_policy.filters` for new configuration; don't combine both forms in the same layer.",
    \},
    \{
      key: "shell_environment_policy.set",
      type: "map&lt;string,string>",
      description:
        "Explicit environment values injected after exclusions; include filters can still remove them.",
    \},
    \{
      key: "shell_environment_policy.experimental_use_profile",
      type: "boolean",
      description: "Use the user shell profile when spawning subprocesses.",
    \},
    \{
      key: "project_root_markers",
      type: "array&lt;string>",
      description:
        "List of project root marker filenames; used when searching parent directories for the project root.",
    \},
    \{
      key: "project_doc_max_bytes",
      type: "number",
      description:
        "Maximum bytes read from `AGENTS.md` when building project instructions.",
    \},
    \{
      key: "project_doc_fallback_filenames",
      type: "array&lt;string>",
      description: "Additional filenames to try when `AGENTS.md` is missing.",
    \},
    \{
      key: "history.persistence",
      type: "save-all | none",
      description:
        "Control whether Codex saves session transcripts to history.jsonl.",
    \},
    \{
      key: "tool_output_token_limit",
      type: "number",
      description:
        "Token budget for storing individual tool/function outputs in history.",
    \},
    \{
      key: "background_terminal_max_timeout",
      type: "number",
      description:
        "Maximum poll window in milliseconds for empty `write_stdin` polls (background terminal polling). Default: `300000` (5 minutes). Replaces the older `background_terminal_timeout` key.",
    \},
    \{
      key: "history.max_bytes",
      type: "number",
      description:
        "If set, caps the history file size in bytes by dropping oldest entries.",
    \},
    \{
      key: "file_opener",
      type: "vscode | vscode-insiders | windsurf | cursor | none",
      description:
        "URI scheme used to open citations from Codex output (default: `vscode`).",
    \},
    \{
      key: "otel.environment",
      type: "string",
      description:
        "Environment tag applied to emitted OpenTelemetry events (default: `dev`).",
    \},
    \{
      key: "otel.exporter",
      type: "none | otlp-http | otlp-grpc",
      description:
        "Select the OpenTelemetry exporter and provide any endpoint metadata.",
    \},
    \{
      key: "otel.trace_exporter",
      type: "none | otlp-http | otlp-grpc",
      description:
        "Select the OpenTelemetry trace exporter and provide any endpoint metadata.",
    \},
    \{
      key: "otel.metrics_exporter",
      type: "none | statsig | otlp-http | otlp-grpc",
      description:
        "Select the OpenTelemetry metrics exporter (defaults to `statsig`).",
    \},
    \{
      key: "otel.log_user_prompt",
      type: "boolean",
      description:
        "Opt in to exporting raw user prompts with OpenTelemetry logs.",
    \},
    \{
      key: "otel.exporter.&lt;id>.endpoint",
      type: "string",
      description: "Exporter endpoint for OTEL logs.",
    \},
    \{
      key: "otel.exporter.&lt;id>.protocol",
      type: "binary | json",
      description: "Protocol used by the OTLP/HTTP exporter.",
    \},
    \{
      key: "otel.exporter.&lt;id>.headers",
      type: "map&lt;string,string>",
      description: "Static headers included with OTEL exporter requests.",
    \},
    \{
      key: "otel.trace_exporter.&lt;id>.endpoint",
      type: "string",
      description: "Trace exporter endpoint for OTEL logs.",
    \},
    \{
      key: "otel.trace_exporter.&lt;id>.protocol",
      type: "binary | json",
      description: "Protocol used by the OTLP/HTTP trace exporter.",
    \},
    \{
      key: "otel.trace_exporter.&lt;id>.headers",
      type: "map&lt;string,string>",
      description: "Static headers included with OTEL trace exporter requests.",
    \},
    \{
      key: "otel.exporter.&lt;id>.tls.ca-certificate",
      type: "string",
      description: "CA certificate path for OTEL exporter TLS.",
    \},
    \{
      key: "otel.exporter.&lt;id>.tls.client-certificate",
      type: "string",
      description: "Client certificate path for OTEL exporter TLS.",
    \},
    \{
      key: "otel.exporter.&lt;id>.tls.client-private-key",
      type: "string",
      description: "Client private key path for OTEL exporter TLS.",
    \},
    \{
      key: "otel.trace_exporter.&lt;id>.tls.ca-certificate",
      type: "string",
      description: "CA certificate path for OTEL trace exporter TLS.",
    \},
    \{
      key: "otel.trace_exporter.&lt;id>.tls.client-certificate",
      type: "string",
      description: "Client certificate path for OTEL trace exporter TLS.",
    \},
    \{
      key: "otel.trace_exporter.&lt;id>.tls.client-private-key",
      type: "string",
      description: "Client private key path for OTEL trace exporter TLS.",
    \},
    \{
      key: "desktop.custom_file_handlers.&lt;id>",
      type: "table",
      description:
        "User-level only. Defines an additional **Open in** target for the ChatGPT desktop app. See [Add custom file handlers](https://learn.chatgpt.com/docs/config-file/config-advanced#add-custom-file-handlers) for examples and handler ID constraints.",
    \},
    \{
      key: "desktop.custom_file_handlers.&lt;id>.label",
      type: "string",
      description: "Display name shown in **Open in** menus. Required.",
    \},
    \{
      key: "desktop.custom_file_handlers.&lt;id>.icon",
      type: "string",
      description:
        "Bundled asset path, Base64-encoded `data:image/...` URL, file URI, or absolute local path for the handler icon. Required; unsupported sources use the default VS Code icon.",
    \},
    \{
      key: "desktop.custom_file_handlers.&lt;id>.command",
      type: "string",
      description:
        "Executable path or command name to detect and launch. Required.",
    \},
    \{
      key: "desktop.custom_file_handlers.&lt;id>.args",
      type: "array&lt;string>",
      description:
        "Arguments inserted between the command and file input (default: `[]`).",
    \},
    \{
      key: "desktop.custom_file_handlers.&lt;id>.input",
      type: "path | json_argument | json_stdin",
      description:
        "How the app sends file input to the handler (default: `path`).",
    \},
    \{
      key: "desktop.custom_file_handlers.&lt;id>.supports_ssh",
      type: "boolean",
      description:
        "Offer the handler for files in SSH workspaces (default: `false`).",
    \},
    \{
      key: "tui",
      type: "table",
      description:
        "TUI-specific options such as enabling inline desktop notifications.",
    \},
    \{
      key: "tui.notifications",
      type: "boolean | array&lt;string>",
      description:
        "Enable TUI notifications; optionally restrict to specific event types.",
    \},
    \{
      key: "tui.notification_method",
      type: "auto | osc9 | bel",
      description:
        "Notification method for terminal notifications (default: auto).",
    \},
    \{
      key: "tui.notification_condition",
      type: "unfocused | always",
      description:
        "Control whether TUI notifications fire only when the terminal is unfocused or regardless of focus. Defaults to `unfocused`.",
    \},
    \{
      key: "tui.animations",
      type: "boolean",
      description:
        "Enable terminal animations (welcome screen, shimmer, spinner) (default: true).",
    \},
    \{
      key: "tui.alternate_screen",
      type: "auto | always | never",
      description:
        "Control alternate screen usage for the TUI (default: auto; auto skips it in Zellij to preserve scrollback).",
    \},
    \{
      key: "tui.resume_cwd",
      type: "current | session",
      description:
        "Working directory to use when resuming or forking a session. When unset, Codex asks you to choose if your current directory differs from the session's saved directory.",
    \},
    \{
      key: "tui.vim_mode_default",
      type: "boolean",
      description:
        "Start the composer in Vim normal mode instead of insert mode (default: false). You can still toggle it per session with `/vim`.",
    \},
    \{
      key: "tui.raw_output_mode",
      type: "boolean",
      description:
        "Start the TUI in raw scrollback mode for copy-friendly terminal selection (default: false). You can toggle it with `/raw` or the default `alt-r` key binding.",
    \},
    \{
      key: "tui.show_tooltips",
      type: "boolean",
      description:
        "Show onboarding tooltips in the TUI welcome screen (default: true).",
    \},
    \{
      key: "tui.status_line",
      type: "array&lt;string> | null",
      description:
        "Ordered list of TUI footer status-line item identifiers. `null` disables the status line.",
    \},
    \{
      key: "tui.terminal_title",
      type: "array&lt;string> | null",
      description:
        'Ordered list of terminal window/tab title item identifiers. Defaults to `["spinner", "project"]`; `null` disables title updates.',
    \},
    \{
      key: "tui.theme",
      type: "string",
      description:
        "Syntax-highlighting theme override (kebab-case theme name).",
    \},
    \{
      key: "tui.keymap.&lt;context>.&lt;action>",
      type: "string | array&lt;string>",
      description:
        "Keyboard shortcut binding for a TUI action. Supported contexts include `global`, `chat`, `composer`, `editor`, `vim_normal`, `vim_operator`, `vim_text_object`, `pager`, `list`, and `approval`. Selected composer actions fall back to matching `tui.keymap.global` bindings; context-specific bindings take precedence when supported.",
    \},
    \{
      key: "tui.keymap.&lt;context>.&lt;action> = []",
      type: "empty array",
      description:
        "Unbind the action in that keymap context. Key names use normalized strings such as `ctrl-a`, `shift-enter`, `page-down`, or `minus`.",
    \},
    \{
      key: "marketplaces.&lt;name>.source_type",
      type: "git | local",
      description:
        "Source kind for a configured plugin marketplace. Marketplaces can be defined in system, cloud-managed, user, or trusted-project config.toml.",
    \},
    \{
      key: "marketplaces.&lt;name>.source",
      type: "string",
      description:
        "Git repository location or local marketplace root directory. Use an absolute path for a local source; the directory contains .agents/plugins/marketplace.json.",
    \},
    \{
      key: "marketplaces.&lt;name>.ref",
      type: "string",
      description: "Optional Git branch, tag, or commit for the marketplace.",
    \},
    \{
      key: "marketplaces.&lt;name>.sparse_paths",
      type: "array&lt;string>",
      description:
        "Optional sparse checkout paths for a Git marketplace. Include the marketplace catalog and any local plugin directories it references.",
    \},
    \{
      key: "plugins.&lt;plugin>.enabled",
      type: "boolean",
      description:
        "Enable or disable a local-marketplace plugin using a `plugin-name@marketplace-name` key. Read from the effective merged config; trusted-project settings can override user, cloud-managed, and system defaults. Marketplace refresh can install or refresh configured plugins even when disabled. This does not override workspace-managed enabled states.",
    \},
    \{
      key: "plugins.&lt;plugin>.mcp_servers.&lt;server>.enabled",
      type: "boolean",
      description:
        "Enable or disable an MCP server bundled by an installed plugin without changing the plugin manifest.",
    \},
    \{
      key: "plugins.&lt;plugin>.mcp_servers.&lt;server>.default_tools_approval_mode",
      type: "auto | prompt | writes | approve",
      description:
        "Default approval behavior for tools on a plugin-provided MCP server.",
    \},
    \{
      key: "plugins.&lt;plugin>.mcp_servers.&lt;server>.enabled_tools",
      type: "array&lt;string>",
      description:
        "Allow list of tools exposed from a plugin-provided MCP server.",
    \},
    \{
      key: "plugins.&lt;plugin>.mcp_servers.&lt;server>.disabled_tools",
      type: "array&lt;string>",
      description:
        "Deny list applied after `enabled_tools` for a plugin-provided MCP server.",
    \},
    \{
      key: "plugins.&lt;plugin>.mcp_servers.&lt;server>.tools.&lt;tool>.approval_mode",
      type: "auto | prompt | writes | approve",
      description:
        "Per-tool approval behavior override for a plugin-provided MCP tool.",
    \},
    \{
      key: "tui.model_availability_nux.&lt;model>",
      type: "integer",
      description: "Internal startup-tooltip state keyed by model slug.",
    \},
    \{
      key: "hide_agent_reasoning",
      type: "boolean",
      description:
        "Suppress reasoning events in both the TUI and `codex exec` output.",
    \},
    \{
      key: "show_raw_agent_reasoning",
      type: "boolean",
      description:
        "Surface raw reasoning content when the active model emits it.",
    \},
    \{
      key: "disable_paste_burst",
      type: "boolean",
      description: "Disable burst-paste detection in the TUI.",
    \},
    \{
      key: "windows_wsl_setup_acknowledged",
      type: "boolean",
      description: "Track Windows onboarding acknowledgement (Windows only).",
    \},
    \{
      key: "chatgpt_base_url",
      type: "string",
      description: "Override the base URL used during the ChatGPT login flow.",
    \},
    \{
      key: "cli_auth_credentials_store",
      type: "file | keyring | auto | ephemeral",
      description: "Control where the CLI stores cached credentials.",
    \},
    \{
      key: "mcp_oauth_credentials_store",
      type: "auto | file | keyring",
      description: "Preferred store for MCP OAuth credentials.",
    \},
    \{
      key: "mcp_oauth_callback_port",
      type: "integer",
      description:
        "Optional global fixed port for the local HTTP callback server used during MCP OAuth login. A server-specific `oauth.callback_port` takes precedence. When neither is set, Codex binds to an ephemeral port chosen by the OS.",
    \},
    \{
      key: "mcp_oauth_callback_url",
      type: "string",
      description:
        "Optional base callback URL for MCP OAuth login, such as a devbox ingress URL. Newly added pre-registered clients use this URL unchanged when the authorization server supports issuer identification; existing clients without a saved callback append a server-specific callback ID. Without issuer support, any pre-registered MCP server whose configured callback lacks the required ID falls back to this URL with the ID appended. Callback URL ports don't select the listener port.",
    \},
    \{
      key: "experimental_use_unified_exec_tool",
      type: "boolean",
      description:
        "Legacy name for enabling unified exec; prefer `[features].unified_exec` or `codex --enable unified_exec`.",
    \},
    \{
      key: "tools.web_search",
      type: 'boolean | \{ context_size = "low|medium|high", allowed_domains = [string], location = \{ country, region, city, timezone \} \}',
      description:
        "Optional web search tool configuration. The object form can set search context size, allowed search domains, and approximate user location. These search-domain filters are separate from sandboxed-command network domain rules and do not restrict connectors or MCP servers.",
    \},
    \{
      key: "tools.view_image",
      type: "boolean",
      description: "Enable the local-image attachment tool `view_image`.",
    \},
    \{
      key: "web_search",
      type: "disabled | cached | indexed | live",
      description:
        'Web search mode (default: `"cached"`; cached uses an OpenAI-maintained index without external web access; indexed permits external access only when gated by the search index; if you use `--yolo` or another full access sandbox setting, it defaults to `"live"`). Use `"live"` for unrestricted live retrieval, or `"disabled"` to remove the tool.',
    \},
    \{
      key: "default_permissions",
      type: "string",
      description:
        "Name of the default permissions profile to apply to sandboxed tool calls. Built-ins are `:read-only`, `:workspace`, and `:danger-full-access`; custom profile names require matching `[permissions.<name>]` tables. Don't combine with `sandbox_mode` or `[sandbox_workspace_write]`.",
    \},
    \{
      key: "permissions.&lt;name>.description",
      type: "string",
      description:
        "Human-readable description for this named profile. A profile does not inherit its parent's description through `extends`.",
    \},
    \{
      key: "permissions.&lt;name>.extends",
      type: "string",
      description:
        "Optional parent profile applied before this named profile. Set it to another named profile, `:read-only`, or `:workspace`; `:danger-full-access`, undefined parents, and cycles are rejected.",
    \},
    \{
      key: "permissions.&lt;name>.workspace_roots",
      type: "table",
      description:
        "Profile-defined workspace roots that receive `:workspace_roots` filesystem rules alongside the session's runtime workspace roots.",
    \},
    \{
      key: "permissions.&lt;name>.workspace_roots.&lt;path>",
      type: "boolean",
      description:
        "Opt a path into the profile's workspace root set when `true`. Disabled entries remain inactive.",
    \},
    \{
      key: "permissions.&lt;name>.filesystem",
      type: "table",
      description:
        "Named filesystem permission profile. Each key is an absolute path or special token such as `:minimal` or `:workspace_roots`.",
    \},
    \{
      key: "permissions.&lt;name>.filesystem.glob_scan_max_depth",
      type: "number",
      description:
        "Maximum depth for expanding deny-read glob patterns on platforms that snapshot matches before sandbox startup. Must be at least `1` when set.",
    \},
    \{
