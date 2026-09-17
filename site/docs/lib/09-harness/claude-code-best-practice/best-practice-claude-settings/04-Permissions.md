---
title: "Claude Code Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-settings.md"
sourceRel: "best-practice/claude-settings.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/best-practice/claude-settings.md"
sourceSha256: "75075e7b44bd6afd58459b40b4d627c415bb3b04514783ad87ee15a97b2e8077"
pageSha256: "ecb755c06eb03d9d2a1a0e4e1f74a7ad2372cf4efd898e083b52837c72faf25e"
contentMode: "local-full"
zh: ""
---

## Permissions

Control what tools and operations Claude can perform.

### Permission Structure

```json
{
  "permissions": {
    "allow": [],
    "ask": [],
    "deny": [],
    "additionalDirectories": [],
    "defaultMode": "acceptEdits",
    "disableBypassPermissionsMode": "disable"
  }
}
```

### Permission Keys

| Key | Type | Description |
|-----|------|-------------|
| `permissions.allow` | array | Rules allowing tool use without prompting |
| `permissions.ask` | array | Rules requiring user confirmation |
| `permissions.deny` | array | Rules blocking tool use (highest precedence) |
| `permissions.additionalDirectories` | array | Extra directories Claude can access |
| `permissions.defaultMode` | string | Default permission mode. Valid values: `"default"`, `"manual"` (alias for `"default"`, v2.1.200), `"acceptEdits"`, `"dontAsk"`, `"bypassPermissions"`, `"auto"`, `"plan"`. In Remote environments, only `acceptEdits` and `plan` are honored (v2.1.70+). **Note (v2.1.142):** `"auto"` is ignored when set in project (`.claude/settings.json`) or local settings — a repository cannot grant itself auto mode; use `~/.claude/settings.json` instead |
| `permissions.disableBypassPermissionsMode` | string | Prevent bypass mode activation |
| `permissions.skipDangerousModePermissionPrompt` | boolean | Skip the confirmation prompt shown before entering bypass permissions mode via `--dangerously-skip-permissions` or `defaultMode: "bypassPermissions"`. Ignored when set in project settings (`.claude/settings.json`) to prevent untrusted repositories from auto-bypassing the prompt |
| `allowManagedPermissionRulesOnly` | boolean | **(Managed only)** Only managed permission rules apply; user/project `allow`, `ask`, `deny` rules are ignored |
| `autoMode` | object | Customize what the [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) classifier blocks and allows. Contains `environment` (trusted infrastructure descriptions), `allow` (exceptions to block rules), `soft_deny` (block rules), and `hard_deny` (unconditional block rules — cannot be overridden by `allow` exceptions or the `$defaults` sentinel, v2.1.136) — all arrays of prose strings. Also accepts `classifyAllShell` (boolean, default `false`): when `true`, routes all Bash/PowerShell commands through the auto-mode classifier instead of only arbitrary-code-execution patterns, giving stricter coverage at the cost of more classifier calls (v2.1.193). **Not read from shared project settings** (`.claude/settings.json`) **or local settings** (`.claude/settings.local.json`) to prevent repo injection (v2.1.207 removed local-settings scope). Available in user and managed settings only; configure in `~/.claude/settings.json`. Setting `allow` or `soft_deny` **replaces** the entire default list for that section unless you include the literal string `"$defaults"` in the array — the sentinel inherits the built-in rules at that position so custom entries are added alongside them (v2.1.118). Run `claude auto-mode defaults` to see built-in rules before customizing |
| `disableAutoMode` | string | Set to `"disable"` to prevent [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) from being activated. Removes `auto` from the `Shift+Tab` cycle and rejects `--permission-mode auto` at startup. Can be set at any settings level; most useful in managed settings where users cannot override it |
| `useAutoModeDuringPlan` | boolean | Whether plan mode uses auto mode semantics when auto mode is available. Default: `true`. Not read from shared project settings (`.claude/settings.json`). Appears in `/config` as "Use auto mode during plan" |

### Permission Modes

| Mode | Behavior |
|------|----------|
| `"default"` | Standard permission checking with prompts |
| `"manual"` | Alias for `"default"` introduced in v2.1.200 — same standard permission checking with prompts. The rename improves clarity across the CLI, VS Code, and JetBrains UIs. Accepted wherever `"default"` is accepted |
| `"acceptEdits"` | Automatically accepts file edits **and common filesystem commands** (`mkdir`, `touch`, `mv`, `cp`, etc.) for paths in the working directory or `additionalDirectories`. **v2.1.160:** Always prompts before writing build-tool config files that grant code execution (`.npmrc`, `.yarnrc*`, `bunfig.toml`, `.bazelrc`, `.pre-commit-config.yaml`, `.devcontainer/`, etc.) and before writing to shell startup files (`.zshenv`, `.zlogin`, `.bash_login`) and `~/.config/git/` |
| `"dontAsk"` | Auto-denies tools unless pre-approved via `/permissions` or `permissions.allow` rules. Tools marked `requiresUserInteraction` in their MCP server manifest and organization-set-to-ask connector tools are **denied** even if you've explicitly allowed them |
| `"bypassPermissions"` | Skip all permission checks (dangerous). All path-based prompts are skipped — writes to `.git`, `.config/git`, `.claude`, `.vscode`, `.idea`, `.husky`, `.cargo`, `.devcontainer`, `.yarn`, and `.mvn` no longer prompt (**v2.1.121** exempted `.claude/commands/`, `.claude/agents/`, `.claude/skills/`, and `.claude/worktrees/`; **v2.1.126** removed all remaining path-based prompts). Three classes still prompt regardless: (1) removals targeting the filesystem root or home directory (`rm -rf /`, `rm -rf ~`, including commands using `$(...)`, backtick substitution, or `<(...)` process substitution), (2) tools marked `requiresUserInteraction` in their MCP server manifest, and (3) organization-set-to-ask connector tools. Explicit `permissions.ask` rules still prompt — only the built-in permission checks are bypassed |
| `"auto"` | Auto-approves tool calls with background safety checks that verify actions align with your request. Research preview. Classifier auto-approves read-only and file edits; sends everything else through a safety check. Falls back to prompting after 3 consecutive or 20 total blocks. In the default `Shift+Tab` permission-mode cycle since v2.1.111 (the `--enable-auto-mode` flag was removed in v2.1.111 — start in this mode with `--permission-mode auto`). Configure with the `autoMode` setting |
| `"plan"` | Read-only exploration mode. As of v2.1.136, file writes are blocked even when a matching `Edit(...)` allow rule exists — plan mode now overrides explicit allow rules to maintain its read-only guarantee |

### Tool Permission Syntax

| Tool | Syntax | Examples |
|------|--------|----------|
| `Bash` | `Bash(command pattern)` | `Bash(npm run *)`, `Bash(* install)`, `Bash(git * main)` |
| `PowerShell` | `PowerShell(cmd *)` | `PowerShell(Get-ChildItem *)`, `PowerShell(git commit *)` — same shape as Bash; common aliases are canonicalized (`gci`/`ls`/`dir` → `Get-ChildItem`) and the PowerShell AST is parsed so each subcommand of a `|`/`;`/`&&`/`||` chain must match |
| `Read` | `Read(path pattern)` | `Read(.env)`, `Read(./secrets/**)` |
| `Edit` | `Edit(path pattern)` | `Edit(src/**)`, `Edit(*.ts)` |
| `Write` | `Write(path pattern)` | `Write(*.md)`, `Write(./docs/**)` — **valid in `deny` and `ask` rules only**; accepted in `allow` rules at parse time but never consulted (see note below) |
| `NotebookEdit` | `NotebookEdit(pattern)` | `NotebookEdit(*)` — **valid in `deny` and `ask` rules only**; accepted in `allow` rules at parse time but never consulted (see note below) |
| `WebFetch` | `WebFetch(domain:pattern)` | `WebFetch(domain:example.com)` |
| `WebSearch` | `WebSearch` | Global web search |
| `Task` | `Task(agent-name)` | `Task(Explore)`, `Task(my-agent)` — legacy alias for `Agent`; prefer `Agent(name)` in new configs |
| `Agent` | `Agent(name)` | `Agent(researcher)`, `Agent(*)` — permission scoped to subagent spawning |
| `Skill` | `Skill(skill-name)` or `Skill(prefix *)` | `Skill(weather-fetcher)`, `Skill(weather *)` matches `weather-fetcher`/`weather-svg-creator` (v2.1.139) *(not in official permissions docs — unverified)* |
| `MCP` | `mcp__server__tool` | `mcp__memory__*`, `mcp__github__*` — official docs show only the double-underscore form; `MCP(server:tool)` shorthand *(not in official permissions docs — unverified)* |
| `Tool` | `Tool(param:value)` | `Agent(model:opus)`, `Agent(isolation:worktree)`, `Bash(run_in_background:true)` — match **deny and ask rules** against a tool's input parameters; supports `*` wildcards in the value position. **Allow rules do not use this syntax** — an allow rule for one parameter value wouldn't establish overall safety, so allow rules continue to use each tool's own specifier syntax. Matching a tool's primary content field (e.g., `Bash(command:rm *)`) is also forbidden and triggers a startup warning (v2.1.178) |
| `Cd` | `Cd(path pattern)` | `Cd(/home/*)`, `Cd(~/projects/*)` — controls which directories the `/cd` command may navigate to. **Allowlist mode:** adding *any* `Cd` allow rule switches `/cd` into allowlist mode — all paths not explicitly allowed are refused. A bare `Cd` deny disables `/cd` entirely. **Wildcard semantics differ from Read/Edit:** `*` matches exactly one path segment; `**` crosses segments. A trailing `/**` also matches the named root itself. These rules do NOT follow gitignore-style matching |

> **v2.1.210:** `Write(path)`, `NotebookEdit(path)`, and `Glob(path)` in **allow** rules are accepted at parse time but **never consulted** — Claude Code's allow-rule evaluation only checks `Edit(path)` and `Read(path)`. A startup warning flags these entries and recommends the correct alternatives. In **deny** and **ask** rules, `Write(path)`, `NotebookEdit(path)`, and `Glob(path)` continue to work as expected.

**Evaluation order:** Rules are evaluated in order: deny rules first, then ask, then allow. The first matching rule wins.

**Deny rule glob patterns (v2.1.166):** In a `deny` rule, using `"*"` in the tool-name position matches ALL tools — equivalent to a global deny. For example, `"*"` in the deny array blocks every tool call. This makes it possible to lock down access completely and carve out specific allow/ask exceptions.

**Allow rule glob restrictions:** In an `allow` rule, tool-name globs are only accepted **after a literal `mcp__<server>__` prefix** — the server segment must be glob-free. An unanchored allow glob such as `"*"`, `"B*"`, or `"mcp__*"` is **skipped with a startup warning** and does not auto-approve anything. For example, `"allow": ["mcp__github__*"]` works, but `"allow": ["mcp__*"]` does not. Use `"deny": ["*"]` plus specific allow rules to allowlist instead.

**Read/Edit path patterns:** Permission rules for `Read`, `Edit`, and `Write` support gitignore-style patterns with four prefix types:

| Prefix | Meaning | Example |
|--------|---------|---------|
| `//` | Absolute path from filesystem root | `Read(//Users/alice/file)` |
| `~/` | Relative to home directory | `Read(~/.zshrc)` |
| `/` | Relative to project root | `Edit(/src/**)` |
| `./` or none | Relative path (current directory) | `Read(.env)`, `Read(*.ts)` |

**Symlink resolution:** Permission rules check both the symlink path and its resolved target. **Allow** rules apply only when *both* the symlink and its target match — a symlink inside an allowed directory that points outside it still prompts. **Deny** rules apply when *either* the symlink or its target matches — a symlink to a denied file is itself denied.

**Bash wildcard notes:**
- `*` can appear at **any position**: prefix (`Bash(* install)`), suffix (`Bash(npm *)`), or middle (`Bash(git * main)`)
- **Word boundary:** `Bash(ls *)` (space before `*`) matches `ls -la` but NOT `lsof`; `Bash(ls*)` (no space) matches both
- `Bash(*)` is treated as equivalent to `Bash` (matches all bash commands)
- Permission rules support output redirections: `Bash(python:*)` matches `python script.py > output.txt`
- The `:*` suffix syntax (e.g., `Bash(npm:*)`) is an equivalent way to write a trailing wildcard — it is **not deprecated** but only recognized at the end (e.g., `Bash(git:* push)` treats the colon literally). The permission dialog writes the space form
- **Compound commands:** shell operators (`&&`, `||`, `;`, `|`, `|&`, `&`, and newlines) split a command and each subcommand must match independently — `Bash(safe-cmd *)` does **not** authorize `safe-cmd && other-cmd`
- **Process wrappers:** `timeout`, `time`, `nice`, `nohup`, and `stdbuf` are stripped before matching (so `Bash(npm test *)` also matches `timeout 30 npm test`); bare `xargs` (no flags) is stripped too. Exec wrappers `watch`, `setsid`, `ionice`, `flock`, and `find` with `-exec`/`-delete` always prompt and cannot be approved by a prefix rule

**Example:**
```json
{
  "permissions": {
    "allow": [
      "Edit(*)",
      "Bash(npm run *)",
      "Bash(git *)",
      "WebFetch(domain:*)",
      "mcp__memory__*"
    ],
    "ask": [
      "Bash(rm *)",
      "Bash(git push *)"
    ],
    "deny": [
      "Read(.env)",
      "Read(./secrets/**)",
      "Bash(curl *)"
    ],
    "additionalDirectories": ["../shared-libs/"]
  }
}
```
