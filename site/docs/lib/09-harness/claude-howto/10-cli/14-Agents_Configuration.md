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
pageSha256: "c27ce347c174e0db32e61ad0fbd46021666ad9325078caccbe57404799afdbdc"
contentMode: "local-full"
zh: ""
---

## Agents Configuration

The `--agents` flag accepts a JSON object defining custom subagents for a session.

As of **v2.1.243**, `--agents` no longer silently ignores invalid JSON or an invalid agent definition — it exits with a clear error, matching how `--mcp-config` already behaved.

### Agents JSON Format

```json
{
  "agent-name": {
    "description": "Required: when to invoke this agent",
    "prompt": "Required: system prompt for the agent",
    "tools": ["Optional", "array", "of", "tools"],
    "model": "optional: sonnet|opus|haiku"
  }
}
```

**Required Fields:**
- `description` - Natural language description of when to use this agent
- `prompt` - System prompt that defines the agent's role and behavior

**Optional Fields:**
- `tools` - Array of available tools (inherits all if omitted)
  - Format: `["Read", "Grep", "Glob", "Bash"]`
- `model` - Model to use: `sonnet`, `opus`, or `haiku`

### Complete Agents Example

```json
{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  },
  "debugger": {
    "description": "Debugging specialist for errors and test failures.",
    "prompt": "You are an expert debugger. Analyze errors, identify root causes, and provide fixes.",
    "tools": ["Read", "Edit", "Bash", "Grep"],
    "model": "opus"
  },
  "documenter": {
    "description": "Documentation specialist for generating guides.",
    "prompt": "You are a technical writer. Create clear, comprehensive documentation.",
    "tools": ["Read", "Write"],
    "model": "haiku"
  }
}
```

### Agents Command Examples

```bash
# Define custom agents inline
claude --agents '{
  "security-auditor": {
    "description": "Security specialist for vulnerability analysis",
    "prompt": "You are a security expert. Find vulnerabilities and suggest fixes.",
    "tools": ["Read", "Grep", "Glob"],
    "model": "opus"
  }
}' "audit this codebase for security issues"

# Load agents from file
claude --agents "$(cat ~/.claude/agents.json)" "review the auth module"

# Combine with other flags
claude -p --agents "$(cat agents.json)" --model sonnet "analyze performance"
```

### Agent Priority

When multiple agent definitions exist, they are loaded in this priority order:
1. **CLI-defined** (`--agents` flag) - Session-specific
2. **Project-level** (`.claude/agents/`) - Current project
3. **User-level** (`~/.claude/agents/`) - All projects

CLI-defined agents override both project and user agents for the session. Project-level agents override user-level agents when their names collide. See [Lesson 04 — Subagents](/lib/09-harness/claude-howto/04-subagents#file-locations) for the full priority table including plugin-level agents.

### Agent View (`claude agents`, v2.1.139+)

> **Research Preview** — feature is stable enough for daily use but may change.

`claude agents` opens the **Agent View** — a single list of every Claude Code session on the machine with its current status (`running`, `blocked on you`, `done`). It is the replacement for juggling multiple terminal tabs when you run background agents, scheduled tasks, or `--bg`-launched sessions.

```bash
# Open the Agent View
claude agents
```

When you dispatch a session from the view (or via `claude --bg <prompt>`), you can pass the same configuration flags you would pass to `claude` itself. Flags introduced for the Agent View dispatch path:

| Flag | Since | Description |
|------|-------|-------------|
| `--cwd <path>` | v2.1.141 | Scope the session list (or new session) to a specific working directory |
| `--add-dir <path>` | v2.1.142 | Add directories to the dispatched session's workspace |
| `--settings <path>` | v2.1.142 | Use a specific `settings.json` for the dispatched session |
| `--mcp-config <path>` | v2.1.142 | Use a specific MCP config for the dispatched session |
| `--plugin-dir <path>` | v2.1.142 | Use a specific plugin directory for the dispatched session |
| `--permission-mode <mode>` | v2.1.142 | Set permission mode (`plan`, `acceptEdits`, `auto`, etc.) for the dispatched session |
| `--model <model>` | v2.1.142 | Pin a model for the dispatched session |
| `--effort <level>` | v2.1.142 | Pin an effort level (`low`/`medium`/`high`/`xhigh`/`max`) |
| `--dangerously-skip-permissions` | v2.1.142 | Run the dispatched session without permission prompts (use only in sandboxes) |
| `--json` | v2.1.145 | Print the agent list as machine-readable JSON for scripting (status bars, session pickers, tmux-resurrect integrations) |

Sessions that finish their work but leave a background shell open move from "Working" to "Completed" (v2.1.141 fix). Within an attached agent session, `Shift+Tab` cycles through permission modes including auto mode (v2.1.143).

**GitLab merge requests (v2.1.233)** — the Agent View recognizes GitLab MR URLs alongside GitHub PR URLs, and displays merge requests as `!N` (GitHub pull requests stay `#N`). The same release taught `--worktree` to accept a GitLab MR URL.

**Pin a session** — press `Ctrl+T` on a session in `claude agents` to pin it (v2.1.147). Pinned background sessions stay alive when idle, are restarted in place to apply Claude Code updates, and are shed under memory pressure only after non-pinned sessions. (This `Ctrl+T` is scoped to the Agent View; in the main session it toggles the task list view.)
