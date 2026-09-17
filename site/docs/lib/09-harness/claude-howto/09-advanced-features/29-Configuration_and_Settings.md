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
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "395365d6c1e8bdb0b0f5b1bfe1e71e5ba404b1b82e71151e49cc84be326cc525"
contentMode: "local-full"
zh: ""
---

## Configuration and Settings

### Configuration File Locations

1. **Global config**: `~/.claude/config.json`
2. **Project config**: `./.claude/config.json`
3. **User config**: `~/.config/claude-code/settings.json`

### Complete Configuration Example

**Core advanced features configuration:**

```json
{
  "permissions": {
    "defaultMode": "manual"
  },
  "hooks": {
    "PreToolUse:Edit": "eslint --fix ${file_path}",
    "PostToolUse:Write": "~/.claude/hooks/security-scan.sh"
  },
  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      }
    }
  }
}
```

**Extended configuration example:**

```json
{
  "permissions": {
    "defaultMode": "manual",
    "allowedTools": ["Bash(git log:*)", "Read"],
    "disallowedTools": ["Bash(rm -rf:*)"]
  },

  "hooks": {
    "PreToolUse": [{ "matcher": "Edit", "hooks": ["eslint --fix ${file_path}"] }],
    "PostToolUse": [{ "matcher": "Write", "hooks": ["~/.claude/hooks/security-scan.sh"] }],
    "Stop": [{ "hooks": ["~/.claude/hooks/notify.sh"] }]
  },

  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_TOKEN": "${GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

### Additional Per-User Settings

These keys go in `~/.claude/settings.json` (or a project `.claude/settings.json`) and control interactive behavior for the individual user:

| Setting | Description |
|---------|-------------|
| `askUserQuestionTimeout` | Auto-continue an unanswered `AskUserQuestion` dialog after an idle interval. As of **v2.1.200** dialogs no longer auto-continue by default — set this to opt back into timed auto-continue. |
| `enableArtifact` | Per-user enable/disable of the Artifact tool (v2.1.196). |
| `crossSessionInbound` | (v2.1.224) How inbound [cross-session messages](#cross-session-messaging) are handled — `"accept"`, `"hold"`, or `"refuse"`. Project and local values apply only when *stricter* on the `accept < hold < refuse` ladder. Exposed in `/config` as "Messages from your other sessions" since v2.1.232. |
| `dialogExpiry` | (v2.1.224) How long an unanswered dialog stays open. Default `"5m"`; accepts `"60s"`, `"5m"`, `"10m"`, or `"never"`. Overridden by `CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS`. Exposed in `/config` as "Dialog expiry" since v2.1.232. |
| `modelPicker` | (v2.1.243) Choose which models the `/model` picker lists, in your own order and with your own labels. One of the few settings that **replaces rather than merges** across settings layers — the nearest-scope value wins outright. |
| `promptCacheTtl` | (v2.1.243) Choose the prompt cache lifetime for the main conversation. |
| `subagentPromptCacheTtl` | (v2.1.243) The same choice for subagents and other requests outside the main conversation. |
| `modelPricing` | (v2.1.243) **Managed setting.** Supplies your organization's contracted rates so `/cost`, the status line, and telemetry report those instead of list price. |
| `keybindingFlavor` | **Deprecated since v2.1.261 and has no effect.** The prompt's word-editing keys always follow readline conventions, as Bash does: `Ctrl+W` deletes back to whitespace, `Alt+F` and `Alt+D` stop at word end, and punctuation separates words. Claude Code still accepts the key, so a settings file that sets it stays valid. (In v2.1.238–v2.1.260 it chose between `"classic"` and `"readline"`.) |
| `spellcheck` | (v2.1.235) Underlines misspelled words in the prompt input using whichever of `aspell`, `hunspell`, or `ispell` is on your `PATH`, tried in that order. Object-valued — `\{"enabled": true, "language": "en_GB"\}` — and off by default. **Read from user settings, the `--settings` flag, and managed settings only**: a `spellcheck` block in a project `.claude/settings.json` or `.claude/settings.local.json` is ignored. |
| `bashOutputMaxChars` | (v2.1.261) How many characters of a **successful** Bash or PowerShell command's output Claude receives inline, up to 128K. Past the limit Claude Code saves the output to a file and Claude gets a short preview plus the path. Setting it makes Claude Code ignore `BASH_MAX_OUTPUT_LENGTH`. |
| `taskOutputMaxChars` | (v2.1.261) How many characters of a **background task's** output Claude receives inline when reading it with the `TaskOutput` tool, up to 128K. For a longer finished task Claude receives the most recent characters. Setting it makes Claude Code ignore `TASK_MAX_OUTPUT_LENGTH`. |

### Fallback Models (`fallbackModel`)

The `fallbackModel` setting lets you configure **up to three** fallback models, tried in order, when the primary model is overloaded or unavailable.

```json
{
  "fallbackModel": ["claude-opus-4-8", "claude-sonnet-4-6", "claude-haiku-4-5"]
}
```

As of **v2.1.166** the `--fallback-model` flag also applies to interactive sessions (not just headless). On a fallback, Claude Code retries an unexpected non-retryable error once; auth, rate-limit, request-size, and transport errors still fail immediately.

### Environment Variables

Override config with environment variables:

```bash
# Model selection
export ANTHROPIC_MODEL=claude-opus-4-8
export ANTHROPIC_DEFAULT_MODEL=claude-opus-4-8   # (v2.1.236) Model new sessions start on. Unlike ANTHROPIC_MODEL, a /model pick still overrides it — and that pick persists across restarts
export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-8
export ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
export ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5

# API configuration
export ANTHROPIC_API_KEY=sk-ant-...

# Thinking configuration
export MAX_THINKING_TOKENS=16000
export CLAUDE_CODE_EFFORT_LEVEL=high   # low, medium, high, xhigh (Opus 5/4.8/4.7), or max — default is high on Opus 5 and Opus 4.8 (supported on Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 4.6)

# Feature toggles
export CLAUDE_CODE_DISABLE_AUTO_MEMORY=true
export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=true
export CLAUDE_CODE_DISABLE_CRON=1
export CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=true
export CLAUDE_CODE_DISABLE_TERMINAL_TITLE=true
export CLAUDE_CODE_DISABLE_1M_CONTEXT=true
export CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=true
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
export CLAUDE_CODE_ENABLE_TASKS=true
export CLAUDE_CODE_SIMPLE=true              # Set by --bare flag

# MCP configuration
export MAX_MCP_OUTPUT_TOKENS=50000
export ENABLE_TOOL_SEARCH=true

# Prompt caching
export ENABLE_PROMPT_CACHING_1H=1      # Use 1-hour prompt cache TTL (default is 5 min)

# Task management
export CLAUDE_CODE_TASK_LIST_ID=my-project-tasks

# Agent teams (experimental)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Subagent and plugin configuration
export CLAUDE_CODE_SUBAGENT_MODEL=sonnet
export CLAUDE_CODE_PLUGIN_SEED_DIR=./my-plugins
export CLAUDE_CODE_NEW_INIT=1

# Subprocess and streaming
export CLAUDE_CODE_SUBPROCESS_ENV_SCRUB="SECRET_KEY,DB_PASSWORD"
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80
export CLAUDE_STREAM_IDLE_TIMEOUT_MS=30000
export ANTHROPIC_CUSTOM_MODEL_OPTION=my-custom-model
export SLASH_COMMAND_TOOL_CHAR_BUDGET=50000

# Output and package manager (v2.1.129+)
export CLAUDE_CODE_FORCE_SYNC_OUTPUT=1                      # Force synchronous output for terminals where auto-detect misses (Emacs eat, etc.)
export CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1            # Enable background upgrades for Homebrew/WinGet installs
export CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1         # Opt in to /v1/models gateway discovery when ANTHROPIC_BASE_URL is set

# Windows PowerShell tool (v2.1.143+) — default-on for Bedrock/Vertex/Foundry on Windows
export CLAUDE_CODE_USE_POWERSHELL_TOOL=0                    # Disable the PowerShell tool entirely
export CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1    # Honor system ExecutionPolicy instead of `-ExecutionPolicy Bypass`

# Workload identity federation (v2.1.141+)
export ANTHROPIC_WORKSPACE_ID=ws_abc123                     # Scope the federated token to a specific workspace when the rule covers multiple

# Stop hook safety cap (v2.1.143+)
export CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=8                    # Max consecutive Stop-hook blocks before the session ends with a warning. Set 0 to disable the cap.

# Session-wide spawn caps (v2.1.212)
export CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION=200         # Cap on WebSearch tool calls per session, to stop runaway search loops. Default 200.

# Accessibility (v2.1.208)
export CLAUDE_AX_SCREEN_READER=1                            # Enable plain-text screen reader rendering mode. Same effect as --ax-screen-reader or "axScreenReader": true in settings.

# Newer variables (v2.1.221–v2.1.234) — changelog-sourced; the CLI reference has no env-var section
export CLAUDE_CODE_ENABLE_TODO_TOOLS=1                      # (v2.1.233) Restore the todo/task-tracking tools (TaskCreate/Get/Update/List, TodoWrite), which are off on Opus 4.8, Sonnet 5, Fable 5, Mythos 5, and newer models
export CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS=900000             # (v2.1.233) WebFetch URL cache TTL. Default 15 minutes.
export CLAUDE_CODE_TOOL_MEMORY_LIMIT=2G                     # (v2.1.233, Linux) Opt-in memory cgroup applied to Bash commands
export ANTHROPIC_BEDROCK_REGION_PREFIX=us                   # (v2.1.224) Prefer a specific Bedrock cross-region inference profile
export CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT=1  # (v2.1.223) Restore pre-v2.1.223 auto-compact behavior on unrecognized model IDs
export CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS=0             # (v2.1.229) Disable prefix staggering on dynamic-workflow fan-out
export CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS=300000            # (v2.1.224) Overrides the dialogExpiry setting
export CLAUDE_CODE_PROJECT_DIR_NAME=my-app                  # (v2.1.234) Short name for the per-project transcript directory, for hosts that give each session its own config directory
export CLAUDE_CODE_GOAL_CHECKIN_MINUTES=30                  # (v2.1.234) Minutes a background task may stall before Claude checks in while a /goal is active. Set 0 to disable check-ins.
```

> **v2.1.223 — `CLAUDE_CODE_DISABLE_1M_CONTEXT` widened**: the variable now holds **every**
> Claude model with a native 1M-token window down to 200K via auto-compaction, rather than
> only a fixed list of model IDs.

> **v2.1.108**: `ENABLE_PROMPT_CACHING_1H=1` — use a 1-hour prompt cache TTL instead of the default 5-minute TTL. Reduces cache misses in long, stable sessions. (v2.1.129 fixes a regression where the 1-hour TTL was silently downgraded to 5 minutes.)

> **v2.1.129**: `CLAUDE_CODE_FORCE_SYNC_OUTPUT=1` forces synchronous output for terminals whose capability auto-detection fails (e.g., Emacs `eat`). `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1` enables background upgrades on Homebrew/WinGet installs, which otherwise never auto-update.

### Configuration Management Commands

```
User: /config
[Opens interactive configuration menu]
```

The `/config` command provides an interactive menu to toggle settings such as:
- Extended thinking on/off
- Verbose output
- Permission mode
- Model selection
- Dynamic workflow size (v2.1.219) — hidden when `workflowSizeGuideline` is set in a settings file, see [Dynamic Workflows](#dynamic-workflows)

In the interactive menu, press Enter or Space to change the selected setting, and Esc to save and close (v2.1.183+).

You can also set a setting directly from the prompt without opening the menu:

```bash
/config thinking=false      # set a single setting inline (v2.1.181+)
/config --help              # list available shorthand keys (v2.1.183+)
```

The `key=value` shorthand works in interactive sessions, with `-p`, and in Remote Control.

### Per-Project Configuration

Create `.claude/config.json` in your project:

```json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", "hooks": ["npm test && npm run lint"] }]
  },
  "permissions": {
    "defaultMode": "manual"
  },
  "mcp": {
    "servers": {
      "project-db": {
        "command": "mcp-postgres",
        "env": {
          "DATABASE_URL": "${PROJECT_DB_URL}"
        }
      }
    }
  }
}
```
