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
pageSha256: "fc481f537125766facf3c9ac31698850eb6c77cf4479bec5019aa99cb1c9ccd5"
contentMode: "local-full"
zh: ""
---

## Scope and Precedence

Claude Code uses four settings scopes, applied from highest to lowest priority:

| Priority | Scope | Location | Shared? | Purpose |
|----------|-------|----------|---------|---------|
| 1 | **Managed** | Server, MDM profile, registry, or system `managed-settings.json` | Yes (IT-deployed) | Org-wide policies, cannot be overridden |
| 2 | **Command line** | `--` flags at startup | No | Temporary session overrides |
| 3 | **Local** | `.claude/settings.local.json` | No (gitignored) | Personal project-specific |
| 4 | **Project** | `.claude/settings.json` | Yes (committed) | Team-shared settings |
| 5 | **User** | `~/.claude/settings.json` | No | Global personal defaults |

**Array merging:** Settings like `permissions.allow`, `sandbox.filesystem.allowWrite`, and `allowedHttpHookUrls` are concatenated and deduplicated across scopes, not replaced.

**Deny precedence:** `permissions.deny` rules always take effect regardless of allow/ask rules at any scope.

**Managed settings delivery methods:**
- Server-managed (Claude.ai admin console)
- macOS MDM: `com.anthropic.claudecode` plist
- Windows registry: `HKLM\SOFTWARE\Policies\ClaudeCode`
- File: `managed-settings.json` at `/Library/Application Support/ClaudeCode/` (macOS), `/etc/claude-code/` (Linux/WSL), `C:\Program Files\ClaudeCode\` (Windows)
- Drop-in directory: `managed-settings.d/*.json` alongside `managed-settings.json`, merged alphabetically

**Other config:** `~/.claude.json` stores OAuth session, MCP server configs, per-project trust state, and preferences like `editorMode`. Do not put `~/.claude.json` keys into `settings.json`: it will trigger schema validation errors.
