---
title: "Hooks"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/README.md"
zh: ""
---

# Hooks

Hooks are automated scripts that execute in response to specific events during Claude Code sessions. They enable automation, validation, permission management, and custom workflows.

## Overview

Hooks are automated actions (shell commands, HTTP webhooks, LLM prompts, MCP tool calls, or subagent evaluations) that execute automatically when specific events occur in Claude Code. They receive JSON input and communicate results via exit codes and JSON output.

**Key features:**
- Event-driven automation
- JSON-based input/output
- Support for `command`, `http`, `mcp_tool`, `prompt`, and `agent` hook types
- Pattern matching for tool-specific hooks

## Configuration

Hooks are configured in settings files with a specific structure:

- `~/.claude/settings.json` - User settings (all projects)
- `.claude/settings.json` - Project settings (shareable, committed)
- `.claude/settings.local.json` - Local project settings (not committed)
- Managed policy - Organization-wide settings
- Plugin `hooks/hooks.json` - Plugin-scoped hooks
- Skill/Agent frontmatter - Component lifetime hooks

### Basic Configuration Structure

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

**Key fields:**

| Field | Description | Example |
|-------|-------------|---------|
| `matcher` | Pattern to match tool names (case-sensitive) | `"Write"`, `"Edit\|Write"`, `"*"` |
| `hooks` | Array of hook definitions | `[{ "type": "command", ... }]` |
| `type` | Hook type: `"command"` (bash), `"prompt"` (LLM), `"http"` (webhook), `"mcp_tool"` (MCP tool invocation, v2.1.118+), or `"agent"` (subagent) | `"command"` |
| `command` | Shell command to execute | `"$CLAUDE_PROJECT_DIR/.claude/hooks/format.sh"` |
| `timeout` | Optional timeout in seconds. Defaults: 600 for command/http/mcp_tool, 30 for prompt, 60 for agent. | `30` |
| `once` | If `true`, run the hook only once per session | `true` |
| `async` | If `true`, runs in the background without blocking | `true` |
| `asyncRewake` | If `true`, runs in the background and wakes Claude on exit code 2. Implies `async`. | `true` |
| `shell` | Accepts `"bash"` or `"powershell"`. Defaults to `"bash"`, or to `"powershell"` on Windows when Git Bash isn't installed. | `"bash"` |
| `statusMessage` | Custom spinner message displayed while the hook runs | `"Formatting…"` |

> **Note**: Some events lower the default timeout. `UserPromptSubmit` lowers the `command`, `http`, and `mcp_tool` default to 30 seconds, and `MessageDisplay` lowers it to 10 seconds. `SessionEnd` hooks share a 1.5-second budget; if your settings set a longer per-hook `timeout`, Claude Code raises that budget to match, up to 60 seconds.

### Matcher Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| Exact string | Matches specific tool | `"Write"` |
| Regex pattern | Matches multiple tools | `"Edit\|Write"` |
| Comma-separated | Matches any listed tool (v2.1.191+) | `"Write,Edit"` |
| Wildcard | Matches all tools | `"*"` or `""` |
| MCP tools | Server and tool pattern | `"mcp__memory__.*"` |

> **Matchers are matched exactly (v2.1.195+).** A hyphenated identifier (for example an MCP tool name containing a hyphen) no longer accidentally substring-matches a different tool. Comma-separated matchers like `"Write,Edit"` fire on any tool in the list — earlier builds silently never fired them.

**InstructionsLoaded matcher values:**

| Matcher Value | Description |
|---------------|-------------|
| `session_start` | Instructions loaded at session startup |
| `nested_traversal` | Instructions loaded during nested directory traversal |
| `path_glob_match` | Instructions loaded via path glob pattern matching |

### Narrowing with `if` conditions (tool-argument paths)

The `matcher` field selects a hook by **tool name** (`"Write"`, `"Edit|Write"`, `"*"`). To filter more narrowly by the tool's **arguments** — for example, to run a hook only when an edit touches `src/`, or to guard reads of secret files — add an `if` condition to an individual hook handler. This is distinct from the tool-name matcher: the `matcher` decides *which tool*, the `if` decides *which call*.

`if` uses [permission-rule syntax](https://code.claude.com/docs/en/permissions) (`ToolName(pattern)`), evaluated against the tool name **and** its arguments together. For `Read`/`Edit`/`Write`, the path pattern follows gitignore semantics, with the same anchors as permission rules: a bare name like `.env` matches at any depth, `src/**` is relative to the current directory, `/src/**` to the project root, `~/...` to your home directory, and `//...` is an absolute filesystem path.

The `if` field sits at the **hook-handler level** — a sibling of `type` and `command`, inside the `hooks` array — not on `matcher`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "if": "Edit(src/**)",
            "command": "./hooks/lint-src.sh"
          }
        ]
      },
      {
        "matcher": "Read",
        "hooks": [
          {
            "type": "command",
            "if": "Read(.env)",
            "command": "./hooks/block-secret-read.sh"
          }
        ]
      }
    ]
  }
}
```

Examples of valid `if` patterns: `Edit(src/**)` (edits under `src/`), `Read(~/.ssh/**)` (reads of any SSH key), `Read(.env)` (any `.env` at or below the current directory), `Bash(git push *)` (only `git push` subcommands).

> **v2.1.214 update**: A single-segment `dir/**` pattern in a hook `if` condition (like `Edit(src/**)`) now matches only `<cwd>/dir` — not that directory at any depth in the tree. Previously `src/**` also matched `foo/src/**`. Use `**/dir/**` if you need any-depth matching. **Important**: this narrowing applies only to hook `if:` conditions and allow-rule auto-approval — deny/ask permission rules still match `dir/**` at any depth.

## Hook Types

Claude Code supports five hook types:

### Command Hooks

The default hook type. Executes a shell command and communicates via JSON stdin/stdout and exit codes.

```json
{
  "type": "command",
  "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate.py\"",
  "timeout": 60
}
```

#### Exec form (`args`)

> Added in v2.1.139.

Instead of the shell-form `"command": "..."`, a command hook can spawn a binary directly via `execve()` with an `args` array. There is no shell parsing, so path placeholders never need quoting and the configuration is immune to shell-injection bugs.

```json
{
  "type": "command",
  "args": ["python3", "$CLAUDE_PROJECT_DIR/.claude/hooks/validate.py", "--strict"],
  "timeout": 60
}
```

The two forms are **mutually exclusive** — a hook with both `command` and `args` set is rejected at config load. Use `command` when you need pipes, redirection, `&&` chaining, or shell expansions; use `args` when you are calling one binary with arguments.

### HTTP Hooks

> Added in v2.1.63.

Remote webhook endpoints that receive the same JSON input as command hooks. HTTP hooks POST JSON to the URL and receive a JSON response. HTTP hooks are routed through the sandbox when sandboxing is enabled. Environment variable interpolation in URLs requires an explicit `allowedEnvVars` list for security.

```json
{
  "hooks": {
    "PostToolUse": [{
      "type": "http",
      "url": "https://my-webhook.example.com/hook",
      "matcher": "Write"
    }]
  }
}
```

**Key properties:**
- `"type": "http"` -- identifies this as an HTTP hook
- `"url"` -- the webhook endpoint URL
- Routed through sandbox when sandbox is enabled
- Requires explicit `allowedEnvVars` list for any environment variable interpolation in the URL

### Prompt Hooks

LLM-evaluated prompts where the hook content is a prompt that Claude evaluates. Primarily used with `Stop` and `SubagentStop` events for intelligent task completion checking.

```json
{
  "type": "prompt",
  "prompt": "Evaluate if Claude completed all requested tasks.",
  "timeout": 30
}
```

The LLM evaluates the prompt and returns a structured decision (see [Prompt-Based Hooks](#prompt-based-hooks) for details).

### MCP Tool Hooks

> Added in v2.1.118.

The `mcp_tool` type invokes a configured MCP tool directly; configuration references the MCP server and tool name rather than a shell command or URL. This is useful when the validation or reaction logic already lives in an MCP server you have configured.

```json
{
  "matcher": "Edit",
  "hooks": [{
    "type": "mcp_tool",
    "server": "my-mcp-server",
    "tool": "validate_edit"
  }]
}
```

**Key properties:**
- `"type": "mcp_tool"` -- identifies this as an MCP tool hook
- `"server"` -- name of the configured MCP server
- `"tool"` -- the tool name on that server to invoke

The hook input (tool name, tool input, session context) is passed as the MCP tool's arguments. See [MCP server setup](/lib/09-harness/claude-howto/05-mcp) for configuring MCP servers.

### Agent Hooks

Subagent-based verification hooks that spawn a dedicated agent to evaluate conditions or perform complex checks. Unlike prompt hooks (single-turn LLM evaluation), agent hooks can use tools and perform multi-step reasoning.

> **Note**: Agent hooks are experimental and may change.

```json
{
  "type": "agent",
  "prompt": "Verify the code changes follow our architecture guidelines. Check the relevant design docs and compare.",
  "timeout": 120
}
```

**Key properties:**
- `"type": "agent"` -- identifies this as an agent hook
- `"prompt"` -- the task description for the subagent
- The agent can use tools (Read, Grep, Bash, etc.) to perform its evaluation
- Returns a structured decision similar to prompt hooks

## Hook Events

Claude Code supports **33 hook events**:

| Event | When Triggered | Matcher Input | Can Block | Common Use |
|-------|---------------|---------------|-----------|------------|
| **SessionStart** | Session begins/resumes/clear/compact | startup/resume/clear/compact/fork | No | Environment setup |
| **Setup** | Initial environment setup (one-time per session) | (none) | No | Provision tooling, install deps |
| **InstructionsLoaded** | After CLAUDE.md or rules file loaded | (none) | No | Modify/filter instructions |
| **UserPromptSubmit** | User submits prompt | (none) | Yes | Validate prompts |
| **UserPromptExpansion** | User prompt is expanded (e.g., `@` mentions, slash commands resolved) | (none) | Yes | Transform or inspect expanded prompt |
| **PreToolUse** | Before tool execution | Tool name | Yes (allow/deny/ask/defer) | Validate, modify inputs |
| **PermissionRequest** | Permission dialog shown | Tool name | Yes | Auto-approve/deny |
| **PermissionDenied** | User denies a permission prompt | Tool name | No | Logging, analytics, policy enforcement |
| **PostToolUse** | After tool succeeds | Tool name | No | Add context, feedback |
| **PostToolUseFailure** | Tool execution fails | Tool name | No | Error handling, logging |
| **PostToolBatch** | After a batch of tool uses completes | (none) | No | Aggregate reporting, batched validation |
| **Notification** | Notification sent | Notification type | No | Custom notifications |
| **MessageDisplay** | While assistant message text is displayed | (none) | No | Transform or hide displayed message text (v2.1.152) |
| **SubagentStart** | Subagent spawned | Agent type name | No | Subagent setup |
| **SubagentStop** | Subagent finishes | Agent type name | Yes | Subagent validation |
| **Stop** | Claude finishes responding | (none) | Yes | Task completion check |
| **StopFailure** | API error ends turn | (none) | No | Error recovery, logging |
| **TeammateIdle** | Agent team teammate idle | (none) | Yes | Teammate coordination |
| **TaskCompleted** | Task marked complete | (none) | Yes | Post-task actions |
| **TaskCreated** | Task created via TaskCreate | (none) | No | Task tracking, logging |
| **ConfigChange** | Config file changes | (none) | Yes (except policy) | React to config updates |
| **CwdChanged** | Working directory changes | (none) | No | Directory-specific setup |
| **DirectoryAdded** | New working directory registered mid-session via `/add-dir` or the SDK `register_repo_root` control request (v2.1.219) | (none) | No | Set up tooling for a newly added directory |
| **FileChanged** | Watched file changes | (none) | No | File monitoring, rebuild |
| **PreCompact** | Before context compaction | manual/auto | No | Pre-compact actions |
| **PostCompact** | After compaction completes | (none) | No | Post-compact actions |
| **PreModelSwitch** | Before Claude Code applies a requested model switch | Canonical name of the model being switched to (from `to_model`) | Yes | Gate or veto model changes |
| **PostModelSwitch** | After the session's model changes, including changes Claude Code makes itself (such as restoring the model on resume) | Canonical name of the model switched to (from `to_model`) | No | Log or react to model changes |
| **WorktreeCreate** | Worktree being created | (none) | Yes (path return) | Worktree initialization |
| **WorktreeRemove** | Worktree being removed | (none) | No | Worktree cleanup |
| **Elicitation** | MCP server requests user input | (none) | Yes | Input validation |
| **ElicitationResult** | User responds to elicitation | (none) | Yes | Response processing |
| **SessionEnd** | Session terminates | (none) | No | Cleanup, final logging |

`PreModelSwitch` and `PostModelSwitch` require v2.1.251 or later. Both receive `from_model` and `to_model`; the matcher is evaluated against the canonical name derived from `to_model` (e.g. `claude-opus-5`, `.*opus.*`). Their `command`, `http`, and `mcp_tool` timeout default is lowered to 30 seconds.

> **`TaskCreated` and `TaskCompleted` need the todo tools enabled (v2.1.233).** These two
> events fire from the todo/task-tracking tools (`TaskCreate`/`Get`/`Update`/`List`,
> `TodoWrite`), which are **no longer available on Opus 4.8, Sonnet 5, Fable 5, Mythos 5,
> and newer models**. On those models the hooks are still valid configuration but simply
> never fire — you get no output and no error. Set `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` to
> bring the tools, and therefore the events, back.

> **PostToolUse duration (v2.1.119):** `PostToolUse` and `PostToolUseFailure` hook inputs now include `duration_ms` — see the [PostToolUse](#posttooluse) section for details.

### PreToolUse

Runs after Claude creates tool parameters and before processing. Use this to validate or modify tool inputs.

**Configuration:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/validate-bash.py"
          }
        ]
      }
    ]
  }
}
```

**Common matchers:** `Task`, `Bash`, `Glob`, `Grep`, `Read`, `Edit`, `Write`, `WebFetch`, `WebSearch`

**Output control:**
- `permissionDecision`: `"allow"`, `"deny"`, `"ask"`, or `"defer"`
  - `"allow"` skips the permission prompt (except for tools that require user interaction, and connector tools your organization set to `ask`)
  - `"deny"` prevents the tool call
  - `"ask"` prompts the user to confirm
  - `"defer"` exits gracefully so the tool can be resumed later; `permissionDecisionReason`, `updatedInput` and `additionalContext` are all ignored for this value
  - Deny and ask rules are still evaluated regardless of what the hook returns. When multiple `PreToolUse` hooks disagree, precedence is `deny` > `defer` > `ask` > `allow`
- `permissionDecisionReason`: Explanation for decision. Shown to the user (not Claude) for `"allow"` and `"ask"`; shown to Claude for `"deny"`; ignored for `"defer"`
- `updatedInput`: Modified tool input parameters

### PostToolUse

Runs immediately after tool completion. Use for verification, logging, or providing context back to Claude.

**Configuration:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/security-scan.py"
          }
        ]
      }
    ]
  }
}
```

**Output control:**
- `"block"` decision prompts Claude with feedback
- `additionalContext`: Context added for Claude

**Additional input fields (v2.1.119):**

| Field | Type | Description |
|-------|------|-------------|
| `duration_ms` | number | Tool execution time in milliseconds. Excludes time spent in permission prompts and PreToolUse hook execution. Available on both `PostToolUse` and `PostToolUseFailure` hooks. |

#### Recoverable blocks (`continueOnBlock`, v2.1.139)

By default, a `PostToolUse` hook that returns `"decision": "block"` aborts the current turn. Set `"continueOnBlock": true` on the hook to instead surface the rejection back to Claude as a `tool_result`, so the model can read the feedback and retry or adjust.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/policy-check.py",
            "continueOnBlock": true
          }
        ]
      }
    ]
  }
}
```

Use this when the hook's `reason` is something Claude can act on (e.g., "this file is read-only; write somewhere else"); leave it off when a block must halt the turn entirely.

### UserPromptSubmit

Runs when user submits a prompt, before Claude processes it.

**Configuration:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/validate-prompt.py"
          }
        ]
      }
    ]
  }
}
```

**Output control:**
- `decision`: `"block"` to prevent processing
- `reason`: Explanation if blocked
- `additionalContext`: Context added to prompt

### Stop and SubagentStop

Run when Claude finishes responding (Stop) or a subagent completes (SubagentStop). Supports prompt-based evaluation for intelligent task completion checking.

**Additional input field:** Both `Stop` and `SubagentStop` hooks receive a `last_assistant_message` field in their JSON input, containing the final message from Claude or the subagent before stopping. This is useful for evaluating task completion.

**Configuration:**
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Evaluate if Claude completed all requested tasks.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

> **Safety cap on consecutive blocks (v2.1.143)**: If a `Stop` hook returns `"decision": "block"` (or sets `continue: false`) **8 times in a row** for the same turn, Claude Code short-circuits the loop and ends the session with a warning. Override the threshold with the env var `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=<integer>` (set to `0` to disable the cap entirely). This prevents a buggy Stop hook from looping the session forever.

**Return field (v2.1.163):** A `Stop` or `SubagentStop` hook can return `hookSpecificOutput.additionalContext` to give Claude feedback and **continue the turn without surfacing an error label**. Previously, influencing the model from a Stop hook was awkward; now the hook can inject context cleanly, avoiding the error-label behavior of older feedback paths (such as `"decision": "block"`).

```json
{
  "hookSpecificOutput": {
    "hookEventName": "Stop",
    "additionalContext": "Reminder: run the test suite before declaring done."
  }
}
```

### SubagentStart

Runs when a subagent begins execution. The matcher input is the agent type name, allowing hooks to target specific subagent types.

**Configuration:**
```json
{
  "hooks": {
    "SubagentStart": [
      {
        "matcher": "code-review",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/subagent-init.sh"
          }
        ]
      }
    ]
  }
}
```

### SessionStart

Runs when session starts or resumes. Can persist environment variables.

**Matchers:** `startup`, `resume`, `clear`, `compact`, `fork`

> **v2.1.214 update**: A forked session now reports source `"fork"` — previously it reported `"resume"`.

**Special feature:** Use `CLAUDE_ENV_FILE` to persist environment variables (also available in `CwdChanged` and `FileChanged` hooks):

```bash
#!/bin/bash
if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=development' >> "$CLAUDE_ENV_FILE"
fi
exit 0
```

**Session-scoped outputs (v2.1.152):** A `SessionStart` hook can return JSON to re-scan skills and set the session title:

```json
{
  "reloadSkills": true,
  "hookSpecificOutput": {
    "sessionTitle": "Payments migration"
  }
}
```

Top-level `reloadSkills: true` triggers a skill re-scan in the same session (the same action as the `/reload-skills` command), making skills the hook just installed available immediately. `hookSpecificOutput.sessionTitle` sets the session's display title on startup and resume.

### SessionEnd

Runs when session ends to perform cleanup or final logging. Cannot block termination.

**Reason field values:**
- `clear` - User cleared the session
- `logout` - User logged out
- `prompt_input_exit` - User exited via prompt input
- `other` - Other reason

**Configuration:**
```json
{
  "hooks": {
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR/.claude/hooks/session-cleanup.sh\""
          }
        ]
      }
    ]
  }
}
```

### Notification Event

Updated matchers for notification events:
- `permission_prompt` - Permission request notification
- `idle_prompt` - Idle state notification
- `auth_success` - Authentication success
- `elicitation_dialog` - Dialog shown to user
- `agent_needs_input` - Background agent needs input (v2.1.198)
- `agent_completed` - Background agent finished (v2.1.198)

### PreModelSwitch

Runs **before** Claude Code applies a requested model switch — for example when you run `/model`, or when a component asks for a different model. Requires v2.1.251 or later.

**Matchers:** the canonical name of the model being switched to, derived from `to_model`. Match an exact model (`claude-opus-5`) or a family with a regex (`.*opus.*`).

**Input fields:** in addition to the common fields, the hook receives `from_model` (the model in use before the switch) and `to_model` (the model requested).

**Can block:** yes. Exit code `2` blocks the switch and shows stderr as an error, so the session keeps its current model. Use this to gate or veto model changes — for example, to keep a cost-sensitive project off the most expensive model.

**Timeout:** this event lowers the `command`, `http`, and `mcp_tool` default timeout to 30 seconds.

**Configuration:**
```json
{
  "hooks": {
    "PreModelSwitch": [
      {
        "matcher": ".*opus.*",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/gate-model-switch.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
#!/bin/bash
# gate-model-switch.sh - refuse a switch to Opus on this project
input=$(cat)
to_model=$(echo "$input" | jq -r '.to_model')

if [[ "$to_model" == *opus* ]]; then
  echo "This project is budgeted for Sonnet; staying on the current model." >&2
  exit 2
fi

exit 0
```

### PostModelSwitch

Runs **after** the session's model has changed. It also fires for changes Claude Code makes itself — such as restoring the previously selected model when you resume a session — not only for switches you request. Requires v2.1.251 or later.

**Matchers:** same as `PreModelSwitch` — the canonical name derived from `to_model`.

**Input fields:** `from_model` and `to_model`, alongside the common fields.

**Can block:** no. The switch has already happened; the hook can only observe and react.

**Timeout:** this event lowers the `command`, `http`, and `mcp_tool` default timeout to 30 seconds.

**Configuration:**
```json
{
  "hooks": {
    "PostModelSwitch": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/log-model-switch.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
#!/bin/bash
# log-model-switch.sh - append every model change to a session log
input=$(cat)
from=$(echo "$input" | jq -r '.from_model')
to=$(echo "$input" | jq -r '.to_model')

echo "$(date -Iseconds) $from -> $to" >> ~/.claude/model-switches.log
exit 0
```

## Component-Scoped Hooks

Hooks can be attached to specific components (skills, agents, commands) in their frontmatter:

**In SKILL.md, agent.md, or command.md:**

```yaml
---
name: secure-operations
description: Perform operations with security checks
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/check.sh"
          once: true  # Only run once per session
---
```

**Supported events for component hooks:** `PreToolUse`, `PostToolUse`, `Stop`

This allows defining hooks directly in the component that uses them, keeping related code together.

### Hooks in Subagent Frontmatter

When a `Stop` hook is defined in a subagent's frontmatter, it is automatically converted to a `SubagentStop` hook scoped to that subagent. This ensures that the stop hook only fires when that specific subagent completes, rather than when the main session stops.

```yaml
---
name: code-review-agent
description: Automated code review subagent
hooks:
  Stop:
    - hooks:
        - type: prompt
          prompt: "Verify the code review is thorough and complete."
  # The above Stop hook auto-converts to SubagentStop for this subagent
---
```

**Workspace trust required (v2.1.218):** Frontmatter hooks in a **project** subagent now require workspace trust acceptance for the folder the agent file came from before they run. Before v2.1.218, these hooks could run from folders you hadn't trusted. See the [subagents documentation](https://code.claude.com/docs/en/sub-agents#hooks-in-subagent-frontmatter) for which scopes are exempt.

## PermissionRequest Event

Handles permission requests with custom output format:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "allow|deny",
      "updatedInput": {},
      "message": "Custom message",
      "interrupt": false
    }
  }
}
```

## Hook Input and Output

### JSON Input (via stdin)

All hooks receive JSON input via stdin:

```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/current/working/directory",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.js",
    "content": "..."
  },
  "tool_use_id": "toolu_01ABC123...",
  "agent_id": "agent-abc123",
  "agent_type": "main",
  "worktree": "/path/to/worktree",
  "effort": { "level": "medium" }
}
```

**Common fields:**

| Field | Description |
|-------|-------------|
| `session_id` | Unique session identifier |
| `transcript_path` | Path to the conversation transcript file |
| `cwd` | Current working directory |
| `prompt_id` | UUID of the prompt being processed; correlates with the OpenTelemetry `prompt.id` attribute (v2.1.196) |
| `hook_event_name` | Name of the event that triggered the hook |
| `agent_id` | Identifier of the agent running this hook |
| `agent_type` | Type of agent (`"main"`, subagent type name, etc.) |
| `worktree` | Path to the git worktree, if the agent is running in one |
| `effort.level` | (v2.1.133+) Active effort level: `low`, `medium`, `high`, `xhigh`, or `max` |

### Exit Codes

| Exit Code | Meaning | Behavior |
|-----------|---------|----------|
| **0** | Success | Continue, parse JSON stdout |
| **2** | Blocking error | Block operation, stderr shown as error |
| **Other** | Non-blocking error | Continue, stderr shown in verbose mode |

### JSON Output (stdout, exit code 0)

```json
{
  "continue": true,
  "stopReason": "Optional message if stopping",
  "suppressOutput": false,
  "systemMessage": "Optional warning message",
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "File is in allowed directory",
    "updatedInput": {
      "file_path": "/modified/path.js"
    }
  }
}
```

> **Scope (v2.1.121+):** `hookSpecificOutput.updatedToolOutput` is now honored for **all** tools, not just MCP tools. A `PostToolUse` hook on `Bash`, `Edit`, `Read`, etc. can rewrite the tool's output before Claude sees it — useful for redacting secrets, normalizing diffs, or filtering noisy command output. Example (strip ANSI color codes from a `Bash` output):
>
> ```json
> {
>   "hookSpecificOutput": {
>     "hookEventName": "PostToolUse",
