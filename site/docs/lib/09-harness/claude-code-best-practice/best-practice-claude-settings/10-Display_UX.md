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
pageSha256: "d100452f6307bb5a29bd2cf47a7ce7999ed92c58295200883d39ba35f70372fd"
contentMode: "local-full"
zh: ""
---

## Display & UX

### Display Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `statusLine` | object | - | Custom status line configuration |
| `outputStyle` | string | `"default"` | Output style (e.g., `"Explanatory"`) |
| `spinnerTipsEnabled` | boolean | `true` | Show tips while waiting |
| `spinnerVerbs` | object | - | Custom spinner verbs with `mode` ("append" or "replace") and `verbs` array |
| `spinnerTipsOverride` | object | - | Custom spinner tips with `tips` (string array) and optional `excludeDefault` (boolean). When `excludeDefault` is `true`, only custom tips show; when `false` or absent, custom tips merge with built-in tips. As of v2.1.121, `excludeDefault: true` also suppresses time-based spinner tips |
| `respectGitignore` | boolean | `true` | Respect .gitignore in file picker |
| `prefersReducedMotion` | boolean | `false` | Reduce animations and motion effects in the UI |
| `axScreenReader` | boolean | `false` | Enable screen-reader-friendly output mode. When `true`, Claude outputs flat text without decorative box-drawing characters, color, and other terminal UI elements. Appears in `/config` as **Screen reader mode**. Only applies at the User scope — does not read from project or managed settings. Also available via the `--ax-screen-reader` CLI flag (v2.1.181) |
| `syntaxHighlightingDisabled` | boolean | `false` | Disable syntax highlighting in diffs, code blocks, and file previews. Distinct from the `CLAUDE_CODE_SYNTAX_HIGHLIGHT` env var, which only governs diff output |
| `fileSuggestion` | object | - | Custom file suggestion command (see File Suggestion Configuration below) |
| `autoScrollEnabled` | boolean | `true` | Auto-scroll the conversation in fullscreen mode. Set to `false` to disable automatic scrolling (v2.1.110). Versions before v2.1.119 stored this in `~/.claude.json` |
| `editorMode` | string | `"normal"` | Key binding mode for the input prompt: `"normal"` or `"vim"`. Appears in `/config` as **Editor mode**. Versions before v2.1.119 stored this in `~/.claude.json` |
| `vimInsertModeRemaps` | object | - | Custom key remappings applied in vim insert mode. Object where keys are exactly two printable characters (the input sequence) and values are the replacement sequence — the only valid target value is `<Esc>`. Only applies when `editorMode` is `"vim"`. Example: `\{"jk": "<Esc>", "jj": "<Esc>"\}` (v2.1.208) |
| `showTurnDuration` | boolean | `true` | Show turn duration messages after responses (e.g., "Cooked for 1m 6s"). Versions before v2.1.119 stored this in `~/.claude.json` |
| `teammateMode` | string | `"in-process"` | How [agent team](https://code.claude.com/docs/en/agent-teams) teammates display: `"auto"` (picks split panes in tmux or iTerm2, in-process otherwise), `"in-process"` (default since v2.1.179), `"tmux"`, or `"iterm2"` (force iTerm2 split panes regardless of auto-detection, v2.1.186). See [choose a display mode](https://code.claude.com/docs/en/agent-teams#choose-a-display-mode). Versions before v2.1.119 stored this in `~/.claude.json` |
| `terminalProgressBarEnabled` | boolean | `true` | Show the terminal progress bar in supported terminals (ConEmu, Ghostty 1.2.0+, and iTerm2 3.6.6+). Appears in `/config` as **Terminal progress bar**. Versions before v2.1.119 stored this in `~/.claude.json` |
| `preferredNotifChannel` | string | `"auto"` | Method for task-complete and permission-prompt notifications. Values: `"auto"`, `"terminal_bell"`, `"iterm2"`, `"iterm2_with_bell"`, `"kitty"`, `"ghostty"`, `"notifications_disabled"`. Default `"auto"` sends a desktop notification in iTerm2, Ghostty, and Kitty and does nothing in other terminals. Set `"terminal_bell"` to ring the bell character in any terminal. Appears in `/config` as **Notifications**. See [Get a terminal bell or notification](https://code.claude.com/docs/en/terminal-config#get-a-terminal-bell-or-notification) |
| `wheelScrollAccelerationEnabled` | boolean | `true` | Disable mouse-wheel scroll acceleration in fullscreen mode. Set to `false` to use fixed per-tick scroll steps instead of the OS-level acceleration curve (v2.1.174) |
| `footerLinksRegexes` | array | - | Array of objects matched against **turn output** (tool results, file contents, fetched pages, Claude's responses) to display as link badges in the footer row. Each entry is `\{type, pattern, url, label\}` where `pattern` is a regex with named capture groups and `url`/`label` may reference those groups. Matched patterns produce a clickable badge at the bottom of the chat UI. Capped at 5 badges per turn; URL max 2048 chars; allowed schemes: `http`, `https`, `vscode`, `cursor`, `windsurf`, `zed`, `jetbrains`, `idea`, `slack`, `linear`, `notion`, `figma`, `vscode-insiders`. User/`--settings`/managed only (v2.1.176) |
| `emojiCompletionEnabled` | boolean | `true` | Enable emoji shortcode autocomplete in the prompt input (e.g., `:tada:` → 🎉). Set to `false` to disable. Requires v2.1.217+ |
| `keybindingFlavor` | string | - | Keyboard shortcut style for word deletion. Set to `"readline"` for Bash/GNU readline-style Ctrl+W behavior (delete word backward to whitespace boundary). When unset, uses the default word-deletion behavior (v2.1.236) |
| `spellcheck` | object | - | Spell-check underlines in the prompt input. Requires an installed spell-check binary (`aspell`, `hunspell`, or `ispell`). Object with `enabled` (boolean) and `binary` (string — path to the spell checker). Set via `/config`. Requires v2.1.235+ (binary path required as of v2.1.236) |
| `promptCacheTtl` | string | - | Keep the 1-hour prompt cache tier active on the main conversation for API-key and cloud-provider users who have access to extended cache TTLs. When unset, the default 5-minute cache TTL applies. Example: `"1h"`. Pairs with `subagentPromptCacheTtl` (v2.1.243+) |
| `subagentPromptCacheTtl` | string | - | Keep the 5-minute prompt cache tier active for subagents when set. Controls the cache TTL for subagent turns separately from the main conversation. Use with `promptCacheTtl` for independent control of caching behavior in orchestrated workflows (v2.1.243+) |

### Global Config Settings (`~/.claude.json`)

These IDE-related preferences are stored in `~/.claude.json`, **not** `settings.json`.

> **v2.1.119 migration note:** As of v2.1.119, `autoScrollEnabled`, `editorMode`, `showTurnDuration`, `teammateMode`, and `terminalProgressBarEnabled` moved into `settings.json` and are documented in the Display Settings table above. Earlier versions stored them here.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `autoConnectIde` | boolean | `false` | Automatically connect to a running IDE when Claude Code starts from an external terminal. Appears in `/config` as **Auto-connect to IDE (external terminal)** when running outside a VS Code or JetBrains terminal |
| `autoInstallIdeExtension` | boolean | `true` | Automatically install the Claude Code IDE extension when running from a VS Code terminal. Appears in `/config` as **Auto-install IDE extension**. Can also be disabled via `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` env var |
| `externalEditorContext` | boolean | `false` | Prepend Claude's previous response as `#`-commented context when you open the external editor with `Ctrl+G`. Set to `true` to enable |
| `teammateDefaultModel` | string | `null` | **Removed in v2.1.251.** Previously set the default model for [agent-team](https://code.claude.com/docs/en/agent-teams) teammates when the lead dispatched them. Teammates now inherit the lead's model by default |
| `diffTool` | string | - | External diff tool command invoked when viewing file diffs. When set, Claude Code spawns this command with the two file paths as arguments instead of rendering the built-in diff view |
| `permissionExplainerEnabled` | boolean | `true` | Show an AI-generated natural-language explanation of why a permission is being requested alongside the permission prompt. Set to `false` to suppress the explanation and show only the raw tool call |

### Workspace & Teams

| Key | Type | Description |
|-----|------|-------------|
| `sshConfigs` | object[] | SSH connection definitions surfaced as a dropdown in Desktop. Each entry must include `id`, `name`, and `sshHost`; optionally `sshPort`, `sshIdentityFile`, and `startDirectory`. Only honored from managed and user settings — project settings values are ignored |

**Field reference:**

| Field | Required | Description |
|-------|----------|-------------|
| `id` | yes | Unique identifier for the SSH connection entry |
| `name` | yes | Display name shown in the Desktop dropdown |
| `sshHost` | yes | SSH host (e.g., `user@dev.example.com` or `dev.example.com`) |
| `sshPort` | no | SSH port number |
| `sshIdentityFile` | no | Path to the SSH identity file (private key) |
| `startDirectory` | no | Initial working directory after connecting |

**Example:**
```json
{
  "sshConfigs": [
    {
      "id": "dev-vm",
      "name": "Dev VM",
      "sshHost": "user@dev.example.com",
      "sshPort": 22,
      "sshIdentityFile": "~/.ssh/id_ed25519",
      "startDirectory": "/home/user/project"
    }
  ]
}
```

### Status Line Configuration

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 2,
    "refreshInterval": 5
  }
}
```

| Field | Description |
|-------|-------------|
| `type` | Set to `"command"` to run a shell script |
| `command` | Shell command or script path that generates the status line output |
| `padding` | Extra horizontal spacing (in characters) added to status line content. Defaults to `0`. Controls relative indentation beyond the interface's built-in spacing |
| `refreshInterval` | Re-run the command every N seconds in addition to event-driven updates. Minimum is `1`. Useful when the status line shows time-based data (e.g., a clock) or when background subagents change git state while the main session is idle. Leave unset to run only on events (v2.1.97) |
| `hideVimModeIndicator` | When `true`, suppresses the built-in vim mode indicator from the status area so a custom status line command can render it instead. Only has effect when `editorMode` is `"vim"` |

**Status Line Input Fields:**

The status line command receives a JSON object on stdin. For the full JSON schema and examples, see the [Status Line Documentation](https://code.claude.com/docs/en/statusline).

| Field | Description |
|-------|-------------|
| `model.id`, `model.display_name` | Current model identifier and display name |
| `cwd`, `workspace.current_dir` | Current working directory (both contain the same value; `workspace.current_dir` preferred) |
| `workspace.project_dir` | Directory where Claude Code was launched (may differ from `cwd` if working directory changes) |
| `workspace.added_dirs` | Additional directories added via `/add-dir` or `--add-dir` |
| `workspace.git_worktree` | Git worktree name when inside a linked worktree created with `git worktree add`. Absent in the main working tree (v2.1.97) |
| `cost.total_cost_usd` | Total session cost in USD |
| `cost.total_duration_ms` | Total wall-clock time since session started, in milliseconds |
| `cost.total_api_duration_ms` | Total time spent waiting for API responses, in milliseconds |
| `cost.total_lines_added`, `cost.total_lines_removed` | Lines of code changed during the session |
| `context_window.total_input_tokens`, `context_window.total_output_tokens` | Cumulative token counts across the session |
| `context_window.context_window_size` | Maximum context window size in tokens (200000 default, 1000000 for extended context) |
| `context_window.used_percentage` | Pre-calculated percentage of context window used |
| `context_window.remaining_percentage` | Pre-calculated percentage of context window remaining |
| `context_window.current_usage` | Token counts from the last API call (input, output, cache tokens) |
| `exceeds_200k_tokens` | Whether total tokens from the most recent API response exceeds 200k (fixed threshold) |
| `rate_limits.five_hour.used_percentage` | Five-hour rate limit usage percentage (v2.1.80+) |
| `rate_limits.five_hour.resets_at` | Five-hour rate limit reset timestamp (Unix epoch seconds) |
| `rate_limits.seven_day.used_percentage` | Seven-day rate limit usage percentage |
| `rate_limits.seven_day.resets_at` | Seven-day rate limit reset timestamp (Unix epoch seconds) |
| `session_id` | Unique session identifier |
| `session_name` | Custom session name set with `--name` or `/rename`. Absent if no custom name set |
| `transcript_path` | Path to conversation transcript file |
| `version` | Claude Code version |
| `output_style.name` | Name of the current output style |
| `vim.mode` | Current vim mode (`NORMAL` or `INSERT`) when vim mode is enabled |
| `agent.name` | Agent name when running with `--agent` flag or agent settings |
| `effort.level` | Current reasoning effort (`low`, `medium`, `high`, `xhigh`, or `max`). Reflects the live session value, including mid-session `/effort` changes. Absent when the current model does not support the effort parameter (v2.1.121) |
| `thinking.enabled` | Whether extended thinking is enabled for the session (v2.1.121) |
| `worktree.name` | Name of the active worktree (present only during `--worktree` sessions) |
| `worktree.path` | Absolute path to the worktree directory |
| `worktree.branch` | Git branch name for the worktree. Absent for hook-based worktrees |
| `worktree.original_cwd` | Directory before entering the worktree |
| `worktree.original_branch` | Git branch checked out before entering the worktree. Absent for hook-based worktrees |
| `github` | GitHub repository and pull-request information for the current branch when detected — repo identity and the associated PR (v2.1.145) |

### File Suggestion Configuration

The file suggestion script receives a JSON object on stdin (e.g., `\{"query": "src/comp"\}`) and must output up to 15 file paths (one per line).

```json
{
  "fileSuggestion": {
    "type": "command",
    "command": "~/.claude/file-suggestion.sh"
  },
  "respectGitignore": true
}
```

**Example:**
```json
{
  "statusLine": {
    "type": "command",
    "command": "git branch --show-current 2>/dev/null || echo 'no-branch'"
  },
  "spinnerTipsEnabled": true,
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": ["Cooking", "Brewing", "Crafting", "Conjuring"]
  },
  "spinnerTipsOverride": {
    "tips": ["Use /compact at ~50% context", "Start with plan mode for complex tasks"],
    "excludeDefault": true
  }
}
```
