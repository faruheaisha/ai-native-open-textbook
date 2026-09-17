---
title: "Update Coding Agent Context"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/agent-context/commands/speckit.agent-context.update.md"
sourceRel: "extensions/agent-context/commands/speckit.agent-context.update.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/agent-context/commands/speckit.agent-context.update.md"
sourceSha256: "215e3df01bafd18e051e31fbb05c5b4986879a3b00127865c62adaec0785ea6d"
pageSha256: "215e3df01bafd18e051e31fbb05c5b4986879a3b00127865c62adaec0785ea6d"
contentMode: "local-full"
zh: ""
---

# Update Coding Agent Context

Refresh the managed Spec Kit section inside the active coding agent's context/instruction file (e.g. `CLAUDE.md`, `.github/copilot-instructions.md`, `AGENTS.md`).

## Behavior

The script reads the agent-context extension config at
`.specify/extensions/agent-context/agent-context-config.yml` to discover:

- `context_file` — the path of the coding agent context file to manage.
- `context_files` — optional project-relative paths for multiple coding agent context files. When non-empty, the script updates each listed file and the list takes precedence over `context_file`.
- `context_markers.start` / `.end` — the delimiters surrounding the managed section. Defaults to `` when the field is missing.

It then creates, replaces, or appends the managed block so that the section points at the most recent plan path when one can be discovered (any `plan.md` under `specs/`, including nested scoped layouts such as `specs/<scope>/<feature>/plan.md`).

If `context_files` and `context_file` are empty, the command reports nothing to do and exits successfully. Context file paths must stay project-relative; absolute paths, Windows drive paths, backslash separators, and `..` path segments are rejected.

## Execution

- **Bash**: `.specify/extensions/agent-context/scripts/bash/update-agent-context.sh [plan_path]`
- **PowerShell**: `.specify/extensions/agent-context/scripts/powershell/update-agent-context.ps1 [plan_path]`

When `plan_path` is omitted, the script auto-detects the most recently modified `specs/**/plan.md` (searched recursively, so nested scoped layouts are discovered).
