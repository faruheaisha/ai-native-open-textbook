---
title: "Settings Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/README.md"
zh: ""
---

# Settings Best Practice

 <br>

A comprehensive guide to all available configuration options in Claude Code's `settings.json` files. As of v2.1.252, Claude Code exposes **140+ settings** and **315+ environment variables** (use the `"env"` field in `settings.json` to avoid wrapper scripts).

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## Table of Contents

1. [Settings Hierarchy](#settings-hierarchy)
2. [Core Configuration](#core-configuration)
3. [Permissions](#permissions)
4. [Hooks](#hooks)
5. [MCP Servers](#mcp-servers)
6. [Sandbox](#sandbox)
7. [Plugins](#plugins)
8. [Model Configuration](#model-configuration)
9. [Display & UX](#display--ux)
10. [AWS & Cloud Credentials](#aws--cloud-credentials)
11. [Environment Variables](#environment-variables-via-env)
12. [Useful Commands](#useful-commands)

---

## Settings Hierarchy

Settings apply in order of precedence (highest to lowest):

| Priority | Location | Scope | Shared? | Purpose |
|----------|----------|-------|---------|---------|
| 1 | Managed settings | Organization | Yes (deployed by IT) | Security policies that cannot be overridden |
| 2 | Command line arguments | Session | N/A | Temporary single-session overrides |
| 3 | `.claude/settings.local.json` | Project | No (git-ignored) | Personal project-specific |
| 4 | `.claude/settings.json` | Project | Yes (committed) | Team-shared settings |
| 5 | `~/.claude/settings.json` | User | N/A | Global personal defaults |

**Managed settings** are organization-enforced and cannot be overridden by any other level, including command line arguments. Delivery methods:
- **Server-managed** settings (remote delivery)
- **MDM profiles** — macOS plist at `com.anthropic.claudecode`
- **Registry policies** — Windows `HKLM\SOFTWARE\Policies\ClaudeCode` (admin) and `HKCU\SOFTWARE\Policies\ClaudeCode` (user-level, lowest policy priority)
- **File** — `managed-settings.json` and `managed-mcp.json` (macOS: `/Library/Application Support/ClaudeCode/`, Linux/WSL: `/etc/claude-code/`, Windows: `C:\Program Files\ClaudeCode\`)
- **Drop-in directory** — `managed-settings.d/` alongside `managed-settings.json` for independent policy fragments (v2.1.83). Following the systemd convention, `managed-settings.json` is merged first as the base, then all `*.json` files in the drop-in directory are sorted alphabetically and merged on top. Later files override earlier ones for scalar values; arrays are concatenated and de-duplicated; objects are deep-merged. Hidden files starting with `.` are ignored. Use numeric prefixes to control merge order (e.g., `10-telemetry.json`, `20-security.json`)

Within the managed tier, precedence is: server-managed > MDM/OS-level policies > file-based (`managed-settings.d/*.json` + `managed-settings.json`) > HKCU registry (Windows only). Only one managed source wins for most keys; sources do not merge across tiers. Within the file-based tier, drop-in files and the base file are merged together.

**Exception — admin-source union keys:** The following keys are honored when *any* admin-controlled managed source sets them, not just the winning source: `sandbox.network.allowManagedDomainsOnly`, `sandbox.network.allowedDomains` (when `allowManagedDomainsOnly` is set), `sandbox.filesystem.allowManagedReadPathsOnly`, `sandbox.filesystem.allowRead` (when `allowManagedReadPathsOnly` is set), `allowAllClaudeAiMcps`, `sandbox.bwrapPath`, `sandbox.socatPath`, `forceRemoteSettingsRefresh`, and `env` (which merges **per key** across all admin sources rather than taking the highest-precedence source's entire object).

> **Note:** As of v2.1.75, the deprecated Windows fallback path `C:\ProgramData\ClaudeCode\managed-settings.json` has been removed. Use `C:\Program Files\ClaudeCode\managed-settings.json` instead.

> **Note (v2.1.126):** `/config` now persists changes to `~/.claude/settings.json` instead of holding them in memory only. Edits made through the interactive Config UI survive restarts.

**Managed-only policy keys:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `parentSettingsBehavior` | string | `"first-wins"` | Controls whether managed settings supplied programmatically by an embedding host process (SDK parent) apply when an admin-deployed managed tier is also present. `"first-wins"`: parent-supplied settings are dropped and only the admin tier applies. `"merge"`: parent-supplied settings apply under the admin tier and are filtered so they can **tighten** policy but not loosen it. Requires v2.1.133+ |
| `policyHelper` | object | - | Admin-deployed executable that computes managed settings dynamically at startup. Object shape: `{path: string, timeoutMs?: number, refreshIntervalMs?: number}` — `path` points at the helper binary; `timeoutMs` caps the wait (omit or `0` for no timeout); `refreshIntervalMs` controls re-runs at session start (omit for startup-only, `0` disables, otherwise must be ≥ `60000`). Only honored from MDM or a system `managed-settings.json` file (never from user/project settings). **When configured, `policyHelper` output is the sole active managed source — other managed-tier sources (server-managed, MDM, file) are ignored for that run.** Requires v2.1.136+ |
| `requiredMinimumVersion` | string | - | **(Managed only)** Prevents Claude Code from starting if the installed version is below this floor. CLI exits with an error prompting the user to upgrade. Complements `minimumVersion` (which controls auto-update floor) — this one enforces at startup. Example: `"2.1.163"` |
| `requiredMaximumVersion` | string | - | **(Managed only)** Prevents Claude Code from starting if the installed version exceeds this ceiling. CLI exits with an error if the version is too new. Use alongside `requiredMinimumVersion` to pin a specific version range in managed environments. Example: `"2.1.165"` |
| `browserExternalPageTools` | string | - | **(Managed only)** Set to `"disabled"` to prevent Claude from using tools to read or act on external pages in the desktop app's Browser pane. Users can still navigate to external sites themselves, and local dev server previews are unaffected |
| `disableBrowserExternalNavigation` | boolean | - | **(Managed only)** Set to `true` (JSON boolean only — string `"true"` is silently ignored) to prevent Claude from navigating the desktop app's Browser pane to external URLs. Only JSON boolean `true` is honored |
| `disableMobileSimulatorTools` | boolean | - | **(Managed only)** Set to `true` (JSON boolean only — a malformed value logs a warning) to remove mobile simulator tools from Claude. Only JSON boolean `true` is honored |

**Important**:
- `deny` rules have highest safety precedence and cannot be overridden by lower-priority allow/ask rules.
- Managed settings may lock or override local behavior even if local files specify different values.
- Array settings (e.g., `permissions.allow`) are **concatenated and deduplicated** across scopes — entries from all levels are combined, not replaced. **Exceptions:** `fallbackModel`, `availableModels`, `modelPicker`, and `modelSettings` do **not** merge — the highest-precedence settings file that defines them supplies the entire value. For `availableModels`, a managed-source value applies as-is and lower scopes cannot extend it.

---

## Core Configuration

### General Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `$schema` | string | - | JSON Schema URL for IDE validation and autocompletion (e.g., `"https://json.schemastore.org/claude-code-settings.json"`) |
| `model` | string | `"default"` | Override default model. Accepts aliases (`sonnet`, `opus`, `haiku`) or full model IDs |
| `agent` | string | - | Set the default agent for the main conversation. Value is the agent name from `.claude/agents/`. Also available via `--agent` CLI flag |
| `language` | string | `"english"` | Claude's preferred response language. Also sets the voice dictation language and **auto-generated session titles** (v2.1.121; since v2.1.176, an unset language causes titles to match the conversation language) |
| `claudeMdExcludes` | array | - | Glob patterns or absolute paths of `CLAUDE.md` files to skip when loading [memory](https://code.claude.com/docs/en/memory). Patterns match against absolute file paths. Only applies to user, project, and local memory; managed policy files cannot be excluded. Example: `["**/vendor/**/CLAUDE.md"]` |
| `claudeMd` | string | - | **(Managed only)** CLAUDE.md-style instructions injected as organization-managed [memory](https://code.claude.com/docs/en/memory). Only honored when set in managed or policy settings; ignored in user, project, and local settings. Example: `"Always run make lint before committing."` |
| `cleanupPeriodDays` | number | `30` | Age cutoff for the startup cleanup sweep (minimum 1). Inactive session transcripts and orphaned subagent worktrees are deleted; as of v2.1.117 the sweep also covers `~/.claude/tasks/`, `~/.claude/shell-snapshots/`, and `~/.claude/backups/`. Setting to `0` is rejected with a validation error. To disable transcript writes in non-interactive mode (`-p`), use `--no-session-persistence` or `persistSession: false` SDK option |
| `autoUpdatesChannel` | string | `"latest"` | Release channel: `"stable"` or `"latest"` |
| `minimumVersion` | string | - | Prevent the auto-updater from downgrading below a specific version. Automatically set when switching to the stable channel and choosing to stay on the current version until stable catches up. Used with `autoUpdatesChannel` |
| `alwaysThinkingEnabled` | boolean | `false` | Enable extended thinking by default for all sessions |
| `thinkingBudgetTokens` | number | - | Set a fixed token budget for extended thinking per response. When set, limits the number of thinking tokens to the specified value. If unset, Claude Code uses a dynamic budget based on the model and effort level. Works alongside `alwaysThinkingEnabled` *(not in official settings page — unverified)* |
| `skipWebFetchPreflight` | boolean | `false` | Skip the WebFetch domain safety check that sends each requested hostname to `api.anthropic.com` before fetching. Set to `true` in environments that block outbound traffic to Anthropic, such as Bedrock, Vertex AI, or Foundry deployments with restrictive egress |
| `availableModels` | array | - | Restrict which models users can select via `/model`, `--model`, Config tool, or `ANTHROPIC_MODEL`. Does not affect the Default option. As of v2.1.172, also constrains the model picker for subagent dispatching and the `advisorModel` picker. Use `enforceAvailableModels: true` to additionally constrain the Default model option. Example: `["sonnet", "haiku"]` |
| `enforceAvailableModels` | boolean | `false` | **(Managed only)** When `true`, the `availableModels` allowlist also constrains the Default model option — users cannot select a model outside the allowlist even via the Default slot. Without this flag, `availableModels` leaves the Default option unrestricted. Pair with `availableModels` for full model lockdown (v2.1.175) |
| `fastModePerSessionOptIn` | boolean | `false` | Require users to opt in to fast mode each session |
| `fastMode` | boolean | `false` | Enable fast mode for all sessions. When `true`, Claude Code uses the faster model tier by default. Users can also toggle fast mode per session with `/fast`. Pairs with `fastModePerSessionOptIn` |
| `defaultShell` | string | `"bash"` | Default shell for input-box `!` commands. Accepts `"bash"` (default) or `"powershell"`. Setting `"powershell"` routes interactive `!` commands through PowerShell on Windows. Requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` (v2.1.84). **v2.1.120:** When PowerShell is available, it is used as the fallback shell on Windows even without Git for Windows installed. **v2.1.126:** When PowerShell is enabled, it is treated as the *primary* shell instead of defaulting to Bash. PowerShell 7 detection now also covers Microsoft Store installs, MSI installs not on PATH, and `.NET` global tool installs |
| `includeGitInstructions` | boolean | `true` | Include built-in commit and PR workflow instructions and the git status snapshot in Claude's system prompt. The `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` environment variable takes precedence over this setting when set |
| `voice` | object | - | Voice dictation configuration. Object with three fields: `enabled` (boolean — push-to-talk on/off), `mode` (string — `"hold"` for hold-to-talk or `"tap"` for tap-to-toggle), and `autoSubmit` (boolean — submit transcript immediately when dictation ends). Written automatically when you run `/voice`. Requires a Claude.ai account (v2.1.118 expanded structure) |
| `voiceEnabled` | boolean | - | **DEPRECATED** — legacy alias for `voice.enabled`. Use the `voice` object instead to get `mode` and `autoSubmit` controls |
| `showClearContextOnPlanAccept` | boolean | `false` | Show the "clear context" option on the plan accept screen. Set to `true` to restore the option (hidden by default since v2.1.81) |
| `viewMode` | string | - | Default transcript view mode on startup: `"default"`, `"verbose"`, or `"focus"`. Overrides the sticky `/focus` toggle selection when set |
| `disableDeepLinkRegistration` | string | - | Set to `"disable"` to prevent Claude Code from registering the `claude-cli://` protocol handler with the operating system on startup. Deep links let external tools open a Claude Code session with a pre-filled prompt via `claude-cli://open?q=...`. The `q` parameter supports multi-line prompts using URL-encoded newlines (`%0A`). Useful in environments where protocol handler registration is restricted or managed separately |
| `showThinkingSummaries` | boolean | `false` | Show extended thinking summaries in interactive sessions. When unset or `false` (default in interactive mode), thinking blocks are redacted by the API and shown as a collapsed stub. Redaction only changes what you see, not what the model generates — to reduce thinking spend, lower the budget or disable thinking instead. Non-interactive mode (`-p`) and SDK callers always receive summaries regardless of this setting |
| `disableSkillShellExecution` | boolean | `false` | Disable inline shell execution for `` !`...` `` and `` ```! `` blocks in skills and custom commands from user, project, plugin, or additional-directory sources. Commands are replaced with `[shell command execution disabled by policy]` instead of being run. Bundled and managed skills are not affected (v2.1.91) |
| `skillListingMaxDescChars` | number | `1536` | Per-skill character cap on the combined `description` and `when_to_use` text in the [skill listing](https://code.claude.com/docs/en/skills) Claude sees each turn. Text longer than this is truncated (v2.1.105) |
| `skillListingBudgetFraction` | number | `0.01` | Fraction of the model's context window reserved for the [skill listing](https://code.claude.com/docs/en/skills) Claude sees each turn (`0.01` = 1%). When the listing exceeds the budget, descriptions for the least-used skills are collapsed to bare names so Claude can still invoke them but won't see why (v2.1.105) |
| `forceRemoteSettingsRefresh` | boolean | `false` | **(Managed only)** Block CLI startup until remote managed settings are freshly fetched. If the fetch fails, the CLI exits (fail-closed). Use in enterprise environments where policy enforcement must be up-to-date before any session begins (v2.1.92) |
| `wslInheritsWindowsSettings` | boolean | `false` | **(Windows managed settings only)** When `true`, Claude Code on WSL reads managed settings from the Windows policy chain (HKLM registry + `C:\Program Files\ClaudeCode\managed-settings.json`) in addition to `/etc/claude-code`, with Windows sources taking priority. Only honored when set in the HKLM registry key or `C:\Program Files\ClaudeCode\managed-settings.json`, both of which require Windows admin to write. For HKCU policy to also apply on WSL, the flag must additionally be set in HKCU itself. Has no effect on native Windows (v2.1.118) |
| `tui` | string | `"default"` | Rendering mode: `"fullscreen"` or `"default"`. Set via `/tui fullscreen` for flicker-free alt-screen rendering (v2.1.110) |
| `awaySummaryEnabled` | boolean | `true` | Generate an "away summary" (idle-session recap) when the user returns after being away. Set to `false` to opt out. Pairs with the `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` env var (v2.1.110) |
| `autoCompactEnabled` | boolean | `true` | Auto-compact the conversation when context approaches the model's limit. Set to `false` to disable automatic compaction and manage context manually. Also disableable via the `DISABLE_AUTO_COMPACT` env var |
| `autoCompactWindow` | number | model-tuned | How full the context window gets before automatic compaction triggers, in tokens (100,000–1,000,000). When unset, Claude Code uses a window tuned for your model. Set it with the `/autocompact` command (writes to user settings) or the `--autocompact` CLI flag. Pairs with the `CLAUDE_CODE_AUTO_COMPACT_WINDOW` env var (v2.1.221+) |
| `skillOverrides` | object | - | Per-skill visibility overrides keyed by skill name. Value is `"on"` (full), `"name-only"` (visible but not auto-described), `"user-invocable-only"` (hidden from model discovery but still slash-invocable), or `"off"` (fully hidden). Example: `{"legacy-context": "name-only", "deploy": "off"}` (v2.1.129) |
| `disableRemoteControl` | boolean | `false` | Disable [Remote Control](https://code.claude.com/docs/en/remote-control): blocks `claude remote-control`, the `--remote-control` flag, auto-start, and the in-session toggle. Typically placed in managed settings for per-device MDM enforcement, but works from any scope (v2.1.128) |
| `agentPushNotifEnabled` | boolean | `false` | Send proactive push notifications to [Remote Control](https://code.claude.com/docs/en/remote-control) when Claude decides to push (e.g., task complete). Appears in `/config` as **Push when Claude decides** |
| `inputNeededNotifEnabled` | boolean | `false` | Send a push notification to [Remote Control](https://code.claude.com/docs/en/remote-control) when a permission prompt or question awaits user input. Appears in `/config` as **Push when actions required** |
| `remoteControlAtStartup` | boolean/null | - | Auto-connect [Remote Control](https://code.claude.com/docs/en/remote-control) on startup. `true` always auto-connects, `false` never auto-connects, unset uses the organization default. **Scope exception:** `false` in project or local settings applies even against a managed `true` (user and project settings can opt out). Only user settings, `--settings`, and managed settings can set it to `true` (v2.1.119+) |
| `disableAgentView` | boolean | `false` | Set to `true` to turn off [background agents and agent view](https://code.claude.com/docs/en/agent-view): `claude agents`, `--bg`, `/background`, and the on-demand supervisor. Can be set at any scope but typically placed in managed settings. Equivalent to setting the `CLAUDE_CODE_DISABLE_AGENT_VIEW` env var to `1` |
| `disableWorkflows` | boolean | `false` | Set to `true` to disable [dynamic workflows](https://code.claude.com/docs/en/workflows) (`/workflows`) and the bundled workflow slash commands. Can be set at any scope. Equivalent to the `CLAUDE_CODE_DISABLE_WORKFLOWS` env var. Workflows were introduced in v2.1.154 |
| `workflowKeywordTriggerEnabled` | boolean | `true` | Whether typing the word "ultracode" in a prompt triggers a [dynamic workflow](https://code.claude.com/docs/en/workflows). Set to `false` to require explicit `/workflows` invocation. Ultracode, `/workflows`, and saved workflow commands are unaffected by this setting. Appears in `/config` as **Ultracode keyword trigger** (v2.1.157; trigger keyword renamed workflow→ultracode in v2.1.160) |
| `ultracode` | boolean | - | **(Session-only — not persisted)** When `true`, the harness authors and runs a workflow for every substantive task by default, maximizing thoroughness regardless of token cost. Appears in the official "Available settings" list but is session-scoped: set via `/effort ultracode`, `--settings`, or the SDK rather than written to `settings.json` (v2.1.154) |
| `dynamicWorkflowSize` | string | - | Advisory guideline for the number of agents spawned in a [dynamic workflow](https://code.claude.com/docs/en/workflows). Values: `"small"`, `"medium"`, `"large"`. When set, the workflow harness uses this as the default fleet size before scaling up or down based on the task. Set via `/config` as **Workflow size** (v2.1.202; values formalized in v2.1.205) *(not in official docs — unverified; superseded by `workflowSizeGuideline` in v2.1.219)* |
| `workflowSizeGuideline` | string | `"medium"` | Advisory guideline for the dynamic workflow fleet size, settable from any settings file. Values: `"small"`, `"medium"` (default as of v2.1.219), `"large"`, `"unrestricted"`. The default fleet size now renders in the running-workflow status line. Use this key instead of `dynamicWorkflowSize` — it propagates from managed or user settings (v2.1.219) |
| `disableBundledSkills` | boolean | `false` | Conceal Claude Code's built-in capabilities (bundled skills) from the model. When `true`, the model cannot invoke built-in skills. Paired with the `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` env var. Useful when strict plugin-only customization is required (v2.1.169) |
| `disableArtifact` | boolean | `false` | Disable the Artifact web publishing tool. When `true`, Claude cannot create or publish web artifacts. Can be set at any scope |
| `enableArtifact` | boolean | - | **(v2.1.196+)** User-level opt-in for the Artifact web publishing tool. When set to `true`, enables Artifact for the user even when no organization policy requires it. `disableArtifact: true` takes precedence and overrides this setting |
| `feedbackSurveyRate` | number | - | Probability (0–1) that the session quality survey appears when eligible. Enterprise admins can control how often the survey is shown. Example: `0.05` = 5% of eligible sessions |
| `advisorModel` | string | - | Model for the server-side advisor tool. Accepts a model alias (`opus`, `sonnet`) or a full model ID. When unset, the advisor uses the session model. Requires v2.1.98+. **v2.1.210+:** Setting `"fable"` no longer attaches an advisor — Fable 5 is temporarily unavailable in the advisor picker; use `"opus"` or `"sonnet"` instead |
| `respondToBashCommands` | boolean | `true` | Whether Claude automatically responds after a `!` shell command completes. Set to `false` to disable the automatic follow-up response when a `!` bash command finishes (v2.1.186) |
| `askUserQuestionTimeout` | string | `"never"` | How long to wait before an unanswered AskUserQuestion dialog auto-continues without the user. Values: `"60s"`, `"5m"`, `"10m"`, `"never"` (no auto-continue — the default). Set via `/config` as **Question auto-continue timeout**. Pairs with the `CLAUDE_AFK_TIMEOUT_MS` env var; the env var applies only when this setting is set to a duration. Only honored from project and local settings — managed and user settings values are ignored. (v2.1.200) |
| `theme` | string | `"dark"` | UI color theme. Values: `"auto"` (follow OS), `"dark"`, `"light"`, `"dark-daltonized"`, `"light-daltonized"`, `"dark-ansi"`, `"light-ansi"`, `"custom:<slug>"`, `"custom:<plugin>:<slug>"`. Plugin-provided themes use the `custom:` prefix |
| `verbose` | boolean | `false` | Show full tool output instead of truncated summaries. Equivalent to running with `--verbose`; persists the verbose view across sessions |
| `switchModelsOnFlag` | boolean | `true` | Automatically switch to the fallback model when a safety classifier flags a request. When `false`, flagged requests are blocked rather than rerouted (v2.1.170) |
| `processWrapper` | string | - | Corporate launcher command used for background processes (e.g., a credential-injecting wrapper). Only honored from managed settings, user settings (`~/.claude/settings.json`), or `--settings`; ignored from project and local settings to prevent untrusted repos from hijacking background process launches (v2.1.210) |
| `remote.defaultEnvironmentId` | string | - | Default environment ID to use when launching remote sessions or background agents via `--remote` without an explicit environment ID. When set, Claude Code selects this environment automatically rather than prompting. Only honored from user and managed settings (v2.1.200+) |
| `crossSessionInbound` | string | - | Controls how this session handles messages from your other Claude sessions via Remote Control. Values: `"accept"` (receive messages from your other sessions), `"hold"` (queue inbound messages without processing), `"refuse"` (reject inbound session-to-session traffic). Scope exception: a stricter value from project or local settings applies even against a managed setting (`accept` < `hold` < `refuse`). Appears in `/config` as **Messages from your other sessions** (v2.1.224) |
| `dialogExpiry` | string | - | How long inbound dialog requests from your other sessions remain queued before auto-expiring. Accepts duration strings (e.g., `"5m"`, `"1h"`). When a `crossSessionInbound: "hold"` session resumes, queued requests older than this duration are dropped. Appears in `/config` as **Dialog expiry** (v2.1.246) |
| `autoContinueAtUsageLimit` | boolean | - | When `true`, Claude Code automatically continues the session when a usage limit (API rate limit, daily cap) resets instead of waiting for user input. Appears in `/config` as **Auto-continue at usage limit** (v2.1.234) |
| `feedbackDrafts` | boolean | `true` | When `true`, Claude Code queues bug-report drafts in the background when it encounters surprising errors. Set to `false` to disable background draft queuing. Gates the `SendFeedback` tool. Appears in `/config` as **Feedback drafts** (v2.1.247) |
| `desktopSessionCleanupPeriodDays` | number | - | Age cutoff in days for cleaning up desktop session data (separate from transcript cleanup controlled by `cleanupPeriodDays`). Inactive desktop session artifacts older than this threshold are removed during the startup cleanup sweep (v2.1.248) |

**Example:**
```json
{
  "model": "opus",
  "agent": "code-reviewer",
  "language": "japanese",
  "cleanupPeriodDays": 60,
  "autoUpdatesChannel": "stable",
  "alwaysThinkingEnabled": true
}
```

### Plans & Memory Directories

Store plan and auto-memory files in custom locations.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `plansDirectory` | string | `~/.claude/plans` | Directory where `/plan` outputs are stored |
| `autoMemoryDirectory` | string | - | Custom directory for auto-memory storage. Accepts `~/`-expanded paths. Not accepted in project settings (`.claude/settings.json`) to prevent redirecting memory writes to sensitive locations; accepted from policy, local, and user settings |
| `autoMemoryEnabled` | boolean | `true` | Enable [auto memory](https://code.claude.com/docs/en/memory). When `false`, Claude does not read from or write to the auto-memory directory. Can also be toggled with `/memory` during a session, or disabled via the `CLAUDE_CODE_DISABLE_AUTO_MEMORY` env var |
| `fileCheckpointingEnabled` | boolean | `true` | Snapshot files before each edit so you can restore them with `/rewind`. Set to `false` to skip checkpointing and save disk space. Also disableable via the `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING` env var |

**Example:**
```json
{
  "plansDirectory": "./my-plans"
}
```

**Use Case:** Useful for organizing planning artifacts separately from Claude's internal files, or for keeping plans in a shared team location.

### Worktree Settings

Configure how `--worktree` creates and manages git worktrees. Useful for reducing disk usage and startup time in large monorepos.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `worktree.symlinkDirectories` | array | `[]` | Directories to symlink from the main repository into each worktree to avoid duplicating large directories on disk |
| `worktree.sparsePaths` | array | `[]` | Directories to check out in each worktree via git sparse-checkout (cone mode). Only the listed paths are written to disk |
