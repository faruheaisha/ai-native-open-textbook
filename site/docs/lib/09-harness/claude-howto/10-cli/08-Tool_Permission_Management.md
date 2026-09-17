---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/10-cli/README.md"
sourceRel: "10-cli/README.md"
rawUrl: "/raw/09-harness/claude-howto/10-cli/README.md"
sourceSha256: "d828c0d6684b52e2c08a4547b5e6e526f7b27045e72b6e3e8b73824e05e7f8e5"
pageSha256: "4aa0440e9f7684f4bfe7ad000ccf13155205c9e497bb9c749279ab9a218a4248"
contentMode: "local-full"
zh: ""
---

## Tool & Permission Management

| Flag | Description | Example |
|------|-------------|---------|
| `--tools` | Restrict available built-in tools | `claude -p --tools "Bash,Edit,Read" "query"` |
| `--allowedTools` | Tools that execute without prompting | `"Bash(git log:*)" "Read"` |
| `--disallowedTools` | Tools removed from context | `"Bash(rm:*)" "Edit"` |
| `--dangerously-skip-permissions` | Skip all permission prompts | `claude --dangerously-skip-permissions` |
| `--permission-mode` | Begin in specified permission mode | `claude --permission-mode auto` |
| `--permission-prompt-tool` | MCP tool for permission handling | `claude -p --permission-prompt-tool mcp_auth "query"` |
| `--permission-prompts` | (v2.1.259) Who answers permission prompts in print mode. Default `host` sends them to the Agent SDK host or the `--permission-prompt-tool` tool; pass `none` when nobody can answer and Claude Code denies them instead | `claude -p --permission-prompts none "query"` |

> **v2.1.111 update**: `--enable-auto-mode` was removed; auto mode is now in the `Shift+Tab` cycle by default — use `--permission-mode auto` to start in it directly.

> **Glob / Grep footnote (v2.1.113+)**: On native macOS/Linux builds, `Glob` and `Grep` are provided as the embedded `bfs` and `ugrep` binaries invoked through the Bash tool rather than as separate first-class tools. Windows and npm-bundled (JS) installs still expose them as standalone tools. For subagent `allowedTools` / `disallowedTools` lists the backend substitution is transparent — you can keep referring to `Glob` / `Grep` in your configuration on every platform.

> **PowerShell auto-approve (v2.1.119)**: PowerShell tool commands can be auto-approved in permission mode exactly the same way Bash commands are. Use the same matcher syntax you already use for `Bash(...)` rules to scope PowerShell permissions — for example, `PowerShell(Get-ChildItem:*)`.

> **`--permission-mode` honored on resume (v2.1.132+)**: `claude -p --continue --permission-mode plan` (and `--resume`) now respects the flag. Earlier versions silently dropped `--permission-mode` when resuming a session, so a plan-mode session resumed without re-passing the flag would silently downgrade — that's fixed.

> **Permission hardening (v2.1.214)**: Docker/Podman commands using daemon-redirect flags (e.g. `--url`, `--connection`, `--identity`) now require a permission prompt instead of running automatically. `file` commands using `-m`/`--magic-file` or `-f`/`--files-from` also now require permission. Bash commands over 10,000 characters always prompt for permission, regardless of allow rules.

### Permission Examples

```bash
# Read-only mode for code review
claude --permission-mode plan "review this codebase"

# Restrict to safe tools only
claude --tools "Read,Grep,Glob" -p "find all TODO comments"

# Allow specific git commands without prompts
claude --allowedTools "Bash(git status:*)" "Bash(git log:*)"

# Block dangerous operations
claude --disallowedTools "Bash(rm -rf:*)" "Bash(git push --force:*)"
```

> **Parameter matching `Tool(param:value)` (v2.1.178)**: Permission rules follow the format `Tool` (every use) or `Tool(specifier)`. As of v2.1.178, a specifier can match a tool's input **parameters**, not just command or path patterns — using the `Tool(param:value)` form with wildcard support. This generalizes the matching you already use for `Bash(...)` command prefixes (e.g. `Bash(npm run test *)`) and `Read(...)` path globs (e.g. `Read(./.env.*)`) so other tools can be scoped by their arguments. Check the [permissions reference](https://code.claude.com/docs/en/settings) for the current per-tool example strings before writing a rule, since the exact parameter names differ by tool.
