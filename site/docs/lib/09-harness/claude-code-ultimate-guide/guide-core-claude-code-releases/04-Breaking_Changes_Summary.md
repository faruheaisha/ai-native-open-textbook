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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/claude-code-releases.md"
sourceRel: "guide/core/claude-code-releases.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/claude-code-releases.md"
sourceSha256: "55f65e8656bd4d5aa12299ad17ed58a1b97e06151d418a538461d12cc4a87134"
pageSha256: "93e684ed4be4950e79794f0ba834a954ba25b58a109ad832348e33015fe32c0c"
contentMode: "local-full"
zh: ""
---

## Breaking Changes Summary

### URLs

| Version | Change |
|---------|--------|
| v2.1.0, v2.1.7 | OAuth/API Console: `console.anthropic.com` → `platform.claude.com` |

### Windows

| Version | Change |
|---------|--------|
| v2.0.58 | Managed settings prefer `C:\Program Files\ClaudeCode` |
| v2.1.2 | Deprecated `C:\ProgramData\ClaudeCode` path |

### SDK / Agent Tool

| Version | Change |
|---------|--------|
| v2.0.25 | Removed legacy SDK entrypoint → `@anthropic-ai/claude-agent-sdk` |
| v2.1.0 | Minimum zod peer dependency: `^4.0.0` |
| v2.1.77 | `Agent` tool no longer accepts `resume` parameter (use `SendMessage(\{to: agentId\})` instead) |
| v2.1.212 | Task tool's `mode` parameter deprecated (now ignored); subagents inherit the parent session's permission mode |
| v2.1.217 | Subagent nesting disabled by default, and concurrent subagents capped at 20 (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`) |
| v2.1.219 | Subagent nesting restored to depth 3 by default; set `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=1` to disable |
| v2.1.224 | Removed the 200-subagent-per-session spawn cap; concurrency and depth limits still apply |
| v2.1.232 | Subagent forking on by default: `subagent_type: "fork"` inherits the full conversation and prompt cache, and non-teammate agent spawns run in the background |

### Models and Behavior

| Version | Change |
|---------|--------|
| v2.1.68 | Opus 4 and Opus 4.1 removed from the Claude Code first-party API, auto-migrated to Opus 4.6 |
| v2.1.218 | Skills with `context: fork` run in the background by default; opt out with `background: false` |
| v2.1.218 | Agent markdown files reject agent names containing `:`, reserved for plugin namespacing |
| v2.1.218 | `/deep-research` starts only when invoked manually; Claude no longer launches it on its own |
| v2.1.219 | Opus 4.7 removed from fast mode; `/fast` applies to Opus 5 and Opus 4.8 only |
| v2.1.219 | Dynamic workflows default to a medium size guideline (fewer than 15 agents); change with Dynamic workflow size in `/config` |
| v2.1.224 | `/feedback` transcript share also uploads the last request's system prompt (including `CLAUDE.md`), tool definitions, and model parameters, with consent; secrets stay redacted |
| v2.1.228 | Write tool lets newer models overwrite a file they have not read this session, matching Edit; older models still require the read |
| v2.1.229 | `/commit-push-pr` no longer auto-approves git/gh commands carrying `--force`, `--amend`, `--no-verify` |
| v2.1.229 | Self-hosted runner on Windows requires an explicit `--base-dir`; no default checkout directory |
| v2.1.232 | `sandbox.ripgrep` honored only from user, managed, and `--settings` settings; project settings can no longer override it |

### API Ecosystem

| Date | Feature |
|------|---------|
| 2026-01-29 | **Structured Outputs GA**: `output_config.format` replaces `output_format`. [Structured Outputs docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) |
| 2026-04-30 | **1M context beta retired**: `context-1m-2025-08-07` header no longer accepted for Sonnet 4.5/4: requests >200k tokens error. Migrate to Sonnet 4.6 or Opus 4.6. |

### Shortcuts

| Version | Change |
|---------|--------|
| v2.0.70 | Removed `#` shortcut for quick memory entry |
| v2.1.153 | `modelPicker:setAsDefault` keybinding renamed to `modelPicker:thisSessionOnly` in `keybindings.json` |

### Security Fixes

| Version | Issue |
|---------|-------|
| v2.1.2 | Command injection in bash command processing |
| v2.1.6 | Shell line continuation permission bypass |
| v2.1.7 | Wildcard permission rules compound commands |
| v2.1.38 | Heredoc delimiter command smuggling prevention |

### Syntax

| Version | Change |
|---------|--------|
| v2.1.19 | Indexed argument syntax changed: `$ARGUMENTS.0` → `$ARGUMENTS[0]` (bracket syntax) |
| v2.1.210 | `Write(path)`, `NotebookEdit(path)`, and `Glob(path)` permission rules now warn at startup. Use `Edit(path)` or `Read(path)` instead |
| v2.1.214 | Single-segment `dir/**` hook `if:` conditions match only `<cwd>/dir`. Write `**/dir/**` for any-depth matching (`deny`/`ask` permission rules keep any-depth) |
| v2.1.214 | `file -m`/`--magic-file`/`-f`/`--files-from` and `docker` daemon-redirect flags (`--url`, `--connection`, `--identity`) now require permission |
