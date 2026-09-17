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
pageSha256: "bdf20ca6599f0088f0e5428425a2a9440ffdc771dcb749afb49ca92c5221f0df"
contentMode: "local-full"
zh: ""
---

## Permission Modes

Permission modes control what actions Claude can take without explicit approval.

### Available Permission Modes

| Mode | Behavior |
|---|---|
| `manual` | Read files only; prompts for all other actions. Renamed from `default` in v2.1.200 — `default` is still accepted as an alias |
| `acceptEdits` | Read and edit files; prompts for commands |
| `plan` | Read files only (research mode, no edits) |
| `auto` | All actions with background safety classifier checks. Requires an eligible model (Opus 5, Sonnet 5, Opus 4.7/4.8, or Fable 5 on most providers) and provider — available on all plans, see [Auto Mode](#auto-mode) |
| `bypassPermissions` | All actions, no permission checks (dangerous) |
| `dontAsk` | Only pre-approved tools execute; all others denied |

> **Note**: The interactive default mode was renamed from `default` to **Manual** in v2.1.200 (across the CLI, `--help`, VS Code, and JetBrains), and a grey ⏸ badge appears in the footer while it is active (v2.1.203). Both `--permission-mode manual` and `--permission-mode default` work, as do `"defaultMode": "manual"` and `"defaultMode": "default"` in settings. Note that the settings key is `permissions.defaultMode` — there is no `permissions.mode` key, so the examples below use the canonical spelling.

Cycle through modes with `Shift+Tab` in the CLI. Set a default with the `--permission-mode` flag or the `permissions.defaultMode` setting.

> **Plan mode defers shell commands to the classifier (v2.1.218)**: When [auto mode](#auto-mode) is available and the `useAutoModeDuringPlan` setting is on — which it is by default — the classifier reviews shell commands during planning instead of prompting you. Approved commands run, and rejected ones are blocked. Plan mode still blocks file writes unconditionally.

As of v2.1.160, even `acceptEdits` prompts before writing shell-startup files (`.zshenv`, `.zlogin`, `.bash_login`, `~/.config/git/`) and code-executing build configs (`.npmrc`, `.yarnrc*`, `bunfig.toml`, `.bazelrc`, `.pre-commit-config.yaml`, `.devcontainer/`, …), which could otherwise lead to unintended command execution.

> **`--dangerously-skip-permissions` extended path coverage (v2.1.121, v2.1.126)**: The `--dangerously-skip-permissions` CLI flag (and equivalent `bypassPermissions` mode) now bypasses prompts for writes to a much broader allowlist — `.claude/skills/`, `.claude/agents/`, `.claude/commands/`, `.claude/`, `.git/`, `.vscode/`, and shell config files. Catastrophic removal commands (`rm -rf /`, etc.) still prompt in this mode (in auto mode they are judged by the classifier instead — see [Auto Mode](#auto-mode)). Treat the flag as a sharper tool than before; use it only in throwaway sandboxes.

> **Windows shell detection (v2.1.120, v2.1.126)**: Git for Windows / Git Bash is no longer required. When Git Bash is absent, Claude Code uses PowerShell as the shell tool. From v2.1.126 PowerShell is the *primary* shell when the PowerShell tool is enabled, and detection covers PowerShell 7 installed via the Microsoft Store, MSI without PATH, or as a `.NET global tool`.

> **PowerShell tool enabled by default on Windows for Bedrock/Vertex/Foundry (v2.1.143)**: As of v2.1.143, the PowerShell tool is **enabled by default on Windows** for Bedrock, Vertex, and Foundry users. Claude Code invokes PowerShell with `-ExecutionPolicy Bypass` so scripts run even if the system policy is `Restricted`. To make Claude Code honor the system execution policy, set `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1`. To disable the PowerShell tool entirely, set `CLAUDE_CODE_USE_POWERSHELL_TOOL=0`.

### Activation Methods

**Keyboard shortcut**:
```bash
Shift + Tab  # Cycle through all 6 modes
```

**Slash command**:
```bash
/plan                  # Enter plan mode
```

**CLI flag**:
```bash
claude --permission-mode plan
claude --permission-mode auto
```

**Setting**:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### Permission Mode Examples

#### Default Mode
Claude asks for confirmation on significant actions:

```
User: Fix the bug in auth.ts

Claude: I need to modify src/auth.ts to fix the bug.
The change will update the password validation logic.

Approve this change? (yes/no/show)
```

#### Plan Mode
Review implementation plan before execution:

```
User: /plan Implement user authentication system

Claude: I'll create a plan for implementing authentication.

## Implementation Plan
[Detailed plan with phases and steps]

Ready to proceed? (yes/no/modify)
```

#### Accept Edits Mode
Automatically accept file modifications:

```
User: acceptEdits
User: Fix the bug in auth.ts

Claude: [Makes changes without asking]
```

### Use Cases

**Code Review**:
```
User: claude --permission-mode plan
User: Review this PR and suggest improvements

Claude: [Reads code, provides feedback, but cannot modify]
```

**Pair Programming**:
```
User: claude --permission-mode default
User: Let's implement the feature together

Claude: [Asks for approval before each change]
```

**Automated Tasks**:
```
User: claude --permission-mode acceptEdits
User: Fix all linting issues in the codebase

Claude: [Auto-accepts file edits without asking]
```
