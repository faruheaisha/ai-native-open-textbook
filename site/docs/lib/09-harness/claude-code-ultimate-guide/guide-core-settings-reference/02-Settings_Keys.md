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
pageSha256: "4a034db81aa4a4a8384dae74e516d053ea19ad08eb3838f04776edf082f52833"
contentMode: "local-full"
zh: ""
---

## Settings Keys

### Core Configuration

#### `$schema`
**Type:** string
**Scope:** all
**Default:** none

JSON Schema URL for IDE validation and autocomplete. Add `"https://json.schemastore.org/claude-code-settings.json"` to enable inline validation in VS Code, Cursor, and other editors.

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json"
}
```

#### `model`
**Type:** string
**Scope:** all
**Default:** `"default"`

Override the default model for all sessions. Accepts aliases (`"sonnet"`, `"opus"`, `"haiku"`, `"opusplan"`) or full model IDs like `"claude-sonnet-4-6"`. The `ANTHROPIC_MODEL` environment variable takes precedence.

```json
{ "model": "opus" }
```

#### `agent`
**Type:** string
**Scope:** all
**Default:** none

Run the main thread as a named subagent. Applies that agent's system prompt, tool restrictions, and model. Value must match an agent defined in `.claude/agents/`. Also available via `--agent` CLI flag.

```json
{ "agent": "code-reviewer" }
```

#### `language`
**Type:** string
**Scope:** all
**Default:** `"english"`

Claude's preferred response language. Also sets the voice dictation language. Examples: `"japanese"`, `"spanish"`, `"french"`.

#### `cleanupPeriodDays`
**Type:** number
**Scope:** all
**Default:** `30`

Sessions inactive longer than this number of days are deleted at startup. Setting to `0` deletes all existing transcripts at startup and disables session persistence entirely: no `.jsonl` files are written, `/resume` shows no conversations, and hooks receive an empty `transcript_path`.

#### `autoUpdatesChannel`
**Type:** string
**Scope:** all
**Default:** `"latest"`
**Values:** `"latest"` | `"stable"`

Release channel to follow. `"stable"` is typically about one week behind `"latest"` and skips versions with major regressions.

#### `alwaysThinkingEnabled`
**Type:** boolean
**Scope:** all
**Default:** `false`

Enable extended thinking by default for all sessions. Usually configured via `/config` rather than editing directly.

#### `includeGitInstructions`
**Type:** boolean
**Scope:** all
**Default:** `true`

Include built-in commit and PR workflow instructions and a git status snapshot in the system prompt. Set to `false` when using a custom git workflow skill. The `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` env var takes precedence.

#### `voiceEnabled`
**Type:** boolean
**Scope:** user
**Default:** none

Enable push-to-talk voice dictation. Written automatically when you run `/voice`. Requires a Claude.ai account.

#### `companyAnnouncements`
**Type:** array of strings
**Scope:** all
**Default:** none

Announcements displayed to users at startup. Multiple announcements are cycled through at random.

```json
{
  "companyAnnouncements": [
    "Welcome to Acme Corp! Review code guidelines at docs.acme.com",
    "All PRs require code review before merge"
  ]
}
```

#### `availableModels`
**Type:** array of strings
**Scope:** all
**Default:** none

Restrict which models users can select via `/model`, `--model`, Config tool, or `ANTHROPIC_MODEL`. Does not affect the Default option.

```json
{ "availableModels": ["sonnet", "haiku"] }
```

#### `fastModePerSessionOptIn`
**Type:** boolean
**Scope:** all
**Default:** `false`

When `true`, fast mode does not persist across sessions. Each session starts with fast mode off, requiring users to enable it with `/fast`. The user's preference is still saved.

#### `teammateMode`
**Type:** string
**Scope:** all
**Default:** `"auto"`
**Values:** `"auto"` | `"in-process"` | `"tmux"`

How agent team teammates display. `"auto"` uses split panes in tmux or iTerm2, in-process otherwise.

#### `showClearContextOnPlanAccept`
**Type:** boolean
**Scope:** all
**Default:** `false`

Show the "clear context" option on the plan accept screen. Set to `true` to restore the option, which was hidden by default starting in v2.1.81.

#### `feedbackSurveyRate`
**Type:** number
**Scope:** all
**Default:** none

Probability (0–1) that the session quality survey appears when eligible. Set to `0` to suppress entirely. Useful when using Bedrock, Vertex, or Foundry.

#### `disableAutoMode`
**Type:** string
**Scope:** all
**Default:** none
**Values:** `"disable"`

Set to `"disable"` to prevent auto mode from being activated. Removes `auto` from the `Shift+Tab` cycle and rejects `--permission-mode auto` at startup.

#### `useAutoModeDuringPlan`
**Type:** boolean
**Scope:** user / local
**Default:** `true`

Whether plan mode uses auto mode semantics when auto mode is available. Not read from shared project settings.

#### `autoMode`
**Type:** object
**Scope:** user / local
**Default:** none

Customize the auto mode classifier. Contains `environment`, `allow`, and `soft_deny` arrays of prose rules. Not read from shared project settings.

#### `defaultShell`
**Type:** string
**Scope:** all
**Default:** `"bash"`
**Values:** `"bash"` | `"powershell"`

Default shell for input-box `!` commands. `"powershell"` requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`.

#### `skipWebFetchPreflight` `📋 Schema only`
**Type:** boolean
**Scope:** all
**Default:** `false`

Skip the WebFetch blocklist check before fetching URLs.

#### `env`
**Type:** object
**Scope:** all
**Default:** none

Environment variables applied to every session. Use this instead of wrapper scripts to set variables. See the [Environment Variables](#environment-variables) section for all supported keys.

```json
{
  "env": {
    "NODE_ENV": "development",
    "CLAUDE_CODE_EFFORT_LEVEL": "medium"
  }
}
```

---

### Plans and Memory

#### `plansDirectory`
**Type:** string
**Scope:** all
**Default:** `"~/.claude/plans"`

Directory where `/plan` outputs are stored. Path is relative to the project root.

#### `autoMemoryEnabled`
**Type:** boolean
**Scope:** all
**Default:** `true`

Enable or disable the auto-memory feature that automatically saves context across sessions.

#### `autoMemoryDirectory`
**Type:** string
**Scope:** user / local / managed
**Default:** none

Custom directory for auto-memory storage. Accepts `~/`-expanded paths. Not accepted in project settings (`.claude/settings.json`) to prevent shared repos from redirecting memory writes to sensitive locations.

---

### Permissions

Control what tools and operations Claude can perform.

#### `permissions.allow`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Permission rules that allow tool use without prompting. Arrays are concatenated across scopes. See [Permission Rule Syntax](#permission-rule-syntax) below.

#### `permissions.ask`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Permission rules requiring user confirmation before tool use.

#### `permissions.deny`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Permission rules blocking tool use. Highest safety precedence, cannot be overridden by allow/ask rules at any scope.

#### `permissions.additionalDirectories`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Additional working directories that Claude has access to, beyond the current project root.

```json
{ "permissions": { "additionalDirectories": ["../shared-libs/"] } }
```

#### `permissions.defaultMode`
**Type:** string
**Scope:** all
**Default:** `"default"`
**Values:** `"default"` | `"acceptEdits"` | `"plan"` | `"bypassPermissions"`

Default permission mode when opening Claude Code. In Remote environments, only `"acceptEdits"` and `"plan"` are honored.

#### `permissions.disableBypassPermissionsMode`
**Type:** string
**Scope:** all
**Default:** none
**Values:** `"disable"`

Set to `"disable"` to prevent `bypassPermissions` mode from being activated. Disables the `--dangerously-skip-permissions` flag. Most useful in managed settings.

#### `allowManagedPermissionRulesOnly`
**Type:** boolean
**Scope:** managed only
**Default:** `false`

When `true`, user and project `allow`, `ask`, and `deny` rules are ignored. Only managed permission rules apply.

### Permission Rule Syntax

Rules follow the format `Tool` or `Tool(specifier)`. Evaluation order: deny first, then ask, then allow. The first matching rule wins.

| Tool | Pattern | Example |
|------|---------|---------|
| `Bash` | Command pattern with wildcards | `Bash(npm run *)`, `Bash(git *)` |
| `Read` | File path pattern | `Read(.env)`, `Read(./secrets/**)` |
| `Edit` | File path pattern | `Edit(src/**)`, `Edit(*.ts)` |
| `Write` | File path pattern | `Write(*.md)` |
| `WebFetch` | `domain:hostname` | `WebFetch(domain:example.com)` |
| `WebSearch` | No specifier | `WebSearch` |
| `Task` | Agent name | `Task(Explore)` |
| `Agent` | Agent name | `Agent(researcher)` |
| `MCP` | `mcp__server__tool` or `MCP(server:tool)` | `mcp__memory__*` |

**Path prefixes for Read/Edit rules:**

| Prefix | Meaning |
|--------|---------|
| `//` | Absolute path from filesystem root |
| `~/` | Relative to home directory |
| `/` | Relative to project root |
| `./` or none | Relative path (current directory) |

**Bash wildcard notes:** `*` matches at any position. `Bash(ls *)` (space before `*`) matches `ls -la` but NOT `lsof`. `Bash(*)` is equivalent to `Bash` (matches all commands). The legacy `:*` suffix (e.g., `Bash(npm:*)`) is deprecated.

```json
{
  "permissions": {
    "allow": ["Edit(*)", "Bash(npm run *)", "Bash(git *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(.env)", "Read(./secrets/**)"],
    "defaultMode": "acceptEdits"
  }
}
```

---

### Hooks

#### `hooks`
**Type:** object
**Scope:** all
**Default:** none

Configure custom commands to run at lifecycle events. See the [hooks documentation](https://code.claude.com/docs/en/hooks) and [§7.1 of the guide](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#71-the-event-system) for the full set of 30 hook events, exit codes, and environment variables.

#### `disableAllHooks`
**Type:** boolean
**Scope:** all
**Default:** `false`

Disable all hooks and any custom status line.

#### `allowManagedHooksOnly`
**Type:** boolean
**Scope:** managed only
**Default:** `false`

When `true`, only managed hooks and SDK hooks are loaded. User, project, and plugin hooks are blocked.

#### `allowedHttpHookUrls`
**Type:** array of strings
**Scope:** all
**Default:** none (no restriction)

Allowlist of URL patterns that HTTP hooks may target. Supports `*` as a wildcard. When defined, hooks with non-matching URLs are silently blocked. Empty array blocks all HTTP hooks. Arrays merge across settings sources.

```json
{ "allowedHttpHookUrls": ["https://hooks.example.com/*"] }
```

#### `httpHookAllowedEnvVars`
**Type:** array of strings
**Scope:** all
**Default:** none (no restriction)

Allowlist of environment variable names that HTTP hooks can interpolate into header values. Each hook's effective `allowedEnvVars` is the intersection with this list. Arrays merge across settings sources.

---

### MCP Servers

#### `enableAllProjectMcpServers`
**Type:** boolean
**Scope:** all
**Default:** `false`

Automatically approve all MCP servers defined in project `.mcp.json` files. Avoids per-server confirmation prompts.

#### `enabledMcpjsonServers`
**Type:** array of strings
**Scope:** all
**Default:** none

Allowlist of specific server names from `.mcp.json` files to approve.

#### `disabledMcpjsonServers`
**Type:** array of strings
**Scope:** all
**Default:** none

Blocklist of specific server names from `.mcp.json` files to reject.

#### `allowedMcpServers`
**Type:** array
**Scope:** managed only
**Default:** none (no restrictions)

Allowlist of MCP servers users can configure. Each entry matches by `serverName`, `serverCommand`, or `serverUrl`. Undefined = no restrictions, empty array = lockdown.

```json
{
  "allowedMcpServers": [
    { "serverName": "github" },
    { "serverCommand": "npx @modelcontextprotocol/*" },
    { "serverUrl": "https://mcp.company.com/*" }
  ]
}
```

#### `deniedMcpServers`
**Type:** array
**Scope:** managed only
**Default:** none

Blocklist of MCP servers that are explicitly blocked. Applies to all scopes including managed servers. Takes precedence over `allowedMcpServers`.

#### `allowManagedMcpServersOnly`
**Type:** boolean
**Scope:** managed only
**Default:** `false`

When `true`, only `allowedMcpServers` from managed settings are respected. Users can still add MCP servers, but only admin-defined servers are usable. `deniedMcpServers` still merges from all sources.

#### `channelsEnabled`
**Type:** boolean
**Scope:** managed only
**Default:** `false`

Allow channels for claude.ai Team and Enterprise users. When unset or `false`, channel message delivery is blocked regardless of what users pass to `--channels`. Console API-key deployments use Console defaults and managed controls instead; do not infer their policy from this Team/Enterprise-only setting.

#### `allowedChannelPlugins`
**Type:** array
**Scope:** managed only
**Default:** none (uses default Anthropic allowlist)

Allowlist of channel plugins that may push messages. Replaces the default Anthropic allowlist when set. Requires `channelsEnabled: true`. Empty array blocks all channel plugins.

> **Security boundary**: this allowlist controls which Channel plugins may deliver messages. It does not grant a delivered message, its sender, or the plugin any Bash, filesystem, GitHub, or other tool permission. Gate senders and treat Channel content as untrusted input, including when a plugin can relay a permission prompt.

---

### Sandbox

Configure bash command sandboxing for security. Available on macOS, Linux, and WSL2.

#### `sandbox.enabled`
**Type:** boolean
**Scope:** all
**Default:** `false`

Enable bash sandboxing. Isolates bash commands from your filesystem and network.

#### `sandbox.failIfUnavailable`
**Type:** boolean
**Scope:** all
**Default:** `false`

Exit with an error at startup if `sandbox.enabled` is `true` but the sandbox cannot start (missing dependencies, unsupported platform). When `false`, a warning is shown and commands run unsandboxed. Useful in managed deployments that require sandboxing as a hard gate.

#### `sandbox.autoAllowBashIfSandboxed`
**Type:** boolean
**Scope:** all
**Default:** `true`

Auto-approve bash commands when sandboxed. When the sandbox is active, bash commands that would normally require confirmation are automatically approved.

#### `sandbox.excludedCommands`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Commands that bypass the sandbox and run directly in your environment.

> **Use the glob form, not the bare name.** A bare entry such as `"git"` matches only the zero-argument string `git`, so it never fires on a real invocation and the command stays sandboxed. Write `"git *"` instead. The bare form is what the published JSON schema suggests, which is why this is easy to get wrong: you configure something that does nothing, notice the command is still sandboxed, and only then find the glob form ([anthropics/claude-code#10524](https://github.com/anthropics/claude-code/issues/10524)). Verified on 2.1.220: `"git"` had no effect, `"git *"` worked immediately.

> **A match unsandboxes the entire Bash invocation.** When an entry matches anywhere in a compound command, every other command in that same call runs unsandboxed too, including commands that execute *before* the excluded one. With `"git *"` present, `git status && cat ~/.ssh/id_ed25519` reads the key, because `filesystem.denyRead`, `credentials`, and the network allowlist are all suspended for that call ([anthropics/claude-code#81157](https://github.com/anthropics/claude-code/issues/81157), open as of 2026-07-25 on 2.1.220).
>
> Scope entries to the subcommands that genuinely need to leave the sandbox rather than the whole binary. Git over SSH is the common case: only the network operations need an exception, so list those and leave local git confined.
>
> ```json
> "excludedCommands": [
>   "git push *", "git pull *", "git fetch *",
>   "git clone *", "git ls-remote *", "git remote *", "git submodule *"
> ]
> ```
>
> This keeps `git status`, `git diff`, `git log`, `git add`, and `git commit` inside the sandbox, so the bypass window only opens on the calls that actually talk to a remote.

#### `sandbox.allowUnsandboxedCommands`
**Type:** boolean
**Scope:** all
**Default:** `true`

Allow commands to opt out of the sandbox via the `dangerouslyDisableSandbox` parameter. Set to `false` for strict sandboxing where all commands must run inside the sandbox or be in `excludedCommands`.

#### `sandbox.enableWeakerNestedSandbox`
**Type:** boolean
**Scope:** all
**Default:** `false`

Enable a weaker sandbox for unprivileged Docker environments (Linux and WSL2 only). Reduces security.

#### `sandbox.enableWeakerNetworkIsolation`
**Type:** boolean
**Scope:** all
**Default:** `false`

(macOS only) Allow access to the system TLS trust service (`com.apple.trustd.agent`). Required for Go-based tools like `gh`, `gcloud`, and `terraform` when using `httpProxyPort` with a MITM proxy and custom CA. Reduces security.

#### `sandbox.network.allowUnixSockets`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Specific Unix socket paths accessible in the sandbox on macOS (for SSH agents, local databases, etc.). Ignored on Linux and WSL2, where the seccomp filter cannot inspect socket paths; use `allowAllUnixSockets` only after accepting its broader boundary. The [cross-session inbox case](/lib/09-harness/claude-code-ultimate-guide/guide-security-sandbox-native#cross-session-inbox-sockets) does not require this exception for normal `SendMessage` calls.

#### `sandbox.network.allowAllUnixSockets`
**Type:** boolean
**Scope:** all
**Default:** `false`

Allow all Unix socket connections in the sandbox. Overrides `allowUnixSockets`. On Linux and WSL2, this is the only way to permit Unix sockets because it skips the seccomp filter that otherwise blocks `socket(AF_UNIX, ...)` calls.

#### `sandbox.network.allowLocalBinding`
**Type:** boolean
**Scope:** all
**Default:** `false`

Allow binding to localhost ports (macOS only).

#### `sandbox.network.allowedDomains`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Domains allowed for outbound network traffic. Supports wildcards like `*.example.com`.

#### `sandbox.network.allowManagedDomainsOnly`
**Type:** boolean
**Scope:** managed only
**Default:** `false`

When `true`, only `allowedDomains` and `WebFetch(domain:...)` allow rules from managed settings are respected. Non-allowed domains are blocked without prompting. Denied domains are still respected from all sources.

#### `sandbox.network.httpProxyPort`
**Type:** number
**Scope:** all
**Default:** none

HTTP proxy port for a custom proxy (1–65535). If not specified, Claude runs its own proxy.

#### `sandbox.network.socksProxyPort`
**Type:** number
**Scope:** all
**Default:** none

SOCKS5 proxy port for a custom proxy (1–65535).

#### `sandbox.network.deniedDomains` `⚠️ Unverified`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Network domain denylist for the sandbox. Not confirmed in official documentation.

#### `sandbox.filesystem.allowWrite`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Additional paths where sandboxed commands can write. Merged across all settings scopes. Also merged with paths from `Edit(...)` allow permission rules.

**Path prefix conventions:** `/` = absolute, `~/` = home-relative, `./` or no prefix = project-relative in project settings / `~/.claude`-relative in user settings.

#### `sandbox.filesystem.denyWrite`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Paths where sandboxed commands cannot write. Merged with `Edit(...)` deny rules.

#### `sandbox.filesystem.denyRead`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Paths where sandboxed commands cannot read. Merged with `Read(...)` deny rules.

#### `sandbox.filesystem.allowRead`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Paths to re-allow read access within `denyRead` regions. Takes precedence over `denyRead`. Arrays merge across all settings scopes.

When read rules overlap, the more specific path wins in both directions: `denyRead: ["~/"]` with `allowRead: ["~/projects"]` opens only that subtree, and `allowRead: ["~/"]` with `denyRead: ["~/.env"]` keeps that one file blocked. A broad allow cannot silently re-expose a secret an exact deny covers.

#### `sandbox.filesystem.disabled`
**Type:** boolean
**Scope:** user, managed, `--settings` (project settings ignored)
**Default:** `false`
**Since:** v2.1.216

Skip filesystem isolation while keeping network isolation. Sandboxed commands get unrestricted read and write access to the host, and their egress stays confined to `allowedDomains`. Use when the point of sandboxing is controlling where commands connect rather than what they write.

Turning the layer off also disables `filesystem.denyRead`, `credentials.files`, and the protection on Claude Code's own settings files, and stops the `$TMPDIR` override. `credentials.envVars` still applies, since environment scrubbing is independent of the filesystem layer.

Project settings cannot set it, so a checked-out repository cannot switch filesystem isolation off. When managed settings configure `sandbox.filesystem` at all, or list any `credentials.files` entry, only managed settings can set it. `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` makes Claude Code ignore it from every source.

> With the filesystem layer off and commands auto-allowed, a sandboxed command can write shell startup files, executables on `$PATH`, or `~/.claude/settings.json`, and use them to widen its own access on the next run. Set it only for workloads you trust not to escalate.

#### `sandbox.credentials.files`
**Type:** array of `\{ path, mode \}`
**Scope:** all (`deny` narrows only, so any scope may add one)
**Default:** `[]`
**Since:** v2.1.187

Credential files to hide from sandboxed commands. `mode` accepts only `"deny"`, which blocks reads the same way `filesystem.denyRead` does.

The sandbox's default read policy covers the **entire machine**, and there is no built-in credential denylist, so `~/.ssh` and `~/.aws/credentials` are readable by every sandboxed command until you list them. Paths follow the same prefix rules as `sandbox.filesystem.*`, and `deny` entries merge across every scope: any scope can add one, no scope can remove one another scope added.

```json
{
  "sandbox": {
    "credentials": {
      "files": [
        { "path": "~/.ssh", "mode": "deny" },
        { "path": "~/.aws", "mode": "deny" },
        { "path": "~/.gnupg", "mode": "deny" },
        { "path": "~/.config/gh", "mode": "deny" }
      ]
    }
  }
}
```

Verified on 2.1.220: with the entry in place, `ls ~/.ssh` from a sandboxed command returns `Operation not permitted` while the directory still appears in a listing of the home directory.

#### `sandbox.credentials.envVars`
**Type:** array of `\{ name, mode, injectHosts? \}`
**Scope:** `deny` from all scopes; `mask` from user, managed, `--settings` only
**Default:** `[]`
**Since:** v2.1.187 (`deny`), v2.1.199 (`mask`)

Environment variables to withhold from sandboxed commands. Sandboxed commands otherwise inherit the parent environment as-is, credentials included, which is the gap a `credentials.files` entry alone leaves open.

`deny` unsets the variable before each sandboxed command runs. It affects sandboxed Bash only, so MCP servers keep their credentials: they run as separate processes, not as sandboxed commands.

`mask` protects the credential while keeping the tool that authenticates with it working. The command sees a per-session sentinel; when a request leaves the sandbox for one of the credential's `injectHosts`, the proxy substitutes the real value. The command and anything it logs never hold the real credential. Each `injectHosts` entry must itself be covered by `allowedDomains`, and `network.tlsTerminate` is required because the proxy has to see request contents to substitute. Without it, masking fails closed: the sentinel reaches the server unchanged and authentication fails, and Claude Code reports the misconfiguration at startup.

```json
{
  "sandbox": {
    "network": { "tlsTerminate": {}, "allowedDomains": ["*.github.com"] },
    "credentials": {
      "envVars": [
        { "name": "ANTHROPIC_API_KEY", "mode": "deny" },
        { "name": "GH_TOKEN", "mode": "mask", "injectHosts": ["api.github.com"] }
      ]
    }
  }
}
```

`deny` wins when the same variable appears with both modes in any scope. Start with `deny` and move a variable to `mask` only when a CLI actually breaks without it, since `mask` requires TLS termination and authorizes the proxy to send the real credential to the listed hosts.

To strip Anthropic and cloud provider credentials from **all** subprocesses regardless of sandboxing, set `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` instead.

#### `sandbox.network.tlsTerminate` `⚠️ Experimental`
**Type:** object
**Scope:** user, managed, `--settings` (project settings ignored)
**Since:** v2.1.199

Make the built-in proxy terminate TLS itself. Required by `credentials.envVars` `mask` entries. It enables credential substitution; it does not add content filtering.

#### `sandbox.network.strictAllowlist`
**Type:** boolean
**Scope:** user, managed, `--settings` (project settings ignored)
**Default:** `false`
**Since:** v2.1.219

Deny sandboxed commands any host outside the allowlist instead of prompting. The allowlist is `allowedDomains` plus domains from `WebFetch(domain:...)` allow rules, or only the managed entries when `allowManagedDomainsOnly` is set. Applies to sandboxed commands only: in-process tools such as `WebFetch` still follow their permission rules.

Enable it last, once the domain list has survived a week of real work. Before that it converts every missing domain from a one-time prompt into a hard failure.

#### `sandbox.allowAppleEvents`
**Type:** boolean
**Scope:** user, managed, `--settings` (project settings ignored)
**Default:** `false`

Allow Apple Events on macOS, which the sandbox blocks by default. Fixes `open`, `osascript`, and browser-based auth flows failing with error `-600`.

> Enabling it removes code-execution isolation: sandboxed commands can launch other applications unsandboxed with no prompt, and send AppleScript to running applications, subject to the macOS automation-consent prompt. Prefer adding the specific command to `excludedCommands`.

#### `sandbox.filesystem.allowManagedReadPathsOnly`
**Type:** boolean
**Scope:** managed only
**Default:** `false`

When `true`, only `allowRead` paths from managed settings are respected. `allowRead` entries from user, project, and local settings are ignored.

**Sandbox example:**
```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["git push *", "git fetch *", "docker *"],
    "filesystem": {
      "allowWrite": ["/tmp/build", "~/.kube"],
      "denyRead": ["~/.aws/credentials"]
    },
    "network": {
      "allowedDomains": ["github.com", "*.npmjs.org"],
      "allowLocalBinding": true
    }
  }
}
```

Unix-socket exceptions are intentionally absent from this baseline. Granting `/var/run/docker.sock` would give sandboxed code control of the Docker daemon and an effective path to the host.

---

### Plugins and Marketplaces

#### `enabledPlugins`
**Type:** object
**Scope:** all
**Default:** none

Enable or disable specific plugins by key (format: `plugin-name@marketplace-name`).

```json
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "experimental@acme-tools": false
  }
}
```

#### `extraKnownMarketplaces`
**Type:** object
**Scope:** project
**Default:** none

Add custom plugin marketplaces. Use `source: "settings"` to declare plugins inline without hosting a repository.

#### `strictKnownMarketplaces`
**Type:** array
**Scope:** managed only
**Default:** none (no restrictions)

Allowlist of permitted plugin marketplaces. When set, users can only add plugins from listed marketplaces. Empty array blocks all additions.

#### `blockedMarketplaces`
**Type:** array
**Scope:** managed only
**Default:** none

Block specific plugin marketplace sources. Blocked sources are checked before downloading, so they never touch the filesystem.

#### `pluginTrustMessage`
**Type:** string
**Scope:** managed only
**Default:** none

Custom message appended to the plugin trust warning shown before installation. Use for org-specific context like confirming plugins from an internal marketplace are vetted.

#### `skippedMarketplaces` `📋 Schema only`
**Type:** array
**Scope:** all
**Default:** none

Marketplaces the user declined to install (stored automatically).

#### `skippedPlugins` `📋 Schema only`
**Type:** array
**Scope:** all
**Default:** none

Plugins the user declined to install (stored automatically).

#### `pluginConfigs` `📋 Schema only`
**Type:** object
**Scope:** all
**Default:** none

Per-plugin MCP server configurations, keyed by `plugin@marketplace`.

---

### Model Configuration

#### `effortLevel`
**Type:** string
**Scope:** all
**Default:** `"medium"`
**Values:** `"low"` | `"medium"` | `"high"`

Persist the effort level across sessions. Controls reasoning depth. Written automatically when you run `/effort low|medium|high`. Supported on Opus 4.6+ and Sonnet 4.6+. The `CLAUDE_CODE_EFFORT_LEVEL` env var takes precedence.

#### `modelOverrides`
**Type:** object
**Scope:** all
**Default:** none

Map Anthropic model IDs to provider-specific model IDs (e.g., Bedrock inference profile ARNs). Each key is a model picker entry name; each value is the provider model ID.

```json
{
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-opus-4-6-v1:0"
  }
}
```

**Model aliases reference:**

| Alias | Description |
|-------|-------------|
| `"default"` | Recommended model for your account type |
| `"sonnet"` | Latest Sonnet (Claude Sonnet 5) |
| `"opus"` | Latest Opus (Claude Opus 5) |
| `"haiku"` | Fast Haiku model |
| `"sonnet[1m]"` | Sonnet with 1M token context |
| `"opusplan"` | Opus for planning, Sonnet for execution |

---

### Display and UX

#### `statusLine`
**Type:** object
**Scope:** all
**Default:** none

Configure a custom status line. The command receives a JSON object on stdin with fields like `context_window.used_percentage`, `rate_limits.five_hour.used_percentage`, etc.

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }
}
```

#### `fileSuggestion`
**Type:** object
**Scope:** all
**Default:** none

Configure a custom script for `@` file path autocomplete. The command receives JSON on stdin with a `query` field and outputs newline-separated file paths (max 15).

```json
{
  "fileSuggestion": {
    "type": "command",
    "command": "~/.claude/file-suggestion.sh"
  }
}
```

#### `outputStyle`
**Type:** string
**Scope:** all
**Default:** `"Default"`

Controls how Claude communicates throughout the session. Equivalent to selecting a style via `/config` → "Preferred output style".

**Built-in values:**
- `"Default"`: concise, task-focused responses optimized for speed
- `"Explanatory"`: adds reasoning blocks explaining design choices, trade-offs, and codebase patterns
- `"Learning"`: pauses at key steps, inserts `TODO(human)` markers, asks you to write the meaningful pieces (pair-programming mode)

**Custom styles:** reference any filename (without `.md`) from `.claude/styles/`.

```json
{ "outputStyle": "Explanatory" }
```

```json
{ "outputStyle": "strict-reviewer" }
```

Setting persists across sessions. Explanatory and Learning increase output tokens; prompt caching offsets the cost after the first request. See [Section 9.7](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#97-output-styles) for full documentation and custom style examples.

#### `spinnerTipsEnabled`
**Type:** boolean
**Scope:** all
**Default:** `true`

Show tips in the spinner while Claude is working.

#### `spinnerVerbs`
**Type:** object
**Scope:** all
**Default:** none

Customize the action verbs shown in the spinner and turn duration messages. Set `mode` to `"replace"` to use only your verbs, or `"append"` to add to defaults.

```json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": ["Cooking", "Brewing", "Crafting", "Conjuring"]
  }
}
```

#### `spinnerTipsOverride`
**Type:** object
**Scope:** all
**Default:** none

Override spinner tips with custom strings. `tips`: array of strings. `excludeDefault`: when `true`, only show custom tips.

```json
{
  "spinnerTipsOverride": {
    "tips": ["Use /compact at 50% context", "Plan mode helps for complex tasks"],
    "excludeDefault": true
  }
}
```

#### `respectGitignore`
**Type:** boolean
**Scope:** all
**Default:** `true`

Control whether the `@` file picker respects `.gitignore` patterns.

#### `prefersReducedMotion`
**Type:** boolean
**Scope:** all
**Default:** `false`

Reduce or disable UI animations (spinners, shimmer, flash effects) for accessibility.

---

### Authentication

#### `apiKeyHelper`
**Type:** string
**Scope:** all
**Default:** none

Shell script path (executed in `/bin/sh`) that outputs an auth token sent as `X-Api-Key` and `Authorization: Bearer` headers for model requests. Useful for short-lived credentials.

```json
{ "apiKeyHelper": "/bin/generate_temp_api_key.sh" }
```

#### `forceLoginMethod`
**Type:** string
**Scope:** all
**Default:** none
**Values:** `"claudeai"` | `"console"`

Restrict login to Claude.ai accounts (`"claudeai"`) or Claude Console API-billing accounts (`"console"`).

#### `forceLoginOrgUUID`
**Type:** string
**Scope:** all
**Default:** none

UUID of an organization to automatically select during login, bypassing the org selection step. Requires `forceLoginMethod` to be set.

---

### Attribution

#### `attribution.commit`
**Type:** string
**Scope:** all
**Default:** Git trailer with co-authored-by line

Attribution text added to git commits. Supports git trailers. Set to empty string to disable commit attribution entirely.

#### `attribution.pr`
**Type:** string
**Scope:** all
**Default:** Generated message with Claude Code link

Attribution text added to pull request descriptions. Set to empty string to disable.

#### `includeCoAuthoredBy`
**Type:** boolean
**Scope:** all
**Default:** `true`
**Status:** DEPRECATED, use `attribution` instead

Whether to include the `Co-Authored-By` byline. Superseded by the `attribution` object.

```json
{
  "attribution": {
    "commit": "Generated with AI\n\nCo-Authored-By: AI <ai@example.com>",
    "pr": ""
  }
}
```

---

### Worktrees

#### `worktree.symlinkDirectories`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Directories to symlink from the main repository into each worktree, avoiding large duplicated directories on disk (e.g., `node_modules`).

#### `worktree.sparsePaths`
**Type:** array of strings
**Scope:** all
**Default:** `[]`

Directories to check out in each worktree via git sparse-checkout (cone mode). Only listed paths are written to disk, useful for large monorepos.

```json
{
  "worktree": {
    "symlinkDirectories": ["node_modules", ".cache"],
    "sparsePaths": ["packages/my-app", "shared/utils"]
  }
}
```

---

### AWS and Cloud

#### `awsAuthRefresh`
**Type:** string
**Scope:** all
**Default:** none

Custom script that modifies the `.aws` directory. Runs to refresh AWS credentials before API calls.

```json
{ "awsAuthRefresh": "aws sso login --profile myprofile" }
```

#### `awsCredentialExport`
**Type:** string
**Scope:** all
**Default:** none

Custom script that outputs JSON with AWS credentials. Used for non-standard credential sources.

#### `otelHeadersHelper`
**Type:** string
**Scope:** all
**Default:** none

Script to generate dynamic OpenTelemetry headers. Runs at startup and periodically. See the monitoring docs for the expected output format.

---

### Global Config (`~/.claude.json`)

These settings are stored in `~/.claude.json`, not `settings.json`. Adding them to `settings.json` triggers a schema validation error.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `autoConnectIde` | boolean | `false` | Auto-connect to a running IDE when Claude Code starts from an external terminal |
| `autoInstallIdeExtension` | boolean | `true` | Auto-install the Claude Code IDE extension when running from a VS Code terminal |
| `editorMode` | string | `"normal"` | Key binding mode: `"normal"` or `"vim"`. Written automatically by `/vim` |
| `showTurnDuration` | boolean | `true` | Show turn duration messages after responses (e.g., "Cooked for 1m 6s") |
| `terminalProgressBarEnabled` | boolean | `true` | Show terminal progress bar in ConEmu, Ghostty 1.2.0+, and iTerm2 3.6.6+ |

---

### Additional Schema-Only Keys

Keys confirmed in the JSON schema not covered in the sections above:

| Key | Type | Description |
|-----|------|-------------|
| `claudeMdExcludes` `📋 Schema only` | array | Glob patterns for CLAUDE.md files to exclude from loading |
| `allowManagedMcpServersOnly` | boolean | (Managed) Only managed MCP servers are usable |
| `allowManagedHooksOnly` | boolean | (Managed) Only managed and SDK hooks are loaded |
| `autoMemoryEnabled` | boolean | Enable/disable auto-memory feature |
| `feedbackSurveyRate` | number | Survey appearance probability (0–1) |
