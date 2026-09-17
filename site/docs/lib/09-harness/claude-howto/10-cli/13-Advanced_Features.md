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
pageSha256: "2376aedd2cfe5fdb58404a415467e3a6668aa9d0ea1229b39daa64ab225722c9"
contentMode: "local-full"
zh: ""
---

## Advanced Features

| Flag | Description | Example |
|------|-------------|---------|
| `--chrome` | Enable Chrome browser integration | `claude --chrome` |
| `--no-chrome` | Disable Chrome browser integration | `claude --no-chrome` |
| `--ide` | Auto-connect to IDE if available | `claude --ide` |
| `--max-turns` | Limit agentic turns (non-interactive) | `claude -p --max-turns 3 "query"` |
| `--debug` | Enable debug mode with filtering | `claude --debug "api,mcp"` |
| `--enable-lsp-logging` | Enable verbose LSP logging | `claude --enable-lsp-logging` |
| `--betas` | Beta headers for API requests | `claude --betas interleaved-thinking` |
| `--plugin-dir` | Load plugins from directory (repeatable) | `claude --plugin-dir ./my-plugin` |
| `--effort` | Set thinking effort level | `claude --effort high` |
| `--bare` | Minimal mode (skip hooks, skills, plugins, MCP, auto memory, CLAUDE.md) | `claude --bare` |
| `--channels` | Subscribe to MCP channel plugins (tagged `plugin:<name>@<marketplace>`) | `claude --channels plugin:discord@my-marketplace` |
| `--tmux` | Create tmux session for worktree | `claude --tmux` |
| `--fork-session` | Create new session ID when resuming | `claude --resume abc --fork-session` |
| `--max-budget-usd` | Maximum spend (print mode); also halts background subagents when hit (v2.1.217) | `claude -p --max-budget-usd 5.00 "query"` |
| `--json-schema` | Validated JSON output | `claude -p --json-schema '\{"type":"object"\}' "q"` |
| `--ax-screen-reader` | Plain-text rendering mode for screen readers (v2.1.208) | `claude --ax-screen-reader` |

### Platform & Theme Notes (v2.1.112)

- **PowerShell tool on Windows**: A dedicated PowerShell tool is rolling out on Windows and is controllable via environment variable.
- **Auto (match terminal) theme**: The new "Auto (match terminal)" theme syncs Claude Code's light/dark appearance with your terminal.
- **Quieter permission prompts**: Read-only `Bash` invocations and `Glob` patterns no longer trigger permission prompts.

### Advanced Examples

```bash
# Limit autonomous actions
claude -p --max-turns 5 "refactor this module"

# Debug API calls
claude --debug "api" "test query"

# Enable IDE integration
claude --ide "help me with this file"
```
